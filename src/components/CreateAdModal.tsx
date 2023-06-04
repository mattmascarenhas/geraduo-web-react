import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface IGame {
  id: string;
  title: string;
}
export function CreateAdModal() {
  const [games, setGames] = useState<IGame[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  function handleCreateAd() {}

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="createAdOverlay" />
      <Dialog.Content className="createAdContent">
        <Dialog.Title className="createAdTitle">
          Publique um anúncio
        </Dialog.Title>
        <form onSubmit={handleCreateAd} className="createAdForm">
          <div className="createAdInput">
            <label htmlFor="">Qual o Game?</label>
            <select name="" id=""></select>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export default CreateAdModal;
