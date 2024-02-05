import { IHomeStore } from "./home";

export * from "./home";

export interface IStore {
  home: IHomeStore;
}
