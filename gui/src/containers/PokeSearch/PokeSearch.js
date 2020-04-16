import React, { Component } from "react";
import PokeCard from "../PokeCard/PokeCard";
import { getPokemonTypes, createFormElementsArray} from "../../shared/utility";
import {
  updateObject,
  getPokemonArrayByType,
} from "../../shared/utility";
import classes from "./PokeSearch.module.css";
import Types from "./Types/Types";
import Button from "../../components/UI/Button/Button";

class PokeSearch extends Component {
  state = {
    loading: true,
    form: {
      types: {
        elementType: "select",
        elementConfig: {
          options: [],
        },
        value: -1,
        validation: {
          required: true,
        },
        label: "Type",
        url: "https://pokeapi.co/api/v2/type",
      },
      abilities: {
        elementType: "select",
        elementConfig: {
          options: [],
        },
        value: -1,
        validation: {
          required: true,
        },
        label: "Abilities",
        url: "https://pokeapi.co/api/v2/ability/",
      },
      nature: {
        elementType: "select",
        elementConfig: {
          options: [],
        },
        value: -1,
        validation: {
          required: true,
        },
        label: "Nature",
        url: "https://pokeapi.co/api/v2/nature/",
      },
      habitat: {
        elementType: "select",
        elementConfig: {
          options: [],
        },
        value: -1,
        validation: {
          required: true,
        },
        label: "Habitat",
        url: "https://pokeapi.co/api/v2/pokemon-habitat/",
      },
      species: {
        elementType: "select",
        elementConfig: {
          options: [],
        },
        value: -1,
        validation: {
          required: true,
        },
        label: "Species",
        url: "https://pokeapi.co/api/v2/pokemon-species/",
      },
      generations: {
        elementType: "select",
        elementConfig: {
          options: [],
        },
        value: -1,
        validation: {
          required: true,
        },
        label: "Generations",
        url: "https://pokeapi.co/api/v2/generation/",
      },
      eggGroup: {
        elementType: "select",
        elementConfig: {
          options: [],
        },
        value: -1,
        validation: {
          required: true,
        },
        label: "Egg Group",
        url: "https://pokeapi.co/api/v2/egg-group/",
      },
    },
    pokemons: [],
  };

  detailViewHandler(pokemon) {
    this.props.history.push("pokemon/" + pokemon);
  }
  submitHandler = (event, id) => {
    event.preventDefault();
    console.log(this.state.form);
    const pokemons = getPokemonArrayByType(this.state.types.value);
    pokemons.then((pokemons) => this.setState({ pokemons }));
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.form[inputIdentifier],
      {
        value: event.target.value,
        valid: true,
      }
    );
    const updatedform = updateObject(this.state.form, {
      [inputIdentifier]: updatedFormElement,
    });

    this.setState({ form: updatedform});
  };

  render() {
    let PokemonList = null;
    if (this.state.pokemons.length > 0) {
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

    const options = createFormElementsArray(this.state.form);
    console.log(options);
    let optionsForm = options.map((formElement, key) => {
      console.log(formElement.config);
      return (
        <Types
          key={formElement.id}
          types={formElement.config}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}
          getOptions={() => getPokemonTypes(formElement.config.url)}
        />
      );
    });
    return (
      <div>
        <div className={classes.formContainer}>


          <form onSubmit={this.submitHandler}>
            {optionsForm}
            <Button btnType="Info">Submit</Button>
          </form>
        </div>

        <div className="row container-fluid mx-auto">{PokemonList}</div>
      </div>
    );
  }
}

export default PokeSearch;
