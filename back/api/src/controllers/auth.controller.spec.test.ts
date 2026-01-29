import request from "supertest";
import assert from "node:assert";
import { prisma } from "../config/prisma.js";
import { beforeEach, describe, it } from "node:test";
import { app } from "../app.js";

describe("[POST] /api/auth/register", () => {
  beforeEach(async () => {
    // Clean DB before each test
    await prisma.user.deleteMany();
  });

  it("should fail if email is invalid", async () => {
    // ARRANGE
    const body = {
      username: "username",
      email: "invalidemail",
      password: "password",
      confirmPassword: "password",
    };

    // ACT
    const response = await request(app).post("/api/auth/register").send(body);

    // ASSERT
    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.message, "Adresse e-mail invalide");
  });

  it("should fail if email already exists", async () => {
    // ARRANGE
    // Create existing user before
    await prisma.user.create({
      data: {
        username: "username",
        email: "exists@croquettes.com",
        passwordHash: "hashedPassword",
      },
    });

    const body = {
      username: "newusername",
      email: "exists@croquettes.com",
      password: "newpassword",
      confirmPassword: "newpassword",
    };

    // ACT
    const response = await request(app).post("/api/auth/register").send(body);

    // ASSERT
    assert.strictEqual(response.status, 409);
    assert.strictEqual(
      response.body.message,
      "Cette adresse e-mail est déjà utilisée",
    );
    // [TEST WITH CONTROLLER MESSAGE = OK]
    // assert.strictEqual(
    //   response.body.message,
    //   "Email ou mot de passe incorrect",
    // );
  });

  it("should fail if passwords do not match", async () => {
    // ARRANGE
    const body = {
      username: "username",
      email: "email@croquettes.com",
      password: "nomatch",
      confirmPassword: "sorrynomatch",
    };

    // ACT
    const response = await request(app).post("/api/auth/register").send(body);

    // ASSERT
    assert.strictEqual(response.status, 400);
    assert.strictEqual(
      response.body.message,
      "Les mots de passe ne correspondent pas",
    );
  });

  it("should register new user in DB", async () => {
    // ARRANGE
    const body = {
      username: "chaton",
      email: "potichat@croquettes.com",
      password: "MeowPassword",
      confirmPassword: "MeowPassword",
    };

    // ACT
    const response = await request(app).post("/api/auth/register").send(body);

    // ASSERT HTTP
    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.message, "Enregistrement réussi");

    // ASSERT DB
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    assert.ok(user);
    assert.strictEqual(user.username, body.username);
    assert.strictEqual(user.email, body.email);
    assert.notStrictEqual(user.passwordHash, body.password);
  });
});
