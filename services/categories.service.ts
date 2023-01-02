import Category from "../models/mongoDB/category/category.interface"

interface ITermProps {
    name?: string
}

async function CreateCategory(userId: string, name: string, movementType: number) {
    const category = new Category({ userId, name, movementType });
    return await category.save();
}

async function GetCategoryList(movementType: number) {
    return await Category.find({ movementType });
}

async function FetchCategoryByTerm(term: ITermProps) {
    return await Category.findOne({ name: term.name });
}

async function FetchAllCategoriesByTerm(term: ITermProps, userId: string) {
    return await Category.find({ "userId": userId, "name": { "$regex": term.name, "$options": "i" } });
}

async function RemoveCategory(id: string) {
    return await Category.findOneAndDelete({ _id: id });
}

export default {
    CreateCategory,
    GetCategoryList,
    RemoveCategory,
    FetchCategoryByTerm,
    FetchAllCategoriesByTerm
}