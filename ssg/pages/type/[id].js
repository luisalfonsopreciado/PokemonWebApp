import { Container, Alert, Col, Row } from "react-bootstrap";
import axios from "axios";
import Link from "next/link";

export async function getStaticPaths() {
  const res = await axios.get(
    "https://pokeapi.co/api/v2/type?offset=0&limit=100000"
  );
  const types = res.data.results;

  const paths = types.map(({ url }, key) => {
    const id = url
      .replace("https://pokeapi.co/api/v2/type/", "")
      .replace("/", "")
      .toString();

    return {
      params: {
        id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const res = await axios.get(
    "https://pokeapi.co/api/v2/type/" + context.params.id
  );

  return {
    props: {
      apiData: res.data,
    },
  };
}

export default ({ apiData }) => {
  return (
    <div>
      <Container>
        <h1>Type {apiData.name}</h1>
        <Row>
          <Col xs={5}>
            <h3>Moves</h3>
            {apiData.moves.map((move, key) => {
              return (
                <Link
                  href={
                    "/" + move.url.replace("https://pokeapi.co/api/v2/", "")
                  }
                >
                  <Alert key={key} variant="primary">
                    {move.name}
                  </Alert>
                </Link>
              );
            })}
          </Col>
          <Col xs={5}>
            <h3>Pokemon</h3>
            {apiData.pokemon.map(({ pokemon }, key) => {
              return (
                <Link
                  href={
                    "/" + pokemon.url.replace("https://pokeapi.co/api/v2/", "")
                  }
                >
                  <Alert key={key} variant="primary">
                    {pokemon.name}
                  </Alert>
                </Link>
              );
            })}
          </Col>
        </Row>

        {JSON.stringify(apiData)}
      </Container>
    </div>
  );
};
