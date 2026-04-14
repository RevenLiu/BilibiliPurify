// ==UserScript==
// @name         Bilibili Purify
// @name:zh-CN   Bilibili纯粹化
// @namespace    https://github.com/RevenLiu
// @version      2.0.0
// @description  一个用于Bilibili平台的篡改猴脚本。以一种直接的方式抵抗商业化平台对人类大脑的利用。包含重定向首页、隐藏广告、隐藏推荐视频、隐藏评论区等功能，削弱平台/媒体对你心理的操控，恢复你对自己注意力和思考的主导权。
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
// @match        https://account.bilibili.com/*
// @match        https://passport.bilibili.com/*
// @match        https://pay.bilibili.com/*
// @match        https://music.bilibili.com/*
// @match        https://member.bilibili.com/*
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @connect      www.bilibili.com
// @connect      live.bilibili.com
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 首页重定向逻辑
    if (window.location.hostname === 'www.bilibili.com' && window.location.pathname === '/') {
        window.location.replace('https://search.bilibili.com/');
        return;
    }

    // 热度榜页重定向逻辑
    if (window.location.hostname === 'www.bilibili.com' && window.location.pathname.includes("/popular/")) {
        window.location.replace('https://search.bilibili.com/');
        return;
    }

    // 使用 CSS 隐藏元素
    const hideSelectors = [
        // ===== v2.0.0 =====

        //信封红点
        'div.red-num--message',
        //视频页评论区
        '#commentapp',
        //番剧页评论区
        '#comment-body',
        //番剧放映室评论区
        '#comment_module',
        //专栏评论区
        '#comment-wrapper',
        //音频页评论区
        '#song-comment',

        //小黑屋评论区
        'div.comment-wrap',
        //小黑屋列表评论条数文字
        'p.comment',

        //文章内部评论区
        'div.bili-tabs.opus-tabs',
        'div.bili-tabs__content',
        'div.bili-tabs.dyn-tabs',
        //文章内部评论按钮
        'div.side-toolbar__action.comment',
        //文章内部交互数值信息
        'div.side-toolbar__action__text',
        //文章内部作者编号装扮
        'div.opus-module-author__decorate',
        //文章内作者头像框
        'div[class="b-avatar__layer center"][data-layer-tag="PENDENT_LAYER"]',

        //顶部栏回复、点赞、@按钮
        'a[href$="reply"]',
        'a[href$="love"]',
        'a[href$="at"]',
        //顶部栏等级图标
        'div.vip-item',
        //老顶部栏个人头像对话框粉丝显示
        'a.count-item[href$="fans"]',
        //老顶部栏个人头像对话框等级
        'div.level-content',

        //各类视频条底部按钮
        'div.bili-dyn-item__action',
        //视频页交互数值信息
        'span.video-like-info.video-toolbar-item-text',
        'span.video-coin-info.video-toolbar-item-text',
        'span.video-fav-info.video-toolbar-item-text',
        'span.video-share-info.video-toolbar-item-text',
        'div.video-share-info.video-toolbar-item-text',
        //视频页正在观看人数文字
        //视频页已装填弹幕文字
        'div.bpx-player-video-info',
        //视频页up主社交数值显示
        'p.social',
        //视频页up主会员图标
        'span.user-label',
        //视频页up主认证图标
        'img.official-icon',
        //视频页up主头像框
        'div.bili-avatar-pendent-dom',
        //视频页up主头像直播显示
        'div.live-mask',
        'div.live-cycle',
        //视频页面笔记点赞量
        'div.note-like',
        //视频页面笔记用户等级图标
        'div.up-level-icon.svg-icon',
        'div.up-level.svg-icon',
        //视频页面笔记详情用户粉丝量
        'div.up-fans',
        //视频页面笔记详情交互数据显示
        'span.tab-num',
        //稍后再看播放页列表播放数
        'div.views',
        //视频页播放量显示
        'div.view.item',
        //视频页弹幕量显示
        'div.dm.item',
        //视频页充电popup人数显示
        'div.count-people',
        //视频页列表/合集总播放量
        'div.total-view',
        //视频页老粉图标
        'div.triple-oldfan-entry',
        //视频页平台认证文字
        'div.official-wrapper',

        //直播页看过和点赞数
        'div[class="icon-ctnr live-skin-normal-a-text"]',
        'div[class="icon-ctnr live-skin-normal-a-text not-hover"]',
        //直播页人数列表
        'div.rank-list-section',
        //直播页大航海popup人数显示
        'div[class="total flex"]',
        //直播页人员进入提示
        '#brush-prompt',
        //直播分区列表眼睛数值
        'div[class*="Item_watched_wrap"]',
        'div[class*="Item_onlineCount"]',
        //直播页chat房管图标
        'div.admin-icon.dp-i-block.p-relative.v-middle',
        //直播页抽奖popup
        'div.lottery-user-container',
        //直播页up主认证图标
        'div.blive-avatar-icons',
        'div.blive-avatar-icon',

        //动态页视频播发量弹幕量显示
        'div.bili-dyn-card-video__stat__item',
        //动态页自身粉丝数量显示
        'a.bili-dyn-my-info__stat__item[href$="fans/fans"]',
        //动态页自身等级图标
        'div.info__icon',
        //动态页他人社交数据
        'div.bili-user-profile-view__info__stats',
        //动态页他人大会员图标
        'div.bili-user-profile-view__info__level',
        'div.bili-user-profile-view__info__viplabel',
        //动态页他人头像认证图标
        'span.bili-user-profile-view__avatar__icon',
        'i.officialverify--0',
        'i.officialverify--1',
        //动态页认证文字
        'div.bili-user-profile-view__info__officialverify',
        //动态页话题社交数据
        'div.bili-topic-item__cloud__desc',
        
        //搜索页视频播放量弹幕量显示
        'span.bili-video-card__stats--item',
        //搜索页番剧评分
        'div.score.media-card-content-footer-score',
        //搜索页直播眼睛数值
        'div.bili-live-card__stats--item',
        //搜索页等级图标
        'svg.level-icon',
        //搜索页账号验证图标
        'span.bili-avatar-icon.bili-avatar-right-icon',
        //搜索页游戏/课程/活动广告
        'div.activity-game-list.i_wrapper.search-all-list',


        //番剧页评分及数值信息
        'div.media-info-datas',
        //番剧页承包榜
        'div.media-sponsor-wrapper.clearfix',
        //番剧页点评
        'div.bangumi-media',
        //番剧播放页评分
        'div.mediainfo_mediaRating__C5uvV',
        //番剧播放页数值信息
        'div.mediainfo_mediaDesc__jjRiB[style="margin-bottom:12px"]',
        //番剧放映厅数值显示
        'div.media-count',
        //番剧放映厅顶部栏广告
        'a[href$="/relation/fans"]',
        'div.loc-mc-box',

        //个人主页导航栏
        "a.active.router-link-exact-active.nav-statistics__item.jumpable",
        "div.nav-statistics__item",
        //个人主页 关注者社交数据
        "#follow",
        "#fans",
        //个人主页等级图标 (视频页up主等级图标)
        "a.level",
        //个人主页大会员图标
        "div.vip",
        //个人空间头像直播状态
        'a.live-ani',
        //个人主页粉丝勋章
        "div.fans-medal",
        //个人主页充电数
        "div.elec-status__count",
        //个人主页游戏
        'div.game-section',
        //个人主页动态编号装扮
        'div.bili-dyn-item__ornament',
        //个人主页头像大会员图标
        'div[class="b-avatar__layer"]',
        //个人空间右侧平台认证
        'div.auth-section',
        //个人主页最近点赞视频列表
        'div.like-section',
        //个人主页最近投币视频列表
        'div.coin-section',
        //个人空间右侧视频预约人数
        '#app > main > div.space-home > div.aside > div:nth-child(3) > div > div.aside-card__content > div > div.subscribe-section-warp > div > div.subscribe-item-subtitle > div',


        //私信页头像认证图标
        'div[class="bili-avatar__layer"]',

        //专栏内部悬浮工具栏数值显示
        "span.toolbar-item__num",
        //专栏内部粉丝数
        'span.fans',
        'span.fans-num',
        //专栏内部文章数
        'span.view',
        'span.view-num',
        //专栏页专栏数据显示
        'div.article-item__stats',
        //专栏内部作者等级
        'span.level',
        //专栏内部作者勋章
        'div.nameplate-holder',
        //专栏文集页面社交数据
        'div.view',
        'div[class="like"]',
        'div.reply',
        //专栏文集页面作者勋章图标
        'img.nameplate',

        //音频页播放量
        'div.song-play-num',
        //音频页收听/关注显示
        'div.follow-num.clearfix',
        //音频页按钮数据显示
        'span.song-share > div',

        //游戏赛事详情页评论区
        'div.match-comment-wrap',

        //话题页社交数据
        'div.action-module',
        'div.topic-title.title-gap > span',
        //话题页活动广告
        'div.active-card',

        //迷你评论区/点赞文字 (包括动态页，话题页等)
        'div.bili-dyn-item__interaction',
        
        // =====           =====

        //左上入口栏广告
        'li.v-popover-wrap.left-loc-entry',
        //视频页右侧小广告
        'div.video-card-ad-small',
        //视频页右侧广告
        'div.slide-ad-exp',
        //视频页视频推荐列表
        'div.recommend-list-v1',
        //列表视频页推荐列表
        'div.recommend-list-container',
        //视频页右侧底部广告
        'div.ad-report.ad-floor-exp.right-bottom-banner',
        //视频页荣誉标识
        'a.honor.item',
        //视频页活动
        'div.activity-m-v1.act-end',
        //视频页左侧条形广告
        'div.ad-report.strip-ad.left-banner',
        //视频页合集列表 (开启会同时导致分p消失)
        //'div.video-pod.video-pod',
        //视频页播放器下方条形广告
        'div.activity-m-v1.act-now',
        //视频页音乐标签点击后视频推荐列表
        'div._pcDetailCardList_0f3be_6',
        //热搜
        'div.trending',
        //搜索页封面播放器
        'div.v-inline-player',
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
        //关注引导 (视频内)
        'div.bpx-player-top-left-follow',
        //三连引导 (视频内)
        'div.bili-danmaku-x-guide.bili-danmaku-x-show',
        //投票弹幕 (视频内)
        'div.bili-danmaku-x-vote.bili-danmaku-x-show',
        //互动引导 (视频内)
        'div.bili-danmaku-x-guide-all.bili-danmaku-x-guide.bili-danmaku-x-show',
        //关联视频 (视频内)
        'div.bili-danmaku-x-link.bili-danmaku-x-show',
        //评分弹幕及小图片 (视频内)
        'div.bili-danmaku-x-score.bili-danmaku-x-show',
        'div.bili-danmaku-x-cmd-shrink.bili-danmaku-x-show',
        //流畅度反馈弹窗 (视频内)
        'div.bpx-player-qoeFeedback.bpx-player-qoeFeedback-score',
        //动态页面热搜
        'div.bili-dyn-search-trendings',
        //剧播放页推荐列表
        'div.recommend_wrap__PccwM',
        //剧播放页大会员广告
        'div.paybar_container__WApBR',
        //剧播放页右侧大会员购买广告
        '#pc-cashier-wrapper-normal',
        '#pc-cashier-wrapper-wide',
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
        'div.medal',
        'div.fans-equity',
        'div.m-b-50.m-t-30.h-22.flex.flex-row.items-center.border-rd-11.p-l-4.p-r-6',
        'div.relation-rights-wrapper.relative.m-auto.box-border.max-w-423.border-rd-12.bg-white.p-12.p-t-20.relative.z-2.m-b-10',
        'div.guard-bonus-wrapper.m-auto.m-b-12.box-border.max-w-423.border-rd-12.bg-white.p-12.p-t-20',
        'div.platform-rights-wrapper.m-auto.box-border.max-w-423.border-rd-12.bg-white.p-12.p-b-0.p-t-20',
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
        //直播页抽奖提示
        'div.participation-box.bg-100.lottery-start',
        'div.participation-box.bg-100.lottery-end',
        //直播页播放器结束推荐
        'div.web-player-ending-panel-recommendList',
        //直播页播放器上贴纸
        'div.sticker-item',
        //直播页弹幕图标
        'img.bili-danmaku-x-icon',
        //直播页弹幕连击
        'div.combo-danmaku',
        //直播页中心横向广告
        'div.flip-view.p-relative.over-hidden.w-100',
        //直播页主播心愿提示
        'div.gift-wish-card-root',
        //直播页互动指令窗口
        '#game-id',
        //观赛直播页轮播广告
        'div._root_bhaoj_2',
        //直播分区页大型横向广告
        'div.banner-ctn',
        //直播分区页横幅广告
        'div.index_flip-view-image-ctnr_ueRWr.index_ts-dot-4_afXVm',
        'div.index_flip-view-titles_ILDY7',
        //直播站点粉丝勋章页面顶部导航栏
        'div.mini-vip.van-popover__reference',
        'a.link.download-client-trigger.van-popover__reference',
        '[href="//manga.bilibili.com?from=bill_top_mnav"]',
        '[href="//www.bilibili.com/match/home/"]',
        '[href="//show.bilibili.com/platform/home.html?msource=pc_web"]',
        '[href="//live.bilibili.com"]',
        '[href="https://game.bilibili.com/platform/"]',
        '[href="//www.bilibili.com/anime/"]',
        'div.channel-menu-mini',
        'svg.navbar_pullup',
        //直播页PK
        'div.universal-pk-box'
    ];

    const cssRules = hideSelectors.map(selector =>
        `${selector} {
         display: none !important; 
         }`
    ).join('\n');

    // 相关样式
    const Styles = `
        :root {
            --bili-purify-bg: #ffffff;
            --bili-purify-bg-gradient: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            --bili-purify-text-main: #1a1a1a;
            --bili-purify-text-sub: #666666;
            --bili-purify-text-hint: #999999;
            --bili-purify-input-bg: #fafafa;
            --bili-purify-input-border: #e8e8e8;
            --bili-purify-overlay: rgba(255, 255, 255, 0.95);
            --bili-purify-dialog-shadow: rgba(0, 0, 0, 0.15);
            --bili-purify-toggle-label: #61666d;
        }

        [data-theme='dark'] {
            --bili-purify-bg: #18191c;
            --bili-purify-bg-gradient: linear-gradient(135deg, #2d2e32 0%, #18191c 100%);
            --bili-purify-text-main: #e7e9ed;
            --bili-purify-text-sub: #9499a0;
            --bili-purify-text-hint: #757a81;
            --bili-purify-input-bg: #2d2e32; /* 确保深色模式下输入框也是深色 */
            --bili-purify-input-border: #3d3e42;
            --bili-purify-overlay: rgba(24, 25, 28, 0.95);
            --bili-purify-dialog-shadow: rgba(0, 0, 0, 0.5);
            --bili-purify-toggle-label: #9499a0;
        }

        /* 搜索页视频封面遮罩层 */
        .search-cover__mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.01);
            /* ↓修改这个来调节模糊度↓ */
            backdrop-filter: blur(10px);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2;
            transition: opacity 0.2s;
            will-change: transform;
        }

        /* 搜索页视频封面显示按钮 */
        .search-cover__button {
            padding: 8px 16px;
            background: #00aeec;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            opacity: 0;
            transition: opacity 0.2s, background 0.2s;
            pointer-events: auto;
        }

        .search-cover__button.visible {
            opacity: 1;
        }

        .search-cover__button.mouse-in {
            background: #40c5f1;
        }
        
        /* 封面模糊切换按钮样式 */
        .blur-toggle-container {
            display: flex;
            align-items: center;
            margin-left: auto;
            padding: 0 16px;
        }

        .blur-toggle-button {
            display: flex;
            align-items: center;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 6px 12px;
            border-radius: 20px;
            transition: background-color 0.2s ease;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
        }

        .blur-toggle-button:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }

        .blur-toggle-inner {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .blur-toggle-label {
            font-size: 14px;
            color: var(--bili-purify-toggle-label) !important;
            user-select: none;
        }

        .blur-toggle-switch {
            position: relative;
            width: 40px;
            height: 22px;
            background-color: #c9ccd0;
            border-radius: 11px;
            transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .blur-toggle-switch::after {
            content: '';
            position: absolute;
            top: 2px;
            left: 2px;
            width: 18px;
            height: 18px;
            background-color: white;
            border-radius: 50%;
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .blur-toggle-switch.active {
            background-color: #00aeec;
        }

        .blur-toggle-switch.active::after {
            transform: translateX(18px);
        }

        /* 确认对话框样式 */
        .blur-toggle-dialog-overlay {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background-color: rgba(0, 0, 0, 0);
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 10000 !important;
            transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            margin: 0 !important;
            padding: 0 !important;
        }

        .blur-toggle-dialog-overlay.show {
            background-color: rgba(0, 0, 0, 0.6);
        }

        .blur-toggle-dialog-overlay.closing {
            background-color: rgba(0, 0, 0, 0);
        }

        .blur-toggle-dialog-overlay.closing .blur-toggle-dialog {
            transform: scale(0.9);
            opacity: 0;
        }

        .blur-toggle-dialog {
            background: var(--bili-purify-bg);
            border-radius: 6px; box-shadow: 0 8px 32px var(--bili-purify-dialog-shadow);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            max-width: 450px; width: 90%;
            width: 90%;
            transform: scale(0.9);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
        }

        .blur-toggle-dialog-overlay.show .blur-toggle-dialog {
            transform: scale(1);
            opacity: 1;
        }

        .blur-toggle-dialog-content {
            padding: 32px 24px 24px;
        }

        .blur-toggle-dialog-title {
            margin: 0 0 12px;
            font-size: 20px;
            font-weight: 600;
            color: var(--bili-purify-text-main);
            opacity: 0;
            animation: fadeInText 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
        }

        .blur-toggle-dialog-message {
            margin: 0 0 24px;
            font-size: 15px;
            color: var(--bili-purify-text-sub);
            line-height: 1.6;
            opacity: 0;
            animation: fadeInText 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
        }

        .blur-toggle-dialog-buttons {
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            opacity: 0;
            animation: fadeInText 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
        }

        .blur-toggle-dialog-btn {
            padding: 10px 24px;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
        }

        .blur-toggle-dialog-btn-cancel {
            background-color: var(--bili-purify-btn-cancel-bg);
            color: var(--bili-purify-text-sub);
        }

        .blur-toggle-dialog-btn-cancel:hover {
            background-color: var(--bili-purify-btn-cancel-hover);
        }

        .blur-toggle-dialog-btn-confirm {
            background-color: #00aeec;
            color: white;
        }

        .blur-toggle-dialog-btn-confirm:hover {
            background-color: #40c5f1;
        }

        .blur-toggle-dialog-btn:active {
            transform: scale(0.96);
        }

        @keyframes fadeInText {
            from {
                opacity: 0;
                transform: translateY(-8px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;

    
    // 注入所有 CSS
    GM_addStyle(cssRules + Styles);

    console.log('[Bilibili纯粹化] 样式已注入');

    // 监听 B 站原生主题切换
    function watchTheme() {
        const themeLink = document.getElementById('__css-map__');
        const updateTheme = () => {
            if (!themeLink) return;
            const isDark = themeLink.href.includes('dark.css');
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        };

        if (themeLink) {
            updateTheme();
            // 监听 href 属性变化
            const observer = new MutationObserver(updateTheme);
            observer.observe(themeLink, { attributes: true, attributeFilter: ['href'] });
        } else {
            setTimeout(watchTheme, 500);
        }
    }
    watchTheme();

    // 辅助函数 - 获取范围内随机整数
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 辅助函数 - 标准化字符格式
    function normalizeText(str) {
    if (!str) return '';
    return str
        .toLowerCase()
        .normalize('NFKC')                   // 统一全角半角
        .replace(/[\s\-_]+/g, '')            // 去掉空格/下划线/横线等分隔符
    }

    /**
     * 自动检测并删除指定元素的特定 Class
     * @param {string} selector - CSS 选择器
     * @param {string} classToRemove - 需要移除的类名
     */
    function observeAndRemoveClass(selector, classToRemove) {
        const processElements = () => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (el.classList.contains(classToRemove)) {
                    el.classList.remove(classToRemove);
                }
            });
        };

        processElements();

        const observer = new MutationObserver((mutations) => {
            mutations.forEach(() => {
                processElements();
            });
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }

    /**
     * 自动检测并修改指定元素的 Style
     * @param {string} selector - CSS 选择器
     * @param {Object} stylesToApply - 样式对象
     */
    function observeAndApplyStyle(selector, stylesToApply) {
        const processElements = () => {
            const elements = document.querySelectorAll(selector);
            const styleKeys = Object.keys(stylesToApply);

            elements.forEach(el => {
                if (styleKeys.length === 0) {
                    if (el.getAttribute('style') !== null && el.getAttribute('style') !== "") {
                        el.style.cssText = "";
                    }
                } else {
                    styleKeys.forEach(key => {
                        if (el.style[key] !== stylesToApply[key]) {
                            el.style[key] = stylesToApply[key];
                        }
                    });
                }
            });
        };

        processElements();

        const observer = new MutationObserver((mutations) => {
            processElements();
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style']
        });
    }

    /**
     * 监听并执行自定义逻辑
     * @param {string} selector - CSS 选择器
     * @param {function} callback - 找到元素后执行的回调函数
     */
    function observeAndExecute(selector, callback) {
        const processElement = (el) => {
            callback(el);

            const textObserver = new MutationObserver(() => {
                textObserver.disconnect();
                callback(el);
                textObserver.observe(el, { childList: true, characterData: true, subtree: true });
            });

            textObserver.observe(el, { childList: true, characterData: true, subtree: true });
        };

        const mainObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        if (node.matches(selector)) processElement(node);
                        node.querySelectorAll(selector).forEach(el => processElement(el));
                    }
                });
            }
        });

        document.querySelectorAll(selector).forEach(el => processElement(el));
        mainObserver.observe(document.documentElement, { childList: true, subtree: true });
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

    // 修复播放页滚动
    function fixScroll() {
        const style = document.createElement('style');
        style.textContent = `
            .left-container.scroll-sticky, 
            .right-container-inner.scroll-sticky {
                position: static !important;
            }
        `;
        document.head.appendChild(style);

        const targets = ['div.left-container', 'div.right-container-inner'];

        const lockElement = (el) => {
            el.classList.remove('scroll-sticky');
            el.style.setProperty('position', 'static', 'important');

            // 冻结 style 属性
            const originalStyle = el.style;
            Object.defineProperty(el, 'style', {
                get: () => originalStyle,
                set: () => {}, // 拦截赋值
                configurable: false
            });

            // 拦截 setAttribute
            const rawSetAttribute = el.setAttribute;
            el.setAttribute = function(name) {
                if (name.toLowerCase() === 'style') return;
                rawSetAttribute.apply(this, arguments);
            };
        };

        const observer = new MutationObserver(() => {
            targets.forEach(selector => {
                const el = document.querySelector(selector);
                if (el && !el.dataset.locked) {
                    el.dataset.locked = "true";
                    lockElement(el);
                }
            });
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }

    // 自动关闭弹幕
    const autoCloseDanmaku = () => {
        let executed = false;

        const tryClose = () => {
            if (executed) return;

            const container = document.querySelector('.bpx-player-dm-setting');
            const switchInput = document.querySelector('input.bui-danmaku-switch-input');

            if (container && switchInput && !container.classList.contains('disabled')) {
                switchInput.click();
                executed = true;
                console.log('[Bilibili纯粹化] 弹幕已关闭');
                observer.disconnect();
            } else if (container && container.classList.contains('disabled')) {
                executed = true;
                console.log('[Bilibili纯粹化] 弹幕已关闭');
                observer.disconnect();
            }
        };

        const observer = new MutationObserver(() => {
            tryClose();
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });

        tryClose();
    };


    // 视频页/列表播放页相关功能
    if (window.location.pathname.includes('/video/') || window.location.pathname.includes('/list/')) {
        autoContinuousOff();
        fixScroll();
        autoCloseDanmaku();

        //关注按钮 关注数隐藏
        const hideSubAmount = () => {
            const targets = document.querySelectorAll(`
                .follow-btn.not-follow, 
                .follow-btn.following,
                .bpx-player-ending-functions-follow
            `);

            targets.forEach(container => {
                if (container.style.display === 'none') return;

                const isFollowing = container.classList.contains('following') || 
                                    container.classList.contains('bpx-state-disabled') ||
                                    container.innerText.includes('已关注');
                
                const targetText = isFollowing ? '已关注' : '关注';

                const walk = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
                let node;
                
                while (node = walk.nextNode()) {
                    const trimmed = node.textContent.trim();
                    if (trimmed && trimmed !== targetText) {
                        // 只要包含“关注”字样或数字，就统一重写
                        if (trimmed.includes('关注') || /[\d.]+[万]?/.test(trimmed)) {
                            node.textContent = targetText;
                        }
                    }
                }
            });
        };

        const startObserver = () => {
            if (!document.body) {
                requestAnimationFrame(startObserver);
                return;
            }

            hideSubAmount();

            const observer = new MutationObserver((mutations) => {
                const shouldUpdate = mutations.some(m => 
                    m.type === 'childList' || m.type === 'characterData'
                );
                if (shouldUpdate) hideSubAmount();
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
                characterData: true
            });
        };

        startObserver();


        // 隐藏特殊标签
        const hideSPTags = () => {
            const selectors = ['div.topic-tag', 'div.bgm-tag'];

            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    if (el && el.parentElement) {
                        if(el.parentElement.style.display != 'none') el.parentElement.style.setProperty('display', 'none', 'important');
                    }
                });
            });
        };
        hideSPTags();

        const tagObserver = new MutationObserver((mutations) => {
            hideSPTags();
        });

        tagObserver.observe(document.documentElement, {
            childList: true,
            subtree: true
        });

        observeAndApplyStyle('a.up-name.vip',{});
        observeAndRemoveClass('a.up-name.vip','vip');
        observeAndApplyStyle('a.name',{});
        observeAndApplyStyle('a.staff-name',{});
        observeAndApplyStyle('a.up-name',{color:'var(--text1)'});

        //将头像的直播间链接换位空间
        observeAndExecute('a.up-avatar', (el) => {
            if(el.getAttribute("href").includes("live")){
                el.setAttribute("href",document.querySelector('a.up-name').getAttribute("href"))
            }
        })
    }

    //剧播放页相关功能
    if (window.location.pathname.includes('/bangumi/play') || window.location.pathname.includes('/watchroom/')) {
        fixScroll();
        autoCloseDanmaku();

        const hideDataText = () => {
            const texts = document.querySelectorAll('span.info-text');
            if(!texts) return;
            texts.forEach(text => {
                if(text.textContent.trim() != "一起看"){
                    text.style.setProperty('display', 'none', 'important');
                }
            })
        };
        hideDataText();

        const startObserver = () => {
            if (!document.body) {
                setTimeout(startObserver, 10);
                return;
            }

            hideDataText();

            const observer = new MutationObserver(hideDataText);
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        };

        startObserver()
    }

    //信息页
    if (window.location.hostname == ("message.bilibili.com")){
        const hideMessages = () => {
            const items = document.querySelectorAll('div.message-sidebar__item-name');
            items.forEach(item => {
                const text = item.textContent.trim();
                if (text === "回复我的" || text === "收到的赞" || text === "@ 我的") {
                    item.parentElement?.style.setProperty('display', 'none', 'important');
                }
            });
        };

        hideMessages();

        const startObserver = () => {
            if (!document.body) {
                setTimeout(startObserver, 10);
                return;
            }

            hideMessages();

            // 启动观察者
            const observer = new MutationObserver(hideMessages);
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        };

        startObserver()
    }

    // 空间页 / 稍后再看
    if (window.location.hostname == ("space.bilibili.com") || window.location.pathname.includes("/watchlater/list")){
        const hideViews = () => {
            const danmakus = document.querySelectorAll('i.sic-BDC-danmu_square_line');
            danmakus.forEach(danmaku => {
                danmaku.parentElement?.style.setProperty('display', 'none', 'important');
            });
            const views = document.querySelectorAll('i.sic-BDC-playdata_square_line');
            views.forEach(view => {
                view.parentElement?.style.setProperty('display', 'none', 'important');
            });
            const thumbsups = document.querySelectorAll('i.sic-BDC-hand_thumbsup_line');
            thumbsups.forEach(thumbup => {
                thumbup.parentElement?.style.setProperty('display', 'none', 'important');
            })
            const headsetAudios = document.querySelectorAll('i.sic-BDC-headset_audio_line');
            headsetAudios.forEach(headsetAudio => {
                headsetAudio.parentElement?.style.setProperty('display', 'none', 'important');
            })
            const eyeIcons = document.querySelectorAll('i.sic-BDC-eye_browse_line')
            eyeIcons.forEach(eyeIcon => {
                eyeIcon.parentElement?.style.setProperty('display', 'none', 'important');
            })
        };

        const hideSocialDataForSubList = () => {
            const hideStyle = `
                #follow, #fans, #like, #ov-icon, #ov, #level, #vip {
                    display: none !important;
                }
                #name {
                    color: var(--text1) !important;
                }
                `;

            const profile = document.querySelector('bili-user-profile');
            if(!profile) return;
            const shadow = profile.shadowRoot;
            if (shadow) {
                const sheet = new CSSStyleSheet();
                sheet.replaceSync(hideStyle);
                shadow.adoptedStyleSheets = [...shadow.adoptedStyleSheets, sheet];
            }
        }

        const hideFansCollapseList = () => {
            const headers = document.querySelectorAll('div.vui_collapse_item_header');
            if(!headers) return;
            headers.forEach(header => {
                if(header.textContent.trim().includes("粉丝")) {
                    header.parentElement?.style.setProperty('display', 'none', 'important');
                }
            })
        }

        hideViews();
        hideSocialDataForSubList();
        hideFansCollapseList();

        const startObserver = () => {
            if (!document.body) {
                setTimeout(startObserver, 10);
                return;
            }

            hideViews();
            hideSocialDataForSubList();
            hideFansCollapseList();

            const hvObserver = new MutationObserver(hideViews);
            hvObserver.observe(document.body, {
                childList: true,
                subtree: true
            });

            const hsObserver = new MutationObserver(hideSocialDataForSubList);
            hsObserver.observe(document.body, {
                childList: true,
                subtree: true
            });

            const hfObserver = new MutationObserver(hideFansCollapseList);
            hfObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        };

        startObserver();

        observeAndRemoveClass('.bili-dyn-title__text', 'normal-vip-color');
        observeAndApplyStyle('a.bili-user-profile-view__info__uname',{});
        observeAndApplyStyle('a.relation-card-info__uname.vip',{});
        observeAndRemoveClass('a.relation-card-info__uname','vip');
        observeAndApplyStyle('a.relation-card-info__uname',{color:'var(--text1)'});

        //关注按钮老粉样式
        observeAndRemoveClass('.space-follow-btn.oldfan','oldfan')

    }

    // 番剧信息页
    if (window.location.pathname.includes('/bangumi/media/')){
        const hideCommentBtn = () => {
            const container = document.querySelector('ul[class="clearfix"]');
            if(!container) return;
            if(!container.childNodes) return;
            container.childNodes.forEach(li => {
                if(li.textContent.trim() != "作品详情") {
                    li.style.setProperty('display', 'none', 'important');
                }
            });
        };

        const hideRelatedVideos = () => {
            const titles = document.querySelectorAll('div.media-tab-module-title');
            if(!titles) return;
            titles.forEach(title => {
                if(title.textContent.trim() == "相关视频"){
                    title.parentElement?.style.setProperty('display', 'none', 'important');
                }
            })
        }

        hideRelatedVideos();
        hideCommentBtn();

        const startObserver = () => {
            if (!document.body) {
                setTimeout(startObserver, 10);
                return;
            }

            hideCommentBtn();
            hideRelatedVideos();

            // 启动观察者
            const cmtObserver = new MutationObserver(hideCommentBtn);
            cmtObserver.observe(document.body, {
                childList: true,
                subtree: true
            });

            const rvdObserver = new MutationObserver(hideRelatedVideos);
            rvdObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        };

        startObserver()
    }

    // 搜索页功能
    if (window.location.hostname == "search.bilibili.com") {

        const blockedKeywordsForBtn = ['粉丝数', '等级', '点赞', '评论', '最多播放', '最多收藏', '最多喜欢', '最多点击'];

        const style = document.createElement('style');
        style.innerHTML = `
            .hide-social-btn { 
                display: none !important; 
            }
        `;
        (document.head || document.documentElement).appendChild(style);

        // 核心清理函数
        const cleanBilibiliSearch = () => {
            // --- 隐藏按钮 ---
            const buttons = document.querySelectorAll('button.vui_button--tab');
            buttons.forEach(btn => {
                const shouldHide = blockedKeywordsForBtn.some(keyword => btn.textContent.includes(keyword));
                if (shouldHide) {
                    btn.classList.add('hide-social-btn');
                }
            });

            // --- 删除文字内容 ---
            const regex = /\d+(\.\d+)?[万亿]?\s*(人关注直播间|粉丝|点赞|条评论|个视频)/g;
            const residueRegex = /^[·\s\u00A0]+|[·\s\u00A0]+$/g;

            const selectors = '.text_ellipsis, .atc-info, .text2, [data-v-2532694c], [data-v-1d775126], [data-v-313a3d44]';
            document.querySelectorAll(selectors).forEach(el => {
                if (!el) return;

                // 清理 title 
                const oldTitle = el.getAttribute('title');
                if (oldTitle && regex.test(oldTitle)) {
                    el.setAttribute('title', oldTitle.replace(regex, '').replace(residueRegex, '').trim());
                }

                // 清理文本
                const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
                let node;
                while (node = walk.nextNode()) {
                    if (regex.test(node.nodeValue)) {
                        node.nodeValue = node.nodeValue.replace(regex, '').replace(residueRegex, '').trim();
                    }
                }

                if (el.children.length === 0 && (el.textContent.trim() === '·' || el.textContent.trim() === '')) {
                    el.textContent = '';
                }
            });

            // 综合栏用户粉丝数
            const userDescElements = document.querySelectorAll('p.user-video-desc');
            if (userDescElements.length > 0) {
                userDescElements.forEach(el => {
                    let htmlContent = el.innerHTML;

                    const fanCountRegex = /(粉丝|视频)：[\d\.万]+(\s·\s)?/;

                    if (fanCountRegex.test(htmlContent)) {
                        el.innerHTML = htmlContent.replace(fanCountRegex, '');
                    }
                });
            }
        };


        const startObserver = () => {
            const targetNode = document.body || document.documentElement;
            if (!targetNode) {
                setTimeout(startObserver, 50);
                return;
            }

            const observer = new MutationObserver(() => {
                window.requestAnimationFrame(cleanBilibiliSearch);
            });

            observer.observe(targetNode, {
                childList: true,
                subtree: true
            });

            cleanBilibiliSearch();
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startObserver);
        } else {
            startObserver();
        }
    }

    // 专栏页
    if (window.location.pathname.includes('/read/')) {
        const style = document.createElement('style');
        style.textContent = `
            /* 隐藏文章信息栏中除发布时间外的所有 span (浏览、点赞、评论) */
            .article-read-info span:not(.publish-text) {
                display: none !important;
            }

            /* 移除信息栏中多余的点号分隔符*/
            .article-read-info {
                font-size: 0;
            }
            .article-read-info > * {
                font-size: 13px;
            }

            /* 隐藏侧边栏中包含评论图标的整个工具项 */
            .side-toolbar .toolbar-item:has(.icon-comment) {
                display: none !important;
            }
        `;
        (document.head || document.documentElement).appendChild(style);

        //文集页面 "xx次阅读"
        const cleanStrictly = () => {
            const candidates = document.querySelectorAll('.desc');

            candidates.forEach(container => {
                const subDivs = Array.from(container.querySelectorAll('div'));
                
                const hasColumnInfo = subDivs.some(d => d.textContent.includes('篇专栏'));
                const hasWordCount = subDivs.some(d => d.textContent.includes('个字'));
                
                if (hasColumnInfo || hasWordCount) {
                    subDivs.forEach(div => {
                        if (/^\d+次阅读$/.test(div.textContent.trim())) {
                            div.remove();
                        }
                    });
                }
            });
        };

        const observer = new MutationObserver((mutations) => {
            for (let mutation of mutations) {
                if (mutation.addedNodes.length) {
                    cleanStrictly();
                    break; 
                }
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }

    // 音频页
    if (window.location.pathname.includes('/audio/')) {
        const hideNumbers = () => {
            // 检索所有包含数字的 div 并隐藏
            const shareDivs = document.querySelectorAll('.song-share > div');
            shareDivs.forEach(div => {
                if (div.style.display !== 'none') {
                    div.style.display = 'none';
                }
            });
        };

        // 1. 立即执行一次
        hideNumbers();

        // 2. 动态监听后续加载的内容
        const observer = new MutationObserver((mutations) => {
            hideNumbers();
        });

        // 开始监听 body 及其子元素的变化
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // 动态页
    if(window.location.hostname == "t.bilibili.com" || window.location.pathname.includes("/opus/")){
        observeAndApplyStyle('a.bili-user-profile-view__info__uname',{});
        observeAndApplyStyle('div.bili-dyn-my-info__stats',{display:'flex',justifyContent:'space-around'});
        observeAndRemoveClass('span.bili-dyn-title__text','normal-vip-color');
        observeAndApplyStyle('div.opus-module-author__name',{color:'var(--text1)'});

        observeAndExecute('div.opus-module-author__pub__text', (el) => {
            if (el.textContent.includes('浏览')) {
                el.textContent = el.textContent.replace(/\s?\d+浏览/g, '').trim();
            }
        });
    }

    //话题页
    if(window.location.pathname.includes("/topic/")){
        observeAndRemoveClass('span.bili-dyn-title__text','normal-vip-color');
        observeAndApplyStyle('a.bili-user-profile-view__info__uname',{})
    }



    // ==== 顶部栏功能 ====
    function removeAvatarPanelFans() {
        const texts = document.querySelectorAll("div.count-text");
        if(!texts) return;
        texts.forEach(text => {
            if(text.textContent.trim() == "粉丝") {text.parentElement.style.setProperty('display', 'none', 'important');
            text.parentElement.parentElement.style.display = 'flex';
            text.parentElement.parentElement.style.justifyContent = 'space-around';}
        })
    }

    function startHeaderObserver() {
        if (!document.body) {
            setTimeout(startHeaderObserver, 10);
            return;
        }

        removeAvatarPanelFans();

        const observer = new MutationObserver(removeAvatarPanelFans);
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    startHeaderObserver();
    // ====        ====

    
    
    // 直播间聊天框彩色背景/彩色名字/彩色名字/特殊弹幕移除功能
    function removeChatColors() {
        // 查找所有带彩色背景的聊天项
        const colorfulChats = document.querySelectorAll('.chat-item.danmaku-item.has-bubble');
        
        colorfulChats.forEach(chat => {
            // 移除 style 属性以去掉背景颜色
            if (chat.hasAttribute('style')) {
                chat.removeAttribute('style');
            }
        });

        //移除用户名字颜色
        const userNames = document.querySelectorAll('span.user-name.v-middle.pointer.open-menu');
        userNames.forEach(name => {
            if(name.style.color !== '#ffffff'){
                name.setAttribute('style', '');
            }
        })



        //修改特殊弹幕
        const regularDanmakuClassname = 'bili-danmaku-x-dm bili-danmaku-x-roll bili-danmaku-x-show';
        // 标准弹幕style
        const regularDanmakuStyle = `--opacity: 1; --fontSize: 25px; --fontFamily: SimHei, "Microsoft JhengHei", Arial, Helvetica, sans-serif; --fontWeight: bold; --color: #ffffff; --textShadow: 1px 0 1px #000000,0 1px 1px #000000,0 -1px 1px #000000,-1px 0 1px #000000; --display: none; --offset: 1275px; --translateX: -1387px; --duration: 9.5s; --top: 0px;`;
        const whiteColorHex = '#ffffff';
        const MAX_TOP_PIXELS = 200; // 特殊弹幕替换滚动顶部随机距离范围上限
        const MIN_TOP_PIXELS = 0;   // 特殊弹幕替换滚动顶部随机距离范围下限
        // 所有不需要处理（非特殊弹幕）的类名集合
        const standardClassnames = new Set([
            regularDanmakuClassname,
            'bili-danmaku-x-dm bili-danmaku-x-roll',    // preparingDanmakuClassname
            'bili-danmaku-x-dm',                       // offScreenDanmakuClassname
            'bili-danmaku-x-dm-rotate',                // danmakuRotateClassname
            'bilibili-combo-danmaku-container'         // comboDanmakucontainerClassname
        ]);

        const danmakuContainer = document.querySelector('.danmaku-item-container');
        if (!danmakuContainer) return;

        const danmakus = danmakuContainer.childNodes;

        danmakus.forEach(danmaku => {
            if (danmaku.nodeType !== 1 || !danmaku.style) return; 

            const currentClassName = danmaku.className;
            const isStandardClass = standardClassnames.has(currentClassName);
            const currentColor = danmaku.style.getPropertyValue('--color').trim();

            //修改非白色弹幕的颜色
            if (isStandardClass && currentColor !== whiteColorHex) {
                //console.log(`[Bilibili纯粹化-调试] [滚动非白色弹幕] ${danmaku.textContent}, 类名:${currentClassName}, 颜色:${currentColor}`);
                // 修改颜色
                danmaku.style.setProperty('--color', whiteColorHex);
            }

            //修改非滚动弹幕的类型
            if (!isStandardClass) {
                //console.log(`[Bilibili纯粹化-调试] [非滚动弹幕] ${danmaku.textContent}, 原始类名:${currentClassName}, 颜色:${currentColor}`);
                // 修改类名并给予随机顶部距离
                danmaku.className = regularDanmakuClassname;
                danmaku.setAttribute('style',regularDanmakuStyle);
            const randomTop = getRandomInt(MIN_TOP_PIXELS, MAX_TOP_PIXELS);
                danmaku.style.setProperty('--top', `${randomTop}px`);
            }
        });
    }

    // 监听直播间聊天框的动态变化
    function initLiveChatObserver() {
        // 等待聊天框容器加载
        const checkChatContainer = setInterval(() => {
            const chatContainer = document.querySelector('#chat-items');
            
            if (chatContainer) {
                clearInterval(checkChatContainer);
                
                // 处理已存在的彩色背景/彩色名字/彩色名字/特殊弹幕
                removeChatColors();
                
                // 监听新增的聊天消息
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.addedNodes.length > 0) {
                            removeChatColors();
                        }
                    });
                });
                
                observer.observe(chatContainer, {
                    childList: true,
                    subtree: true
                });
                
                console.log('[Bilibili纯粹化] 直播间聊天净化已启用');
            }
        }, 500);
        
        // 10秒后停止检查（避免无限循环）
        setTimeout(() => clearInterval(checkChatContainer), 10000);
    }

    // 直播页聊天框占比平衡(去除brush-prompt即进场提示)
    function fixLiveChatBrushPrompt(){
        const targetNode = document.getElementById('chat-history-list');

        if (!targetNode) {
            return;
        }

        const removeTargetClass = () => {
            if (targetNode.classList.contains('with-brush-prompt')) {
                targetNode.classList.remove('with-brush-prompt');
            }
        };

        removeTargetClass();

        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    removeTargetClass();
                }
            }
        });

        observer.observe(targetNode, { attributes: true });
    }

    // 直播页启用聊天净化
    if (window.location.hostname === 'live.bilibili.com') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initLiveChatObserver);
            document.addEventListener('DOMContentLoaded', fixLiveChatBrushPrompt);
        } else {
            initLiveChatObserver();
            fixLiveChatBrushPrompt()
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
                'p-relative.search-bar.over-hidden.border-box.t-nowrap',
                'nav-search'
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
                    //console.log('[Bilibili纯粹化] 已修改搜索框 placeholder');
                }
                
                // 删除 title 属性
                if (searchConfig.removeTitle && input.hasAttribute('title')) {
                    input.removeAttribute('title');
                    //console.log('[Bilibili纯粹化] 已删除搜索框 title 属性');
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


    // 隐藏搜索页广告视频 + 模糊视频封面功能
    function removeSearchPageAdVideo() {
        const hiddenVideos = new Set(); // 记录已隐藏的视频
        const blurredCovers = new Set(); // 记录已添加模糊遮罩的封面
        const unblurredCovers = new Set(); // 记录用户已手动显示的封面
        let isCoversBLurred = true; // 封面模糊开关，默认开启
        const pendingVideos = new Set(); // 可能的算法推荐视频
        const allRequestInstances = new Set(); // 发起的网络请求
        let currentSearchKeyword = "";
        const URL_CHANGE_EVENT = 'bp-url-change'; // 自定义的url更新事件
        let lastHref = location.href; // 变更前url存储

        // 包裹原生 pushState / replaceState 调用后手动派发事件
        function wrapHistoryMethod(type) {
            const orig = history[type];
            return function () {
                const ret = orig.apply(this, arguments);
                // 派发事件
                window.dispatchEvent(new Event(URL_CHANGE_EVENT));
                return ret;
            };
        }
        history.pushState = wrapHistoryMethod('pushState');
        history.replaceState = wrapHistoryMethod('replaceState');

        // 监听浏览器前进/后退
        window.addEventListener('popstate', function () {
            window.dispatchEvent(new Event(URL_CHANGE_EVENT));
        });

        // url变更后行为
        function handleUrlChange() {
        if (location.href === lastHref) return; // 防止重复处理
        lastHref = location.href;
        //console.log("url变啦!")
        if(allRequestInstances.size>=1){
            allRequestInstances.forEach(requestInstance => {
                requestInstance.abort();
                console.log("[Bilibili纯粹化] 已停止之前的网络请求");
            })
        }
        pendingVideos.clear();
        allRequestInstances.clear();
    }

        // 当视频被添加到 pendingVideos 时，触发 pendingVideoAdded 事件
        function addPendingVideo(video) {
            if (!pendingVideos.has(video)) {
                pendingVideos.add(video);
                document.dispatchEvent(new Event('pendingVideoAdded')); // 触发事件
            }
        }

        //根据视频元素构建视频URL
        function buildUrlForTags(video){
            const videoLinkTag = video.querySelector('a')
            if(!videoLinkTag) return;
            let videoUrl = videoLinkTag.href;
            if(videoUrl.includes("m.bilibili.com")){
                videoUrl.replace("m.bilibili.com","www.bilibili.com");
            }
            return videoUrl;
        }

        //智能提取关键词
        function smartTokenize(keyword) {
            keyword = keyword.trim();
            if (!keyword) return [];

            // 如果用户自己打了空格，那我们就尊重空格拆法
            if (/\s/.test(keyword)) {
                return keyword.split(/\s+/).filter(Boolean);
            }

            const hasChinese = /[\u4e00-\u9fa5]/.test(keyword);
            const hasLatinDigit = /[a-zA-Z0-9]/.test(keyword);

            // 只英文/数字：整体作为一个token
            if (!hasChinese && hasLatinDigit) {
                return [keyword];
            }

            // 只中文：用整串 + 二字滑窗做token
            if (hasChinese && !hasLatinDigit) {
                const s = keyword.replace(/\s+/g, '');
                if (s.length <= 2) return [s]; // 太短就不拆
                const tokens = [s];
                for (let i = 0; i < s.length - 1; i++) {
                    tokens.push(s.slice(i, i + 2));
                }
                return tokens;
            }

            // 混合中文 + 英文/数字：按字符类型分段
            const tokens = [];
            let current = '';
            let currentType = null;

            const getType = ch => {
                if (/[\u4e00-\u9fa5]/.test(ch)) return 'C';          // Chinese
                if (/[a-zA-Z0-9]/.test(ch)) return 'L';              // Latin/digit
                return 'O';                                          // other符号
            };

            for (const ch of keyword) {
                const t = getType(ch);
                if (t === 'O') {
                    // 符号：当作分隔
                    if (current) {
                        tokens.push(current);
                        current = '';
                        currentType = null;
                    }
                    continue;
                }
                if (!currentType || t === currentType) {
                    current += ch;
                    currentType = t;
                } else {
                    tokens.push(current);
                    current = ch;
                    currentType = t;
                }
            }
            if (current) tokens.push(current);

            return tokens.filter(Boolean);
        }

        // 隐藏广告视频/推送视频
        function hideAdVideos(container) {
            if (!container) return;
            
            const videos = container.querySelectorAll(':scope > *');
            videos.forEach(video => {
                // 隐藏广告视频
                if (hiddenVideos.has(video)) return;
                
                const adFeedbackEntry = video.querySelector('.ad-feedback-entry');
                if (adFeedbackEntry) {
                    video.style.display = 'none';
                    hiddenVideos.add(video);
                    console.log('[Bilibili纯粹化] 已隐藏一个广告视频');
                    return;
                }

                if(pendingVideos.has(video))return;
                // 隐藏推送视频
                const currentUrl = new URL(window.location.href);
                const rawKeyword = currentUrl.searchParams.get('keyword');
                if (!rawKeyword) return;

                currentSearchKeyword = rawKeyword;

                const videoTitle = video.querySelector('.bili-video-card__info--tit');
                const videoAuthor = video.querySelector('.bili-video-card__info--author');
                if (!videoTitle || !videoAuthor) return;

                const videoTitleText  = videoTitle.textContent || '';
                const videoAuthorText = videoAuthor.textContent || '';

                const normTitle  = normalizeText(videoTitleText);
                const normAuthor = normalizeText(videoAuthorText);

                // 智能拆词
                let tokens = smartTokenize(rawKeyword);
                // 把整串原keyword也当作一个token，增加命中机会：
                if (!tokens.includes(rawKeyword.trim())) {
                    tokens.unshift(rawKeyword.trim());
                }

                // 规范化每个token
                const normTokens = tokens
                    .map(t => normalizeText(t))
                    .filter(t => t.length > 0);

                if (!normTokens.length) return;

                // 统计命中token的数量
                let matchTokenCount = 0;
                for (const token of normTokens) {
                    if (normTitle.includes(token) || normAuthor.includes(token)) {
                        matchTokenCount++;
                    }
                }

                let keepVideo = false;

                if (normTokens.length === 1) {
                    // 单一关键词（大概率是ID），必须命中才保留
                    keepVideo = matchTokenCount === 1;
                } else {
                    // 多token情况：至少命中一个就保留
                    // 可以改成比例形式：
                    // const ratio = matchTokenCount / normTokens.length;
                    // keepVideo = ratio >= 0.3; // 举例
                    keepVideo = matchTokenCount >= 1;
                }

                if (keepVideo) {
                    return; // 不隐藏
                }

                // 否则视为推荐视频，隐藏
                video.style.display = 'none';
                hiddenVideos.add(video);
                addPendingVideo(video);
                //console.log(`[Bilibili纯粹化-调试] 已隐藏一个可能的分析算法推荐视频:【${video.querySelector('.bili-video-card__info--tit')?.textContent}】，目前的检查视频set大小为:【${pendingVideos.size}】`);
                console.log('[Bilibili纯粹化] 已隐藏一个可能的分析算法推荐视频');
            });

        }

        // 为视频封面添加模糊遮罩
        function addBlurMask(container) {
            if (!container || !isCoversBLurred) return; // 检查开关状态

            const imageWraps = container.querySelectorAll('.bili-video-card__image--wrap');
            imageWraps.forEach(wrap => {
                if (blurredCovers.has(wrap) || unblurredCovers.has(wrap)) return;

                const picture = wrap.querySelector('.v-img.bili-video-card__cover');
                if (!picture) return;

                const searchPageCoverBlurMask = document.createElement('div');
                searchPageCoverBlurMask.className = 'search-cover__mask';

                const searchPageCoverShowButton = document.createElement('button');
                searchPageCoverShowButton.textContent = '显示封面';
                searchPageCoverShowButton.className = 'search-cover__button';

                searchPageCoverBlurMask.addEventListener('mouseenter', () => {
                    searchPageCoverShowButton.classList.add('visible');
                });

                searchPageCoverBlurMask.addEventListener('mouseleave', () => {
                    searchPageCoverShowButton.classList.remove('visible');
                });

                searchPageCoverShowButton.addEventListener('mouseenter', () => {
                    searchPageCoverShowButton.classList.add('mouse-in');
                });

                searchPageCoverShowButton.addEventListener('mouseleave', () => {
                    searchPageCoverShowButton.classList.remove('mouse-in');
                });

                searchPageCoverShowButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    searchPageCoverBlurMask.remove();
                    blurredCovers.delete(wrap);
                    unblurredCovers.add(wrap);
                });

                searchPageCoverBlurMask.appendChild(searchPageCoverShowButton);

                if (getComputedStyle(wrap).position === 'static') {
                    wrap.style.position = 'relative';
                }

                wrap.appendChild(searchPageCoverBlurMask);
                blurredCovers.add(wrap);
            });
        }

        // 移除所有模糊遮罩
        function removeAllBlurMasks() {
            const allMasks = document.querySelectorAll('.search-cover__mask');
            allMasks.forEach(mask => {
                const wrap = mask.parentElement;
                mask.remove();
                blurredCovers.delete(wrap);
                unblurredCovers.add(wrap);
            });
            //console.log('[Bilibili纯粹化] 已移除所有模糊遮罩');
        }

        // 创建确认对话框
        function showConfirmDialog(onConfirm, onCancel) {
            // 创建对话框容器
            const dialogOverlay = document.createElement('div');
            dialogOverlay.className = 'blur-toggle-dialog-overlay';
            // 添加内联样式确保居中显示
            dialogOverlay.style.cssText = 'position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; display: flex !important; align-items: center !important; justify-content: center !important; z-index: 10000 !important;';
        
            const dialogBox = document.createElement('div');
            dialogBox.className = 'blur-toggle-dialog';
            
            // 对话框内容
            const dialogContent = document.createElement('div');
            dialogContent.className = 'blur-toggle-dialog-content';
            
            const title = document.createElement('h3');
            title.className = 'blur-toggle-dialog-title';
            title.textContent = '关闭视觉防护后，你将直接看到所有封面。';
            
            const message = document.createElement('p');
            message.className = 'blur-toggle-dialog-message';
            message.textContent = '你此刻的观看意图是什么？';
            
            const buttonGroup = document.createElement('div');
            buttonGroup.className = 'blur-toggle-dialog-buttons';
            
            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'blur-toggle-dialog-btn blur-toggle-dialog-btn-cancel';
            cancelBtn.textContent = '返回';
            
            const confirmBtn = document.createElement('button');
            confirmBtn.className = 'blur-toggle-dialog-btn blur-toggle-dialog-btn-confirm';
            confirmBtn.textContent = '我已确认';
            
            // 关闭对话框的函数
            const closeDialog = () => {
                dialogContent.remove();
                dialogOverlay.classList.add('closing');
                setTimeout(() => {
                    dialogOverlay.remove();
                }, 200);
            };
            
            // 按钮事件
            cancelBtn.addEventListener('click', () => {
                closeDialog();
                if (onCancel) onCancel();
            });
            
            confirmBtn.addEventListener('click', () => {
                closeDialog();
                if (onConfirm) onConfirm();
            });
            
            // 点击遮罩层关闭
            dialogOverlay.addEventListener('click', (e) => {
                if (e.target === dialogOverlay) {
                    closeDialog();
                    if (onCancel) onCancel();
                }
            });
            
            // 组装对话框
            buttonGroup.appendChild(cancelBtn);
            buttonGroup.appendChild(confirmBtn);
            dialogContent.appendChild(title);
            dialogContent.appendChild(message);
            dialogContent.appendChild(buttonGroup);
            dialogBox.appendChild(dialogContent);
            dialogOverlay.appendChild(dialogBox);
            
            // 添加到页面
            document.body.appendChild(dialogOverlay);
            
            // 触发动画
            requestAnimationFrame(() => {
                dialogOverlay.classList.add('show');
            });
        }

        // 创建封面模糊切换按钮
        function createBlurToggleButton() {
            // 查找导航栏
            const navBar = document.querySelector('.vui_tabs--nav.vui_tabs--nav-pl0');
            if (!navBar) {
                setTimeout(createBlurToggleButton, 500);
                return;
            }

            // 检查是否已经添加过按钮
            if (document.querySelector('.blur-toggle-container')) return;

            // 创建按钮容器
            const toggleContainer = document.createElement('li');
            toggleContainer.className = 'blur-toggle-container';
            
            const toggleButton = document.createElement('button');
            toggleButton.className = 'blur-toggle-button';
            toggleButton.setAttribute('aria-label', '封面模糊开关');
            
            const toggleInner = document.createElement('span');
            toggleInner.className = 'blur-toggle-inner';
            
            const toggleLabel = document.createElement('span');
            toggleLabel.className = 'blur-toggle-label';
            toggleLabel.textContent = '视觉防护';
            
            const toggleSwitch = document.createElement('span');
            toggleSwitch.className = 'blur-toggle-switch active';
            
            toggleInner.appendChild(toggleLabel);
            toggleInner.appendChild(toggleSwitch);
            toggleButton.appendChild(toggleInner);
            toggleContainer.appendChild(toggleButton);
            
            // 按钮点击事件
            toggleButton.addEventListener('click', () => {
                if (isCoversBLurred) {
                    // 当前是开启状态，点击后显示确认对话框
                    showConfirmDialog(
                        // 确认回调
                        () => {
                            isCoversBLurred = false;
                            toggleSwitch.classList.remove('active');
                            removeAllBlurMasks();
                            console.log('[Bilibili纯粹化] 视觉防护已关闭');
                        },
                        // 取消回调
                        () => {
                            // 保持开启状态，不做任何操作
                            console.log('[Bilibili纯粹化] 取消关闭视觉防护');
                        }
                    );
                } else {
                    // 当前是关闭状态，直接开启
                    isCoversBLurred = true;
                    toggleSwitch.classList.add('active');
                    // 清空已显示记录，允许重新添加遮罩
                    unblurredCovers.clear();
                    // 重新处理所有视频列表
                    const videoLists = document.querySelectorAll('.video-list');
                    videoLists.forEach(videoList => {
                        addBlurMask(videoList);
                    });
                    console.log('[Bilibili纯粹化] 视觉防护已开启');
                }
            });
            
            // 添加到导航栏末尾
            navBar.appendChild(toggleContainer);
            console.log('[Bilibili纯粹化] 封面模糊开关按钮已添加');
        }

        // 监听页面变化
        function setupObserver() {
            const observer = new MutationObserver(() => {
                const videoLists = document.querySelectorAll('.video-list');
                videoLists.forEach(videoList => {
                    hideAdVideos(videoList);
                    addBlurMask(videoList);
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            
            console.log('[Bilibili纯粹化] 搜索页功能已启用');
        }

        // 监听 pendingVideoAdded 事件，重新检查视频
        document.addEventListener('pendingVideoAdded', () => {
            pendingVideos.forEach(video => {
                // 如果未被检查过，进行检查流程
                if (!video.dataset.checked) {
                    //console.log(`[Bilibili纯粹化-调试] 视频【${video.querySelector('.bili-video-card__info--tit')?.textContent}】成功进入检查流程`)
                    video.dataset.checked = 'true'; // 设置标记已检查
                    const url = buildUrlForTags(video);
                    const keyword = currentSearchKeyword;
                    //console.log(`[Bilibili纯粹化-调试] 即将开始针对视频【${video.querySelector('.bili-video-card__info--tit')?.textContent}】的网络请求`)
                    const requestInstances = GM_xmlhttpRequest({
                        method: "GET",
                        url: url,
                        headers: {
                        "Connection": "close",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0"
                        },
                        onload: function(response) {
                            //console.log(`[Bilibili纯粹化-调试] 视频【${video.querySelector('.bili-video-card__info--tit')?.textContent}】的网络请求成功`)
                            if (!video.isConnected) {
                                requestInstances.abort();
                                //console.log(`[Bilibili纯粹化-调试] 视频【${video.querySelector('.bili-video-card__info--tit')?.textContent}】被判定为废弃节点`)
                                console.log("[Bilibili纯粹化] 检测到废弃节点，已停止对应的请求。");
                                return;
                            }

                            const html = response.responseText;
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, "text/html");

                            const metaKeywords = doc.querySelector('meta[itemprop="keywords"]');
                            const metaTitle = doc.querySelector('meta[itemprop="name"]');
                            const descriptionElement = doc.querySelector('span.desc-info-text');
                            const authorDescriptionElement = doc.querySelector('.up-description.up-detail-bottom');

                            //console.log(`[Bilibili纯粹化-调试] 视频【${video.querySelector('.bili-video-card__info--tit')?.textContent}】的各项元素为【${metaKeywords}】【${metaTitle}】【${descriptionElement}】【${authorDescriptionElement}】`)

                            const keywordsText = metaKeywords ? normalizeText(metaKeywords.getAttribute("content")) : normalizeText(" ");
                            const titleText = metaTitle ? normalizeText(metaTitle.getAttribute("content")) : normalizeText(" ");
                            const descriptionText = descriptionElement ? normalizeText(descriptionElement.textContent) : normalizeText(" ");
                            const authorDescText = authorDescriptionElement ? normalizeText(authorDescriptionElement.getAttribute('title')) : normalizeText(" ");

                            const rawKeyword = currentSearchKeyword || keyword;
                            let tokens = smartTokenize(rawKeyword);

                            // 把原搜索词整体也作为一个 token
                            if (!tokens.includes(rawKeyword.trim())) {
                                tokens.unshift(rawKeyword.trim());
                            }

                            // 规范化 tokens
                            const normTokens = tokens
                                .map(t => normalizeText(t))
                                .filter(t => t.length > 0);


                            let matchTokenCount = 0;

                            //console.log(`[Bilibili纯粹化-调试] 即将检查视频【${video.querySelector('.bili-video-card__info--tit')?.textContent}】中的【${keywordsText}】【${titleText}】【${descriptionText}】【${authorDescText}】中是否含有【${normTokens}】`)

                            for (const token of normTokens) {
                                if (
                                    keywordsText.includes(token) ||
                                    titleText.includes(token) ||
                                    descriptionText.includes(token) ||
                                    authorDescText.includes(token)
                                ) {
                                    matchTokenCount++;
                                }
                            }

                            // 判断是否命中 
                            let keepVideo = false;

                            if (normTokens.length === 1) {
                                // 单一关键词:
                                keepVideo = matchTokenCount === 1;
                            } else {
                                // 多词：
                                keepVideo = matchTokenCount >= 1;
                            }

                            //console.log(`[Bilibili纯粹化-调试] 视频【${video.querySelector('.bili-video-card__info--tit')?.textContent}】，关键词命中【${matchTokenCount}】次`)

                            // 恢复视频 
                            if (keepVideo) {
                                video.style.display = '';
                                const title = video.querySelector('.bili-video-card__info--tit')?.textContent || '';
                                console.log(`[Bilibili纯粹化] 在视频【${title}】的标签/简介/作者简介中命中关键词，已恢复该视频显示`);
                            }
                        },
                        onerror: function(error) {
                            console.error('请求视频数据失败:', error);
                        },
                        onprogress: function(response) {
                            if(!video.isConnected){
                                requestInstances.abort();
                                console.log("[Bilibili纯粹化] 检测到废弃节点，已停止对应的请求。");
                            }
                        },
                        onreadystatechange: function(respons){
                            if(!video.isConnected){
                                requestInstances.abort();
                                console.log("[Bilibili纯粹化] 检测到废弃节点，已停止对应的请求。");
                            }
                        }
                        });
                    allRequestInstances.add(requestInstances);
                }
            });
        });

        // 监听url变动
        window.addEventListener(URL_CHANGE_EVENT, handleUrlChange);
        
        // 初始化
        function init() {
            const videoLists = document.querySelectorAll('.video-list');
            
            if (videoLists.length > 0) {
                videoLists.forEach(videoList => {
                    hideAdVideos(videoList);
                    addBlurMask(videoList);
                });
                setupObserver();
                createBlurToggleButton(); // 创建开关按钮
            } else {
                setTimeout(init, 500);
            }
        }
        
        init();
    }

    // 启用搜索页功能
    if (window.location.hostname === 'search.bilibili.com') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', removeSearchPageAdVideo);
        } else {
            removeSearchPageAdVideo();
        }
    }

})();