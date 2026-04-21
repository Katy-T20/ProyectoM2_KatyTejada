export function validartitulo(title) {
  if (title === undefined || title === null ) {
    return "El titulo es requirido";
  }
  if (typeof title !== "string") {
    return "El titulo debe ser un texto";
  }
  if (title.trim().length === 0) {
    return "El titulo no puede estar vacio";
  }
  if (title.trim().length < 2 || title.trim().length >100) {
    return "El titulo debe tener entre 2 y 100 caracteres";
  }
  return null;
}

