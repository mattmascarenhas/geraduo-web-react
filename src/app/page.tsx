"use client";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import CreateAdBanner from "@/components/CreateAdBanner";
import AdBannerLoggedOut from "@/components/AdBannerLoggedOut";
import CreateAdModal from "@/components/CreateAdModal";
import { Context } from "@/Context/AuthContext";
import { IGame } from "@/utils/Interfaces";
import * as Dialog from "@radix-ui/react-dialog";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

export default function Home() {
  const { authenticated } = useContext(Context) as {
    authenticated: boolean;
  };
  const [games, setGames] = useState<IGame[]>([]);

  const sliderOptions = {
    slides: {
      perView: 6.2,
      spacing: 10,
    },
  };
  const [internalSliderRef, internalSlider] = useKeenSlider(sliderOptions);
  const [loading, setLoading] = useState(true); // Nova flag de carregamento

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5146/v1/games");
        setGames(response.data);
        setLoading(false); // Marca o carregamento como concluído
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    internalSlider.current?.update({
      ...sliderOptions,
    });
  }, [internalSlider, sliderOptions]);

  return (
    <div className="container">
      <img src="logo-esports.svg" alt="" />
      <h1 className="h1Title">Encontre seu duo aqui!</h1>
      <div className="gameBanner keen-slider" ref={internalSliderRef}>
        {games.map((game) => {
          return (
            <div
              className="containerGameBanner keen-slider__slide"
              key={game.id}
            >
              <img src={game.bannerUrl} alt="" width={204} height={272} />
              <div className="gameBannerInfo">
                <strong className="titleGameBanner">{game.title}</strong>
              </div>
            </div>
          );
        })}
      </div>
      {!loading && ( // Renderiza apenas quando o carregamento estiver concluído
        <Dialog.Root>
          {authenticated ? (
            <>
              <CreateAdBanner />
              <CreateAdModal />
            </>
          ) : (
            <AdBannerLoggedOut />
          )}
        </Dialog.Root>
      )}
    </div>
  );
}
