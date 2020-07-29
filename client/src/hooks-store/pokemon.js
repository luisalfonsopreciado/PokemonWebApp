import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    NEXT_PAGE: (state, action) => {
      return {...state, offset: state.offset + 20};
    },
    PREV_PAGE: (state, action) => {
      return {...state, offset: state.offset - 20};
    },
  };
  initStore(actions, { offset: 0, limit: 20 });
};

export default configureStore;
