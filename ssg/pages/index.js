import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, FormControl, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useQuery } from "react-query";
import { TYPE_COLOR } from "../constants";

const getPokemon = async (key, q) => {
  const { data } = await axios.get(`/api/search?q=${escape(q)}`);
  return data.map((pokemon) => ({
    ...pokemon,
    image: `/pokemon/${pokemon.name.english
      .toLowerCase()
      .replace(" ", "-")}.jpg`,
  }));
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
            {data.map(({ id, name, type, image }) => (
              <Col xs={4} key={id} className="p-3">
                <Link href={`/pokemon/${id}`}>
                  <Card className="p-1">
                    <Card.Img
                      variant="top"
                      src={image}
                      style={{ height: 300 }}
                    />
                    <Card.Body>
                      <h2>{name.english}</h2>
                      {type.map((type) => (
                        <span
                          className="badge badge-primary badge-pill m-2"
                          style={{
                            backgroundColor: `${
                              TYPE_COLOR[type.toLowerCase()]
                            }`,
                          }}
                        >
                          {type
                            .toLowerCase()
                            .split(" ")
                            .map(
                              (letter) =>
                                letter.charAt(0).toUpperCase() +
                                letter.substring(1)
                            )}
                        </span>
                      ))}
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
