import React, { useCallback, useEffect, useState } from "react";
import classes from "./CardHeader.module.css";
import PokemonType from "../PokemonType/PokemonType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import useRequest from "../../../hooks/useRequest";
import { useHistory } from "react-router";
import useAuth from "../../../hooks/useAuth";

const CardHeader = ({ id, types, name }) => {
  const [favList, setFavList] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const history = useHistory();
  const { user } = useAuth();

  const { doRequest: getFav } = useCallback(
    useRequest({
      url: process.env.REACT_APP_AUTH_SRV_URL + "/favorite",
      method: "get",
      onSuccess: (res) => {
        setFavList(res);
        console.log(name)
        setIsFav(favList.includes(name));
      },
    }),
    []
  );

  const { doRequest: addToFav } = useCallback(
    useRequest({
      url: process.env.REACT_APP_AUTH_SRV_URL + "/addFavorite",
      method: "post",
      body: { name },
      onSuccess: (res) => {
        setIsFav(true);
      },
    }),
    []
  );

  const { doRequest: removeFromFav } = useCallback(
    useRequest({
      url: process.env.REACT_APP_AUTH_SRV_URL + "/removeFavorite",
      method: "post",
      body: { name },
      onSuccess: (res) => {
        setIsFav(false);
      },
    }),
    []
  );

  const toggleFavorite = () => {
    if (!user) return history.push("/login");
    if (!isFav) return addToFav();
    return removeFromFav();
  };

  useEffect(() => {
    getFav();
  }, []);

  let star = (
    <FontAwesomeIcon
      icon={faStar}
      style={{
        color: isFav ? "yellow" : "#ccc",
        cursor: "pointer",
      }}
      onClick={toggleFavorite}
    />
  );
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
