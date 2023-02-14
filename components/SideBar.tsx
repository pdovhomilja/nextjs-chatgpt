"use client";
import { signOut, useSession } from "next-auth/react";
import NewChat from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";

const SideBar = () => {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "desc")
      )
  );
  //console.log(chats);
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          {/* New Chat */}
          <NewChat />

          <div className="hidden sm:inline">
            {/* Model Selection */}
            <ModelSelection />
          </div>
          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading Chats ...</p>
              </div>
            )}
            {/* Chat List - Map trought chat rows */}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-row items-center space-x-5 mx-5 justify-start">
          {session && (
            <img
              onClick={() => signOut()}
              src={session.user?.image!}
              alt="user"
              className="h-8 w-8 rounded-full cursor-pointer mb-2 hover:opacity-50"
            />
          )}
          {session && (
            <div>
              <p className="text-white text-center text-sm">
                {session.user?.name}
              </p>
              <p className="text-white text-center text-xs">
                {session.user?.email}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center pt-4">
        <p className="text-white text-center text-xs">version: 0.0.2</p>
      </div>
    </div>
  );
};

export default SideBar;
