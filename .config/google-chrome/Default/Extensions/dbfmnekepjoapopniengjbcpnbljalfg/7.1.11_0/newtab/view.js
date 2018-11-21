"use strict";infinity.isMac=0<=navigator.platform.indexOf("Mac");var supportApps=["weather","todos","settings","notes","history","extension","bookmarks","gmail"],lethargyX=new Lethargy,lethargyY=new Lethargy(null,40,null,null),iView={isSliding:!1,slideSpeed:580,width:"1100px",_width:1100,isLockSlide:!1,init:function(){var r=this;$(document).on("mousewheel DOMMouseScroll wheel MozMousePixelScroll",".content",function(i,n){if(i.stopPropagation(),i.preventDefault(),_app.data.totalPages){var t=i.originalEvent,e=t.deltaX,a=t.deltaY,o=void 0,s=void 0;Math.abs(e)>Math.abs(a)?(o=lethargyX.check({deltaY:e}),s=0<e?-1:1):(o=lethargyY.check(i),s=0<a?-1:1),1==_app.data.totalPages?r.handleOnePageSlide(o):infinity.isMac?(1!=o||r.isSliding||r.slideToRight(function(){r.setPoniter()}),-1!=o||r.isSliding||r.slideToLeft(function(){r.setPoniter()})):(1!=s||r.isSliding||r.slideToRight(function(){r.setPoniter()}),-1!=s||r.isSliding||r.slideToLeft(function(){r.setPoniter()}))}}),$("#search-input").on("keydown",function(i){""!=i.target.value?r.isLockSlide=!0:r.isLockSlide=!1}),$("#search-input").on("blur",function(i){r.isLockSlide=!1}),$(document).on("keydown",function(i){!_app.data.totalPages||r.isLockSlide||(37!=i.which||r.isSliding||r.slideToRight(function(){r.setPoniter()}),39!=i.which||r.isSliding||r.slideToLeft(function(){r.setPoniter()}))}),r.onResize(),r.onClickIcon(),r.iLinkInit(),r.iInputClearInit(),r.handleMessage(),r.randowmWallpaper(),r.handlePointer(),r.onUpdate();try{document.getElementById("search-input").focus()}catch(i){}document.oncontextmenu=function(i){"INPUT"!=i.target.nodeName.toUpperCase()&&"TEXTAREA"!=i.target.nodeName.toUpperCase()&&i.preventDefault()}},iLinkInit:function(){$(document).on("click",".i-link",function(i){i.preventDefault();var n=$(this).attr("data-target"),t=$(this).attr("data-href");t&&infinity.open(n,t,i)})},iInputClearInit:function(){$(document).on("input",".i-input-clear input",function(){""!=$(this).val()&&$(this).parent().children("i.i-clear").show()}),$(document).on("click",".i-clear",function(i){i.preventDefault();var n=$(this).parent().children("input")[0];n.value="",n.focus(),$(this).hide()})},setPoniter:function(){$(".point-item").removeClass("point-select-true"),$(".point-item:nth-child("+(_app.data.currentPage+1)+")").addClass("point-select-true")},onResize:function(){var i=$.throttle(0,_app.setZoom);window.onresize=function(){i()}},handleOnePageSlide:function(i){var n=this;function t(i){n.isSliding=!0,$(".point-item:only-child").addClass("point-item-show-important"),$(".group-out").transition({x:i},240,function(){$(".group-out").transition({x:"0"},300,function(){$(".point-item:only-child").removeClass("point-item-show-important"),setTimeout(function(){n.isSliding=!1},0)})})}1!=i||n.isSliding||t("90px"),-1!=i||n.isSliding||t("-90px")},slideToPage:function(i,n,t){var e=this;_app.data.currentPage=i;var a=-1*parseInt(e.width)*_app.data.currentPage;$(".group-out").transition({x:a,duration:n,easing:"easeOutBack",complete:function(){e.setPoniter(),t&&t(),setTimeout(function(){e.isSliding=!1},0)}})},slideToLeft:function(i){var n=this;n.isSliding=!0;var t=null;_app.data.currentPage+1===_app.data.totalPages&&(t=$(".group:first").clone(),$(".group-out").append(t)),$(".group-out").transition({x:"-="+n.width,duration:n.slideSpeed,easing:"easeOutBack",complete:function(){_app.data.currentPage+1===_app.data.totalPages?($(".group-out").transition({x:0,duration:0}),t.remove(),_app.data.currentPage=0):_app.data.currentPage+=1,i&&i(),setTimeout(function(){n.isSliding=!1},0)}})},slideToRight:function(i){var n=this;n.isSliding=!0;var t=null;if(0===_app.data.currentPage){var e=$(".group:last").clone();t=$('<div class="group-first"></div>'),$(".group-out").prepend(t),t.html(e)}$(".group-out").transition({x:"+="+n.width,duration:n.slideSpeed,easing:"easeOutBack",complete:function(){try{t.remove(),$(".group-out").css({transform:"translate("+-(_app.data.totalPages-1)*n._width+"px, 0px)"}),_app.data.currentPage=_app.data.totalPages}catch(i){}_app.data.currentPage-=1,i&&i(),setTimeout(function(){n.isSliding=!1},50)}})},handlePointer:function(){var t=this;$(document).on("click",".point-item",function(i){i.preventDefault();var n=parseInt(i.target.dataset.index);t.slideToPage(n,500,function(){})})},showCover:function(){this.isLockSlide=!0,infinity.fadeIn(".masking-cover","block","0.2s",function(){})},hideCover:function(){infinity.fadeOut(".masking-cover","none","0.2s",function(){$(".masking-cover").hide(),self.isLockSlide=!1})},requestPermissionAndOpen:function(n){var t=this;"history"==n?chrome.permissions.request({permissions:["history"]},function(i){i?infinity.import(n,".side-all",function(){$(".i-"+n).removeClass("i-side-hide"),$(".i-"+n)[0].offsetHeight,$(".i-"+n).addClass("i-side-show")}):t.hideCover()}):"bookmarks"==n&&chrome.permissions.request({permissions:["bookmarks"]},function(i){i?infinity.import(n,".side-all",function(){$(".i-"+n).removeClass("i-side-hide"),$(".i-"+n)[0].offsetHeight,$(".i-"+n).addClass("i-side-show")}):t.hideCover()})},isSupport:function(t){return supportApps.some(function(i,n){return i==t})},onClickIcon:function(){var a=this;$(document).on("mousedown",".item-icon",function(i){try{if(1==i.button){var n=JSON.parse(decodeURIComponent($(this).attr("data-icon"))).url;0==n.indexOf("http://")||0==n.indexOf("https://")?chrome.tabs.create({url:n,active:!1}):i.target.click(),i.preventDefault()}}catch(i){}}),$(document).on("click",".item-icon",function(i){i.preventDefault();try{var n=JSON.parse(decodeURIComponent($(this).attr("data-icon"))).url;if(0==n.indexOf("infinity://")){var t=n.replace("infinity://","");if(a.isSupport(t)){if("gmail"==t)return void infinity.open("isOpenLinkInNewTab","https://mail.google.com/mail/u/0/#inbox",i);a.showCover(),"chrome-apps"==t&&(t="extension"),"extension"==t&&infinity.browser,"history"==t||"bookmarks"==t?a.requestPermissionAndOpen(t):infinity.import(t,".side-all",function(){$(".i-"+t).removeClass("i-side-hide"),$(".i-"+t)[0].offsetHeight,$(".i-"+t).addClass("i-side-show")})}else{var e=void 0;e="Chrome"==infinity.browser?'&nbsp;<a class="i-link" data-href="https://chrome.google.com/webstore/detail/infinity-new-tab-pro/nnnkddnnlpamobajfibfdgfnbcnkgngh" data-target="_blank">Infinity New Tab (Pro)</a>':'&nbsp;<a class="i-link" data-href="https://addons.mozilla.org/firefox/addon/infinity-new-tab-pro-firefox/" data-target="_blank">Infinity New Tab (Pro)</a>',infinity.alert({html:infinity.i18n("not_support",e),isShowCloseBtn:!0,isShowOkBtn:!0,okBtn:infinity.i18n("got_it"),isShowBackCover:!0})}}else 0==n.indexOf("app://")?chrome.management.launchApp(n.replace("app://",""),function(){chrome.runtime.lastError&&infinity.alert({html:infinity.i18n("you_never_install_this_app"),autoCloseTime:1})}):infinity.open("isOpenLinkInNewTab",n,i)}catch(i){}}),$(".home-btn").on("click",function(i){i.preventDefault(),a.showCover(),infinity.import("add",".side-all",function(){$(".i-add").removeClass("i-side-hide"),$(".i-add")[0].offsetHeight,$(".i-add").addClass("i-side-show"),$(".main").addClass("main-move")})}),$(".masking-cover").on("click",function(i){i.preventDefault(),a.hideSideBar()}),$(document).on("transitionend",".i-side",function(i){0<=i.target.className.indexOf("i-only-side")&&i.target.className.indexOf("i-side-show")<0&&$(i.target).addClass("i-side-hide")})},hideSideBar:function(){this.hideCover(),$(".i-side").removeClass("i-side-show"),$(".main").removeClass("main-move")},handleMessage:function(){var t=this;infinity.onMessage("updateGmailUnreadNum",function(){infinity.settings.load(),infinity.css.render()}),infinity.onMessage("updateLayout",function(){infinity.settings.load();var i=infinity.get("infinity-icons");_app.data.groups=i,_app.data.currentPage=0,_app.render(),t.slideToPage(0,0),$(".point-in").css("opacity","1")}),infinity.onMessage("settingChange",function(i){infinity.settings.load(),infinity.css.render(),i.type,_app.initTopBar(),"isShowSearchBtn"==i.type&&Search&&Search.reloadSetting()}),infinity.onMessage("icon-handle",function(i){var n=infinity.get("infinity-icons");_app.data.groups=n,_app.render(),"delete"!=i.type&&"drag"!=i.type||t.slideToPage(i.page,0)}),infinity.onMessage("onRecoverySetView",function(){infinity.settings.load(),infinity.css.render(),$(".bg").addClass("bg-transition"),_app.setWallpaper();var i=infinity.get("infinity-icons");_app.data.groups=i,_app.data.currentPage=0,_app.render(),t.slideToPage(0,0),_app.initTopBar(),SETTING.isShowTopBar&&"bookmarks"==SETTING.topBarType&&infinity.import("top-bookmarks","#bookmarkbar",function(){},!0)})},getRandomWallpaper:function(){var i=Math.floor(4050*Math.random())+1,n=infinity.wallpaper+"/wallpaper/"+i+".jpg";return infinity.setting("random-wallpaper",n),n},randowmWallpaper:function(){var e=this;windmill.init({el:document.getElementById("windmill"),maxSpeed:.66,accSpeed:.001,clockwise:!1}),$(".random-windmill").click(function(i){var n=e.getRandomWallpaper(),t=new Image;t.src=n,windmill.startRotateWindmill(),t.onload=function(){t.remove(),infinity.setting("wallpaperType","random"),setTimeout(function(){infinity.sendMessage("wallpaperChange"),infinity.sendMessage("backupToCloud")},500),setTimeout(function(){windmill.endRotateWindmill()},200)}})},onUpdate:function(){try{"on"==localStorage.showUpdateNote&&(localStorage.showUpdateNote="off",infinity.alert({html:"<div><br>"+infinity.i18n("we_update")+"<br><br><b>"+infinity.i18n("you_can_set_view")+"</b><br><br>"+infinity.i18n("feedback_us")+'<input class="can-select" type="text" readonly value="infinitynewtab@gmail.com" /></div>',isShowOkBtn:!0,isShowCloseBtn:!0}))}catch(i){}}};iView.init();