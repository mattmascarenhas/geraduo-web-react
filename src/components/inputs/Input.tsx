import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: IProps) {
  return <input {...props} className="createAdSelectInput" />;
}
