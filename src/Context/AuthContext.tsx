"use client";
import { IUserData, ICredentials } from "@/utils/Interfaces";
import axios from "axios";
import { createContext, useState, useEffect } from "react";

const Context = createContext({});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.create({
        baseURL: "http://localhost:5146",
      }).defaults.headers.head.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
    // Recupere os dados do usuário a partir do localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  // Atualiza os dados do usuário no localStorage sempre que userData for alterado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  async function handleLogin(credentials: ICredentials) {
    //credenciais vinda da tela de login
    const { email, password } = credentials as {
      email: string;
      password: string;
    };
    //rota para autenticação no back-end
    const response = await axios.post(
      `http://localhost:5146/v1/authentication`,
      {
        email,
        password,
      }
    );
    //caso a autenticação seja feita, pegaremos o token enviado do back-end e armazenaremos no localStorage
    const token = response.data.token;
    localStorage.setItem("token", JSON.stringify(token));

    axios.create({
      baseURL: "http://localhost:5146",
    }).defaults.headers.head.Authorization = `Bearer ${token}`;
    //verificação para saber se o usuario foi autenticado
    const user = response.data;

    if (!user) {
      throw new Error("Invalid credentials");
    } else {
      // Remove a propriedade "token" do objeto "user"
      const { token, ...userDataWithoutToken } = user;

      //AUTENTICA
      setAuthenticated(true);
      // Armazena os dados do usuário (sem o token) no localStorage
      if (token)
        localStorage.setItem("userData", JSON.stringify(userDataWithoutToken));

      window.location.href = "/";
    }

    return response;
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    axios.create({
      baseURL: "http://localhost:5146",
    }).defaults.headers.head.Authorization = undefined;
  }

  return (
    <Context.Provider
      value={{ authenticated, handleLogin, handleLogout, userData }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
