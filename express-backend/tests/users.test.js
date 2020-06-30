const request = require("supertest");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");
const app = require("../src/app");
const User = require("../src/models/User");

beforeEach(setupDatabase);

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/users/create")
    .send({
      username: "Luis",
      email: "luisalfonsopreciado@example.com",
      password: "MyPass777!",
    })
    .expect(201);

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      username: "Luis",
      email: "luisalfonsopreciado@example.com",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("MyPass777!");
});

test("Should NOT signup an existing user", async () => {
  await request(app)
    .post("/users/create")
    .send({
      username: "Luis",
      email: "stan@example.com",
      password: "MyPass777!",
    })
    .expect(400);

  await request(app)
    .post("/users/create")
    .send({
      username: "Luis",
      email: "stan@examples.com",
      password: "MyPass777!",
    })
    .expect(201);

    await request(app)
    .post("/users/create")
    .send({
      username: "Luis",
      email: "wiki@example.com",
      password: "MyPass777!",
    })
    .expect(201);

    await request(app)
    .post("/users/create")
    .send({
      username: "Luis",
      email: "wiksi@example.com",
      password: "MyPass777!",
    })
    .expect(201);
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  // Assert that the database was changed correctly
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should fail to login user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "BadCredentials@email.com",
      password: "BadPassword",
    })
    .expect(400);
});

test("Should get profile for user with Authentication", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should NOT get profile for unAuth user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete account for user", async () => {
  const response = await request(app)
    .delete("/users/me")
    .send()
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should NOT delete account for unAuth user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should upload avatar image", async () => {
  jest.setTimeout(8000); //Give it more time to upload
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should get avatar image", async () => {
  jest.setTimeout(8000); //Give it more time to upload
  await request(app)
    .get("/users/" + userOneId + "/avatar")
    .expect(404);
});

test("Should update valid user fields", async () => {
  const newUserData = {
    first_name: "Luis",
    username: "Alfonso",
    email: "alfonsoluispreciado@example.com",
  };
  const response = await request(app)
    .patch("/users/me")
    .send(newUserData)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

  expect(response.body).toMatchObject(newUserData);

  const user = await User.findById(userOneId);
  expect(user).toMatchObject(newUserData);
});

test("Should NOT update invalid user fields", async () => {
  const newUserData = {
    address: "Alfonso",
  };
  await request(app)
    .patch("/users/me")
    .send(newUserData)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(400);
});
