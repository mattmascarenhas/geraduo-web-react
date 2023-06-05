import * as Dialog from "@radix-ui/react-dialog";
import MagnifierIcon from "./icons/Magnifier";
import Register from "./icons/Register";
import LoginIcon from "./icons/Login";

export function AdBannerLoggedOut() {
  return (
    <div className="createAdBannerContainer">
      <div className="createAdBannerContainerPlus">
        <div>
          <strong className="strongTextCreateAdBanner">
            Não encontrou seu duo?
          </strong>
          <span className="spanTextCreateAdBanner">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        <div className="buttonsLoggedOut">
          <button className="buttonRegister">
            <Register />
            Cadastre-se
          </button>
          <button className="buttonLogin">
            <LoginIcon />
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
export default AdBannerLoggedOut;
