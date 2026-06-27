import React, { createContext, useEffect, useState } from "react";
import { AuthContextType } from "../types/auth.types";
import { User } from "../types/user.types";
import { storage } from "../utils/storage";

export const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    try {
      const savedToken = await storage.getToken();

      const savedUser = await storage.getUser();

      if (savedToken && savedUser) {
        setToken(savedToken);

        setUser(savedUser);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (user: User, token: string) => {
    setUser(user);

    setToken(token);

    await storage.saveUser(user);

    await storage.saveToken(token);
  };

  const logout = async () => {
    setUser(null);

    setToken(null);

    await storage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
