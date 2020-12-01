import {Contains, IsArray, IsBoolean, IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class UserDto {
    @IsString()
    @IsNotEmpty()
    public firstName: string;

    @IsString()
    @IsNotEmpty()
    public lastName: string;

    @IsString()
    @IsEmail()
    public email: string;

    @IsString()
    @IsNotEmpty()
    public password: string;

}

export class LoginDto {
    @IsString()
    public email: string;

    @IsString()
    public password: string;
}

export class ChangePasswordDto {
    @IsString()
    public password: string;
}

export class UpdateUserDto {
    @IsBoolean()
    public active: boolean;

    @IsArray()
    public privileges: string[];
}