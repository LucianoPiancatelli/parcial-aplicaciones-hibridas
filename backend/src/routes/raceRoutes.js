import { Router } from 'express';
import { body } from 'express-validator';
import { requireAuth, requireRole } from '../middlewares/auth.js';
import {
  getRaces,
  getRaceById,
  createRace,
  updateRace,
  deleteRace
} from '../controllers/raceController.js';
import { ensureBodyHasFields, validateRequest } from '../middlewares/validateRequest.js';

const router = Router();

const abilityBonusValidators = [
  body('ability_bonuses')
    .optional({ nullable: true })
    .isArray()
    .withMessage('ability_bonuses debe ser un arreglo'),
  body('ability_bonuses.*.ability')
    .optional()
    .isString()
    .withMessage('ability debe ser texto')
    .trim(),
  body('ability_bonuses.*.bonus')
    .optional()
    .isNumeric()
    .withMessage('bonus debe ser numero')
    .toFloat()
];

const sharedRaceValidators = [
  body('name').optional().isString().withMessage('Nombre invalido').trim().notEmpty(),
  body('speed').optional().isInt({ min: 0 }).withMessage('Speed debe ser numero').toInt(),
  body('size').optional().isString().withMessage('Size debe ser texto').trim().notEmpty(),
  body('alignment').optional().isString().withMessage('Alignment debe ser texto').trim(),
  body('age').optional().isString().withMessage('Age debe ser texto').trim(),
  body('language_desc').optional().isString().withMessage('language_desc debe ser texto').trim(),
  body('traits').optional({ nullable: true }).isArray().withMessage('traits debe ser arreglo'),
  body('traits.*').optional().isString().withMessage('Cada trait debe ser texto').trim(),
  body('starting_proficiencies')
    .optional({ nullable: true })
    .isArray()
    .withMessage('starting_proficiencies debe ser arreglo'),
  body('starting_proficiencies.*')
    .optional()
    .isString()
    .withMessage('Cada proficiency debe ser texto')
    .trim(),
  ...abilityBonusValidators
];

const createRaceValidators = [
  body('name').trim().notEmpty().withMessage('Nombre requerido'),
  ...sharedRaceValidators
];

router.get('/', getRaces);
router.get('/:id', getRaceById);
router.post(
  '/',
  requireAuth,
  requireRole('admin'),
  ...createRaceValidators,
  validateRequest,
  createRace
);
router.patch(
  '/:id',
  requireAuth,
  requireRole('admin'),
  ensureBodyHasFields,
  ...sharedRaceValidators,
  validateRequest,
  updateRace
);
router.delete('/:id', requireAuth, requireRole('admin'), deleteRace);

export default router;
