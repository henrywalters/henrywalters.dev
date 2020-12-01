import { Body, Controller, Get, Headers, Param, Put, Res, UseGuards } from "@nestjs/common";
import { Privileges } from "src/constants/privileges.constants";
import { ResponseDto } from "src/dtos/response.dto";
import { UpdateUserDto } from "src/dtos/user.dto";
import { User } from "src/entities/user.entity";
import { AuthenticateFor } from "src/guards/authenticateFor.guard";

@Controller("v1/user")
export class UserController {
    @Get()
    public async getUsers(@Headers("user") user: User) {
        const rawUser = user ? await User.findOne(user.id) : void 0;
        return ResponseDto.Success(
            rawUser && rawUser.hasPrivilege(Privileges.ADMIN) ? 
            await User.find() : 
            (await User.getActive()).map(x => x.minimal())
        );
    }

    @Put(":id")
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async updateUser(@Param("id") id: string, @Body() req: UpdateUserDto) {
        try {
            const user = await User.findOneOrFail(id);
            user.active = req.active;
            user.privileges = req.privileges;
            await user.save();
            return ResponseDto.Success(user);
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }
}