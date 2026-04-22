export function validarNombre(name) {
  if (name === undefined || name === null ) {
    return "El nombre es requerido";
  }
  if (typeof name !== "string") {
    return "El nombre debe ser un texto";
  }
  if (name.trim().length === 0) {
    return "El nombre no puede estar vacío";
  }
  if (name.trim().length < 2 || name.trim().length >100) {
    return "El nombre debe tener entre 2 y 100 caracteres";
  }
  return null; // null es validación correcta
}

export function validarEmail(email) {
  if (!email) {
    return 'El email es requerido';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return 'El formato del email es inválido';

  }

  return null; // null es validación correcta
}

export function validarBio(bio) {
  if (bio === undefined || bio === null) {
    return null;
  }
  if (typeof bio !== "string") {
    return "La biografía debe ser un texto";
  }
  if (bio.trim().length < 10 || bio.trim().length > 200) {
    return "La biografía debe tener al menos 10 caracteres y no más de 200";
  }
  return null;
}