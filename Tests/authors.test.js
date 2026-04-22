import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import pool from '../src/db/config.js';


//GET /api/authors
describe("GET /api/authors", () => {
    test("devuelve una lista de autores", async () => {
        const response = await request(app).get("/api/authors");
 
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });
});

//GET /api/authors/:id
describe("GET /api/authors/:id", () => {
    test("devuelve un autor por ID", async () => {
        const  = await request(app).get("/api/authors/id");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("id", 5);
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
    });
    

    test("devuelve 404 si el usuario no existe", async () => {
        const response = await request(app).get("/api/authors/9999");

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("Autor no encontrado");
    });
});

// Prueba para POST /api/authors
describe("POST /api/authors", () => {
    beforeEach(async () => {
        await pool.query("DELETE FROM authors WHERE email = 'prueba@example.com'");
    });
    afterEach(async () => {
        await pool.query("DELETE FROM authors WHERE email = 'prueba@example.com'");
    });
    test("crea un nuevo autor", async () => {
        const response = await request(app)
        .post("/api/authors")
        .send({ name: "Autor de Prueba", email: "prueba@example.com" });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name", "Autor de Prueba");
        expect(response.body).toHaveProperty("email", "prueba@example.com");
    });
});

// Prueba para POST /api/authors sin nombre
test("rechaza request sin nombre", async () => {
    const response = await request(app).post("/api/authors").send({ email: "prueba@example.com" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toContain("El nombre es requerido");
});

// Prueba para POST /api/authors con email inválido
test("rechaza email con formato ivalido", async () => {
    const response = (await request(app)
        .post("/api/authors")
        .send({ name: "Autor de Prueba", email: "email-invalido" }));

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain("El formato del email es inválido")
});

// Prueba para POST /api/authors con email duplicado
test("rechaza request vacio", async () =>{
    const response = await request(app).post("/api/authors").send({});

    expect(response.statusCode).toBe(400);
});


describe("DELETE /api/authors/:id", () => {
    test("devuelve 404 al eliminar usuario inexistente", async () => {
    const response = await request(app).delete("/api/authors/9999");

    expect(response.statusCode).toBe(404);
  });
});

describe("Rutas inexistentes",() => {
    test("devuelve 404 para ruta desconocida", async () => {
        const response = await request(app).get("/ruta-que-no-existe");

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("error");
    });
});