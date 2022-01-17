import { createStore } from "redux";
import { ReducerState } from "./types";
const INITIAL_L_VIDEO_STATE = {} as ReducerState;
const reducer = (state = INITIAL_L_VIDEO_STATE, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.data };
    case "SET_LIKE":
      let videos = state.data;
      let id = videos.findIndex((t) => t.id === action.data.id);
      videos[id].qtdReactions = videos[id].qtdReactions + action.data.value;
      return { ...state, data: videos };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
