import React, { Component } from "react";
import PokeCard from "../PokeCard/PokeCard";
import { getPokemonTypes } from "../../shared/utility";
import {
  createForm,
  updateObject,
  getPokemonArrayByType,
} from "../../shared/utility";
import classes from "./PokeSearch.module.css";
import Types from "./Types/Types";
import Button from "../../components/UI/Button/Button";

class PokeSearch extends Component {
  state = {
    loading: true,
    form: {},
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
    },

    pokemons: [],
  };
  componentDidMount() {}

  detailViewHandler(pokemon) {
    this.props.history.push("pokemon/" + pokemon);
  }
  submitHandler = (event, id) => {
    event.preventDefault();
    console.log(this.state.types.value);
    const pokemons = getPokemonArrayByType(this.state.types.value);
    pokemons.then((pokemons) => this.setState({ pokemons }));
  };
  inputTypeChangedHandler = (event, field) => {
    const updatedFormElement = updateObject(eval("this.state." + field), {
      ...eval("this.state." + field),
      value: event.target.value,
    });
    this.setState({ types: updatedFormElement });
  };
  inputTypeChangedHandler = (event, field) => {
    const updatedFormElement = updateObject(this.state.abilities, {
      ...this.state.abilities,
      value: event.target.value,
    });
    this.setState({ abilities: updatedFormElement });
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
            types={this.state.types}
            inputChangedHandler={this.inputTypeChangedHandler}
            getOptions={() => getPokemonTypes("https://pokeapi.co/api/v2/type")}
          />
          <Types
            types={this.state.abilities}
            inputChangedHandler={this.inputTypeChangedHandler}
            getOptions={() =>
              getPokemonTypes("https://pokeapi.co/api/v2/ability/")
            }
          />
          <Types
            types={this.state.nature}
            inputChangedHandler={this.inputTypeChangedHandler}
            getOptions={() =>
              getPokemonTypes("https://pokeapi.co/api/v2/nature/")
            }
          />
          <Types
            types={this.state.habitat}
            inputChangedHandler={this.inputTypeChangedHandler}
            getOptions={() =>
              getPokemonTypes("https://pokeapi.co/api/v2/pokemon-habitat/")
            }
          />
          <Types
            types={this.state.species}
            inputChangedHandler={this.inputTypeChangedHandler}
            getOptions={() =>
              getPokemonTypes("https://pokeapi.co/api/v2/pokemon-species/")
            }
          />
          <Types
            types={this.state.generations}
            inputChangedHandler={this.inputTypeChangedHandler}
            getOptions={() =>
              getPokemonTypes("https://pokeapi.co/api/v2/generation/")
            }
          />
          <Types
            types={this.state.eggGroup}
            inputChangedHandler={this.inputTypeChangedHandler}
            getOptions={() =>
              getPokemonTypes("https://pokeapi.co/api/v2/egg-group/")
            }
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

export default PokeSearch;
