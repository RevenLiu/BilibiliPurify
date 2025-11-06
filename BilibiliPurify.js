// ==UserScript==
// @name         Bilibili Purify
// @name:zh-CN   Bilibili纯粹化
// @namespace    https://github.com/RevenLiu
// @version      1.2.3
// @description  一个用于Bilibili平台的篡改猴脚本。以一种直接的方式抵抗商业化平台对人类大脑的利用。包含重定向首页、隐藏广告、隐藏推荐视频、评论区反成瘾/情绪控制锁等功能，削弱平台/媒体对你心理的操控，恢复你对自己注意力和思考的主导权。
// @author       RevenLiu
// @license      MIT
// @icon         https://raw.githubusercontent.com/RevenLiu/BilibiliPurify/main/Icon.png
// @homepage     https://github.com/RevenLiu/BilibiliPurify
// @supportURL   https://github.com/RevenLiu/BilibiliPurify/issues 
// @match        https://www.bilibili.com/
// @match        https://www.bilibili.com/?*
// @match        https://www.bilibili.com/*
// @match        https://search.bilibili.com/*
// @match        https://space.bilibili.com/*
// @match        https://message.bilibili.com/*
// @match        https://t.bilibili.com/*
// @match        https://live.bilibili.com/*
// @match        https://link.bilibili.com/*
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
        //视频页右侧广告
        'div.slide-ad-exp',
        //视频页视频推荐列表
        'div.recommend-list-v1',
        //视频页右侧底部广告
        'div.ad-report.ad-floor-exp.right-bottom-banner',
        //视频页活动
        'div.activity-m-v1.act-end',
        //视频页左侧条形广告
        'div.ad-report.strip-ad.left-banner',
        //视频页合集列表 (开启会同时导致分p消失)
        //'div.video-pod.video-pod',
        //热搜
        'div.trending',
        //右上入口栏大会员
        'a.right-entry__outside.right-entry--vip',
        //右上入口栏头像下拉菜单会员中心
        'div.vip-entry-containter',
        //左上入口栏杂项
        'a.default-entry',
        //左上入口栏下载客户端按钮
        'a.download-entry.download-client-trigger',
        //左上入口栏首页下拉菜单
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
        'div.paybar_container__WApBR',
        //剧播放页右侧大会员购买广告
        '#pc-cashier-wrapper-normal',
        'div.paybar_container__WApBR',
        //剧播放页播放器大会员购买广告
        '#pc-cashier-wrapper-video',
        //剧播放页播放器大会员广告弹窗
        'div.bpx-player-toast-wrap',
        //剧播放页播放器试看结束购买引导
        'div.paywall_vipRightWrap__U6Tw3',
        'div.paywall_btnItemWrap__s351D.paywall_bigBtn__6S6pz',
        'div.paywall_rightBox__pFhO_',
        //直播首页顶部播放器
        'div.player-area-ctnr.border-box.p-relative.t-center',
        //直播首页广告/公告/推荐
        'div.grid-col-1.grid-col.v-top.dp-i-block',
        'div.grid-col-3,grid-col,v-top,dp-i-block',
        'div.flip-view p-relative.over-hidden.w-100',
        //直播首页推荐直播
        'div.recommend-area-ctnr',
        'div.area-detail-ctnr.m-auto',
        //直播页左上入口栏
        'div.nav-items-ctnr.dp-i-block.v-middle',
        //直播页左上入口栏更多按钮
        'div.showmore-link.p-relative.f-left',
        //直播页右上入口栏
        'div.shortcuts-ctnr.h-100.f-left',
        //直播页右上入口栏头像菜单
        'div.user-panel.p-relative.border-box.none-select.panel-shadow',
        //直播页横向礼物栏
        'div.gift-panel.base-panel.live-skin-coloration-area.gift-corner-mark-ui',
        //直播页电池立即充值文字
        'div.recharge-ent-info',
        //直播页大航海立即上船文字
        'div.guard-ent-info',
        //直播页超能理事会图标
        'div.left-part-ctnr.vertical-middle.dp-table.section.p-relative.adaptive',
        //直播页横向活动栏
        'div.activity-gather-entry.activity-entry.s-activity-entry',
        'div.rank-entry-play.rank-entries.hot-normal-area',
        'div.gift-planet-entry',
        //直播页观众列表排名图标
        'div.rank',
        //直播页观众列表贡献值
        'div.score.live-skin-normal-text',
        //直播页观众列表送礼引导文字'
        'div.need.live-skin-normal-text.opacity6',
        'div.switch-box',
        //直播页观众列表排行榜按钮
        'div.tab-box',
        //直播页观众列表粉丝勋章
        'div.fans-medal.fans-medal-item',
        //直播页观众列表等级勋章
        'div.wealth-medal.wealth',
        //直播页观众列表大航海头像框
        'div.guard-frame',
        //直播页观众列表榜前三显示
        'div.top3.top3-3',
        'i.rank-icon.rank-icon-1.v-middle',
        'i.rank-icon.rank-icon-2.v-middle',
        'i.rank-icon.rank-icon-3.v-middle',
        'i.top1-rank-icon',
        'i.top2-rank-icon',
        'i.top3-rank-icon',
        //直播页大航海
        'div.item.live-skin-normal-text.dp-i-block.live-skin-separate-border.border-box.t-center.pointer.tab-item.opacity6',
        //直播页粉丝团\大航海购买页购买引导
        'div.right-list.flex.small-right',
        'div.subtitle.m-b-30.text-12.font-bold.lh-14',
        'div.h-54.w-full.flex.items-center',
        'div.right-list.flex',
        //直播页粉丝团\大航海购买页粉丝团成员榜大航海勋章
        'div.rights',
        //直播页粉丝团\大航海购买页粉丝团成员榜排名名次
        'div.rank-icon',
        //直播页粉丝团\大航海购买页舰队权益购买引导
        'div.m-t-16.flex.items-center.justify-center.text-14',
        //直播页粉丝团\大航海购买页舰队权益大航海图标
        'div.m-r-5.h-26.w-26.bg-cover',
        //直播页等级勋章
        'div.wealth-medal-ctnr.fans-medal-item-target.dp-i-block.p-relative.v-middle',
        //直播页粉丝勋章
        'div.fans-medal-item-ctnr.fans-medal-item-target.dp-i-block.p-relative.v-middle',
        //直播页聊天框装扮
        'div.title-label.dp-i-block.p-relative.v-middle',
        //直播页聊天框信息提示/互动引导
        'div.chat-item.common-danmuku-msg.border-box',
        'div.chat-item.convention-msg.border-box',
        'div.chat-item.misc-msg.guard-buy',
        '#combo-card',
        'div.super-gift-item animation',
        'div.welcome-section-bottom',
        //直播页聊天框礼物提示
        'div.content-ctnr.border-box.p-relative',
        'div.base-bubble-wrapper.super-gift-bubbles',
        'div.gift-anim-setting',
        'div.gift-bubble-setting',
        'div.chat-item.gift-item',
        //直播页聊天框SC
        'div.pay-note-setting',
        'div.msg-bubble-setting',
        'div.chat-item.danmaku-item.superChat-card-detail',
        'div.pay-note-panel',
        //直播页主播头像框
        'div.blive-avatar-pendant',
        //直播页播放器顶部移动式横幅广告
        'div.announcement-wrapper.clearfix.no-select',
        //直播页播放器左上小橙车提示
        'div.shop-popover',
        //直播页播放器结束推荐
        'div.web-player-ending-panel-recommendList',
        //直播页播放器上贴纸
        'div.sticker-item',
        //直播页中心横向广告
        'div.flip-view.p-relative.over-hidden.w-100',
        //直播页主播心愿提示
        'div.gift-wish-card-root',
        //直播分区页大型横向广告
        'div.banner-ctn',
        //直播分区页横幅广告
        'div.index_flip-view-image-ctnr_ueRWr.index_ts-dot-4_afXVm',
        'div.index_flip-view-titles_ILDY7'
    ];

    const cssRules = hideSelectors.map(selector =>
        `${selector} {
         display: none !important; 
         }`
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


// 评论区净化功能 - 移除超链接、点赞数、UP主点赞标识、用户装饰
function purifyComments() {
    //console.log('[Bilibili纯粹化-调试] purifyComments 函数被调用');
    
    let processedCount = {
        searchLinks: 0,
        likeCounts: 0,
        upTags: 0,
        userStyles: 0,
        userLevels: 0,
        sailingCards: 0,
        avatarLayers: 0
    };
    
    // 存储所有观察器
    const observers = new Set();
    
    // 处理评论中的搜索关键词超链接
    function processSearchLinks(richText) {
        if (!richText || !richText.shadowRoot) return;
        
        const contents = richText.shadowRoot.querySelector('#contents');
        if (!contents) return;
        
        const searchLinks = contents.querySelectorAll('a[data-type="search"]');
        
        searchLinks.forEach(link => {
            const span = document.createElement('span');
            span.textContent = link.textContent;
            span.className = link.className;
            link.parentNode.replaceChild(span, link);
            //processedCount.searchLinks++;
            
            const img = span.querySelector('img');
            if (img) {
                img.style.display = 'none';
            }
        });
    }
    
    // 隐藏点赞数量
    function hideLikeCount(actionButtons) {
        if (!actionButtons || !actionButtons.shadowRoot) return;
        
        const likeDiv = actionButtons.shadowRoot.querySelector('#like');
        if (!likeDiv) return;
        
        const countSpan = likeDiv.querySelector('button #count');
        if (countSpan) {
            countSpan.style.display = 'none';
            //processedCount.likeCounts++;
        }
    }
    
    // 隐藏UP主点赞标识
    function hideUpLikeTags(mainDiv) {
        if (!mainDiv) return;
        
        const tagsDiv = mainDiv.querySelector('#tags');
        if (tagsDiv) {
            tagsDiv.style.display = 'none';
            //processedCount.upTags++;
        }
    }
    
    // 净化用户信息（移除用户名样式、隐藏等级）
    function purifyUserInfo(userInfo) {
        if (!userInfo || !userInfo.shadowRoot) return;
        
        const infoDiv = userInfo.shadowRoot.querySelector('#info');
        if (!infoDiv) return;
        
        // 移除用户名的 style 属性
        const userNameDiv = infoDiv.querySelector('#user-name');
        if (userNameDiv) {
            const userNameLink = userNameDiv.querySelector('a');
            if (userNameLink && userNameLink.hasAttribute('style')) {
                userNameLink.removeAttribute('style');
                //processedCount.userStyles++;
            }
        }
        
        // 隐藏用户等级
        const userLevelDiv = infoDiv.querySelector('#user-level');
        if (userLevelDiv && userLevelDiv.style.display !== 'none') {
            userLevelDiv.style.display = 'none';
            //processedCount.userLevels++;
        }

        // 隐藏用户勋章
        const userMedalDiv = infoDiv.querySelector('#user-medal');
        if (userMedalDiv && userMedalDiv.style.display !== 'none') {
            userMedalDiv.style.display = 'none';
        }
    }
    
    // 隐藏用户装扮卡片
    function removeSailingCard(header) {
        if (!header) return;
        const sailingCard = header.querySelector('bili-comment-user-sailing-card');
        if (sailingCard) {
            sailingCard.style.display = 'none';
            //processedCount.sailingCards++;
        }
    }
    
    // 隐藏头像装饰层
    function hideAvatarLayers(avatar) {
        if (!avatar || !avatar.shadowRoot) return;
        
        const canvasDiv = avatar.shadowRoot.querySelector('#canvas');
        if (!canvasDiv) return;
        
        // 隐藏 class="layer" 的 div (大会员标志)
        const layers = canvasDiv.querySelectorAll('.layer');
        layers.forEach(layer => {
            if(!layer.classList.contains('center')){
                if (layer.style.display !== 'none') {
                layer.style.display = 'none';
                //processedCount.avatarLayers++;
            }
            }
        });
        
        // 隐藏 class="layer-res" 且没有 style 属性的 div，并隐藏其他layer-res的style (头像框)
        const layerRes = canvasDiv.querySelectorAll('.layer-res');
        layerRes.forEach(res => {
            if (!res.hasAttribute('style') && res.style.display !== 'none') {
                res.style.display = 'none';
                //processedCount.avatarLayers++;
            }
        });

        //另一种头像框 在隐藏头像框的同时统一头像大小 (可能是动态头像框?)
        const layerCenter = canvasDiv.querySelectorAll('.layer.center');
        layerCenter.forEach(layer => {
            if(layer.style.width == '66px'){
                layer.style.display = 'none';
            }else if(layer.style.width !== '48px'){
                layer.style.width = '48px';
                layer.style.height = '48px';
            }
        })

    }
    
    // 处理用户头像
    function processUserAvatar(bodyDiv) {
        if (!bodyDiv) return;
        
        const avatarLink = bodyDiv.querySelector('#user-avatar');
        if (!avatarLink) return;
        
        const avatar = avatarLink.querySelector('bili-avatar');
        if (avatar) {
            hideAvatarLayers(avatar);
            
            // 监听 avatar 的 shadowRoot
            if (avatar.shadowRoot) {
                observeShadowRoot(avatar.shadowRoot, () => {
                    hideAvatarLayers(avatar);
                });
            }
        }
    }
    
    // 为 Shadow Root 设置观察器
    function observeShadowRoot(shadowRoot, callback) {
        if (!shadowRoot) return null;
        
        const observer = new MutationObserver(callback);
        observer.observe(shadowRoot, {
            childList: true,
            subtree: true,
            attributes: true
        });
        
        observers.add(observer);
        return observer;
    }
    
    // 处理单个评论
    function processComment(commentRenderer) {
        if (!commentRenderer || !commentRenderer.shadowRoot) return;
        
        // 监听 commentRenderer 的 shadowRoot
        observeShadowRoot(commentRenderer.shadowRoot, () => {
            const body = commentRenderer.shadowRoot.querySelector('#body');
            if (!body) return;
            
            const main = body.querySelector('#main');
            if (!main) return;
            
            // 处理评论内容
            const content = main.querySelector('#content');
            if (content) {
                const richText = content.querySelector('bili-rich-text');
                processSearchLinks(richText);
                
                // 监听 richText 的 shadowRoot
                if (richText && richText.shadowRoot) {
                    observeShadowRoot(richText.shadowRoot, () => {
                        processSearchLinks(richText);
                    });
                }
            }
            
            // 处理用户信息
            const header = main.querySelector('#header');
            if (header) {
                const userInfo = header.querySelector('bili-comment-user-info');
                if (userInfo) {
                    purifyUserInfo(userInfo);
                    removeSailingCard(header);
                    
                    // 监听 userInfo 的 shadowRoot
                    if (userInfo.shadowRoot) {
                        observeShadowRoot(userInfo.shadowRoot, () => {
                            purifyUserInfo(userInfo);
                        });
                    }
                }
            }
            
            // 处理用户头像
            processUserAvatar(body);
            
            const footer = main.querySelector('#footer');
            if (footer) {
                const actionButtons = footer.querySelector('bili-comment-action-buttons-renderer');
                hideLikeCount(actionButtons);
                
                // 监听 actionButtons 的 shadowRoot
                if (actionButtons && actionButtons.shadowRoot) {
                    observeShadowRoot(actionButtons.shadowRoot, () => {
                        hideLikeCount(actionButtons);
                    });
                }
            }
            
            hideUpLikeTags(main);
        });
        
        // 立即执行一次处理
        const body = commentRenderer.shadowRoot.querySelector('#body');
        if (!body) return;
        
        const main = body.querySelector('#main');
        if (!main) return;
        
        const content = main.querySelector('#content');
        if (content) {
            const richText = content.querySelector('bili-rich-text');
            processSearchLinks(richText);
            
            if (richText && richText.shadowRoot) {
                observeShadowRoot(richText.shadowRoot, () => {
                    processSearchLinks(richText);
                });
            }
        }
        
        const header = main.querySelector('#header');
        if (header) {
            const userInfo = header.querySelector('bili-comment-user-info');
            if (userInfo) {
                purifyUserInfo(userInfo);
                removeSailingCard(header);
                
                if (userInfo.shadowRoot) {
                    observeShadowRoot(userInfo.shadowRoot, () => {
                        purifyUserInfo(userInfo);
                    });
                }
            }
        }
        
        processUserAvatar(body);
        
        const footer = main.querySelector('#footer');
        if (footer) {
            const actionButtons = footer.querySelector('bili-comment-action-buttons-renderer');
            hideLikeCount(actionButtons);
            
            if (actionButtons && actionButtons.shadowRoot) {
                observeShadowRoot(actionButtons.shadowRoot, () => {
                    hideLikeCount(actionButtons);
                });
            }
        }
        
        hideUpLikeTags(main);
    }
    
    // 处理楼中楼回复
    function processReplies(repliesRenderer) {
        if (!repliesRenderer || !repliesRenderer.shadowRoot) return;
        
        // 监听 repliesRenderer 的 shadowRoot
        observeShadowRoot(repliesRenderer.shadowRoot, () => {
            const expander = repliesRenderer.shadowRoot.querySelector('#expander');
            if (!expander) return;
            
            const expanderContents = expander.querySelector('#expander-contents');
            if (!expanderContents) return;
            
            const replyRenderers = expanderContents.querySelectorAll('bili-comment-reply-renderer');
            
            replyRenderers.forEach(replyRenderer => {
                if (!replyRenderer.shadowRoot) return;
                
                // 监听每个 replyRenderer 的 shadowRoot
                observeShadowRoot(replyRenderer.shadowRoot, () => {
                    const body = replyRenderer.shadowRoot.querySelector('#body');
                    if (!body) return;
                    
                    const main = body.querySelector('#main');
                    if (!main) return;
                    
                    const richText = main.querySelector('bili-rich-text');
                    processSearchLinks(richText);
                    
                    if (richText && richText.shadowRoot) {
                        observeShadowRoot(richText.shadowRoot, () => {
                            processSearchLinks(richText);
                        });
                    }
                    
                    // 处理楼中楼的用户信息
                    const userInfo = main.querySelector('bili-comment-user-info');
                    if (userInfo) {
                        purifyUserInfo(userInfo);
                        
                        if (userInfo.shadowRoot) {
                            observeShadowRoot(userInfo.shadowRoot, () => {
                                purifyUserInfo(userInfo);
                            });
                        }
                    }
                    
                    const footer = body.querySelector('#footer');
                    if (footer) {
                        const actionButtons = footer.querySelector('bili-comment-action-buttons-renderer');
                        hideLikeCount(actionButtons);
                        
                        if (actionButtons && actionButtons.shadowRoot) {
                            observeShadowRoot(actionButtons.shadowRoot, () => {
                                hideLikeCount(actionButtons);
                            });
                        }
                    }
                });
                
                // 立即执行一次处理
                const body = replyRenderer.shadowRoot.querySelector('#body');
                if (!body) return;
                
                const main = body.querySelector('#main');
                if (!main) return;
                
                const richText = main.querySelector('bili-rich-text');
                processSearchLinks(richText);
                
                if (richText && richText.shadowRoot) {
                    observeShadowRoot(richText.shadowRoot, () => {
                        processSearchLinks(richText);
                    });
                }
                
                const userInfo = main.querySelector('bili-comment-user-info');
                if (userInfo) {
                    purifyUserInfo(userInfo);
                    
                    if (userInfo.shadowRoot) {
                        observeShadowRoot(userInfo.shadowRoot, () => {
                            purifyUserInfo(userInfo);
                        });
                    }
                }
                
                const footer = body.querySelector('#footer');
                if (footer) {
                    const actionButtons = footer.querySelector('bili-comment-action-buttons-renderer');
                    hideLikeCount(actionButtons);
                    
                    if (actionButtons && actionButtons.shadowRoot) {
                        observeShadowRoot(actionButtons.shadowRoot, () => {
                            hideLikeCount(actionButtons);
                        });
                    }
                }
            });
        });
        
        // 立即执行一次处理
        const expander = repliesRenderer.shadowRoot.querySelector('#expander');
        if (!expander) return;
        
        const expanderContents = expander.querySelector('#expander-contents');
        if (!expanderContents) return;
        
        const replyRenderers = expanderContents.querySelectorAll('bili-comment-reply-renderer');
        
        replyRenderers.forEach(replyRenderer => {
            if (!replyRenderer.shadowRoot) return;
            
            observeShadowRoot(replyRenderer.shadowRoot, () => {
                const body = replyRenderer.shadowRoot.querySelector('#body');
                if (!body) return;
                
                const main = body.querySelector('#main');
                if (!main) return;
                
                const richText = main.querySelector('bili-rich-text');
                processSearchLinks(richText);
                
                if (richText && richText.shadowRoot) {
                    observeShadowRoot(richText.shadowRoot, () => {
                        processSearchLinks(richText);
                    });
                }
                
                const userInfo = main.querySelector('bili-comment-user-info');
                if (userInfo) {
                    purifyUserInfo(userInfo);
                    
                    if (userInfo.shadowRoot) {
                        observeShadowRoot(userInfo.shadowRoot, () => {
                            purifyUserInfo(userInfo);
                        });
                    }
                }
                
                const footer = body.querySelector('#footer');
                if (footer) {
                    const actionButtons = footer.querySelector('bili-comment-action-buttons-renderer');
                    hideLikeCount(actionButtons);
                    
                    if (actionButtons && actionButtons.shadowRoot) {
                        observeShadowRoot(actionButtons.shadowRoot, () => {
                            hideLikeCount(actionButtons);
                        });
                    }
                }
            });
            
            const body = replyRenderer.shadowRoot.querySelector('#body');
            if (!body) return;
            
            const main = body.querySelector('#main');
            if (!main) return;
            
            const richText = main.querySelector('bili-rich-text');
            processSearchLinks(richText);
            
            if (richText && richText.shadowRoot) {
                observeShadowRoot(richText.shadowRoot, () => {
                    processSearchLinks(richText);
                });
            }
            
            const userInfo = main.querySelector('bili-comment-user-info');
            if (userInfo) {
                purifyUserInfo(userInfo);
                
                if (userInfo.shadowRoot) {
                    observeShadowRoot(userInfo.shadowRoot, () => {
                        purifyUserInfo(userInfo);
                    });
                }
            }
            
            const footer = body.querySelector('#footer');
            if (footer) {
                const actionButtons = footer.querySelector('bili-comment-action-buttons-renderer');
                hideLikeCount(actionButtons);
                
                if (actionButtons && actionButtons.shadowRoot) {
                    observeShadowRoot(actionButtons.shadowRoot, () => {
                        hideLikeCount(actionButtons);
                    });
                }
            }
        });
    }
    
    // 处理所有评论线程
    function processAllComments() {
        const biliComments = document.querySelector('bili-comments');
        if (!biliComments || !biliComments.shadowRoot) return false;
        
        const contents = biliComments.shadowRoot.querySelector('#contents');
        if (!contents) return false;
        
        const feed = contents.querySelector('#feed');
        if (!feed) return false;
        
        const threads = feed.querySelectorAll('bili-comment-thread-renderer');
        
        threads.forEach((thread, index) => {
            if (!thread.shadowRoot) return;
            
            // 监听每个 thread 的 shadowRoot
            observeShadowRoot(thread.shadowRoot, () => {
                const commentRenderer = thread.shadowRoot.querySelector('bili-comment-renderer');
                if (commentRenderer) {
                    processComment(commentRenderer);
                }
                
                const replies = thread.shadowRoot.querySelector('#replies');
                if (replies) {
                    const repliesRenderer = replies.querySelector('bili-comment-replies-renderer');
                    if (repliesRenderer) {
                        processReplies(repliesRenderer);
                    }
                }
            });
            
            // 立即执行一次处理
            const commentRenderer = thread.shadowRoot.querySelector('bili-comment-renderer');
            if (commentRenderer) {
                processComment(commentRenderer);
            }
            
            const replies = thread.shadowRoot.querySelector('#replies');
            if (replies) {
                const repliesRenderer = replies.querySelector('bili-comment-replies-renderer');
                if (repliesRenderer) {
                    processReplies(repliesRenderer);
                }
            }
        });
        
        // if (processedCount.searchLinks > 0 || processedCount.likeCounts > 0 || processedCount.upTags > 0 || 
        //     processedCount.userStyles > 0 || processedCount.userLevels > 0 || processedCount.sailingCards > 0 || 
        //     processedCount.avatarLayers > 0) {
        //     console.log(`[Bilibili纯粹化-调试] 本次处理完成 - 搜索链接: ${processedCount.searchLinks}, 点赞数: ${processedCount.likeCounts}, UP标识: ${processedCount.upTags}, 用户名样式: ${processedCount.userStyles}, 用户等级: ${processedCount.userLevels}, 装扮卡片: ${processedCount.sailingCards}, 头像装饰: ${processedCount.avatarLayers}`);
        // }
        
        // processedCount = {
        //     searchLinks: 0,
        //     likeCounts: 0,
        //     upTags: 0,
        //     userStyles: 0,
        //     userLevels: 0,
        //     sailingCards: 0,
        //     avatarLayers: 0
        // };
        
        return true;
    }
    
    // 监听评论区变化
    function observeComments(retryCount = 0) {
        const maxRetries = 20;
        
        const biliComments = document.querySelector('bili-comments');
        if (!biliComments) {
            if (retryCount < maxRetries) {
                setTimeout(() => observeComments(retryCount + 1), 500);
            }
            return;
        }
        
        if (!biliComments.shadowRoot) {
            if (retryCount < maxRetries) {
                setTimeout(() => observeComments(retryCount + 1), 500);
            }
            return;
        }
        
        // 监听 biliComments 的 shadowRoot
        observeShadowRoot(biliComments.shadowRoot, () => {
            processAllComments();
        });
        
        function waitForContents(contentRetryCount = 0) {
            const maxContentRetries = 20;
            
            const contents = biliComments.shadowRoot.querySelector('#contents');
            if (!contents) {
                if (contentRetryCount < maxContentRetries) {
                    setTimeout(() => waitForContents(contentRetryCount + 1), 500);
                }
                return;
            }
            
            // 监听 contents
            observeShadowRoot(contents, () => {
                processAllComments();
            });
            
            function waitForFeed(feedRetryCount = 0) {
                const maxFeedRetries = 20;
                
                const feed = contents.querySelector('#feed');
                if (!feed) {
                    if (feedRetryCount < maxFeedRetries) {
                        setTimeout(() => waitForFeed(feedRetryCount + 1), 500);
                    }
                    return;
                }
                
                //console.log('[Bilibili纯粹化-调试] #feed 已找到,开始初始处理和监听');
                
                // 监听 feed
                observeShadowRoot(feed, () => {
                    processAllComments();
                });
                
                // 初始处理
                processAllComments();
                
                console.log('[Bilibili纯粹化] 评论区净化功能已启用');
            }
            
            waitForFeed();
        }
        
        waitForContents();
    }
    
    observeComments();
}


    // 评论区锁定功能
    function initCommentLock(pageType) {
        var commentApp;
        switch (pageType) {
            case "video":
                commentApp = document.querySelector('#commentapp');
                break;
            case "bangumi":
                commentApp = document.querySelector('#comment-body');
                break;
            default:
                return;
        }
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
                    <input type="text" autocomplete="off" id="reflection-input" placeholder="请输入：我保持思考" />
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
    function waitForComment(pageType) {
        const observer = new MutationObserver(() => {
            const biliComments = document.querySelector('bili-comments')
            if (biliComments && !document.querySelector('#comment-lock-container')) {
                initCommentLock(pageType);
            }
        });

        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        } else {
            setTimeout(() => waitForComment(pageType), 100);
        }
    }

    //取消自动连播
    function autoContinuousOff(){
        let hasClicked = false; // 防止重复点击

        const observer = new MutationObserver(() => {
            // 查找自动连播容器
            const continuousBtn = document.querySelector('.continuous-btn');

            if (continuousBtn) {
                // 查找开启状态的按钮
                const switchBtnOn = continuousBtn.querySelector('.switch-btn.on');

                if (switchBtnOn && !hasClicked) {
                    hasClicked = true;
                    switchBtnOn.click();
                    console.log('[Bilibili纯粹化] 尝试关闭自动连播');

                    // 等待 500ms 后检查是否真的关闭了
                    setTimeout(() => {
                        const checkBtn = document.querySelector('.continuous-btn .switch-btn');
                        if (checkBtn && !checkBtn.classList.contains('on')) {
                            console.log('[Bilibili纯粹化] 自动连播已关闭');
                            observer.disconnect();
                        } else {
                            console.log('[Bilibili纯粹化] 自动连播关闭失败，继续尝试');
                            hasClicked = false; // 允许再次点击
                        }
                    }, 500);
                } else {
                    // 检查是否已经是关闭状态
                    const switchBtn = continuousBtn.querySelector('.switch-btn');
                    if (switchBtn && !switchBtn.classList.contains('on')) {
                        console.log('[Bilibili纯粹化] 已经是关闭状态');
                        observer.disconnect();
                    }
                }
            }
        });

        // 开始监听 DOM 变化
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });

        // 10秒后停止检查
        setTimeout(() => observer.disconnect(), 10000);
    }

    // 视频页相关功能
    if (window.location.pathname.includes('/video/')) {
        //评论区锁定
        waitForComment("video");
        //关闭自动连播
        autoContinuousOff();
        //评论区净化
        purifyComments();
    }

    //剧播放页相关功能
    if (window.location.pathname.includes('/bangumi/')) {
        //评论区锁定
        waitForComment("bangumi");
        //评论区净化
        purifyComments();
    }

    
    // 直播间聊天框彩色背景/彩色名字移除功能
    function removeChatBubbleColors() {
        // 查找所有带彩色背景的聊天项
        const colorfulChats = document.querySelectorAll('.chat-item.danmaku-item.has-bubble');
        
        colorfulChats.forEach(chat => {
            // 移除 style 属性以去掉背景颜色
            if (chat.hasAttribute('style')) {
                chat.removeAttribute('style');
            }
            //移除用户名字颜色
            const userNameSpan = chat.querySelector('.user-name');
            userNameSpan.setAttribute('style', '');
        });
    }

    // 监听直播间聊天框的动态变化
    function initLiveChatObserver() {
        // 等待聊天框容器加载
        const checkChatContainer = setInterval(() => {
            const chatContainer = document.querySelector('#chat-items');
            
            if (chatContainer) {
                clearInterval(checkChatContainer);
                
                // 处理已存在的彩色聊天
                removeChatBubbleColors();
                
                // 监听新增的聊天消息
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.addedNodes.length > 0) {
                            removeChatBubbleColors();
                        }
                    });
                });
                
                observer.observe(chatContainer, {
                    childList: true,
                    subtree: true
                });
                
                console.log('[Bilibili纯粹化] 直播间彩色聊天背景移除已启用');
            }
        }, 500);
        
        // 10秒后停止检查（避免无限循环）
        setTimeout(() => clearInterval(checkChatContainer), 10000);
    }

    // 直播页启用聊天框背景移除
    if (window.location.hostname === 'live.bilibili.com') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initLiveChatObserver);
        } else {
            initLiveChatObserver();
        }
    }


    //直播间首页播放器删除
    function removeVideoOnly() {
        const observer = new MutationObserver(() => {
            const playerCtnr = document.querySelector('.player-ctnr.p-relative.over-hidden.dp-i-block.v-top.t-left');
         if (playerCtnr) {
              const video = playerCtnr.querySelector('video');
             if (video) {
                 video.remove();
                    console.log('[Bilibili纯粹化] 已删除 video');
                    observer.disconnect(); // 删除后停止监控
            }
        }
    });
    
     observer.observe(document.documentElement, {
          childList: true,
          subtree: true
    });
    }

    if (window.location.hostname === 'live.bilibili.com' && 
       window.location.pathname === '/') {
       removeVideoOnly();
    }

    // 直播分区页横幅样式修改
    function modifyBannerClass() {
        const observer = new MutationObserver(() => {
            const banners = document.querySelectorAll('div.index_flip-view_R276P.index_banner_bPw9q');
            
            banners.forEach(banner => {
                // 检查是否已经添加了目标 class
                if (!banner.classList.contains('index_no_pic_TF1Ph') || 
                    !banner.classList.contains('bg-bright-filter')) {
                    banner.className = 'index_flip-view_R276P index_banner_bPw9q index_no_pic_TF1Ph bg-bright-filter';
                    console.log('[Bilibili纯粹化] 已修改横幅 class');
                }
            });
        });
        
        // 开始监听
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });
        
        console.log('[Bilibili纯粹化] 直播横幅样式修改已启用');
    }

    // 在直播分区页面启用横幅样式修改
    if (window.location.hostname === 'live.bilibili.com'  &&  
        (window.location.pathname.includes('/p/')   ||
        //谁设计的这分区规范？？？
        //英雄联盟分区
         window.location.pathname.includes('/lol/') ||
        //吃鸡行动分区
         window.location.pathname.includes('/area/'))) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', modifyBannerClass);
        } else {
            modifyBannerClass();
        }
    }

    // 搜索框推荐关键字修改
    function modifySearchInput() {
        // 配置：
        const searchConfig = {
            //包含<input>的div
            containerClasses: [
                'nav-search-content',
                'search-input-wrap.flex_between',
                'p-relative.search-bar.over-hidden.border-box.t-nowrap'
            ],
            placeholder: '输入关键字搜索',
            removeTitle: true
        };

        // 构建选择器字符串
        const selectors = searchConfig.containerClasses.map(cls => {
            const selector = cls.split('.').join('.');
            return `.${selector} input`;
        }).join(', ');

        const observer = new MutationObserver(() => {
            const inputs = document.querySelectorAll(selectors);
            
            inputs.forEach(input => {
                // 修改 placeholder
                if (input.placeholder !== searchConfig.placeholder) {
                    input.placeholder = searchConfig.placeholder;
                    console.log('[Bilibili纯粹化] 已修改搜索框 placeholder');
                }
                
                // 删除 title 属性
                if (searchConfig.removeTitle && input.hasAttribute('title')) {
                    input.removeAttribute('title');
                    console.log('[Bilibili纯粹化] 已删除搜索框 title 属性');
                }
            });
        });
        
        // 开始监听
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['placeholder', 'title']
        });
        
        console.log('[Bilibili纯粹化] 搜索框修改功能已启用');
    }

    // 启用搜索框推荐关键字修改功能
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', modifySearchInput);
    } else {
        modifySearchInput();
    }
})();