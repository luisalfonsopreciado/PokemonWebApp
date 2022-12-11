import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, FormControl, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useQuery } from "react-query";
import { TYPE_COLOR } from "../constants";
import { requestPageWithExponentialBackoff } from "../util/index";

const getPokemon = async (key, q) => {
  const { data } = await requestPageWithExponentialBackoff(
    `/api/search?q=${q}`,
    axios
  );
  return data.map((pokemon) => {
    return {
      ...pokemon,
      image: `/pokemon/${pokemon.name.toLowerCase().replace(" ", "-")}.jpg`,
    };
  });
};

const Home = () => {
  const [query, setQuery] = useState("");
  const { data } = useQuery(["q", query], getPokemon);

  return (
    <div className="bg-dark p-2">
      <Head>
        <title>Pokedex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <FormControl
          placeholder="Search"
          aria-label="Search"
          value={query}
          onChange={(evt) => setQuery(evt.target.value)}
          className="mb-3 mt-3"
        />
        {data && (
          <Row>
            {data.map(({ id, name, image }) => (
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

export default Home;
