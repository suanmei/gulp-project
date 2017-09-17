module.exports = {
    pre: 'dist/',
    files: [
        //首屏加载阻塞js
        ['first.min.js',[
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
            // 'js/components/advert/hotArea.js',

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
        ['firstCommon.min.js',[
            'js/common/topBar.js',
            'js/common/watcher.js',
            'js/common/zepto/zepto.js',
            'js/common/zepto/fx.js',
            'js/common/zepto/fx-methods.js',
            'js/common/component_support.js',
            'js/common/sanitize.js',
            'js/common/doLogin.js',
            'js/common/cookie.js',
            'js/common/utils.js',
            'js/common/preload.js',
            'js/common/flexible.js',
        ]],
        //首屏异步加载的文件
        ['async.min.js',[
            'js/common/iscroll.js',
            'js/common/jroll.js',
            'js/common/VTrace.js',
            'js/common/wdNativeShare.js',
            'js/common/ui/alert.js',
            'js/common/jumpUtil.js',
            'js/common/ui/toast.js',
            'js/common/ui/confirm.js',
            'js/common/coupons_handler.js',
            'js/common/favorite.js',
            'js/common/piwik.js',
            'js/common/myShop.js',
            'js/common/newCart.js',
            'js/common/lazyload.js',
            'js/common/wd_discount.js',
            'js/common/showMPQRCode.js',
            'js/common/date.js',
            'js/common/nation-flag.js',
            'js/common/wd-buyer-downloader.js',
            'js/common/upload-app.js',
            'js/common/historyBack.js',
        ]],
		//第三方插件库
        ['lib.min.js', [
            'js/common/swiper.js'
        ]],
        //公用common类库
        ['common.min.js', [
            'js/common/platfrom.js',
            'js/common/slidedown.js',
            'js/common/ui/loading.js',
            'js/common/ui/shareTips.js',
            'js/common/video.js',
            'js/common/video2.js',
            'js/common/notice-unpay.js',
            'js/common/wx-share-plugin.js',
            'js/common/flyEffect.js',
            'js/common/time.js',
            'js/common/cart-server.js',
            'js/common/jsbridgeManager.js',
            'js/index/default/index-coupons.js',
            'js/components/item/multi-sku.js',
        ]],
        //店铺页公用js
        ['index.min.js', [
            'js/index/default/classify-panel.js',
            'js/index/default/index-cart.js'
        ]],
        //超市模板js
        ['supermarket.min.js', [
            'js/index/supermarket/cart.js',
            'js/index/supermarket/cart-refresh-cookie.js',
            'js/index/supermarket/cart-refresh-server.js',
            'js/index/supermarket/index.js',
            'js/index/supermarket/order.js',
            'js/index/supermarket/sku.js'
        ]],
        //个人模板
        ['index.personal.js', [
            'js/index/personal/commodityList.js',
            'js/index/personal/diaryList.js',
            'js/index/personal/galleryList.js',
            'js/index/personal/index.js'
        ]],
        //超市模板css
        ['supermarket.min.css', [
            'css/common/base.css',
            'css/index/index.css',
            'css/index/supermarket/supermarket.css'
        ], 'css/combo/']
    ]
};
