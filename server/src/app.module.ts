import {MiddlewareConsumer, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {getConnection} from "typeorm";
import {ContactFormController} from "./controllers/contactForm.controller";

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: ['../.env', '../.env'],
          isGlobal: true,
      }),
      TypeOrmModule.forRoot(),
  ],
  controllers: [AppController, ContactFormController],
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