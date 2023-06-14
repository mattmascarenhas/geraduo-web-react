"use client";
import Link from "next/link";
import { HTMLAttributes, useEffect } from "react";
import { useState } from "react";

import { useContext } from "react";
import { Context } from "@/Context/AuthContext";
import { sign } from "crypto";

interface ICustomDivProps extends HTMLAttributes<HTMLDivElement> {
  value: boolean;
}

interface ICredentials {
  email: string;
  password: string;
}
export function Login() {
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(true); // Nova flag de carregamento
  const [data, setData] = useState<ICredentials>({
    email: "",
    password: "",
  });
  const { authenticated, handleLogin } = useContext(Context) as {
    authenticated: boolean;
    handleLogin: any;
  };

  useEffect(() => {
    setLoading(false); // Marca o carregamento como concluído
    checkSession();
  }, [authenticated]);

  async function checkSession() {
    if (authenticated) {
      setLoading(true); // Marca o carregamento novamente antes do redirecionamento
      window.location.href = "/";
    }
  }

  // outras propriedades HTML válidas para um elemento <div>
  const divProps: ICustomDivProps = {
    value: errorMessage,
  };

  // ou retorne um indicador de carregamento, como uma animação
  if (loading) {
    return null;
  }

  function signIn(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    handleLogin(data)
      .then((res: any) => {
        console.log(res);
        setErrorMessage(false);
      })
      .catch((error: any) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          setErrorMessage(true);
        }
      });
  }
  return (
    <div className="containerLogin ">
      <form>
        <div className="">
          <div className="logoLogin">
            <Link href="/">
              <img src="logo-esports.svg" alt="" />
            </Link>
          </div>
          <div className="messagePasswordLogin" {...divProps}>
            {errorMessage && <span>e-mail ou senha incorreta.</span>}
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label className="labelLogin" htmlFor="email">
              E-mail
            </label>
            <input
              className="inputLogin"
              id="email"
              type="email"
              placeholder="E-mail"
              value={data.email}
              onChange={(e) =>
                setData((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label className="labelLogin" htmlFor="password">
              Senha
            </label>
            <input
              className="inputLogin"
              id="password"
              type="password"
              placeholder="Senha"
              value={data.password}
              onChange={(e) =>
                setData((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <div className="containerButtonLogin">
            <button
              className="buttonLogin"
              type="button"
              onClick={(e) => signIn(e)}
            >
              Login
            </button>
          </div>
          <Link className="linkForgetPasswordLogin" href="#">
            Esqueceu a senha?
          </Link>
        </div>
      </form>
      <div className="footerLogin">
        <p>&copy;2023 Matheus Mascarenhas DEV. Todos os direitos reservados.</p>
      </div>
    </div>
  );
}

export default Login;
