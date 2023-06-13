import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { Input } from "./inputs/Input";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import GameControllerIcon from "./icons/GameController";

interface IGame {
  id: string;
  title: string;
}
export function CreateAdModal() {
  const [games, setGames] = useState<IGame[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);

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
          <div className="createAdInput">
            <label htmlFor="discord">Qual seu discord?</label>

            <Input
              name="discord"
              id="discord"
              type="text"
              placeholder="usuario#0000"
            />
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <div className="createAdInput">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root
                type="multiple"
                className="toggleDaysOfWeek"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  className={`daysOfWeek  ${
                    weekDays.includes("0") ? "daysOfWeekOn" : "daysOfWeekOff"
                  }`}
                  title="Domingo"
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  className={`daysOfWeek  ${
                    weekDays.includes("1") ? "daysOfWeekOn" : "daysOfWeekOff"
                  }`}
                  title="Segunda"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  className={`daysOfWeek  ${
                    weekDays.includes("2") ? "daysOfWeekOn" : "daysOfWeekOff"
                  }`}
                  title="Terça"
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  className={`daysOfWeek  ${
                    weekDays.includes("3") ? "daysOfWeekOn" : "daysOfWeekOff"
                  }`}
                  title="Quarta"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  className={`daysOfWeek  ${
                    weekDays.includes("4") ? "daysOfWeekOn" : "daysOfWeekOff"
                  }`}
                  title="Quinta"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  className={`daysOfWeek  ${
                    weekDays.includes("5") ? "daysOfWeekOn" : "daysOfWeekOff"
                  }`}
                  title="Sexta"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  className={`daysOfWeek  ${
                    weekDays.includes("6") ? "daysOfWeekOn" : "daysOfWeekOff"
                  }`}
                  title="Sábado"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="hoursDayContainer">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="hoursDay">
                <Input
                  name="hourStart"
                  id="hourStart"
                  type="time"
                  placeholder="De"
                />
                <Input
                  name="hourEnd"
                  id="hourEnd"
                  type="time"
                  placeholder="Até"
                />
              </div>
            </div>
            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close
                type="button"
                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
              >
                Cancelar
              </Dialog.Close>
              <button
                type="submit"
                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
              >
                <GameControllerIcon />
                Encontrar Duo
              </button>
            </footer>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export default CreateAdModal;
