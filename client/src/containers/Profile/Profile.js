import React, { useEffect, useCallback, useState } from "react";
import Spinner from "../../components/UI/Spinner/Spinner";
import PokeCard from "../../components/PokeCard/PokeCard";
import useAuth from "../../hooks/useAuth";
import useRequest from "../../hooks/useRequest";

const Profile = () => {
  const { user, redirect } = useAuth();
  const [favList, setFavList] = useState();

  const { doRequest: getFav } = useCallback(
    useRequest({
      url: process.env.REACT_APP_AUTH_SRV_URL + "/favorite",
      method: "get",
      onSuccess: (res) => {
        setFavList(res);
      },
    }),
    []
  );

  useEffect(() => {
    user && getFav();
  }, [getFav, user]);

  let userPokemon = <Spinner />;

  if (favList) {
    userPokemon = favList.map((pokemon) => {
      return (
        <PokeCard
          isFavorite={true}
          pokemon={{
            url: "https://pokeapi.co/api/v2/pokemon/" + pokemon,
            name: pokemon,
          }}
        />
      );
    });
  }

  return (
    <div>
      {redirect()}
      <br />
      <h1 className="text-center">Your Favorite Pokemon</h1>
      <div className="row container-fluid mx-auto">{userPokemon}</div>
    </div>
  );
};

export default Profile;
