import React from "react";
import classes from './CardHeader.module.css'
import PokemonType from "../PokemonType/PokemonType";

const CardHeader = (props) => {
  return (
    <div className={classes.CardHeader}>
      <div className={classes.Row}>
        <div className={classes.Col2}>
          <div className={classes.Id}>
            <h5>{props.id}</h5>
          </div>
        </div>
        <PokemonType types={props.types} />
      </div>
    </div>
  );
};
export default CardHeader
