import React, { useState, useEffect, useRef } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import { IoSend } from "react-icons/io5";
import io from "socket.io-client";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  sendMessage,
  getMessages,
} from "../../app/redux/features/chat-app/chatSlice";

interface ChatScreenProps {
  chatId: string;
}

const ChatScreen = ({ chatId }: ChatScreenProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages } = useSelector((state: any) => state.chats);
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);


  // Function to scroll to the bottom of the container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when component mounts or messages change
  useEffect(() => {
    scrollToBottom();
  }, []);

  // // Initialize socket connection
  // useEffect(() => {
  //   const newSocket = io("http://localhost:5000");
  //   setSocket(newSocket);

  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, []);

  const handleMessageSend = async (event: any) => {
    event.preventDefault();
    dispatch(sendMessage({ content: newMessage, chatId: chatId }));
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-2 mb-[5.5rem]">
        {messages?.map((message: any, index: any) => (
          <div
            key={index}
            className={`flex items-center p-1 ${
              message.senderType !== "User" && "justify-end"
            }`}
          >
            <p
              className={`max-w-[75%] mr-2 px-4 py-3 rounded-tl-2xl rounded-tr-2xl text-base text-white ${
                message.senderType !== "User"
                  ? "bg-deepAqua rounded-bl-2xl"
                  : "bg-surface rounded-br-2xl"
              }`}
            >
              {message.content}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleMessageSend}
        className="absolute bottom-0 left-5 right-0 py-4 flex items-center bg-white"
      >
        <InputField
          type="text"
          placeholder="Send a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button type="submit" className="bg-white">
          <IoSend size={30} className="text-deepAqua" />
        </Button>
      </form>
    </div>
  );
};

export default ChatScreen;
