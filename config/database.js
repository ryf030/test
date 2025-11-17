const { Sequelize } = require('sequelize');

// 创建Sequelize实例
const sequelize = new Sequelize('message_board', 'root', 'yffs1314', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql',
  timezone: '+08:00',
  logging: console.log
});

// 测试数据库连接
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('数据库连接成功');
  } catch (error) {
    console.error('数据库连接失败:', error);
  }
}

testConnection();

// 导入并初始化模型
const Message = require('../models/Message')(sequelize);

// 导出sequelize实例和模型
module.exports = {
  ...sequelize,
  Message
};