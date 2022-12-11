export const requestAllPokemonWithExponentialBackoff = async (axios) => {
  let res = null;
  try {
    res = await requestPageWithExponentialBackoff(
      "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
      axios
    );
  } catch (errr) {
    throw "Failed to get all pokemon";
  }

  const url = "https://pokeapi.co/api/v2/pokemon/";

  const pokemon = {};

  for (let pokemonIdx = 0; pokemonIdx < res.data.results.length; pokemonIdx++) {
    // Get the pokemon ID from the URL: https://pokeapi.co/api/v2/pokemon/[ID]
    const pokemonId = (res.data.results[pokemonIdx].id = parseInt(
      res.data.results[pokemonIdx].url.slice(
        url.length,
        res.data.results[pokemonIdx].url.length - 1
      )
    ));
    pokemon[pokemonId] = {
      ...res.data.results[pokemonIdx],
      id: pokemonId,
    };
  }

  return pokemon;
};

export const requestPokemonData = async (axios, pokemonId) => {
  const pokemonData = await requestPageWithExponentialBackoff(
    "https://pokeapi.co/api/v2/pokemon/" + pokemonId + "/",
    axios
  );
  return pokemonData;
};

export const requestPageWithExponentialBackoff = async (
  url,
  axios,
  maxWait = 10000
) => {
  let retryCount = 0;

  while (Math.pow(2, retryCount) <= maxWait) {
    try {
      return await axios.get(url);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
      await sleep(Math.pow(2, retryCount));
    } finally {
      retryCount++;
    }
  }
  throw "Unable to fetch API data";
};

const sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
