import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { FgService } from './fg.service';
import { FgController } from './fg.controller';
import { fragment } from 'src/entities';

@Module({
    imports: [SequelizeModule.forFeature([fragment], 'code_fragment')],
    controllers: [FgController],
    providers: [FgService],
})
export class FgModule {}
