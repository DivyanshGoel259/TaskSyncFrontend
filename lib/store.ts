import { UserType } from "../types";
import createNewStore from "./zustand";

interface GlobalStateType {
  user: UserType | null;
}

const initialState: GlobalStateType = {
  user: null,
};
export const globalState = createNewStore(initialState, {
  name: "global",
  devTools: true,
  persist: true,
});
