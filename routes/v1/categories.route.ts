import express from 'express';
import categoriesController from '../../controllers/categories.controller';
import catchAsync from '../../utils/catchAsync';

const router = express.Router();

router.get('/:term', catchAsync(categoriesController.GetAllCategoriesByTerm));//login
// router.post('/', authController.addUser);// registration

// router.put('/', authController.editUser);

// router.delete('/', authController.deleteUser);

export default router;
