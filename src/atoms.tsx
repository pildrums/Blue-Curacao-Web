import { atom } from "recoil";

interface ITodo {
  id: number;
  text: string;
}

interface ITodoState {
  [key: string]: string[];
}

export const todoState = atom<ITodoState>({
  key: "todo",
  default: {
    todo: ["a", "b"],
    doing: ["c", "d"],
    done: ["e", "f"],
  },
});
