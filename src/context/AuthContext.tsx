import { createContext, useState, type PropsWithChildren } from "react";
import type { UserData } from "../interfaces/user-data";

interface IUserAuthProps {
  user: UserData | null;
  isAuthenticate: boolean;
  selectedEstablishment: string | null;
}

interface IAuthContext {
  userAuth: IUserAuthProps;
  setUserAuth: (data: IUserAuthProps) => void;
}

const defaultValue: IUserAuthProps = {
  user: null,
  isAuthenticate: false,
  selectedEstablishment: null
}

const AuthContext = createContext({} as IAuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [userAuth, setUserAuth] = useState<IUserAuthProps>(defaultValue);

  return (
    <AuthContext.Provider value={{userAuth, setUserAuth}}>
      {children}
    </AuthContext.Provider>
  )
}