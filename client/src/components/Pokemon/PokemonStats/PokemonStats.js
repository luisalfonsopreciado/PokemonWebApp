import React from "react";

const PokemonStats = ({stats}) => {
  return stats.map((stat, key) => (
    <div key={key} className="row align-items-center">
      <div className="col-md-3">
        <p>{stat.stat.name}</p>
      </div>
      <div className="col-md-9">
        <div className="progress">
          <div
            className="progress-bar"
             // role="progressBar"
            style={{
              width: `${stat.base_stat}%`,
            }}
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <small>{stat.base_stat}</small>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default PokemonStats
