import BaseService, {HashMap} from "@/services/base.service";

export interface ICategory {
    id: string;
    category: string;
}

export interface CategoryDto {
    category: string;
}

export default class CategoryService extends BaseService<CategoryDto, ICategory, string> {
    constructor() {
        super("Category Service", "category");
    }
}