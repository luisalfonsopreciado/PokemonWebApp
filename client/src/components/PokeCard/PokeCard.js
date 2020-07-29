import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import spinner from "./spinner.gif";
import styled from "styled-components";
import Button from "../UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import useRequest from "../../hooks/useRequest";

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

const PokeCard = ({ isFavorite, pokemon }) => {
  const [img, setImg] = useState("");
  const [imgLoading, setImgLoading] = useState(true);
  const [toManyRequests, setToManyRequests] = useState(false);
  const [isFav, setIsFav] = useState(isFavorite);
  const [pokemonId, setPokemonId] = useState();
  const history = useHistory();
  const { user } = useAuth();

  useEffect(() => {
    const getPokemonData = async () => {
      const res = await axios.get(pokemon.url);
      setImg(res.data.sprites);
      setPokemonId(res.data.id);
    };
    getPokemonData();
  }, [pokemon]);

  const { doRequest: addToFav } = useCallback(
    useRequest({
      url: process.env.REACT_APP_AUTH_SRV_URL + "/addFavorite",
      method: "post",
      body: { name: pokemon.name },
      onSuccess: (res) => {
        console.log(res);
        setIsFav(true)
      },
    }),
    []
  );

  const { doRequest: removeFromFav } = useCallback(
    useRequest({
      url: process.env.REACT_APP_AUTH_SRV_URL + "/removeFavorite",
      method: "post",
      body: { name: pokemon.name },
      onSuccess: (res) => {
        console.log(res);
        setIsFav(false)
      },
    }),
    []
  );
  const toggleFavorite = (id, name) => {
    if (!user) return history.push("/login");
    if (!isFav) return addToFav();
    return removeFromFav();
    // send request to server
  };
  let element = (
    <FontAwesomeIcon
      icon={faStar}
      style={{ color: isFav ? "yellow" : "white", cursor: "pointer" }}
      onClick={() => toggleFavorite(pokemonId, pokemon.name)}
    />
  );

  return (
    <div className="col-md-3 col-sm-6 mt-5">
      <div className="card bg-light">
        <div
          className="card-header bg-danger font-weight-bold"
          style={{ height: "40px", padding: "10px" }}
        >
          <h5 style={{ display: "inline-block" }}>{pokemonId}</h5>
          <p className="font-weight-bold" style={{ float: "right" }}>
            {element}
          </p>
        </div>

        {imgLoading ? (
          <img
            src={spinner}
            style={{ width: "100px", height: "100px" }}
            className="card-img-top mx-auto rounded d-block mt-2"
            alt=""
          />
        ) : null}
        <Sprite
          className="card-img-top rounded mx-auto mt-2"
          alt="Pokemon"
          src={img.front_default}
          style={
            toManyRequests
              ? { display: "none" }
              : imgLoading
              ? null
              : { display: "block" }
          }
          onLoad={() => setImgLoading(false)}
          onError={() => setToManyRequests(true)}
        />

        <div className="card-body mx-auto text-center">
          <h3 className="card-title">{formatName(pokemon.name)}</h3>
          <div className="mt-3">
            <Button
              clicked={() => history.push("/pokemon/" + pokemonId)}
              btnType="Danger"
            >
              Detail View
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatName = (name) => {
  return name
    .toLowerCase()
    .split(" ")
    .map((letter) => letter.charAt(0).toUpperCase() + letter.substring(1));
};

export default PokeCard;
