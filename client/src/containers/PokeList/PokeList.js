import React, { useState, useEffect, useCallback } from "react";
import PageManager from "../../components/PageManager/PageManager";
import PokeCard from "../../components/PokeCard/PokeCard";
import Spinner from "../../components/UI/Spinner/Spinner";
import useAuth from "../../hooks/useAuth";
import useRequest from "../../hooks/useRequest";
import { useStore } from "../../hooks-store/store";

const PokeList = (props) => {
  const [loading, setLoading] = useState(true);
  const [pokeList, setPokeList] = useState();
  const [favList, setFavList] = useState([]);
  const { user } = useAuth();
  const [state] = useStore();

  console.log(state);

  const { doRequest, errors } = useCallback(
    useRequest({
      url: process.env.REACT_APP_AUTH_SRV_URL + "/favorite",
      method: "get",
      onSuccess: (res) => {
        setFavList(res);
      },
    }),
    []
  );

  const { doRequest: getPokemonList } = useCallback(
    useRequest({
      url:
        process.env.REACT_APP_POKE_BASE_URL +
        "?offset=" +
        state.offset +
        "&limit=" +
        state.limit,
      method: "get",
      onSuccess: (res) => {
        setPokeList(res.results);
        setLoading(false);
      },
    }),
    [state]
  );

  useEffect(() => {
    const getInfo = async () => {
      user && (await doRequest());
      await getPokemonList();
    };
    getInfo();
    // get FavList
  }, [state, getPokemonList, doRequest, user]);

  let PokemonList = <Spinner />;

  if (pokeList && !loading) {
    PokemonList = pokeList.map((pokemon, key) => {
      return (
        <PokeCard
          isFavorite={favList.includes(pokemon.name)}
          pokemon={pokemon}
          key={pokemon.name}
        />
      );
    });
  }

  return (
    <div>
      <div className="row container-fluid mx-auto">
        {errors}
        {PokemonList}
      </div>
      <PageManager />
    </div>
  );
};

export default PokeList;
