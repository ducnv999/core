var __awaiter=this&&this.__awaiter||function(t,e,n,r){function i(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,o){function a(t){try{c(r.next(t))}catch(e){o(e)}}function u(t){try{c(r["throw"](t))}catch(e){o(e)}}function c(t){t.done?n(t.value):i(t.value).then(a,u)}c((r=r.apply(t,e||[])).next())}))};var __generator=this&&this.__generator||function(t,e){var n={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},r,i,o,a;return a={next:u(0),throw:u(1),return:u(2)},typeof Symbol==="function"&&(a[Symbol.iterator]=function(){return this}),a;function u(t){return function(e){return c([t,e])}}function c(a){if(r)throw new TypeError("Generator is already executing.");while(n)try{if(r=1,i&&(o=a[0]&2?i["return"]:a[0]?i["throw"]||((o=i["return"])&&o.call(i),0):i.next)&&!(o=o.call(i,a[1])).done)return o;if(i=0,o)a=[a[0]&2,o.value];switch(a[0]){case 0:case 1:o=a;break;case 4:n.label++;return{value:a[1],done:false};case 5:n.label++;i=a[1];a=[0];continue;case 7:a=n.ops.pop();n.trys.pop();continue;default:if(!(o=n.trys,o=o.length>0&&o[o.length-1])&&(a[0]===6||a[0]===2)){n=0;continue}if(a[0]===3&&(!o||a[1]>o[0]&&a[1]<o[3])){n.label=a[1];break}if(a[0]===6&&n.label<o[1]){n.label=o[1];o=a;break}if(o&&n.label<o[2]){n.label=o[2];n.ops.push(a);break}if(o[2])n.ops.pop();n.trys.pop();continue}a=e.call(t,n)}catch(u){a=[6,u];i=0}finally{r=o=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:true}}};System.register(["./p-aa15c74d.system.js"],(function(t){"use strict";var e,n,r,i;return{setters:[function(t){e=t.r;n=t.c;r=t.h;i=t.H}],execute:function(){var o=function(t){return t&&typeof t==="string"?t.split(","):[]};var a=function(t,e){if(t&&t.length&&e&&typeof e==="string"){return t.filter((function(t){var n=t.data.inode;return e.split(",").includes(n)})).map((function(t){var e=t.data;return e}))}return[]};var u=t("dot_card_view",function(){function t(t){e(this,t);this.items=[];this.selection=[];this.selected=n(this,"selected",7);this.onCardClick=n(this,"onCardClick",7)}t.prototype.getValue=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){return[2,this.selection]}))}))};t.prototype.watchItems=function(t){this.selection=a(t,this.value)};t.prototype.watchValue=function(t){this.selection=a(this.items,t)};t.prototype.render=function(){var t=this;var e=o(this.value);return r(i,null,this.items.map((function(n){return r("dot-card-contentlet",{onClick:function(){t.onCardClick.emit(n.data)},key:n.data.inode,checked:e.includes(n.data.inode),onCheckboxChange:function(e){var n=e.detail,r=n.checked,i=n.data;if(r){t.selection.push(i)}else{t.selection=t.selection.filter((function(t){return t.identifier!==i.identifier}))}t.value=t.selection.map((function(t){var e=t.inode;return e})).join(",");t.selected.emit(t.selection)},item:n})})))};Object.defineProperty(t,"watchers",{get:function(){return{items:["watchItems"],value:["watchValue"]}},enumerable:true,configurable:true});Object.defineProperty(t,"style",{get:function(){return":host{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));grid-gap:var(--basic-padding-2)}dot-card-contentlet{height:100%}dot-card-contentlet:before{content:\"\";display:inline-block;-ms-flex:0 0 0px;flex:0 0 0;height:0;padding-bottom:calc(100%)}"},enumerable:true,configurable:true});return t}())}}}));