/**
 * 内容保护脚本 - 防止复制和右键菜单
 * 注意:这些方法可以提供基本保护,但技术娴熟的用户仍可绕过
 */
document。addEventListener('DOMContentLoaded', function() {
    // 禁用右键菜单
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showNotice('内容受版权保护,无法复制');
        return false;
    });
    
    // 禁用复制功能
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        showNotice('内容受版权保护,无法复制');
        return false;
    });
    
    // 禁用剪切功能
    document.addEventListener('cut', function(e) {
        e.preventDefault();
        showNotice('内容受版权保护,无法剪切');
        return false;
    });
    
    // 阻止拖动选择
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // 监听键盘快捷键 (Ctrl+C, Ctrl+X, Ctrl+A, Ctrl+S, F12)
    document.addEventListener('keydown', function(e) {
        // 检查是否在输入框中,如果是则允许复制粘贴
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return true;
        }
        
        // 检查常见快捷键
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'c': // 复制
                case 'x': // 剪切
                case 'a': // 全选
                case 's': // 保存
                case 'u': // 查看源代码
                case 'p': // 打印
                    e.preventDefault();
                    showNotice('该操作已被禁用');
                    return false;
            }
        }
        
        // 阻止F12开发者工具
        if (e.key === 'F12') {
            e.preventDefault();
            showNotice('开发者工具已被禁用');
            return false;
        }
    });
    
    // 显示通知
    function showNotice(message) {
        // 检查是否已有通知
        let notice = document.querySelector('.no-select-notice');
        
        // 如果没有,创建一个
        if (!notice) {
            notice = document.createElement('div');
            notice.className = 'no-select-notice';
            document.body.appendChild(notice);
        }
        
        // 更新消息并显示
        notice.textContent = message;
        notice.style.display = 'block';
        
        // 2秒后隐藏
        setTimeout(function() {
            notice.style.display = 'none';
        }, 2000);
    }
}); 
