import express from 'express';
import { MovementController } from '../../controllers/movements.controller';
import catchAsync from '../../utils/catchAsync';

const router = express.Router();

class MovementRouter {

    private _controller: MovementController;

    constructor() {
        this._controller = new MovementController();
    }

    get routes() {

        const controller = this._controller;

        router.post('/getById', catchAsync(controller.getById));

        router.post('/getByCriteria', catchAsync(controller.getByCriteria));

        router.post('/create', catchAsync(controller.create));

        router.post('/update/:id', catchAsync(controller.update));

        router.delete('/delete/:id', catchAsync(controller.delete));

        return router;

    }
}

export default MovementRouter;
