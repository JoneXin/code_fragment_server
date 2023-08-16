import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpInterceptor } from './interceptor/http.interceptor';
import { SequelizeModule } from '@nestjs/sequelize';
import { mysqlConfig } from './config/mysql.config';
import { WinstonModule } from 'nest-winston';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { FgModule } from './module/fragment/fg.module';

@Module({
    imports: [
        SequelizeModule.forRoot(mysqlConfig),
        WinstonModule.forRootAsync({
            useFactory: () => ({}),
        }),
        ServeStaticModule.forRoot({
            rootPath: resolve('./public'),
        }),
        FgModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: HttpInterceptor,
        },
    ],
})
export class AppModule {}
