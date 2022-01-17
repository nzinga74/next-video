import { ReducerState } from "../types";
import { LikeParams } from "./types";
export const toogleData = (data: ReducerState) => {
  return {
    type: "SET_DATA",
    data,
  };
};

export const toogleLike = (data: LikeParams) => {
  return {
    type: "SET_LIKE",
    data,
  };
};
