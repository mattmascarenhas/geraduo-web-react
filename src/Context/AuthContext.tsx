"use client";
import axios from "axios";
import { createContext, useState, useEffect } from "react";

interface ICredentials {
  email: string;
  password: string;
}

const Context = createContext({});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.create({
        baseURL: "http://localhost:5146",
      }).defaults.headers.head.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

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
      setAuthenticated(true);
      window.location.href = "/";
    }
    return response;
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    axios.create({
      baseURL: "http://localhost:5146",
    }).defaults.headers.head.Authorization = undefined;
  }

  return (
    <Context.Provider value={{ authenticated, handleLogin, handleLogout }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
