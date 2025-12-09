import { Router } from 'express';
import { body } from 'express-validator';
import { requireAuth, requireRole } from '../middlewares/auth.js';
import { getUserById, listUsers, updateUserRole } from '../controllers/userController.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = Router();

// Solo administradores
router.get('/', requireAuth, requireRole('admin'), listUsers);
router.get('/:id', requireAuth, requireRole('admin'), getUserById);
router.patch(
  '/:id/role',
  requireAuth,
  requireRole('admin'),
  body('role')
    .trim()
    .notEmpty()
    .withMessage('Rol requerido')
    .isIn(['user', 'admin'])
    .withMessage('Rol invalido, usa "user" o "admin"')
    .customSanitizer((value) => value.toLowerCase()),
  validateRequest,
  updateUserRole
);

export default router;
