"function"!=typeof Object.create&&(Object.create=function(t){function e(){}return e.prototype=t,new e}),function(t,e,i){var s={init:function(e,i){var s=this;s.$elem=t(i),s.options=t.extend({},t.fn.BTQSlider.options,s.$elem.data(),e),s.userOptions=e,s.loadContent()},loadContent:function(){function e(t){var e,i="";if("function"==typeof s.options.jsonSuccess)s.options.jsonSuccess.apply(this,[t]);else{for(e in t.BTQ)t.BTQ.hasOwnProperty(e)&&(i+=t.BTQ[e].item);s.$elem.html(i)}s.logIn()}var i,s=this;"function"==typeof s.options.beforeInit&&s.options.beforeInit.apply(this,[s.$elem]),"string"==typeof s.options.jsonPath?(i=s.options.jsonPath,t.getJSON(i,e)):s.logIn()},logIn:function(){var t=this;t.$elem.data({"slide-originalStyles":t.$elem.attr("style"),"slide-originalClasses":t.$elem.attr("class")}),t.$elem.css({opacity:0}),t.orignalItems=t.options.items,t.checkBrowser(),t.wrapperWidth=0,t.checkVisible=null,t.setVars()},setVars:function(){var t=this;return 0===t.$elem.children().length?!1:(t.baseClass(),t.eventTypes(),t.$userItems=t.$elem.children(),t.itemsAmount=t.$userItems.length,t.wrapItems(),t.$BTQItems=t.$elem.find(".slide-item"),t.$BTQWrapper=t.$elem.find(".slide-wrapper"),t.playDirection="next",t.prevItem=0,t.prevArr=[0],t.currentItem=0,t.customEvents(),void t.onStartup())},onStartup:function(){var t=this;t.updateItems(),t.calculateAll(),t.buildControls(),t.updateControls(),t.response(),t.moveEvents(),t.stopOnHover(),t.BTQStatus(),t.options.transitionStyle!==!1&&t.transitionTypes(t.options.transitionStyle),t.options.autoPlay===!0&&(t.options.autoPlay=5e3),t.play(),t.$elem.find(".slide-wrapper").css("display","block"),t.$elem.is(":visible")?t.$elem.css("opacity",1):t.watchVisibility(),t.onstartup=!1,t.eachMoveUpdate(),"function"==typeof t.options.afterInit&&t.options.afterInit.apply(this,[t.$elem])},eachMoveUpdate:function(){var t=this;t.options.lazyLoad===!0&&t.lazyLoad(),t.options.autoHeight===!0&&t.autoHeight(),t.onVisibleItems(),"function"==typeof t.options.afterAction&&t.options.afterAction.apply(this,[t.$elem])},updateVars:function(){var t=this;"function"==typeof t.options.beforeUpdate&&t.options.beforeUpdate.apply(this,[t.$elem]),t.watchVisibility(),t.updateItems(),t.calculateAll(),t.updatePosition(),t.updateControls(),t.eachMoveUpdate(),"function"==typeof t.options.afterUpdate&&t.options.afterUpdate.apply(this,[t.$elem])},reload:function(){var t=this;e.setTimeout(function(){t.updateVars()},0)},watchVisibility:function(){var t=this;return t.$elem.is(":visible")!==!1?!1:(t.$elem.css({opacity:0}),e.clearInterval(t.autoPlayInterval),e.clearInterval(t.checkVisible),void(t.checkVisible=e.setInterval(function(){t.$elem.is(":visible")&&(t.reload(),t.$elem.animate({opacity:1},200),e.clearInterval(t.checkVisible))},500)))},wrapItems:function(){var t=this;t.$userItems.wrapAll('<div class="slide-wrapper">').wrap('<div class="slide-item"></div>'),t.$elem.find(".slide-wrapper").wrap('<div class="slide-wrapper-outer">'),t.wrapperOuter=t.$elem.find(".slide-wrapper-outer"),t.$elem.css("display","inline-block")},baseClass:function(){var t=this,e=t.$elem.hasClass(t.options.baseClass),i=t.$elem.hasClass(t.options.theme);e||t.$elem.addClass(t.options.baseClass),i||t.$elem.addClass(t.options.theme)},updateItems:function(){var e,i,s=this;if(s.options.responsive===!1)return!1;if(s.options.singleItem===!0)return s.options.items=s.orignalItems=1,s.options.itemsCustom=!1,s.options.itemsDesktop=!1,s.options.itemsDesktopSmall=!1,s.options.itemsTablet=!1,s.options.itemsTabletSmall=!1,s.options.itemsMobile=!1,!1;if(e=t(s.options.responsiveBaseWidth).width(),e>(s.options.itemsDesktop[0]||s.orignalItems)&&(s.options.items=s.orignalItems),s.options.itemsCustom!==!1)for(s.options.itemsCustom.sort(function(t,e){return t[0]-e[0]}),i=0;i<s.options.itemsCustom.length;i+=1)s.options.itemsCustom[i][0]<=e&&(s.options.items=s.options.itemsCustom[i][1]);else e<=s.options.itemsDesktop[0]&&s.options.itemsDesktop!==!1&&(s.options.items=s.options.itemsDesktop[1]),e<=s.options.itemsDesktopSmall[0]&&s.options.itemsDesktopSmall!==!1&&(s.options.items=s.options.itemsDesktopSmall[1]),e<=s.options.itemsTablet[0]&&s.options.itemsTablet!==!1&&(s.options.items=s.options.itemsTablet[1]),e<=s.options.itemsTabletSmall[0]&&s.options.itemsTabletSmall!==!1&&(s.options.items=s.options.itemsTabletSmall[1]),e<=s.options.itemsMobile[0]&&s.options.itemsMobile!==!1&&(s.options.items=s.options.itemsMobile[1]);s.options.items>s.itemsAmount&&s.options.itemsScaleUp===!0&&(s.options.items=s.itemsAmount)},response:function(){var i,s,o=this;return o.options.responsive!==!0?!1:(s=t(e).width(),o.resizer=function(){t(e).width()!==s&&(o.options.autoPlay!==!1&&e.clearInterval(o.autoPlayInterval),e.clearTimeout(i),i=e.setTimeout(function(){s=t(e).width(),o.updateVars()},o.options.responsiveRefreshRate))},void t(e).resize(o.resizer))},updatePosition:function(){var t=this;t.jumpTo(t.currentItem),t.options.autoPlay!==!1&&t.checkAp()},appendItemsSizes:function(){var e=this,i=0,s=e.itemsAmount-e.options.items;e.$BTQItems.each(function(o){var n=t(this);n.css({width:e.itemWidth}).data("slide-item",Number(o)),(o%e.options.items===0||o===s)&&(o>s||(i+=1)),n.data("slide-roundPages",i)})},appendWrapperSizes:function(){var t=this,e=t.$BTQItems.length*t.itemWidth;t.$BTQWrapper.css({width:2*e,left:0}),t.appendItemsSizes()},calculateAll:function(){var t=this;t.calculateWidth(),t.appendWrapperSizes(),t.loops(),t.max()},calculateWidth:function(){var t=this;t.itemWidth=Math.round(t.$elem.width()/t.options.items)},max:function(){var t=this,e=-1*(t.itemsAmount*t.itemWidth-t.options.items*t.itemWidth);return t.options.items>t.itemsAmount?(t.maximumItem=0,e=0,t.maximumPixels=0):(t.maximumItem=t.itemsAmount-t.options.items,t.maximumPixels=e),e},min:function(){return 0},loops:function(){var e,i,s,o=this,n=0,a=0;for(o.positionsInArray=[0],o.pagesInArray=[],e=0;e<o.itemsAmount;e+=1)a+=o.itemWidth,o.positionsInArray.push(-a),o.options.scrollPerPage===!0&&(i=t(o.$BTQItems[e]),s=i.data("slide-roundPages"),s!==n&&(o.pagesInArray[n]=o.positionsInArray[e],n=s))},buildControls:function(){var e=this;(e.options.navigation===!0||e.options.pagination===!0)&&(e.BTQControls=t('<div class="slide-controls"/>').toggleClass("clickable",!e.browser.isTouch).appendTo(e.$elem)),e.options.pagination===!0&&e.buildPagination(),e.options.navigation===!0&&e.buildButtons()},buildButtons:function(){var e=this,i=t('<div class="slide-buttons"/>');e.BTQControls.append(i),e.buttonPrev=t("<div/>",{"class":"slide-prev",html:e.options.navigationText[0]||""}),e.buttonNext=t("<div/>",{"class":"slide-next",html:e.options.navigationText[1]||""}),i.append(e.buttonPrev).append(e.buttonNext),i.on("touchstart.BTQControls mousedown.BTQControls",'div[class^="slide"]',function(t){t.preventDefault()}),i.on("touchend.BTQControls mouseup.BTQControls",'div[class^="slide"]',function(i){i.preventDefault(),t(this).hasClass("slide-next")?e.next():e.prev()})},buildPagination:function(){var e=this;e.paginationWrapper=t('<div class="slide-pagination"/>'),e.BTQControls.append(e.paginationWrapper),e.paginationWrapper.on("touchend.BTQControls mouseup.BTQControls",".slide-page",function(i){i.preventDefault(),Number(t(this).data("slide-page"))!==e.currentItem&&e.goTo(Number(t(this).data("slide-page")),!0)})},updatePagination:function(){var e,i,s,o,n,a,r=this;if(r.options.pagination===!1)return!1;for(r.paginationWrapper.html(""),e=0,i=r.itemsAmount-r.itemsAmount%r.options.items,o=0;o<r.itemsAmount;o+=1)o%r.options.items===0&&(e+=1,i===o&&(s=r.itemsAmount-r.options.items),n=t("<div/>",{"class":"slide-page"}),a=t("<span></span>",{text:r.options.paginationNumbers===!0?e:"","class":r.options.paginationNumbers===!0?"slide-numbers":""}),n.append(a),n.data("slide-page",i===o?s:o),n.data("slide-roundPages",e),r.paginationWrapper.append(n));r.checkPagination()},checkPagination:function(){var e=this;return e.options.pagination===!1?!1:void e.paginationWrapper.find(".slide-page").each(function(){t(this).data("slide-roundPages")===t(e.$BTQItems[e.currentItem]).data("slide-roundPages")&&(e.paginationWrapper.find(".slide-page").removeClass("active"),t(this).addClass("active"))})},checkNavigation:function(){var t=this;return t.options.navigation===!1?!1:void(t.options.rewindNav===!1&&(0===t.currentItem&&0===t.maximumItem?(t.buttonPrev.addClass("disabled"),t.buttonNext.addClass("disabled")):0===t.currentItem&&0!==t.maximumItem?(t.buttonPrev.addClass("disabled"),t.buttonNext.removeClass("disabled")):t.currentItem===t.maximumItem?(t.buttonPrev.removeClass("disabled"),t.buttonNext.addClass("disabled")):0!==t.currentItem&&t.currentItem!==t.maximumItem&&(t.buttonPrev.removeClass("disabled"),t.buttonNext.removeClass("disabled"))))},updateControls:function(){var t=this;t.updatePagination(),t.checkNavigation(),t.BTQControls&&(t.options.items>=t.itemsAmount?t.BTQControls.hide():t.BTQControls.show())},destroyControls:function(){var t=this;t.BTQControls&&t.BTQControls.remove()},next:function(t){var e=this;if(e.isTransition)return!1;if(e.currentItem+=e.options.scrollPerPage===!0?e.options.items:1,e.currentItem>e.maximumItem+(e.options.scrollPerPage===!0?e.options.items-1:0)){if(e.options.rewindNav!==!0)return e.currentItem=e.maximumItem,!1;e.currentItem=0,t="rewind"}e.goTo(e.currentItem,t)},prev:function(t){var e=this;if(e.isTransition)return!1;if(e.options.scrollPerPage===!0&&e.currentItem>0&&e.currentItem<e.options.items?e.currentItem=0:e.currentItem-=e.options.scrollPerPage===!0?e.options.items:1,e.currentItem<0){if(e.options.rewindNav!==!0)return e.currentItem=0,!1;e.currentItem=e.maximumItem,t="rewind"}e.goTo(e.currentItem,t)},goTo:function(t,i,s){var o,n=this;return n.isTransition?!1:("function"==typeof n.options.beforeMove&&n.options.beforeMove.apply(this,[n.$elem]),t>=n.maximumItem?t=n.maximumItem:0>=t&&(t=0),n.currentItem=n.BTQ.currentItem=t,n.options.transitionStyle!==!1&&"drag"!==s&&1===n.options.items?(n.swapSpeed(0),n.browser.support3d===!0||"msie"==n.browser&&version>=10?n.transition3d(n.positionsInArray[t]):n.css2slide(n.positionsInArray[t],1),n.afterGo(),n.singleItemTransition(),!1):(o=n.positionsInArray[t],n.browser.support3d===!0?(n.isCss3Finish=!1,i===!0?(n.swapSpeed("paginationSpeed"),e.setTimeout(function(){n.isCss3Finish=!0},n.options.paginationSpeed)):"rewind"===i?(n.swapSpeed(n.options.rewindSpeed),e.setTimeout(function(){n.isCss3Finish=!0},n.options.rewindSpeed)):(n.swapSpeed("slideSpeed"),e.setTimeout(function(){n.isCss3Finish=!0},n.options.slideSpeed)),n.transition3d(o)):i===!0?n.css2slide(o,n.options.paginationSpeed):"rewind"===i?n.css2slide(o,n.options.rewindSpeed):n.css2slide(o,n.options.slideSpeed),void n.afterGo()))},jumpTo:function(t){var e=this;"function"==typeof e.options.beforeMove&&e.options.beforeMove.apply(this,[e.$elem]),t>=e.maximumItem||-1===t?t=e.maximumItem:0>=t&&(t=0),e.swapSpeed(0),e.browser.support3d===!0?e.transition3d(e.positionsInArray[t]):e.css2slide(e.positionsInArray[t],1),e.currentItem=e.BTQ.currentItem=t,e.afterGo()},afterGo:function(){var t=this;t.prevArr.push(t.currentItem),t.prevItem=t.BTQ.prevItem=t.prevArr[t.prevArr.length-2],t.prevArr.shift(0),t.prevItem!==t.currentItem&&(t.checkPagination(),t.checkNavigation(),t.eachMoveUpdate(),t.options.autoPlay!==!1&&t.checkAp()),"function"==typeof t.options.afterMove&&t.prevItem!==t.currentItem&&t.options.afterMove.apply(this,[t.$elem])},stop:function(){var t=this;t.apStatus="stop",e.clearInterval(t.autoPlayInterval)},checkAp:function(){var t=this;"stop"!==t.apStatus&&t.play()},play:function(){var t=this;return t.apStatus="play",t.options.autoPlay===!1?!1:(e.clearInterval(t.autoPlayInterval),void(t.autoPlayInterval=e.setInterval(function(){t.next(!0)},t.options.autoPlay)))},swapSpeed:function(t){var e=this;"slideSpeed"===t?e.$BTQWrapper.css(e.addCssSpeed(e.options.slideSpeed)):"paginationSpeed"===t?e.$BTQWrapper.css(e.addCssSpeed(e.options.paginationSpeed)):"string"!=typeof t&&e.$BTQWrapper.css(e.addCssSpeed(t))},addCssSpeed:function(t){return{"-webkit-transition":"all "+t+"ms ease","-moz-transition":"all "+t+"ms ease","-o-transition":"all "+t+"ms ease",transition:"all "+t+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(t){return{"-webkit-transform":"translate3d("+t+"px, 0px, 0px)","-moz-transform":"translate3d("+t+"px, 0px, 0px)","-o-transform":"translate3d("+t+"px, 0px, 0px)","-ms-transform":"translate3d("+t+"px, 0px, 0px)",transform:"translate3d("+t+"px, 0px,0px)"}},transition3d:function(t){var e=this;e.$BTQWrapper.css(e.doTranslate(t))},css2move:function(t){var e=this;e.$BTQWrapper.css({left:t})},css2slide:function(t,e){var i=this;i.isCssFinish=!1,i.$BTQWrapper.stop(!0,!0).animate({left:t},{duration:e||i.options.slideSpeed,complete:function(){i.isCssFinish=!0}})},checkBrowser:function(){var t,s,o,n,a=this,r="translate3d(0px, 0px, 0px)",p=i.createElement("div");p.style.cssText="  -moz-transform:"+r+"; -ms-transform:"+r+"; -o-transform:"+r+"; -webkit-transform:"+r+"; transform:"+r,t=/translate3d\(0px, 0px, 0px\)/g,s=p.style.cssText.match(t),o=null!==s&&s.length>=1&&s.length<=2,n="ontouchstart"in e||e.navigator.msMaxTouchPoints,a.browser={support3d:o,isTouch:n}},moveEvents:function(){var t=this;(t.options.mouseDrag!==!1||t.options.touchDrag!==!1)&&(t.gestures(),t.disabledEvents())},eventTypes:function(){var t=this,e=["s","e","x"];t.ev_types={},t.options.mouseDrag===!0&&t.options.touchDrag===!0?e=["touchstart.BTQ mousedown.BTQ","touchmove.BTQ mousemove.BTQ","touchend.BTQ touchcancel.BTQ mouseup.BTQ"]:t.options.mouseDrag===!1&&t.options.touchDrag===!0?e=["touchstart.BTQ","touchmove.BTQ","touchend.BTQ touchcancel.BTQ"]:t.options.mouseDrag===!0&&t.options.touchDrag===!1&&(e=["mousedown.BTQ","mousemove.BTQ","mouseup.BTQ"]),t.ev_types.start=e[0],t.ev_types.move=e[1],t.ev_types.end=e[2]},disabledEvents:function(){var e=this;e.$elem.on("dragstart.BTQ",function(t){t.preventDefault()}),e.$elem.on("mousedown.disableTextSelect",function(e){return t(e.target).is("input, textarea, select, option")})},gestures:function(){function s(t){if(void 0!==t.touches)return{x:t.touches[0].pageX,y:t.touches[0].pageY};if(void 0===t.touches){if(void 0!==t.pageX)return{x:t.pageX,y:t.pageY};if(void 0===t.pageX)return{x:t.clientX,y:t.clientY}}}function o(e){"on"===e?(t(i).on(p.ev_types.move,a),t(i).on(p.ev_types.end,r)):"off"===e&&(t(i).off(p.ev_types.move),t(i).off(p.ev_types.end))}function n(i){var n,a=i.originalEvent||i||e.event;if(3===a.which)return!1;if(!(p.itemsAmount<=p.options.items)){if(p.isCssFinish===!1&&!p.options.dragBeforeAnimFinish)return!1;if(p.isCss3Finish===!1&&!p.options.dragBeforeAnimFinish)return!1;p.options.autoPlay!==!1&&e.clearInterval(p.autoPlayInterval),p.browser.isTouch===!0||p.$BTQWrapper.hasClass("grabbing")||p.$BTQWrapper.addClass("grabbing"),p.newPosX=0,p.newRelativeX=0,t(this).css(p.removeTransition()),n=t(this).position(),l.relativePos=n.left,l.offsetX=s(a).x-n.left,l.offsetY=s(a).y-n.top,o("on"),l.sliding=!1,l.targetElement=a.target||a.srcElement}}function a(o){var n,a,r=o.originalEvent||o||e.event;p.newPosX=s(r).x-l.offsetX,p.newPosY=s(r).y-l.offsetY,p.newRelativeX=p.newPosX-l.relativePos,"function"==typeof p.options.startDragging&&l.dragging!==!0&&0!==p.newRelativeX&&(l.dragging=!0,p.options.startDragging.apply(p,[p.$elem])),(p.newRelativeX>8||p.newRelativeX<-8)&&p.browser.isTouch===!0&&(void 0!==r.preventDefault?r.preventDefault():r.returnValue=!1,l.sliding=!0),(p.newPosY>10||p.newPosY<-10)&&l.sliding===!1&&t(i).off("touchmove.BTQ"),n=function(){return p.newRelativeX/5},a=function(){return p.maximumPixels+p.newRelativeX/5},p.newPosX=Math.max(Math.min(p.newPosX,n()),a()),p.browser.support3d===!0?p.transition3d(p.newPosX):p.css2move(p.newPosX)}function r(i){var s,n,a,r=i.originalEvent||i||e.event;r.target=r.target||r.srcElement,l.dragging=!1,p.browser.isTouch!==!0&&p.$BTQWrapper.removeClass("grabbing"),p.newRelativeX<0?p.dragDirection=p.BTQ.dragDirection="left":p.dragDirection=p.BTQ.dragDirection="right",0!==p.newRelativeX&&(s=p.getNewPosition(),p.goTo(s,!1,"drag"),l.targetElement===r.target&&p.browser.isTouch!==!0&&(t(r.target).on("click.disable",function(e){e.stopImmediatePropagation(),e.stopPropagation(),e.preventDefault(),t(e.target).off("click.disable")}),n=t._data(r.target,"events").click,a=n.pop(),n.splice(0,0,a))),o("off")}var p=this,l={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};p.isCssFinish=!0,p.$elem.on(p.ev_types.start,".slide-wrapper",n)},getNewPosition:function(){var t=this,e=t.closestItem();return e>t.maximumItem?(t.currentItem=t.maximumItem,e=t.maximumItem):t.newPosX>=0&&(e=0,t.currentItem=0),e},closestItem:function(){var e=this,i=e.options.scrollPerPage===!0?e.pagesInArray:e.positionsInArray,s=e.newPosX,o=null;return t.each(i,function(n,a){s-e.itemWidth/20>i[n+1]&&s-e.itemWidth/20<a&&"left"===e.moveDirection()?(o=a,e.options.scrollPerPage===!0?e.currentItem=t.inArray(o,e.positionsInArray):e.currentItem=n):s+e.itemWidth/20<a&&s+e.itemWidth/20>(i[n+1]||i[n]-e.itemWidth)&&"right"===e.moveDirection()&&(e.options.scrollPerPage===!0?(o=i[n+1]||i[i.length-1],e.currentItem=t.inArray(o,e.positionsInArray)):(o=i[n+1],e.currentItem=n+1))}),e.currentItem},moveDirection:function(){var t,e=this;return e.newRelativeX<0?(t="right",e.playDirection="next"):(t="left",e.playDirection="prev"),t},customEvents:function(){var t=this;t.$elem.on("BTQ.next",function(){t.next()}),t.$elem.on("BTQ.prev",function(){t.prev()}),t.$elem.on("BTQ.play",function(e,i){t.options.autoPlay=i,t.play(),t.hoverStatus="play"}),t.$elem.on("BTQ.stop",function(){t.stop(),t.hoverStatus="stop"}),t.$elem.on("BTQ.goTo",function(e,i){t.goTo(i)}),t.$elem.on("BTQ.jumpTo",function(e,i){t.jumpTo(i)})},stopOnHover:function(){var t=this;t.options.stopOnHover===!0&&t.browser.isTouch!==!0&&t.options.autoPlay!==!1&&(t.$elem.on("mouseover",function(){t.stop()}),t.$elem.on("mouseout",function(){"stop"!==t.hoverStatus&&t.play()}))},lazyLoad:function(){var e,i,s,o,n,a=this;if(a.options.lazyLoad===!1)return!1;for(e=0;e<a.itemsAmount;e+=1)i=t(a.$BTQItems[e]),"loaded"!==i.data("slide-loaded")&&(s=i.data("slide-item"),o=i.find(".lazyload"),"string"==typeof o.data("src")?(void 0===i.data("slide-loaded")&&(o.hide(),i.addClass("loading").data("slide-loaded","checked")),n=a.options.lazyFollow===!0?s>=a.currentItem:!0,n&&s<a.currentItem+a.options.items&&o.length&&o.each(function(){a.lazyPreload(i,t(this))})):i.data("slide-loaded","loaded"))},lazyPreload:function(t,i){function s(){t.data("slide-loaded","loaded").removeClass("loading"),i.removeAttr("data-src"),"fade"===a.options.lazyEffect?(i.fadeIn(400),i.parent().parent().fadeIn(400),i.parent().fadeIn(400)):(i.show(),i.parent().parent().show(),i.parent().show()),"function"==typeof a.options.afterLazyLoad&&a.options.afterLazyLoad.apply(this,[a.$elem])}function o(){r+=1,a.completeImg(i.get(0))||n===!0?s():100>=r?e.setTimeout(o,100):s()}var n,a=this,r=0;"DIV"===i.prop("tagName")?(i.css("background-image","url("+i.data("src")+")"),n=!0):i[0].src=i.data("src"),o()},autoHeight:function(){function i(){var i=t(n.$BTQItems[n.currentItem]).height();n.wrapperOuter.css("height",i+"px"),n.wrapperOuter.hasClass("autoheight")||e.setTimeout(function(){n.wrapperOuter.addClass("autoheight")},0)}function s(){o+=1,n.completeImg(a.get(0))?i():100>=o?e.setTimeout(s,100):n.wrapperOuter.css("height","")}var o,n=this,a=t(n.$BTQItems[n.currentItem]).find("img");void 0!==a.get(0)?(o=0,s()):i()},completeImg:function(t){var e;return t.complete?(e=typeof t.naturalWidth,"undefined"!==e&&0===t.naturalWidth?!1:!0):!1},onVisibleItems:function(){var e,i=this;for(i.options.addClassActive===!0&&i.$BTQItems.removeClass("active"),i.visibleItems=[],e=i.currentItem;e<i.currentItem+i.options.items;e+=1)i.visibleItems.push(e),i.options.addClassActive===!0&&t(i.$BTQItems[e]).addClass("active");i.BTQ.visibleItems=i.visibleItems},transitionTypes:function(t){var e=this;e.outClass="slide-"+t+"-out",e.inClass="slide-"+t+"-in"},singleItemTransition:function(){function t(t){return{position:"relative",left:t+"px"}}var e=this,i=e.outClass,s=e.inClass,o=e.$BTQItems.eq(e.currentItem),n=e.$BTQItems.eq(e.prevItem),a=Math.abs(e.positionsInArray[e.currentItem])+e.positionsInArray[e.prevItem],r=Math.abs(e.positionsInArray[e.currentItem])+e.itemWidth/2,p="webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";e.isTransition=!0,e.$BTQWrapper.addClass("slide-origin").css({"-webkit-transform-origin":r+"px","-moz-perspective-origin":r+"px","perspective-origin":r+"px"}),n.css(t(a,10)).addClass(i).on(p,function(){e.endPrev=!0,n.off(p),e.clearTransStyle(n,i)}),o.addClass(s).on(p,function(){e.endCurrent=!0,o.off(p),e.clearTransStyle(o,s)})},clearTransStyle:function(t,e){var i=this;t.css({position:"",left:""}).removeClass(e),i.endPrev&&i.endCurrent&&(i.$BTQWrapper.removeClass("slide-origin"),i.endPrev=!1,i.endCurrent=!1,i.isTransition=!1)},BTQStatus:function(){var t=this;t.BTQ={userOptions:t.userOptions,baseElement:t.$elem,userItems:t.$userItems,BTQItems:t.$BTQItems,currentItem:t.currentItem,prevItem:t.prevItem,visibleItems:t.visibleItems,isTouch:t.browser.isTouch,browser:t.browser,dragDirection:t.dragDirection}},clearEvents:function(){var s=this;s.$elem.off(".slide mousedown.disableTextSelect"),t(i).off(".slide"),t(e).off("resize",s.resizer)},unWrap:function(){var t=this;0!==t.$elem.children().length&&(t.$BTQWrapper.unwrap(),t.$userItems.unwrap().unwrap(),t.BTQControls&&t.BTQControls.remove()),t.clearEvents(),t.$elem.attr({style:t.$elem.data("slide-originalStyles")||"","class":t.$elem.data("slide-originalClasses")})},destroy:function(){var t=this;t.stop(),e.clearInterval(t.checkVisible),t.unWrap(),t.$elem.removeData()},reinit:function(e){var i=this,s=t.extend({},i.userOptions,e);i.unWrap(),i.init(s,i.$elem)},addItem:function(t,e){var i,s=this;return t?0===s.$elem.children().length?(s.$elem.append(t),s.setVars(),!1):(s.unWrap(),i=void 0===e||-1===e?-1:e,i>=s.$userItems.length||-1===i?s.$userItems.eq(-1).after(t):s.$userItems.eq(i).before(t),void s.setVars()):!1},removeItem:function(t){var e,i=this;return 0===i.$elem.children().length?!1:(e=void 0===t||-1===t?-1:t,i.unWrap(),i.$userItems.eq(e).remove(),void i.setVars())}};t.fn.BTQSlider=function(e){return this.each(function(){if(t(this).data("slide-init")===!0)return!1;t(this).data("slide-init",!0);var i=Object.create(s);i.init(e,this),t.data(this,"BTQSlider",i)})},t.fn.BTQSlider.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1e3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:e,baseClass:"slide-slidebox",theme:"",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}}(jQuery,window,document),function(t,e,i){e.Accordion=function(t,i){this.$el=e(i),this.$items=this.$el.children("ul").children("li"),this.itemsCount=this.$items.length,this._init(t)},e.Accordion.defaults={open:-1,oneOpenedItem:!1,speed:600,easing:"easeInOutExpo",scrollSpeed:800,scrollEasing:"easeInOutExpo"},e.Accordion.prototype={_init:function(t){this.options=e.extend(!0,{},e.Accordion.defaults,t),this._validate(),this.current=this.options.open,this._saveDimValues(),-1!=this.current&&this._toggleItem(this.$items.eq(this.current)),this._initEvents()},_saveDimValues:function(){this.$items.each(function(){var t=e(this);t.data({originalHeight:t.find(".ask:first").height(),offsetTop:t.offset().top})})},_validate:function(){(this.options.open<-1||this.options.open>this.itemsCount-1)&&(this.options.open=-1)},_initEvents:function(){var t=this;this.$items.find(".ask:first").bind("click.accordion",function(i){var s=e(this).parent();return t.options.oneOpenedItem&&t._isOpened()&&t.current!==s.index()&&t._toggleItem(t.$items.eq(t.current)),t._toggleItem(s),!1})},_isOpened:function(){return this.$el.find("li.st-open").length>0},_toggleItem:function(t){var e=t.find("div.answer");t.hasClass("st-open")?(this.current=-1,e.stop(!0,!0).fadeOut(this.options.speed),t.removeClass("st-open").stop().animate({height:t.data("originalHeight")},this.options.speed,this.options.easing)):(this.current=t.index(),e.stop(!0,!0).fadeIn(this.options.speed),t.addClass("st-open").stop().animate({height:t.data("originalHeight")+e.outerHeight(!0)},this.options.speed,this.options.easing),this._scroll(this))},_scroll:function(t){var i,t=t||this;i=-1!==t.current?t.current:t.$el.find("li.st-open:last").index(),e("html, body").stop().animate({scrollTop:t.options.oneOpenedItem?t.$items.eq(i).data("offsetTop")-90:t.$items.eq(i).offset().top},t.options.scrollSpeed,t.options.scrollEasing)}};var s=function(t){this.console&&console.error(t)};e.fn.accordion=function(t){if("string"==typeof t){var i=Array.prototype.slice.call(arguments,1);this.each(function(){var o=e.data(this,"accordion");return o?e.isFunction(o[t])&&"_"!==t.charAt(0)?void o[t].apply(o,i):void s("no such method '"+t+"' for accordion instance"):void s("cannot call methods on accordion prior to initialization; attempted to call method '"+t+"'")})}else this.each(function(){var i=e.data(this,"accordion");i||e.data(this,"accordion",new e.Accordion(t,this))});return this}}(window,jQuery);

"function" != typeof Object.create && (Object.create = function(t) {
    function e() {}
    return e.prototype = t, new e
}),
    function(t, e, i) {
        var s = {
            init: function(e, i) {
                var s = this;
                s.$elem = t(i), s.options = t.extend({}, t.fn.BTQSlider.options, s.$elem.data(), e), s.userOptions = e, s.loadContent()
            },
            loadContent: function() {
                function e(t) {
                    var e, i = "";
                    if ("function" == typeof s.options.jsonSuccess) s.options.jsonSuccess.apply(this, [t]);
                    else {
                        for (e in t.BTQ) t.BTQ.hasOwnProperty(e) && (i += t.BTQ[e].item);
                        s.$elem.html(i)
                    }
                    s.logIn()
                }
                var i, s = this;
                "function" == typeof s.options.beforeInit && s.options.beforeInit.apply(this, [s.$elem]), "string" == typeof s.options.jsonPath ? (i = s.options.jsonPath, t.getJSON(i, e)) : s.logIn()
            },
            logIn: function() {
                var t = this;
                t.$elem.data({
                    "slide-originalStyles": t.$elem.attr("style"),
                    "slide-originalClasses": t.$elem.attr("class")
                }), t.$elem.css({
                    opacity: 0
                }), t.orignalItems = t.options.items, t.checkBrowser(), t.wrapperWidth = 0, t.checkVisible = null, t.setVars()
            },
            setVars: function() {
                var t = this;
                return 0 === t.$elem.children().length ? !1 : (t.baseClass(), t.eventTypes(), t.$userItems = t.$elem.children(), t.itemsAmount = t.$userItems.length, t.wrapItems(), t.$BTQItems = t.$elem.find(".slide-item"), t.$BTQWrapper = t.$elem.find(".slide-wrapper"), t.playDirection = "next", t.prevItem = 0, t.prevArr = [0], t.currentItem = 0, t.customEvents(), void t.onStartup())
            },
            onStartup: function() {
                var t = this;
                t.updateItems(), t.calculateAll(), t.buildControls(), t.updateControls(), t.response(), t.moveEvents(), t.stopOnHover(), t.BTQStatus(), t.options.transitionStyle !== !1 && t.transitionTypes(t.options.transitionStyle), t.options.autoPlay === !0 && (t.options.autoPlay = 5e3), t.play(), t.$elem.find(".slide-wrapper").css("display", "block"), t.$elem.is(":visible") ? t.$elem.css("opacity", 1) : t.watchVisibility(), t.onstartup = !1, t.eachMoveUpdate(), "function" == typeof t.options.afterInit && t.options.afterInit.apply(this, [t.$elem])
            },
            eachMoveUpdate: function() {
                var t = this;
                t.options.lazyLoad === !0 && t.lazyLoad(), t.options.autoHeight === !0 && t.autoHeight(), t.onVisibleItems(), "function" == typeof t.options.afterAction && t.options.afterAction.apply(this, [t.$elem])
            },
            updateVars: function() {
                var t = this;
                "function" == typeof t.options.beforeUpdate && t.options.beforeUpdate.apply(this, [t.$elem]), t.watchVisibility(), t.updateItems(), t.calculateAll(), t.updatePosition(), t.updateControls(), t.eachMoveUpdate(), "function" == typeof t.options.afterUpdate && t.options.afterUpdate.apply(this, [t.$elem])
            },
            reload: function() {
                var t = this;
                e.setTimeout(function() {
                    t.updateVars()
                }, 0)
            },
            watchVisibility: function() {
                var t = this;
                return t.$elem.is(":visible") !== !1 ? !1 : (t.$elem.css({
                    opacity: 0
                }), e.clearInterval(t.autoPlayInterval), e.clearInterval(t.checkVisible), void(t.checkVisible = e.setInterval(function() {
                    t.$elem.is(":visible") && (t.reload(), t.$elem.animate({
                        opacity: 1
                    }, 200), e.clearInterval(t.checkVisible))
                }, 500)))
            },
            wrapItems: function() {
                var t = this;
                t.$userItems.wrapAll('<div class="slide-wrapper">').wrap('<div class="slide-item"></div>'), t.$elem.find(".slide-wrapper").wrap('<div class="slide-wrapper-outer">'), t.wrapperOuter = t.$elem.find(".slide-wrapper-outer"), t.$elem.css("display", "inline-block")
            },
            baseClass: function() {
                var t = this,
                    e = t.$elem.hasClass(t.options.baseClass),
                    i = t.$elem.hasClass(t.options.theme);
                e || t.$elem.addClass(t.options.baseClass), i || t.$elem.addClass(t.options.theme)
            },
            updateItems: function() {
                var e, i, s = this;
                if (s.options.responsive === !1) return !1;
                if (s.options.singleItem === !0) return s.options.items = s.orignalItems = 1, s.options.itemsCustom = !1, s.options.itemsDesktop = !1, s.options.itemsDesktopSmall = !1, s.options.itemsTablet = !1, s.options.itemsTabletSmall = !1, s.options.itemsMobile = !1, !1;
                if (e = t(s.options.responsiveBaseWidth).width(), e > (s.options.itemsDesktop[0] || s.orignalItems) && (s.options.items = s.orignalItems), s.options.itemsCustom !== !1)
                    for (s.options.itemsCustom.sort(function(t, e) {
                        return t[0] - e[0]
                    }), i = 0; i < s.options.itemsCustom.length; i += 1) s.options.itemsCustom[i][0] <= e && (s.options.items = s.options.itemsCustom[i][1]);
                else e <= s.options.itemsDesktop[0] && s.options.itemsDesktop !== !1 && (s.options.items = s.options.itemsDesktop[1]), e <= s.options.itemsDesktopSmall[0] && s.options.itemsDesktopSmall !== !1 && (s.options.items = s.options.itemsDesktopSmall[1]), e <= s.options.itemsTablet[0] && s.options.itemsTablet !== !1 && (s.options.items = s.options.itemsTablet[1]), e <= s.options.itemsTabletSmall[0] && s.options.itemsTabletSmall !== !1 && (s.options.items = s.options.itemsTabletSmall[1]), e <= s.options.itemsMobile[0] && s.options.itemsMobile !== !1 && (s.options.items = s.options.itemsMobile[1]);
                s.options.items > s.itemsAmount && s.options.itemsScaleUp === !0 && (s.options.items = s.itemsAmount)
            },
            response: function() {
                var i, s, o = this;
                return o.options.responsive !== !0 ? !1 : (s = t(e).width(), o.resizer = function() {
                    t(e).width() !== s && (o.options.autoPlay !== !1 && e.clearInterval(o.autoPlayInterval), e.clearTimeout(i), i = e.setTimeout(function() {
                        s = t(e).width(), o.updateVars()
                    }, o.options.responsiveRefreshRate))
                }, void t(e).resize(o.resizer))
            },
            updatePosition: function() {
                var t = this;
                t.jumpTo(t.currentItem), t.options.autoPlay !== !1 && t.checkAp()
            },
            appendItemsSizes: function() {
                var e = this,
                    i = 0,
                    s = e.itemsAmount - e.options.items;
                e.$BTQItems.each(function(o) {
                    var n = t(this);
                    n.css({
                        width: e.itemWidth
                    }).data("slide-item", Number(o)), (o % e.options.items === 0 || o === s) && (o > s || (i += 1)), n.data("slide-roundPages", i)
                })
            },
            appendWrapperSizes: function() {
                var t = this,
                    e = t.$BTQItems.length * t.itemWidth;
                t.$BTQWrapper.css({
                    width: 2 * e,
                    left: 0
                }), t.appendItemsSizes()
            },
            calculateAll: function() {
                var t = this;
                t.calculateWidth(), t.appendWrapperSizes(), t.loops(), t.max()
            },
            calculateWidth: function() {
                var t = this;
                t.itemWidth = Math.round(t.$elem.width() / t.options.items)
            },
            max: function() {
                var t = this,
                    e = -1 * (t.itemsAmount * t.itemWidth - t.options.items * t.itemWidth);
                return t.options.items > t.itemsAmount ? (t.maximumItem = 0, e = 0, t.maximumPixels = 0) : (t.maximumItem = t.itemsAmount - t.options.items, t.maximumPixels = e), e
            },
            min: function() {
                return 0
            },
            loops: function() {
                var e, i, s, o = this,
                    n = 0,
                    a = 0;
                for (o.positionsInArray = [0], o.pagesInArray = [], e = 0; e < o.itemsAmount; e += 1) a += o.itemWidth, o.positionsInArray.push(-a), o.options.scrollPerPage === !0 && (i = t(o.$BTQItems[e]), s = i.data("slide-roundPages"), s !== n && (o.pagesInArray[n] = o.positionsInArray[e], n = s))
            },
            buildControls: function() {
                var e = this;
                (e.options.navigation === !0 || e.options.pagination === !0) && (e.BTQControls = t('<div class="slide-controls"/>').toggleClass("clickable", !e.browser.isTouch).appendTo(e.$elem)), e.options.pagination === !0 && e.buildPagination(), e.options.navigation === !0 && e.buildButtons()
            },
            buildButtons: function() {
                var e = this,
                    i = t('<div class="slide-buttons"/>');
                e.BTQControls.append(i), e.buttonPrev = t("<div/>", {
                    "class": "slide-prev",
                    html: e.options.navigationText[0] || ""
                }), e.buttonNext = t("<div/>", {
                    "class": "slide-next",
                    html: e.options.navigationText[1] || ""
                }), i.append(e.buttonPrev).append(e.buttonNext), i.on("touchstart.BTQControls mousedown.BTQControls", 'div[class^="slide"]', function(t) {
                    t.preventDefault()
                }), i.on("touchend.BTQControls mouseup.BTQControls", 'div[class^="slide"]', function(i) {
                    i.preventDefault(), t(this).hasClass("slide-next") ? e.next() : e.prev()
                })
            },
            buildPagination: function() {
                var e = this;
                e.paginationWrapper = t('<div class="slide-pagination"/>'), e.BTQControls.append(e.paginationWrapper), e.paginationWrapper.on("touchend.BTQControls mouseup.BTQControls", ".slide-page", function(i) {
                    i.preventDefault(), Number(t(this).data("slide-page")) !== e.currentItem && e.goTo(Number(t(this).data("slide-page")), !0)
                })
            },
            updatePagination: function() {
                var e, i, s, o, n, a, r = this;
                if (r.options.pagination === !1) return !1;
                for (r.paginationWrapper.html(""), e = 0, i = r.itemsAmount - r.itemsAmount % r.options.items, o = 0; o < r.itemsAmount; o += 1) o % r.options.items === 0 && (e += 1, i === o && (s = r.itemsAmount - r.options.items), n = t("<div/>", {
                    "class": "slide-page"
                }), a = t("<span></span>", {
                    text: r.options.paginationNumbers === !0 ? e : "",
                    "class": r.options.paginationNumbers === !0 ? "slide-numbers" : ""
                }), n.append(a), n.data("slide-page", i === o ? s : o), n.data("slide-roundPages", e), r.paginationWrapper.append(n));
                r.checkPagination()
            },
            checkPagination: function() {
                var e = this;
                return e.options.pagination === !1 ? !1 : void e.paginationWrapper.find(".slide-page").each(function() {
                    t(this).data("slide-roundPages") === t(e.$BTQItems[e.currentItem]).data("slide-roundPages") && (e.paginationWrapper.find(".slide-page").removeClass("active"), t(this).addClass("active"))
                })
            },
            checkNavigation: function() {
                var t = this;
                return t.options.navigation === !1 ? !1 : void(t.options.rewindNav === !1 && (0 === t.currentItem && 0 === t.maximumItem ? (t.buttonPrev.addClass("disabled"), t.buttonNext.addClass("disabled")) : 0 === t.currentItem && 0 !== t.maximumItem ? (t.buttonPrev.addClass("disabled"), t.buttonNext.removeClass("disabled")) : t.currentItem === t.maximumItem ? (t.buttonPrev.removeClass("disabled"), t.buttonNext.addClass("disabled")) : 0 !== t.currentItem && t.currentItem !== t.maximumItem && (t.buttonPrev.removeClass("disabled"), t.buttonNext.removeClass("disabled"))))
            },
            updateControls: function() {
                var t = this;
                t.updatePagination(), t.checkNavigation(), t.BTQControls && (t.options.items >= t.itemsAmount ? t.BTQControls.hide() : t.BTQControls.show())
            },
            destroyControls: function() {
                var t = this;
                t.BTQControls && t.BTQControls.remove()
            },
            next: function(t) {
                var e = this;
                if (e.isTransition) return !1;
                if (e.currentItem += e.options.scrollPerPage === !0 ? e.options.items : 1, e.currentItem > e.maximumItem + (e.options.scrollPerPage === !0 ? e.options.items - 1 : 0)) {
                    if (e.options.rewindNav !== !0) return e.currentItem = e.maximumItem, !1;
                    e.currentItem = 0, t = "rewind"
                }
                e.goTo(e.currentItem, t)
            },
            prev: function(t) {
                var e = this;
                if (e.isTransition) return !1;
                if (e.options.scrollPerPage === !0 && e.currentItem > 0 && e.currentItem < e.options.items ? e.currentItem = 0 : e.currentItem -= e.options.scrollPerPage === !0 ? e.options.items : 1, e.currentItem < 0) {
                    if (e.options.rewindNav !== !0) return e.currentItem = 0, !1;
                    e.currentItem = e.maximumItem, t = "rewind"
                }
                e.goTo(e.currentItem, t)
            },
            goTo: function(t, i, s) {
                var o, n = this;
                return n.isTransition ? !1 : ("function" == typeof n.options.beforeMove && n.options.beforeMove.apply(this, [n.$elem]), t >= n.maximumItem ? t = n.maximumItem : 0 >= t && (t = 0), n.currentItem = n.BTQ.currentItem = t, n.options.transitionStyle !== !1 && "drag" !== s && 1 === n.options.items ? (n.swapSpeed(0), n.browser.support3d === !0 || "msie" == n.browser && version >= 10 ? n.transition3d(n.positionsInArray[t]) : n.css2slide(n.positionsInArray[t], 1), n.afterGo(), n.singleItemTransition(), !1) : (o = n.positionsInArray[t], n.browser.support3d === !0 ? (n.isCss3Finish = !1, i === !0 ? (n.swapSpeed("paginationSpeed"), e.setTimeout(function() {
                    n.isCss3Finish = !0
                }, n.options.paginationSpeed)) : "rewind" === i ? (n.swapSpeed(n.options.rewindSpeed), e.setTimeout(function() {
                    n.isCss3Finish = !0
                }, n.options.rewindSpeed)) : (n.swapSpeed("slideSpeed"), e.setTimeout(function() {
                    n.isCss3Finish = !0
                }, n.options.slideSpeed)), n.transition3d(o)) : i === !0 ? n.css2slide(o, n.options.paginationSpeed) : "rewind" === i ? n.css2slide(o, n.options.rewindSpeed) : n.css2slide(o, n.options.slideSpeed), void n.afterGo()))
            },
            jumpTo: function(t) {
                var e = this;
                "function" == typeof e.options.beforeMove && e.options.beforeMove.apply(this, [e.$elem]), t >= e.maximumItem || -1 === t ? t = e.maximumItem : 0 >= t && (t = 0), e.swapSpeed(0), e.browser.support3d === !0 ? e.transition3d(e.positionsInArray[t]) : e.css2slide(e.positionsInArray[t], 1), e.currentItem = e.BTQ.currentItem = t, e.afterGo()
            },
            afterGo: function() {
                var t = this;
                t.prevArr.push(t.currentItem), t.prevItem = t.BTQ.prevItem = t.prevArr[t.prevArr.length - 2], t.prevArr.shift(0), t.prevItem !== t.currentItem && (t.checkPagination(), t.checkNavigation(), t.eachMoveUpdate(), t.options.autoPlay !== !1 && t.checkAp()), "function" == typeof t.options.afterMove && t.prevItem !== t.currentItem && t.options.afterMove.apply(this, [t.$elem])
            },
            stop: function() {
                var t = this;
                t.apStatus = "stop", e.clearInterval(t.autoPlayInterval)
            },
            checkAp: function() {
                var t = this;
                "stop" !== t.apStatus && t.play()
            },
            play: function() {
                var t = this;
                return t.apStatus = "play", t.options.autoPlay === !1 ? !1 : (e.clearInterval(t.autoPlayInterval), void(t.autoPlayInterval = e.setInterval(function() {
                    t.next(!0)
                }, t.options.autoPlay)))
            },
            swapSpeed: function(t) {
                var e = this;
                "slideSpeed" === t ? e.$BTQWrapper.css(e.addCssSpeed(e.options.slideSpeed)) : "paginationSpeed" === t ? e.$BTQWrapper.css(e.addCssSpeed(e.options.paginationSpeed)) : "string" != typeof t && e.$BTQWrapper.css(e.addCssSpeed(t))
            },
            addCssSpeed: function(t) {
                return {
                    "-webkit-transition": "all " + t + "ms ease",
                    "-moz-transition": "all " + t + "ms ease",
                    "-o-transition": "all " + t + "ms ease",
                    transition: "all " + t + "ms ease"
                }
            },
            removeTransition: function() {
                return {
                    "-webkit-transition": "",
                    "-moz-transition": "",
                    "-o-transition": "",
                    transition: ""
                }
            },
            doTranslate: function(t) {
                return {
                    "-webkit-transform": "translate3d(" + t + "px, 0px, 0px)",
                    "-moz-transform": "translate3d(" + t + "px, 0px, 0px)",
                    "-o-transform": "translate3d(" + t + "px, 0px, 0px)",
                    "-ms-transform": "translate3d(" + t + "px, 0px, 0px)",
                    transform: "translate3d(" + t + "px, 0px,0px)"
                }
            },
            transition3d: function(t) {
                var e = this;
                e.$BTQWrapper.css(e.doTranslate(t))
            },
            css2move: function(t) {
                var e = this;
                e.$BTQWrapper.css({
                    left: t
                })
            },
            css2slide: function(t, e) {
                var i = this;
                i.isCssFinish = !1, i.$BTQWrapper.stop(!0, !0).animate({
                    left: t
                }, {
                    duration: e || i.options.slideSpeed,
                    complete: function() {
                        i.isCssFinish = !0
                    }
                })
            },
            checkBrowser: function() {
                var t, s, o, n, a = this,
                    r = "translate3d(0px, 0px, 0px)",
                    p = i.createElement("div");
                p.style.cssText = "  -moz-transform:" + r + "; -ms-transform:" + r + "; -o-transform:" + r + "; -webkit-transform:" + r + "; transform:" + r, t = /translate3d\(0px, 0px, 0px\)/g, s = p.style.cssText.match(t), o = null !== s && s.length >= 1 && s.length <= 2, n = "ontouchstart" in e || e.navigator.msMaxTouchPoints, a.browser = {
                    support3d: o,
                    isTouch: n
                }
            },
            moveEvents: function() {
                var t = this;
                (t.options.mouseDrag !== !1 || t.options.touchDrag !== !1) && (t.gestures(), t.disabledEvents())
            },
            eventTypes: function() {
                var t = this,
                    e = ["s", "e", "x"];
                t.ev_types = {}, t.options.mouseDrag === !0 && t.options.touchDrag === !0 ? e = ["touchstart.BTQ mousedown.BTQ", "touchmove.BTQ mousemove.BTQ", "touchend.BTQ touchcancel.BTQ mouseup.BTQ"] : t.options.mouseDrag === !1 && t.options.touchDrag === !0 ? e = ["touchstart.BTQ", "touchmove.BTQ", "touchend.BTQ touchcancel.BTQ"] : t.options.mouseDrag === !0 && t.options.touchDrag === !1 && (e = ["mousedown.BTQ", "mousemove.BTQ", "mouseup.BTQ"]), t.ev_types.start = e[0], t.ev_types.move = e[1], t.ev_types.end = e[2]
            },
            disabledEvents: function() {
                var e = this;
                e.$elem.on("dragstart.BTQ", function(t) {
                    t.preventDefault()
                }), e.$elem.on("mousedown.disableTextSelect", function(e) {
                    return t(e.target).is("input, textarea, select, option")
                })
            },
            gestures: function() {
                function s(t) {
                    if (void 0 !== t.touches) return {
                        x: t.touches[0].pageX,
                        y: t.touches[0].pageY
                    };
                    if (void 0 === t.touches) {
                        if (void 0 !== t.pageX) return {
                            x: t.pageX,
                            y: t.pageY
                        };
                        if (void 0 === t.pageX) return {
                            x: t.clientX,
                            y: t.clientY
                        }
                    }
                }

                function o(e) {
                    "on" === e ? (t(i).on(p.ev_types.move, a), t(i).on(p.ev_types.end, r)) : "off" === e && (t(i).off(p.ev_types.move), t(i).off(p.ev_types.end))
                }

                function n(i) {
                    var n, a = i.originalEvent || i || e.event;
                    if (3 === a.which) return !1;
                    if (!(p.itemsAmount <= p.options.items)) {
                        if (p.isCssFinish === !1 && !p.options.dragBeforeAnimFinish) return !1;
                        if (p.isCss3Finish === !1 && !p.options.dragBeforeAnimFinish) return !1;
                        p.options.autoPlay !== !1 && e.clearInterval(p.autoPlayInterval), p.browser.isTouch === !0 || p.$BTQWrapper.hasClass("grabbing") || p.$BTQWrapper.addClass("grabbing"), p.newPosX = 0, p.newRelativeX = 0, t(this).css(p.removeTransition()), n = t(this).position(), l.relativePos = n.left, l.offsetX = s(a).x - n.left, l.offsetY = s(a).y - n.top, o("on"), l.sliding = !1, l.targetElement = a.target || a.srcElement
                    }
                }

                function a(o) {
                    var n, a, r = o.originalEvent || o || e.event;
                    p.newPosX = s(r).x - l.offsetX, p.newPosY = s(r).y - l.offsetY, p.newRelativeX = p.newPosX - l.relativePos, "function" == typeof p.options.startDragging && l.dragging !== !0 && 0 !== p.newRelativeX && (l.dragging = !0, p.options.startDragging.apply(p, [p.$elem])), (p.newRelativeX > 8 || p.newRelativeX < -8) && p.browser.isTouch === !0 && (void 0 !== r.preventDefault ? r.preventDefault() : r.returnValue = !1, l.sliding = !0), (p.newPosY > 10 || p.newPosY < -10) && l.sliding === !1 && t(i).off("touchmove.BTQ"), n = function() {
                        return p.newRelativeX / 5
                    }, a = function() {
                        return p.maximumPixels + p.newRelativeX / 5
                    }, p.newPosX = Math.max(Math.min(p.newPosX, n()), a()), p.browser.support3d === !0 ? p.transition3d(p.newPosX) : p.css2move(p.newPosX)
                }

                function r(i) {
                    var s, n, a, r = i.originalEvent || i || e.event;
                    r.target = r.target || r.srcElement, l.dragging = !1, p.browser.isTouch !== !0 && p.$BTQWrapper.removeClass("grabbing"), p.newRelativeX < 0 ? p.dragDirection = p.BTQ.dragDirection = "left" : p.dragDirection = p.BTQ.dragDirection = "right", 0 !== p.newRelativeX && (s = p.getNewPosition(), p.goTo(s, !1, "drag"), l.targetElement === r.target && p.browser.isTouch !== !0 && (t(r.target).on("click.disable", function(e) {
                        e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault(), t(e.target).off("click.disable")
                    }), n = t._data(r.target, "events").click, a = n.pop(), n.splice(0, 0, a))), o("off")
                }
                var p = this,
                    l = {
                        offsetX: 0,
                        offsetY: 0,
                        baseElWidth: 0,
                        relativePos: 0,
                        position: null,
                        minSwipe: null,
                        maxSwipe: null,
                        sliding: null,
                        dargging: null,
                        targetElement: null
                    };
                p.isCssFinish = !0, p.$elem.on(p.ev_types.start, ".slide-wrapper", n)
            },
            getNewPosition: function() {
                var t = this,
                    e = t.closestItem();
                return e > t.maximumItem ? (t.currentItem = t.maximumItem, e = t.maximumItem) : t.newPosX >= 0 && (e = 0, t.currentItem = 0), e
            },
            closestItem: function() {
                var e = this,
                    i = e.options.scrollPerPage === !0 ? e.pagesInArray : e.positionsInArray,
                    s = e.newPosX,
                    o = null;
                return t.each(i, function(n, a) {
                    s - e.itemWidth / 20 > i[n + 1] && s - e.itemWidth / 20 < a && "left" === e.moveDirection() ? (o = a, e.options.scrollPerPage === !0 ? e.currentItem = t.inArray(o, e.positionsInArray) : e.currentItem = n) : s + e.itemWidth / 20 < a && s + e.itemWidth / 20 > (i[n + 1] || i[n] - e.itemWidth) && "right" === e.moveDirection() && (e.options.scrollPerPage === !0 ? (o = i[n + 1] || i[i.length - 1], e.currentItem = t.inArray(o, e.positionsInArray)) : (o = i[n + 1], e.currentItem = n + 1))
                }), e.currentItem
            },
            moveDirection: function() {
                var t, e = this;
                return e.newRelativeX < 0 ? (t = "right", e.playDirection = "next") : (t = "left", e.playDirection = "prev"), t
            },
            customEvents: function() {
                var t = this;
                t.$elem.on("BTQ.next", function() {
                    t.next()
                }), t.$elem.on("BTQ.prev", function() {
                    t.prev()
                }), t.$elem.on("BTQ.play", function(e, i) {
                    t.options.autoPlay = i, t.play(), t.hoverStatus = "play"
                }), t.$elem.on("BTQ.stop", function() {
                    t.stop(), t.hoverStatus = "stop"
                }), t.$elem.on("BTQ.goTo", function(e, i) {
                    t.goTo(i)
                }), t.$elem.on("BTQ.jumpTo", function(e, i) {
                    t.jumpTo(i)
                })
            },
            stopOnHover: function() {
                var t = this;
                t.options.stopOnHover === !0 && t.browser.isTouch !== !0 && t.options.autoPlay !== !1 && (t.$elem.on("mouseover", function() {
                    t.stop()
                }), t.$elem.on("mouseout", function() {
                    "stop" !== t.hoverStatus && t.play()
                }))
            },
            lazyLoad: function() {
                var e, i, s, o, n, a = this;
                if (a.options.lazyLoad === !1) return !1;
                for (e = 0; e < a.itemsAmount; e += 1) i = t(a.$BTQItems[e]), "loaded" !== i.data("slide-loaded") && (s = i.data("slide-item"), o = i.find(".lazyload"), "string" == typeof o.data("src") ? (void 0 === i.data("slide-loaded") && (o.hide(), i.addClass("loading").data("slide-loaded", "checked")), n = a.options.lazyFollow === !0 ? s >= a.currentItem : !0, n && s < a.currentItem + a.options.items && o.length && o.each(function() {
                    a.lazyPreload(i, t(this))
                })) : i.data("slide-loaded", "loaded"))
            },
            lazyPreload: function(t, i) {
                function s() {
                    t.data("slide-loaded", "loaded").removeClass("loading"), i.removeAttr("data-src"), "fade" === a.options.lazyEffect ? (i.fadeIn(400), i.parent().parent().fadeIn(400), i.parent().fadeIn(400)) : (i.show(), i.parent().parent().show(), i.parent().show()), "function" == typeof a.options.afterLazyLoad && a.options.afterLazyLoad.apply(this, [a.$elem])
                }

                function o() {
                    r += 1, a.completeImg(i.get(0)) || n === !0 ? s() : 100 >= r ? e.setTimeout(o, 100) : s()
                }
                var n, a = this,
                    r = 0;
                "DIV" === i.prop("tagName") ? (i.css("background-image", "url(" + i.data("src") + ")"), n = !0) : i[0].src = i.data("src"), o()
            },
            autoHeight: function() {
                function i() {
                    var i = t(n.$BTQItems[n.currentItem]).height();
                    n.wrapperOuter.css("height", i + "px"), n.wrapperOuter.hasClass("autoheight") || e.setTimeout(function() {
                        n.wrapperOuter.addClass("autoheight")
                    }, 0)
                }

                function s() {
                    o += 1, n.completeImg(a.get(0)) ? i() : 100 >= o ? e.setTimeout(s, 100) : n.wrapperOuter.css("height", "")
                }
                var o, n = this,
                    a = t(n.$BTQItems[n.currentItem]).find("img");
                void 0 !== a.get(0) ? (o = 0, s()) : i()
            },
            completeImg: function(t) {
                var e;
                return t.complete ? (e = typeof t.naturalWidth, "undefined" !== e && 0 === t.naturalWidth ? !1 : !0) : !1
            },
            onVisibleItems: function() {
                var e, i = this;
                for (i.options.addClassActive === !0 && i.$BTQItems.removeClass("active"), i.visibleItems = [], e = i.currentItem; e < i.currentItem + i.options.items; e += 1) i.visibleItems.push(e), i.options.addClassActive === !0 && t(i.$BTQItems[e]).addClass("active");
                i.BTQ.visibleItems = i.visibleItems
            },
            transitionTypes: function(t) {
                var e = this;
                e.outClass = "slide-" + t + "-out", e.inClass = "slide-" + t + "-in"
            },
            singleItemTransition: function() {
                function t(t) {
                    return {
                        position: "relative",
                        left: t + "px"
                    }
                }
                var e = this,
                    i = e.outClass,
                    s = e.inClass,
                    o = e.$BTQItems.eq(e.currentItem),
                    n = e.$BTQItems.eq(e.prevItem),
                    a = Math.abs(e.positionsInArray[e.currentItem]) + e.positionsInArray[e.prevItem],
                    r = Math.abs(e.positionsInArray[e.currentItem]) + e.itemWidth / 2,
                    p = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
                e.isTransition = !0, e.$BTQWrapper.addClass("slide-origin").css({
                    "-webkit-transform-origin": r + "px",
                    "-moz-perspective-origin": r + "px",
                    "perspective-origin": r + "px"
                }), n.css(t(a, 10)).addClass(i).on(p, function() {
                    e.endPrev = !0, n.off(p), e.clearTransStyle(n, i)
                }), o.addClass(s).on(p, function() {
                    e.endCurrent = !0, o.off(p), e.clearTransStyle(o, s)
                })
            },
            clearTransStyle: function(t, e) {
                var i = this;
                t.css({
                    position: "",
                    left: ""
                }).removeClass(e), i.endPrev && i.endCurrent && (i.$BTQWrapper.removeClass("slide-origin"), i.endPrev = !1, i.endCurrent = !1, i.isTransition = !1)
            },
            BTQStatus: function() {
                var t = this;
                t.BTQ = {
                    userOptions: t.userOptions,
                    baseElement: t.$elem,
                    userItems: t.$userItems,
                    BTQItems: t.$BTQItems,
                    currentItem: t.currentItem,
                    prevItem: t.prevItem,
                    visibleItems: t.visibleItems,
                    isTouch: t.browser.isTouch,
                    browser: t.browser,
                    dragDirection: t.dragDirection
                }
            },
            clearEvents: function() {
                var s = this;
                s.$elem.off(".slide mousedown.disableTextSelect"), t(i).off(".slide"), t(e).off("resize", s.resizer)
            },
            unWrap: function() {
                var t = this;
                0 !== t.$elem.children().length && (t.$BTQWrapper.unwrap(), t.$userItems.unwrap().unwrap(), t.BTQControls && t.BTQControls.remove()), t.clearEvents(), t.$elem.attr({
                    style: t.$elem.data("slide-originalStyles") || "",
                    "class": t.$elem.data("slide-originalClasses")
                })
            },
            destroy: function() {
                var t = this;
                t.stop(), e.clearInterval(t.checkVisible), t.unWrap(), t.$elem.removeData()
            },
            reinit: function(e) {
                var i = this,
                    s = t.extend({}, i.userOptions, e);
                i.unWrap(), i.init(s, i.$elem)
            },
            addItem: function(t, e) {
                var i, s = this;
                return t ? 0 === s.$elem.children().length ? (s.$elem.append(t), s.setVars(), !1) : (s.unWrap(), i = void 0 === e || -1 === e ? -1 : e, i >= s.$userItems.length || -1 === i ? s.$userItems.eq(-1).after(t) : s.$userItems.eq(i).before(t), void s.setVars()) : !1
            },
            removeItem: function(t) {
                var e, i = this;
                return 0 === i.$elem.children().length ? !1 : (e = void 0 === t || -1 === t ? -1 : t, i.unWrap(), i.$userItems.eq(e).remove(), void i.setVars())
            }
        };
        t.fn.BTQSlider = function(e) {
            return this.each(function() {
                if (t(this).data("slide-init") === !0) return !1;
                t(this).data("slide-init", !0);
                var i = Object.create(s);
                i.init(e, this), t.data(this, "BTQSlider", i)
            })
        }, t.fn.BTQSlider.options = {
            items: 5,
            itemsCustom: !1,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 2],
            itemsTabletSmall: !1,
            itemsMobile: [479, 1],
            singleItem: !1,
            itemsScaleUp: !1,
            slideSpeed: 200,
            paginationSpeed: 800,
            rewindSpeed: 1e3,
            autoPlay: !1,
            stopOnHover: !1,
            navigation: !1,
            navigationText: ["prev", "next"],
            rewindNav: !0,
            scrollPerPage: !1,
            pagination: !0,
            paginationNumbers: !1,
            responsive: !0,
            responsiveRefreshRate: 200,
            responsiveBaseWidth: e,
            baseClass: "slide-slidebox",
            theme: "",
            lazyLoad: !1,
            lazyFollow: !0,
            lazyEffect: "fade",
            autoHeight: !1,
            jsonPath: !1,
            jsonSuccess: !1,
            dragBeforeAnimFinish: !0,
            mouseDrag: !0,
            touchDrag: !0,
            addClassActive: !1,
            transitionStyle: !1,
            beforeUpdate: !1,
            afterUpdate: !1,
            beforeInit: !1,
            afterInit: !1,
            beforeMove: !1,
            afterMove: !1,
            afterAction: !1,
            startDragging: !1,
            afterLazyLoad: !1
        }
    }(jQuery, window, document),
    function(t, e, i) {
        e.Accordion = function(t, i) {
            this.$el = e(i), this.$items = this.$el.children("ul").children("li"), this.itemsCount = this.$items.length, this._init(t)
        }, e.Accordion.defaults = {
            open: -1,
            oneOpenedItem: !1,
            speed: 600,
            easing: "easeInOutExpo",
            scrollSpeed: 800,
            scrollEasing: "easeInOutExpo"
        }, e.Accordion.prototype = {
            _init: function(t) {
                this.options = e.extend(!0, {}, e.Accordion.defaults, t), this._validate(), this.current = this.options.open, this._saveDimValues(), -1 != this.current && this._toggleItem(this.$items.eq(this.current)), this._initEvents()
            },
            _saveDimValues: function() {
                this.$items.each(function() {
                    var t = e(this);
                    t.data({
                        originalHeight: t.find(".ask:first").height(),
                        offsetTop: t.offset().top
                    })
                })
            },
            _validate: function() {
                (this.options.open < -1 || this.options.open > this.itemsCount - 1) && (this.options.open = -1)
            },
            _initEvents: function() {
                var t = this;
                this.$items.find(".ask:first").bind("click.accordion", function(i) {
                    var s = e(this).parent();
                    return t.options.oneOpenedItem && t._isOpened() && t.current !== s.index() && t._toggleItem(t.$items.eq(t.current)), t._toggleItem(s), !1
                })
            },
            _isOpened: function() {
                return this.$el.find("li.st-open").length > 0
            },
            _toggleItem: function(t) {
                var e = t.find("div.answer");
                t.hasClass("st-open") ? (this.current = -1, e.stop(!0, !0).fadeOut(this.options.speed), t.removeClass("st-open").stop().animate({
                    height: t.data("originalHeight")
                }, this.options.speed, this.options.easing)) : (this.current = t.index(), e.stop(!0, !0).fadeIn(this.options.speed), t.addClass("st-open").stop().animate({
                    height: t.data("originalHeight") + e.outerHeight(!0)
                }, this.options.speed, this.options.easing), this._scroll(this))
            },
            _scroll: function(t) {
                var i, t = t || this;
                i = -1 !== t.current ? t.current : t.$el.find("li.st-open:last").index(), e("html, body").stop().animate({
                    scrollTop: t.options.oneOpenedItem ? t.$items.eq(i).data("offsetTop") - 90 : t.$items.eq(i).offset().top
                }, t.options.scrollSpeed, t.options.scrollEasing)
            }
        };
        var s = function(t) {
            this.console && console.error(t)
        };
        e.fn.accordion = function(t) {
            if ("string" == typeof t) {
                var i = Array.prototype.slice.call(arguments, 1);
                this.each(function() {
                    var o = e.data(this, "accordion");
                    return o ? e.isFunction(o[t]) && "_" !== t.charAt(0) ? void o[t].apply(o, i) : void s("no such method '" + t + "' for accordion instance") : void s("cannot call methods on accordion prior to initialization; attempted to call method '" + t + "'")
                })
            } else this.each(function() {
                var i = e.data(this, "accordion");
                i || e.data(this, "accordion", new e.Accordion(t, this))
            });
            return this
        }
    }(window, jQuery);

