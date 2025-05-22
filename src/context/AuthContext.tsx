import { createContext, useState, useCallback } from "react";

type AuthValuesType = {
  name: string | null,
  isLogged: boolean,
  updateUser: (name: string | null, isLogged: boolean) => void
}

const AuthValues: AuthValuesType = {
  name: null,
  isLogged: false,
  updateUser: () => { },
}

export const AuthContext = createContext<AuthValuesType>(AuthValues)

type AuthContextProviderProps = {
  children: React.ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [name, setName] = useState<string | null>(null)
  const [isLogged, setIsLogged] = useState<boolean>(false)

  const updateUser = useCallback((name: string | null, isLogged: boolean) => {
    setName(name)
    setIsLogged(isLogged)
  }, [])

  return (
    <AuthContext value={{ name, isLogged, updateUser }}>
      {children}
    </AuthContext>
  );
}
