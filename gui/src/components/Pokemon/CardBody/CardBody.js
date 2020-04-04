import React from "react";
import PokemonStats from "../PokemonStats/PokemonStats";
import PokemonAbilities from "../PokemonAbilities/PokemonAbilities";
import PokemonName from "../PokemonName/PokemonName";

const CardBody = (props) => {
  return (
    <div className="card-body">
      <div className="row align-items-center">
        <div className="col-md-3">
          <img
            src={props.imageURL}
            className="card-img-top rounded mx-auto mt-2"
            alt=""
          />
        </div>
        <div className="col-md-9">
          <PokemonName name={props.name} />
          <PokemonStats stats={props.stats} />
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-12">
          <div className="row align-items-center">
            <div className="col-6 ">
              <br />
              <strong>Attributes</strong>
              <p>Height: {props.height}</p>
              <p>Weight: {props.weight}</p>
            </div>
            <PokemonAbilities
              abilities={props.abilities}
              base_experience={props.base_experience}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBody