// install dependencies
const { execSync } = require("child_process");

const request = require("supertest");
const app = require("./src/app");
const db = require("./db/connection");

describe("endpoint tests", () => {
  beforeAll(async () => {
    // db.sync({force: true});
    execSync("npm run seed");
  });

  describe("users endpoint", () => {
    it("should return all the users", async () => {
      const res = await request(app).get("/users");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toEqual(4);
    });

    it("should return a specific user when id is passed", async () => {
      const res = await request(app).get("/users/2");
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toEqual(2);
    });

    it("should create a new user when POST method is called", async () => {
      const newUser = {
        name: "Dash",
        age: 22,
      };
      const res = await request(app).post("/users").send(newUser);

      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual(newUser.name);
      expect(res.body.age).toEqual(newUser.age);
    });

    it("should update a user when PUT method is called", async () => {
      const updatedUser = {
        name: "Harry",
        age: 26,
      };
      const res = await request(app).put("/users/5").send(updatedUser);

      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual(updatedUser.name);
      expect(res.body.age).toEqual(updatedUser.age);
    });

    it("should delete a user when DELETE method is called", async () => {
      const res = await request(app).delete("/users/5");
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual("Harry");
      expect(res.body.age).toEqual(26);
    });
  });

  describe("fruits endpoint", () => {
    it("should return all the fruits", async () => {
      const res = await request(app).get("/fruits");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toEqual(4);
    });

    it("should return a specific fruit when id is passed", async () => {
      const res = await request(app).get("/fruits/2");
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toEqual(2);
    });

    it("should create a new fruit when POST method is called", async () => {
      const newFruit = {
        name: "Mango",
        color: "green",
      };
      const res = await request(app).post("/fruits").send(newFruit);

      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual(newFruit.name);
      expect(res.body.color).toEqual(newFruit.color);
    });

    it("should update a fruit when PUT method is called", async () => {
      const updatedFruit = {
        name: "Mango",
        color: "red",
      };
      const res = await request(app).put("/fruits/5").send(updatedFruit);

      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual(updatedFruit.name);
      expect(res.body.color).toEqual(updatedFruit.color);
    });

    it("should delete a fruit when DELETE method is called", async () => {
      const res = await request(app).delete("/fruits/5");
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual("Mango");
      expect(res.body.color).toEqual("red");
    });
  });
});
