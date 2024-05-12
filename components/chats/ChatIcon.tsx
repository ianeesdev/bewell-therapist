import React, { useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import ChatBox from "./ChatBox";
import { useAppContext } from "../../AppContext";

const ChatIcon = () => {
  const { isChatOpen, updateChatValue } = useAppContext();

  const handleChatIconClick = () => {
    updateChatValue(true);
  };

  const handleCloseClick = () => {
    updateChatValue(false);
  };

  return (
    <>
      {isChatOpen && <div className="fixed inset-0 bg-black opacity-50 z-50"></div>}
      {isChatOpen && <ChatBox handleCloseClick={handleCloseClick} />}
      {!isChatOpen && (
        <div
          className="fixed bottom-[40px] right-[40px] bg-deepAqua rounded-full p-5 shadow-xl cursor-pointer z-50"
          onClick={handleChatIconClick}
        >
          <FiMessageSquare size={24} color="#FFFFFF" />
        </div>
      )}
    </>
  );
};

export default ChatIcon;
