import request from "supertest";
import { app } from "../../app";

it("rejects unauthorized users", async () => {
  await request(app)
    .get("/api/users/favorite")
    .set("Authorization", "Bearer faketoken")
    .send()
    .expect(401);
});

it("gets user favorite pokemons", async () => {
  let res = await request(app) // Create new user
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
      password2: "password",
    })
    .expect(201);

  let response = await request(app)
    .get("/api/users/favorite")
    .set("Authorization", "Bearer " + res.body.token)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(0);

  response = await request(app)
    .post("/api/users/addFavorite")
    .set("Authorization", "Bearer " + res.body.token)
    .send({
      name: "charizard",
    })
    .expect(200);

  expect(response.body.length).toEqual(1);

  response = await request(app)
    .get("/api/users/favorite")
    .set("Authorization", "Bearer " + res.body.token)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(1);
});
