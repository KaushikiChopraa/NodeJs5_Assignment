const request = require("supertest");
const app = require("../../index");
const jwt = require('jsonwebtoken');


describe("User Routes", () => {

  const signUp = {
    name: "testuser",
    email: "testing@gmail.com",
    password: "Testpassword12",
  };

  const signIn = {
    email: "testing@gmail.com",
    password: "Testpassword12",
  };

  let authToken; 
  let userId

  it("should register a new user", async () => {
    const response = await request(app)
      .post("/signUp")
      .send(signUp)
      .expect(200);
    expect(response.body).toHaveProperty("message");
  });


  it("should login with the registered user", async () => {
    const response = await request(app)
      .post("/signIn")
      .send(signIn)
      .expect(200);
      authToken = response.body.token;
      userId = jwt.decode(authToken).id;
    expect(response.body).toHaveProperty("message");
  });


  it("should get the users profile with the valid token", async () => {
    const response = await request(app)
      .get("/users")
      .set("token", `${authToken}`)
      .expect(200);
    response.body.data.map((user) => {
      expect(user).toHaveProperty("name");
      expect(user).toHaveProperty("email");
    
    });
  });


  it("should get the user profile with the valid token and id", async () => {
    const response = await request(app)
      .get(`/user/${userId}`)
      .set("token", `${authToken}`)
      .expect(200);
      expect(response.body.data._id).toBe(userId);
      expect(response.body.data).toHaveProperty("email");
  });

  it("should update a user with a name", async () => {
    let update = {
      name : "userss"

    }
    const response = await request(app)
      .patch(`/user/${userId}`)
      .set("token", `${authToken}`)
      .send(update)
    expect(response.body).toHaveProperty("message");
  });



  it("should delete a user", async () => {
    const response = await request(app)
      .delete(`/user/${userId}`)
      .set("token", `${authToken}`)

    expect(response.body).toHaveProperty("message");
  });

})
