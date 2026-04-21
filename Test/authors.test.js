import { describe, test, expect } from "vitest";
import { validarEmail } from "./validators.js";

describe("Validación de autores", () => {
  test("debe validar email correctamente", () => {
    const email = "test@example.com";
    const resultado = validarEmail(email);
    
    expect(resultado).toBe(null); // null = válido
  });

  test("debe rechazar email sin @", () => {
    const email = "testexample.com";
    const resultado = validarEmail(email);
    
    expect(resultado).not.toBe(null);
    expect(resultado).toContain("inválido");
  });
});

