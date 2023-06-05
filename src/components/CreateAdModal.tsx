import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { Input } from "./Input";

interface IGame {
  id: string;
  title: string;
}
export function CreateAdModal() {
  const [games, setGames] = useState<IGame[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5146/v1/games")
      .then((res) => setGames(res.data));
  }, []);

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
            <select name="game" id="game" className="createAdSelectInput">
              <option>Selecione um game</option>
              {games.map((game) => {
                return (
                  <option value="" key={game.id}>
                    {game.title}
                  </option>
                );
              })}
            </select>
            <div className="createAdInput">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input
                name="name"
                id="name"
                type="text"
                placeholder="Como te chamam dentro do game"
              />
            </div>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export default CreateAdModal;
