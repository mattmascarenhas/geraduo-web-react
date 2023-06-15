import { useContext, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { Input } from "./inputs/Input";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import GameControllerIcon from "./icons/GameController";
import { Context } from "@/Context/AuthContext";
import { IUserData, IGame } from "@/utils/Interfaces";
import convertHourStringToMinutes from "@/utils/convert-hour";

export function CreateAdModal() {
  const [games, setGames] = useState<IGame[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const { userData } = useContext(Context) as {
    userData: IUserData;
  };
  useEffect(() => {
    axios
      .get("http://localhost:5146/v1/games")
      .then((res) => setGames(res.data));
  }, []);

  function handleCreateAd(event: React.ChangeEvent<HTMLFormElement>) {
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log(data);

    try {
      axios.post("http://localhost:5146/v1/ad", {
        PlayerId: data.playerId,
        GameId: data.gameId,
        PlayerName: data.playerName,
        WeekDays: weekDays.map(Number).toString(),
        HourStart: convertHourStringToMinutes(data.hourStart.toString()),
        HourEnd: convertHourStringToMinutes(data.hourEnd.toString()),
      });
      alert("Anúncio criado com sucesso!");
    } catch (err) {
      console.log(err);
      alert("Erro ao criar o anúncio!");
    }
  }

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
            <select name="gameId" id="gameId" className="createAdSelectInput">
              <option>Selecione um game</option>
              {games.map((game) => {
                return (
                  <option value={game.id} key={game.id}>
                    {game.title}
                  </option>
                );
              })}
            </select>
            <div className="createAdInput">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input
                name="playerName"
                id="playerName"
                type="text"
                placeholder="Como te chamam dentro do game"
                defaultValue={`${userData.name} (${userData.nickName})`}
              />
              <input
                //input invisivel para capturar o valor do id
                name="playerId"
                id="playerId"
                type="text"
                defaultValue={userData.id}
                style={{
                  display: "none",
                  width: "0",
                  height: "0",
                  overflow: "hidden",
                }}
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
              defaultValue={userData.discord}
              readOnly
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
          </div>
          <footer className="footerButtons">
            <Dialog.Close type="button" className="cancelButton">
              Cancelar
            </Dialog.Close>
            <button type="submit" className="findDuoButton">
              <GameControllerIcon />
              Encontrar Duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export default CreateAdModal;
