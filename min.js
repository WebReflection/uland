self.uland=function(n){"use strict";function t(n){return function(n){if(Array.isArray(n))return e(n)}(n)||function(n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(n))return Array.from(n)}(n)||function(n,t){if(!n)return;if("string"==typeof n)return e(n,t);var r=Object.prototype.toString.call(n).slice(8,-1);"Object"===r&&n.constructor&&(r=n.constructor.name);if("Map"===r||"Set"===r)return Array.from(n);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return e(n,t)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}
/*! (c) Andrea Giammarchi - ISC */()}function e(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}var r={};r.CustomEvent="function"==typeof CustomEvent?CustomEvent:function(n){return t[n]=new t("").constructor[n],t;function t(n,t){t||(t={});var e=document.createEvent("CustomEvent");return e.initCustomEvent(n,!!t.bubbles,!!t.cancelable,t.detail),e}}("prototype");var u=r.CustomEvent,o=function(n,t,e,r){var u=new WeakMap,o=new WeakMap,i=new WeakMap,c=function(n){return u.has(n)},l=function(n){c(n)&&(f(n,n.removeEventListener,u.get(n)),u.delete(n))},f=function(n,t,e){t.call(n,"disconnected",e),t.call(n,"connected",e)},s=function(n,t,e,r){for(var u=n.length,o=0;o<u;o++)v(n[o],t,e,r)},v=function(n,r,u,o){c(n)&&!u.has(n)&&(o.delete(n),u.set(n,0),n.dispatchEvent(new(e||CustomEvent)(r))),s(n[t||"children"]||[],r,u,o)},h=new(r||MutationObserver)((function(n){for(var t=n.length,e=0;e<t;e++){var r=n[e],u=r.removedNodes,a=r.addedNodes;s(u,"disconnected",i,o),s(a,"connected",o,i)}}));return h.observe(n||document,{subtree:!0,childList:!0}),{has:c,connect:function(n,t){l(n),(t||(t={})).handleEvent||(t.handleEvent=a),f(n,n.addEventListener,t),u.set(n,t)},disconnect:l,kill:function(){h.disconnect()}}};function a(n){n.type in this&&this[n.type](n)}var i="function"==typeof Promise?Promise:function(n){var t,e=[],r=0;return n((function(n){t=n,r=1,e.splice(0).forEach(u)})),{then:u};function u(n){return r?setTimeout(n,0,t):e.push(n),this}},c=null,l=new Set,f=function(n){var t=n.$,e=n.r,r=n.h;w(e)&&(v.get(r).delete(n),e()),w(n.r=t())&&v.get(r).add(n)},s=function(){var n=l;l=new Set,n.forEach((function(n){var t=n.h,e=n.c,r=n.a;n.e&&t.apply(e,r)}))},v=new WeakMap,h=[],d=[];function p(n,t){return n!==this[t]}var m=function(n){var t=v.get(n);t&&b.then((function(){t.forEach((function(n){n.r(),n.r=null})),t.clear()}))},y=function(){return c},g=function(n){return v.has(n)},w=function(n){return"function"==typeof n},b=new i((function(n){return n()}));function E(n){var t=this._;this.value!==n&&(this._=new Set,this.value=n,t.forEach((function(n){var t=n.h,e=n.c,r=n.a;t.apply(e,r)})))}var C=function(n,t){var e=y(),r=e.i,u=e.s;return r!==u.length&&t&&!t.some(p,u[r]._)||(u[r]={$:n(),_:t}),u[e.i++].$},A=function(n){return function(t,e){var r=y(),u=r.i,o=r.s,a=r.h,i=u===o.length;r.i++,i&&(v.has(a)||v.set(a,new Set),o[u]={$:t,_:e,r:null,h:a}),(i||!e||e.some(p,o[u]._))&&n.push(o[u]),o[u].$=t,o[u]._=e}},k=A(h),x=A(d),N=function(n,t){return w(t)?t(n):t},S=function(n,t,e){var r=y(),u=r.i,o=r.s;u===o.length&&o.push({$:w(e)?e(t):N(void 0,t),set:function(t){o[u].$=n(o[u].$,t),function(n){l.has(n)||(n.e=1,l.add(n),b.then(s))}(r)}});var a=o[r.i++];return[a.$,a.set]},M=null,$=null,T=null,O=new WeakMap,L=new WeakMap,W=function(n,t,e,r){var u=function(u){O.has(n)||(O.set(n,0),b.then((function(){O.delete(n),n.apply(t,e)}))),r(u)};return L.set(r,u),u},_=function(n,t,e,r){return n?[r[0],L.get(r[1])||W(n,t,e,r[1])]:r},j=function(n,t){var e=function(n){var t={h:e,c:null,a:null,e:0,i:0,s:[]};return e;function e(){var e=c;c=t,t.e=t.i=0;try{return n.apply(t.c=this,t.a=arguments)}finally{c=e,h.length&&b.then(h.forEach.bind(h.splice(0),f)),d.length&&d.splice(0).forEach(f)}}}(t?function(){var t=M,r=$,u=T;M=e,$=this,T=arguments;try{return n.apply($,T)}finally{M=t,$=r,T=u}}:n);return e},R=null,B=function(n){var t=n.firstChild;if(t&&1!==t.nodeType&&!(t=t.nextElementSibling))throw"unobservable";return t},D=function n(t){var e=t.nodeType;if(e)return 1===e?t:B(t);var r=t.valueOf();return r!==t?n(r):B(r)},H=function(n,t){var e=j(n,t);return function(){var n=e.apply(this,arguments);if(g(e)){var t=D(n);R||(R=o(t.ownerDocument,"children",u)),R.has(t)||R.connect(t,{disconnected:function(){m(e)}})}return n}},z=function(n){return{get:function(t){return n.get(t)},set:function(t,e){return n.set(t,e),e}}},I=Array.isArray,P=[],V=P.indexOf,q=P.slice,F=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,U=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,G=/<[a-z][^>]+$/i,J=/>[^<>]*$/,K=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/gi,Q=/\s+$/,X=function n(t,e){return 0<e--&&(G.test(t[e])||!J.test(t[e])&&n(t,e))},Y=function(n,t,e){return U.test(t)?n:"<".concat(t).concat(e.replace(Q,""),"></").concat(t,">")},Z=function(n,t,e){for(var r=[],u=n.length,o=function(e){var u=n[e-1];r.push(F.test(u)&&X(n,e)?u.replace(F,(function(n,r,u){return"".concat(t).concat(e-1,"=").concat(u||'"').concat(r).concat(u?"":'"')})):"".concat(u,"\x3c!--").concat(t).concat(e-1,"--\x3e"))},a=1;a<u;a++)o(a);r.push(n[u-1]);var i=r.join("").trim();return e?i:i.replace(K,Y)},nn=function(n,t){return 111===n.nodeType?1/t<0?t?function(n){var t=n.firstChild,e=n.lastChild,r=document.createRange();return r.setStartAfter(t),r.setEndAfter(e),r.deleteContents(),t}(n):n.lastChild:t?n.valueOf():n.firstChild:n},tn=function(n){var t="fragment",e="template",r="content"in o(e)?function(n){var t=o(e);return t.innerHTML=n,t.content}:function(n){var r=o(t),a=o(e),i=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(n)){var c=RegExp.$1;a.innerHTML="<table>"+n+"</table>",i=a.querySelectorAll(c)}else a.innerHTML=n,i=a.childNodes;return u(r,i),r};return function(n,t){return("svg"===t?a:r)(n)};function u(n,t){for(var e=t.length;e--;)n.appendChild(t[0])}function o(e){return e===t?n.createDocumentFragment():n.createElementNS("http://www.w3.org/1999/xhtml",e)}function a(n){var e=o(t),r=o("div");return r.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+n+"</svg>",u(e,r.firstChild.childNodes),e}}(document),en=function(n,t){return n.childNodes[t]},rn=function(n){for(var t=[],e=n.parentNode;e;)t.push(V.call(e.childNodes,n)),e=(n=e).parentNode;return t},un=document,on=un.createTreeWalker,an=un.importNode,cn=1!=an.length,ln=cn?function(n,t,e){return an.call(document,tn(n,t,e),!0)}:tn,fn=cn?function(n){return on.call(document,n,129,null,!1)}:function(n){return on.call(document,n,129)},sn=function(n,t,e){return function(n,t,e,r,u){for(var o=e.length,a=t.length,i=o,c=0,l=0,f=null;c<a||l<i;)if(a===c)for(var s=i<o?l?r(e[l-1],-0).nextSibling:r(e[i-l],0):u;l<i;)n.insertBefore(r(e[l++],1),s);else if(i===l)for(;c<a;)f&&f.has(t[c])||n.removeChild(r(t[c],-1)),c++;else if(t[c]===e[l])c++,l++;else if(t[a-1]===e[i-1])a--,i--;else if(t[c]===e[i-1]&&e[l]===t[a-1]){var v=r(t[--a],-1).nextSibling;n.insertBefore(r(e[l++],1),r(t[c++],-1).nextSibling),n.insertBefore(r(e[--i],1),v),t[a]=e[i]}else{if(!f){f=new Map;for(var h=l;h<i;)f.set(e[h],h++)}if(f.has(t[c])){var d=f.get(t[c]);if(l<d&&d<i){for(var p=c,m=1;++p<a&&p<i&&f.get(t[p])===d+m;)m++;if(m>d-l)for(var y=r(t[c],0);l<d;)n.insertBefore(r(e[l++],1),y);else n.replaceChild(r(e[l++],1),r(t[c++],-1))}else c++}else n.removeChild(r(t[c++],-1))}return e}(n.parentNode,t,e,nn,n)},vn=function(n,t){switch(t[0]){case"?":return function(n,t,e){return function(r){e!==!!r&&((e=!!r)?n.setAttribute(t,""):n.removeAttribute(t))}}(n,t.slice(1),!1);case".":return function(n,t){return"dataset"===t?function(n){var t=n.dataset;return function(n){for(var e in n){var r=n[e];null==r?delete t[e]:t[e]=r}}}(n):function(e){n[t]=e}}(n,t.slice(1));case"o":if("n"===t[1])return function(n,t){var e,r=t.slice(2);return!(t in n)&&t.toLowerCase()in n&&(r=r.toLowerCase()),function(t){var u=I(t)?t:[t,!1];e!==u[0]&&(e&&n.removeEventListener(r,e,u[1]),(e=u[0])&&n.addEventListener(r,e,u[1]))}}(n,t)}switch(t){case"ref":return function(n){return function(t){"function"==typeof t?t(n):t.current=n}}(n);case"aria":return function(n){return function(t){for(var e in t){var r="role"===e?e:"aria-".concat(e),u=t[e];null==u?n.removeAttribute(r):n.setAttribute(r,u)}}}(n)}return function(n,t){var e,r=!0,u=document.createAttributeNS(null,t);return function(t){e!==t&&(null==(e=t)?r||(n.removeAttributeNode(u),r=!0):(u.value=t,r&&(n.setAttributeNodeNS(u),r=!1)))}}(n,t)};function hn(n){var t=n.type,e=n.path.reduceRight(en,this);return"node"===t?function(n){var t,e,r=[];return function u(o){switch(typeof o){case"string":case"number":case"boolean":t!==o&&(t=o,e||(e=document.createTextNode("")),e.nodeValue=o,r=sn(n,r,[e]));break;case"object":case"undefined":if(null==o){t!=o&&(t=o,r=sn(n,r,[]));break}if(I(o)){t=o,0===o.length?r=sn(n,r,[]):"object"==typeof o[0]?r=sn(n,r,o):u(String(o));break}"ELEMENT_NODE"in o&&t!==o&&(t=o,r=sn(n,r,11===o.nodeType?q.call(o.childNodes):[o]));break;case"function":u(o(n))}}}(e):"attr"===t?vn(e,n.name):function(n){var t;return function(e){t!=e&&(t=e,n.textContent=null==e?"":e)}}(e)}var dn="isµ",pn=z(new WeakMap),mn=/^(?:plaintext|script|style|textarea|title|xmp)$/i,yn=function(n,t){var e=pn.get(t)||pn.set(t,function(n,t){for(var e=Z(t,dn,"svg"===n),r=ln(e,n),u=fn(r),o=[],a=t.length-1,i=0,c="".concat(dn).concat(i);i<a;){var l=u.nextNode();if(!l)throw"bad template: ".concat(e);if(8===l.nodeType)l.nodeValue===c&&(o.push({type:"node",path:rn(l)}),c="".concat(dn).concat(++i));else{for(;l.hasAttribute(c);)o.push({type:"attr",path:rn(l),name:l.getAttribute(c)}),l.removeAttribute(c),c="".concat(dn).concat(++i);mn.test(l.tagName)&&l.textContent.trim()==="\x3c!--".concat(c,"--\x3e")&&(l.textContent="",o.push({type:"text",path:rn(l)}),c="".concat(dn).concat(++i))}}return{content:r,nodes:o}}(n,t)),r=e.content,u=e.nodes,o=an.call(document,r,!0);return{content:o,updates:u.map(hn,o)}},gn=function(n,t){var e=t.type,r=t.template,u=t.values,o=u.length;wn(n,u,o);var a=n.entry;a&&a.template===r&&a.type===e||(n.entry=a=function(n,t){var e=yn(n,t);return{type:n,template:t,content:e.content,updates:e.updates,wire:null}}(e,r));for(var i=a,c=i.content,l=i.updates,f=i.wire,s=0;s<o;s++)l[s](u[s]);return f||(a.wire=function(n){var t=n.childNodes,e=t.length;if(e<2)return e?t[0]:n;var r=q.call(t,0);return{ELEMENT_NODE:1,nodeType:111,firstChild:r[0],lastChild:r[e-1],valueOf:function(){if(t.length!==e)for(var u=0;u<e;)n.appendChild(r[u++]);return n}}}(c))},wn=function n(t,e,r){for(var u=t.stack,o=0;o<r;o++){var a=e[o];a instanceof bn?e[o]=gn(u[o]||(u[o]={stack:[],entry:null,wire:null}),a):I(a)?n(u[o]||(u[o]={stack:[],entry:null,wire:null}),a,a.length):u[o]=null}r<u.length&&u.splice(r)};function bn(n,t,e){this.type=n,this.template=t,this.values=e}var En=Object.create,Cn=Object.defineProperties,An=function(n){var t=z(new WeakMap);return Cn((function(t){for(var e=arguments.length,r=new Array(e>1?e-1:0),u=1;u<e;u++)r[u-1]=arguments[u];return new bn(n,t,r)}),{for:{value:function(e,r){var u=t.get(e)||t.set(e,En(null));return u[r]||(u[r]=function(t){return function(e){for(var r=arguments.length,u=new Array(r>1?r-1:0),o=1;o<r;o++)u[o-1]=arguments[o];return gn(t,{type:n,template:e,values:u})}}({stack:[],entry:null,wire:null}))}},node:{value:function(t){for(var e=arguments.length,r=new Array(e>1?e-1:0),u=1;u<e;u++)r[u-1]=arguments[u];return gn({stack:[],entry:null,wire:null},{type:n,template:t,values:r}).valueOf()}}})},kn=z(new WeakMap),xn=An("html"),Nn=An("svg"),Sn=Object.create,Mn=function(n){for(var t=arguments.length,e=new Array(t>1?t-1:0),r=1;r<t;r++)e[r-1]=arguments[r];return new bn("html",n,e)};Mn.for=Bn(xn);var $n=function(n){for(var t=arguments.length,e=new Array(t>1?t-1:0),r=1;r<t;r++)e[r-1]=arguments[r];return new bn("svg",n,e)};$n.for=Bn(Nn);var Tn=z(new WeakMap),On=function(){return{s:[],e:null}},Ln=function(n,t){var e=t.f,r=t.c,u=t.a,o=n.e;return o&&o.f===e||(n.e=o={f:e,h:null,$:null},o.h=function(n,t){return H((function(){var e=t.f.apply(this,arguments);return e instanceof bn?(Wn(n,e),t.$=jn(t,e)):t.$=e,t.$}))}(On(),o)),o.h.apply(r,u)},Wn=function(n,t){var e=t.values;_n(n,e)},_n=function n(t,e){for(var r=t.s,u=e.length,o=0;o<u;o++){var a=e[o];a instanceof Rn?e[o]=Ln(r[o]||(r[o]=On()),a):a instanceof bn?Wn(r[o]||(r[o]=On()),a):I(a)?n(r[o]||(r[o]=On()),a):r[o]=null}u<r.length&&r.splice(u)},jn=function(n,e){var r=e.type,u=e.template,o=e.values;return("svg"===r?Nn:xn).for(n,r).apply(void 0,[u].concat(t(o)))};function Rn(n,t,e){this.f=n,this.c=t,this.a=e}function Bn(n){var t=z(new WeakMap);return function(e,r){var u=t.get(e)||t.set(e,Sn(null)),o=u[r]||(u[r]=On());return function(t){for(var u=arguments.length,a=new Array(u>1?u-1:0),i=1;i<u;i++)a[i-1]=arguments[i];return _n(o,a),n.for(e,r).apply(void 0,[t].concat(a))}}}return n.Component=function(n){return function(){return new Rn(n,this,arguments)}},n.createContext=function(n){return{_:new Set,provide:E,value:n}},n.html=Mn,n.render=function(n,t){return(Tn.get(n)||Tn.set(n,{c:On(),h:H((function(t){var e="function"==typeof t?t():t;return function(n,t){var e="function"==typeof t?t():t,r=kn.get(n)||kn.set(n,{stack:[],entry:null,wire:null}),u=e instanceof bn?gn(r,e):e;return u!==r.wire&&(r.wire=u,n.textContent="",n.appendChild(u.valueOf())),n}(n,e instanceof Rn?Ln(this.c,e):(Wn(this.c,e),e))}),n)})).h(t)},n.svg=$n,n.useCallback=function(n,t){return C((function(){return n}),t)},n.useContext=function(n){var t=n._,e=n.value;return t.add(y()),e},n.useEffect=k,n.useLayoutEffect=x,n.useMemo=C,n.useReducer=function(n,t,e){return _(M,$,T,S(n,t,e))},n.useRef=function(n){var t=y(),e=t.i,r=t.s;return e===r.length&&r.push({current:n}),r[t.i++]},n.useState=function(n){return _(M,$,T,function(n){return S(N,n)}(n))},n}({});