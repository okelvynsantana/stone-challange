import { EmployersModule } from './modules/employers/employers.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './shared/interceptors/logger.interceptor';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/Winston/winston.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    WinstonModule.forRoot(winstonConfig),
    EmployersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
