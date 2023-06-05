import Link from "next/link";

export function Register() {
  return (
    <div className="containerRegister">
      <div className="gridLeftRegister">
        <h1>aqui fica os inputs</h1>
      </div>
      <div className="gridRightRegister">
        <Link href="/">
          <img src="logo-esports.svg" alt="" />
        </Link>

        <h1>blabla</h1>
      </div>
    </div>
  );
}
export default Register;
