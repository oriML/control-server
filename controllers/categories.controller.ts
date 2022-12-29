import { NextFunction, Request, Response } from 'express';

import CategoriesService from '../services/categories.service'

async function GetAllCategoriesByTerm(req: Request | any, res: Response) {
    try {
        const { term } = req.params;

        const model = { name: term }

        const categories = await CategoriesService.FetchAllCategoriesByTerm(model);

        return res.send(categories)

    } catch (error) {
        if (error instanceof Error)
            return res.status(500).send(error.message)

        throw Error('unkown');
    }
};


export default {
    GetAllCategoriesByTerm,
};