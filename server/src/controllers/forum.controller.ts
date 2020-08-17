import {Body, Controller, Delete, Get, Headers, Param, Post, Put, Query, UseGuards} from "@nestjs/common";
import {AuthenticateFor} from "../guards/authenticateFor.guard";
import {Privileges} from "./auth.controller";
import {PostDto} from "../dtos/post.dto";
import {CleanedUser, User} from "../entities/user.entity";
import {ForumPost} from "../entities/forumPost.entity";
import {Category} from "../entities/category.entity";

@Controller("v1/forum")
export class ForumController {
    @Post()
    @UseGuards(new AuthenticateFor(Privileges.FORUM_WRITE))
    public async createPost(@Body() req: PostDto, @Headers("user") cleanedUser: CleanedUser) {
        const post = new ForumPost();
        const category = await Category.findOneOrFail(req.categoryId);
        const user = await User.findOneOrFail(cleanedUser.id);
        post.author = user;
        post.body = req.body;
        post.title = req.title;
        post.category = category;
        post.tags = req.tags;
        await post.save();
        return post;
    }

    @Put(":id")
    @UseGuards(new AuthenticateFor(Privileges.FORUM_WRITE))
    public async updatePost(@Body() req: PostDto, @Headers("user") cleanedUser: CleanedUser, @Param("id") id: string) {
        const category = await Category.findOneOrFail(req.categoryId);
        const user = await User.findOneOrFail(cleanedUser.id);
        const post = await ForumPost.findOneOrFail(id);

        if (user.id !== post.author.id) throw new Error("You may only edit your own posts");

        post.category = category;
        post.title = req.title;
        post.body = req.body;
        post.tags = req.tags;
        await post.save();
        return post;
    }

    @Delete(":id")
    @UseGuards(new AuthenticateFor(Privileges.FORUM_WRITE))
    public async deletePost(@Headers("user") user: CleanedUser, @Param("id") id: string) {
        const post = await ForumPost.findOneOrFail(id);

        if (user.id !== post.author.id) throw new Error("You may only delete your own posts");

        await post.softRemove();
    }

    @Get()
    public async getPosts(@Query("category") categoryId?: string) {
        const query = await ForumPost.createQueryBuilder("f");

        if (categoryId) query.where("f.categoryId = :categoryId", {categoryId});

        return await query.getMany();
    }
}