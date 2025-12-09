import { Router } from 'express';
import { body } from 'express-validator';
import { requireAuth, requireRole } from '../middlewares/auth.js';
import {
  getMonsters,
  getMonsterById,
  createMonster,
  updateMonster,
  deleteMonster
} from '../controllers/monsterController.js';
import { ensureBodyHasFields, validateRequest } from '../middlewares/validateRequest.js';

const router = Router();

const numericField = (field, { min = 0 } = {}) =>
  body(field)
    .optional()
    .isFloat({ min })
    .withMessage(`${field} debe ser un numero >= ${min}`)
    .toFloat();

const createMonsterValidators = [
  body('name').trim().notEmpty().withMessage('Nombre requerido'),
  body('type').trim().notEmpty().withMessage('Tipo requerido'),
  body('size').optional().isString().withMessage('Size debe ser texto'),
  body('alignment').optional().isString().withMessage('Alignment debe ser texto'),
  numericField('armor_class'),
  numericField('hit_points'),
  numericField('challenge_rating'),
  body('languages').optional().isString().withMessage('Languages debe ser texto'),
  body('senses').optional().isString().withMessage('Senses debe ser texto')
];

const updateMonsterValidators = [
  body('name').optional().isString().withMessage('Nombre invalido').trim().notEmpty(),
  body('type').optional().isString().withMessage('Tipo invalido').trim().notEmpty(),
  body('size').optional().isString().withMessage('Size debe ser texto'),
  body('alignment').optional().isString().withMessage('Alignment debe ser texto'),
  numericField('armor_class'),
  numericField('hit_points'),
  numericField('challenge_rating'),
  body('languages').optional().isString().withMessage('Languages debe ser texto'),
  body('senses').optional().isString().withMessage('Senses debe ser texto')
];

router.get('/', getMonsters);
router.get('/:id', getMonsterById);
router.post(
  '/',
  requireAuth,
  requireRole('admin'),
  ...createMonsterValidators,
  validateRequest,
  createMonster
);
router.patch(
  '/:id',
  requireAuth,
  requireRole('admin'),
  ensureBodyHasFields,
  ...updateMonsterValidators,
  validateRequest,
  updateMonster
);
router.delete('/:id', requireAuth, requireRole('admin'), deleteMonster);

export default router;
