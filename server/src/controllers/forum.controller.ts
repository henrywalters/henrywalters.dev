import {Body, Controller, Delete, Get, Headers, Param, Post, Put, Query, UseGuards} from "@nestjs/common";
import {AuthenticateFor} from "../guards/authenticateFor.guard";
import {Privileges} from "../constants/privileges.constants";
import {PostDto} from "../dtos/post.dto";
import {CleanedUser, User} from "../entities/user.entity";
import {ForumPost} from "../entities/forumPost.entity";
import {Category} from "../entities/category.entity";
import {Comment} from "../entities/comment.entity";
import {CommentDto} from "../dtos/comment.dto";
import {ResponseDto} from "../dtos/response.dto";
import {IsNull} from "typeorm";

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
        return ResponseDto.Success(post);
    }

    @Put(":id")
    @UseGuards(new AuthenticateFor(Privileges.FORUM_WRITE))
    public async updatePost(@Body() req: PostDto, @Headers("user") cleanedUser: CleanedUser, @Param("id") id: string) {
        const category = await Category.findOneOrFail(req.categoryId);
        const user = await User.findOneOrFail(cleanedUser.id);
        const post = await ForumPost.findOneOrFail(id, {relations: ['author']});

        if (user.id !== post.author.id) throw new Error("You may only edit your own posts");

        post.category = category;
        post.title = req.title;
        post.body = req.body;
        post.tags = req.tags;
        await post.save();
        return ResponseDto.Success(post);
    }

    @Get(":id")
    public async getPost(@Param("id") id: string) {
        return ResponseDto.Success(await ForumPost.findOneOrFail(id));
    }

    @Delete(":id")
    @UseGuards(new AuthenticateFor(Privileges.FORUM_WRITE))
    public async deletePost(@Headers("user") user: CleanedUser, @Param("id") id: string) {
        const post = await ForumPost.findOneOrFail(id, {relations: ['author']});

        if (user.id !== post.author.id) throw new Error("You may only delete your own posts");

        await post.softRemove();

        return ResponseDto.Success(void 0);
    }

    @Get()
    public async getPosts(@Query("category") categoryId?: string) {
        const query = await ForumPost.createQueryBuilder("f");

        if (categoryId) query.where("f.categoryId = :categoryId", {categoryId});

        return ResponseDto.Success(await query.getMany());
    }

    @Post(":id/comments")
    @UseGuards(new AuthenticateFor(Privileges.FORUM_WRITE))
    public async addCommentToPost(@Param("id") id: string, @Headers("user") cleanedUser: CleanedUser, @Body() req: CommentDto) {
        const user = await User.findOneOrFail(cleanedUser.id);
        const post = await ForumPost.findOneOrFail(id, {relations: ['author']});

        const comment = new Comment();
        comment.author = user;
        comment.forumPost = post;
        comment.body = req.body;
        comment.upvotes = 0;
        comment.downvotes = 0;

        if (req.parentCommentId) {
            comment.parentComment = await Comment.findOneOrFail(req.parentCommentId);
        }

        await comment.save();

        return ResponseDto.Success(comment);
    }

    @Put(":id/comments/:commentId")
    @UseGuards(new AuthenticateFor(Privileges.FORUM_WRITE))
    public async editComment(@Param("id") id: string, @Param("commentId") commentId: string, @Headers("user") user: CleanedUser, @Body() req: CommentDto) {
        const post = await ForumPost.findOneOrFail(id);
        const comment = await ForumPost.findOneOrFail(commentId, {relations: ['author']});

        if (user.id !== comment.author.id) throw new Error("You may only edit your own comments");

        comment.body = req.body;

        await comment.save();

        return ResponseDto.Success(comment);
    }

    @Delete(":id/comments/:commentId")
    @UseGuards(new AuthenticateFor(Privileges.FORUM_WRITE))
    public async deleteComment(@Param("id") id: string, @Param("commentId") commentId: string, @Headers("user") user: CleanedUser, @Body() req: CommentDto) {
        const post = await ForumPost.findOneOrFail(id);
        const comment = await ForumPost.findOneOrFail(commentId, {relations: ['author']});

        if (user.id !== comment.author.id) throw new Error("You may only edit your own comments");

        await comment.softRemove();

        return ResponseDto.Success(void 0);
    }

    @Get(":id/comments")
    public async getPostComments(@Param("id") id: string) {
        return ResponseDto.Success((await Comment.find({
            where: {
                forumPost: {
                    id,
                },
                parentComment: {
                    id: IsNull()
                }
            },
            relations: ["author"]
        })).map(comment => {
            // @ts-ignore
            comment.author = comment.author.firstName + " " + comment.author.lastName;
            return comment;
        }));
    }

    @Get(":id/comments/:commentId")
    public async getChildComments(@Param("id") id: string, @Param("commentId") commentId: string) {
        return ResponseDto.Success((await Comment.find({
            where: {
                parentComment: {
                    id: commentId,
                }
            },
            relations: ["author"]
        })).map(comment => {
            // @ts-ignore
            comment.author = comment.author.firstName + " " + comment.author.lastName;
            return comment;
        }));
    }

}