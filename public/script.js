document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('message-form');
    const nicknameInput = document.getElementById('nickname');
    const contentInput = document.getElementById('content');
    const nicknameError = document.getElementById('nickname-error');
    const contentError = document.getElementById('content-error');
    const globalError = document.getElementById('global-error');
    const noMessages = document.getElementById('no-messages');
    const messageList = document.getElementById('message-list');
    
    // 页面加载时获取留言列表
    fetchMessages();
    
    // 表单提交事件
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // 隐藏所有错误信息
        nicknameError.style.display = 'none';
        contentError.style.display = 'none';
        globalError.style.display = 'none';
        
        // 获取表单数据
        const nickname = nicknameInput.value.trim();
        const content = contentInput.value.trim();
        
        // 验证表单
        let isValid = true;
        
        if (!nickname) {
            nicknameError.style.display = 'block';
            isValid = false;
        }
        
        if (!content) {
            contentError.style.display = 'block';
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        try {
            // 提交留言
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nickname, content })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // 清空表单
                form.reset();
                // 刷新留言列表
                fetchMessages();
            } else {
                // 显示错误信息
                if (data.message.includes('昵称')) {
                    nicknameError.textContent = data.message;
                    nicknameError.style.display = 'block';
                } else if (data.message.includes('内容')) {
                    contentError.textContent = data.message;
                    contentError.style.display = 'block';
                } else {
                    globalError.textContent = data.message;
                    globalError.style.display = 'block';
                }
            }
        } catch (error) {
            // 显示网络错误
            globalError.textContent = '提交失败，请重试';
            globalError.style.display = 'block';
            console.error('提交留言失败:', error);
        }
    });
    
    // 获取留言列表
    async function fetchMessages() {
        try {
            const response = await fetch('/api/messages');
            const data = await response.json();
            
            if (data.success) {
                const messages = data.data;
                
                // 更新UI
                if (messages.length === 0) {
                    noMessages.style.display = 'block';
                    messageList.style.display = 'none';
                } else {
                    noMessages.style.display = 'none';
                    messageList.style.display = 'flex';
                    messageList.innerHTML = '';
                    
                    // 渲染留言列表
                    messages.forEach(message => {
                        const card = createMessageCard(message);
                        messageList.appendChild(card);
                    });
                }
            } else {
                console.error('获取留言失败:', data.message);
            }
        } catch (error) {
            console.error('获取留言失败:', error);
        }
    }
    
    // 创建留言卡片
    function createMessageCard(message) {
        const card = document.createElement('div');
        card.className = 'message-card';
        
        // 格式化时间
        const formattedTime = formatDateTime(message.createTime);
        
        card.innerHTML = `
            <div class="message-header">
                <span class="message-nickname">${escapeHtml(message.nickname)}</span>
                <span class="message-time">${formattedTime}</span>
            </div>
            <div class="message-content">${escapeHtml(message.content)}</div>
        `;
        
        return card;
    }
    
    // 格式化日期时间
    function formatDateTime(dateTime) {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    
    // HTML转义
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});