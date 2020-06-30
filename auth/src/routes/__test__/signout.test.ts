import request from "supertest";
import { app } from "../../app";

it("clears the token after signing out", async () => {
  const res = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
      password2: "password",
    })
    .expect(201);

  const token = res.body.token;

  await request(app)
    .post("/api/users/signout")
    .set("Authorization", "Bearer " + token)
    .send({})
    .expect(200);

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Authorization", "Bearer " + token)
    .send({})
    .expect(200);

  expect(response.body.currentUser).toBeNull();
});
