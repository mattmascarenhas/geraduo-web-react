import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function InputLabelPassword(props: IProps) {
  return (
    <div className="containerLabel">
      <label htmlFor="" className="labelRegister">
        {props.label}
      </label>
      <input type="password" className="inputRegister" {...props} />
    </div>
  );
}

export default InputLabelPassword;
