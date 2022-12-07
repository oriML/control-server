import express from 'express';
import authController from '../controllers/auth.controller';
import usersController from '../controllers/users.controller';
import catchAsync from '../utils/catchAsync';

const router = express.Router();

router.post('/login', catchAsync(authController.LoginByEmailAndPassword));//login

router.post('/register', catchAsync(authController.CreateUserByEmailAndPasswordAction));// registration

// router.put('/', authController.editUser);

// router.delete('/', authController.deleteUser);

export default router;
