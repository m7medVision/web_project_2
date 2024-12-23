import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize('webdevproj2', 'root', '', {
  host: '127.0.0.1',
  port: '8889',
  dialect: 'mysql',
});
