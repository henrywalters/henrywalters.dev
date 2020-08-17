import {Body, Controller, Delete, Get, HttpException, Param, Post, Put, UseGuards} from "@nestjs/common";
import {ResponseDto} from "../dtos/response.dto";
import {AuthenticateFor} from "../guards/authenticateFor.guard";
import {Privileges} from "./auth.controller";
import {Category} from "../entities/category.entity";
import {CategoryDto} from "../dtos/category.dto";

@Controller("v1/category")
export class CategoryController {
    @Get()
    public async getCategories() {
        return ResponseDto.Success(await Category.find());
    }

    @Post()
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async newCategory(@Body() dto: CategoryDto) {
        const category = new Category();
        if (dto.category.trim().length === 0) throw new HttpException("Category must not be empty", 200);
        category.category = dto.category;
        await category.save();
        return ResponseDto.Success(category);
    }

    @Put(":id")
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async updateCategory(@Body() dto: CategoryDto, @Param("id") id: string) {
        const category = await Category.findOneOrFail(id);
        category.category = dto.category;
        await category.save();
        return ResponseDto.Success(category);
    }

    @Delete(":id")
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async deleteCategory(@Param("id") id: string) {
        const category = await Category.findOneOrFail(id);
        await category.softRemove();
        return ResponseDto.Success(void 0);
    }
}