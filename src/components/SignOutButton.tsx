"use client";
import { useContext } from "react";
import LoginIcon from "./icons/Login";
import { Context } from "@/Context/AuthContext";

export function SignOutButton() {
  const { handleLogout } = useContext(Context) as {
    handleLogout: any;
  };
  return (
    <>
      <button
        type="button"
        className="buttonLogin"
        onClick={() => handleLogout()}
      >
        Sair
        <LoginIcon />
      </button>
    </>
  );
}
export default SignOutButton;
