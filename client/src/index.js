import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import pokemonReducer from "./store/reducers/pokemon";
import authReducer from "./store/reducers/auth";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { watchPokemon, watchAuth } from "./store/saga/index";

const composeEnhancers =
  (process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose; //Redux variables will only be able to be seen in development mode
const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  auth: authReducer,
});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchPokemon);
sagaMiddleware.run(watchAuth);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

serviceWorker.unregister();
