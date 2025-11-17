-- 创建留言板数据库
CREATE DATABASE IF NOT EXISTS message_board DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用创建的数据库
USE message_board;

-- 如果messages表不存在，则创建它
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    createTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_create_time (createTime)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;