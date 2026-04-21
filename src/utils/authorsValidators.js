//Validar Nombre
export function validarnombre(name) {
  if (name === undefined || name === null ) {
    return "El nombre es requirido";
  }
  if (typeof name !== "string") {
    return "El nombre debe ser un texto";
  }
  if (name.trim().length === 0) {
    return "El nombre no puede estar vacio";
  }
  if (name.trim().length < 2 || name.trim().length >100) {
    return "El nombre debe tener entre 2 y 100 caracteres";
  }
  return null;
}

//Validar email
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


