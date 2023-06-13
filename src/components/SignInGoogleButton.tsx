"use client";
import { signIn } from "next-auth/react";
import GoogleIcon from "./icons/Google";

export function SignInGoogleButton() {
  return (
    <>
      <button
        type="button"
        className="buttonGoogle"
        onClick={() => {
          signIn("google");
        }}
      >
        <GoogleIcon />
      </button>
    </>
  );
}
export default SignInGoogleButton;
