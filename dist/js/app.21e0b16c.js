(function(e){function t(t){for(var r,a,i=t[0],u=t[1],l=t[2],p=0,f=[];p<i.length;p++)a=i[p],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&f.push(c[a][0]),c[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);s&&s(t);while(f.length)f.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,i=1;i<n.length;i++){var u=n[i];0!==c[u]&&(r=!1)}r&&(o.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},c={app:0},o=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var s=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"129e":function(e,t,n){"use strict";n("eddb")},"270a":function(e,t,n){},3835:function(e,t,n){"use strict";n("270a")},4762:function(e,t,n){e.exports=n.p+"img/singleplayer.81d8cf5c.png"},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23");function c(e,t,n,c,o,a){var i=Object(r["j"])("Main");return Object(r["g"])(),Object(r["c"])(i)}var o=function(e){return Object(r["i"])("data-v-527ba000"),e=e(),Object(r["h"])(),e},a={class:"main"},i=o((function(){return Object(r["e"])("h3",null,"Game Mode",-1)})),u={class:"cards"};function l(e,t,n,c,o,l){var s=Object(r["j"])("Header"),p=Object(r["j"])("Card");return Object(r["g"])(),Object(r["d"])(r["a"],null,[Object(r["f"])(s),Object(r["e"])("div",a,[i,Object(r["e"])("div",null,[Object(r["e"])("ul",u,[Object(r["e"])("li",null,[Object(r["f"])(p,{imageName:"singleplayer",title:"Singleplayer",height:"50",width:"50",onClick:t[0]||(t[0]=function(e){return l.test("singleplayer")})})]),Object(r["e"])("li",null,[Object(r["f"])(p,{imageName:"multiplayer",title:"Multiplayer",height:"50",width:"50",onClick:t[1]||(t[1]=function(e){return l.test("multiplayer")})})])])])])],64)}var s=function(e){return Object(r["i"])("data-v-2e73a304"),e=e(),Object(r["h"])(),e},p={class:"header"},f=s((function(){return Object(r["e"])("h1",null,"L&C",-1)})),d=[f];function b(e,t,n,c,o,a){return Object(r["g"])(),Object(r["d"])("div",p,d)}var g={name:"Header",components:{}},O=(n("f352"),n("6b0d")),j=n.n(O);const v=j()(g,[["render",b],["__scopeId","data-v-2e73a304"]]);var m=v,h={class:"card"},y=["src"];function w(e,t,c,o,a,i){return Object(r["g"])(),Object(r["d"])("div",h,[Object(r["e"])("img",{class:"image",src:n("9e01")("./".concat(c.imageName,".png"))},null,8,y),Object(r["e"])("p",null,Object(r["k"])(c.title),1)])}var _={name:"Card",props:{imageName:String,title:String,height:String,width:String},mounted:function(){},methods:{}};n("3835");const x=j()(_,[["render",w],["__scopeId","data-v-3db28b19"]]);var M=x,S={name:"Main",components:{Header:m,Card:M},methods:{test:function(e){console.log("test! ",e)}}};n("129e");const k=j()(S,[["render",l],["__scopeId","data-v-527ba000"]]);var C=k,P={name:"App",components:{Main:C}};const N=j()(P,[["render",c]]);var H=N;Object(r["b"])(H).mount("#app")},6574:function(e,t,n){e.exports=n.p+"img/multiplayer.2d027604.png"},"9e01":function(e,t,n){var r={"./logo.png":"cf05","./multiplayer.png":"6574","./singleplayer.png":"4762"};function c(e){var t=o(e);return n(t)}function o(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}c.keys=function(){return Object.keys(r)},c.resolve=o,e.exports=c,c.id="9e01"},cf05:function(e,t,n){e.exports=n.p+"img/logo.82b9c7a5.png"},eddb:function(e,t,n){},f352:function(e,t,n){"use strict";n("f9ca")},f9ca:function(e,t,n){}});
//# sourceMappingURL=app.21e0b16c.js.map