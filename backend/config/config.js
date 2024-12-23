import {Sequelize} from 'sequelize';

const dbUrl = process.env.DATABASE_URL || 'postgres://postgres:oman1234@db:5432/webdevproj2';

export const sequelize = new Sequelize(dbUrl);
