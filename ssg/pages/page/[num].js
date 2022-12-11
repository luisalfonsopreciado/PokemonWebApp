import { Container, Col, Row, Card } from "react-bootstrap";
import axios from "axios";
import {
  requestAllPokemonWithExponentialBackoff,
  requestPageWithExponentialBackoff,
} from "../../util";
import Head from "next/head";
import Link from "next/link";
import { TYPE_COLOR } from "../../constants";
import Pagination from "@material-ui/lab/Pagination";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  let count = 1;
  const paths = [];
  const pokemon = await requestAllPokemonWithExponentialBackoff(axios);

  for (let i = 1; i < pokemon.length; i += 20) {
    paths.push({
      params: {
        num: count.toString(),
      },
    });
    count++;
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const pageNumber = context.params.num;
  const data = [];
  const pokemon = await requestAllPokemonWithExponentialBackoff(axios);

  const lower = (pageNumber - 1) * 20;

  for (let i = lower; i <= lower + 20; i++) {
    if (Object.values(pokemon)[i]) {
      // Pokemon Info
      const res = await requestPageWithExponentialBackoff(
        "https://pokeapi.co/api/v2/pokemon/" + Object.values(pokemon)[i].id,
        axios
      );

      data.push({
        ...Object.values(pokemon)[i],
        image: `/pokemon/${pokemon[i].name
          .toLowerCase()
          .replace(" ", "-")}.jpg`,
        types: res.data.types,
      });
    }
  }

  return {
    props: {
      data,
      pageNumber,
    },
  };
}

export default ({ data, pageNumber }) => {
  const router = useRouter();

  const handleChange = (event, value) => {
    router.push("/page/" + value);
  };

  return (
    <div className="bg-dark p-2">
      <Head>
        <title>Pokedex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row className="border p-2 bg-white rounded">
          <Col md={12}>
            <Pagination
              count={41}
              onChange={handleChange}
              variant="outlined"
              shape="rounded"
              page={pageNumber}
            />
          </Col>
        </Row>
        {data && (
          <Row>
            {data.map(({ id, name, types, image }) => (
              <Col xs={4} key={id} className="p-3">
                <Link href={`/pokemon/${id}`}>
                  <Card className="p-1">
                    <Card.Img
                      variant="top"
                      src={image}
                      style={{ height: 300 }}
                    />
                    <Card.Body>
                      <h2>{name}</h2>
                      {types.map(({ type }) => {
                        return (
                          <span
                            className="badge badge-primary badge-pill m-2"
                            style={{
                              backgroundColor: `${
                                TYPE_COLOR[type.name.toLowerCase()]
                              }`,
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
                        );
                      })}
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};
