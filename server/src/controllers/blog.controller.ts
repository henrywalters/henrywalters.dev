import { MailerService } from "@nestjs-modules/mailer";
import { Body, Controller, Delete, Get, Headers, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { Privileges } from "src/constants/privileges.constants";
import { CreateBlogPostDto, UpdateBlogPostDto } from "src/dtos/blogPost.dto";
import { CommentDto } from "src/dtos/comment.dto";
import { ResponseDto } from "src/dtos/response.dto";
import { BlogPost } from "src/entities/blogPost.entity";
import { Comment } from "src/entities/comment.entity";
import { CleanedUser, User } from "src/entities/user.entity";
import { AuthenticateFor } from "src/guards/authenticateFor.guard";
import { EmailSenders, EmailService } from "src/services/email.service";

@Controller('v1/blog')
export class BlogController {

    constructor(private readonly email: EmailService) {}

    private async sendCommentNotification(post: BlogPost, comment: Comment) {
        await this.email.send({
            to: {
                label: post.author.fullName,
                email: post.author.email,
            },
            priority: 'high',
            subject: 'New Blog Post Comment',
            template: 'blog-post-comment-notification',
            context: {
                name: comment.author ? comment.author.fullName : comment.authorName,
                body: comment.body,
                comment_url: process.env.APP_URL + 'blog/' + post.slug + '?reply-to=' + comment.id,
            }
        })
    }

    private async sendReplyNotification(post: BlogPost, comment: Comment) {
        await this.email.send({
            to: {
                label: post.author.fullName,
                email: post.author.email,
            },
            priority: 'high',
            subject: 'New Blog Post Comment',
            template: 'blog-post-reply-notification',
            context: {
                name: comment.author ? comment.author.fullName : comment.authorName,
                body: comment.body,
                comment_url: process.env.APP_URL + 'blog/' + post.slug + '?reply-to=' + comment.id,
            }
        })
    }

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

    @Get(":id/comment")
    public async getBlogPostComments(@Param("id") id: string) {
        try {
            const blogPost = await BlogPost.findByIdOrSlug(id);
            return ResponseDto.Success((await Comment.find({
                where: {
                    blogPost,
                },
                relations: ['parentComment'],
                order: {
                    createdAt: 'DESC'
                }
            })).map(x => x.cleaned()));
        } catch (e) {
            return ResponseDto.Error(e.message);            
        }
    }

    @Post(":id/comment")
    public async createBlogPostComment(@Param("id") id: string, @Headers("user") user: CleanedUser, @Body() req: CommentDto) {
        try {
            const blogPost = await BlogPost.findByIdOrSlug(id);
            console.log(req);
            const parentComment = req.parentCommentId ? await Comment.findOne(req.parentCommentId) : void 0;
            let comment: Comment;
            console.log(parentComment);
            const errors = {};
            if (req.body.trim().length === 0) {
                errors['body'] = "Comment must not be empty"
            }
            if (user) {
                if (Object.keys(errors).length > 0) {
                    return ResponseDto.Error(errors);
                }
                const fullUser = await User.findOne(user.id);
                comment = await Comment.createUserComment(blogPost, fullUser, req.body, parentComment);
            } else {
                
                if (!req.authorName) {
                    errors['authorName'] = "Please provide your name";
                }
                if (!req.authorEmail) {
                    errors['authorEmail'] = "Please provide your email";
                }

                if (Object.keys(errors).length > 0) {
                    return ResponseDto.Error(errors);
                }

                comment = await Comment.createGuestComment(blogPost, req.authorName, req.authorEmail, req.body, parentComment);
            }

            if (!parentComment) {
                await this.sendCommentNotification(blogPost, comment);
            } else {
                await this.sendReplyNotification(blogPost, comment);
            }

            return ResponseDto.Success(comment.cleaned());
        } catch (e) {
            console.log(e);
            return ResponseDto.Error(e.message);
        }
    }
}