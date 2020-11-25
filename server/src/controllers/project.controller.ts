import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {AuthenticateFor} from "../guards/authenticateFor.guard";
import {Privileges} from "../constants/privileges.constants";
import {ProjectDto} from "../dtos/project.dto";
import {Project} from "../entities/project.entity";
import {UserFile} from "../entities/userFile.entity";
import {ResponseDto} from "../dtos/response.dto";

@Controller("v1/project")
export class ProjectController {

    private async updateProjectFromRequest(project: Project, req: ProjectDto) {
        project.title = req.title;
        project.status = req.status;
        project.shortDescription = req.shortDescription;
        project.longDescription = req.longDescription;
        project.url = req.url;
        project.sourceControlUrl = req.sourceControlUrl;
        project.videoUrl = req.videoUrl;
        project.languages = req.languages;
        if (req.thumbnailId) {
            project.thumbnail = await UserFile.findOneOrFail(req.thumbnailId);
        }
        await project.save();
        return project;
    }

    @Post()
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async addProject(@Body() req: ProjectDto) {
        const project = new Project();
        return ResponseDto.Success(await this.updateProjectFromRequest(project, req));
    }

    @Put(":id")
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async editProject(@Body() req: ProjectDto, @Param("id") id: string) {
        const project = await Project.findOneOrFail(id);
        return ResponseDto.Success(await this.updateProjectFromRequest(project, req));
    }

    @Delete(":id")
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async deleteProject(@Param("id") id: string) {
        const project = await Project.findOneOrFail(id);
        await project.remove();
        return ResponseDto.Success(void 0);
    }

    @Get(":id")
    public async getProject(@Param("id") id: string) {
        const project = await Project.findOne(id)
        if (project) return ResponseDto.Success(project);
        else return ResponseDto.Error("Project does not exist");
    }

    @Get()
    public async getProjects() {
        return ResponseDto.Success(await Project.find());
    }
}