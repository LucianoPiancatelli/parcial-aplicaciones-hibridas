import { Router } from 'express';
import { body } from 'express-validator';
import { login, me, register } from '../controllers/authController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

// Validadores
const emailValidator = body('email').isEmail().withMessage('Email invalido');
const passwordValidator = body('password').isLength({ min: 6 }).withMessage('Password minimo 6');

router.post(
  '/register',
  [body('name').trim().notEmpty().withMessage('Nombre requerido'), emailValidator, passwordValidator],
  register
);

router.post('/login', [emailValidator, passwordValidator], login);

router.get('/me', requireAuth, me);

export default router;
