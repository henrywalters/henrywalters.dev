import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Privileges } from "src/constants/privileges.constants";
import { ResponseDto } from "src/dtos/response.dto";
import { ServiceDTO } from "src/dtos/service.dto";
import { Service } from "src/entities/service.entity";
import { AuthenticateFor } from "src/guards/authenticateFor.guard";

@Controller('v1/service')
export class ServiceController {
    
    @Get()
    public async getServices() {
        return ResponseDto.Success(await Service.find());
    }

    @Get(":id")
    public async getService(@Param("id") id: string) {
        try {
            return ResponseDto.Success(await Service.findByIdOrSlug(id));
        } catch (e) {
            return ResponseDto.Error("Service does not exist");
        }
    }

    @Post()
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async createService(@Body() body: ServiceDTO) {
        try {
            const service = new Service();
            return await service.updateFromDTO(body);
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }

    @Put(":id")
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async updateService(@Param("id") id: string, @Body() body: ServiceDTO) {
        try {
            const service = await Service.findByIdOrSlug(id);
            return await service.updateFromDTO(body);
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }

    @Delete(":id")
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async deleteService(@Param("id") id: string) {
        try {
            const service = await Service.findByIdOrSlug(id);
            service.remove();
            return ResponseDto.Success(void 0);
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }
}