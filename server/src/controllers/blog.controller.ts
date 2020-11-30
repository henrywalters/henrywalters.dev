import { Body, Controller, Delete, Get, Headers, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { Privileges } from "src/constants/privileges.constants";
import { CreateBlogPostDto, UpdateBlogPostDto } from "src/dtos/blogPost.dto";
import { ResponseDto } from "src/dtos/response.dto";
import { BlogPost } from "src/entities/blogPost.entity";
import { CleanedUser, User } from "src/entities/user.entity";
import { AuthenticateFor } from "src/guards/authenticateFor.guard";

@Controller('v1/blog')
export class BlogController {
    @Get()
    public async getBlogPosts() {
        return ResponseDto.Success((await BlogPost.find({
            where: {
                live: true,
            }
        })).map(post => post.cleaned()));
    }

    @Get("mine")
    @UseGuards(new AuthenticateFor(Privileges.BLOG_WRITE))
    public async getMyBlogPosts(@Headers("user") user: User) {
        return ResponseDto.Success((await BlogPost.find({
           where: {
               author: user,
           } 
        })).map(post => post.cleaned()));
    }

    @Get(":id")
    public async getBlogPost(@Headers("user") user: User, @Param("id") id: string) {
        try {
            const post = await BlogPost.findByIdOrSlug(id);
            const canEdit = user && post.canEdit(user);

            if (post.live) {
                return ResponseDto.Success(canEdit ? post : post.readOnly());
            }

            if (!canEdit) {
                return ResponseDto.Error("Unauthorized to view blog post");
            }

            return ResponseDto.Success(post);
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }

    @Post()
    @UseGuards(new AuthenticateFor(Privileges.BLOG_WRITE))
    public async createBlogPost(@Headers("user") user: CleanedUser, @Body() req: CreateBlogPostDto) {
        return await BlogPost.createFromRequest(await User.findOneOrFail(user.id), req);
    }

    @Put(":id")
    @UseGuards(new AuthenticateFor(Privileges.BLOG_WRITE))
    public async updateBlogPost(@Headers("user") user: CleanedUser, @Param("id") id: string, @Body() req: UpdateBlogPostDto) {
        try {
            const post = await BlogPost.findByIdOrSlug(id);
            if (!post.canEdit(user)) {
                throw new Error("Unauthorized to edit blog post");
            }
            return await post.updateFromRequest(req);
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }

    @Post(":id/toggle-published")
    @UseGuards(new AuthenticateFor(Privileges.BLOG_WRITE))
    public async publishBlogPost(@Headers("user") user: CleanedUser, @Param("id") id: string) {
        try {
            const post = await BlogPost.findByIdOrSlug(id);

            if (!post.canEdit(user)) {
                return ResponseDto.Error("Unauthorized to edit blog post");
            }

            post.live = !post.live;
            post.publishedAt = post.live ? new Date() : void 0;
            await post.save();

            return ResponseDto.Success(post);
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }

    @Delete(":id")
    @UseGuards(new AuthenticateFor(Privileges.BLOG_WRITE))
    public async deleteBlogPost(@Headers("user") user: CleanedUser, @Param("id") id: string) {
        try {
            const post = await BlogPost.findByIdOrSlug(id);

            if (!post.canEdit(user)) {
                return ResponseDto.Error("Unauthorized to edit blog post");
            }

            await post.remove();

            return ResponseDto.Success(void 0);
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }


}