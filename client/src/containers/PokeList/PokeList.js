import React, { useState, useEffect, useCallback } from "react";
import PageManager from "../../components/PageManager/PageManager";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import PokeCard from "../../components/PokeCard/PokeCard";
import Spinner from "../../components/UI/Spinner/Spinner";
import useAuth from "../../hooks/useAuth";
import useRequest from "../../hooks/useRequest";

const PokeList = (props) => {
  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [favList, setFavList] = useState([]);
  const { user } = useAuth();

  const { doRequest, errors } = useCallback(
    useRequest({
      url: process.env.REACT_APP_AUTH_SRV_URL + "/favorite",
      method: "get",
      onSuccess: (res) => {
        setFavList(res);
        setLoading(false)
      },
    }),
    []
  );

  useEffect(() => {
    props.getPokemon(props.pkm.offset, props.pkm.limit);
    // get FavList
    user && doRequest();
  }, []);

  let PokemonList = <Spinner />;

  if (props.pkm.pokemons && !loading) {
    PokemonList = props.pkm.pokemons.map((pokemon, key) => {
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
