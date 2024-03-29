import { Container, Modal, Button, Row } from "react-bootstrap";
import axios from "axios";
import { requestPageWithExponentialBackoff } from "../../util/index";

export async function getStaticPaths() {
  const res = await requestPageWithExponentialBackoff(
    "https://pokeapi.co/api/v2/ability?offset=0&limit=100000",
    axios
  );
  const abilities = res.data.results;

  const paths = abilities.map(({ url }, key) => {
    const id = url
      .replace("https://pokeapi.co/api/v2/ability/", "")
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
  const res = await requestPageWithExponentialBackoff(
    "https://pokeapi.co/api/v2/ability/" + context.params.id,
    axios
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
      <Row>
        <Container>
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>{apiData.id}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {apiData.effect_entries.map((effect) => (
                <p>{effect.effect}</p>
              ))}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary">Close</Button>
              <Button variant="primary">Save changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Container>
      </Row>
    </div>
  );
};
