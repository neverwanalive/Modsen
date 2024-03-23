import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "..";

export const Context = createContext<any>(null);

export const ContextProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<any>({
    isSignedIn: false,
    pending: true,
    user: null,
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState({ user, pending: false, isSignedIn: true });
      } else {
        setAuthState({ user: null, pending: false, isSignedIn: false });
      }
    });
  }, []);

  return (
    <Context.Provider value={{ authState, setAuthState }}>
      {children}
    </Context.Provider>
  );
};
