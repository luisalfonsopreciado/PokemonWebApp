import React, { Component } from "react";
import PokeCard from "../PokeCard/PokeCard";
import Spinner from "../../components/UI/Spinner/Spinner";
import { createForm, updateObject } from "../../shared/utility";
import classes from "./PokeSearch.module.css";
import Types from "./Types/Types";

class PokeList extends Component {
  state = {
    loading: true,
    form: {
      
    },
    ticker: {
        elementType: "select",
        elementConfig: {
          options: [],
        },
        value: "",
        validation: {
          required: true,
        },
        label: "Type",
      },
  };
  componentDidMount() {}
  inputTickerChangedHandler = (event) => {
    const updatedFormElement = updateObject(
      this.state.ticker,
      {
        ...this.state.ticker,
        value: event.target.value,
      }
    );
    this.setState({ ticker: updatedFormElement});
  };
  render() {
    let PokemonList = <Spinner />;
    const form = createForm(this.state.form);
    // if(this.props.pkm.pokemons){
    //     PokemonList = this.props.pkm.pokemons.map((pokemon, key) =>{
    //         return <PokeCard
    //         isFavorite={this.props.favoritePokemonIdArray ? this.props.favoritePokemonIdArray.includes(pokemon.name) : false}
    //         url={pokemon.url}
    //         pokemon={pokemon}
    //         key={pokemon.name}
    //         data={pokemon}
    //         showModal={this.onViewModal}
    //         pokemonSelect={() => this.detailViewHandler(pokemon.name)}
    //         />
    //     })
    // }
    return (
      <div>
        <div className={classes.formContainer}>
          <Types
            ticker={this.state.ticker}
            inputChangedHandler={this.inputTickerChangedHandler}
          />
          {form}
        </div>

        <div className="row container-fluid mx-auto">{PokemonList}</div>
      </div>
    );
  }
}

export default PokeList;
