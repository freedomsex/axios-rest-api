module.exports=function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=13)}([function(t,e){t.exports=require("underscore")},function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e){function r(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}t.exports=function(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}},function(t,e,r){t.exports=r(12)},function(t,e){function r(e){return t.exports=r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},r(e)}t.exports=r},function(t,e){function r(t,e,r,n,o,i,u){try{var a=t[i](u),s=a.value}catch(t){return void r(t)}a.done?e(s):Promise.resolve(s).then(n,o)}t.exports=function(t){return function(){var e=this,n=arguments;return new Promise((function(o,i){var u=t.apply(e,n);function a(t){r(u,o,i,a,s,"next",t)}function s(t){r(u,o,i,a,s,"throw",t)}a(void 0)}))}}},function(t,e){t.exports=require("axios")},function(t,e,r){var n=r(9);t.exports=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&n(t,e)}},function(t,e,r){var n=r(10),o=r(11);t.exports=function(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?o(t):e}},function(t,e){function r(e,n){return t.exports=r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},r(e,n)}t.exports=r},function(t,e){function r(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=r=function(t){return typeof t}:t.exports=r=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(e)}t.exports=r},function(t,e){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}},function(t,e,r){var n=function(t){"use strict";var e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",u=n.toStringTag||"@@toStringTag";function a(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{a({},"")}catch(t){a=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof l?e:l,i=Object.create(o.prototype),u=new L(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return E()}for(r.method=o,r.arg=i;;){var u=r.delegate;if(u){var a=w(u,r);if(a){if(a===f)continue;return a}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var s=c(t,e,r);if("normal"===s.type){if(n=r.done?"completed":"suspendedYield",s.arg===f)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n="completed",r.method="throw",r.arg=s.arg)}}}(t,r,u),i}function c(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var f={};function l(){}function h(){}function p(){}var y={};y[o]=function(){return this};var v=Object.getPrototypeOf,d=v&&v(v(O([])));d&&d!==e&&r.call(d,o)&&(y=d);var g=p.prototype=l.prototype=Object.create(y);function m(t){["next","throw","return"].forEach((function(e){a(t,e,(function(t){return this._invoke(e,t)}))}))}function x(t,e){var n;this._invoke=function(o,i){function u(){return new e((function(n,u){!function n(o,i,u,a){var s=c(t[o],t,i);if("throw"!==s.type){var f=s.arg,l=f.value;return l&&"object"==typeof l&&r.call(l,"__await")?e.resolve(l.__await).then((function(t){n("next",t,u,a)}),(function(t){n("throw",t,u,a)})):e.resolve(l).then((function(t){f.value=t,u(f)}),(function(t){return n("throw",t,u,a)}))}a(s.arg)}(o,i,n,u)}))}return n=n?n.then(u,u):u()}}function w(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,w(t,e),"throw"===e.method))return f;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var n=c(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,f;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function b(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function L(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(b,this),this.reset(!0)}function O(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:E}}function E(){return{value:void 0,done:!0}}return h.prototype=g.constructor=p,p.constructor=h,h.displayName=a(p,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,a(t,u,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},m(x.prototype),x.prototype[i]=function(){return this},t.AsyncIterator=x,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var u=new x(s(e,r,n,o),i);return t.isGeneratorFunction(r)?u:u.next().then((function(t){return t.done?t.value:u.next()}))},m(g),a(g,u,"Generator"),g[o]=function(){return this},g.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=O,L.prototype={constructor:L,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return u.type="throw",u.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],u=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var a=r.call(i,"catchLoc"),s=r.call(i,"finallyLoc");if(a&&s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(a){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var u=i?i.completion:{};return u.type=t,u.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(u)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),k(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;k(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:O(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}(t.exports);try{regeneratorRuntime=n}catch(t){Function("r","regeneratorRuntime = r")(n)}},function(t,e,r){"use strict";r.r(e),r.d(e,"default",(function(){return E}));var n=r(1),o=r.n(n),i=r(2),u=r.n(i),a=r(0),s=r.n(a),c=r(7),f=r.n(c),l=r(8),h=r.n(l),p=r(4),y=r.n(p),v={get:"{id}",cget:"",post:"",delete:"{id}",put:"{id}",patch:"{id}",option:"{id}",load:"",send:"",new:"new",save:"save",edit:"edit/{id}",remove:"remove/{id}"},d=function(){function t(){o()(this,t),this.root="/",this.url="",this.routing=v,this.params={}}return u()(t,[{key:"init",value:function(t,e,r,n){var o=r?"".concat(r,"/"):"",i=e?"".concat(e,"/"):"",u=n?"".concat(n,"/"):"";return this.root="".concat(t,"/").concat(i).concat(o).concat(u),this}},{key:"setRouting",value:function(t,e){return this.routing={route:e},s.a.extend(this.routing,v,t),this}},{key:"setParams",value:function(t,e){var r=e.replace(/\{(.*?)\}/gi,(function(e,r){var n=t[r];return delete t[r],n}));return this.params=t||{},r}},{key:"getUrlPath",value:function(t){var e,r=this.routing.route,n=this.routing[t];return(e=r||"")&&n?e="".concat(e,"/").concat(n):n&&(e=n),e}},{key:"setUrl",value:function(t,e,r){var n,o=this.root;return this.isAbsolute(r)?(o="",n=r):n=r||this.getUrlPath(t),n=this.setParams(e,n),this.url=o+n,this.url}},{key:"isAbsolute",value:function(t){return new RegExp("(www|://)").test(t)}}]),t}(),g=r(3),m=r.n(g),x=r(5),w=r.n(x),b=r(6),k=r.n(b);function L(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=y()(t);if(e){var o=y()(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return h()(this,r)}}var O=function(t){f()(r,t);var e=L(r);function r(t){var n,i=t.defaults,u=t.axiosConfig,a=t.omitEmptyParams;return o()(this,r),(n=e.call(this,u,a)).name="default",n.config={},n.defaults=i,n.router=new d,n}return u()(r,[{key:"setApi",value:function(t){return this.router.init(t.host,t.prefix,t.version,t.postfix),this.setDelay(t.delay),this.isAuth()||!1===t.authorized||this.auth(t.key),this}},{key:"setResource",value:function(t,e){return this.name=e,this.router.setRouting(t.routing||{},e),this}},{key:"setDelay",value:function(t){return this.wait=t||0,this}},{key:"setHeaders",value:function(t){return t&&(s.a.defaults(this.config,{headers:{}}),s.a.extend(this.config.headers,t)),this}},{key:"setBaseURL",value:function(t){var e=t||this.defaults.baseURL||null;return e&&(this.config.baseURL=e),this}},{key:"isAuth",value:function(){return this.config.headers&&this.config.headers.Authorization}},{key:"auth",value:function(t){var e=t||this.defaults.key;return e&&this.setHeaders({Authorization:"Bearer ".concat(e)}),this}},{key:"baseURL",value:function(){return this.root}},{key:"lastURL",value:function(){return this.router.url}},{key:"setAxiosConfig",value:function(t){return s.a.extend(this.config,t),this}},{key:"clear",value:function(){return this.lastConfig=Object.assign({},this.config),this.config={},this}},{key:"dumpAxiosConfig",value:function(){return this.config}},{key:"lastAxiosConfig",value:function(){return this.lastConfig}}]),r}(function(){function t(e,r){o()(this,t),this.omitEmpty=!0===r,this.axiosInstance=k.a.create(e||{}),this.CancelToken=k.a.CancelToken}var e,r;return u()(t,[{key:"axios",value:function(){return this.axiosInstance}},{key:"get",value:function(t,e,r){return this.request("get","get",null,t,e,r)}},{key:"load",value:function(t,e,r){return this.request("get","load",null,t,e,r)}},{key:"cget",value:function(t,e,r){return this.request("get","cget",null,t,e,r)}},{key:"send",value:function(t,e,r){return this.request("get","send",null,t,e,r)}},{key:"post",value:function(t,e,r,n){return this.request("post","post",t,e,r,n)}},{key:"save",value:function(t,e,r,n){return this.request("post","save",t,e,r,n)}},{key:"new",value:function(t,e,r,n){return this.request("post","new",t,e,r,n)}},{key:"edit",value:function(t,e,r,n){return this.request("post","edit",t,e,r,n)}},{key:"remove",value:function(t,e,r,n){return this.request("post","remove",t,e,r,n)}},{key:"delete",value:function(t,e,r){return this.request("delete","delete",null,t,e,r)}},{key:"put",value:function(t,e,r,n){return this.request("put","put",t,e,r,n)}},{key:"patch",value:function(t,e,r,n){return this.request("patch","patch",t||{},e,r,n)}},{key:"option",value:function(t,e,r){return this.request("option","option",null,t,e,r)}},{key:"axiosData",value:function(t,e){return t||["post","put","patch"].includes(e)}},{key:"adaptParams",value:function(t){if(!this.omitEmpty)return t;return function t(e){return e=s.a.mapObject(e,(function(e){return s.a.isObject(e)?s.a.isEmpty(e)?null:t(e):e})),s.a.pick(e,(function(t){return""!==t&&!s.a.isNull(t)&&!s.a.isNaN(t)&&!s.a.isUndefined(t)}))}(t)}},{key:"request",value:(r=w()(m.a.mark((function t(e,r,n,o,i,u){var a,s,c=this;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=null,s=this.router.setUrl(r,o,i),this.config.params=this.adaptParams(this.router.params),this.currentRequest=this.CancelToken.source(),this.config.cancelToken=this.currentRequest.token,a=(a=this.axiosData(n,e)?this.axiosInstance[e](s,n,this.config):this.axiosInstance[e](s,this.config)).finally((function(){c.clear()})),t.next=9,this.delay(u);case 9:return t.abrupt("return",a);case 10:case"end":return t.stop()}}),t,this)}))),function(t,e,n,o,i,u){return r.apply(this,arguments)})},{key:"current",value:function(){return this.currentRequest}},{key:"cancel",value:function(t){(t=t||this.current()).cancel()}},{key:"delay",value:(e=w()(m.a.mark((function t(e){var r;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if((r=e||this.wait||0)<this.wait&&(r=this.wait),r){t.next=4;break}return t.abrupt("return",Promise.resolve());case 4:return t.abrupt("return",new Promise((function(t){s.a.delay(t,1e3*r)})));case 5:case"end":return t.stop()}}),t,this)}))),function(t){return e.apply(this,arguments)})}]),t}()),E=function(){function t(e,r,n){o()(this,t),this.resources=e||[],this.defaults={},this.axiosConfig=r,this.omitEmptyParams=n}return u()(t,[{key:"default",value:function(t,e){return void 0!==e&&(this.defaults[t]=e),this.defaults[t]}},{key:"define",value:function(t,e){return this.resources[t]=e,this}},{key:"extend",value:function(t,e){return s.a.extend(this.resources[t],e),this}},{key:"getConfig",value:function(t){var e=this.resources[t]||{},r=Object.assign({},e);return s.a.defaults(r,this.resources.default)}},{key:"res",value:function(t,e){var r=new O(this);return r.setApi(this.getConfig(e||t)),r.setResource(this.getConfig(t),t),r}},{key:"auth",value:function(t,e){return t&&(e?this.extend(e,{key:t}):this.default("key",t)),this}}]),t}()}]);