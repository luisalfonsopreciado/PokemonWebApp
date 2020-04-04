import React from "react";

const PokemonAbilities = (props) => {
  return (
    <div className="col-6">
      <strong>Abilities</strong>
      {props.abilities.map((ability, key) => {
        return <p key={key}>{ability.ability.name}</p>;
      })}
      <p>Base Experience: {props.base_experience}</p>
    </div>
  );
};

export default PokemonAbilities
