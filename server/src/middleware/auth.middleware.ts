import {Injectable, NestMiddleware} from "@nestjs/common";
import {Request, Response} from "express";
import {TokenService} from "../services/token.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly tokens: TokenService) {}

    async use(req: Request, res: Response, next: Function) {
        try {
            const jwt = req.headers.jwt;

            if (!jwt) {
                next();
            } else {
                if (Array.isArray(jwt)) return res.status(400).json({success: false, error: "Malformed jwt"});
                const jwtParts = jwt.split(" ");
                if (jwtParts.length !== 2 && jwtParts[0] !== "bearer") return res.status(400).json({success: false, error: "Malformed jwt"});

                const decoded = await this.tokens.verifyToken(jwtParts[1]) as any;

                if (decoded.payload) req.headers.user = decoded.payload as any;

                next();
            }

        } catch (e) {
            console.log(e);
            next();
        }
    }
}