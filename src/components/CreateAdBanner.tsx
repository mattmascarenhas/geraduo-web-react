import * as Dialog from "@radix-ui/react-dialog";
import MagnifierIcon from "./icons/Magnifier";
import SignOutButton from "./SignOutButton";

export function CreateAdBanner() {
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
        <div className="buttonsPlayerLogged">
          <Dialog.Trigger className="buttonCreateAd">
            <MagnifierIcon />
            Publicar anúncio
          </Dialog.Trigger>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
export default CreateAdBanner;
