import { describe, test, expect } from "vitest";
import { validarNombre, validarEmail, validarBio } from "../src/utils/authorsValidators.js";

//ValidarNombre
describe("validarNombre", () => {
  test("aceptar nombre correcto", () => {
    expect(validarNombre("Ana García")).toBe(null);
  });

  test("rechazar nombre undefined", () => {
    expect(validarNombre(undefined)).toContain("requerido");
  });
  
  test("rechazar nombre vacío", () => {
    expect(validarNombre("")).toContain("vacío");
  });

  test("rechazar nombre solo espacios", () => {
    expect(validarNombre("    ")).toContain("vacío");
  });

  test("rechazar nombre de 1 caracter", () => {
    expect(validarNombre("K")).toContain("entre 2 y 100");
  });

  test("rechazar nombre que no es string", () => {
    expect(validarNombre(123)).toContain("text");
  });
});

//ValidarEmail
describe("validarEmail", () => {
  test("aceptar email correcto", () => {
    expect(validarEmail("ana@example.com")).toBe(null);
  });

  test("rechazar email sin @", () => {
    expect(validarEmail("anaexample.com")).toContain("inválido");
  });

  test("rechazar email vacío", () => {
    expect(validarEmail("")).toContain("requerido");
  });

  test("rechazar email null", () => {
    expect(validarEmail(null)).toContain("requerido");
  });

  test("rechazar email sin dominio", () => {
    expect(validarEmail("test@")).toContain("inválido");
  });
});

//ValidarBio
describe("validarBio", () => {
  test("aceptar bio correcta", () => {
    expect(validarBio("Desarrolladora full stack apasionada")).toBe(null);
  });

  test("rechazar bio que no es string", () => {
    expect(validarBio(123)).toContain("texto");
  });

  test("rechazar bio menor a 10 caracteres", () => {
    expect(validarBio("Corta")).toContain("al menos 10");
  });

  test("rechazar bio mayor a 200 caracteres", () => {
    expect(validarBio("a".repeat(201))).toContain("no más de 200");
  });

  test("aceptar bio en el límite exacto de 200 caracteres", () => {
    expect(validarBio("a".repeat(200))).toBe(null);
  });
});