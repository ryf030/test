const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// 配置中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 配置静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 导入数据库连接
const db = require('./config/database');

// 导入路由
const messageRoutes = require('./routes/messages');
app.use('/api/messages', messageRoutes);

// 数据库初始化函数
async function initDatabase() {
  try {
    console.log('开始同步数据库模型...');
    await db.sync({ force: false });
    console.log('✓ 数据库模型同步成功');
    console.log('✓ 数据表已准备就绪');
  } catch (error) {
    console.error('× 数据库同步失败:', error.message);
    console.error('× 请检查以下内容:');
    console.error('  1. MySQL服务是否正在运行');
    console.error('  2. 数据库message_board是否已创建');
    console.error('  3. 数据库连接配置是否正确（用户名、密码等）');
    console.error('  4. 请参考 数据库创建指南.md 文件获取详细帮助');
  }
}

// 初始化数据库
initDatabase();

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});