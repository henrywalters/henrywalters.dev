import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Privileges } from "src/constants/privileges.constants";
import { ResponseDto } from "src/dtos/response.dto";
import { TrackedLinkDto } from "src/dtos/trackedLink.dto";
import { TrackedLink } from "src/entities/trackedLink.entity";
import { AuthenticateFor } from "src/guards/authenticateFor.guard";

@Controller("v1/tracked-link")
export class TrackedLinkController {
    @Get()
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async getTrackedLinks() {
        return ResponseDto.Success(await TrackedLink.find());
    }

    @Post()
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async createTrackedLink(@Body() req: TrackedLinkDto) {
        return await TrackedLink.createLink(req.link, req.source);
    }

    @Delete(":id")
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async deleteTrackedLink(@Param("id") id: string) {
        try {
            const link = await TrackedLink.findOneOrFail(id);
            await link.remove();
            return ResponseDto.Success(void 0);
        } catch (e) {
            return ResponseDto.Error("Link does not exist");
        }
    } 
}