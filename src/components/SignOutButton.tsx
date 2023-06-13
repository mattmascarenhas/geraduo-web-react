"use client";
import { signOut } from "next-auth/react";
import LoginIcon from "./icons/Login";

export function SignOutButton() {
  return (
    <>
      <button type="button" className="buttonLogin" onClick={() => signOut()}>
        Sair
        <LoginIcon />
      </button>
    </>
  );
}
export default SignOutButton;
