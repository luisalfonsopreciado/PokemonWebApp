import React, { Component } from "react";
import PokeCard from "../PokeCard/PokeCard";
import Spinner from "../../components/UI/Spinner/Spinner";
import {
  createForm,
  updateObject,
  getPokemonArrayByType,
} from "../../shared/utility";
import classes from "./PokeSearch.module.css";
import Types from "./Types/Types";
import Button from "../../components/UI/Button/Button";

class PokeList extends Component {
  state = {
    loading: true,
    form: {},
    ticker: {
      elementType: "select",
      elementConfig: {
        options: [],
      },
      value: 1,
      validation: {
        required: true,
      },
      label: "Type",
    },
    pokemons: [],
  };
  componentDidMount() {}

  detailViewHandler(pokemon) {
    this.props.history.push("pokemon/" + pokemon);
  }
  submitHandler = (event, id) => {
    event.preventDefault();
    console.log(this.state.ticker.value);
    const pokemons = getPokemonArrayByType(this.state.ticker.value);
    pokemons.then((pokemons) => this.setState({ pokemons }));
  };
  inputTickerChangedHandler = (event) => {
    const updatedFormElement = updateObject(this.state.ticker, {
      ...this.state.ticker,
      value: event.target.value,
    });
    this.setState({ ticker: updatedFormElement });
  };

  render() {
    let PokemonList = <p>Filter Pokemon</p>;
    const form = createForm(this.state.form);
    if (this.state.pokemons.length > 0) {
      console.log("start render pokemon");
      PokemonList = this.state.pokemons.map((pokemon, key) => {
        return (
          <PokeCard
            isFavorite={
              this.props.favoritePokemonIdArray
                ? this.props.favoritePokemonIdArray.includes(pokemon.name)
                : false
            }
            url={pokemon.pokemon.url}
            pokemon={pokemon.pokemon}
            key={pokemon.pokemon.name}
            data={pokemon.pokemon}
            showModal={this.onViewModal}
            pokemonSelect={() => this.detailViewHandler(pokemon.pokemon.name)}
          />
        );
      });
    }
    console.log(this.state.pokemons);
    return (
      <div>
        <div className={classes.formContainer}>
          <Types
            ticker={this.state.ticker}
            inputChangedHandler={this.inputTickerChangedHandler}
          />
          <form onSubmit={this.submitHandler}>
            {form}
            <Button btnType="Info">Submit</Button>
          </form>
        </div>

        <div className="row container-fluid mx-auto">{PokemonList}</div>
      </div>
    );
  }
}

export default PokeList;
