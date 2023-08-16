import { SequelizeModuleAsyncOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { resolve } from 'path';
import { readFileSync } from 'fs-extra';
const mysql2 = require('mysql2');
const mysqlConf = JSON.parse(readFileSync(resolve('./config/mysql.config.json')).toString());

export const mysqlConfig = {
    dialect: 'mysql' as Dialect,
    name: 'code_fragment',
    autoLoadModels: true,
    synchronize: true,
    timezone: '+08:00',
    logging: true,
    query: { raw: true },
    dialectModule: mysql2,
    database: process.env.CF_DATABASE || mysqlConf.database,
    host: process.env.CF_HOST || mysqlConf.host,
    port: process.env.CF_PORT || mysqlConf.port,
    username: process.env.CF_USERNAME || mysqlConf.username,
    password: process.env.CF_PASSWORD || mysqlConf.password,
};
