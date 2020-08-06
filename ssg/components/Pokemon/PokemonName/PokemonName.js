import React from "react";

const PokemonName = ({name}) => {
  return (
    <h4 className="mx-auto">
      {name
        .toLowerCase()
        .split(" ")
        .map((letter) => letter.charAt(0).toUpperCase() + letter.substring(1))}
    </h4>
  );
};
export default PokemonName
