import { NextFunction, Request, Response } from 'express';

import CategoriesService from '../services/categories.service'

async function GetAllCategoriesByTerm(req: Request | any, res: Response) {
    try {
        const { term } = req.params;

        const model = { name: term }

        const categories = await CategoriesService.FetchAllCategoriesByTerm(model);
        const response = categories.map(category => (
            {
                _id: category._id,
                name: category.name
            }));
        return res.send(response)

    } catch (error) {
        if (error instanceof Error)
            return res.status(500).send(error.message)

        throw Error('unkown');
    }
};

async function AddCategoryByName(req: Request | any, res: Response) {
    try {

        const { name } = req.body;

        const currentUserId = res.locals.currentUserId;

        const category = await CategoriesService.CreateCategory(currentUserId, name, 1);
        const response = {
            _id: category._id,
            name: category.name
        }
        return res.send(response)

    } catch (error) {
        if (error instanceof Error)
            return res.status(500).send(error.message)

        throw Error('unkown');
    }
}


export default {
    GetAllCategoriesByTerm,
    AddCategoryByName
};