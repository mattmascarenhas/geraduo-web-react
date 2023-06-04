import * as Dialog from "@radix-ui/react-dialog";
import MagnifierIcon from "./icons/Magnifier";

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
        <Dialog.Trigger className="buttonCreateAd">
          <MagnifierIcon />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
}
export default CreateAdBanner;
