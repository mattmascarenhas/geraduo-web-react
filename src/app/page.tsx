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

  const [slidesPerView, setSlidesPerView] = useState(6.2);

  const handleResize = () => {
    if (window.innerWidth >= 1200) {
      setSlidesPerView(6.2);
    } else if (window.innerWidth >= 992) {
      setSlidesPerView(4.2);
    } else if (window.innerWidth >= 768) {
      setSlidesPerView(3.2);
    } else if (window.innerWidth >= 576) {
      setSlidesPerView(2.8);
    } else {
      setSlidesPerView(2.5);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sliderOptions = {
    slides: {
      perView: slidesPerView,
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
      <img src="logo-esports.svg" alt="" className="imgLogoMain" />
      <h1 className="h1Title">
        Encontre seu <span className="h1TittleDuo">duo</span> aqui!
      </h1>
      <div className="gameBanner keen-slider" ref={internalSliderRef}>
        {games.map((game) => {
          return (
            <div
              className="containerGameBanner keen-slider__slide"
              key={game.id}
            >
              <img src={game.bannerUrl} alt="" className="imgGameBanner" />
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
