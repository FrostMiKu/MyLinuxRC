"use strict";var bgGa={init:function(){this.onInfinityGaReady()},onInfinityGaReady:function(){var n=chrome.runtime.getManifest(),a=chrome.i18n.getUILanguage(),e=n.version,t=new InfinityGa({trackingId:"UA-54537742-7"});t.pageview({page:"/background/background.html"}),t.event({category:"版本",action:e}),infinity.onMessage("ga-search",function(n){t.event({category:"搜索",action:n.name,label:a})}),infinity.onMessage("ga-add-icon",function(e){var i=void 0;try{if(0<=e.url.indexOf("infinitynewtab.com"))i=url;else i=new URL(e.url).host}catch(n){i=e.url}t.event({category:"添加网站",action:e.type,label:i}),t.event({category:"网站添加排行",action:a,label:i})})}};bgGa.init();