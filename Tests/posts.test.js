import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import pool from '../src/db/config.js';

let AUTHOR_ID;

beforeEach(async () => {
  const email = `autor_${Date.now()}@test.com`;
  const autor = await request(app).post("/api/authors").send({
    name: "Autor Test",
    email: email,
    bio: "Biografía válida para pruebas."
  });
  AUTHOR_ID = autor.body.id;
});

afterEach(async () => {
  if (AUTHOR_ID) {
    await pool.query("DELETE FROM posts WHERE author_id = $1", [AUTHOR_ID]);
    await pool.query("DELETE FROM authors WHERE id = $1", [AUTHOR_ID]);
    AUTHOR_ID = null;
  }
});

// GET /api/posts
describe("GET /api/posts", () => {
  test("devuelve una lista de posts", async () => {
    const response = await request(app).get("/api/posts");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("filtra posts por published=true", async () => {
    const response = await request(app).get("/api/posts?published=true");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach(p => expect(p.published).toBe(true));
  });

  test("filtra posts por published=false", async () => {
    const response = await request(app).get("/api/posts?published=false");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach(p => expect(p.published).toBe(false));
  });
});

// GET /api/posts/:id
describe("GET /api/posts/:id", () => {
  test("devuelve 404 si el post no existe", async () => {
    const response = await request(app).get("/api/posts/9999");
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Post no encontrado");
  });
});

// GET /api/posts/authors/:authorId
describe("GET /api/posts/authors/:authorId", () => {
  test("devuelve lista vacía si el author no tiene posts", async () => {
    const response = await request(app).get("/api/posts/authors/9999");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

// POST /api/posts
describe("POST /api/posts", () => {
  test("crea nuevo post", async () => {
    const response = await request(app)
      .post("/api/posts")
      .send({
        title: "Título de prueba válido",
        content: "Este es un contenido de prueba que tiene más de 20 caracteres.",
        author_id: AUTHOR_ID,
        published: false
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title", "Título de prueba válido");
    expect(response.body).toHaveProperty("content");
    expect(response.body).toHaveProperty("author_id", AUTHOR_ID);
  });

  test("rechaza post sin título", async () => {
    const response = await request(app)
      .post("/api/posts")
      .send({
        content: "Este es un contenido de prueba que tiene más de 20 caracteres.",
        author_id: AUTHOR_ID
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toContain("requerido");
  });

  test("rechaza posts con título menor a 5 caracteres", async () => {
    const response = await request(app)
      .post("/api/posts")
      .send({
        title: "Abc",
        content: "Este es un contenido de prueba que tiene más de 20 caracteres.",
        author_id: AUTHOR_ID
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain("entre 5 y 200 caracteres");
  });

  test("rechaza post sin contenido", async () => {
    const response = await request(app)
      .post("/api/posts")
      .send({
        title: "Título de prueba válido",
        author_id: AUTHOR_ID
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toContain("requerido");
  });

  test("rechaza posts con contenido menor a 20 caracteres", async () => {
    const response = await request(app)
      .post("/api/posts")
      .send({
        title: "Título de prueba válido",
        content: "Corto",
        author_id: AUTHOR_ID
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain("El contenido debe tener al menos 10 caracteres");
  });

  test("rechaza posts sin author_id", async () => {
    const response = await request(app)
      .post("/api/posts")
      .send({
        title: "Título de prueba válido",
        content: "Este es un contenido de prueba que tiene más de 20 caracteres."
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain("requerido");
  });

  test("rechaza posts con author_id inexistente", async () => {
    const response = await request(app)
      .post("/api/posts")
      .send({
        title: "Título de prueba válido",
        content: "Este es un contenido de prueba que tiene más de 20 caracteres.",
        author_id: 9999
      });
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("El autor especificado no existe");
  });

  test("rechaza posts con valor no booleano", async () => {
    const response = await request(app)
      .post("/api/posts")
      .send({
        title: "Título de prueba válido",
        content: "Este es un contenido de prueba que tiene más de 20 caracteres.",
        author_id: AUTHOR_ID,
        published: "sí"
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain("published debe ser true o false");
  });
});

// PUT /api/posts/:id
describe("PUT /api/posts/:id", () => {
  let postId;

  beforeEach(async () => {
    const post = await request(app).post("/api/posts").send({
      title: "Título temporal para update",
      content: "Contenido de prueba con más de 20 caracteres.",
      author_id: AUTHOR_ID,
      published: false
    });
    postId = post.body.id;
  });

  afterEach(async () => {
    if (postId) {
      await pool.query("DELETE FROM posts WHERE id = $1", [postId]);
      postId = null;
    }
  });

  test("devuelve 404 si el post no existe", async () => {
    const response = await request(app)
      .put("/api/posts/9999")
      .send({ title: "Título actualizado válido" });
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Post no encontrado");
  });

  test("rechaza actualización con título muy corto", async () => {
    const response = await request(app)
      .put(`/api/posts/${postId}`)
      .send({ title: "Abc" });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain("entre 5 y 200 caracteres");
  });
});

// DELETE /api/posts/:id
describe("DELETE /api/posts/:id", () => {
  test("devuelve 404 si la publicación no existe", async () => {
    const response = await request(app).delete("/api/posts/9999");
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Post no encontrado");
  });
});