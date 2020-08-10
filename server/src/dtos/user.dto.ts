import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

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