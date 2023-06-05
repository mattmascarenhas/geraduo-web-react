"use client";
import CreateAdBanner from "@/components/CreateAdBanner";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react"; // import from 'keen-slider/react.es' for to get an ES module
import CreateAdModal from "@/components/CreateAdModal";

interface IGame {
  id: string;
  title: string;
  bannerUrl: string;
}

export default function Home() {
  const [games, setGames] = useState<IGame[]>([]);
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 6.2,
      spacing: 15,
    },
  });
  useEffect(() => {
    axios
      .get("http://localhost:5146/v1/games")
      .then((res) => setGames(res.data));
  }, []);

  return (
    <div className="container">
      <img src="logo-esports.svg" alt="" />
      <h1 className="h1Title">Encontre seu duo aqui!</h1>
      <div className="gameBanner keen-slider" ref={ref}>
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
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}
