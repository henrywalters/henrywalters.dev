import {MiddlewareConsumer, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {getConnection} from "typeorm";
import {ContactFormController} from "./controllers/contactForm.controller";
import {TrackingController} from "./controllers/tracking.controller";
import {MailerModule} from "@nestjs-modules/mailer";

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
  controllers: [AppController, ContactFormController, TrackingController],
  providers: [AppService],
})
export class AppModule {
    async configure(consumer: MiddlewareConsumer) {
        await this.setEntityConnections();
    }

    async setEntityConnections() {
        const connection = await getConnection();
        connection.entityMetadatas.forEach(entity => {
            (entity.target as any).useConnection(connection);
        })
    }
}