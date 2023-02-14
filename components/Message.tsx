import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

type Props = {
  message: DocumentData;
  last: boolean;
};

function Message({ message, last }: Props) {
  const [animatedText, setAnimatedText] = useState("");
  const isChatGPT = message.user.name === "ChatGPT";

  useEffect(() => {
    if (last && isChatGPT) {
      let index = 0;
      const animationInterval = setInterval(() => {
        setAnimatedText(message.text.slice(0, index));
        index++;
        if (index > message.text.length) {
          clearInterval(animationInterval);
        }
      }, 100);
      return () => clearInterval(animationInterval);
    }
  }, [last, message.text]);

  console.log(message, "message");
  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <img src={message.user.avatar} alt="" className="h-8 w-8" />
        <p>
          {" "}
          {message.code ? (
            <pre className="text-sm overflow-x-auto">
              <code
                className={`language-${message.language || "javascript"}`}
                dangerouslySetInnerHTML={{
                  __html: Prism.highlight(
                    message.code,
                    Prism.languages[message.language || "javascript"],
                    message.language || "javascript"
                  ),
                }}
              />
            </pre>
          ) : (
            <p>{animatedText || message.text}</p>
          )}
        </p>
      </div>
    </div>
  );
}

export default Message;
