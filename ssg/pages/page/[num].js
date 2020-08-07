import { Container, Col, Row, Card } from "react-bootstrap";
import pokemon from "../../pokemon.json";
import Head from "next/head";
import Link from "next/link";
import { TYPE_COLOR } from "../../constants";
import Pagination from "@material-ui/lab/Pagination";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  let count = 1;
  const paths = [];

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

  const lower = (pageNumber - 1) * 20;

  for (let i = lower; i <= lower + 20; i++) {
    if (pokemon[i]) {
      data.push({
        ...pokemon[i],
        image: `/pokemon/${pokemon[i].name.english
          .toLowerCase()
          .replace(" ", "-")}.jpg`,
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

  console.log(pageNumber);

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
