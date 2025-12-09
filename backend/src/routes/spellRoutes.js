import { Router } from 'express';
import { body } from 'express-validator';
import { requireAuth, requireRole } from '../middlewares/auth.js';
import {
  getSpells,
  getSpellById,
  createSpell,
  updateSpell,
  deleteSpell
} from '../controllers/spellController.js';
import { ensureBodyHasFields, validateRequest } from '../middlewares/validateRequest.js';

const router = Router();

const spellArrayValidators = [
  body('classes')
    .optional({ nullable: true })
    .isArray()
    .withMessage('classes debe ser un arreglo'),
  body('classes.*').optional().isString().withMessage('Cada clase debe ser texto'),
  body('components')
    .optional({ nullable: true })
    .isArray()
    .withMessage('components debe ser un arreglo'),
  body('components.*').optional().isString().withMessage('Cada componente debe ser texto')
];

const spellTextFields = ['casting_time', 'range', 'duration', 'desc', 'higher_level', 'source_url'];

const spellTextValidators = spellTextFields.map((field) =>
  body(field)
    .optional({ nullable: true })
    .isString()
    .withMessage(`${field} debe ser texto`)
    .trim()
);

const createSpellValidators = [
  body('name').trim().notEmpty().withMessage('Nombre requerido'),
  body('level')
    .isInt({ min: 0, max: 9 })
    .withMessage('Level debe ser un numero entre 0 y 9')
    .toInt(),
  body('school').trim().notEmpty().withMessage('School requerido'),
  body('ritual').optional().isBoolean().withMessage('Ritual debe ser boolean').toBoolean(),
  body('concentration')
    .optional()
    .isBoolean()
    .withMessage('Concentration debe ser boolean')
    .toBoolean(),
  ...spellArrayValidators,
  ...spellTextValidators
];

const updateSpellValidators = [
  body('name').optional().isString().withMessage('Nombre invalido').trim().notEmpty(),
  body('level')
    .optional()
    .isInt({ min: 0, max: 9 })
    .withMessage('Level debe ser un numero entre 0 y 9')
    .toInt(),
  body('school').optional().isString().withMessage('School debe ser texto').trim().notEmpty(),
  body('ritual').optional().isBoolean().withMessage('Ritual debe ser boolean').toBoolean(),
  body('concentration')
    .optional()
    .isBoolean()
    .withMessage('Concentration debe ser boolean')
    .toBoolean(),
  ...spellArrayValidators,
  ...spellTextValidators
];

router.get('/', getSpells);
router.get('/:id', getSpellById);
// Rutas de escritura protegidas (solo admin)
router.post(
  '/',
  requireAuth,
  requireRole('admin'),
  ...createSpellValidators,
  validateRequest,
  createSpell
);
router.patch(
  '/:id',
  requireAuth,
  requireRole('admin'),
  ensureBodyHasFields,
  ...updateSpellValidators,
  validateRequest,
  updateSpell
);
router.delete('/:id', requireAuth, requireRole('admin'), deleteSpell);

export default router;
