self.uland=function(e){"use strict";var t=CustomEvent;const n=(e,t,n,s)=>{const l=new WeakMap,o=new WeakMap,c=new WeakMap,a=e=>l.has(e),i=e=>{a(e)&&(u(e,e.removeEventListener,l.get(e)),l.delete(e))},u=(e,t,n)=>{t.call(e,"disconnected",n),t.call(e,"connected",n)},h=(e,t,n,r)=>{for(let{length:s}=e,l=0;l<s;l++)f(e[l],t,n,r)},f=(e,r,s,l)=>{a(e)&&!s.has(e)&&(l.delete(e),s.set(e,0),e.dispatchEvent(new(n||CustomEvent)(r))),h(e[t||"children"]||[],r,s,l)},d=new(s||MutationObserver)((e=>{for(let{length:t}=e,n=0;n<t;n++){const{removedNodes:t,addedNodes:r}=e[n];h(t,"disconnected",c,o),h(r,"connected",o,c)}}));return d.observe(e||document,{subtree:!0,childList:!0}),{has:a,connect:(e,t)=>{i(e),(t||(t={})).handleEvent||(t.handleEvent=r),u(e,e.addEventListener,t),l.set(e,t)},disconnect:i,kill(){d.disconnect()}}};function r(e){e.type in this&&this[e.type](e)}var s=Promise;let l=null,o=new Set;const c=e=>{const{$:t,r:n,h:r}=e;v(n)&&(i.get(r).delete(e),n()),v(e.r=t())&&i.get(r).add(e)},a=()=>{const e=o;o=new Set,e.forEach((({h:e,c:t,a:n,e:r})=>{r&&e.apply(t,n)}))},i=new WeakMap,u=[],h=[];function f(e,t){return e!==this[t]}const d=e=>{const t=i.get(e);t&&w.then((()=>{t.forEach((e=>{e.r(),e.r=null})),t.clear()}))},p=()=>l,g=e=>i.has(e),v=e=>"function"==typeof e,m=e=>{const t={h:n,c:null,a:null,e:0,i:0,s:[]};return n;function n(){const n=l;l=t,t.e=t.i=0;try{return e.apply(t.c=this,t.a=arguments)}finally{l=n,u.length&&w.then(u.forEach.bind(u.splice(0),c)),h.length&&h.splice(0).forEach(c)}}},w=new s((e=>e()));function y(e){const{_:t,value:n}=this;n!==e&&(this._=new Set,this.value=e,t.forEach((({h:e,c:t,a:n})=>{e.apply(t,n)})))}const b=(e,t)=>{const n=p(),{i:r,s:s}=n;return r!==s.length&&t&&!t.some(f,s[r]._)||(s[r]={$:e(),_:t}),s[n.i++].$},$=e=>(t,n)=>{const r=p(),{i:s,s:l,h:o}=r,c=s===l.length;r.i++,c&&(i.has(o)||i.set(o,new Set),l[s]={$:t,_:n,r:null,h:o}),(c||!n||n.some(f,l[s]._))&&e.push(l[s]),l[s].$=t,l[s]._=n},C=$(u),E=$(h),k=(e,t)=>v(t)?t(e):t,x=(e,t,n)=>{const r=p(),{i:s,s:l}=r;s===l.length&&l.push({$:v(n)?n(t):k(void 0,t),set:t=>{l[s].$=e(l[s].$,t),(e=>{o.has(e)||(e.e=1,o.add(e),w.then(a))})(r)}});const{$:c,set:i}=l[r.i++];return[c,i]};
/*! (c) Andrea Giammarchi - ISC */
let N=null,M=null,S=null;const A=new WeakMap,L=new WeakMap,T=(e,t,n,r)=>{const s=s=>{A.has(e)||(A.set(e,0),w.then((()=>{A.delete(e),e.apply(t,n)}))),r(s)};return L.set(r,s),s},W=(e,t,n,r)=>e?[r[0],L.get(r[1])||T(e,t,n,r[1])]:r,_=(e,t)=>{const n=m(t?function(){const[t,r,s]=[N,M,S];[N,M,S]=[n,this,arguments];try{return e.apply(M,S)}finally{[N,M,S]=[t,r,s]}}:e);return n};
/*! (c) Andrea Giammarchi - ISC */
let O=null;const j=({firstChild:e})=>{if(e&&1!==e.nodeType&&!(e=e.nextElementSibling))throw"unobservable";return e},R=e=>{const{nodeType:t}=e;if(t)return 1===t?e:j(e);{const t=e.valueOf();return t!==e?R(t):j(t)}},B=(e,r)=>{const s=_(e,r);return function(){const e=s.apply(this,arguments);if(g(s)){const r=R(e);O||(O=n(r.ownerDocument,"children",t)),O.has(r)||O.connect(r,{disconnected(){d(s)}})}return e}};var D=e=>({get:t=>e.get(t),set:(t,n)=>(e.set(t,n),n)});const{isArray:H}=Array,{indexOf:z,slice:P}=[],q=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,F=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,G=/<[a-z][^>]+$/i,I=/>[^<>]*$/,J=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/gi,K=/\s+$/,Q=(e,t)=>0<t--&&(G.test(e[t])||!I.test(e[t])&&Q(e,t)),U=(e,t,n)=>F.test(t)?e:`<${t}${n.replace(K,"")}></${t}>`;const V=(e,t)=>111===e.nodeType?1/t<0?t?(({firstChild:e,lastChild:t})=>{const n=document.createRange();return n.setStartAfter(e),n.setEndAfter(t),n.deleteContents(),e})(e):e.lastChild:t?e.valueOf():e.firstChild:e;
/*! (c) Andrea Giammarchi - ISC */
self.X=function(e){var t="fragment",n="template",r="content"in l(n)?function(e){var t=l(n);return t.innerHTML=e,t.content}:function(e){var r=l(t),o=l(n),c=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var a=RegExp.$1;o.innerHTML="<table>"+e+"</table>",c=o.querySelectorAll(a)}else o.innerHTML=e,c=o.childNodes;return s(r,c),r};return function(e,t){return("svg"===t?o:r)(e)};function s(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function l(n){return n===t?e.createDocumentFragment():e.createElementNS("http://www.w3.org/1999/xhtml",n)}function o(e){var n=l(t),r=l("div");return r.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",s(n,r.firstChild.childNodes),n}}(document);const Y=({childNodes:e},t)=>e[t],Z=e=>{const t=[];let{parentNode:n}=e;for(;n;)t.push(z.call(n.childNodes,e)),n=(e=n).parentNode;return t},{createTreeWalker:ee,importNode:te}=document,ne=1!=te.length,re=ne?(e,t,n)=>te.call(document,X(e,t,n),!0):X,se=ne?e=>ee.call(document,e,129,null,!1):e=>ee.call(document,e,129),le=(e,t,n)=>((e,t,n,r,s)=>{const l=n.length;let o=t.length,c=l,a=0,i=0,u=null;for(;a<o||i<c;)if(o===a){const t=c<l?i?r(n[i-1],-0).nextSibling:r(n[c-i],0):s;for(;i<c;)e.insertBefore(r(n[i++],1),t)}else if(c===i)for(;a<o;)u&&u.has(t[a])||e.removeChild(r(t[a],-1)),a++;else if(t[a]===n[i])a++,i++;else if(t[o-1]===n[c-1])o--,c--;else if(t[a]===n[c-1]&&n[i]===t[o-1]){const s=r(t[--o],-1).nextSibling;e.insertBefore(r(n[i++],1),r(t[a++],-1).nextSibling),e.insertBefore(r(n[--c],1),s),t[o]=n[c]}else{if(!u){u=new Map;let e=i;for(;e<c;)u.set(n[e],e++)}if(u.has(t[a])){const s=u.get(t[a]);if(i<s&&s<c){let l=a,h=1;for(;++l<o&&l<c&&u.get(t[l])===s+h;)h++;if(h>s-i){const l=r(t[a],0);for(;i<s;)e.insertBefore(r(n[i++],1),l)}else e.replaceChild(r(n[i++],1),r(t[a++],-1))}else a++}else e.removeChild(r(t[a++],-1))}return n})(e.parentNode,t,n,V,e),oe=(e,t)=>{switch(t[0]){case"?":return((e,t)=>n=>{n?e.setAttribute(t,""):e.removeAttribute(t)})(e,t.slice(1));case".":return((e,t)=>"dataset"===t?(({dataset:e})=>t=>{for(const n in t){const r=t[n];null==r?delete e[n]:e[n]=r}})(e):n=>{e[t]=n})(e,t.slice(1));case"o":if("n"===t[1])return((e,t)=>{let n,r=t.slice(2);return!(t in e)&&t.toLowerCase()in e&&(r=r.toLowerCase()),t=>{const s=H(t)?t:[t,!1];n!==s[0]&&(n&&e.removeEventListener(r,n,s[1]),(n=s[0])&&e.addEventListener(r,n,s[1]))}})(e,t)}switch(t){case"ref":return(e=>t=>{"function"==typeof t?t(e):t.current=e})(e);case"aria":return(e=>t=>{for(const n in t){const r="role"===n?n:`aria-${n}`,s=t[n];null==s?e.removeAttribute(r):e.setAttribute(r,s)}})(e)}return((e,t)=>{let n,r=!0;const s=document.createAttributeNS(null,t);return t=>{n!==t&&(n=t,null==n?r||(e.removeAttributeNode(s),r=!0):(s.value=t,r&&(e.setAttributeNodeNS(s),r=!1)))}})(e,t)};function ce(e){const{type:t,path:n}=e,r=n.reduceRight(Y,this);return"node"===t?(e=>{let t,n,r=[];const s=l=>{switch(typeof l){case"string":case"number":case"boolean":t!==l&&(t=l,n?n.textContent=l:n=document.createTextNode(l),r=le(e,r,[n]));break;case"object":case"undefined":if(null==l){t!=l&&(t=l,r=le(e,r,[]));break}if(H(l)){t=l,0===l.length?r=le(e,r,[]):"object"==typeof l[0]?r=le(e,r,l):s(String(l));break}"ELEMENT_NODE"in l&&t!==l&&(t=l,r=le(e,r,11===l.nodeType?P.call(l.childNodes):[l]))}};return s})(r):"attr"===t?oe(r,e.name):(e=>{let t;return n=>{t!=n&&(t=n,e.textContent=null==n?"":n)}})(r)}const ae="isµ",ie=D(new WeakMap),ue=/^(?:plaintext|script|style|textarea|title|xmp)$/i,he=(e,t)=>{const n=((e,t,n)=>{const r=[],{length:s}=e;for(let n=1;n<s;n++){const s=e[n-1];r.push(q.test(s)&&Q(e,n)?s.replace(q,((e,r,s)=>`${t}${n-1}=${s||'"'}${r}${s?"":'"'}`)):`${s}\x3c!--${t}${n-1}--\x3e`)}r.push(e[s-1]);const l=r.join("").trim();return n?l:l.replace(J,U)})(t,ae,"svg"===e),r=re(n,e),s=se(r),l=[],o=t.length-1;let c=0,a=`isµ${c}`;for(;c<o;){const e=s.nextNode();if(!e)throw`bad template: ${n}`;if(8===e.nodeType)e.textContent===a&&(l.push({type:"node",path:Z(e)}),a="isµ"+ ++c);else{for(;e.hasAttribute(a);)l.push({type:"attr",path:Z(e),name:e.getAttribute(a)}),e.removeAttribute(a),a="isµ"+ ++c;ue.test(e.tagName)&&e.textContent.trim()===`\x3c!--${a}--\x3e`&&(e.textContent="",l.push({type:"text",path:Z(e)}),a="isµ"+ ++c)}}return{content:r,nodes:l}},fe=(e,t)=>{const{content:n,nodes:r}=ie.get(t)||ie.set(t,he(e,t)),s=te.call(document,n,!0);return{content:s,updates:r.map(ce,s)}},de=(e,{type:t,template:n,values:r})=>{const{length:s}=r;pe(e,r,s);let{entry:l}=e;l&&l.template===n&&l.type===t||(e.entry=l=((e,t)=>{const{content:n,updates:r}=fe(e,t);return{type:e,template:t,content:n,updates:r,wire:null}})(t,n));const{content:o,updates:c,wire:a}=l;for(let e=0;e<s;e++)c[e](r[e]);return a||(l.wire=(e=>{const{childNodes:t}=e,{length:n}=t;if(n<2)return n?t[0]:e;const r=P.call(t,0);return{ELEMENT_NODE:1,nodeType:111,firstChild:r[0],lastChild:r[n-1],valueOf(){if(t.length!==n){let t=0;for(;t<n;)e.appendChild(r[t++])}return e}}})(o))},pe=({stack:e},t,n)=>{for(let r=0;r<n;r++){const n=t[r];n instanceof ge?t[r]=de(e[r]||(e[r]={stack:[],entry:null,wire:null}),n):H(n)?pe(e[r]||(e[r]={stack:[],entry:null,wire:null}),n,n.length):e[r]=null}n<e.length&&e.splice(n)};function ge(e,t,n){this.type=e,this.template=t,this.values=n}const{create:ve,defineProperties:me}=Object,we=e=>{const t=D(new WeakMap);return me(((t,...n)=>new ge(e,t,n)),{for:{value(n,r){const s=t.get(n)||t.set(n,ve(null));return s[r]||(s[r]=(t=>(n,...r)=>de(t,{type:e,template:n,values:r}))({stack:[],entry:null,wire:null}))}},node:{value:(t,...n)=>de({stack:[],entry:null,wire:null},{type:e,template:t,values:n}).valueOf()}})},ye=D(new WeakMap),be=we("html"),$e=we("svg"),{create:Ce}=Object,Ee=(e,...t)=>new ge("html",e,t);Ee.for=_e(be);const ke=(e,...t)=>new ge("svg",e,t);ke.for=_e($e);const xe=D(new WeakMap),Ne=(e,t)=>B((function(){const n=t.f.apply(this,arguments);return n instanceof ge?(Ae(e,n),t.$=Te(t,n)):t.$=n,t.$})),Me=()=>({s:[],e:null}),Se=(e,{f:t,c:n,a:r})=>{let{e:s}=e;return s&&s.f===t||(e.e=s={f:t,h:null,$:null},s.h=Ne(Me(),s)),s.h.apply(n,r)},Ae=(e,{values:t})=>{Le(e,t,t.length)},Le=(e,t,n)=>{const{s:r}=e;for(let e=0;e<n;e++){const n=t[e];n instanceof We?t[e]=Se(r[e]||(r[e]=Me()),n):n instanceof ge?Ae(r[e]||(r[e]=Me()),n):H(n)?Le(r[e]||(r[e]=Me()),n,n.length):r[e]=null}n<r.length&&r.splice(n)},Te=(e,{type:t,template:n,values:r})=>("svg"===t?$e:be).for(e,t)(n,...r);function We(e,t,n){this.f=e,this.c=t,this.a=n}function _e(e){const t=D(new WeakMap);return(n,r)=>{const s=t.get(n)||t.set(n,Ce(null)),l=s[r]||(s[r]=Me());return(t,...s)=>(Le(l,s),e.for(n,r)(t,...s))}}return e.Component=function(e){return function(){return new We(e,this,arguments)}},e.createContext=e=>({_:new Set,provide:y,value:e}),e.html=Ee,e.render=(e,t)=>(xe.get(e)||xe.set(e,{c:Me(),h:B((function(t){const n="function"==typeof t?t():t;return((e,t)=>{const n="function"==typeof t?t():t,r=ye.get(e)||ye.set(e,{stack:[],entry:null,wire:null}),s=n instanceof ge?de(r,n):n;return s!==r.wire&&(r.wire=s,e.textContent="",e.appendChild(s.valueOf())),e})(e,n instanceof We?Se(this.c,n):(Ae(this.c,n),n))}),e)})).h(t),e.svg=ke,e.useCallback=(e,t)=>b((()=>e),t),e.useContext=({_:e,value:t})=>(e.add(p()),t),e.useEffect=C,e.useLayoutEffect=E,e.useMemo=b,e.useReducer=(e,t,n)=>W(N,M,S,x(e,t,n)),e.useRef=e=>{const t=p(),{i:n,s:r}=t;return n===r.length&&r.push({current:e}),r[t.i++]},e.useState=e=>W(N,M,S,(e=>x(k,e))(e)),e}({});
