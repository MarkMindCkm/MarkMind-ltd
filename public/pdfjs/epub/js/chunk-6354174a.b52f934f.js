(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6354174a"],{"0520":function(t,e,i){"use strict";i("4021")},"0932":function(t,e,i){},"098f":function(t,e,i){"use strict";i("b909")},"0d8a":function(t,e,i){"use strict";i("4a1e")},"0ea3":function(t,e,i){"use strict";i("7a8b")},"0f17":function(t,e,i){"use strict";i("25a4")},1256:function(t,e,i){},"1b11":function(t,e,i){},"22b4":function(t,e,i){},"238e":function(t,e,i){"use strict";i("28e7")},"24b2":function(t,e,i){"use strict";i("64b2")},"25a4":function(t,e,i){},"261c":function(t,e,i){"use strict";i("b78d")},2621:function(t,e){e.f=Object.getOwnPropertySymbols},"28e7":function(t,e,i){},3846:function(t,e,i){i("9e1e")&&"g"!=/./g.flags&&i("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:i("0bfb")})},"386b":function(t,e,i){var s=i("5ca1"),n=i("79e5"),o=i("be13"),a=/"/g,r=function(t,e,i,s){var n=String(o(t)),r="<"+e;return""!==i&&(r+=" "+i+'="'+String(s).replace(a,"&quot;")+'"'),r+">"+n+"</"+e+">"};t.exports=function(t,e){var i={};i[t]=e(r),s(s.P+s.F*n((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3})),"String",i)}},"3bc8":function(t,e,i){"use strict";i("0932")},4021:function(t,e,i){},"40d2":function(t,e,i){},"456d":function(t,e,i){var s=i("4bf8"),n=i("0d58");i("5eda")("keys",(function(){return function(t){return n(s(t))}}))},"4a1e":function(t,e,i){},"4e1b":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"scrollWrapper",staticClass:"scroll-wrapper",class:{"no-scroll":t.ifNoScroll},on:{"&scroll":function(e){return t.handleScroll.apply(null,arguments)}}},[t._t("default")],2)},n=[],o=(i("c5f6"),i("fa7d")),a={props:{top:{type:Number,default:0},bottom:{type:Number,default:0},ifNoScroll:{type:Boolean,default:!1},initPosition:{type:Object,default:function(){return{x:0,y:0}}}},methods:{handleScroll:function(t){var e=t.target.scrollTop||window.pageYOffset||document.body.scrollTop;this.$emit("onScroll",e)},scrollTo:function(t,e){this.$refs.scrollWrapper.scrollTo(t,e)},refresh:function(){this.$refs.scrollWrapper&&(this.$refs.scrollWrapper.style.height=window.innerHeight-Object(o["d"])(this.top)-Object(o["d"])(this.bottom)+"px",this.$refs.scrollWrapper.addEventListener("scroll",this.handleScroll))}},mounted:function(){var t=this;this.refresh(),this.$nextTick((function(){setTimeout((function(){t.scrollTo(Object(o["d"])(t.initPosition.x),Object(o["d"])(t.initPosition.y))}),1)}))}},r=a,c=(i("f604"),i("2877")),l=Object(c["a"])(r,s,n,!1,null,"0a4fbfb1",null);e["a"]=l.exports},5147:function(t,e,i){var s=i("2b4c")("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(i){try{return e[s]=!1,!"/./"[t](e)}catch(n){}}return!0}},"51a1":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"ebookView",staticClass:"ebook"},[i("ebook-bookmark"),i("ebook-header"),i("ebook-title"),i("router-view"),i("ebook-menu"),i("ebook-footer")],1)},n=[],o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:"slide-down"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.menuVisible,expression:"menuVisible"}],staticClass:"title-wrapper"},[i("div",{staticClass:"left"},[i("span",[t._v(t._s(t.getSectionName||t.fileName||"Epub Reader"))])])])])},a=[],r=i("ac0d"),c={mixins:[r["b"]],methods:{back:function(){this.$router.go(-1)},gotoBookStore:function(){this.$router.push("/book-store")}}},l=c,u=(i("0d8a"),i("2877")),h=Object(u["a"])(l,o,a,!1,null,"4959cad2",null),f=h.exports,d=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ebook-menu"},[i("transition",{attrs:{name:"slide-up"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.menuVisible,expression:"menuVisible"}],staticClass:"menu-wrapper",class:{"hide-box-shadow":t.settingVisible>=0||!t.menuVisible}},[i("div",{staticClass:"icon-wrapper",class:{selected:3===t.settingVisible}},[i("span",{staticClass:"icon-menu",on:{click:function(e){return t.showSetting(3)}}})]),i("div",{staticClass:"icon-wrapper",class:{selected:2===t.settingVisible}},[i("span",{staticClass:"icon-progress",on:{click:function(e){return t.showSetting(2)}}})]),i("div",{staticClass:"icon-wrapper",class:{selected:1===t.settingVisible}},[i("span",{staticClass:"icon-bright",on:{click:function(e){return t.showSetting(1)}}})]),i("div",{staticClass:"icon-wrapper",class:{selected:0===t.settingVisible}},[i("span",{staticClass:"icon-A",on:{click:function(e){return t.showSetting(0)}}})])])]),i("ebook-setting-font"),i("ebook-setting-font-popup"),i("ebook-setting-theme"),i("ebook-setting-progress"),i("ebook-slide")],1)},b=[],p=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:"slide-up"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.menuVisible&&0===t.settingVisible,expression:"menuVisible && settingVisible === 0"}],staticClass:"setting-wrapper"},[i("div",{staticClass:"setting-font-size"},[i("div",{ref:"left",staticClass:"preview"},[i("span",{ref:"leftText",style:t.styleLeft},[t._v("A")])]),i("div",{staticClass:"select"},t._l(t.fontSizeList,(function(e,s){return i("div",{key:s,ref:"item",refInFor:!0,staticClass:"select-wrapper",on:{click:function(i){return t.setFontSize(e.fontSize)}}},[i("div",{staticClass:"line"}),i("div",{staticClass:"point-wrapper"},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.defaultFontSize===e.fontSize,expression:"defaultFontSize === item.fontSize"}],staticClass:"point"},[i("div",{staticClass:"small-point"})])]),i("div",{staticClass:"line"})])})),0),i("div",{ref:"right",staticClass:"preview"},[i("span",{ref:"rightText",style:t.styleRight},[t._v("A")])])]),i("div",{staticClass:"setting-font-family",on:{click:function(e){return e.stopPropagation(),t.showFontFamilySetting.apply(null,arguments)}}},[i("div",{staticClass:"setting-font-family-text-wrapper"},[i("span",{staticClass:"setting-font-family-text"},[t._v(t._s(t.defaultFontFamily))])]),i("div",{staticClass:"setting-font-family-icon-wrapper"},[i("span",{staticClass:"icon-forward"})])])])])},m=[],k={mixins:[r["b"]],data:function(){return{styleLeft:{},styleRight:{}}},watch:{settingVisible:function(t){var e=this;0===t&&this.$nextTick((function(){e.genStyle()}))}},methods:{genStyle:function(){var t=this.$refs.left.getBoundingClientRect().width,e=this.$refs.left.getBoundingClientRect().width,i=this.$refs.leftText.getBoundingClientRect().width,s=this.$refs.leftText.getBoundingClientRect().width,n=this.$refs.item[0].getBoundingClientRect().width;this.styleLeft={marginLeft:(t+n-i)/2+"px",fontSize:this.fontSizeList[0].fontSize+"px"},this.styleRight={marginRight:(e+n-s)/2+"px",fontSize:this.fontSizeList[this.fontSizeList.length-1].fontSize+"px"}}}},v=k,g=(i("5593"),Object(u["a"])(v,p,m,!1,null,"3ce17fc3",null)),w=g.exports,y=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:"popup-slide-up"}},[t.fontFamilyVisible?i("div",{staticClass:"ebook-popup-list"},[i("div",{staticClass:"ebook-popup-title"},[i("div",{staticClass:"ebook-popup-title-icon",on:{click:t.hideFontFamilySetting}},[i("span",{staticClass:"icon-down2"})]),i("span",{staticClass:"ebook-popup-title-text"},[t._v(t._s(t.$t("book.selectFont")))])]),i("div",{staticClass:"ebook-popup-list-wrapper"},t._l(t.fontFamily,(function(e,s){return i("div",{key:s,staticClass:"ebook-popup-item",on:{click:function(i){return t.setFontFamily(e.font)}}},[i("div",{staticClass:"ebook-popup-item-text",class:{selected:t.isSelected(e)}},[t._v(t._s(e.font))]),t.isSelected(e)?i("div",{staticClass:"ebook-popup-item-check"},[i("span",{staticClass:"icon-check"})]):t._e()])})),0)]):t._e()])},x=[],C={mixins:[r["b"]],methods:{isSelected:function(t){return this.defaultFontFamily===t.font}}},_=C,S=(i("76d3"),Object(u["a"])(_,y,x,!1,null,"3f8013d1",null)),O=S.exports,V=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:"slide-up"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.menuVisible&&1===t.settingVisible,expression:"menuVisible && settingVisible === 1"}],staticClass:"setting-wrapper"},[i("div",{staticClass:"setting-theme"},t._l(t.themeList,(function(e,s){return i("div",{key:s,staticClass:"setting-theme-item",on:{click:function(i){return t.setTheme(e.name)}}},[i("div",{staticClass:"preview",class:{selected:e.name===t.defaultTheme},style:{background:e.style.body.background}}),i("div",{staticClass:"text",class:{selected:e.name===t.defaultTheme}},[t._v(t._s(e.alias)+"\n        ")])])})),0)])])},B=[],$={mixins:[r["b"]]},j=$,F=(i("0f17"),Object(u["a"])(j,V,B,!1,null,"720830b3",null)),P=F.exports,T=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:"slide-up"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.menuVisible&&2===t.settingVisible,expression:"menuVisible && settingVisible === 2"}],staticClass:"setting-wrapper"},[i("div",{staticClass:"setting-progress"},[i("div",{staticClass:"read-time-wrapper"},[i("span",{staticClass:"read-time-text"},[t._v(t._s(t.getReadTime()))]),i("span",{staticClass:"icon-forward"})]),i("div",{staticClass:"progress-wrapper"},[i("div",{staticClass:"progress-icon-wrapper"},[i("span",{staticClass:"icon-back",on:{click:function(e){return t.prevSection()}}})]),i("input",{ref:"progress",staticClass:"progress",attrs:{type:"range",max:"100",min:"0",step:"1",disabled:!t.bookAvailable},domProps:{value:t.progress},on:{input:function(e){return t.onProgressInput(e.target.value)},change:function(e){return t.onProgressChange(e.target.value)}}}),i("div",{staticClass:"progress-icon-wrapper",on:{click:function(e){return t.nextSection()}}},[i("span",{staticClass:"icon-forward"})])]),i("div",{staticClass:"text-wrapper"},[i("span",{staticClass:"progress-section-text"},[t._v(t._s(t.getSectionName))]),i("span",{staticClass:"progress-text"},[t._v("("+t._s(t.bookAvailable?t.progress+"%":t.$t("book.loading"))+")")])])])])])},E=[],N=i("e8ec"),L={mixins:[r["b"]],data:function(){return{isProgressLoading:!1}},methods:{prevSection:function(){var t=this;this.section>0&&!this.isProgressLoading&&(this.isProgressLoading=!0,this.setSection(this.section-1).then((function(){t.displaySection((function(){t.updateProgressBg(),t.isProgressLoading=!1,t.refreshLocation()}))})))},nextSection:function(){var t=this;this.currentBook.spine.length-1>this.section&&!this.isProgressLoading&&(this.isProgressLoading=!0,this.setSection(this.section+1).then((function(){t.displaySection((function(){t.updateProgressBg(),t.isProgressLoading=!1,t.refreshLocation()}))})))},onProgressInput:function(t){var e=this;this.setProgress(t).then((function(){e.updateProgressBg()}))},onProgressChange:function(t){var e=this;this.setProgress(t).then((function(){e.updateProgressBg(),e.displayProgress()})),Object(N["s"])(this.fileName,t)},updateProgressBg:function(){this.$refs.progress.style.backgroundSize="".concat(this.progress,"% 100%")}},updated:function(){this.$refs.progress.style.backgroundSize="".concat(this.progress,"% 100%")}},D=L,z=(i("238e"),Object(u["a"])(D,T,E,!1,null,"6ae642e2",null)),R=z.exports,I=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:"fade"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.menuVisible,expression:"menuVisible"}],staticClass:"ebook-speaking-icon",style:t.style,on:{click:t.onClick}},[i("span",{staticClass:"icon-headphone"})])])},M=[],W=i("fa7d"),A=i("5de6"),Y={mixins:[r["b"]],watch:{settingVisible:function(t){t>=0&&3!==t?this.setSpeakingIconBottom(Object(W["d"])(148)):this.setSpeakingIconBottom(Object(W["d"])(58))}},computed:{style:function(){return{bottom:this.speakingIconBottom+"px"}}},methods:{onClick:function(){this.$router.push({path:"/book-store/book-speaking",query:{fileName:this.fileName}}),Object(A["l"])(this)}}},G=Y,H=(i("9dc9"),Object(u["a"])(G,I,M,!1,null,"6b0173df",null)),q=H.exports,J=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:"fade"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:3===t.settingVisible||4===t.settingVisible,expression:"settingVisible === 3 || settingVisible === 4"}],staticClass:"slide-content-wrapper"},[i("transition",{attrs:{name:"slide-right"}},[3===t.settingVisible||4===t.settingVisible?i("div",{staticClass:"content"},[t.isPaginating?i("div",{staticClass:"empty"},[i("ebook-loading")],1):i("div",{staticClass:"content-page-wrapper"},[i("div",{staticClass:"content-page"},[i("keep-alive",[i(1===t.tab?t.content:t.bookmark,{tag:"component"})],1)],1),i("div",{staticClass:"content-page-tab"},[i("div",{staticClass:"content-page-tab-item",class:{selected:1===t.tab},on:{click:function(e){return t.selectTab(1)}}},[t._v(t._s(t.$t("book.navigation"))+"\n            ")])])])]):t._e()]),3===t.settingVisible||4===t.settingVisible?i("div",{staticClass:"content-bg",on:{click:function(e){return t.hideMenuVisible()}}}):t._e()],1)])},K=[],Q=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ebook-loading"},[i("div",{staticClass:"ebook-loading-wrapper"},[t._l(t.data,(function(e,s){return i("div",{key:s,staticClass:"ebook-loading-item"},t._l(e,(function(t,e){return i("div",{key:e,staticClass:"ebook-loading-line-wrapper"},[i("div",{ref:"line",refInFor:!0,staticClass:"ebook-loading-line"}),i("div",{ref:"mask",refInFor:!0,staticClass:"ebook-loading-mask"})])})),0)})),i("div",{staticClass:"ebook-loading-center"})],2)])},U=[],X=(i("ac6a"),{data:function(){return{data:[[{},{},{}],[{},{},{}]],maskWidth:[{value:0},{value:0},{value:0},{value:0},{value:0},{value:0}],lineWidth:[{value:16},{value:16},{value:16},{value:16},{value:16},{value:16}],add:!0,end:!1}},methods:{},mounted:function(){var t=this;this.task=setInterval((function(){t.$refs.mask.forEach((function(e,i){var s=t.$refs.mask[i],n=t.$refs.line[i],o=t.maskWidth[i],a=t.lineWidth[i];if(0===i)t.add&&o.value<16?(o.value++,a.value--):!t.add&&a.value<16&&(o.value--,a.value++);else if(t.add&&o.value<16){var r=t.maskWidth[i-1];r.value>=8&&(o.value++,a.value--)}else if(!t.add&&a.value<16){var c=t.lineWidth[i-1];c.value>=8&&(o.value--,a.value++)}s.style.width="".concat(Object(W["c"])(o.value),"rem"),s.style.flex="0 0 ".concat(Object(W["c"])(o.value),"rem"),n.style.width="".concat(Object(W["c"])(a.value),"rem"),n.style.flex="0 0 ".concat(Object(W["c"])(a.value),"rem"),i===t.maskWidth.length-1&&(t.add?16===o.value&&(t.end=!0):0===o.value&&(t.end=!0)),t.end&&(t.add=!t.add,t.end=!1)}))}),20)},beforeDestroy:function(){this.task&&clearInterval(this.task)}}),Z=X,tt=(i("261c"),Object(u["a"])(Z,Q,U,!1,null,"50024497",null)),et=tt.exports,it=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ebook-slide-contents"},[i("div",{staticClass:"slide-contents-search-wrapper"},[i("div",{staticClass:"slide-contents-search-input-wrapper"},[t._m(0),i("input",{directives:[{name:"model",rawName:"v-model",value:t.searchText,expression:"searchText"}],ref:"searchInput",staticClass:"slide-contents-search-input",attrs:{type:"text",placeholder:t.$t("book.searchHint")},domProps:{value:t.searchText},on:{click:function(e){return t.showSearchPage()},keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search()},input:function(e){e.target.composing||(t.searchText=e.target.value)}}})]),t.searchVisible?i("div",{staticClass:"slide-contents-search-cancel",on:{click:function(e){return t.hideSearchPage()}}},[t._v(t._s(t.$t("book.cancel"))+"\n    ")]):t._e()]),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.searchVisible,expression:"!searchVisible"}],staticClass:"slide-contents-book-wrapper"},[i("div",{staticClass:"slide-contents-book-img-wrapper"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.cover,expression:"cover"}],staticClass:"slide-contents-book-img"})]),i("div",{staticClass:"slide-contents-book-info-wrapper"},[i("div",{staticClass:"slide-contents-book-title"},[i("span",{staticClass:"slide-contents-book-title-text"},[t._v(t._s(t.metadata.title))])]),i("div",{staticClass:"slide-contents-book-author"},[i("span",{staticClass:"slide-contents-book-author-text"},[t._v(t._s(t.metadata.creator))])])]),i("div",{staticClass:"slide-contents-book-progress-wrapper"},[i("div",{staticClass:"slide-contents-book-progress"},[i("span",{staticClass:"progress"},[t._v(t._s(t.progress+"%"))]),i("span",{staticClass:"progress-text"},[t._v(t._s(t.$t("book.haveRead2")))])]),i("div",{staticClass:"slide-contents-book-time"},[t._v(t._s(t.getReadTime()))])])]),i("scroll",{directives:[{name:"show",rawName:"v-show",value:!t.searchVisible,expression:"!searchVisible"}],ref:"scroll",staticClass:"slide-contents-list",attrs:{top:156,bottom:48}},t._l(t.navigation,(function(e,s){return i("div",{key:s,staticClass:"slide-contents-item",on:{click:function(i){return t.display(e.href)}}},[i("span",{staticClass:"slide-contents-item-label",class:{selected:t.section===s}},[t._v(t._s(e.label.trim()))]),i("span",{staticClass:"slide-contents-item-page"},[t._v(t._s(e.page))])])})),0),i("scroll",{directives:[{name:"show",rawName:"v-show",value:t.searchVisible,expression:"searchVisible"}],ref:"scroll",staticClass:"slide-search-list",attrs:{top:66,bottom:48}},t._l(t.searchList,(function(e,s){return i("div",{key:s,staticClass:"slide-search-item",domProps:{innerHTML:t._s(e.excerpt)},on:{click:function(i){return t.display(e.cfi,!0)}}})})),0)],1)},st=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"slide-contents-search-icon"},[i("span",{staticClass:"icon-search"})])}],nt=(i("7514"),i("5df3"),i("a481"),i("4e1b")),ot={mixins:[r["b"]],components:{Scroll:nt["a"]},data:function(){return{searchText:"",searchVisible:!1,searchList:null}},methods:{showSearchPage:function(){this.searchVisible=!0},hideSearchPage:function(){this.searchVisible=!1},search:function(){var t=this;this.doSearch(this.searchText).then((function(e){t.searchList=e.map((function(e){return e.excerpt=e.excerpt.replace(t.searchText,'<span class="content-search-text">'.concat(t.searchText,"</span>")),e})),t.$refs.searchInput.blur()}))},doSearch:function(t){var e=this;return Promise.all(this.currentBook.spine.spineItems.map((function(i){return i.load(e.currentBook.load.bind(e.currentBook)).then(i.find.bind(i,t)).finally(i.unload.bind(i))}))).then((function(t){return Promise.resolve([].concat.apply([],t))}))}}},at=ot,rt=(i("0ea3"),Object(u["a"])(at,it,st,!1,null,"787b2cc5",null)),ct=rt.exports,lt=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ebook-slide-bookmark"},[i("div",{staticClass:"slide-bookmark-title"},[t._v(t._s(t.$t("book.bookmark"))+" · "+t._s(t.bookmark?t.bookmark.length:0))]),i("scroll",{staticClass:"slide-bookmark-list",attrs:{top:48,bottom:48}},t._l(t.bookmark,(function(e,s){return i("div",{key:s,staticClass:"slide-bookmark-item",on:{click:function(i){return t.display(e.cfi)}}},[i("div",{staticClass:"slide-bookmark-item-icon"},[i("div",{staticClass:"icon-bookmark"})]),i("div",{staticClass:"slide-bookmark-item-text"},[t._v(t._s(e.text))])])})),0)],1)},ut=[],ht={mixins:[r["b"]],components:{Scroll:nt["a"]},data:function(){return{bookmark:null}},mounted:function(){this.bookmark=Object(N["b"])(this.fileName)}},ft=ht,dt=(i("bb18"),Object(u["a"])(ft,lt,ut,!1,null,"59950e96",null)),bt=dt.exports,pt={mixins:[r["b"]],components:{EbookLoading:et},data:function(){return{tab:1,content:ct,bookmark:bt}},methods:{selectTab:function(t){this.tab=t}}},mt=pt,kt=(i("3bc8"),Object(u["a"])(mt,J,K,!1,null,"1b172bab",null)),vt=kt.exports,gt={mixins:[r["b"]],components:{EbookSettingFontPopup:O,EbookSlide:vt,EbookSettingProgress:R,EbookSettingFont:w,EbookSettingTheme:P,EbookSpeakingIcon:q}},wt=gt,yt=(i("6a78"),Object(u["a"])(wt,d,b,!1,null,"77c9e878",null)),xt=yt.exports,Ct=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ebook-header"},[i("span",{staticClass:"ebook-header-text"},[t._v(t._s(t.getSectionName))])])},_t=[],St={mixins:[r["b"]]},Ot=St,Vt=(i("24b2"),Object(u["a"])(Ot,Ct,_t,!1,null,"74c9c482",null)),Bt=Vt.exports,$t=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ebook-footer"},[i("span",{staticClass:"ebook-footer-text"},[t._v(t._s(this.progress+"%"))])])},jt=[],Ft={mixins:[r["b"]]},Pt=Ft,Tt=(i("098f"),Object(u["a"])(Pt,$t,jt,!1,null,"a16254a2",null)),Et=Tt.exports,Nt=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"ebookBookmark",staticClass:"ebook-bookmark"},[i("div",{staticClass:"ebook-bookmark-text-wrapper"},[i("div",{ref:"iconDown",staticClass:"ebook-bookmark-down-wrapper"},[i("span",{staticClass:"icon-down"})]),i("div",{staticClass:"ebook-bookmark-text"},[t._v("\n      "+t._s(t.text)+"\n    ")])]),i("div",{staticClass:"ebook-bookmark-icon-wrapper",style:t.fixed&&!t.isPaginating?t.fixedStyle:{}},[i("book-mark",{ref:"bookmark",attrs:{width:15,height:35,color:t.color}})],1)])},Lt=[],Dt=(i("6b54"),i("d263"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"bookmark",staticClass:"ebook-bookmark-icon",style:t.style})}),zt=[],Rt=(i("c5f6"),{props:{width:Number,height:Number,color:String},computed:{style:function(){return{borderColor:"".concat(this.color," ").concat(this.color," transparent ").concat(this.color)}}},methods:{refresh:function(){this.height&&this.width&&this.width>0&&this.height>10&&(this.$refs.bookmark.style.borderWidth="".concat(Object(W["c"])(this.height-5),"rem ").concat(Object(W["c"])(this.width/2),"rem ").concat(Object(W["c"])(5),"rem ").concat(Object(W["c"])(this.width/2),"rem"))}},mounted:function(){this.refresh()}}),It=Rt,Mt=(i("92ea"),Object(u["a"])(It,Dt,zt,!1,null,"4fc917b8",null)),Wt=Mt.exports,At="#346cbc",Yt="#fff",Gt={mixins:[r["b"]],components:{BookMark:Wt},computed:{height:function(){return Object(W["d"])(35)},threshold:function(){return Object(W["d"])(55)},fixedStyle:function(){return{position:"fixed",right:"".concat((window.innerWidth-this.$refs.ebookBookmark.clientWidth)/2,"px"),top:0}}},watch:{offsetY:function(t){var e=this;this.settingVisible>0||this.menuVisible||this.isPaginating||(t>=this.height&&t<this.threshold?(this.setBookmark=!1,this.$refs.ebookBookmark.style.top="".concat(-t,"px"),"rotate(180deg)"===this.$refs.iconDown.style.transform&&(this.$refs.iconDown.style.transform="rotate(0deg)"),this.isBookmark?(this.text=this.$t("book.pulldownDeleteMark"),this.color=At):(this.text=this.$t("book.pulldownAddMark"),this.color=Yt)):t>=this.threshold?(this.setBookmark=!0,this.$refs.ebookBookmark.style.top="".concat(-t,"px"),"rotate(0deg)"!==this.$refs.iconDown.style.transform&&""!==this.$refs.iconDown.style.transform||(this.$refs.iconDown.style.transform="rotate(180deg)"),this.isBookmark?(this.text=this.$t("book.releaseDeleteMark"),this.color=Yt):(this.text=this.$t("book.releaseAddMark"),this.color=At)):t>0&&t<this.height?(this.setBookmark=!1,this.isBookmark?this.text=this.$t("book.pulldownDeleteMark"):this.text=this.$t("book.pulldownAddMark")):0===t&&(this.isBookmark?this.setBookmark?(this.fixed=!1,this.removeBookmark()):this.fixed=!0:this.setBookmark?(this.fixed=!0,this.setAndSaveBookmark()):this.fixed=!1,setTimeout((function(){e.$refs.ebookBookmark.style.top="".concat(-e.height,"px"),e.$refs.iconDown.style.transform="rotate(0deg)",e.fixed||e.color!==At||(e.color=Yt),e.text===e.$t("book.releaseAddMark")&&(e.text=e.$t("book.pulldownAddMark")),e.setBookmark=!1}),200)))},isBookmark:function(t){this.fixed=t,this.color=t?At:Yt}},data:function(){return{color:Yt,text:"",setBookmark:!1,fixed:!1}},methods:{setAndSaveBookmark:function(){var t=this;this.bookmark=Object(N["b"])(this.fileName),this.bookmark||(this.bookmark=[]);var e=this.currentBook.rendition.currentLocation(),i=e.start.cfi.replace(/!.*/,"").replace("epubcfi(",""),s=e.start.cfi.replace(/.*!/,"").replace(/\)/,""),n=e.end.cfi.replace(/.*!/,"").replace(/\)/,""),o="epubcfi(".concat(i,"!,").concat(s,",").concat(n,")"),a=e.start.cfi;this.currentBook.getRange(o).then((function(e){var i=e.toString();i=i.replace(/\s\s/g,""),i=i.replace(/\r/g,""),i=i.replace(/\n/g,""),i=i.replace(/\t/g,""),i=i.replace(/\f/g,""),t.bookmark.push({cfi:a,text:i}),t.setIsBookmark(!0),Object(N["l"])(t.fileName,t.bookmark)}))},removeBookmark:function(){var t=this.currentBook.rendition.currentLocation(),e=t.start.cfi;this.bookmark&&(this.bookmark=this.bookmark.filter((function(t){return t.cfi!==e})),Object(N["l"])(this.fileName,this.bookmark)),this.setIsBookmark(!1)}}},Ht=Gt,qt=(i("0520"),Object(u["a"])(Ht,Nt,Lt,!1,null,"7223821c",null)),Jt=qt.exports,Kt={mixins:[r["b"]],components:{EbookBookmark:Jt,EbookFooter:Et,EbookHeader:Bt,EbookTitle:f,EbookMenu:xt},watch:{offsetY:function(t){null===this.isPaginating||!1!==this.isPaginating||this.menuVisible||(0===t?this.restore():t>0&&this.move(t))}},methods:{restore:function(){var t=this;this.$refs.ebookView.style.top=0,this.$refs.ebookView.style.transition="all .2s linear",setTimeout((function(){t.$refs.ebookView.style.transition=""}),200)},move:function(t){this.$refs.ebookView.style.top=t+"px"},startLoopReadTime:function(){var t=this,e=Object(N["i"])(name);e||(e=0),this.task=setInterval((function(){e++,e%30===0&&Object(N["t"])(t.fileName,e)}),1e3)}},created:function(){this.setGlobalTheme()},mounted:function(){this.startLoopReadTime()},beforeDestroy:function(){this.task&&clearInterval(this.task)}},Qt=Kt,Ut=(i("c77a"),Object(u["a"])(Qt,s,n,!1,null,"6ebac948",null));e["default"]=Ut.exports},5593:function(t,e,i){"use strict";i("22b4")},"5df3":function(t,e,i){"use strict";var s=i("02f4")(!0);i("01f9")(String,"String",(function(t){this._t=String(t),this._i=0}),(function(){var t,e=this._t,i=this._i;return i>=e.length?{value:void 0,done:!0}:(t=s(e,i),this._i+=t.length,{value:t,done:!1})}))},"5eda":function(t,e,i){var s=i("5ca1"),n=i("8378"),o=i("79e5");t.exports=function(t,e){var i=(n.Object||{})[t]||Object[t],a={};a[t]=e(i),s(s.S+s.F*o((function(){i(1)})),"Object",a)}},"64b2":function(t,e,i){},"6a78":function(t,e,i){"use strict";i("1b11")},"6b54":function(t,e,i){"use strict";i("3846");var s=i("cb7c"),n=i("0bfb"),o=i("9e1e"),a="toString",r=/./[a],c=function(t){i("2aba")(RegExp.prototype,a,t,!0)};i("79e5")((function(){return"/a/b"!=r.call({source:"a",flags:"b"})}))?c((function(){var t=s(this);return"/".concat(t.source,"/","flags"in t?t.flags:!o&&t instanceof RegExp?n.call(t):void 0)})):r.name!=a&&c((function(){return r.call(this)}))},"76d3":function(t,e,i){"use strict";i("d8c6")},"7a08":function(t,e,i){},"7a8b":function(t,e,i){},"7f7f":function(t,e,i){var s=i("86cc").f,n=Function.prototype,o=/^\s*function ([^ (]*)/,a="name";a in n||i("9e1e")&&s(n,a,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(t){return""}}})},"8e6e":function(t,e,i){var s=i("5ca1"),n=i("990b"),o=i("6821"),a=i("11e9"),r=i("f1ae");s(s.S,"Object",{getOwnPropertyDescriptors:function(t){var e,i,s=o(t),c=a.f,l=n(s),u={},h=0;while(l.length>h)i=c(s,e=l[h++]),void 0!==i&&r(u,e,i);return u}})},"92ea":function(t,e,i){"use strict";i("40d2")},"990b":function(t,e,i){var s=i("9093"),n=i("2621"),o=i("cb7c"),a=i("7726").Reflect;t.exports=a&&a.ownKeys||function(t){var e=s.f(o(t)),i=n.f;return i?e.concat(i(t)):e}},"9dc9":function(t,e,i){"use strict";i("ea00")},"9eb1":function(t,e,i){},aae3:function(t,e,i){var s=i("d3f4"),n=i("2d95"),o=i("2b4c")("match");t.exports=function(t){var e;return s(t)&&(void 0!==(e=t[o])?!!e:"RegExp"==n(t))}},ac0d:function(t,e,i){"use strict";i.d(e,"b",(function(){return u})),i.d(e,"a",(function(){return h}));i("8e6e"),i("456d"),i("a481"),i("f559"),i("7f7f"),i("ac6a");function s(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var n=i("2f62"),o=i("5de6"),a=i("fa7d"),r=i("e8ec");function c(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,s)}return i}function l(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?c(Object(i),!0).forEach((function(e){s(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):c(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var u={computed:l(l({},Object(n["c"])(["fileName","menuVisible","settingVisible","defaultFontSize","defaultFontFamily","fontFamilyVisible","defaultTheme","bookAvailable","progress","section","isPaginating","currentBook","navigation","cover","metadata","paginate","pagelist","offsetY","isBookmark","speakingIconBottom"])),{},{themeList:function(){return Object(o["o"])(this)},getSectionName:function(){if(this.section){var t=this.currentBook.section(this.section);if(t&&t.href&&this.currentBook&&this.currentBook.navigation){var e=this.navigation[this.section];return e?e.label:""}}}}),data:function(){return{fontSizeList:o["b"],fontFamily:o["a"]}},methods:l(l({},Object(n["b"])(["setFileName","setMenuVisible","setSettingVisible","setDefaultFontSize","setDefaultFontFamily","setFontFamilyVisible","setDefaultTheme","setBookAvailable","setProgress","setSection","setIsPaginating","setCurrentBook","setNavigation","setCover","setMetadata","setPaginate","setPagelist","setOffsetY","setIsBookmark","setSpeakingIconBottom"])),{},{showFontFamilySetting:function(){this.setFontFamilyVisible(!0)},showSetting:function(t){this.setSettingVisible(t)},hideMenuVisible:function(){this.setMenuVisible(!1),this.setSettingVisible(-1),this.setFontFamilyVisible(!1)},toggleMenuVisible:function(){this.menuVisible&&(this.setSettingVisible(-1),this.setFontFamilyVisible(!1)),this.setMenuVisible(!this.menuVisible)},hideFontFamilySetting:function(){this.setFontFamilyVisible(!1)},setGlobalTheme:function(t){switch(Object(a["e"])(),t){case"Default":Object(a["a"])("".concat("http://47.99.166.157/book/res","/theme/theme_default.css"));break;case"Eye":Object(a["a"])("".concat("http://47.99.166.157/book/res","/theme/theme_eye.css"));break;case"Gold":Object(a["a"])("".concat("http://47.99.166.157/book/res","/theme/theme_gold.css"));break;case"Night":Object(a["a"])("".concat("http://47.99.166.157/book/res","/theme/theme_night.css"));break;default:this.setDefaultTheme("Default"),Object(a["a"])("".concat("http://47.99.166.157/book/res","/theme/theme_default.css"));break}},registerTheme:function(){var t=this;this.themeList.forEach((function(e){t.currentBook.rendition.themes.register(e.name,e.style)}))},switchTheme:function(){var t=this,e=this.themeList.filter((function(e){return e.name===t.defaultTheme}))[0];this.defaultFontFamily&&"Default"!==this.defaultFontFamily?e.style.body["font-family"]="".concat(this.defaultFontFamily,"!important"):e.style.body["font-family"]="Times New Roman!important",this.registerTheme(),this.currentBook.rendition.themes.select(this.defaultTheme),this.currentBook.rendition.themes.fontSize(this.defaultFontSize),this.setGlobalTheme(this.defaultTheme)},setFontSize:function(t){var e=this;this.setDefaultFontSize(t).then((function(){e.switchTheme(),r["n"](e.fileName,t)}))},setTheme:function(t){var e=this;this.setDefaultTheme(t).then((function(){e.switchTheme(),r["u"](e.fileName,t)}))},setFontFamily:function(t){var e=this;this.setDefaultFontFamily(t).then((function(){e.switchTheme(),r["m"](e.fileName,t)}))},displaySection:function(t){var e=this,i=this.currentBook.section(this.section);i&&i.href&&this.currentBook.rendition.display(i.href).then((function(){e.refreshLocation(),t&&t()}))},displayProgress:function(){var t=this,e=this.currentBook.locations.cfiFromPercentage(this.progress/100);this.currentBook.rendition.display(e).then((function(){t.refreshLocation()}))},display:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t?this.currentBook.rendition.display(t).then((function(){i&&t.startsWith("epubcfi")&&e.currentBook.getRange(t).then((function(i){e.currentBook.rendition.annotations.highlight(t,{},(function(t){}))})),e.refreshLocation()})):this.currentBook.rendition.display().then((function(){e.refreshLocation()})),this.hideMenuVisible()},refreshLocation:function(){var t=this.currentBook.rendition.currentLocation();if(t.start&&t.start.index){this.setSection(t.start.index);var e=this.currentBook.locations.percentageFromCfi(t.start.cfi);this.setProgress(Math.floor(100*e)),this.pagelist?t.start.location<=0?this.setPaginate(""):this.setPaginate(t.start.location+" / "+this.pagelist.length):this.setPaginate("");var i=t.start.cfi,s=r["b"](this.fileName);s&&s.some((function(t){return t.cfi===i}))?this.setIsBookmark(!0):this.setIsBookmark(!1),r["q"](this.fileName,i)}},getReadTime:function(){return this.$t("book.haveRead").replace("$1",Object(o["i"])(this.fileName))}})},h={methods:{showBookDetail:function(t){Object(o["m"])(this,t)}}}},b78d:function(t,e,i){},b909:function(t,e,i){},bb18:function(t,e,i){"use strict";i("7a08")},c77a:function(t,e,i){"use strict";i("9eb1")},d263:function(t,e,i){"use strict";i("386b")("fixed",(function(t){return function(){return t(this,"tt","","")}}))},d2c8:function(t,e,i){var s=i("aae3"),n=i("be13");t.exports=function(t,e,i){if(s(e))throw TypeError("String#"+i+" doesn't accept regex!");return String(n(t))}},d8c6:function(t,e,i){},ea00:function(t,e,i){},f1ae:function(t,e,i){"use strict";var s=i("86cc"),n=i("4630");t.exports=function(t,e,i){e in t?s.f(t,e,n(0,i)):t[e]=i}},f559:function(t,e,i){"use strict";var s=i("5ca1"),n=i("9def"),o=i("d2c8"),a="startsWith",r=""[a];s(s.P+s.F*i("5147")(a),"String",{startsWith:function(t){var e=o(this,t,a),i=n(Math.min(arguments.length>1?arguments[1]:void 0,e.length)),s=String(t);return r?r.call(e,s,i):e.slice(i,i+s.length)===s}})},f604:function(t,e,i){"use strict";i("1256")}}]);