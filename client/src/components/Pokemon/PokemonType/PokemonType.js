import React from "react";
import {TYPE_COLOR} from '../PokemonConstants'
import classes from './PokemonType.module.css'

const PokemonType = ({types}) => {
  return (
    <div className={classes.Col10}>
      <div className={classes.Types}>
        {types.map((type) => (
          <span
            key={type}
            className="badge badge-primary badge-pill mr-1"
            style={{ backgroundColor: `${TYPE_COLOR[type]}` }}
          >
            {type
              .toLowerCase()
              .split(" ")
              .map(
                (letter) => letter.charAt(0).toUpperCase() + letter.substring(1)
              )}
          </span>
        ))}
      </div>
    </div>
  );
};
export default PokemonType
