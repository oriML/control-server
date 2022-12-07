import express from 'express';
import catchAsync from '../../utils/catchAsync';

import movementsController from '../../controllers/movements.controller';
const router = express.Router();

// router.get('/', catchAsync(movementsController.getMovementAction));//login

router.post('/addMovement', catchAsync(movementsController.AddMovementAction));

router.post('/getAllMovements', catchAsync(movementsController.GetMovementsByCriteria));

router.post('/update/:id', movementsController.UpdateMovement);

router.delete('/delete/:id', movementsController.DeleteMovement);

export default router;
