"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const updateChatValue = (newValue) => {
    setIsChatOpen(newValue);
  };

  return (
    <AppContext.Provider
      value={{
        isChatOpen,
        updateChatValue,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
