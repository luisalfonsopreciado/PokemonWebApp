import Head from "next/head";
import {
  Container,
  Row,
  Col,
  Alert,
  ProgressBar,
  Image,
} from "react-bootstrap";
import pokemon from "../../pokemon.json";
import axios from "axios";
import Link from "next/link";
import { TYPE_COLOR } from "../../constants";

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
    // Pokemon Info
    "https://pokeapi.co/api/v2/pokemon/" + context.params.id
  );
  const response = await axios.get(
    // Pokemon form Data
    "https://pokeapi.co/api/v2/pokemon-form/" + context.params.id
  );

  return {
    props: {
      data: pokemon[context.params.id - 1],
      apiData: res.data,
      formData: response.data,
    },
  };
}

export default ({ data, apiData, formData }) => {
  const sprites = Object.keys(formData.sprites);
  return (
    <div className="bg-dark">
      <Head>
        <title>{(data && data.name.english) || "Pokemon"}</title>
      </Head>
      <Container className="p-5">
        {data && (
          <>
            <Row className="border p-1 bg-white rounded">
              <Col xs={4}>
                <h1 className="text-center">{data.name.english}</h1>
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
                <Row>
                  <h4>Types</h4>

                  {apiData.types.map(({ type }, key) => {
                    return (
                      <>
                        <Link
                          href={type.url.replace(
                            "https://pokeapi.co/api/v2",
                            ""
                          )}
                        >
                          <span
                            className="badge badge-primary badge-pill m-auto"
                            style={{
                              backgroundColor: `${TYPE_COLOR[type.name]}`,
                            }}
                          >
                            {type.name
                              .toLowerCase()
                              .split(" ")
                              .map(
                                (letter) =>
                                  letter.charAt(0).toUpperCase() +
                                  letter.substring(1)
                              )}
                          </span>
                        </Link>
                      </>
                    );
                  })}
                </Row>
                {Object.entries(data.base).map(([key, value]) => (
                  <Row key={key}>
                    <Col xs={2}>{key}</Col>
                    <Col xs={10}>
                      <ProgressBar now={value} label={`${value}`} />
                    </Col>
                  </Row>
                ))}
                <Row>
                  <Col xs={2}>Weight</Col>
                  <Col xs={10}>
                    <ProgressBar
                      now={apiData.weight}
                      label={`${apiData.weight}`}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={2}>Abilities</Col>
                  <Col xs={10}>
                    {apiData.abilities.map(({ ability }, key) => {
                      return (
                        <Link
                          href={
                            "/" +
                            ability.url.replace(
                              "https://pokeapi.co/api/v2/",
                              ""
                            )
                          }
                        >
                          <span className="badge badge-primary badge-pill ml-1 bg-info">
                            {ability.name
                              .toLowerCase()
                              .split(" ")
                              .map(
                                (letter) =>
                                  letter.charAt(0).toUpperCase() +
                                  letter.substring(1)
                              )}
                          </span>
                        </Link>
                      );
                    })}
                  </Col>
                </Row>

                <Row>
                  {sprites.map((sprite, key) => {
                    return (
                      <span className="m-auto">
                        <Image src={formData.sprites[sprite]} fluid />
                      </span>
                    );
                  })}
                </Row>
              </Col>
            </Row>
            <Row className="border mt-3 p-2 bg-white rounded">
              <Col xs={2}>
                <h3>Sprites</h3>
                {sprites.map((sprite, key) => {
                  return <Image src={formData.sprites[sprite]} fluid />;
                })}
              </Col>
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
              <Col xs={5}>
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
