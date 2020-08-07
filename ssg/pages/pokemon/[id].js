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
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  chip: {
    margin: "1px",
  },
});

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

  const { data: encounterData } = await axios.get(
    // Pokemon locatino encounters
    res.data.location_area_encounters
  );

  return {
    props: {
      data: pokemon[context.params.id - 1],
      apiData: res.data,
      formData: response.data,
      encounterData,
    },
  };
}

export default ({ data, apiData, formData, encounterData }) => {
  const sprites = Object.keys(formData.sprites);
  const classes = useStyles();

  return (
    <div className="bg-dark">
      <Head>
        <title>{(data && data.name.english) || "Pokemon"}</title>
      </Head>
      <Container className="p-3">
        {data && (
          <>

            <Row className="border p-1 bg-white rounded d-flex flex-row flex-wrap">
              <Col md={4}>
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

              <Col md={8}>
                <Row>
                  <h5>Types</h5>
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
                    <Col md={4}>{key}</Col>
                    <Col md={8}>
                      <ProgressBar now={value} label={`${value}`} />
                    </Col>
                  </Row>
                ))}
                <Row>
                  <Col md={4}>Base Experience</Col>
                  <Col md={8}>
                    <ProgressBar
                      now={apiData.base_experience}
                      label={`${apiData.base_experience}`}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>Weight</Col>
                  <Col md={8}>
                    <ProgressBar
                      now={apiData.weight}
                      label={`${apiData.weight}`}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>Height</Col>
                  <Col md={8}>
                    <ProgressBar
                      now={apiData.height}
                      label={`${apiData.height}`}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={2}>Abilities</Col>
                  <Col md={10}>
                    <Row>
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
                            key={key}
                          >
                            <span className="badge badge-primary badge-pill bg-info m-auto">
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
                    </Row>
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
              <Col md={12}>
                <h3 className="text-center">Moves</h3>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  {apiData.moves.map(({ move }, key) => {
                    return (
                      <Link
                        href={move.url.replace("https://pokeapi.co/api/v2", "")}
                      >
                        <span className="m-1">
                          <Chip label={move.name} />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </Col>
            </Row>
            <Row className="border mt-3 p-2 bg-white rounded">
              <Col md={12}>
                <h2 className="text-center">Encounters</h2>
                {encounterData.length !== 0 ? (
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Location</TableCell>
                          <TableCell align="right">Max Chance</TableCell>
                          <TableCell align="right">Pokemon Version</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {encounterData.map(
                          ({ location_area, version_details }, key) => {
                            return (
                              <TableRow key={key}>
                                <TableCell component="th" scope="row">
                                  {titleCase(location_area.name)}
                                </TableCell>
                                <TableCell align="right">
                                  {version_details[0].max_chance} %
                                </TableCell>
                                <TableCell align="right">
                                  {version_details.map(
                                    ({
                                      encounter_details,
                                      max_chance,
                                      version,
                                    }) => (
                                      <span className="m-1">
                                        <Chip
                                          label={version.name}
                                          className={classes.chip}
                                          color="primary"
                                          variant="outlined"
                                        />
                                      </span>
                                    )
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          }
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <p className="text-center">
                    This Pokemon Cannot Be Encountered in the Wild
                  </p>
                )}
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

function titleCase(str) {
  str = str.replace(/-/g, " ");
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}
