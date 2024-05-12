import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { FaArrowLeftLong } from "react-icons/fa6";
import ChatScreen from "./ChatScreen";
import ChatCard from "./ChatCard";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, getUserChats } from "../../app/redux/features/chat-app/chatSlice";

interface ChatBoxProps {
  handleCloseClick: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ handleCloseClick }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState({});

  const handleChatCardClick = (chat: any) => {
    dispatch(getMessages(chat._id));
    setSelectedChat(chat);
    setIsChatOpen(!isChatOpen);
  };

  const dispatch = useDispatch();
  const { therapist } = useSelector((state: any) => state.auth);
  const { chats, isSuccess, isLoading, isError, message } = useSelector((state: any) => state.chats);

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (therapist?.isLoggedIn) {
      dispatch(getUserChats());
    }
  }, [therapist]);

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="w-[27%] fixed bottom-[40px] right-[40px] bg-white rounded-2xl shadow-xl z-50">
      <div className="flex justify-between items-center pb-5 border-b-2 border-gray-200 p-5 shadow-lg">
        <h1 className="text-xl font-bold">
          {isChatOpen ? (
            <span className="flex gap-2 items-center">
              <FaArrowLeftLong
                className="cursor-pointer"
                onClick={() => setIsChatOpen(false)}
              />
              <div className="flex items-center gap-2">
                <p>{selectedChat?.users[0].name}</p>
                <p className="text-sm text-faded font-regular">Wed 6:55 AM</p>
              </div>
            </span>
          ) : (
            "Messages"
          )}
        </h1>
        <div className="p-2 rounded-full bg-black" onClick={handleCloseClick}>
          <FiX size={20} className="text-white cursor-pointer" />
        </div>
      </div>

      <div className="p-5 max-h-[30rem] overflow-auto">
        {isChatOpen ? (
          <ChatScreen chatId={selectedChat?._id} />
        ) : (
          <div className="text-black flex flex-col gap-3">
            {chats?.map((chat: any, index: number) => (
              <ChatCard key={index} name={chat?.users[0].name} onClick={() => handleChatCardClick(chat)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
