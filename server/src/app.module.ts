import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {getConnection} from "typeorm";
import {ContactFormController} from "./controllers/contactForm.controller";
import {TrackingController} from "./controllers/tracking.controller";
import {MailerModule} from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import {TokenService} from "./services/token.service";
import {AuthController} from "./controllers/auth.controller";
import {AuthMiddleware} from "./middleware/auth.middleware";
import {CategoryController} from "./controllers/category.controller";
import {ProjectController} from "./controllers/project.controller";
import {UserFileService} from "./services/file.service";
import {UserFileController} from "./controllers/userFile.controller";
import { TestimonialController } from './controllers/testimonial.controller';
import { ServiceController } from './controllers/service.controller';
import { BlogController } from './controllers/blog.controller';
import { UserController } from './controllers/user.controller';
import { TrackedLinkController } from './controllers/trackedLink.controller';
import { EmailService } from './services/email.service';
import { AccountingController } from './controllers/accounting.controller';

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: ['../.env'],
          isGlobal: true,
      }),
      MailerModule.forRoot({
          transport: {
              host: process.env.EMAIL_HOST,
              port: process.env.EMAIL_PORT,
              secure: true,
              auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
              }
          },
          defaults: {
              from: `"${process.env.DEFAULT_EMAIL_LABEL} <${process.env.DEFAULT_EMAIL}>`,
          },
          template: {
              dir: process.cwd() + '/email-templates/',
              adapter: new HandlebarsAdapter(),
              options: {
                  strict: true,
              }
          }
      }),
      TypeOrmModule.forRoot(),
  ],
  controllers: [
      AppController, 
      ContactFormController, 
      TestimonialController,
      TrackingController, 
      AuthController, 
      CategoryController, 
      ProjectController, 
      UserFileController,
      ServiceController,
      BlogController,
      UserController,
      TrackedLinkController,
      AccountingController,
    ],
  providers: [AppService, TokenService, UserFileService, EmailService],
})
export class AppModule {
    async configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware)
            .forRoutes({path: "*", method: RequestMethod.ALL});
    }
}