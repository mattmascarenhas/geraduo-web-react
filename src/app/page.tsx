"use client";
import CreateAdBanner from "@/components/CreateAdBanner";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react"; // import from 'keen-slider/react.es' for to get an ES module
import AdBannerLoggedOut from "@/components/AdBannerLoggedOut";
import { useSession } from "next-auth/react";
import CreateAdModal from "@/components/CreateAdModal";

interface IGame {
  id: string;
  title: string;
  bannerUrl: string;
}

export default function Home() {
  const [games, setGames] = useState<IGame[]>([]);
  const { data: session } = useSession();
  const sliderOptions = {
    slides: {
      perView: 6.2,
      spacing: 10,
    },
  };
  const [internalSliderRef, internalSlider] = useKeenSlider(sliderOptions);

  console.log(session);

  useEffect(() => {
    axios
      .get("http://localhost:5146/v1/games")
      .then((res) => setGames(res.data));
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
      {session ? (
        <Dialog.Root>
          <CreateAdBanner />
          <CreateAdModal />
        </Dialog.Root>
      ) : (
        <Dialog.Root>
          <AdBannerLoggedOut />
        </Dialog.Root>
      )}
    </div>
  );
}
