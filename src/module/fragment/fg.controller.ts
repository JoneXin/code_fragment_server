import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FgService } from './fg.service';
import { FragmentType } from './fg.class';

@Controller('/fg')
export class FgController {
    constructor(private readonly fgService: FgService) {}

    @Post('/bulk')
    async getMemoryUseAge(@Body() param: FragmentType[]) {
        return await this.fgService.addFragment(param);
    }

    @Get('/list')
    async getFragmentList(@Query() param) {
        console.log(param);

        return await this.fgService.getFragment(param?.msg);
    }
}
