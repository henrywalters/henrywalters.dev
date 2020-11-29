import { Controller, Get } from "@nestjs/common";
import { ResponseDto } from "src/dtos/response.dto";
import { BlogPost } from "src/entities/blogPost.entity";

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
}