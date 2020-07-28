import request from "supertest";
import { app } from "../../app";

it("rejects unauthorized users", async () => {
  await request(app)
    .delete("/api/users/removeFavorite")
    .set("Authorization", "Bearer faketoken")
    .send({
      name: "bulbasaur",
    })
    .expect(401);
});

it("adds pokemon to user favorites", async () => {
  let res = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
      password2: "password",
    })
    .expect(201);

  let response = await request(app)
    .post("/api/users/addFavorite")
    .set("Authorization", "Bearer " + res.body.token)
    .send({
      name: "bulbasaur",
    })
    .expect(200);

  expect(response.body[0]).toEqual("bulbasaur");

  response = await request(app)
    .post("/api/users/addFavorite")
    .set("Authorization", "Bearer " + res.body.token)
    .send({
      name: "charizard",
    })
    .expect(200);

  expect(response.body.length).toEqual(2);

  response = await request(app)
    .delete("/api/users/removeFavorite")
    .set("Authorization", "Bearer " + res.body.token)
    .send({
      name: "bulbasaur",
    })
    .expect(200);

  expect(response.body.length).toEqual(1);

  response = await request(app)
    .delete("/api/users/removeFavorite")
    .set("Authorization", "Bearer " + res.body.token)
    .send({
      name: "bulbasaur",
    })
    .expect(200);

  expect(response.body.length).toEqual(1);

  response = await request(app)
    .delete("/api/users/removeFavorite")
    .set("Authorization", "Bearer " + res.body.token)
    .send({
      name: "charizard",
    })
    .expect(200);

  expect(response.body.length).toEqual(0);
});

it("does not crash with bad request", async () => {
  let res = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
      password2: "password",
    })
    .expect(201);

  let response = await request(app)
    .delete("/api/users/removeFavorite")
    .set("Authorization", "Bearer " + res.body.token)
    .send({
      name: "bulbasaur",
    })
    .expect(200);

  expect(response.body.length).toEqual(0);
});
