import { describe, test, expect } from "vitest";
import { validarTitulo, validarContent, validarAuthorId, validarPublished } from "../src/utils/postsValidators.js";

//validarTitulo
describe("validarTitulo", () => {
  test("aceptar título correcto", () => {
    expect(validarTitulo("Mi primer post")).toBe(null);
  });

  test("rechazar título undefined", () => {
    expect(validarTitulo(undefined)).toContain("requerido");
  });

  test("rechazar título null", () => {
    expect(validarTitulo(null)).toContain("requerido");
  });

  test("rechazar título vacío", () => {
    expect(validarTitulo("")).toContain("vacío");
  });

});

//validarContent
describe("validarContent", () => {
  test("aceptar contenido correcto", () => {
    expect(validarContent("Este es un contenido válido con más de diez caracteres.")).toBe(null);
  });

  test("rechazar contenido undefined", () => {
    expect(validarContent(undefined)).toContain("requerido");
  });

  test("rechazar contenido null", () => {
    expect(validarContent(null)).toContain("requerido");
  });

  test("rechazar contenido vacío", () => {
    expect(validarContent("")).toContain("vacío");
  });
});

//validarAuthorId
describe("validarAuthorId", () => {
  test("aceptar author_id válido", () => {
    expect(validarAuthorId(5)).toBe(null);
  });

  test("rechazar author_id undefined", () => {
    expect(validarAuthorId(undefined)).toContain("requerido");
  });

  test("rechazar author_id null", () => {
    expect(validarAuthorId(null)).toContain("requerido");
  });

  test("rechazar author_id cero", () => {
    expect(validarAuthorId(0)).toContain("positivo");
  });
});

//validarPublished
describe("validarPublished", () => {
  test("aceptar published undefined (opcional)", () => {
    expect(validarPublished(undefined)).toBe(null);
  });

  test("aceptar published true", () => {
    expect(validarPublished(true)).toBe(null);
  });

  test("aceptar published false", () => {
    expect(validarPublished(false)).toBe(null);
  });

  test("rechazar published que no es boolean", () => {
    expect(validarPublished("true")).toContain("true o false");
    expect(validarPublished(1)).toContain("true o false");
    expect(validarPublished({})).toContain("true o false");
  });
});