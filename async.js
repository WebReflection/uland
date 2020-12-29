self.uland=function(e){"use strict";var t=CustomEvent;const n=(e,t,n,s)=>{const l=new WeakMap,o=new WeakMap,a=new WeakMap,c=e=>l.has(e),i=e=>{c(e)&&(u(e,e.removeEventListener,l.get(e)),l.delete(e))},u=(e,t,n)=>{t.call(e,"disconnected",n),t.call(e,"connected",n)},h=(e,t,n,r)=>{for(let{length:s}=e,l=0;l<s;l++)d(e[l],t,n,r)},d=(e,r,s,l)=>{c(e)&&!s.has(e)&&(l.delete(e),s.set(e,0),e.dispatchEvent(new(n||CustomEvent)(r))),h(e[t||"children"]||[],r,s,l)},f=new(s||MutationObserver)((e=>{for(let{length:t}=e,n=0;n<t;n++){const{removedNodes:t,addedNodes:r}=e[n];h(t,"disconnected",a,o),h(r,"connected",o,a)}}));return f.observe(e||document,{subtree:!0,childList:!0}),{has:c,connect:(e,t)=>{i(e),(t||(t={})).handleEvent||(t.handleEvent=r),u(e,e.addEventListener,t),l.set(e,t)},disconnect:i,kill(){f.disconnect()}}};function r(e){e.type in this&&this[e.type](e)}var s=Promise;let l=null,o=new Set;const a=new WeakMap,c=e=>{const{$:t,r:n,h:r}=e;g(n)&&(u.get(r).delete(e),n()),g(e.r=t())&&u.get(r).add(e)},i=()=>{const e=o;o=new Set,e.forEach((({h:e,c:t,a:n,e:r})=>{r&&e.apply(t,n)}))},u=new WeakMap,h=[],d=[];function f(e,t){return e!==this[t]}const p=()=>a.get(l),g=e=>"function"==typeof e,w=e=>{const t={h:n,c:null,a:null,e:0,i:0,s:[]};return a.set(n,t),n;function n(){const r=l;l=n,t.e=t.i=0;try{return e.apply(t.c=this,t.a=arguments)}finally{l=r,h.length&&v.then(h.forEach.bind(h.splice(0),c)),d.length&&d.splice(0).forEach(c)}}},v=new s((e=>e()));function y(e){const{_:t,value:n}=this;n!==e&&(this._=new Set,this.value=e,t.forEach((({h:e,c:t,a:n})=>{e.apply(t,n)})))}const m=(e,t)=>{const n=p(),{i:r,s:s}=n;return r!==s.length&&t&&!t.some(f,s[r]._)||(s[r]={$:e(),_:t}),s[n.i++].$},b=e=>(t,n)=>{const r=p(),{i:s,s:l,h:o}=r,a=s===l.length;r.i++,a&&(u.has(o)||u.set(o,new Set),l[s]={$:t,_:n,r:null,h:o}),(a||!n||n.some(f,l[s]._))&&e.push(l[s]),l[s].$=t,l[s]._=n},$=b(h),C=b(d),k=(e,t)=>g(t)?t(e):t,E=(e,t,n)=>{const r=p(),{i:s,s:l}=r;s===l.length&&l.push({$:g(n)?n(t):k(void 0,t),set:t=>{l[s].$=e(l[s].$,t),(e=>{o.has(e)||(e.e=1,o.add(e),v.then(i))})(r)}});const{$:a,set:c}=l[r.i++];return[a,c]},x=new WeakMap,N=e=>(e=>{const t=u.get(e);t&&v.then((()=>{t.forEach((e=>{e.r(),e.r=null})),t.clear()}))})(x.get(e)),M=e=>(e=>u.has(e))(x.get(e)),S=e=>{const t=w(e);return x.set(n,t),n;async function n(){return await t.apply(this,arguments)}};
/*! (c) Andrea Giammarchi - ISC */
let L=null,T=null,W=null;const _=new WeakMap,A=new WeakMap,O=(e,t,n,r)=>{const s=s=>{_.has(e)||(_.set(e,0),v.then((()=>{_.delete(e),e.apply(t,n)}))),r(s)};return A.set(r,s),s},j=(e,t,n,r)=>e?[r[0],A.get(r[1])||O(e,t,n,r[1])]:r,R=(e,t)=>S(t?async function t(){const[n,r,s]=[L,T,W];[L,T,W]=[t,this,arguments];try{return await e.apply(T,W)}finally{[L,T,W]=[n,r,s]}}:e);
/*! (c) Andrea Giammarchi - ISC */
let B=null;const D=({firstChild:e})=>{if(e&&1!==e.nodeType&&!(e=e.nextElementSibling))throw"unobservable";return e},H=e=>{const{nodeType:t}=e;if(t)return 1===t?e:D(e);{const t=e.valueOf();return t!==e?H(t):D(t)}},z=(e,r)=>{const s=R(e,r);return async function(){const e=await s.apply(this,arguments);if(M(s)){const r=H(e);B||(B=n(r.ownerDocument,"children",t)),B.has(r)||B.connect(r,{disconnected(){N(s)}})}return e}};var P=e=>({get:t=>e.get(t),set:(t,n)=>(e.set(t,n),n)});const{isArray:q}=Array,{indexOf:F,slice:G}=[],I=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,J=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,K=/<[a-z][^>]+$/i,Q=/>[^<>]*$/,U=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/gi,V=/\s+$/,X=(e,t)=>0<t--&&(K.test(e[t])||!Q.test(e[t])&&X(e,t)),Y=(e,t,n)=>J.test(t)?e:`<${t}${n.replace(V,"")}></${t}>`;const Z=(e,t)=>111===e.nodeType?1/t<0?t?(({firstChild:e,lastChild:t})=>{const n=document.createRange();return n.setStartAfter(e),n.setEndAfter(t),n.deleteContents(),e})(e):e.lastChild:t?e.valueOf():e.firstChild:e;
/*! (c) Andrea Giammarchi - ISC */
self.ee=function(e){var t="fragment",n="template",r="content"in l(n)?function(e){var t=l(n);return t.innerHTML=e,t.content}:function(e){var r=l(t),o=l(n),a=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var c=RegExp.$1;o.innerHTML="<table>"+e+"</table>",a=o.querySelectorAll(c)}else o.innerHTML=e,a=o.childNodes;return s(r,a),r};return function(e,t){return("svg"===t?o:r)(e)};function s(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function l(n){return n===t?e.createDocumentFragment():e.createElementNS("http://www.w3.org/1999/xhtml",n)}function o(e){var n=l(t),r=l("div");return r.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",s(n,r.firstChild.childNodes),n}}(document);const te=({childNodes:e},t)=>e[t],ne=e=>{const t=[];let{parentNode:n}=e;for(;n;)t.push(F.call(n.childNodes,e)),n=(e=n).parentNode;return t},{createTreeWalker:re,importNode:se}=document,le=1!=se.length,oe=le?(e,t)=>se.call(document,ee(e,t),!0):ee,ae=le?e=>re.call(document,e,129,null,!1):e=>re.call(document,e,129),ce=(e,t,n)=>((e,t,n,r,s)=>{const l=n.length;let o=t.length,a=l,c=0,i=0,u=null;for(;c<o||i<a;)if(o===c){const t=a<l?i?r(n[i-1],-0).nextSibling:r(n[a-i],0):s;for(;i<a;)e.insertBefore(r(n[i++],1),t)}else if(a===i)for(;c<o;)u&&u.has(t[c])||e.removeChild(r(t[c],-1)),c++;else if(t[c]===n[i])c++,i++;else if(t[o-1]===n[a-1])o--,a--;else if(t[c]===n[a-1]&&n[i]===t[o-1]){const s=r(t[--o],-1).nextSibling;e.insertBefore(r(n[i++],1),r(t[c++],-1).nextSibling),e.insertBefore(r(n[--a],1),s),t[o]=n[a]}else{if(!u){u=new Map;let e=i;for(;e<a;)u.set(n[e],e++)}if(u.has(t[c])){const s=u.get(t[c]);if(i<s&&s<a){let l=c,h=1;for(;++l<o&&l<a&&u.get(t[l])===s+h;)h++;if(h>s-i){const l=r(t[c],0);for(;i<s;)e.insertBefore(r(n[i++],1),l)}else e.replaceChild(r(n[i++],1),r(t[c++],-1))}else c++}else e.removeChild(r(t[c++],-1))}return n})(e.parentNode,t,n,Z,e),ie=(e,t)=>"ref"===t?(e=>t=>{"function"==typeof t?t(e):t.current=e})(e):"aria"===t?(e=>t=>{for(const n in t){const r="role"===n?n:`aria-${n}`,s=t[n];null==s?e.removeAttribute(r):e.setAttribute(r,s)}})(e):".dataset"===t?(({dataset:e})=>t=>{for(const n in t){const r=t[n];null==r?delete e[n]:e[n]=r}})(e):"."===t.slice(0,1)?((e,t)=>n=>{e[t]=n})(e,t.slice(1)):"on"===t.slice(0,2)?((e,t)=>{let n,r=t.slice(2);return!(t in e)&&t.toLowerCase()in e&&(r=r.toLowerCase()),t=>{const s=q(t)?t:[t,!1];n!==s[0]&&(n&&e.removeEventListener(r,n,s[1]),(n=s[0])&&e.addEventListener(r,n,s[1]))}})(e,t):((e,t)=>{let n,r=!0;const s=document.createAttributeNS(null,t);return t=>{n!==t&&(n=t,null==n?r||(e.removeAttributeNode(s),r=!0):(s.value=t,r&&(e.setAttributeNodeNS(s),r=!1)))}})(e,t);function ue(e){const{type:t,path:n}=e,r=n.reduceRight(te,this);return"node"===t?(e=>{let t,n,r=[];const s=l=>{switch(typeof l){case"string":case"number":case"boolean":t!==l&&(t=l,n?n.textContent=l:n=document.createTextNode(l),r=ce(e,r,[n]));break;case"object":case"undefined":if(null==l){t!=l&&(t=l,r=ce(e,r,[]));break}if(q(l)){t=l,0===l.length?r=ce(e,r,[]):"object"==typeof l[0]?r=ce(e,r,l):s(String(l));break}"ELEMENT_NODE"in l&&t!==l&&(t=l,r=ce(e,r,11===l.nodeType?G.call(l.childNodes):[l]))}};return s})(r):"attr"===t?ie(r,e.name):(e=>{let t;return n=>{t!=n&&(t=n,e.textContent=null==n?"":n)}})(r)}const he="isµ",de=P(new WeakMap),fe=(e,t)=>{const n=((e,t,n)=>{const r=[],{length:s}=e;for(let n=1;n<s;n++){const s=e[n-1];r.push(I.test(s)&&X(e,n)?s.replace(I,((e,r,s)=>`${t}${n-1}=${s||'"'}${r}${s?"":'"'}`)):`${s}\x3c!--${t}${n-1}--\x3e`)}r.push(e[s-1]);const l=r.join("").trim();return n?l:l.replace(U,Y)})(t,he,"svg"===e),r=oe(n,e),s=ae(r),l=[],o=t.length-1;let a=0,c=`isµ${a}`;for(;a<o;){const e=s.nextNode();if(!e)throw`bad template: ${n}`;if(8===e.nodeType)e.textContent===c&&(l.push({type:"node",path:ne(e)}),c="isµ"+ ++a);else{for(;e.hasAttribute(c);)l.push({type:"attr",path:ne(e),name:e.getAttribute(c)}),e.removeAttribute(c),c="isµ"+ ++a;/^(?:style|textarea)$/i.test(e.tagName)&&e.textContent.trim()===`\x3c!--${c}--\x3e`&&(e.textContent="",l.push({type:"text",path:ne(e)}),c="isµ"+ ++a)}}return{content:r,nodes:l}},pe=(e,t)=>{const{content:n,nodes:r}=de.get(t)||de.set(t,fe(e,t)),s=se.call(document,n,!0);return{content:s,updates:r.map(ue,s)}},ge=(e,{type:t,template:n,values:r})=>{const{length:s}=r;we(e,r,s);let{entry:l}=e;l&&l.template===n&&l.type===t||(e.entry=l=((e,t)=>{const{content:n,updates:r}=pe(e,t);return{type:e,template:t,content:n,updates:r,wire:null}})(t,n));const{content:o,updates:a,wire:c}=l;for(let e=0;e<s;e++)a[e](r[e]);return c||(l.wire=(e=>{const{childNodes:t}=e,{length:n}=t;if(n<2)return n?t[0]:e;const r=G.call(t,0);return{ELEMENT_NODE:1,nodeType:111,firstChild:r[0],lastChild:r[n-1],valueOf(){if(t.length!==n){let t=0;for(;t<n;)e.appendChild(r[t++])}return e}}})(o))},we=({stack:e},t,n)=>{for(let r=0;r<n;r++){const n=t[r];n instanceof ve?t[r]=ge(e[r]||(e[r]={stack:[],entry:null,wire:null}),n):q(n)?we(e[r]||(e[r]={stack:[],entry:null,wire:null}),n,n.length):e[r]=null}n<e.length&&e.splice(n)};function ve(e,t,n){this.type=e,this.template=t,this.values=n}const{create:ye,defineProperties:me}=Object,be=e=>{const t=P(new WeakMap);return me(((t,...n)=>new ve(e,t,n)),{for:{value(n,r){const s=t.get(n)||t.set(n,ye(null));return s[r]||(s[r]=(t=>(n,...r)=>ge(t,{type:e,template:n,values:r}))({stack:[],entry:null,wire:null}))}},node:{value:(t,...n)=>ge({stack:[],entry:null,wire:null},{type:e,template:t,values:n}).valueOf()}})},$e=P(new WeakMap),Ce=be("html"),ke=be("svg"),{create:Ee}=Object,xe=(e,...t)=>new ve("html",e,t);xe.for=je(Ce);const Ne=(e,...t)=>new ve("svg",e,t);Ne.for=je(ke);const Me=P(new WeakMap),Se=(e,t)=>z((async function(){const n=await t.f.apply(this,arguments);return n instanceof ve?(await We(e,n),t.$=Ae(t,n)):t.$=n,t.$})),Le=()=>({s:[],e:null}),Te=(e,{f:t,c:n,a:r})=>{let{e:s}=e;return s&&s.f===t||(e.e=s={f:t,h:null,$:null},s.h=Se(Le(),s)),s.h.apply(n,r)},We=async(e,{values:t})=>{await _e(e,t,t.length)},_e=async(e,t,n)=>{const{s:r}=e;for(let e=0;e<n;e++){const n=t[e];n instanceof Oe?t[e]=await Te(r[e]||(r[e]=Le()),n):n instanceof ve?await We(r[e]||(r[e]=Le()),n):q(n)?await _e(r[e]||(r[e]=Le()),n,n.length):r[e]=null}n<r.length&&r.splice(n)},Ae=(e,{type:t,template:n,values:r})=>("svg"===t?ke:Ce).for(e,t)(n,...r);function Oe(e,t,n){this.f=e,this.c=t,this.a=n}function je(e){const t=P(new WeakMap);return(n,r)=>{const s=t.get(n)||t.set(n,Ee(null)),l=s[r]||(s[r]=Le());return async(t,...s)=>(await _e(l,s),e.for(n,r)(t,...s))}}return e.Component=function(e){return function(){return new Oe(e,this,arguments)}},e.createContext=e=>({_:new Set,provide:y,value:e}),e.html=xe,e.render=(e,t)=>(Me.get(e)||Me.set(e,{c:Le(),h:z((async function(t){const n="function"===await typeof t?t():t;return((e,t)=>{const n="function"==typeof t?t():t,r=$e.get(e)||$e.set(e,{stack:[],entry:null,wire:null}),s=n instanceof ve?ge(r,n):n;return s!==r.wire&&(r.wire=s,e.textContent="",e.appendChild(s.valueOf())),e})(e,n instanceof Oe?await Te(this.c,n):(await We(this.c,n),n))}),e)})).h(t),e.svg=Ne,e.useCallback=(e,t)=>m((()=>e),t),e.useContext=({_:e,value:t})=>(e.add(p()),t),e.useEffect=$,e.useLayoutEffect=C,e.useMemo=m,e.useReducer=(e,t,n)=>j(L,T,W,E(e,t,n)),e.useRef=e=>{const t=p(),{i:n,s:r}=t;return n===r.length&&r.push({current:e}),r[t.i++]},e.useState=e=>j(L,T,W,(e=>E(k,e))(e)),e}({});