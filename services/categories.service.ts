import Category from "../models/mongoDB/category/category.interface"

interface ITerm {
    name?: string
}

function CreateCategory(name: string, movementType: number) {
    const category = new Category({ name, movementType });
    return category.save();
}

async function GetCategoryList(movementType: number) {
    return await Category.find({ movementType });
}

function FetchCategoryByTerm(term: ITerm) {
    return Category.findOne({ ...term });
}

async function RemoveCategory(id: string) {
    return await Category.findOneAndDelete({ _id: id });
}

export default {
    CreateCategory,
    GetCategoryList,
    RemoveCategory,
    FetchCategoryByTerm
}