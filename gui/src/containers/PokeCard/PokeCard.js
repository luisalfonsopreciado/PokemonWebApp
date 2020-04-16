import React from "react";
import axios from "axios";
import spinner from "./spinner.gif";
import styled from "styled-components";
import Button from "../../components/UI/Button/Button";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../store/actions/index";

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

class PokeCard extends React.Component {
  state = {
    img: "",
    pokemon: "",
    imageLoading: true,
    toManyRequests: false,
  };

  componentDidMount() {
    axios.get(this.props.url).then((res) => {
      this.setState({
        pokemon: res.data,
        img: res.data.sprites,
        id: res.data.id,
      });
    });
  }

  addToFavoriteHandler = (id, name) => {
    if (this.props.token) {
      this.props.addUserFavorite(id, name, this.props.token);
    } else {
      this.props.history.push("/login");
    }
  };

  removeFromFavoriteHandler = (id, name) => {
    if (this.props.token) {
      this.props.removeUserFavorite(id, name, this.props.token);
    } else {
      this.props.history.push("/login");
    }
  };

  render() {
    let element = (
      <FontAwesomeIcon
        icon={faStar}
        style={{ color: "#ccc", cursor: "pointer" }}
        onClick={() =>
          this.addToFavoriteHandler(this.state.id, this.props.pokemon.name)
        }
      />
    );
    if (this.props.isFavorite) {
      element = (
        <FontAwesomeIcon
          icon={faStar}
          style={{ color: "yellow", cursor: "pointer" }}
          onClick={() =>
            this.removeFromFavoriteHandler(this.state.id, this.props.pokemon.name)
          }
        />
      );
    }

    return (
      <div className="col-md-3 col-sm-6 mt-5">
        <div className="card bg-light">
          <div
            className="card-header bg-danger font-weight-bold"
            style={{ height: "40px", padding: "10px" }}
          >
            <h5 style={{ display: "inline-block" }}>{this.state.pokemon.id}</h5>
            <p className="font-weight-bold" style={{ float: "right" }}>
              {element}
            </p>
          </div>

          {this.state.imageLoading ? (
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
            src={this.state.img.front_default}
            style={
              this.state.toManyRequests
                ? { display: "none" }
                : this.state.imageLoading
                ? null
                : { display: "block" }
            }
            onLoad={() => this.setState({ imageLoading: false })}
            onError={() => this.setState({ toManyRequests: true })}
          />

          <div className="card-body mx-auto text-center">
            <h3 className="card-title">
              {this.props.pokemon.name
                .toLowerCase()
                .split(" ")
                .map(
                  (letter) =>
                    letter.charAt(0).toUpperCase() + letter.substring(1)
                )}
            </h3>
            <div className="mt-3">
              {/* <Button
                clicked={() => this.props.showModal(this.props.data)}
                btnType="Info"
              >
                Quick View
              </Button> */}
              <Button clicked={this.props.pokemonSelect} btnType="Danger">
                Detail View
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addUserFavorite: (id, name, token) =>
      dispatch(actions.addPokemonToApi(id, name, token)),
    removeUserFavorite: (id, name, token) =>
      dispatch(actions.removePokemonFromApi(id, name, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PokeCard));
