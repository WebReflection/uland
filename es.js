self.uland=function(e){"use strict";var t=CustomEvent,n=WeakSet;var r="function"==typeof cancelAnimationFrame,o=r?cancelAnimationFrame:clearTimeout,l=r?requestAnimationFrame:setTimeout;function s(e){var t,n,s,a,c;return i(),function(e,r,o){return s=e,a=r,c=o,n||(n=l(u)),--t<0&&f(!0),f};function u(){i(),s.apply(a,c||[])}function i(){t=e||1/0,n=r?0:null}function f(e){var t=!!n;return t&&(o(n),e&&u()),t}}var a=e=>({get:t=>e.get(t),set:(t,n)=>(e.set(t,n),n)})
/*! (c) Andrea Giammarchi - ISC */;let c=null;const u=e=>{const t=[];return function n(){const r=c,o=[];c={hook:n,args:arguments,stack:t,i:0,length:t.length,after:o};try{return e.apply(null,arguments)}finally{c=r;for(let e=0,{length:t}=o;e<t;e++)o[e]()}}},i=a(new WeakMap),f=(e,t,n)=>{e.apply(t,n)},d={async:!1,always:!1},p=(e,t)=>"function"==typeof t?t(e):t,h=(e,t,n,r)=>{const o=c.i++,{hook:l,args:a,stack:u,length:h}=c;o===h&&(c.length=u.push({}));const g=u[o];if(g.args=a,o===h){const o="function"==typeof n,{async:a,always:c}=(o?r:n)||r||d;g.$=o?n(t):p(void 0,t),g._=a?i.get(l)||i.set(l,s()):f,g.f=t=>{const n=e(g.$,t);(c||g.$!==n)&&(g.$=n,g._(l,null,g.args))}}return[g.$,g.f]},g=new WeakMap,v=({hook:e,args:t})=>{e.apply(null,t)};function m(e){this.value!==e&&(this.value=e,g.get(this).forEach(v))}function y({hook:e}){return e===this.hook}const w=new WeakMap,k=a(w),b=()=>{},N=e=>(t,n)=>{const r=c.i++,{hook:o,after:l,stack:a,length:u}=c;if(r<u){const o=a[r],{update:s,values:c,stop:u}=o;if(!n||n.some(T,c)){o.values=n,e&&u(e);const{clean:r}=o;r&&(o.clean=null,r());const a=()=>{o.clean=t()};e?s(a):l.push(a)}}else{const r=e?s():b,u={clean:null,update:r,values:n,stop:b};c.length=a.push(u),(k.get(o)||k.set(o,[])).push(u);const i=()=>{u.clean=t()};e?u.stop=r(i):l.push(i)}},C=e=>{(w.get(e)||[]).forEach((e=>{const{clean:t,stop:n}=e;n(),t&&(e.clean=null,t())}))},$=w.has.bind(w),x=N(!0),E=N(!1),M=(e,t)=>{const n=c.i++,{stack:r,length:o}=c;return n===o?c.length=r.push({$:e(),_:t}):t&&!t.some(T,r[n]._)||(r[n]={$:e(),_:t}),r[n].$};function T(e,t){return e!==this[t]}
/*! (c) Andrea Giammarchi - ISC */const A=
/*! (c) Andrea Giammarchi */
function(e){var t=e.Event,n=e.WeakSet,r=!0,o=null;return function(e){return r&&(r=!r,o=new n,function(e){var r=new n,l=new n;try{new MutationObserver(u).observe(e,{subtree:!0,childList:!0})}catch(t){var s=0,a=[],c=function(e){a.push(e),clearTimeout(s),s=setTimeout((function(){u(a.splice(s=0,a.length))}),0)};e.addEventListener("DOMNodeRemoved",(function(e){c({addedNodes:[],removedNodes:[e.target]})}),!0),e.addEventListener("DOMNodeInserted",(function(e){c({addedNodes:[e.target],removedNodes:[]})}),!0)}function u(e){for(var t,n=e.length,o=0;o<n;o++)i((t=e[o]).removedNodes,"disconnected",l,r),i(t.addedNodes,"connected",r,l)}function i(e,n,r,o){for(var l,s=new t(n),a=e.length,c=0;c<a;1===(l=e[c++]).nodeType&&f(l,s,n,r,o));}function f(e,t,n,r,l){o.has(e)&&!r.has(e)&&(l.delete(e),r.add(e),e.dispatchEvent(t));for(var s=e.children||[],a=s.length,c=0;c<a;f(s[c++],t,n,r,l));}}(e.ownerDocument)),o.add(e),e}}({Event:t,WeakSet:n}),L=(e,t)=>{const{nodeType:n}=e;if(n){const r=1===n?e:(e=>{let{firstChild:t}=e;for(;t&&1!==t.nodeType;)t=t.nextSibling;if(t)return t;throw"unobservable"})(e);A(r),r.addEventListener("disconnected",t,!1)}else{const n=e.valueOf();n!==e&&L(n,t)}},S=e=>{let t=null;const n=u(e);return function(){const e=n.apply(this,arguments);return $(n)&&L(e,t||(t=C.bind(null,n))),e}},O=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,W=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,_=/<[a-z][^>]+$/i,j=/>[^<>]*$/,D=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/gi,R=/\s+$/,B=(e,t)=>0<t--&&(_.test(e[t])||!j.test(e[t])&&B(e,t)),F=(e,t,n)=>W.test(t)?e:`<${t}${n.replace(R,"")}></${t}>`;const{isArray:H}=Array,{indexOf:z,slice:q}=[],P=(e,t)=>111===e.nodeType?1/t<0?t?(({firstChild:e,lastChild:t})=>{const n=document.createRange();return n.setStartAfter(e),n.setEndAfter(t),n.deleteContents(),e})(e):e.lastChild:t?e.valueOf():e.firstChild:e;
/*! (c) Andrea Giammarchi - ISC */
self.I=function(e){var t="fragment",n="template",r="content"in l(n)?function(e){var t=l(n);return t.innerHTML=e,t.content}:function(e){var r=l(t),s=l(n),a=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var c=RegExp.$1;s.innerHTML="<table>"+e+"</table>",a=s.querySelectorAll(c)}else s.innerHTML=e,a=s.childNodes;return o(r,a),r};return function(e,t){return("svg"===t?s:r)(e)};function o(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function l(n){return n===t?e.createDocumentFragment():e.createElementNS("http://www.w3.org/1999/xhtml",n)}function s(e){var n=l(t),r=l("div");return r.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",o(n,r.firstChild.childNodes),n}}(document);const G=({childNodes:e},t)=>e[t],J=e=>{const t=[];let{parentNode:n}=e;for(;n;)t.push(z.call(n.childNodes,e)),n=(e=n).parentNode;return t},{createTreeWalker:K,importNode:Q}=document,U=1!=Q.length,V=U?(e,t)=>Q.call(document,I(e,t),!0):I,X=U?e=>K.call(document,e,129,null,!1):e=>K.call(document,e,129),Y=(e,t,n)=>((e,t,n,r,o)=>{const l=n.length;let s=t.length,a=l,c=0,u=0,i=null;for(;c<s||u<a;)if(s===c){const t=a<l?u?r(n[u-1],-0).nextSibling:r(n[a-u],0):o;for(;u<a;)e.insertBefore(r(n[u++],1),t)}else if(a===u)for(;c<s;)i&&i.has(t[c])||e.removeChild(r(t[c],-1)),c++;else if(t[c]===n[u])c++,u++;else if(t[s-1]===n[a-1])s--,a--;else if(t[c]===n[a-1]&&n[u]===t[s-1]){const o=r(t[--s],-1).nextSibling;e.insertBefore(r(n[u++],1),r(t[c++],-1).nextSibling),e.insertBefore(r(n[--a],1),o),t[s]=n[a]}else{if(!i){i=new Map;let e=u;for(;e<a;)i.set(n[e],e++)}if(i.has(t[c])){const o=i.get(t[c]);if(u<o&&o<a){let l=c,f=1;for(;++l<s&&l<a&&i.get(t[l])===o+f;)f++;if(f>o-u){const l=r(t[c],0);for(;u<o;)e.insertBefore(r(n[u++],1),l)}else e.replaceChild(r(n[u++],1),r(t[c++],-1))}else c++}else e.removeChild(r(t[c++],-1))}return n})(e.parentNode,t,n,P,e),Z=(e,t)=>"ref"===t?(e=>t=>{"function"==typeof t?t(e):t.current=e})(e):"aria"===t?(e=>t=>{for(const n in t){const r="role"===n?n:"aria-"+n,o=t[n];null==o?e.removeAttribute(r):e.setAttribute(r,o)}})(e):".dataset"===t?(({dataset:e})=>t=>{for(const n in t){const r=t[n];null==r?delete e[n]:e[n]=r}})(e):"."===t.slice(0,1)?((e,t)=>n=>{e[t]=n})(e,t.slice(1)):"on"===t.slice(0,2)?((e,t)=>{let n,r=t.slice(2);return!(t in e)&&t.toLowerCase()in e&&(r=r.toLowerCase()),t=>{const o=H(t)?t:[t,!1];n!==o[0]&&(n&&e.removeEventListener(r,n,o[1]),(n=o[0])&&e.addEventListener(r,n,o[1]))}})(e,t):((e,t)=>{let n,r=!0;const o=document.createAttributeNS(null,t);return t=>{n!==t&&(n=t,null==n?r||(e.removeAttributeNode(o),r=!0):(o.value=t,r&&(e.setAttributeNodeNS(o),r=!1)))}})(e,t);function ee(e){const{type:t,path:n}=e,r=n.reduceRight(G,this);return"node"===t?(e=>{let t,n,r=[];const o=l=>{switch(typeof l){case"string":case"number":case"boolean":t!==l&&(t=l,n?n.textContent=l:n=document.createTextNode(l),r=Y(e,r,[n]));break;case"object":case"undefined":if(null==l){t!=l&&(t=l,r=Y(e,r,[]));break}if(H(l)){t=l,0===l.length?r=Y(e,r,[]):"object"==typeof l[0]?r=Y(e,r,l):o(String(l));break}"ELEMENT_NODE"in l&&t!==l&&(t=l,r=Y(e,r,11===l.nodeType?q.call(l.childNodes):[l]))}};return o})(r):"attr"===t?Z(r,e.name):(e=>{let t;return n=>{t!=n&&(t=n,e.textContent=null==n?"":n)}})(r)}const te="isµ",ne=a(new WeakMap),re=(e,t)=>{const n=((e,t,n)=>{const r=[],{length:o}=e;for(let n=1;n<o;n++){const o=e[n-1];r.push(O.test(o)&&B(e,n)?o.replace(O,((e,r,o)=>`${t}${n-1}=${o||'"'}${r}${o?"":'"'}`)):`${o}\x3c!--${t}${n-1}--\x3e`)}r.push(e[o-1]);const l=r.join("").trim();return n?l:l.replace(D,F)})(t,te,"svg"===e),r=V(n,e),o=X(r),l=[],s=t.length-1;let a=0,c="isµ"+a;for(;a<s;){const e=o.nextNode();if(!e)throw"bad template: "+n;if(8===e.nodeType)e.textContent===c&&(l.push({type:"node",path:J(e)}),c="isµ"+ ++a);else{for(;e.hasAttribute(c);)l.push({type:"attr",path:J(e),name:e.getAttribute(c)}),e.removeAttribute(c),c="isµ"+ ++a;/^(?:style|textarea)$/i.test(e.tagName)&&e.textContent.trim()===`\x3c!--${c}--\x3e`&&(l.push({type:"text",path:J(e)}),c="isµ"+ ++a)}}return{content:r,nodes:l}},oe=(e,t)=>{const{content:n,nodes:r}=ne.get(t)||ne.set(t,re(e,t)),o=Q.call(document,n,!0);return{content:o,updates:r.map(ee,o)}},le=(e,{type:t,template:n,values:r})=>{const{length:o}=r;se(e,r,o);let{entry:l}=e;l&&l.template===n&&l.type===t||(e.entry=l=((e,t)=>{const{content:n,updates:r}=oe(e,t);return{type:e,template:t,content:n,updates:r,wire:null}})(t,n));const{content:s,updates:a,wire:c}=l;for(let e=0;e<o;e++)a[e](r[e]);return c||(l.wire=(e=>{const{childNodes:t}=e,{length:n}=t;if(n<2)return n?t[0]:e;const r=q.call(t,0);return{ELEMENT_NODE:1,nodeType:111,firstChild:r[0],lastChild:r[n-1],valueOf(){if(t.length!==n){let t=0;for(;t<n;)e.appendChild(r[t++])}return e}}})(s))},se=({stack:e},t,n)=>{for(let r=0;r<n;r++){const n=t[r];n instanceof ae?t[r]=le(e[r]||(e[r]={stack:[],entry:null,wire:null}),n):H(n)?se(e[r]||(e[r]={stack:[],entry:null,wire:null}),n,n.length):e[r]=null}n<e.length&&e.splice(n)};function ae(e,t,n){this.type=e,this.template=t,this.values=n}const{create:ce,defineProperties:ue}=Object,ie=e=>{const t=a(new WeakMap);return ue(((t,...n)=>new ae(e,t,n)),{for:{value(n,r){const o=t.get(n)||t.set(n,ce(null));return o[r]||(o[r]=(t=>(n,...r)=>le(t,{type:e,template:n,values:r}))({stack:[],entry:null,wire:null}))}},node:{value:(t,...n)=>le({stack:[],entry:null,wire:null},{type:e,template:t,values:n}).valueOf()}})},fe=a(new WeakMap),de=ie("html"),pe=ie("svg"),{isArray:he}=Array,{create:ge}=Object,ve=(e,...t)=>new ae("html",e,t);ve.for=Te(de);const me=(e,...t)=>new ae("svg",e,t);me.for=Te(pe);const ye=a(new WeakMap),we=(e,t)=>{const n="function"==typeof t?t():t,r=ye.get(e)||ye.set(e,Ne(null));return r.w=e,r.W=t,((e,t)=>{const n="function"==typeof t?t():t,r=fe.get(e)||fe.set(e,{stack:[],entry:null,wire:null}),o=n instanceof ae?le(r,n):n;return o!==r.wire&&(r.wire=o,e.textContent="",e.appendChild(o.valueOf())),e})(e,n instanceof Me?Ce(r,n):($e(r,n),n))};let ke=!1;const be=(e,t)=>{t!==e.node&&(e.node&&(ke=!0),e.node=t)},Ne=e=>({p:e,stack:[],entry:null}),Ce=(e,{fn:t,template:n,values:r})=>{let{entry:o}=e;return o&&o.fn===t||(e.entry=o={fn:t,hook:null,node:null},o.hook=((e,t)=>S((function(){const n=t.fn.apply(null,arguments);n instanceof ae?($e(e,n),be(t,Ee(t,n))):be(t,n);try{return t.node}finally{if(ke){ke=!1;let t=e;for(;t.p;)t=t.p;we(t.w,t.W)}}})))(Ne(e),o)),o.hook(n,...r)},$e=(e,{values:t})=>{xe(e,t,t.length)},xe=(e,t,n)=>{const{stack:r}=e;for(let o=0;o<n;o++){const n=t[o];n instanceof Me?t[o]=Ce(r[o]||(r[o]=Ne(e)),n):n instanceof ae?$e(r[o]||(r[o]=Ne(e)),n):he(n)?xe(r[o]||(r[o]=Ne(e)),n,n.length):r[o]=null}n<r.length&&r.splice(n)},Ee=(e,{type:t,template:n,values:r})=>("svg"===t?pe:de).for(e,t)(n,...r);function Me(e,t,n){this.fn=e,this.template=t,this.values=n}function Te(e){const t=a(new WeakMap);return(n,r)=>{const o=t.get(n)||t.set(n,ge(null)),l=o[r]||(o[r]=Ne(null));return(t,...o)=>(xe(l,o),e.for(n,r)(t,...o))}}return e.Component=function(e){return(t,...n)=>new Me(e,t,n)},e.contextual=e=>{let t=!0,n=null;const r=u((function(){return e.apply(n,arguments)}));return function e(){const o=r.apply(n=this,arguments);return t&&(t=!t,$(r)&&w.set(e,w.get(r))),o}},e.createContext=e=>{const t={value:e,provide:m};return g.set(t,[]),t},e.html=ve,e.render=we,e.svg=me,e.useCallback=(e,t)=>M((()=>e),t),e.useContext=e=>{const{hook:t,args:n}=c,r=g.get(e),o={hook:t,args:n};return r.some(y,o)||r.push(o),e.value},e.useEffect=x,e.useLayoutEffect=E,e.useMemo=M,e.useReducer=h,e.useRef=e=>{const t=c.i++,{stack:n,length:r}=c;return t===r&&(c.length=n.push({current:e})),n[t]},e.useState=(e,t)=>h(p,e,void 0,t),Object.defineProperty(e,"__esModule",{value:!0}),e}({});
