import { Router } from 'express';
import { body } from 'express-validator';
import { requireAuth, requireRole } from '../middlewares/auth.js';
import {
  getEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment
} from '../controllers/equipmentController.js';
import { ensureBodyHasFields, validateRequest } from '../middlewares/validateRequest.js';

const router = Router();

const costValidators = [
  body('cost')
    .optional({ nullable: true })
    .isObject()
    .withMessage('cost debe ser un objeto con quantity y unit'),
  body('cost.quantity')
    .optional()
    .isNumeric()
    .withMessage('cost.quantity debe ser numero')
    .toFloat(),
  body('cost.unit').optional().isString().withMessage('cost.unit debe ser texto').trim()
];

const sharedEquipmentValidators = [
  body('name').optional().isString().withMessage('Nombre invalido').trim().notEmpty(),
  body('category').optional().isString().withMessage('Categoria invalida').trim(),
  body('gear_category').optional().isString().withMessage('Gear category invalida').trim(),
  body('weight').optional().isNumeric().withMessage('Peso debe ser numero').toFloat(),
  body('desc').optional().isString().withMessage('Descripcion invalida').trim(),
  body('properties')
    .optional({ nullable: true })
    .isArray()
    .withMessage('properties debe ser un arreglo'),
  body('properties.*').optional().isString().withMessage('Cada property debe ser texto').trim(),
  ...costValidators
];

const createEquipmentValidators = [
  body('name').trim().notEmpty().withMessage('Nombre requerido'),
  ...sharedEquipmentValidators
];

router.get('/', getEquipment);
router.get('/:id', getEquipmentById);
router.post(
  '/',
  requireAuth,
  requireRole('admin'),
  ...createEquipmentValidators,
  validateRequest,
  createEquipment
);
router.patch(
  '/:id',
  requireAuth,
  requireRole('admin'),
  ensureBodyHasFields,
  ...sharedEquipmentValidators,
  validateRequest,
  updateEquipment
);
router.delete('/:id', requireAuth, requireRole('admin'), deleteEquipment);

export default router;
