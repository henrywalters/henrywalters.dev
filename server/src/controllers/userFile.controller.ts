import {
    Body,
    Controller,
    Delete,
    Get, Header,
    Headers,
    Param,
    Post,
    Put,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {AuthenticateFor} from "../guards/authenticateFor.guard";
import {Privileges} from "../constants/privileges.constants";
import {User} from "../entities/user.entity";
import {UserFileDto} from "../dtos/userFile.dto";
import {UserFileService} from "../services/file.service";
import {ResponseDto} from "../dtos/response.dto";
import { UserFile } from "src/entities/userFile.entity";

@Controller("v1/user-file")
export class UserFileController {

    constructor(private readonly userFiles: UserFileService) {}

    @Post()
    @UseInterceptors(FileInterceptor("file"))
    @UseGuards(new AuthenticateFor(Privileges.FORUM_WRITE))
    public async uploadUserFile(
        @UploadedFile() file: Express.Multer.File,
        @Headers("user") user: User,
        @Body() request: UserFileDto,
    ) {
        try {
            if (!file) throw new Error("Missing file");
            return ResponseDto.Success(await this.userFiles.store(file, request.name, request.alt))
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }

    @Put(":id")
    @UseInterceptors(FileInterceptor("file"))
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async editUserFile(
        @Param("id") id: string,
        @UploadedFile() file: Express.Multer.File,
        @Headers("user") user: User,
        @Body() request: UserFileDto,
    ) {
        try {
            const userFile = await UserFile.findOneOrFail(id);
            return ResponseDto.Success(await this.userFiles.update(userFile, file, request.name, request.alt));
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }

    @Get()
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async getUserFiles() {
        return ResponseDto.Success(await UserFile.find());
    }

    @Delete(":id")
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async deleteUserFile(@Param("id") id: string) {
        try {
            const file = await UserFile.findOneOrFail(id);
            await file.remove();
            return ResponseDto.Success(void 0);
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }

    @Get(":id")
    public async getUserFile(@Param("id") id: string) {
        try {
            return ResponseDto.Success(this.userFiles.get(id));
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }

    @Get("content/:path")
    public async getUserFileContent(@Param("path") path: string, @Res() response) {
        const file = await this.userFiles.getContent(path);
        response.setHeader("content-type", "image/" + path.split(".")[1]);
        response.setHeader("content-disposition", path);
        console.log("image/" + path.split(".")[1]);
        response.send(file);
    }

}