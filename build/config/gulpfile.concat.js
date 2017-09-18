module.exports = {
    pre: 'dist/',
    //item : 43个js
    files: [
        //首屏加载阻塞js
        ['js/first.min.js',[
            'js/index/index-cover.js',
            'js/index/default/index.js',
            'js/index/default/component-config.js',
            'js/index/default/index-template.js',

            'js/components/header/signage.js',
            'js/components/item/itemList.js',
            'js/components/navbar/normal.js',
            'js/components/advert/single.js',
            'js/components/advert/slider.js',
            'js/components/advert/normal.js',
            'js/components/navbar/type-text.js',
            'js/components/item/recommend.js',
            'js/components/banner/index.js',
            'js/components/figure/index.js',
            'js/components/shopInfo/index.js',
            'js/components/diary/render.js',
            'js/components/coupons/normal.js',
            'js/components/menubar/normal.js',
            'js/components/custombar/normal.js',
            'js/components/search/index.js',
            'js/components/activity/index.js',
            'js/components/shop-entry/index.js',
            'js/components/content/index.js',
            'js/components/advert/hotArea.js',

            'js/components/advanced/item-render-class.js',
            'js/components/advanced/seckill-activity.js',
            'js/components/advanced/slider.js',
            'js/components/advanced/suggest-rank.js',
            'js/components/advanced/tabs.js',
            'js/components/advanced/three-columns.js',
            'js/components/advanced/list-album.js',
            'js/components/advanced/two-column-album.js',
            'js/components/advanced/slide-album.js',
            'js/components/advanced/mixed-row.js',
            'js/components/advanced/slide-img-navbar.js',

            'js/common/touch-panel.js',
            'js/common/sliderBox.js',
            'js/common/jweixin-1.0.0.js',

        ]],
        //首屏直抒的js文件
        ['js/firstCommon.min.js',[
            'js/common/topBar.js',//*
            'js/common/watcher.js',//*
            'js/common/zepto/zepto.js',//*
            'js/common/zepto/fx.js',//*
            'js/common/zepto/fx-methods.js',//*
            'js/common/component_support.js',//*
            'js/common/sanitize.js',//*
            'js/common/doLogin.js',//*
            'js/common/cookie.js',//*
            'js/common/utils.js',//*
            'js/common/timing.js',//*
            'js/common/preload.js',//*
            'js/common/flexible.js',//*
        ]],
        //首屏异步加载的文件
        ['js/async.min.js',[
            'js/common/iscroll.js',//*
            'js/common/jroll.js',//*
            'js/common/VTrace.js',//*
            'js/common/wdNativeShare.js',//*
            'js/common/ui/alert.js',
            'js/common/jumpUtil.js',//*
            'js/common/ui/toast.js',//*
            'js/common/ui/confirm.js',//*
            'js/common/coupons_handler.js',
            'js/common/favorite.js',//*
            'js/common/piwik.js',//*
            'js/common/myShop.js',//*
            'js/common/newCart.js',//*
            'js/common/lazyload2.js',//*
            'js/common/wd_discount.js',//*
            'js/common/showMPQRCode.js',//*
            'js/common/date.js',//*
            'js/common/nation-flag.js',
            'js/common/wd-buyer-downloader.js',//*
            'js/common/upload-app.js',//*
            'js/common/historyBack.js',
            // 'js/index/default/show-friend-shop.js',
        ]],
        ['js/lib.min.js', [
            // 'js/common/zepto/zepto.js',
            // 'js/common/zepto/fx.js',
            // 'js/common/zepto/fx-methods.js',
            // 'js/common/piwik.js',
            // 'js/common/iscroll.js',
            // 'js/common/jweixin-1.0.0.js',
            // 'js/common/VTrace.js',
            // 'js/common/template.js',
            'js/common/swiper.js'//item
            // 'js/common/component_support.js'
        ]],
        //公用common类库
        ['js/common.min.js', [
            // 'js/common/preload.js',
            // 'js/common/cookie.js',
            // 'js/common/utils.js',
            // 'js/common/lazyload.js',
            'js/common/platfrom.js',//item
            // 'js/common/sliderBox.js',
            // 'js/common/touch-panel.js',
            'js/common/slidedown.js',
            // 'js/common/ui/alert.js',
            // 'js/common/ui/confirm.js',
            'js/common/ui/loading.js',
            'js/common/ui/shareTips.js',
            // 'js/common/ui/toast.js',
            'js/common/video.js',
            'js/common/video2.js',
            'js/common/notice-unpay.js',
            // 'js/common/doLogin.js',
            // 'js/common/coupons_handler.js',
            // 'js/common/jumpUtil.js',
            // 'js/common/wd_discount.js',
            // 'js/common/wdNativeShare.js',
            'js/common/wx-share-plugin.js',
            // 'js/common/showMPQRCode.js',
            // 'js/common/favorite.js',
            // 'js/common/myShop.js',
            // 'js/common/newCart.js',
            'js/common/flyEffect.js',//item
            // 'js/common/navigation_timing.js',//没用到
            'js/common/time.js',
            'js/common/cart-server.js',
            // 'js/common/downloadBuyerAppBanner.js',//没用到
            // 'js/common/historyBack.js',
            // 'js/common/sanitize.js',
            // 'js/common/performance-track.js',
            'js/common/jsbridgeManager.js',
            'js/index/default/index-coupons.js',//item
            // 'js/index/index-cover.js',
            'js/components/item/multi-sku.js',//item
        ]],
        //商品页js
        // ['js/item.min.js', [
        //     'js/item/getComment.js',//异步
        //     'js/item/getNextImg.js',//异步
        //     'js/item/getRecommonItems.js',//异步
        //     // 'js/item/item_coupons.js',//发现没有被引用
        //     'js/item/item_sk.js',
        //     'js/item/item_wx_share.js',//异步
        //     'js/item/praise.js',
        //     'js/item/shopinfo.js',
        //     'js/item/cart-snapid.js',
        //     // 'js/item/show_fxOrignSellerInfo.js',//没有这个js文件
        //     'js/item/video.js',
        //     'js/item/ask-info.js',
        //     'js/item/index.js'
        // ]],
        //店铺页公用js
        ['js/index.min.js', [
            'js/index/default/classify-panel.js',
            // 'js/index/default/index.js',
            'js/index/default/index-cart.js'
            // 'js/index/default/index-template.js',
            // 'js/index/default/item-top.js',
            // 'js/theme/default.js',
            // 'js/index/default/show-friend-shop.js'
        ]],
        //超市模板js
        ['js/supermarket.min.js', [
            'js/index/supermarket/cart.js',
            'js/index/supermarket/cart-refresh-cookie.js',
            'js/index/supermarket/cart-refresh-server.js',
            'js/index/supermarket/index.js',
            'js/index/supermarket/order.js',
            'js/index/supermarket/sku.js'
        ]],
        //店铺页模板js
        // ['js/index.default.js', [
        //     // 'js/index/default/index.js',
        //     // 'js/index/default/component-config.js',
        //     // 'js/components/header/signage.js',
        //     // 'js/components/item/itemList.js',
        //     // 'js/components/navbar/normal.js',
        //     // 'js/components/advert/single.js',
        //     // 'js/components/advert/slider.js',
        //     // 'js/components/advert/normal.js',
        //     // 'js/components/header/signage.js',
        //     // 'js/components/navbar/type-text.js',
        //     // 'js/components/advert/single.js',
        //     // 'js/components/item/recommend.js',
        //     // 'js/components/banner/index.js',
        //     // 'js/components/figure/index.js',
        //     // 'js/components/shopInfo/index.js',
        //     // 'js/components/diary/render.js',
        //     // 'js/components/coupons/normal.js',
        //     // 'js/components/menubar/normal.js'
        // ]],
        //店长笔记js
        // ['js/diary.min.js', [
        //     'js/diary/detail.js',
        //     'js/diary/praise-new.js',
        //     'js/diary/shop-info.js'
        // ]],
        //个人模板
        ['js/index.personal.js', [
            'js/index/personal/commodityList.js',
            'js/index/personal/diaryList.js',
            'js/index/personal/galleryList.js',
            'js/index/personal/index.js'
        ]],
        // ['css/combo/comment.min.css', [
        //     'css/common/base.css',
        //     'css/item/newItem.css'
        // ]],
        //商品页css
        // ['css/combo/item.min.css', [
        //     'css/common/base.css',
        //     'css/common/swiper.css',
        //     'css/item/item.css'
        // ]],
        //超市模板css
        ['css/combo/supermarket.min.css', [
            'css/common/base.css',
            'css/index/index.css',
            'css/index/supermarket/supermarket.css',
            // 'css/index/index-coupons.css'
        ]]
        //
        //['css/combo/beauty.min.css', [
        //    'css/common/base.css',
        //    'css/components/itemlist.css',
        //    'css/common/coupons.css',
        //    'css/index/template/beauty.css'
        //]]
        //['js/item.mangguo.min.js', [
        //    'js/temp/item_wx_share.js',
        //    'js/temp/cart-snapid.js',
        //    'js/temp/item.js'
        //]],
        //['js/index.mangguo.min.js', [
        //    'js/temp/index.js',
        //    'js/temp/index-template.js',
        //    'js/temp/item-top.js'
        //]],
        // ['js/index.beauty.min.js', [
        //     'js/components/itemlist/render.js',
        //     'js/index/index-cover.js',
        //     'js/index/default/classify-panel.js',
        //     'js/index/template/beauty.js',
        //     'js/index/default/index-cart.js',
        //     'js/index/default/index-coupons.js',
        //     'js/index/default/index-template.js',
        //     'js/index/default/item-top.js',
        //     'js/index/default/show-friend-shop.js'
        // ]],
        // ['css/combo/items.min.css', [
        //     'css/common/base.css',
        //     'css/index/index.css',
        //     'css/components/itemlist.css',
        //     'css/components/itemlist/common.css',
        //     'css/components/itemlist/large-pic.css',
        //     'css/components/itemlist/normal.css',
        //     'css/components/itemlist/single-column.css',
        // ]],
        // ['css/combo/index.default.min.css', [
        //     'css/common/base.css',
        //     'css/index/index.css',
        //     'css/components/itemlist.css',
        //     'css/components/itemlist/common.css',
        //     'css/components/itemlist/large-pic.css',
        //     'css/components/itemlist/normal.css',
        //     'css/components/itemlist/single-column.css',
        //     'css/components/menubar/normal.css',
        //     'css/components/navbar/normal.css',
        //     'css/components/navbar/type-text.css',
        //     'css/components/advert/normal.css',
        //     'css/components/advert/single.css',
        //     'css/components/advert/slider.css',
        //     'css/components/menubar/normal.css',
        //     'css/components/diary/normal.css',
        //     'css/components/coupons/normal.css',
        //     'css/components/banner/index.css',
        //     'css/components/shopInfo/default.css',
        //     'css/components/shopInfo/center.css',
        //     'css/components/shopInfo/simple.css',
        //     'css/components/figure/default.css',
        //     'css/components/figure/center.css'
        //     //'css/index/index-coupons.css'
        // ]]
    ]
};

// 用于 gulp concat
// module.exports = {
//     pre: 'dist/',
//     files: [
//         //首屏加载阻塞js
//         ['first.min.js',[
//             'js/index/index-cover.js',
//             'js/index/default/index.js',
//             'js/index/default/component-config.js',
//             'js/index/default/index-template.js',
//
//             'js/components/header/signage.js',
//             'js/components/item/itemList.js',
//             'js/components/navbar/normal.js',
//             'js/components/advert/single.js',
//             'js/components/advert/slider.js',
//             'js/components/advert/normal.js',
//             'js/components/navbar/type-text.js',
//             'js/components/item/recommend.js',
//             'js/components/banner/index.js',
//             'js/components/figure/index.js',
//             'js/components/shopInfo/index.js',
//             'js/components/diary/render.js',
//             'js/components/coupons/normal.js',
//             'js/components/menubar/normal.js',
//             'js/components/custombar/normal.js',
//             'js/components/search/index.js',
//             'js/components/activity/index.js',
//             'js/components/shop-entry/index.js',
//             'js/components/content/index.js',
//             // 'js/components/advert/hotArea.js',
//
//             'js/components/advanced/item-render-class.js',
//             'js/components/advanced/seckill-activity.js',
//             'js/components/advanced/slider.js',
//             'js/components/advanced/suggest-rank.js',
//             'js/components/advanced/tabs.js',
//             'js/components/advanced/three-columns.js',
//             'js/components/advanced/list-album.js',
//             'js/components/advanced/two-column-album.js',
//             'js/components/advanced/slide-album.js',
//             'js/components/advanced/mixed-row.js',
//             'js/components/advanced/slide-img-navbar.js',
//
//             'js/common/touch-panel.js',
//             'js/common/sliderBox.js',
//             'js/common/jweixin-1.0.0.js',
//
//         ]],
//         //首屏直抒的js文件
//         ['firstCommon.min.js',[
//             'js/common/topBar.js',
//             'js/common/watcher.js',
//             'js/common/zepto/zepto.js',
//             'js/common/zepto/fx.js',
//             'js/common/zepto/fx-methods.js',
//             'js/common/component_support.js',
//             'js/common/sanitize.js',
//             'js/common/doLogin.js',
//             'js/common/cookie.js',
//             'js/common/utils.js',
//             'js/common/preload.js',
//             'js/common/flexible.js',
//         ]],
//         //首屏异步加载的文件
//         ['async.min.js',[
//             'js/common/iscroll.js',
//             'js/common/jroll.js',
//             'js/common/VTrace.js',
//             'js/common/wdNativeShare.js',
//             'js/common/ui/alert.js',
//             'js/common/jumpUtil.js',
//             'js/common/ui/toast.js',
//             'js/common/ui/confirm.js',
//             'js/common/coupons_handler.js',
//             'js/common/favorite.js',
//             'js/common/piwik.js',
//             'js/common/myShop.js',
//             'js/common/newCart.js',
//             'js/common/lazyload.js',
//             'js/common/wd_discount.js',
//             'js/common/showMPQRCode.js',
//             'js/common/date.js',
//             'js/common/nation-flag.js',
//             'js/common/wd-buyer-downloader.js',
//             'js/common/upload-app.js',
//             'js/common/historyBack.js',
//         ]],
// 		//第三方插件库
//         ['lib.min.js', [
//             'js/common/swiper.js'
//         ]],
//         //公用common类库
//         ['common.min.js', [
//             'js/common/platfrom.js',
//             'js/common/slidedown.js',
//             'js/common/ui/loading.js',
//             'js/common/ui/shareTips.js',
//             'js/common/video.js',
//             'js/common/video2.js',
//             'js/common/notice-unpay.js',
//             'js/common/wx-share-plugin.js',
//             'js/common/flyEffect.js',
//             'js/common/time.js',
//             'js/common/cart-server.js',
//             'js/common/jsbridgeManager.js',
//             'js/index/default/index-coupons.js',
//             'js/components/item/multi-sku.js',
//         ]],
//         //店铺页公用js
//         ['index.min.js', [
//             'js/index/default/classify-panel.js',
//             'js/index/default/index-cart.js'
//         ]],
//         //超市模板js
//         ['supermarket.min.js', [
//             'js/index/supermarket/cart.js',
//             'js/index/supermarket/cart-refresh-cookie.js',
//             'js/index/supermarket/cart-refresh-server.js',
//             'js/index/supermarket/index.js',
//             'js/index/supermarket/order.js',
//             'js/index/supermarket/sku.js'
//         ]],
//         //个人模板
//         ['index.personal.js', [
//             'js/index/personal/commodityList.js',
//             'js/index/personal/diaryList.js',
//             'js/index/personal/galleryList.js',
//             'js/index/personal/index.js'
//         ]],
//         //超市模板css
//         ['supermarket.min.css', [
//             'css/common/base.css',
//             'css/index/index.css',
//             'css/index/supermarket/supermarket.css'
//         ], 'css/combo/']
//     ]
// };
