// src/contexts/AuthContext.tsx
import * as React from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth"
import { auth } from "../firebase";

type FirebaseUser = User| null;
export type ContextState = { user: FirebaseUser, logout: () => void };

export const FirebaseAuthContext = React.createContext<ContextState | undefined>(undefined);

interface FirebaseAuthProviderProps {
    children: React.ReactNode;
}

const FirebaseAuthProvider: React.FC<FirebaseAuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<FirebaseUser>(null);
  // const value = { user };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user)
    })
    return () => unsubscribe()
  }, []);

  const logout = () => {
    signOut(auth)
  }

  return (
    <FirebaseAuthContext.Provider value={{user, logout}}>
        {children}
    </FirebaseAuthContext.Provider>
  );
}



export { FirebaseAuthProvider };