const { DataTypes } = require('sequelize');

// 定义Message模型
module.exports = (sequelize) => {
  const Message = sequelize.define('Message', {
    nickname: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: '昵称不能为空'
        },
        len: {
          args: [1, 50],
          msg: '昵称长度不能超过50个字符'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: '留言内容不能为空'
        }
      }
    },
    createTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    tableName: 'messages',
    timestamps: false,
    indexes: [
      {
        name: 'idx_create_time',
        fields: ['createTime']
      }
    ]
  });

  return Message;
};