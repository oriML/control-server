import express from 'express';

import usersController from '../../controllers/users.controller';
import catchAsync from '../../utils/catchAsync';

const router = express.Router();

// router.get('/', usersController.getUser);//login

// router.post('/register', catchAsync(usersController.CreateUserByEmailAndPasswordAction));//login

// router.put('/', usersController.editUser);

// router.delete('/', usersController.deleteUser);

// router.post("/profile", usersController.uploadProfileOfUser);



export default router;
