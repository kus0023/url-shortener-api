const mongoose = require("mongoose");
const request = require("supertest");
const { server, app } = require("../../index");

const TEST_EMAIL = "test@email.com";
const TEST_PASSWORD = "P@assw0(R)d123";
const TEST_NAME = "test name";
let TEST_TOKEN = "";
const TEST_URL = "http://google.com";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL_DEV + "shortifytest");
});

afterAll(async () => {
  // Delete the registered user

  await mongoose.model("users").deleteOne({
    email: TEST_EMAIL,
  });

  await mongoose.model("weburls").deleteOne({
    originalURL: TEST_URL,
  });

  await mongoose.connection.close();
  //   close the server
  server.close();
});

describe("Wrong Authentication testing", () => {
  describe("POST /auth/login", () => {
    it("should return error if no data sent", async () => {
      const res = await request(app).post("/auth/login");
      expect(res.statusCode).toBe(400);
    });
    it("should return error with wrong credentials", async () => {
      const res = await request(app).post("/auth/login").send({
        email: "wrong@gmail.com",
        password: "WrongPassword",
      });
      expect(res.statusCode).toBe(401);
    });
  });

  describe("POST /auth/register", () => {
    it("should return error if no data sent", async () => {
      const res = await request(app).post("/auth/register").send();
      expect(res.statusCode).toBe(400);
    });

    it("should return error if incorrect email sent", async () => {
      const res = await request(app).post("/auth/register").send({
        email: "abcd",
        name: "something",
        password: "password",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toBeInstanceOf(Array);
    });

    it("should return error if weak password sent", async () => {
      const res = await request(app).post("/auth/register").send({
        email: "abcd@email.com",
        name: "something",
        password: "password",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toBeInstanceOf(Array);
    });
  });
});

describe("Correct Authentication testing", () => {
  describe("POST /auth/register", () => {
    it("should able to register", async () => {
      const res = await request(app).post("/auth/register").send({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
        name: TEST_NAME,
      });
      expect(res.statusCode).toBe(201);

      expect(res.body.user.name).toBe(TEST_NAME);
      expect(res.body.user.email).toBe(TEST_EMAIL);
    });

    it("should not register with same email", async () => {
      const res = await request(app).post("/auth/register").send({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
        name: TEST_NAME,
      });
      expect(res.statusCode).toBe(400);
    });
  });

  describe("POST /auth/login", () => {
    it("should able to login and get token", async () => {
      const res = await request(app).post("/auth/login").send({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();
      expect(typeof res.body.token).toBe("string");

      TEST_TOKEN = res.body.token;
    });
  });
});

describe("Shorten URL Testing", () => {
  describe("GET /shorten", () => {
    it("should NOT able to get the URLs if no token sent", async () => {
      const res = await request(app).get("/shorten");

      expect(res.statusCode).toBe(401);
    });

    it("should NOT able to get the URLs if wrong token sent", async () => {
      const res = await request(app)
        .get("/shorten")
        .set("authorization", "Bearer " + "wrong_token");

      expect(res.statusCode).toBe(401);
    });
    it("should able to get the URLs by using token", async () => {
      const res = await request(app)
        .get("/shorten")
        .set("authorization", "Bearer " + TEST_TOKEN);

      expect(res.statusCode).toBe(200);
    });
  });

  describe("POST /shorten", () => {
    it("should NOT able to access if token is missing/invalid", async () => {
      const res = await request(app).post("/shorten");
      const res2 = await request(app)
        .post("/shorten")
        .set("authorization", "Bearer " + "wrong_token");

      expect(res.statusCode).toBe(401);
      expect(res2.statusCode).toBe(401);
    });

    it("should NOT able to create if no data sent", async () => {
      const res = await request(app)
        .post("/shorten")
        .set("authorization", "Bearer " + TEST_TOKEN);

      expect(res.statusCode).toBe(400);
    });

    it("should able to create short URL with correct data and token", async () => {
      const res = await request(app)
        .post("/shorten")
        .set("authorization", "Bearer " + TEST_TOKEN)
        .send({
          originalURL: TEST_URL,
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.url.originalURL).toBe(TEST_URL);
      expect(res.body.url.shortURL).toBeDefined();
    });

    it("should not create a new short URL if SAME original URL sent", async () => {
      const res = await request(app)
        .post("/shorten")
        .set("authorization", "Bearer " + TEST_TOKEN)
        .send({
          originalURL: TEST_URL,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Already present.");
      expect(res.body.url.shortURL).toBeDefined();
    });
  });
});

describe("Visiting Short URLs", () => {
  describe("ANY /:id", () => {
    it("should able to redirect to original URL", async () => {
      //collect all short URLS
      let res = await request(app)
        .get("/shorten")
        .set("authorization", "Bearer " + TEST_TOKEN);

      expect(res.body.urls).toBeDefined();
      expect(res.body.urls).toBeInstanceOf(Array);

      //   Making URL array
      const urls = res.body.urls.map((url) => url.shortURL);
      // extracting only path to test
      const extractId = new URL(urls[0]).pathname;

      //   access first url
      res = await request(app).get(extractId);

      expect(res.statusCode).toBe(301);
    });
  });
});
