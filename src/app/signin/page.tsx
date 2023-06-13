"use client";
import axios from "axios";
import Link from "next/link";
import { FormEvent, HTMLAttributes, useEffect } from "react";
import { useState } from "react";
import {
  GetSessionParams,
  getSession,
  signIn,
  useSession,
} from "next-auth/react";
import Router, { useRouter } from "next/router";
import SignInGoogleButton from "@/components/SignInGoogleButton";

interface ICustomDivProps extends HTMLAttributes<HTMLDivElement> {
  value: boolean;
}
export function Login() {
  const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    checkSession();
  }, []);
  console.log(session);

  async function checkSession() {
    const session = await getSession();

    if (session) {
      window.location.href = "/";
    }
  }

  const divProps: ICustomDivProps = {
    value: errorMessage,
    // outras propriedades HTML válidas para um elemento <div>
  };
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.status === 401) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
      Router.push("/");
    }
  }

  return (
    <div className="containerLogin ">
      <form onSubmit={onSubmit}>
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
            <button className="buttonLogin" type="submit">
              Login
            </button>
            <SignInGoogleButton />
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
