"use client";
import InputLabel from "@/components/inputs/InputLabel";
import InputLabelPassword from "@/components/inputs/InputLabelPassword";
import { FormEvent } from "react";
import Link from "next/link";
import axios from "axios";

export function Register() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement; // Converter o tipo do evento para HTMLFormElement
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);
    console.log(data);

    if (data.password !== data.passwordConfirm)
      return alert("As senhas não coincidem");
    else {
      try {
        await axios.post(`http://localhost:5146/v1/player`, {
          Name: data.name,
          NickName: data.nickname,
          Email: data.email,
          Password: data.password,
          Discord: data.discord,
        });
        return alert("Cliente cadastrado com sucesso!");
      } catch (error) {
        console.log(error);
        return alert("Erro ao cadastrar o cliente!");
      }
    }
  }
  return (
    <div className="containerRegister">
      <form onSubmit={onSubmit}>
        <div className="formContainerRegister">
          <div style={{ marginTop: "100px" }}>
            <h1 className="h1Register">Cadastre-se e encontre seu duo!</h1>
            <InputLabel label="Nome Completo" name="name" id="name" />
          </div>
          <div style={{ display: "flex" }}>
            <InputLabel label="Nickname" name="nickname" id="nickname" />
            <InputLabel label="Discord" name="discord" id="discord" />
          </div>
          <div className="">
            <InputLabel label="Email" name="email" id="email" />
          </div>
          <div style={{ display: "flex" }}>
            <InputLabelPassword label="Senha" name="password" id="password" />
            <InputLabelPassword
              label="Confirme a senha"
              name="passwordConfirm"
              id="passwordConfirm"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <button className="buttonLogin" type="submit">
              Cadastrar
            </button>
          </div>
        </div>
      </form>

      <div className="gridRightRegister">
        <Link href="/">
          <img src="logo-esports.svg" alt="" />
        </Link>
        <div
          style={{
            marginTop: 100,
            marginInline: 100,
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          <h1> Bem-vindo ao nosso site de geração de duos!</h1>
          <h2>
            Aqui, oferecemos uma plataforma emocionante onde jogadores
            apaixonados podem se cadastrar e encontrar um parceiro para
            emocionantes partidas em duplas.
          </h2>
        </div>
      </div>
    </div>
  );
}
export default Register;
