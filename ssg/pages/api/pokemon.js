import axios from "axios";
import { requestAllPokemonWithExponentialBackoff } from "../../util";

let pokemonCache = [];

const getPokemon = async () => {
  if (pokemonCache.length > 0) {
    return pokemonCache;
  }
  pokemonCache = await requestAllPokemonWithExponentialBackoff(axios);
  return pokemonCache;
};
export default async (req, res) => {
  if (!req.query.name) {
    res.statusCode = 400;
    res.end("Must have a name");
  } else {
    const pokemon = await getPokemon();
    const found = Object.values(pokemon).filter(({ name }) => name === req.query.name);
    if (found.length === 0) {
      res.statusCode = 404;
      res.end(`Pokemon ${req.query.name} not found`);
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(found[0]));
    }
  }
};
