import React, { useEffect, useState } from "react";
import axios from "axios";
const PokemonAbilities = ({ abilities, base_experience }) => {
  const [effects, setEffects] = useState([]);
  useEffect(() => {
    const getAbilityInfo = async () => {
      const e = [];
      abilities.forEach((ability) => {
        const res = axios.get(ability.ability.url);
        res.then((res) => e.push(res.data.effect_entries[0].effect)).catch();
      });
      setEffects(e);
    };
    getAbilityInfo();
  }, [abilities]);
  let displayAbilities = null;
  if (effects.length > 0) {
    displayAbilities = abilities.map((ability, key) => {
      return (
        <div key={key}>
          <p>{ability.ability.name}</p>
          <p key={key}>{effects[key]}</p>
        </div>
      );
    });
  }
  return (
    <div className="col-6">
      <strong>Abilities</strong>
      {displayAbilities}
      <p>Base Experience: {base_experience}</p>
    </div>
  );
};

export default PokemonAbilities;
