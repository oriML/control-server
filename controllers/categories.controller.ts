import e, { NextFunction, Request, Response } from 'express';

import CategoriesService from '../services/categories.service.bl'

async function GetAllCategoriesByTerm(req: Request | any, res: Response) {
    try {
        const { term } = req.params;
        const currentUserId = res.locals.currentUserId;
        const model = { name: term }

        const categories = await CategoriesService.FetchAllCategoriesByTerm(model, currentUserId);
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

        if (currentUserId != null) {
            if (name != null) {

                const category = await CategoriesService.CreateCategory(currentUserId, name, 1);

                const response = {
                    _id: category._id,
                    name: category.name
                }
                return res.send(response)
            } else {
                throw new Error("category name is undefined");
            }
        } else {
            throw new Error("cannot identify user");
        }

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