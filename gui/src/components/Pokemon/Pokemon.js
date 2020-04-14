import React, { Component } from "react";
import classes from "./Pokemon.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../UI/Spinner/Spinner";
import CardHeader from "./CardHeader/CardHeader";
import CardBody from "./CardBody/CardBody";
import Button from "../UI/Button/Button";
import { withRouter } from "react-router";

class Pokemon extends Component {
  
  componentDidMount() {
    this.props.onLoadPokemon(this.props.match.params.id);
  }

  onButtonClickHandler = () =>{
    this.props.history.push("/")
  }

  render() {
    let isFavorite = this.props.userFavoritePokemon.includes(this.props.history.location.pathname.substring(9, 20))
    let card = <Spinner />;
    let PokemonIsDefined = !this.props.loading && this.props.pkm !== undefined;
    if (PokemonIsDefined) {
      card = (
        <div className={classes.Card}>
          <CardHeader isFavorite={isFavorite} types={this.props.pkm.types} id={this.props.pkm.id} />
          <CardBody
            name={this.props.pkm.name}
            imageURL={this.props.pkm.imageURL}
            name={this.props.pkm.name}
            stats={this.props.pkm.stats}
            height={this.props.pkm.height}
            weight={this.props.pkm.weight}
            abilities={this.props.pkm.abilities}
            base_experience={this.props.pkm.base_experience}
          />
        </div>
      );
    }
    return (
      <div className={classes.Pokemon}>
        {card}
        <Button clicked={this.onButtonClickHandler}>Back</Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pkm: state.pokemon.pokemon,
    loading: state.pokemon.loading,
    userFavoritePokemon: state.auth.userData.favoritePokemon
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLoadPokemon: (id) => dispatch(actions.fetchPokemonById(id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Pokemon));
