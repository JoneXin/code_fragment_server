import { resolve } from 'path';

const { join } = require('path');
const fs = require('fs');
const sequelize = require('sequelize');
import { readFileSync } from 'fs';
const mysqlConfig = JSON.parse(readFileSync(resolve('./config/mysql.config.json')).toString());
const mysql2 = require('mysql2');
const sqlPath = resolve('./sql');

function getSeqInstance() {
    return new sequelize({
        dialect: 'mysql',
        synchronize: false,
        timezone: '+08:00',
        logging: false,
        query: { raw: true },
        dialectModule: mysql2,
        host: process.env.CF_HOST || mysqlConfig.host,
        port: process.env.CF_PORT || mysqlConfig.port,
        username: process.env.CF_USERNAME || mysqlConfig.username,
        password: process.env.CF_PASSWORD || mysqlConfig.password,
    });
}

/**
 * 初始化 lia_web_roll
 * @returns {Promise<boolean>}
 */
export async function initDb() {
    const seq = getSeqInstance();
    const dir = fs.opendirSync(sqlPath);
    const transaction = await seq.transaction();

    try {
        for await (const dirent of dir) {
            const initSql = fs.readFileSync(join(sqlPath, dirent.name)).toString();

            const sqlps = initSql
                .replaceAll('win_deployer', mysqlConfig.database)
                .split(';')
                .filter((s) => !!s.trim());

            for (let i = 0; i < sqlps.length; i++) {
                await seq.query(sqlps[i], { transaction });
            }
        }
        console.log('初始化数据库成功！');
        transaction.commit();
    } catch (err) {
        await transaction.rollback();
        console.log(err);
    }

    return true;
}
