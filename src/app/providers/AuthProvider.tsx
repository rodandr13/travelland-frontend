"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

interface AuthUser {
  id: number;
  first_name: string;
  email: string;
  phone_number: string;
}

interface AuthContextProps {
  authUser: AuthUser | null;
  setAuthUser: (user: AuthUser | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextProps>({
  authUser: null,
  setAuthUser: () => {},
  accessToken: null,
  setAccessToken: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
  initialUser?: AuthUser | null;
  initialAccessToken?: string | null;
}

export const AuthProvider = ({
  children,
  initialUser = null,
  initialAccessToken = null,
}: AuthProviderProps) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(initialUser);
  const [accessToken, setAccessToken] = useState<string | null>(
    initialAccessToken
  );

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
