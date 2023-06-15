import { HTMLAttributes } from "react";

export interface IUserData {
  id: string;
  name: string;
  nickName: string;
  email: string;
  discord: string;
}

export interface IGame {
  id: string;
  title: string;
  bannerUrl: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface ICustomDivProps extends HTMLAttributes<HTMLDivElement> {
  value: boolean;
}
