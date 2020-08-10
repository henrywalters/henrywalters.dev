import {Injectable} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import {DateTime} from "luxon";

const DEFAULT_EXPIRATION = 3600 * 24 * 30;

@Injectable()
export class TokenService {
    public async generateToken(payload: any, exp: number = DEFAULT_EXPIRATION): Promise<string> {
        return new Promise((res, rej) => {
           jwt.sign({
               payload,
               exp: DateTime.fromJSDate(new Date()).plus({seconds: exp}).toSeconds(),
           }, process.env.APP_SECRET, { algorithm: 'HS256'}, (err, token) => {
               if (err) rej(err);
               res(token);
           })
        });
    }

    public async verifyToken<T>(token: string): Promise<T> {
        return new Promise((res, rej) => {
            jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
                if (err) rej(err);
                res(decoded as T);
            })
        })
    }
}