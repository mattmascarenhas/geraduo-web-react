import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function InputLabel(props: IProps) {
  return (
    <div className="containerLabel">
      <label htmlFor="" className="labelRegister">
        {props.label}
      </label>
      <input type="text" className="inputRegister" {...props} />
    </div>
  );
}

export default InputLabel;
