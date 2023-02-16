// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/queryApi";
import admin from "firebase-admin";
import { adminDb } from "../../firebaseAdmin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;
  if (!prompt) {
    res.status(400).json({ answer: "No prompt provided" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "No chatId provided" });
    return;
  }

  // Retrieve the conversation history from Firebase
  const conversationRef = adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .orderBy("createdAt", "asc");
  const snapshot = await conversationRef.get();
  const conversation = snapshot.docs.map((doc) => doc.data());

  // Combine the previous prompts and the current prompt
  const prompts = conversation.map((item) => item.text);
  prompts.push(prompt);
  const combinedPrompt = prompts.join("\n");

  //console.log(combinedPrompt, "combinedPrompt");

  const response = await query(combinedPrompt, prompt, chatId, model, session);
  //ChatGPT Query
  console.log(chatId, model, "ChatGPT Query");
  // const response = await query(prompt, chatId, model, session);
  //console.log(response, "response");

  const message: Message = {
    text: response || "ChatGPT was unable to find an answer for that!",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://links.papareact.com/89k",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}
