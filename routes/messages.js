const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Message = db.Message;

// GET /api/messages - 获取所有留言
router.get('/', async (req, res) => {
  try {
    const messages = await Message.findAll({
      order: [['createTime', 'DESC']]
    });
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取留言失败', error: error.message });
  }
});

// POST /api/messages - 提交新留言
router.post('/', async (req, res) => {
  try {
    const { nickname, content } = req.body;
    
    // 验证输入
    if (!nickname || !content) {
      return res.status(400).json({ 
        success: false, 
        message: nickname ? '留言内容不能为空' : '昵称不能为空' 
      });
    }
    
    // 创建留言
    await Message.create({ nickname, content });
    res.json({ success: true, message: '提交成功' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;