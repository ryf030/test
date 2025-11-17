# 简易留言板全栈项目

这是一个基于 Node.js + Express + MySQL + Sequelize 开发的简易留言板应用。

## 功能特点

- **提交留言**：用户可输入昵称和留言内容，提交后保存到数据库
- **展示留言**：自动展示所有历史留言，按发布时间倒序排列
- **数据持久化**：使用 MySQL 数据库存储留言数据
- **响应式设计**：在手机和电脑上均可正常显示

## 技术栈

- **前端**：HTML、CSS、原生 JavaScript
- **后端**：Node.js、Express
- **数据库**：MySQL、Sequelize (ORM)

## 目录结构

```
├── config/           # 配置文件目录
│   └── database.js   # 数据库配置
├── models/           # 数据模型目录
│   └── Message.js    # 留言模型
├── routes/           # 路由目录
│   └── messages.js   # 留言相关路由
├── public/           # 静态文件目录
│   ├── index.html    # 前端页面
│   └── script.js     # 前端脚本
├── app.js            # 后端主入口
├── package.json      # 项目配置
└── README.md         # 项目说明
```

## 运行指南

### 1. 安装依赖

```bash
npm install
```

### 2. 配置数据库

1. 确保 MySQL 服务已启动
2. 创建数据库：

```sql
CREATE DATABASE message_board;
```

3. 修改数据库配置（如果需要）：

打开 `config/database.js`，修改以下配置以匹配您的 MySQL 设置：

```javascript
const sequelize = new Sequelize('message_board', 'root', 'password', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  timezone: '+08:00',
  logging: console.log
});
```

### 3. 启动服务

```bash
npm start
```

### 4. 访问应用

打开浏览器，访问 http://localhost:3000

## API 接口

### GET /api/messages
- **功能**：获取所有留言
- **返回格式**：
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "nickname": "张三",
        "content": "这是一条留言",
        "createTime": "2024-10-01T07:30:00.000Z"
      }
    ]
  }
  ```

### POST /api/messages
- **功能**：提交新留言
- **请求体**：
  ```json
  {
    "nickname": "张三",
    "content": "这是一条留言"
  }
  ```
- **返回格式**：
  - 成功：
    ```json
    { "success": true, "message": "提交成功" }
    ```
  - 失败：
    ```json
    { "success": false, "message": "错误信息" }
    ```

## 注意事项

1. 确保 MySQL 服务正常运行
2. 默认数据库用户名为 `root`，密码为 `password`，可根据实际情况修改
3. 留言数据将自动创建在 `messages` 表中
4. 应用启动时会自动同步数据库模型

## License

MIT