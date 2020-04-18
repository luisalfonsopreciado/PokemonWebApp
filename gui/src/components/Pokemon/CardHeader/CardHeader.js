import React from "react";
import classes from "./CardHeader.module.css";
import PokemonType from "../PokemonType/PokemonType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const CardHeader = ({starClicked, isFavorite, id, types, name}) => {
  let star = (
    <FontAwesomeIcon
      icon={faStar}
      style={{ color: "#ccc", cursor: "pointer"}}
      onClick={()=> starClicked(id, name)}
    />
  );
  if(isFavorite){
    star = <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
  }
  return (
    <div className={classes.CardHeader}>
      <div className={classes.Row}>
        <div className={classes.Col2}>
          <div className={classes.Id}>
            <h5>{id}</h5>
          </div>
          {star}
        </div>
        <PokemonType types={types} />
        
      </div>
    </div>
  );
};
export default CardHeader;
