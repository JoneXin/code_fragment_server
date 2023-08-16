import { Injectable } from '@nestjs/common';
import { FragmentType } from './fg.class';
import { fragment } from 'src/entities';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

@Injectable()
export class FgService {
    constructor(@InjectModel(fragment, 'code_fragment') private readonly fragmentModel: typeof fragment) {}

    async addFragment(fragMentList: FragmentType[]) {
        console.log(fragMentList);

        await this.fragmentModel.bulkCreate(fragMentList, { updateOnDuplicate: ['content', 'desc', 'category'] });
        return true;
    }

    async getFragment(msg: string) {
        if (!msg) return [];

        return await this.fragmentModel.findAll({
            where: {
                title: {
                    [Op.like]: `%${msg}%`,
                },
            },
            limit: 12,
        });
    }
}
