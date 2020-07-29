import React, { useState, useEffect, useCallback } from "react";
import PageManager from "../../components/PageManager/PageManager";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
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
        setLoading(false);
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
    user && doRequest();
  }, [doRequest]);

  useEffect(() => {
    setLoading(true);
    getPokemonList();
    // get FavList
  }, [state, getPokemonList]);

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
      <PageManager
        lower={props.pkm.offset}
        upper={964}
        next={() => props.nextPage(props.pkm.offset, props.pkm.limit)}
        previous={() => props.previousPage(props.pkm.offset, props.pkm.limit)}
      />
    </div>
  );
};

const mapStateToProp = (state) => {
  return {
    pkm: state.pokemon,
    displayModal: state.pokemon.displayModal,
    favoritePokemonIdArray: state.auth.userData.favoritePokemon,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPokemon: (upperBound, lowerBound) =>
      dispatch(actions.fetchPokemonList(upperBound, lowerBound)),
    nextPage: (upperBound, lowerBound) =>
      dispatch(actions.nextPokemonPage(upperBound, lowerBound)),
    previousPage: (upperBound, lowerBound) =>
      dispatch(actions.previousPokemonPage(upperBound, lowerBound)),
    onQuickViewPokemon: (pokemon) =>
      dispatch(actions.addPokemonToState(pokemon)),
    onRemoveModal: () => dispatch(actions.removePokemonFromState()),
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(PokeList);
