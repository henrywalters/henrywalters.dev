import {Body, Controller, Get, Headers, Param, Post, UseGuards} from "@nestjs/common";
import {LoginDto, UserDto} from "../dtos/user.dto";
import {CleanedUser, User} from "../entities/user.entity";
import {ApiResponse, ResponseDto} from "../dtos/response.dto";
import * as bcrypt from "bcrypt";
import {TokenService} from "../services/token.service";
import {TfaChallenge} from "../entities/tfaChallenge.entity";
import {DateTime} from "luxon";
import {MailerService} from "@nestjs-modules/mailer";
import {AuthenticateFor} from "../guards/authenticateFor.guard";

export enum Privileges {
    FORUM_READ = "FORUM_READ",
    FORUM_WRITE = "FORUM_WRITE",
    ADMIN = "ADMIN",
}

@Controller("v1/auth")
export class AuthController {

    constructor(private readonly tokens: TokenService, private readonly mailer: MailerService) {}

    private async createTfaChallenge(user: User, expiresInSeconds?: number): Promise<TfaChallenge> {
        const challenge = new TfaChallenge();
        challenge.user = user;
        if (expiresInSeconds) challenge.expiresAt = DateTime.FromJSDate(new Date).add({seconds: expiresInSeconds}).toJSDate();
        await challenge.save();
        return challenge;
    }

    private async sendVerificationEmail(user: User, challenge: TfaChallenge): Promise<void> {
        await this.mailer.sendMail({
            to: user.email,
            from: '"Hadev.io Registration" <registration@hadev.io>',
            subject: "Hadev.io Sign-Up Verification",
            html: `
                <p>Hello ${user.firstName} ${user.lastName},</p>
                <p>Thank you for signing up to be a member of Hadev.io. To complete your sign-up process, please verify your email by clicking the link below.</p>
                <p style="width: 100%; text-align: center"><a href="${process.env.APP_URL}tfa/${challenge.id}">${process.env.APP_URL}tfa/${challenge.id}</a></p>
            `
        })
    }

    @Get("self")
    @UseGuards(new AuthenticateFor())
    public async getSelf(@Headers("user") user: CleanedUser): Promise<ApiResponse<CleanedUser, string>> {
        return ResponseDto.Success(user);
    }

    @Post("verify/:challenge")
    public async verify(@Param("challenge") challengeId: string): Promise<ApiResponse<void, string>> {
        const challenge = await TfaChallenge.findOne(challengeId, {
            relations: ["user"]
        });

        if (!challenge) return ResponseDto.Error("Invalid two-factor authorization code");

        if (!challenge.isActive()) return ResponseDto.Error("Two-factor authorization code is invalid or expired");

        challenge.user.verified = true;
        await challenge.user.save();
        challenge.passed = true;
        await challenge.save();

        return ResponseDto.Success(void 0);
    }

    @Post("register")
    public async register(@Body() req: UserDto) {
        const errors = {};

        if (!!await User.findOne({ where: { email: req.email }})) {
            errors["email"] = "Email is already registered";
        }

        if (req.password.length < 6 ||
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(req.password) !== -1 ||
            ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'].indexOf(req.password) !== -1
        ) {
            errors["password"] = "Password must be 6 characters long and contain a number and special character";
        }

        if (Object.keys(errors).length > 0) {
            return ResponseDto.Error(errors);
        }

        const user = new User();
        user.firstName = req.firstName;
        user.lastName = req.lastName;
        user.email = req.email;
        user.password = bcrypt.hashSync(req.password, 10);
        user.privileges = [ Privileges.FORUM_READ, Privileges.FORUM_WRITE ];
        await user.save();

        const challenge = await this.createTfaChallenge(user);

        await this.sendVerificationEmail(user, challenge);

        return ResponseDto.Success(void 0);
    }

    @Post("login")
    public async login(@Body() req: LoginDto) {
        const user = await User.findOne({ where: { email: req.email }});

        if (!user || !bcrypt.compareSync(req.password, user.password)) {
            return ResponseDto.Error("Invalid Email / Password");
        }

        if (!user.verified) {
            return ResponseDto.Error("User is not verified. Please check your email");
        }

        return ResponseDto.Success(await this.tokens.generateToken(user.cleaned()));
    }
}