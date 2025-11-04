// ==UserScript==
// @name         Bilibili Purify
// @name:zh-CN   Bilibili纯粹化
// @namespace    https://github.com/RevenLiu
// @version      1.0.1
// @description  一个用于Bilibili平台的篡改猴脚本。以一种直接的方式抵抗商业化平台对人类大脑的利用。包含重定向首页、隐藏广告、隐藏推荐视频、评论区反成瘾/情绪控制锁等功能，削弱平台/媒体对你心理的操控，恢复你对自己注意力和思考的主导权。
// @author       RevenLiu
// @license      MIT
// @homepage     https://github.com/RevenLiu/BilibiliPurify
// @supportURL   https://github.com/RevenLiu/BilibiliPurify/issues 
// @match        https://www.bilibili.com/
// @match        https://www.bilibili.com/?*
// @match        https://www.bilibili.com/*
// @match        https://search.bilibili.com/*
// @match        https://space.bilibili.com/*
// @match        https://message.bilibili.com/*
// @match        https://t.bilibili.com/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 首页重定向逻辑
    if (window.location.hostname === 'www.bilibili.com' && window.location.pathname === '/') {
        window.location.replace('https://search.bilibili.com/');
        return;
    }

    // 使用 CSS 隐藏元素
    const hideSelectors = [
        //左上入口栏广告
        'li.v-popover-wrap.left-loc-entry',
        //视频页右侧小广告
        'div.video-card-ad-small',
        //视频页视频推荐列表
        'div.recommend-list-v1',
        //视频页右侧底部广告
        'div.ad-report.ad-floor-exp.right-bottom-banner',
        //视频页活动
        'div.activity-m-v1.act-end',
        //视频页左侧条形广告
        'div.ad-report.strip-ad.left-banner',
        //视频页合集列表
        'div.video-pod.video-pod',
        //热搜
        'div.trending',
        //右上入口栏大会员
        'a.right-entry__outside.right-entry--vip',
        //左上入口栏杂项
        'a.default-entry',
        //左上入口栏下载客户端按钮
        'a.download-entry.download-client-trigger',
        //?
        'div.v-popover.is-bottom-start',
        //左上入口栏首页箭头图标
        'svg.mini-header__arrow',
        //视频结束推荐
        'div.bpx-player-ending-related',
        //投票弹幕 (视频内)
        'div.bili-danmaku-x-vote.bili-danmaku-x-show',
        //互动引导 (视频内)
        'div.bili-danmaku-x-guide-all.bili-danmaku-x-guide.bili-danmaku-x-show',
        //关联视频 (视频内)
        'div.bili-danmaku-x-link.bili-danmaku-x-show',
        //评分弹幕及小图片 (视频内)
        'div.bili-danmaku-x-score.bili-danmaku-x-show',
        'div.bili-danmaku-x-cmd-shrink.bili-danmaku-x-show',
        //动态页面热搜
        'div.bili-dyn-search-trendings',
        //剧播放页推荐列表
        'div.recommend_wrap__PccwM',
        //剧播放页大会员广告
        'div.paybar_container__WApBR'
    ];

    const cssRules = hideSelectors.map(selector =>
        `${selector} { display: none !important; }`
    ).join('\n');

    // 评论区相关样式
    const commentStyles = `
        /* 评论区容器相对定位 */
        #comment-lock-container {
            position: relative;
        }

        /* 遮罩层 - 覆盖在评论区上方 */
        #comment-lock-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            z-index: 999;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding-top: 40px;
            align-items: center;
            min-height: 400px;
        }

        /* 解锁按钮 */
        #unlock-comment-btn {
            padding: 16px 32px;
            background: linear-gradient(135deg, #00aeec 0%, #0098D1 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 8px 20px rgba(0, 152, 209, 0.4);
            transition: all 0.3s ease;
        }

        #unlock-comment-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 30px rgba(0, 152, 209, 0.4);
        }

        /* 提示文字 */
        #lock-hint {
            color: #999;
            font-size: 14px;
            margin-top: 20px;
            text-align: center;
        }

        /* 对话框遮罩 */
        #comment-dialog-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.75);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(8px);
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        /* 对话框 */
        #comment-dialog {
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            border-radius: 24px;
            padding: 50px 45px;
            max-width: 520px;
            width: 90%;
            box-shadow: 0 30px 90px rgba(0, 0, 0, 0.25);
            text-align: center;
            position: relative;
            overflow: hidden;
            animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(30px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        #comment-dialog h2 {
            color: #1a1a1a;
            font-size: 22px;
            margin-bottom: 30px;
            font-weight: 600;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
            letter-spacing: 0.5px;
            opacity: 0;
            animation: fadeInText 0.6s ease 0.2s forwards;
        }
        
        @keyframes fadeInText {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        #comment-dialog p {
            color: #666;
            font-size: 15px;
            line-height: 2;
            margin: 12px 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
            opacity: 0;
        }
        
        #comment-dialog p:nth-of-type(1) {
            animation: fadeInText 0.6s ease 0.4s forwards;
        }
        
        #comment-dialog p:nth-of-type(2) {
            animation: fadeInText 0.6s ease 0.6s forwards;
        }

        #comment-dialog p:last-of-type {
            color: #00AEEC;
            font-weight: 600;
            margin-top: 25px;
            font-size: 16px;
            animation: fadeInText 0.6s ease 0.8s forwards;
        }

        /* 倒计时 */
        #countdown {
            font-size: 72px;
            font-weight: 300;
            color: #00AEEC;
            margin: 40px 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            line-height: 1;
            animation: pulse 1s ease infinite;
            text-shadow: 0 2px 10px rgba(0, 174, 236, 0.2);
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.05);
                opacity: 0.9;
            }
        }
        
        #countdown.completed {
            animation: none;
            color: #52c41a;
            font-size: 64px;
        }

        /* 输入区域 */
        #input-area {
            margin-top: 35px;
            opacity: 0.3;
            pointer-events: none;
            transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
            transform: translateY(10px);
        }

        #input-area.unlocked {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
        }

        #reflection-input {
            width: 100%;
            padding: 14px 18px;
            border: 2px solid #e8e8e8;
            border-radius: 12px;
            font-size: 15px;
            box-sizing: border-box;
            transition: all 0.3s ease;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", sans-serif;
            background: #fafafa;
        }

        #reflection-input:focus {
            outline: none;
            border-color: #00AEEC;
            background: white;
            box-shadow: 0 0 0 3px rgba(0, 174, 236, 0.1);
        }

        #confirm-btn {
            margin-top: 18px;
            padding: 14px 36px;
            background: linear-gradient(135deg, #00AEEC 0%, #0098D1 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 174, 236, 0.3);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", sans-serif;
        }

        #confirm-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 174, 236, 0.4);
        }
        
        #confirm-btn:active:not(:disabled) {
            transform: translateY(0);
        }

        #confirm-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        #error-msg {
            color: #ff4d4f;
            font-size: 13px;
            margin-top: 12px;
            min-height: 20px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", sans-serif;
            animation: shake 0.5s ease;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;

    
    // 注入所有 CSS
    GM_addStyle(cssRules + commentStyles);

    console.log('[Bilibili纯粹化] 样式已注入');

    // 评论区锁定功能
    function initCommentLock() {
        const commentApp = document.querySelector('#commentapp');
        if (!commentApp || document.querySelector('#comment-lock-container')) {
            return;
        }

        // 创建遮罩容器
        const container = document.createElement('div');
        container.id = 'comment-lock-container';

        // 创建遮罩层
        const overlay = document.createElement('div');
        overlay.id = 'comment-lock-overlay';
        overlay.innerHTML = `
            <button id="unlock-comment-btn">🔒 解锁评论区</button>
            <div id="lock-hint">在查看评论前，请先思考一下</div>
        `;

        // 以容器包裹评论区
        commentApp.parentNode.insertBefore(container, commentApp);
        container.appendChild(commentApp);
        container.appendChild(overlay);

        // 点击解锁按钮
        const unlockBtn = overlay.querySelector('#unlock-comment-btn');
        unlockBtn.addEventListener('click', showDialog);

        console.log('[Bilibili纯粹化] 评论区锁定已启用');
    }

    function showDialog() {
        // 创建对话框
        const dialogOverlay = document.createElement('div');
        dialogOverlay.id = 'comment-dialog-overlay';

        dialogOverlay.innerHTML = `
            <div id="comment-dialog">
                <h2>请确认你真的想进入这个评论区。</h2>
                <p>保持清醒，不要被平台/媒体操控。</p>
                <p>思考：你现在希望从评论中获得什么？</p>

                <div id="countdown">3</div>

                <div id="input-area">
                    <input type="text" id="reflection-input" placeholder="请输入：我保持思考" />
                    <button id="confirm-btn">确认解锁</button>
                    <div id="error-msg"></div>
                </div>
            </div>
        `;

        document.body.appendChild(dialogOverlay);

        // 倒计时逻辑
        let count = 3;
        const countdownEl = document.getElementById('countdown');
        const inputArea = document.getElementById('input-area');
        const confirmBtn = document.getElementById('confirm-btn');
        const input = document.getElementById('reflection-input');
        const errorMsg = document.getElementById('error-msg');

        const timer = setInterval(() => {
            count--;
            countdownEl.textContent = count;

            if (count === 0) {
                clearInterval(timer);
                countdownEl.textContent = '✓';
                countdownEl.classList.add('completed');
                inputArea.classList.add('unlocked');
                input.focus();
            }
        }, 1000);

        // 确认按钮逻辑
        confirmBtn.addEventListener('click', () => {
            if (input.value.trim() === '我保持思考') {
                // 解锁评论区 - 直接移除遮罩层
                const lockOverlay = document.querySelector('#comment-lock-overlay');
                if (lockOverlay) {
                    lockOverlay.remove();
                }
                dialogOverlay.remove();

                console.log('[Bilibili纯粹化] 评论区已解锁');
            } else {
                errorMsg.textContent = '请输入正确的文字';
                input.style.borderColor = '#e74c3c';

                setTimeout(() => {
                    errorMsg.textContent = '';
                    input.style.borderColor = '#ddd';
                }, 2000);
            }
        });

        // 支持回车键确认
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                confirmBtn.click();
            }
        });

        // 点击遮罩关闭
        dialogOverlay.addEventListener('click', (e) => {
            if (e.target === dialogOverlay) {
                dialogOverlay.remove();
            }
        });
    }

    // 评论区锁定初始化
    function waitForComment() {
        const observer = new MutationObserver(() => {
            const biliComments = document.querySelector('bili-comments')
            if (biliComments && !document.querySelector('#comment-lock-container')) {
                initCommentLock();
            }
        });

        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        } else {
            setTimeout(waitForComment, 100);
        }
    }

    // 只在视频页面启用评论区锁定
    if (window.location.pathname.includes('/video/')) {
        waitForComment();
    }
})();