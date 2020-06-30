import request from "supertest";
import { app } from "../../app";

it('response with details about the current user', async() => {
   
    const token = await global.signup();
    const response = await request(app)
    .get("/api/users/currentuser")
    .set("Authorization", "Bearer " + token)
    .send()
    .expect(200);

    expect(response.body.currentUser.email).toBeDefined()
})

it('responds with null if not authenticated', async()=> {
    const response = await request(app)
        .get("/api/users/currentuser")
        .send()
        .expect(200);

        expect(response.body.currentUser).toEqual(null)
})