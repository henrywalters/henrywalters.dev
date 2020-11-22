
import {ExceptionFilter, Catch, ArgumentsHost, HttpException, ValidationError} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const error = exception.getResponse() as any;

        console.log(error);

        //const validationErrors = error.message as ValidationError[];

        let body = null;

        if (Array.isArray(error.message)) {
            body = {};

            for (const message of error.message) {
                console.log(message);

                const parts = message.split(" ");
                let errorMsg = parts.slice(1).join(" ");

                switch(errorMsg) {
                    case "must be an email":
                        errorMsg = "Valid email required";
                        break;
                    case "should not be empty":
                        errorMsg = "This field is required";
                        break;
                }

                body[parts[0]] = errorMsg;
            }
        } else {
            body = error.message ? error.message : error ? error : "Unknown error";
        }

        response
            .status(200)
            .json({
                success: false,
                error: body,
            })
    }
}