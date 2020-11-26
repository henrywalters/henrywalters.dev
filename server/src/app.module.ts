import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {getConnection} from "typeorm";
import {ContactFormController} from "./controllers/contactForm.controller";
import {TrackingController} from "./controllers/tracking.controller";
import {MailerModule} from "@nestjs-modules/mailer";
import {TokenService} from "./services/token.service";
import {AuthController} from "./controllers/auth.controller";
import {AuthMiddleware} from "./middleware/auth.middleware";
import {CategoryController} from "./controllers/category.controller";
import {ForumController} from "./controllers/forum.controller";
import {ProjectController} from "./controllers/project.controller";
import {UserFileService} from "./services/file.service";
import {UserFileController} from "./controllers/userFile.controller";
import { TestimonialController } from './controllers/testimonial.controller';
import { ServiceController } from './controllers/service.controller';

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: ['../.env'],
          isGlobal: true,
      }),
      MailerModule.forRoot({
          transport: `smtps://${process.env.EMAIL_USER}:${process.env.EMAIL_PASS}@${process.env.EMAIL_HOST}`,
          defaults: {
              from: '"noreply@hadev.io" <noreply@hadev.io>'
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
      ForumController, 
      ProjectController, 
      UserFileController,
      ServiceController,
    ],
  providers: [AppService, TokenService, UserFileService],
})
export class AppModule {
    async configure(consumer: MiddlewareConsumer) {
        await this.setEntityConnections();
        consumer.apply(AuthMiddleware)
            .forRoutes({path: "*", method: RequestMethod.ALL});
    }

    async setEntityConnections() {
        const connection = await getConnection();
        connection.entityMetadatas.forEach(entity => {
            (entity.target as any).useConnection(connection);
        })
    }
}