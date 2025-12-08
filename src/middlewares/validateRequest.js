import { validationResult } from 'express-validator';

/**
 * Reutilizable para retornar errores de validacion de express-validator.
 */
export function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

/**
 * Garantiza que exista al menos un campo en el cuerpo del request (PATCH/PUT).
 */
export function ensureBodyHasFields(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'El cuerpo no puede estar vacio' });
  }
  next();
}
