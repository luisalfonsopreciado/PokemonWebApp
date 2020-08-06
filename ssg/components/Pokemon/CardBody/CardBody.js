import React from "react";
import PokemonStats from "../PokemonStats/PokemonStats";
import PokemonAbilities from "../PokemonAbilities/PokemonAbilities";
import PokemonName from "../PokemonName/PokemonName";

const CardBody = ({
  imageURL,
  name,
  stats,
  height,
  weight,
  abilities,
  base_experience,
}) => {
  return (
    <div className="card-body">
      <div className="row align-items-center">
        <div className="col-md-3">
          <img
            src={imageURL}
            className="card-img-top rounded mx-auto mt-2"
            alt=""
          />
        </div>
        <div className="col-md-9">
          <PokemonName name={name} />
          <PokemonStats stats={stats} />
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-12">
          <div className="row align-items-center">
            <div className="col-6 ">
              <br />
              <strong>Attributes</strong>
              <p>Height: {height}</p>
              <p>Weight: {weight}</p>
            </div>
            <PokemonAbilities
              abilities={abilities}
              base_experience={base_experience}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBody;
