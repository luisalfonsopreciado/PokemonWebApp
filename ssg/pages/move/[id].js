import { Container, Row, Col, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { TYPE_COLOR } from "../../constants";

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
    <div className="bg-dark">
      <Container className="p-3">
        <Row className="border p-1 bg-white rounded d-flex flex-row flex-wrap">
          <h1>{apiData.name}</h1>
          <Col md={12}>
            <Row>
              <Col md={4}>Type</Col>
              <Col md={8}>
                <span
                  className="badge badge-primary badge-pill m-auto"
                  style={{
                    backgroundColor: `${TYPE_COLOR[apiData.type.name]}`,
                  }}
                >
                  {apiData.type.name
                    .toLowerCase()
                    .split(" ")
                    .map(
                      (letter) =>
                        letter.charAt(0).toUpperCase() + letter.substring(1)
                    )}
                </span>
              </Col>
            </Row>
            <Row>
              <Col md={4}>Power</Col>
              <Col md={8}>
                <ProgressBar now={apiData.power} label={`${apiData.power}`} />
              </Col>
            </Row>
            <Row>
              <Col md={4}>PP</Col>
              <Col md={8}>
                <ProgressBar now={apiData.pp} label={`${apiData.pp}`} />
              </Col>
            </Row>
            <Row>
              <Col md={4}>Accuracy</Col>
              <Col md={8}>
                <ProgressBar
                  now={apiData.accuracy}
                  label={`${apiData.accuracy}`}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>Priority</Col>
              <Col md={8}>{apiData.priority}</Col>
            </Row>
          </Col>
        </Row>

        {/* {JSON.stringify(apiData)} */}
      </Container>
    </div>
  );
};
