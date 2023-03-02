import { createContext, useState } from "react";

export const RoomsContext = createContext();

export const RoomsContextProvider = (props) => {
  // NAVBAR
  const [loginShow, setLoginShow] = useState(false);
  const handleLoginClose = () => setLoginShow(false);
  const handleLoginShow = () => setLoginShow(true);

  const [registerShow, setRegisterShow] = useState(false);
  const handleRegisterClose = () => setRegisterShow(false);
  const handleRegisterShow = () => setRegisterShow(true);

  const goToLogin = (e) => {
    setRegisterShow(false);
    setLoginShow(true);
  };
  const goToRegister = (e) => {
    setLoginShow(false);
    setRegisterShow(true);
  };

  return (
    <RoomsContext.Provider
      value={{
        loginShow,
        setLoginShow,
        handleLoginClose,
        handleLoginShow,
        registerShow,
        setRegisterShow,
        handleRegisterClose,
        handleRegisterShow,
        goToLogin,
        goToRegister,
      }}
    >
      {props.children}
    </RoomsContext.Provider>
  );
};
