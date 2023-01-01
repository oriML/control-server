import Category from "../models/mongoDB/category/category.interface"

interface ITermProps {
    name?: string
}

function CreateCategory(userId: string, name: string, movementType: number) {
    const category = new Category({ userId, name, movementType });
    return category.save();
}

async function GetCategoryList(movementType: number) {
    return await Category.find({ movementType });
}

function FetchCategoryByTerm(term: ITermProps) {
    return Category.findOne({ name: term.name });
}

function FetchAllCategoriesByTerm(term: ITermProps) {
    return Category.find({ "name": { "$regex": term.name, "$options": "i" } });
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