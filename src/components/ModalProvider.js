import React, { createContext, useContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [headerModalOpen, setHeaderModalOpen] = useState(false);
  const [detailsHebergementModalOpen, setDetailsHebergementModalOpen] =
    useState(false);

  return (
    <ModalContext.Provider
      value={{
        headerModalOpen,
        setHeaderModalOpen,
        detailsHebergementModalOpen,
        setDetailsHebergementModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
