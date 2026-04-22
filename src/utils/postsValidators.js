export function validarTitulo(title) {
  if (title === undefined || title === null ) {
    return "El titulo es requerido";
  }
  if (typeof title !== "string") {
    return "El titulo debe ser un texto";
  }
  if (title.trim().length === 0) {
    return "El titulo no puede estar vacío";
  }
  if (title.trim().length < 2 || title.trim().length >100) {
    return "El titulo debe tener entre 2 y 100 caracteres";
  }
  return null;
}

export function validarContent(content) {
  if (content === undefined || content === null) {
    return "El contenido es requerido";
  }
  if (typeof content !== "string") {
    return "El contenido debe ser un texto";
  }
  if (content.trim().length === 0) {
    return "El contenido no puede estar vacío";
  }
  if (content.trim().length < 10) {
    return "El contenido debe tener al menos 10 caracteres";
  }
  return null;
}

export function validarAuthorId(author_id) {
  if (author_id === undefined || author_id === null) {
    return "El author_id es requerido";
  }
  if (!Number.isInteger(Number(author_id)) || Number(author_id) <= 0) {
    return "El author_id debe ser un número entero positivo";
  }
  return null;
}

export function validarPublished(published) {
  if (published === undefined || published === null) {
    return null; // opcional, no es requerido
  }
  if (typeof published !== "boolean") {
    return "published debe ser true o false";
  }
  return null;
}
