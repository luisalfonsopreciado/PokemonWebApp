import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import * as actions from "../../store/actions/index";
import PokeCard from "../PokeCard/PokeCard";

class Profile extends Component {
  componentDidMount() {
    if (this.props.userId !== undefined && this.props.token !== undefined) { //place it cuz user fav get loaded on pokelist IDK why
      this.props.getUserFavoritePokemon(this.props.userId, this.props.token);
    }
  }

  detailViewHandler(pokemon) {
    this.props.history.push("pokemon/" + pokemon);
  }

  onViewModal = (pokemon) => {
    this.props.onQuickViewPokemon(pokemon);
  };
  onRemoveModal = () => {
    this.props.onRemoveModal();
  };
  render() {
    let content = <Spinner />;
    let isAuthenticated = null;
    if (!this.props.isAuth) {
      isAuthenticated = <Redirect to="/login" />;
    }
    if (!this.props.loading) {
      content = (
        <ProfileCard
          email={this.props.userData.email}
          first_name={this.props.userData.first_name}
          last_name={this.props.userData.last_name}
          username={this.props.userData.email}
        />
      );
    }
    let userPokemon = null;
    if (this.props.userPokemon) {
      userPokemon = this.props.userPokemon.map((pokemon) => {
        return (
          <PokeCard
            url={"https://pokeapi.co/api/v2/pokemon/" + pokemon.name}
            pokemon={pokemon}
            key={pokemon.name}
            data={pokemon}
            showModal={this.onViewModal}
            pokemonSelect={() => this.detailViewHandler(pokemon.name)}
          />
        );
      });
    }

    return (
      <div>
        {isAuthenticated}
        {content}
        {userPokemon}
      </div>
    );
  }
}

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
    getUserFavoritePokemon: (userId) =>
      dispatch(actions.getUserFavoritePokemon(userId)),
    onQuickViewPokemon: (pokemon) =>
      dispatch(actions.addPokemonToState(pokemon)),
    onRemoveModal: () => dispatch(actions.removePokemonFromState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
