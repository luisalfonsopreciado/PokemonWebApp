import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export async function getStaticPaths() {
  const res = await axios.get(
    "https://pokeapi.co/api/v2/move?offset=0&limit=100000"
  );
  const moves = res.data.results;

  const paths = moves.map(({ url }, key) => {
    const id = url
      .replace("https://pokeapi.co/api/v2/move/", "")
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
    "https://pokeapi.co/api/v2/move/" + context.params.id
  );

  return {
    props: {
      apiData: res.data,
    },
  };
}

export default ({ apiData }) => {
  return (
    <div className="bg-light">
      <Container>
        <h1>{apiData.name}</h1>
        <Row>
          <Col xs={4}>
            <h3>Power</h3>
            <h3>PP</h3>
            <h3>Priority</h3>
            <h3>Type</h3>
          </Col>
          <Col xs={8}>
            <p>{apiData.power}</p>
            <p>{apiData.pp}</p>
            <p>{apiData.priority}</p>
            <p>{apiData.type.name}</p>
          </Col>
        </Row>

        {/* {JSON.stringify(apiData)} */}
      </Container>
    </div>
  );
};
