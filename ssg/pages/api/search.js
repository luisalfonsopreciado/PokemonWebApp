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
  const filter = req.query.q ? new RegExp(req.query.q, "i") : /.*/;
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const pokemon = await getPokemon();
  console.log(pokemon);
  res.end(
    JSON.stringify(
      Object.values(pokemon)
        .filter(({ name }) => name.match(filter))
        .slice(0, 9)
    )
  );
};
