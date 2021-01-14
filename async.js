self.uland=function(e){"use strict";var t=CustomEvent;const n=(e,t,n,s)=>{const l=new WeakMap,o=new WeakMap,a=new WeakMap,c=e=>l.has(e),i=e=>{c(e)&&(u(e,e.removeEventListener,l.get(e)),l.delete(e))},u=(e,t,n)=>{t.call(e,"disconnected",n),t.call(e,"connected",n)},h=(e,t,n,r)=>{for(let{length:s}=e,l=0;l<s;l++)f(e[l],t,n,r)},f=(e,r,s,l)=>{c(e)&&!s.has(e)&&(l.delete(e),s.set(e,0),e.dispatchEvent(new(n||CustomEvent)(r))),h(e[t||"children"]||[],r,s,l)},d=new(s||MutationObserver)((e=>{for(let{length:t}=e,n=0;n<t;n++){const{removedNodes:t,addedNodes:r}=e[n];h(t,"disconnected",a,o),h(r,"connected",o,a)}}));return d.observe(e||document,{subtree:!0,childList:!0}),{has:c,connect:(e,t)=>{i(e),(t||(t={})).handleEvent||(t.handleEvent=r),u(e,e.addEventListener,t),l.set(e,t)},disconnect:i,kill(){d.disconnect()}}};function r(e){e.type in this&&this[e.type](e)}var s=Promise;let l=null,o=new Set;const a=e=>{const{$:t,r:n,h:r}=e;p(n)&&(i.get(r).delete(e),n()),p(e.r=t())&&i.get(r).add(e)},c=()=>{const e=o;o=new Set,e.forEach((({h:e,c:t,a:n,e:r})=>{r&&e.apply(t,n)}))},i=new WeakMap,u=[],h=[];function f(e,t){return e!==this[t]}const d=()=>l,p=e=>"function"==typeof e,g=e=>{const t={h:n,c:null,a:null,e:0,i:0,s:[]};return n;function n(){const n=l;l=t,t.e=t.i=0;try{return e.apply(t.c=this,t.a=arguments)}finally{l=n,u.length&&w.then(u.forEach.bind(u.splice(0),a)),h.length&&h.splice(0).forEach(a)}}},w=new s((e=>e()));function v(e){const{_:t,value:n}=this;n!==e&&(this._=new Set,this.value=e,t.forEach((({h:e,c:t,a:n})=>{e.apply(t,n)})))}const m=(e,t)=>{const n=d(),{i:r,s:s}=n;return r!==s.length&&t&&!t.some(f,s[r]._)||(s[r]={$:e(),_:t}),s[n.i++].$},y=e=>(t,n)=>{const r=d(),{i:s,s:l,h:o}=r,a=s===l.length;r.i++,a&&(i.has(o)||i.set(o,new Set),l[s]={$:t,_:n,r:null,h:o}),(a||!n||n.some(f,l[s]._))&&e.push(l[s]),l[s].$=t,l[s]._=n},b=y(u),$=y(h),C=(e,t)=>p(t)?t(e):t,E=(e,t,n)=>{const r=d(),{i:s,s:l}=r;s===l.length&&l.push({$:p(n)?n(t):C(void 0,t),set:t=>{l[s].$=e(l[s].$,t),(e=>{o.has(e)||(e.e=1,o.add(e),w.then(c))})(r)}});const{$:a,set:i}=l[r.i++];return[a,i]},k=new WeakMap,x=e=>(e=>{const t=i.get(e);t&&w.then((()=>{t.forEach((e=>{e.r(),e.r=null})),t.clear()}))})(k.get(e)),N=e=>(e=>i.has(e))(k.get(e)),M=e=>{const t=g(e);return k.set(n,t),n;async function n(){return await t.apply(this,arguments)}};
/*! (c) Andrea Giammarchi - ISC */
let S=null,L=null,T=null;const A=new WeakMap,W=new WeakMap,_=(e,t,n,r)=>{const s=s=>{A.has(e)||(A.set(e,0),w.then((()=>{A.delete(e),e.apply(t,n)}))),r(s)};return W.set(r,s),s},O=(e,t,n,r)=>e?[r[0],W.get(r[1])||_(e,t,n,r[1])]:r,j=(e,t)=>{const n=M(t?async function(){const[t,r,s]=[S,L,T];[S,L,T]=[n,this,arguments];try{return await e.apply(L,T)}finally{[S,L,T]=[t,r,s]}}:e);return n};
/*! (c) Andrea Giammarchi - ISC */
let R=null;const B=({firstChild:e})=>{if(e&&1!==e.nodeType&&!(e=e.nextElementSibling))throw"unobservable";return e},D=e=>{const{nodeType:t}=e;if(t)return 1===t?e:B(e);{const t=e.valueOf();return t!==e?D(t):B(t)}},H=(e,r)=>{const s=j(e,r);return async function(){const e=await s.apply(this,arguments);if(N(s)){const r=D(e);R||(R=n(r.ownerDocument,"children",t)),R.has(r)||R.connect(r,{disconnected(){x(s)}})}return e}};var z=e=>({get:t=>e.get(t),set:(t,n)=>(e.set(t,n),n)});const{isArray:P}=Array,{indexOf:q,slice:F}=[],G=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,I=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,J=/<[a-z][^>]+$/i,K=/>[^<>]*$/,Q=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/gi,U=/\s+$/,V=(e,t)=>0<t--&&(J.test(e[t])||!K.test(e[t])&&V(e,t)),X=(e,t,n)=>I.test(t)?e:`<${t}${n.replace(U,"")}></${t}>`;const Y=(e,t)=>111===e.nodeType?1/t<0?t?(({firstChild:e,lastChild:t})=>{const n=document.createRange();return n.setStartAfter(e),n.setEndAfter(t),n.deleteContents(),e})(e):e.lastChild:t?e.valueOf():e.firstChild:e;
/*! (c) Andrea Giammarchi - ISC */
self.Z=function(e){var t="fragment",n="template",r="content"in l(n)?function(e){var t=l(n);return t.innerHTML=e,t.content}:function(e){var r=l(t),o=l(n),a=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var c=RegExp.$1;o.innerHTML="<table>"+e+"</table>",a=o.querySelectorAll(c)}else o.innerHTML=e,a=o.childNodes;return s(r,a),r};return function(e,t){return("svg"===t?o:r)(e)};function s(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function l(n){return n===t?e.createDocumentFragment():e.createElementNS("http://www.w3.org/1999/xhtml",n)}function o(e){var n=l(t),r=l("div");return r.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",s(n,r.firstChild.childNodes),n}}(document);const ee=({childNodes:e},t)=>e[t],te=e=>{const t=[];let{parentNode:n}=e;for(;n;)t.push(q.call(n.childNodes,e)),n=(e=n).parentNode;return t},{createTreeWalker:ne,importNode:re}=document,se=1!=re.length,le=se?(e,t,n)=>re.call(document,Z(e,t,n),!0):Z,oe=se?e=>ne.call(document,e,129,null,!1):e=>ne.call(document,e,129),ae=(e,t,n)=>((e,t,n,r,s)=>{const l=n.length;let o=t.length,a=l,c=0,i=0,u=null;for(;c<o||i<a;)if(o===c){const t=a<l?i?r(n[i-1],-0).nextSibling:r(n[a-i],0):s;for(;i<a;)e.insertBefore(r(n[i++],1),t)}else if(a===i)for(;c<o;)u&&u.has(t[c])||e.removeChild(r(t[c],-1)),c++;else if(t[c]===n[i])c++,i++;else if(t[o-1]===n[a-1])o--,a--;else if(t[c]===n[a-1]&&n[i]===t[o-1]){const s=r(t[--o],-1).nextSibling;e.insertBefore(r(n[i++],1),r(t[c++],-1).nextSibling),e.insertBefore(r(n[--a],1),s),t[o]=n[a]}else{if(!u){u=new Map;let e=i;for(;e<a;)u.set(n[e],e++)}if(u.has(t[c])){const s=u.get(t[c]);if(i<s&&s<a){let l=c,h=1;for(;++l<o&&l<a&&u.get(t[l])===s+h;)h++;if(h>s-i){const l=r(t[c],0);for(;i<s;)e.insertBefore(r(n[i++],1),l)}else e.replaceChild(r(n[i++],1),r(t[c++],-1))}else c++}else e.removeChild(r(t[c++],-1))}return n})(e.parentNode,t,n,Y,e),ce=(e,t)=>"ref"===t?(e=>t=>{"function"==typeof t?t(e):t.current=e})(e):"aria"===t?(e=>t=>{for(const n in t){const r="role"===n?n:`aria-${n}`,s=t[n];null==s?e.removeAttribute(r):e.setAttribute(r,s)}})(e):".dataset"===t?(({dataset:e})=>t=>{for(const n in t){const r=t[n];null==r?delete e[n]:e[n]=r}})(e):"."===t.slice(0,1)?((e,t)=>n=>{e[t]=n})(e,t.slice(1)):"on"===t.slice(0,2)?((e,t)=>{let n,r=t.slice(2);return!(t in e)&&t.toLowerCase()in e&&(r=r.toLowerCase()),t=>{const s=P(t)?t:[t,!1];n!==s[0]&&(n&&e.removeEventListener(r,n,s[1]),(n=s[0])&&e.addEventListener(r,n,s[1]))}})(e,t):((e,t)=>{let n,r=!0;const s=document.createAttributeNS(null,t);return t=>{n!==t&&(n=t,null==n?r||(e.removeAttributeNode(s),r=!0):(s.value=t,r&&(e.setAttributeNodeNS(s),r=!1)))}})(e,t);function ie(e){const{type:t,path:n}=e,r=n.reduceRight(ee,this);return"node"===t?(e=>{let t,n,r=[];const s=l=>{switch(typeof l){case"string":case"number":case"boolean":t!==l&&(t=l,n?n.textContent=l:n=document.createTextNode(l),r=ae(e,r,[n]));break;case"object":case"undefined":if(null==l){t!=l&&(t=l,r=ae(e,r,[]));break}if(P(l)){t=l,0===l.length?r=ae(e,r,[]):"object"==typeof l[0]?r=ae(e,r,l):s(String(l));break}"ELEMENT_NODE"in l&&t!==l&&(t=l,r=ae(e,r,11===l.nodeType?F.call(l.childNodes):[l]))}};return s})(r):"attr"===t?ce(r,e.name):(e=>{let t;return n=>{t!=n&&(t=n,e.textContent=null==n?"":n)}})(r)}const ue="isµ",he=z(new WeakMap),fe=/^(?:plaintext|script|style|textarea|title|xmp)$/i,de=(e,t)=>{const n=((e,t,n)=>{const r=[],{length:s}=e;for(let n=1;n<s;n++){const s=e[n-1];r.push(G.test(s)&&V(e,n)?s.replace(G,((e,r,s)=>`${t}${n-1}=${s||'"'}${r}${s?"":'"'}`)):`${s}\x3c!--${t}${n-1}--\x3e`)}r.push(e[s-1]);const l=r.join("").trim();return n?l:l.replace(Q,X)})(t,ue,"svg"===e),r=le(n,e),s=oe(r),l=[],o=t.length-1;let a=0,c=`isµ${a}`;for(;a<o;){const e=s.nextNode();if(!e)throw`bad template: ${n}`;if(8===e.nodeType)e.textContent===c&&(l.push({type:"node",path:te(e)}),c="isµ"+ ++a);else{for(;e.hasAttribute(c);)l.push({type:"attr",path:te(e),name:e.getAttribute(c)}),e.removeAttribute(c),c="isµ"+ ++a;fe.test(e.tagName)&&e.textContent.trim()===`\x3c!--${c}--\x3e`&&(e.textContent="",l.push({type:"text",path:te(e)}),c="isµ"+ ++a)}}return{content:r,nodes:l}},pe=(e,t)=>{const{content:n,nodes:r}=he.get(t)||he.set(t,de(e,t)),s=re.call(document,n,!0);return{content:s,updates:r.map(ie,s)}},ge=(e,{type:t,template:n,values:r})=>{const{length:s}=r;we(e,r,s);let{entry:l}=e;l&&l.template===n&&l.type===t||(e.entry=l=((e,t)=>{const{content:n,updates:r}=pe(e,t);return{type:e,template:t,content:n,updates:r,wire:null}})(t,n));const{content:o,updates:a,wire:c}=l;for(let e=0;e<s;e++)a[e](r[e]);return c||(l.wire=(e=>{const{childNodes:t}=e,{length:n}=t;if(n<2)return n?t[0]:e;const r=F.call(t,0);return{ELEMENT_NODE:1,nodeType:111,firstChild:r[0],lastChild:r[n-1],valueOf(){if(t.length!==n){let t=0;for(;t<n;)e.appendChild(r[t++])}return e}}})(o))},we=({stack:e},t,n)=>{for(let r=0;r<n;r++){const n=t[r];n instanceof ve?t[r]=ge(e[r]||(e[r]={stack:[],entry:null,wire:null}),n):P(n)?we(e[r]||(e[r]={stack:[],entry:null,wire:null}),n,n.length):e[r]=null}n<e.length&&e.splice(n)};function ve(e,t,n){this.type=e,this.template=t,this.values=n}const{create:me,defineProperties:ye}=Object,be=e=>{const t=z(new WeakMap);return ye(((t,...n)=>new ve(e,t,n)),{for:{value(n,r){const s=t.get(n)||t.set(n,me(null));return s[r]||(s[r]=(t=>(n,...r)=>ge(t,{type:e,template:n,values:r}))({stack:[],entry:null,wire:null}))}},node:{value:(t,...n)=>ge({stack:[],entry:null,wire:null},{type:e,template:t,values:n}).valueOf()}})},$e=z(new WeakMap),Ce=be("html"),Ee=be("svg"),{create:ke}=Object,xe=(e,...t)=>new ve("html",e,t);xe.for=je(Ce);const Ne=(e,...t)=>new ve("svg",e,t);Ne.for=je(Ee);const Me=z(new WeakMap),Se=(e,t)=>H((async function(){const n=await t.f.apply(this,arguments);return n instanceof ve?(await Ae(e,n),t.$=_e(t,n)):t.$=n,t.$})),Le=()=>({s:[],e:null}),Te=(e,{f:t,c:n,a:r})=>{let{e:s}=e;return s&&s.f===t||(e.e=s={f:t,h:null,$:null},s.h=Se(Le(),s)),s.h.apply(n,r)},Ae=async(e,{values:t})=>{await We(e,t,t.length)},We=async(e,t,n)=>{const{s:r}=e;for(let e=0;e<n;e++){const n=await t[e];n instanceof Oe?t[e]=await Te(r[e]||(r[e]=Le()),n):n instanceof ve?await Ae(r[e]||(r[e]=Le()),n):P(n)?await We(r[e]||(r[e]=Le()),n,n.length):r[e]=null}n<r.length&&r.splice(n)},_e=(e,{type:t,template:n,values:r})=>("svg"===t?Ee:Ce).for(e,t)(n,...r);function Oe(e,t,n){this.f=e,this.c=t,this.a=n}function je(e){const t=z(new WeakMap);return(n,r)=>{const s=t.get(n)||t.set(n,ke(null)),l=s[r]||(s[r]=Le());return async(t,...s)=>(await We(l,s),e.for(n,r)(t,...s))}}return e.Component=function(e){return function(){return new Oe(e,this,arguments)}},e.createContext=e=>({_:new Set,provide:v,value:e}),e.html=xe,e.render=(e,t)=>(Me.get(e)||Me.set(e,{c:Le(),h:H((async function(t){const n=await("function"==typeof t?t():t);return((e,t)=>{const n="function"==typeof t?t():t,r=$e.get(e)||$e.set(e,{stack:[],entry:null,wire:null}),s=n instanceof ve?ge(r,n):n;return s!==r.wire&&(r.wire=s,e.textContent="",e.appendChild(s.valueOf())),e})(e,n instanceof Oe?await Te(this.c,n):(await Ae(this.c,n),n))}),e)})).h(t),e.svg=Ne,e.useCallback=(e,t)=>m((()=>e),t),e.useContext=({_:e,value:t})=>(e.add(d()),t),e.useEffect=b,e.useLayoutEffect=$,e.useMemo=m,e.useReducer=(e,t,n)=>O(S,L,T,E(e,t,n)),e.useRef=e=>{const t=d(),{i:n,s:r}=t;return n===r.length&&r.push({current:e}),r[t.i++]},e.useState=e=>O(S,L,T,(e=>E(C,e))(e)),e}({});
