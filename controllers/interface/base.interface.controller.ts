import express from 'express';

interface IBaseController {
    create: express.RequestHandler;
    update: express.RequestHandler;
    getById: express.RequestHandler;
    getByCriteria: express.RequestHandler;
    delete: express.RequestHandler;
}

export = IBaseController;