import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import * as actions from "../../store/actions/index";
import PokeCard from "../PokeCard/PokeCard";
import useAuth from "../../hooks/useAuth";

const Profile = (props) => {
  const { user, redirect } = useAuth();

  useEffect(() => {
    user && props.getUserFavoritePokemon(props.userId, props.token);
  }, []);

  const detailViewHandler = (pokemon) => {
    props.history.push("pokemon/" + pokemon);
  };

  const onViewModal = (pokemon) => {
    props.onQuickViewPokemon(pokemon);
  };

  const onRemoveModal = () => {
    props.onRemoveModal();
  };
  let content = <Spinner />;

  if (!props.loading) {
    content = (
      <ProfileCard
        email={props.userData.email}
        first_name={props.userData.first_name}
        last_name={props.userData.last_name}
        username={props.userData.username}
        onSubmit={props.authUpdateUser}
        token={props.token}
      />
    );
  }
  
  let userPokemon = null;
  if (props.userPokemon) {
    userPokemon = props.userPokemon.map((pokemon) => {
      return (
        <PokeCard
          url={"https://pokeapi.co/api/v2/pokemon/" + pokemon.name}
          pokemon={pokemon}
          key={pokemon.name}
          data={pokemon}
          isFavorite={true}
          showModal={onViewModal}
          pokemonSelect={() => detailViewHandler(pokemon.name)}
        />
      );
    });
  }

  return (
    <div>
      {redirect()}
      {content}
      <div className="row container-fluid mx-auto">{userPokemon}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData,
    loading: state.auth.loading,
    isAuth: state.auth.token !== null,
    userId: state.auth.userData.pk,
    token: state.auth.token,
    userPokemon: state.pokemon.favoritePokemon,
    displayModal: state.pokemon.displayModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserFavoritePokemon: (userId, token) =>
      dispatch(actions.getUserFavoritePokemon(userId, token)),
    onQuickViewPokemon: (pokemon) =>
      dispatch(actions.addPokemonToState(pokemon)),
    onRemoveModal: () => dispatch(actions.removePokemonFromState()),
    authUpdateUser: (userData, token) =>
      dispatch(actions.authUpdateUser(userData, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
