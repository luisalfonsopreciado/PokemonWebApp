import Head from "next/head";
import { Container, Row, Col, Alert, ProgressBar } from "react-bootstrap";
import pokemon from "../../pokemon.json";
import axios from "axios";
import Link from "next/link";

export async function getStaticPaths() {
  return {
    paths: pokemon.map(({ id }) => ({
      params: {
        id: id.toString(),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const res = await axios.get(
    "https://pokeapi.co/api/v2/pokemon/" + context.params.id
  );

  return {
    props: {
      data: pokemon[context.params.id - 1],
      apiData: res.data,
    },
  };
}

export default ({ data, apiData }) => {
  return (
    <div>
      <Head>
        <title>{(data && data.name.english) || "Pokemon"}</title>
      </Head>
      <Container>
        {data && (
          <>
            <h1>{data.name.english}</h1>
            <Row>
              <Col xs={4}>
                <img
                  src={`/pokemon/${data.name.english
                    .toLowerCase()
                    .replace(" ", "-")}.jpg`}
                  style={{
                    width: "100%",
                  }}
                />
              </Col>
              <Col xs={8}>
                {Object.entries(data.base).map(([key, value]) => (
                  <Row key={key}>
                    <Col xs={2}>{key}</Col>
                    <Col xs={10}>
                      <ProgressBar now={value} label={`${value}`} />
                    </Col>
                  </Row>
                ))}
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <h2>Types</h2>
                {apiData.types.map(({ type }, key) => {
                  return (
                    <Link
                      href={type.url.replace("https://pokeapi.co/api/v2", "")}
                    >
                      <Col xs={10} key={key}>
                        <Alert variant="secondary">{type.name}</Alert>
                      </Col>
                    </Link>
                  );
                })}
              </Col>
            </Row>
            <Row>
              <Col xs={5}>
                <h3>Moves</h3>
                {apiData.moves.map(({ move }, key) => {
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
              <Col>
                <h2>Abilities</h2>
                {apiData.abilities.map(({ ability }, key) => {
                  return (
                    <Link
                      href={
                        "/" +
                        ability.url.replace("https://pokeapi.co/api/v2/", "")
                      }
                    >
                      <Alert key={key} variant="primary">
                        {ability.name}
                      </Alert>
                    </Link>
                  );
                })}
              </Col>
            </Row>
          </>
        )}
        {/* {JSON.stringify(apiData.moves)} */}
      </Container>
    </div>
  );
};
