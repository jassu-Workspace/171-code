var background=(function(){"use strict";var Tb=Object.defineProperty;var Sb=(Kt,St,kt)=>St in Kt?Tb(Kt,St,{enumerable:!0,configurable:!0,writable:!0,value:kt}):Kt[St]=kt;var is=(Kt,St,kt)=>Sb(Kt,typeof St!="symbol"?St+"":St,kt);function Kt(e){return e==null||typeof e=="function"?{main:e}:e}function St(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var kt={exports:{}},xm=kt.exports,as;function Tm(){return as||(as=1,(function(e,t){(function(r,i){i(e)})(typeof globalThis<"u"?globalThis:typeof self<"u"?self:xm,function(r){if(!(globalThis.chrome&&globalThis.chrome.runtime&&globalThis.chrome.runtime.id))throw new Error("This script should only be loaded in a browser extension.");if(globalThis.browser&&globalThis.browser.runtime&&globalThis.browser.runtime.id)r.exports=globalThis.browser;else{const i="The message port closed before a response was received.",a=n=>{const s={alarms:{clear:{minArgs:0,maxArgs:1},clearAll:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getAll:{minArgs:0,maxArgs:0}},bookmarks:{create:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},getChildren:{minArgs:1,maxArgs:1},getRecent:{minArgs:1,maxArgs:1},getSubTree:{minArgs:1,maxArgs:1},getTree:{minArgs:0,maxArgs:0},move:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeTree:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}},browserAction:{disable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},enable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},getBadgeBackgroundColor:{minArgs:1,maxArgs:1},getBadgeText:{minArgs:1,maxArgs:1},getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},openPopup:{minArgs:0,maxArgs:0},setBadgeBackgroundColor:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setBadgeText:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},browsingData:{remove:{minArgs:2,maxArgs:2},removeCache:{minArgs:1,maxArgs:1},removeCookies:{minArgs:1,maxArgs:1},removeDownloads:{minArgs:1,maxArgs:1},removeFormData:{minArgs:1,maxArgs:1},removeHistory:{minArgs:1,maxArgs:1},removeLocalStorage:{minArgs:1,maxArgs:1},removePasswords:{minArgs:1,maxArgs:1},removePluginData:{minArgs:1,maxArgs:1},settings:{minArgs:0,maxArgs:0}},commands:{getAll:{minArgs:0,maxArgs:0}},contextMenus:{remove:{minArgs:1,maxArgs:1},removeAll:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},cookies:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:1,maxArgs:1},getAllCookieStores:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},devtools:{inspectedWindow:{eval:{minArgs:1,maxArgs:2,singleCallbackArg:!1}},panels:{create:{minArgs:3,maxArgs:3,singleCallbackArg:!0},elements:{createSidebarPane:{minArgs:1,maxArgs:1}}}},downloads:{cancel:{minArgs:1,maxArgs:1},download:{minArgs:1,maxArgs:1},erase:{minArgs:1,maxArgs:1},getFileIcon:{minArgs:1,maxArgs:2},open:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},pause:{minArgs:1,maxArgs:1},removeFile:{minArgs:1,maxArgs:1},resume:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},extension:{isAllowedFileSchemeAccess:{minArgs:0,maxArgs:0},isAllowedIncognitoAccess:{minArgs:0,maxArgs:0}},history:{addUrl:{minArgs:1,maxArgs:1},deleteAll:{minArgs:0,maxArgs:0},deleteRange:{minArgs:1,maxArgs:1},deleteUrl:{minArgs:1,maxArgs:1},getVisits:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1}},i18n:{detectLanguage:{minArgs:1,maxArgs:1},getAcceptLanguages:{minArgs:0,maxArgs:0}},identity:{launchWebAuthFlow:{minArgs:1,maxArgs:1}},idle:{queryState:{minArgs:1,maxArgs:1}},management:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},getSelf:{minArgs:0,maxArgs:0},setEnabled:{minArgs:2,maxArgs:2},uninstallSelf:{minArgs:0,maxArgs:1}},notifications:{clear:{minArgs:1,maxArgs:1},create:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:0},getPermissionLevel:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},pageAction:{getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},hide:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},permissions:{contains:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},request:{minArgs:1,maxArgs:1}},runtime:{getBackgroundPage:{minArgs:0,maxArgs:0},getPlatformInfo:{minArgs:0,maxArgs:0},openOptionsPage:{minArgs:0,maxArgs:0},requestUpdateCheck:{minArgs:0,maxArgs:0},sendMessage:{minArgs:1,maxArgs:3},sendNativeMessage:{minArgs:2,maxArgs:2},setUninstallURL:{minArgs:1,maxArgs:1}},sessions:{getDevices:{minArgs:0,maxArgs:1},getRecentlyClosed:{minArgs:0,maxArgs:1},restore:{minArgs:0,maxArgs:1}},storage:{local:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},managed:{get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1}},sync:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}}},tabs:{captureVisibleTab:{minArgs:0,maxArgs:2},create:{minArgs:1,maxArgs:1},detectLanguage:{minArgs:0,maxArgs:1},discard:{minArgs:0,maxArgs:1},duplicate:{minArgs:1,maxArgs:1},executeScript:{minArgs:1,maxArgs:2},get:{minArgs:1,maxArgs:1},getCurrent:{minArgs:0,maxArgs:0},getZoom:{minArgs:0,maxArgs:1},getZoomSettings:{minArgs:0,maxArgs:1},goBack:{minArgs:0,maxArgs:1},goForward:{minArgs:0,maxArgs:1},highlight:{minArgs:1,maxArgs:1},insertCSS:{minArgs:1,maxArgs:2},move:{minArgs:2,maxArgs:2},query:{minArgs:1,maxArgs:1},reload:{minArgs:0,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeCSS:{minArgs:1,maxArgs:2},sendMessage:{minArgs:2,maxArgs:3},setZoom:{minArgs:1,maxArgs:2},setZoomSettings:{minArgs:1,maxArgs:2},update:{minArgs:1,maxArgs:2}},topSites:{get:{minArgs:0,maxArgs:0}},webNavigation:{getAllFrames:{minArgs:1,maxArgs:1},getFrame:{minArgs:1,maxArgs:1}},webRequest:{handlerBehaviorChanged:{minArgs:0,maxArgs:0}},windows:{create:{minArgs:0,maxArgs:1},get:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:1},getCurrent:{minArgs:0,maxArgs:1},getLastFocused:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}}};if(Object.keys(s).length===0)throw new Error("api-metadata.json has not been included in browser-polyfill");class u extends WeakMap{constructor(C,w=void 0){super(w),this.createItem=C}get(C){return this.has(C)||this.set(C,this.createItem(C)),super.get(C)}}const l=S=>S&&typeof S=="object"&&typeof S.then=="function",d=(S,C)=>(...w)=>{n.runtime.lastError?S.reject(new Error(n.runtime.lastError.message)):C.singleCallbackArg||w.length<=1&&C.singleCallbackArg!==!1?S.resolve(w[0]):S.resolve(w)},h=S=>S==1?"argument":"arguments",p=(S,C)=>function(R,...P){if(P.length<C.minArgs)throw new Error(`Expected at least ${C.minArgs} ${h(C.minArgs)} for ${S}(), got ${P.length}`);if(P.length>C.maxArgs)throw new Error(`Expected at most ${C.maxArgs} ${h(C.maxArgs)} for ${S}(), got ${P.length}`);return new Promise((V,F)=>{if(C.fallbackToNoCallback)try{R[S](...P,d({resolve:V,reject:F},C))}catch(U){console.warn(`${S} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `,U),R[S](...P),C.fallbackToNoCallback=!1,C.noCallback=!0,V()}else C.noCallback?(R[S](...P),V()):R[S](...P,d({resolve:V,reject:F},C))})},m=(S,C,w)=>new Proxy(C,{apply(R,P,V){return w.call(P,S,...V)}});let b=Function.call.bind(Object.prototype.hasOwnProperty);const y=(S,C={},w={})=>{let R=Object.create(null),P={has(F,U){return U in S||U in R},get(F,U,M){if(U in R)return R[U];if(!(U in S))return;let j=S[U];if(typeof j=="function")if(typeof C[U]=="function")j=m(S,S[U],C[U]);else if(b(w,U)){let X=p(U,w[U]);j=m(S,S[U],X)}else j=j.bind(S);else if(typeof j=="object"&&j!==null&&(b(C,U)||b(w,U)))j=y(j,C[U],w[U]);else if(b(w,"*"))j=y(j,C[U],w["*"]);else return Object.defineProperty(R,U,{configurable:!0,enumerable:!0,get(){return S[U]},set(X){S[U]=X}}),j;return R[U]=j,j},set(F,U,M,j){return U in R?R[U]=M:S[U]=M,!0},defineProperty(F,U,M){return Reflect.defineProperty(R,U,M)},deleteProperty(F,U){return Reflect.deleteProperty(R,U)}},V=Object.create(S);return new Proxy(V,P)},_=S=>({addListener(C,w,...R){C.addListener(S.get(w),...R)},hasListener(C,w){return C.hasListener(S.get(w))},removeListener(C,w){C.removeListener(S.get(w))}}),T=new u(S=>typeof S!="function"?S:function(w){const R=y(w,{},{getContent:{minArgs:0,maxArgs:0}});S(R)}),v=new u(S=>typeof S!="function"?S:function(w,R,P){let V=!1,F,U=new Promise(J=>{F=function(de){V=!0,J(de)}}),M;try{M=S(w,R,F)}catch(J){M=Promise.reject(J)}const j=M!==!0&&l(M);if(M!==!0&&!j&&!V)return!1;const X=J=>{J.then(de=>{P(de)},de=>{let H;de&&(de instanceof Error||typeof de.message=="string")?H=de.message:H="An unexpected error occurred",P({__mozWebExtensionPolyfillReject__:!0,message:H})}).catch(de=>{console.error("Failed to send onMessage rejected reply",de)})};return X(j?M:U),!0}),$=({reject:S,resolve:C},w)=>{n.runtime.lastError?n.runtime.lastError.message===i?C():S(new Error(n.runtime.lastError.message)):w&&w.__mozWebExtensionPolyfillReject__?S(new Error(w.message)):C(w)},k=(S,C,w,...R)=>{if(R.length<C.minArgs)throw new Error(`Expected at least ${C.minArgs} ${h(C.minArgs)} for ${S}(), got ${R.length}`);if(R.length>C.maxArgs)throw new Error(`Expected at most ${C.maxArgs} ${h(C.maxArgs)} for ${S}(), got ${R.length}`);return new Promise((P,V)=>{const F=$.bind(null,{resolve:P,reject:V});R.push(F),w.sendMessage(...R)})},A={devtools:{network:{onRequestFinished:_(T)}},runtime:{onMessage:_(v),onMessageExternal:_(v),sendMessage:k.bind(null,"sendMessage",{minArgs:1,maxArgs:3})},tabs:{sendMessage:k.bind(null,"sendMessage",{minArgs:2,maxArgs:3})}},I={clear:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}};return s.privacy={network:{"*":I},services:{"*":I},websites:{"*":I}},y(n,A,s)};r.exports=a(chrome)}})})(kt)),kt.exports}var Sm=Tm();const ae=St(Sm);/*!
 * ONNX Runtime Web v1.29.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var Ni=Object.defineProperty,km=Object.getOwnPropertyDescriptor,Am=Object.getOwnPropertyNames,Em=Object.prototype.hasOwnProperty,Im=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),L=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(i){throw r=[i],i}},hr=(e,t)=>{for(var r in t)Ni(e,r,{get:t[r],enumerable:!0})},Cm=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Am(t))!Em.call(e,a)&&a!==r&&Ni(e,a,{get:()=>t[a],enumerable:!(i=km(t,a))||i.enumerable});return e},$r=e=>Cm(Ni({},"__esModule",{value:!0}),e),vr,Mt,fr,ns,ss,os=L(()=>{"use strict";vr=new Map,Mt=[],fr=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=vr.get(e);if(i===void 0)vr.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let a=Mt.indexOf(e);a!==-1&&Mt.splice(a,1);for(let n=0;n<Mt.length;n++)if(vr.get(Mt[n]).priority<=r){Mt.splice(n,0,e);return}Mt.push(e)}return}throw new TypeError("not a valid backend")},ns=async e=>{let t=vr.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},ss=async e=>{let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),i=r.length===0?Mt:r,a,n=[],s=new Set;for(let l of i){let d=await ns(l);typeof d=="string"?n.push({name:l,err:d}):(a||(a=d),a===d&&s.add(l))}if(!a)throw new Error(`no available backend found. ERR: ${n.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:d}of n)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${d}`);let u=t.filter(l=>s.has(typeof l=="string"?l:l.name));return[a,new Proxy(e,{get:(l,d)=>d==="executionProviders"?u:Reflect.get(l,d)})]}}),zm=L(()=>{"use strict";os()}),us,Om=L(()=>{"use strict";us="1.29.0"}),Pi,Ue,ls=L(()=>{"use strict";Om(),Pi="warning",Ue={wasm:{},webgl:{},webgpu:{},versions:{common:us},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Pi=e}},get logLevel(){return Pi}},Object.defineProperty(Ue,"logLevel",{enumerable:!0})}),Ae,Rm=L(()=>{"use strict";ls(),Ae=Ue}),ds,cs,Mm=L(()=>{"use strict";ds=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let a,n;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],n=e.dims[3]):(a=e.dims[3],n=e.dims[2]);let s=(t==null?void 0:t.format)!==void 0?t.format:"RGB",u=t==null?void 0:t.norm,l,d;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?d=[0,0,0,0]:typeof u.bias=="number"?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(d[3]=u.bias[3]));let h=n*a,p=0,m=h,b=h*2,y=-1;s==="RGBA"?(p=0,m=h,b=h*2,y=h*3):s==="RGB"?(p=0,m=h,b=h*2):s==="RBG"&&(p=0,b=h,m=h*2);for(let _=0;_<n;_++)for(let T=0;T<a;T++){let v=(e.data[p++]-d[0])*l[0],$=(e.data[m++]-d[1])*l[1],k=(e.data[b++]-d[2])*l[2],A=y===-1?255:(e.data[y++]-d[3])*l[3];i.fillStyle="rgba("+v+","+$+","+k+","+A+")",i.fillRect(T,_,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},cs=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let a,n,s;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],n=e.dims[1],s=e.dims[3]):(a=e.dims[3],n=e.dims[2],s=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t==null?void 0:t.norm,d,h;l===void 0||l.mean===void 0?d=[255,255,255,255]:typeof l.mean=="number"?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(d[3]=l.mean[3])),l===void 0||l.bias===void 0?h=[0,0,0,0]:typeof l.bias=="number"?h=[l.bias,l.bias,l.bias,l.bias]:(h=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(h[3]=l.bias[3]));let p=n*a;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let m=4,b=0,y=1,_=2,T=3,v=0,$=p,k=p*2,A=-1;u==="RGBA"?(v=0,$=p,k=p*2,A=p*3):u==="RGB"?(v=0,$=p,k=p*2):u==="RBG"&&(v=0,k=p,$=p*2),i=r.createImageData(a,n);for(let I=0;I<n*a;b+=m,y+=m,_+=m,T+=m,I++)i.data[b]=(e.data[v++]-h[0])*d[0],i.data[y]=(e.data[$++]-h[1])*d[1],i.data[_]=(e.data[k++]-h[2])*d[2],i.data[T]=A===-1?255:(e.data[A++]-h[3])*d[3]}else throw new Error("Can not access image data");return i}}),Kr,ps,hs,fs,ms,gs,Dm=L(()=>{"use strict";Li(),Kr=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,a=t.norm??{mean:255,bias:0},n,s;typeof a.mean=="number"?n=[a.mean,a.mean,a.mean,a.mean]:n=[a.mean[0],a.mean[1],a.mean[2],a.mean[3]??255],typeof a.bias=="number"?s=[a.bias,a.bias,a.bias,a.bias]:s=[a.bias[0],a.bias[1],a.bias[2],a.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=r*i,h=l==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),p=4,m=0,b=1,y=2,_=3,T=0,v=d,$=d*2,k=-1;u==="RGB"&&(p=3,m=0,b=1,y=2,_=-1),l==="RGBA"?k=d*3:l==="RBG"?(T=0,$=d,v=d*2):l==="BGR"&&($=0,v=d,T=d*2);for(let A=0;A<d;A++,m+=p,y+=p,b+=p,_+=p)h[T++]=(e[m]+s[0])/n[0],h[v++]=(e[b]+s[1])/n[1],h[$++]=(e[y]+s[2])/n[2],k!==-1&&_!==-1&&(h[k++]=(e[_]+s[3])/n[3]);return l==="RGBA"?new Xe("float32",h,[1,4,r,i]):new Xe("float32",h,[1,3,r,i])},ps=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,a=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,n=typeof e=="string",s,u=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=h=>typeof HTMLCanvasElement<"u"&&h instanceof HTMLCanvasElement||h instanceof OffscreenCanvas?h.getContext("2d"):null;if(r){let h=l();h.width=e.width,h.height=e.height;let p=d(h);if(p!=null){let m=e.height,b=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(m=t.resizedHeight,b=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=m,u.width=b}else u.tensorFormat="RGBA",u.height=m,u.width=b;p.drawImage(e,0,0),s=p.getImageData(0,0,b,m).data}else throw new Error("Can not access image data")}else if(i){let h,p;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(h=t.resizedHeight,p=t.resizedWidth):(h=e.height,p=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=h,u.width=p,t!==void 0){let m=l();m.width=p,m.height=h;let b=d(m);if(b!=null)b.putImageData(e,0,0),s=b.getImageData(0,0,p,h).data;else throw new Error("Can not access image data")}else s=e.data}else if(a){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let h=l();h.width=e.width,h.height=e.height;let p=d(h);if(p!=null){let m=e.height,b=e.width;return p.drawImage(e,0,0,b,m),s=p.getImageData(0,0,b,m).data,u.height=m,u.width=b,Kr(s,u)}else throw new Error("Can not access image data")}else{if(n)return new Promise((h,p)=>{let m=l(),b=d(m);if(!e||!b)return p();let y=new Image;y.crossOrigin="Anonymous",y.src=e,y.onload=()=>{m.width=y.width,m.height=y.height,b.drawImage(y,0,0,m.width,m.height);let _=b.getImageData(0,0,m.width,m.height);u.height=m.height,u.width=m.width,h(Kr(_.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Kr(s,u);throw new Error("Input data provided is not supported - aborted tensor creation")},hs=(e,t)=>{let{width:r,height:i,download:a,dispose:n}=t,s=[1,i,r,4];return new Xe({location:"texture",type:"float32",texture:e,dims:s,download:a,dispose:n})},fs=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:n}=t;return new Xe({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:a,dispose:n})},ms=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:n}=t;return new Xe({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:a,dispose:n})},gs=(e,t,r)=>new Xe({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),Zt,xr,Ui,ys,Bm=L(()=>{"use strict";Zt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),xr=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Ui=!1,ys=()=>{if(!Ui){Ui=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(Zt.set("int64",BigInt64Array),xr.set(BigInt64Array,"int64")),t&&(Zt.set("uint64",BigUint64Array),xr.set(BigUint64Array,"uint64")),i?(Zt.set("float16",r),xr.set(r,"float16")):Zt.set("float16",Uint16Array)}}}),bs,ws,Nm=L(()=>{"use strict";Li(),bs=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},ws=(e,t)=>{switch(e.location){case"cpu":return new Xe(e.type,e.data,t);case"cpu-pinned":return new Xe({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Xe({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Xe({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Xe({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Xe,Li=L(()=>{"use strict";Mm(),Dm(),Bm(),Nm(),Xe=class{constructor(e,t,r){ys();let i,a;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,a=e.dims,e.location){case"cpu-pinned":{let s=Zt.get(i);if(!s)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(i=e,u=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let l=Zt.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(t,BigInt):s=l.from(t)}else if(t instanceof l)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${l}`)}else if(u=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")i="string",s=e;else if(l==="boolean")i="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",s=Uint8Array.from(e);else{let l=xr.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=l,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");a=u,this.cpuData=s,this.dataLocation="cpu"}let n=bs(a);if(this.cpuData&&n!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(n/2)===this.cpuData.length))throw new Error(`Tensor's size(${n}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=a,this.size=n}static async fromImage(e,t){return ps(e,t)}static fromTexture(e,t){return hs(e,t)}static fromGpuBuffer(e,t){return fs(e,t)}static fromMLTensor(e,t){return ms(e,t)}static fromPinnedBuffer(e,t,r){return gs(e,t,r)}toDataURL(e){return ds(this,e)}toImageData(e){return cs(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return ws(this,e)}}}),at,_s=L(()=>{"use strict";Li(),at=Xe}),Zr,qi,ft,nt,Yt,Xt,$s=L(()=>{"use strict";ls(),Zr=(e,t)=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||console.timeStamp(`${e}::ORT::${t}`)},qi=(e,t)=>{var a;let r=((a=new Error().stack)==null?void 0:a.split(/\r\n|\r|\n/g))||[],i=!1;for(let n=0;n<r.length;n++){if(i&&!r[n].includes("TRACE_FUNC")){let s=`FUNC_${e}::${r[n].trim().split(" ")[1]}`;t&&(s+=`::${t}`),Zr("CPU",s);return}r[n].includes("TRACE_FUNC")&&(i=!0)}},ft=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||qi("BEGIN",e)},nt=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||qi("END",e)},Yt=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||console.time(`ORT::${e}`)},Xt=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||console.timeEnd(`ORT::${e}`)}}),vs,Pm=L(()=>{"use strict";os(),_s(),$s(),vs=class $m{constructor(t){this.handler=t}async run(t,r,i){ft(),Yt("InferenceSession.run");let a={},n={};if(typeof t!="object"||t===null||t instanceof at||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof at)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let d of r){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);a[d]=null}if(typeof i=="object"&&i!==null)n=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,h=Object.getOwnPropertyNames(r);for(let p of this.outputNames)if(h.indexOf(p)!==-1){let m=r[p];(m===null||m instanceof at)&&(d=!0,s=!1,a[p]=m)}if(d){if(typeof i=="object"&&i!==null)n=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else n=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of this.inputNames)if(typeof t[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(s)for(let d of this.outputNames)a[d]=null;let u=await this.handler.run(t,a,n),l={};for(let d in u)if(Object.hasOwnProperty.call(u,d)){let h=u[d];h instanceof at?l[d]=h:l[d]=new at(h.type,h.data,h.dims)}return Xt("InferenceSession.run"),nt(),l}async release(){return this.handler.dispose()}static async create(t,r,i,a){ft(),Yt("InferenceSession.create");let n,s={};if(typeof t=="string"){if(n=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(n=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let h=t,p=0,m=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(p=r,!Number.isSafeInteger(p))throw new RangeError("'byteOffset' must be an integer.");if(p<0||p>=h.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${h.byteLength}).`);if(m=t.byteLength-p,typeof i=="number"){if(m=i,!Number.isSafeInteger(m))throw new RangeError("'byteLength' must be an integer.");if(m<=0||p+m>h.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${h.byteLength-p}].`);if(typeof a=="object"&&a!==null)s=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");n=new Uint8Array(h,p,m)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await ss(s),d=await u.createInferenceSessionHandler(n,l);return Xt("InferenceSession.create"),nt(),new $m(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Gi,Um=L(()=>{"use strict";Pm(),Gi=vs}),Lm=L(()=>{"use strict"}),qm=L(()=>{"use strict"}),Gm=L(()=>{"use strict"}),Wm=L(()=>{"use strict"}),Vm={};hr(Vm,{InferenceSession:()=>Gi,TRACE:()=>Zr,TRACE_EVENT_BEGIN:()=>Yt,TRACE_EVENT_END:()=>Xt,TRACE_FUNC_BEGIN:()=>ft,TRACE_FUNC_END:()=>nt,Tensor:()=>at,env:()=>Ae,registerBackend:()=>fr});var rt=L(()=>{"use strict";zm(),Rm(),Um(),_s(),Lm(),qm(),$s(),Gm(),Wm()}),Wi=L(()=>{"use strict"}),xs={};hr(xs,{default:()=>Ts});var Vi,Hi,Ts,Hm=L(()=>{"use strict";var e;mh(),Qt(),Xi(),Vi="ort-wasm-proxy-worker",Hi=((e=globalThis.self)==null?void 0:e.name)===Vi,Hi&&(self.onmessage=t=>{let{type:r,in:i}=t.data;try{switch(r){case"init-wasm":ea(i.wasm).then(()=>{gn(i).then(()=>{postMessage({type:r})},a=>{postMessage({type:r,err:a})})},a=>{postMessage({type:r,err:a})});break;case"init-ep":{let{epName:a,env:n}=i;yn(n,a).then(()=>{postMessage({type:r})},s=>{postMessage({type:r,err:s})});break}case"copy-from":{let{buffer:a}=i,n=mi(a);postMessage({type:r,out:n});break}case"create":{let{model:a,options:n}=i;wn(a,n).then(s=>{postMessage({type:r,out:s})},s=>{postMessage({type:r,err:s})});break}case"release":_n(i),postMessage({type:r});break;case"run":{let{sessionId:a,inputIndices:n,inputs:s,outputIndices:u,options:l}=i;vn(a,n,s,u,new Array(u.length).fill(null),l).then(d=>{d.some(h=>h[3]!=="cpu")?postMessage({type:r,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:r,out:d},Tn([...s,...d]))},d=>{postMessage({type:r,err:d})});break}case"end-profiling":xn(i),postMessage({type:r});break;default:}}catch(a){postMessage({type:r,err:a})}}),Ts=Hi?null:t=>new Worker(t??Qe,{type:"module",name:Vi})}),Ss={};hr(Ss,{default:()=>As});async function ks(e={}){var wm,_m;var t=e,r=!!globalThis.window,i=!!globalThis.WorkerGlobalScope,a=i&&((wm=self.name)==null?void 0:wm.startsWith("em-pthread"));t.mountExternalData=(o,c)=>{o.startsWith("./")&&(o=o.substring(2)),(t.Yc||(t.Yc=new Map)).set(o,c)},t.unmountExternalData=()=>{delete t.Yc,delete t.Zd,delete t.Yd,delete t.$d},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let n=o=>async(...c)=>{var g;try{if(t.Xc)throw Error("Session already started");let f=t.Xc={Kd:c[0],errors:[]},x=await o(...c);if(t.Xc!==f)throw Error("Session mismatch");(g=t.dd)==null||g.flush();let E=f.errors;if(0<E.length){let O=await Promise.all(E);if(O=O.filter(B=>B),0<O.length)throw Error(O.join(`
`))}return x}finally{t.Xc=null}};t.jsepInit=(o,c)=>{if(o==="webgpu"){[t.dd,t.Ad,t.Ed,t.ed,t.Dd,t.$b,t.Fd,t.Hd,t.Bd,t.Cd,t.Gd]=c;let g=t.dd;t.jsepRegisterBuffer=(f,x,E,O)=>g.registerBuffer(f,x,E,O),t.jsepGetBuffer=f=>g.getBuffer(f),t.jsepCreateDownloader=(f,x,E)=>g.createDownloader(f,x,E),t.jsepOnCreateSession=f=>{g.onCreateSession(f)},t.jsepOnReleaseSession=f=>{g.onReleaseSession(f)},t.jsepOnRunStart=f=>g.onRunStart(f),t.Id=(f,x)=>{g.upload(f,x)}}else if(o==="webnn"){let g=c[0];[t.Sd,t.sd,t.webnnEnsureTensor,t.td,t.webnnDownloadTensor,t.Rd,t.webnnEnableTraceEvent]=c.slice(1),t.webnnReleaseTensorId=t.sd,t.webnnUploadTensor=t.td,t.webnnRegisterMLContext=t.Rd,t.webnnOnRunStart=f=>g.onRunStart(f),t.webnnOnRunEnd=g.onRunEnd.bind(g),t.webnnOnReleaseSession=f=>{g.onReleaseSession(f)},t.webnnCreateMLTensorDownloader=(f,x)=>g.createMLTensorDownloader(f,x),t.webnnRegisterMLTensor=(f,x,E,O)=>g.registerMLTensor(f,x,E,O),t.webnnCreateMLContext=f=>g.createMLContext(f),t.webnnRegisterGraphInput=g.registerGraphInput.bind(g),t.webnnIsGraphInput=g.isGraphInput.bind(g),t.webnnRegisterGraphOutput=g.registerGraphOutput.bind(g),t.webnnIsGraphOutput=g.isGraphOutput.bind(g),t.webnnCreateTemporaryTensor=g.createTemporaryTensor.bind(g),t.webnnIsGraphInputOutputTypeSupported=g.isGraphInputOutputTypeSupported.bind(g)}};let s=()=>{let o=c=>(...g)=>{let f=xt;return g=c(...g),xt!=f?new Promise((x,E)=>{Vn={resolve:x,reject:E}}):g};(()=>{for(let c of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[c]=o(t[c])})(),n!==void 0&&(t._OrtRun=n(t._OrtRun),t._OrtRunWithBinding=n(t._OrtRunWithBinding)),s=void 0};t.asyncInit=()=>{s==null||s()};var u,l,d=(o,c)=>{throw c},h=self.location.href,p="";if(r||i){try{p=new URL(".",h).href}catch{}i&&(l=o=>{var c=new XMLHttpRequest;return c.open("GET",o,!1),c.responseType="arraybuffer",c.send(null),new Uint8Array(c.response)}),u=async o=>{if(C(o))return new Promise((g,f)=>{var x=new XMLHttpRequest;x.open("GET",o,!0),x.responseType="arraybuffer",x.onload=()=>{x.status==200||x.status==0&&x.response?g(x.response):f(x.status)},x.onerror=f,x.send(null)});var c=await fetch(o,{credentials:"same-origin"});if(c.ok)return c.arrayBuffer();throw Error(c.status+" : "+c.url)}}var m,b,y,_,T,v,$=console.log.bind(console),k=console.error.bind(console),A=$,I=k,S=!1,C=o=>o.startsWith("file://");function w(){_t.buffer!=P.buffer&&Y()}if(a){let o=function(c){try{var g=c.data,f=g.Sc;if(f==="load"){let x=[];self.onmessage=E=>x.push(E),v=()=>{postMessage({Sc:"loaded"});for(let E of x)o(E);self.onmessage=o};for(let E of g.xd)t[E]&&!t[E].proxy||(t[E]=(...O)=>{postMessage({Sc:"callHandler",vd:E,args:O})},E=="print"&&(A=t[E]),E=="printErr"&&(I=t[E]));_t=g.Od,Y(),b=g.Pd,qe(),Di()}else if(f==="run"){(function(x){var E=(w(),j)[x+52>>>2>>>0];x=(w(),j)[x+56>>>2>>>0],If(E,E-x),he(E)})(g.Rc),Zn(g.Rc,0,0,1,0,0),Gr(),qn(g.Rc),R||(xf(),R=!0);try{tt(g.Md,g.bd)}catch(x){if(x!="unwind")throw x}}else g.target!=="setimmediate"&&(f==="checkMailbox"?R&&Ei():f&&(I(`worker: received unknown command ${f}`),I(g)))}catch(x){throw Tf(),x}};var R=!1;self.onunhandledrejection=c=>{throw c.reason||c},self.onmessage=o}var P,V,F,U,M,j,X,J,de,H,pe,q=!1;function Y(){var o=_t.buffer;t.HEAP8=P=new Int8Array(o),F=new Int16Array(o),t.HEAPU8=V=new Uint8Array(o),U=new Uint16Array(o),t.HEAP32=M=new Int32Array(o),t.HEAPU32=j=new Uint32Array(o),X=new Float32Array(o),J=new Float64Array(o),de=new BigInt64Array(o),H=new BigUint64Array(o)}function ee(){q=!0,a?v():Rt.sb()}function W(o){throw I(o="Aborted("+o+")"),S=!0,o=new WebAssembly.RuntimeError(o+". Build with -sASSERTIONS for more info."),T==null||T(o),o}function K(){return{a:{ma:U0,hb:P0,g:Vr,J:G,f:Me,o:Ve,i:Fe,$:vi,b:xi,S:Ti,Ia:Dh,n:Sy,aa:Uh,Ya:Lh,Ea:qh,Ga:Gh,Za:Wh,Wa:Vh,Pa:Hh,Va:Fh,ka:jh,Fa:Kh,Ca:Zh,Xa:Yh,Da:Xh,cb:ky,fa:Ay,xa:Ey,va:Cy,ea:Oy,N:Ry,H:My,wa:Dy,_:Gy,ya:Wy,Sa:Vy,Aa:Fy,Ja:jy,ta:Ky,ga:Zy,Ra:qn,$a:Yy,Q:e0,r:n0,c:Un,ib:s0,y:o0,M:u0,D:l0,l:d0,s:sf,jb:c0,I:p0,R:h0,j:f0,u:m0,q:g0,k:y0,Ma:b0,Na:w0,Oa:_0,Ka:df,La:cf,ua:pf,eb:v0,bb:T0,v:S0,ba:k0,ha:A0,ab:x0,V:E0,_a:I0,Ba:C0,F:$0,T:z0,la:Ri,za:R0,gb:O0,fb:M0,Ta:gf,Ua:yf,Ha:Gt,U:bf,ja:wf,Qa:_f,ia:$f,lb:$b,na:gb,mb:_b,oa:mb,G:nb,e:W0,t:q0,w:L0,B:J0,nb:pb,Z:cb,x:F0,pa:hb,X:yb,ca:db,ob:lb,pb:ub,O:eb,qa:ob,qb:sb,L:ib,Y:fb,d:G0,A:H0,m:V0,kb:vb,p:K0,z:Z0,C:j0,E:Y0,K:tb,ra:ab,P:bb,da:rb,W:wb,rb:Q0,sa:X0,h:B0,a:_t,db:We}}}async function qe(){function o(f,x){var E=Rt=f.exports;f={};for(let[O,B]of Object.entries(E))typeof B=="function"?(E=Xy(B),f[O]=E):f[O]=B;return Rt=f,Rt=(function(){var O=Rt,B=Q=>ce=>Q(ce)>>>0,Z=Q=>()=>Q()>>>0;return(O=Object.assign({},O)).tb=B(O.tb),O.Xb=Z(O.Xb),O.Zb=B(O.Zb),O.lc=B(O.lc),O.mc=Z(O.mc),O.qc=B(O.qc),O})(),z.push(Rt._b),vf=(f=Rt).tb,xf=f.ub,t._OrtInit=f.vb,t._OrtGetLastError=f.wb,t._OrtCreateSessionOptions=f.xb,t._OrtAppendExecutionProvider=f.yb,t._OrtAddFreeDimensionOverride=f.zb,t._OrtAddSessionConfigEntry=f.Ab,t._OrtReleaseSessionOptions=f.Bb,t._OrtCreateSession=f.Cb,t._OrtReleaseSession=f.Db,t._OrtGetInputOutputCount=f.Eb,t._OrtGetInputOutputMetadata=f.Fb,t._OrtFree=f.Gb,t._OrtCreateTensor=f.Hb,t._OrtGetTensorData=f.Ib,t._OrtReleaseTensor=f.Jb,t._OrtCreateRunOptions=f.Kb,t._OrtAddRunConfigEntry=f.Lb,t._OrtReleaseRunOptions=f.Mb,t._OrtCreateBinding=f.Nb,t._OrtBindInput=f.Ob,t._OrtBindOutput=f.Pb,t._OrtClearBoundOutputs=f.Qb,t._OrtReleaseBinding=f.Rb,t._OrtRunWithBinding=f.Sb,t._OrtRun=f.Tb,t._OrtEndProfiling=f.Ub,t._JsepOutput=f.Vb,t._JsepGetNodeName=f.Wb,Mi=f.Xb,Tt=t._free=f.Yb,Fr=t._malloc=f.Zb,Zn=f.ac,Tf=f.bc,Sf=f.cc,kf=f.dc,Yn=f.ec,Af=f.fc,Ef=f.gc,ye=f.hc,jr=f.ic,If=f.jc,he=f.kc,Xn=f.lc,me=f.mc,Cf=f.nc,Qn=f.oc,zf=f.pc,Of=f.qc,Rf=f.rc,Jn=f.sc,Mf=f.tc,Df=f.uc,Bf=f.vc,Nf=f.wc,Pf=f.xc,Uf=f.yc,Lf=f.zc,qf=f.Ac,Gf=f.Bc,Wf=f.Cc,Vf=f.Dc,Hf=f.Ec,Ff=f.Fc,jf=f.Gc,Kf=f.Hc,Zf=f.Ic,Yf=f.Jc,Xf=f.Kc,Qf=f.Lc,Jf=f.Mc,em=f.Nc,tm=f.Pc,rm=f.Qc,im=f.$c,am=f.ad,nm=f.fd,sm=f.kd,om=f.ld,um=f.md,lm=f.nd,dm=f.od,cm=f.pd,pm=f.qd,hm=f.rd,fm=f.wd,mm=f.Ud,gm=f.Vd,ym=f.Wd,bm=f.Xd,b=x,Rt}var c,g=K();return t.instantiateWasm?new Promise(f=>{t.instantiateWasm(g,(x,E)=>{f(o(x,E))})}):a?o(new WebAssembly.Instance(b,K()),b):(pe??(pe=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",p):p+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",self.location.href).href),c=await(async function(f){var x=pe;if(!m&&!C(x))try{var E=fetch(x,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(E,f)}catch(O){I(`wasm streaming compile failed: ${O}`),I("falling back to ArrayBuffer instantiation")}return(async function(O,B){try{var Z=await(async function(Q){if(!m)try{var ce=await u(Q);return new Uint8Array(ce)}catch{}if(Q==pe&&m)Q=new Uint8Array(m);else{if(!l)throw"both async and sync fetching of the wasm failed";Q=l(Q)}return Q})(O);return await WebAssembly.instantiate(Z,B)}catch(Q){I(`failed to asynchronously prepare wasm: ${Q}`),W(Q)}})(x,f)})(g),o(c.instance,c.module))}class be{constructor(c){is(this,"name","ExitStatus");this.message=`Program terminated with exit(${c})`,this.status=c}}var ze=o=>{o.terminate(),o.onmessage=()=>{}},Ge=[],Be=0,He=null,bt=o=>{wt.length==0&&(Bn(),Wr(wt[0]));var c=wt.pop();if(!c)return 6;zt.push(c),Te[o.Rc]=c,c.Rc=o.Rc;var g={Sc:"run",Md:o.Ld,bd:o.bd,Rc:o.Rc};return c.postMessage(g,o.jd),0},Ie=0,oe=(o,c,...g)=>{var f,x=16*g.length,E=me(),O=Xn(x),B=O>>>3;for(f of g)typeof f=="bigint"?((w(),de)[B++>>>0]=1n,(w(),de)[B++>>>0]=f):((w(),de)[B++>>>0]=0n,(w(),J)[B++>>>0]=f);return o=Sf(o,0,x,O,c),he(E),o};function We(o){if(a)return oe(0,1,o);if(y=o,!(0<Ie)){for(var c of zt)ze(c);for(c of wt)ze(c);wt=[],zt=[],Te={},S=!0}d(0,new be(o))}function et(o){if(a)return oe(1,0,o);Gt(o)}var Gt=o=>{if(y=o,a)throw et(o),"unwind";We(o)},wt=[],zt=[],z=[],Te={},Dn=o=>{var c=o.Rc;delete Te[c],wt.push(o),zt.splice(zt.indexOf(o),1),o.Rc=0,kf(c)};function Gr(){z.forEach(o=>o())}var Wr=o=>new Promise(c=>{o.onmessage=x=>{var E=x.data;if(x=E.Sc,E.Zc&&E.Zc!=Mi()){var O=Te[E.Zc];O?O.postMessage(E,E.jd):I(`Internal error! Worker sent a message "${x}" to target pthread ${E.Zc}, but that thread no longer exists!`)}else x==="checkMailbox"?Ei():x==="spawnThread"?bt(E):x==="cleanupThread"?Ai(()=>{Dn(Te[E.Nd])}):x==="loaded"?(o.loaded=!0,c(o)):E.target==="setimmediate"?o.postMessage(E):x==="uncaughtException"?o.onerror(E.error):x==="callHandler"?t[E.vd](...E.args):x&&I(`worker sent an unknown command ${x}`)},o.onerror=x=>{throw I(`worker sent an error! ${x.filename}:${x.lineno}: ${x.message}`),x};var g,f=[];for(g of[])t.propertyIsEnumerable(g)&&f.push(g);o.postMessage({Sc:"load",xd:f,Od:_t,Pd:b})});function Bn(){var o=new Worker((()=>{let c=URL;return self.location.href>"file:"&&self.location.href<"file;"?new c("ort.bundle.min.mjs",self.location.href):new URL(self.location.href)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});wt.push(o)}var _t,tt=(o,c)=>{Ie=0,o=Jn(o,c),0<Ie?y=o:Yn(o)},wr=[],$t=0;function Vr(o){var c=new ge(o>>>=0);return(w(),P)[c.Tc+12>>>0]==0&&(fe(c,!0),$t--),$e(c,!1),wr.push(c),Of(o)}var Wt=0,G=()=>{ye(0,0);var o=wr.pop();Cf(o.cd),Wt=0};function fe(o,c){c=c?1:0,(w(),P)[o.Tc+12>>>0]=c}function $e(o,c){c=c?1:0,(w(),P)[o.Tc+13>>>0]=c}class ge{constructor(c){this.cd=c,this.Tc=c-24}}var pt=o=>{var c=Wt;if(!c)return jr(0),0;var g=new ge(c);(w(),j)[g.Tc+16>>>2>>>0]=c;var f=(w(),j)[g.Tc+4>>>2>>>0];if(!f)return jr(0),c;for(var x of o){if(x===0||x===f)break;if(zf(x,f,g.Tc+16))return jr(x),c}return jr(f),c};function Me(){return pt([])}function Ve(o){return pt([o>>>0])}function Fe(o,c,g,f){return pt([o>>>0,c>>>0,g>>>0,f>>>0])}var vi=()=>{var o=wr.pop();o||W("no exception to throw");var c=o.cd;throw(w(),P)[o.Tc+13>>>0]==0&&(wr.push(o),$e(o,!0),fe(o,!1),$t++),Qn(c),Wt=c};function xi(o,c,g){var f=new ge(o>>>=0);throw c>>>=0,g>>>=0,(w(),j)[f.Tc+16>>>2>>>0]=0,(w(),j)[f.Tc+4>>>2>>>0]=c,(w(),j)[f.Tc+8>>>2>>>0]=g,Qn(o),$t++,Wt=o}var Ti=()=>$t;function Si(o,c,g,f){return a?oe(2,1,o,c,g,f):Dh(o,c,g,f)}function Dh(o,c,g,f){if(o>>>=0,c>>>=0,g>>>=0,f>>>=0,!globalThis.SharedArrayBuffer)return 6;var x=[];return a&&x.length===0?Si(o,c,g,f):(o={Ld:g,Rc:o,bd:f,jd:x},a?(o.Sc="spawnThread",postMessage(o,x),0):bt(o))}function Sy(o){throw Wt||(Wt=o>>>0),Wt}var Bh=globalThis.TextDecoder&&new TextDecoder,Nh=(o,c,g,f)=>{if(g=c+g,f)return g;for(;o[c]&&!(c>=g);)++c;return c},Ph=(o,c=0,g,f)=>{if(16<(g=Nh(o,c>>>=0,g,f))-c&&o.buffer&&Bh)return Bh.decode(o.buffer instanceof ArrayBuffer?o.subarray(c,g):o.slice(c,g));for(f="";c<g;){var x=o[c++];if(128&x){var E=63&o[c++];if((224&x)==192)f+=String.fromCharCode((31&x)<<6|E);else{var O=63&o[c++];65536>(x=(240&x)==224?(15&x)<<12|E<<6|O:(7&x)<<18|E<<12|O<<6|63&o[c++])?f+=String.fromCharCode(x):(x-=65536,f+=String.fromCharCode(55296|x>>10,56320|1023&x))}}else f+=String.fromCharCode(x)}return f},De=(o,c,g)=>(o>>>=0)?Ph((w(),V),o,c,g):"";function Uh(o,c,g){return a?oe(3,1,o,c,g):0}function Lh(o,c){if(a)return oe(4,1,o,c)}function qh(o,c){if(a)return oe(5,1,o,c)}function Gh(o,c,g){if(a)return oe(6,1,o,c,g)}function Wh(o,c,g){return a?oe(7,1,o,c,g):0}function Vh(o,c){if(a)return oe(8,1,o,c)}function Hh(o,c,g){if(a)return oe(9,1,o,c,g)}function Fh(o,c,g,f){if(a)return oe(10,1,o,c,g,f)}function jh(o,c,g,f){if(a)return oe(11,1,o,c,g,f)}function Kh(o,c,g,f){if(a)return oe(12,1,o,c,g,f)}function Zh(o){if(a)return oe(13,1,o)}function Yh(o,c){if(a)return oe(14,1,o,c)}function Xh(o,c,g){if(a)return oe(15,1,o,c,g)}var ky=()=>W(""),vt=o=>{o>>>=0;for(var c="";;){var g=(w(),V)[o++>>>0];if(!g)return c;c+=String.fromCharCode(g)}},Nn={},Pn={},_r=class extends Error{constructor(o){super(o),this.name="BindingError"}};function Ot(o,c,g={}){return(function(f,x,E={}){var O=x.name;if(!f)throw new _r(`type "${O}" must have a positive integer typeid pointer`);if(Pn.hasOwnProperty(f)){if(E.yd)return;throw new _r(`Cannot register type '${O}' twice`)}Pn[f]=x,Nn.hasOwnProperty(f)&&(x=Nn[f],delete Nn[f],x.forEach(B=>B()))})(o,c,g)}var Qh=(o,c,g)=>{switch(c){case 1:return g?f=>(w(),P)[f>>>0]:f=>(w(),V)[f>>>0];case 2:return g?f=>(w(),F)[f>>>1>>>0]:f=>(w(),U)[f>>>1>>>0];case 4:return g?f=>(w(),M)[f>>>2>>>0]:f=>(w(),j)[f>>>2>>>0];case 8:return g?f=>(w(),de)[f>>>3>>>0]:f=>(w(),H)[f>>>3>>>0];default:throw new TypeError(`invalid integer width (${c}): ${o}`)}};function Ay(o,c,g,f,x){o>>>=0,g>>>=0,c=vt(c>>>0);let E=O=>O;if(f=f===0n){let O=8*g;E=B=>BigInt.asUintN(O,B),x=E(x)}Ot(o,{name:c,Oc:E,Vc:(O,B)=>(typeof B=="number"&&(B=BigInt(B)),B),Uc:Qh(c,g,!f),Wc:null})}function Ey(o,c,g,f){Ot(o>>>=0,{name:c=vt(c>>>0),Oc:function(x){return!!x},Vc:function(x,E){return E?g:f},Uc:function(x){return this.Oc((w(),V)[x>>>0])},Wc:null})}var Jh=[],cr=[0,1,,1,null,1,!0,1,!1,1];function Un(o){9<(o>>>=0)&&--cr[o+1]===0&&(cr[o]=void 0,Jh.push(o))}var it=o=>{if(!o)throw new _r(`Cannot use deleted val. handle = ${o}`);return cr[o]},ht=o=>{switch(o){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let c=Jh.pop()||cr.length;return cr[c]=o,cr[c+1]=1,c}};function Ln(o){return this.Oc((w(),j)[o>>>2>>>0])}var Iy={name:"emscripten::val",Oc:o=>{var c=it(o);return Un(o),c},Vc:(o,c)=>ht(c),Uc:Ln,Wc:null};function Cy(o){return Ot(o>>>0,Iy)}var zy=(o,c)=>{switch(c){case 4:return function(g){return this.Oc((w(),X)[g>>>2>>>0])};case 8:return function(g){return this.Oc((w(),J)[g>>>3>>>0])};default:throw new TypeError(`invalid float width (${c}): ${o}`)}};function Oy(o,c,g){g>>>=0,Ot(o>>>=0,{name:c=vt(c>>>0),Oc:f=>f,Vc:(f,x)=>x,Uc:zy(c,g),Wc:null})}function Ry(o,c,g,f,x){o>>>=0,g>>>=0,c=vt(c>>>0);let E=B=>B;if(f===0){var O=32-8*g;E=B=>B<<O>>>O,x=E(x)}Ot(o,{name:c,Oc:E,Vc:(B,Z)=>Z,Uc:Qh(c,g,f!==0),Wc:null})}function My(o,c,g){function f(E){var O=(w(),j)[E>>>2>>>0];return E=(w(),j)[E+4>>>2>>>0],new x((w(),P).buffer,E,O)}var x=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][c];Ot(o>>>=0,{name:g=vt(g>>>0),Oc:f,Uc:f},{yd:!0})}var Vt=(o,c,g)=>{var f=(w(),V);if(c>>>=0,0<g){var x=c;g=c+g-1;for(var E=0;E<o.length;++E){var O=o.codePointAt(E);if(127>=O){if(c>=g)break;f[c++>>>0]=O}else if(2047>=O){if(c+1>=g)break;f[c++>>>0]=192|O>>6,f[c++>>>0]=128|63&O}else if(65535>=O){if(c+2>=g)break;f[c++>>>0]=224|O>>12,f[c++>>>0]=128|O>>6&63,f[c++>>>0]=128|63&O}else{if(c+3>=g)break;f[c++>>>0]=240|O>>18,f[c++>>>0]=128|O>>12&63,f[c++>>>0]=128|O>>6&63,f[c++>>>0]=128|63&O,E++}}f[c>>>0]=0,o=c-x}else o=0;return o},ki=o=>{for(var c=0,g=0;g<o.length;++g){var f=o.charCodeAt(g);127>=f?c++:2047>=f?c+=2:55296<=f&&57343>=f?(c+=4,++g):c+=3}return c};function Dy(o,c){Ot(o>>>=0,{name:c=vt(c>>>0),Oc(g){var f=(w(),j)[g>>>2>>>0];return f=De(g+4,f,!0),Tt(g),f},Vc(g,f){f instanceof ArrayBuffer&&(f=new Uint8Array(f));var x=typeof f=="string";if(!(x||ArrayBuffer.isView(f)&&f.BYTES_PER_ELEMENT==1))throw new _r("Cannot pass non-string to std::string");var E=x?ki(f):f.length,O=Fr(4+E+1),B=O+4;return(w(),j)[O>>>2>>>0]=E,x?Vt(f,B,E+1):(w(),V).set(f,B>>>0),g!==null&&g.push(Tt,O),O},Uc:Ln,Wc(g){Tt(g)}})}var ef=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,By=(o,c,g)=>{if(o>>>=1,16<(c=Nh((w(),U),o,c/2,g))-o&&ef)return ef.decode((w(),U).slice(o,c));for(g="";o<c;++o){var f=(w(),U)[o>>>0];g+=String.fromCharCode(f)}return g},Ny=(o,c,g)=>{if(g??(g=2147483647),2>g)return 0;var f=c;g=(g-=2)<2*o.length?g/2:o.length;for(var x=0;x<g;++x){var E=o.charCodeAt(x);(w(),F)[c>>>1>>>0]=E,c+=2}return(w(),F)[c>>>1>>>0]=0,c-f},Py=o=>2*o.length,Uy=(o,c,g)=>{var f="";o>>>=2;for(var x=0;!(x>=c/4);x++){var E=(w(),j)[o+x>>>0];if(!E&&!g)break;f+=String.fromCodePoint(E)}return f},Ly=(o,c,g)=>{if(c>>>=0,g??(g=2147483647),4>g)return 0;var f=c;g=f+g-4;for(var x=0;x<o.length;++x){var E=o.codePointAt(x);if(65535<E&&x++,(w(),M)[c>>>2>>>0]=E,(c+=4)+4>g)break}return(w(),M)[c>>>2>>>0]=0,c-f},qy=o=>{for(var c=0,g=0;g<o.length;++g)65535<o.codePointAt(g)&&g++,c+=4;return c};function Gy(o,c,g){if(o>>>=0,c>>>=0,g=vt(g>>>=0),c===2)var f=By,x=Ny,E=Py;else f=Uy,x=Ly,E=qy;Ot(o,{name:g,Oc:O=>{var B=(w(),j)[O>>>2>>>0];return B=f(O+4,B*c,!0),Tt(O),B},Vc:(O,B)=>{if(typeof B!="string")throw new _r(`Cannot pass non-string to C++ string type ${g}`);var Z=E(B),Q=Fr(4+Z+c);return(w(),j)[Q>>>2>>>0]=Z/c,x(B,Q+4,Z+c),O!==null&&O.push(Tt,Q),Q},Uc:Ln,Wc(O){Tt(O)}})}function Wy(o,c){Ot(o>>>=0,{zd:!0,name:c=vt(c>>>0),Oc:()=>{},Vc:()=>{}})}function Vy(o){Zn(o>>>0,!i,1,!r,131072,!1),Gr()}var Ai=o=>{if(!S)try{if(o(),!(0<Ie))try{a?Mi()&&Yn(y):Gt(y)}catch(c){c instanceof be||c=="unwind"||d(0,c)}}catch(c){c instanceof be||c=="unwind"||d(0,c)}},Hy=!Atomics.waitAsync||((_m=globalThis.navigator)==null?void 0:_m.userAgent)&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function qn(o){o>>>=0,Hy||(Atomics.waitAsync((w(),M),o>>>2,o).value.then(Ei),o+=128,Atomics.store((w(),M),o>>>2,1))}var Ei=()=>Ai(()=>{var o=Mi();o&&(qn(o),Ef())});function Fy(o,c){(o>>>=0)==c>>>0?setTimeout(Ei):a?postMessage({Zc:o,Sc:"checkMailbox"}):(o=Te[o])&&o.postMessage({Sc:"checkMailbox"})}var Gn=[];function jy(o,c,g,f,x){for(c>>>=0,x>>>=0,Gn.length=0,g=x>>>3,f=x+f>>>3;g<f;){var E;E=(w(),de)[g++>>>0]?(w(),de)[g++>>>0]:(w(),J)[g++>>>0],Gn.push(E)}return(c?es[c]:N0[o])(...Gn)}var Ky=()=>{Ie=0};function Zy(o){o>>>=0,a?postMessage({Sc:"cleanupThread",Nd:o}):Dn(Te[o])}function Yy(o){}var Ii=o=>{try{o()}catch(c){W(c)}};function Xy(o){var c=(...g)=>{Ci.push(o);try{return o(...g)}finally{S||(Ci.pop(),xt&&Ht===1&&Ci.length===0&&(Ht=0,Ie+=1,Ii(gm),typeof Fibers<"u"&&Fibers.be()))}};return af.set(o,c),c}var Ht=0,xt=null,tf=0,Ci=[],Wn=new Map,rf=new Map,af=new Map,Qy=0,Vn=null,Jy=[],nf=o=>(function(c){if(!S){if(Ht===0){var g=!1,f=!1;c((x=0)=>{if(!S&&(tf=x,g=!0,f)){Ht=2,Ii(()=>ym(xt)),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.resume(),x=!1;try{var E=(function(){var Z=(w(),M)[xt+8>>>2>>>0];return Z=rf.get(Z),Z=af.get(Z),--Ie,Z()})()}catch(Z){E=Z,x=!0}var O=!1;if(!xt){var B=Vn;B&&(Vn=null,(x?B.reject:B.resolve)(E),O=!0)}if(x&&!O)throw E}}),f=!0,g||(Ht=1,xt=(function(){var x=Fr(65548),E=x+12;if((w(),j)[x>>>2>>>0]=E,(w(),j)[x+4>>>2>>>0]=E+65536,E=Ci[0],!Wn.has(E)){var O=Qy++;Wn.set(E,O),rf.set(O,E)}return E=Wn.get(E),(w(),M)[x+8>>>2>>>0]=E,x})(),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.pause(),Ii(()=>mm(xt)))}else Ht===2?(Ht=0,Ii(bm),Tt(xt),xt=null,Jy.forEach(Ai)):W(`invalid state: ${Ht}`);return tf}})(c=>{o().then(c)});function e0(o){return o>>>=0,nf(async()=>{var c=await it(o);return ht(c)})}var Hn=[],t0=o=>{var c=Hn.length;return Hn.push(o),c},r0=(o,c)=>{for(var g=Array(o),f=0;f<o;++f){var x=f,E=(w(),j)[c+4*f>>>2>>>0],O=Pn[E];if(O===void 0)throw o=`parameter ${f}`,E=vf(E),c=vt(E),Tt(E),new _r(`${o} has unknown type ${c}`);g[x]=O}return g},i0=(o,c,g)=>{var f=[];return o=o(f,g),f.length&&((w(),j)[c>>>2>>>0]=ht(f)),o},a0={},zi=o=>{var c=a0[o];return c===void 0?vt(o):c};function n0(o,c,g){var[f,...x]=r0(o,c>>>0);c=f.Vc.bind(f);var E=x.map(Z=>Z.Uc.bind(Z));o--;var O={toValue:it};switch(o=E.map((Z,Q)=>{var ce=`argFromPtr${Q}`;return O[ce]=Z,`${ce}(args${Q?"+"+8*Q:""})`}),g){case 0:var B="toValue(handle)";break;case 2:B="new (toValue(handle))";break;case 3:B="";break;case 1:O.getStringOrSymbol=zi,B="toValue(handle)[getStringOrSymbol(methodName)]"}return B+=`(${o})`,f.zd||(O.toReturnWire=c,O.emval_returnValue=i0,B=`return emval_returnValue(toReturnWire, destructorsRef, ${B})`),B=`return function (handle, methodName, destructorsRef, args) {
  ${B}
  }`,g=new Function(Object.keys(O),B)(...Object.values(O)),B=`methodCaller<(${x.map(Z=>Z.name)}) => ${f.name}>`,t0(Object.defineProperty(g,"name",{value:B}))}function s0(o,c){return c>>>=0,(o=it(o>>>0))==it(c)}function o0(o){return(o>>>=0)?(o=zi(o),ht(globalThis[o])):ht(globalThis)}function u0(o){return o=zi(o>>>0),ht(t[o])}function l0(o,c){return c>>>=0,o=it(o>>>0),c=it(c),ht(o[c])}function d0(o){9<(o>>>=0)&&(cr[o+1]+=1)}function sf(o,c,g,f,x){return Hn[o>>>0](c>>>0,g>>>0,f>>>0,x>>>0)}function c0(o,c,g,f,x){return sf(o>>>0,c>>>0,g>>>0,f>>>0,x>>>0)}function p0(){return ht([])}function h0(o){o=it(o>>>0);for(var c=Array(o.length),g=0;g<o.length;g++)c[g]=o[g];return ht(c)}function f0(o){return ht(zi(o>>>0))}function m0(){return ht({})}function g0(o){for(var c=it(o>>>=0);c.length;){var g=c.pop();c.pop()(g)}Un(o)}function y0(o,c,g){c>>>=0,g>>>=0,o=it(o>>>0),c=it(c),g=it(g),o[c]=g}function b0(o,c){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),c>>>=0,o=new Date(1e3*o),(w(),M)[c>>>2>>>0]=o.getUTCSeconds(),(w(),M)[c+4>>>2>>>0]=o.getUTCMinutes(),(w(),M)[c+8>>>2>>>0]=o.getUTCHours(),(w(),M)[c+12>>>2>>>0]=o.getUTCDate(),(w(),M)[c+16>>>2>>>0]=o.getUTCMonth(),(w(),M)[c+20>>>2>>>0]=o.getUTCFullYear()-1900,(w(),M)[c+24>>>2>>>0]=o.getUTCDay(),o=(o.getTime()-Date.UTC(o.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(w(),M)[c+28>>>2>>>0]=o}var of=o=>o%4==0&&(o%100!=0||o%400==0),uf=[0,31,60,91,121,152,182,213,244,274,305,335],lf=[0,31,59,90,120,151,181,212,243,273,304,334];function w0(o,c){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),c>>>=0,o=new Date(1e3*o),(w(),M)[c>>>2>>>0]=o.getSeconds(),(w(),M)[c+4>>>2>>>0]=o.getMinutes(),(w(),M)[c+8>>>2>>>0]=o.getHours(),(w(),M)[c+12>>>2>>>0]=o.getDate(),(w(),M)[c+16>>>2>>>0]=o.getMonth(),(w(),M)[c+20>>>2>>>0]=o.getFullYear()-1900,(w(),M)[c+24>>>2>>>0]=o.getDay();var g=(of(o.getFullYear())?uf:lf)[o.getMonth()]+o.getDate()-1|0;(w(),M)[c+28>>>2>>>0]=g,(w(),M)[c+36>>>2>>>0]=-60*o.getTimezoneOffset(),g=new Date(o.getFullYear(),6,1).getTimezoneOffset();var f=new Date(o.getFullYear(),0,1).getTimezoneOffset();o=0|(g!=f&&o.getTimezoneOffset()==Math.min(f,g)),(w(),M)[c+32>>>2>>>0]=o}function _0(o){o>>>=0;var c=new Date((w(),M)[o+20>>>2>>>0]+1900,(w(),M)[o+16>>>2>>>0],(w(),M)[o+12>>>2>>>0],(w(),M)[o+8>>>2>>>0],(w(),M)[o+4>>>2>>>0],(w(),M)[o>>>2>>>0],0),g=(w(),M)[o+32>>>2>>>0],f=c.getTimezoneOffset(),x=new Date(c.getFullYear(),6,1).getTimezoneOffset(),E=new Date(c.getFullYear(),0,1).getTimezoneOffset(),O=Math.min(E,x);return 0>g?(w(),M)[o+32>>>2>>>0]=+(x!=E&&O==f):0<g!=(O==f)&&(x=Math.max(E,x),c.setTime(c.getTime()+6e4*((0<g?O:x)-f))),(w(),M)[o+24>>>2>>>0]=c.getDay(),g=(of(c.getFullYear())?uf:lf)[c.getMonth()]+c.getDate()-1|0,(w(),M)[o+28>>>2>>>0]=g,(w(),M)[o>>>2>>>0]=c.getSeconds(),(w(),M)[o+4>>>2>>>0]=c.getMinutes(),(w(),M)[o+8>>>2>>>0]=c.getHours(),(w(),M)[o+12>>>2>>>0]=c.getDate(),(w(),M)[o+16>>>2>>>0]=c.getMonth(),(w(),M)[o+20>>>2>>>0]=c.getYear(),o=c.getTime(),BigInt(isNaN(o)?-1:o/1e3)}function df(o,c,g,f,x,E,O){return a?oe(16,1,o,c,g,f,x,E,O):-52}function cf(o,c,g,f,x,E){if(a)return oe(17,1,o,c,g,f,x,E)}var Hr={},$0=()=>performance.timeOrigin+performance.now();function pf(o,c){if(a)return oe(18,1,o,c);if(Hr[o]&&(clearTimeout(Hr[o].id),delete Hr[o]),!c)return 0;var g=setTimeout(()=>{delete Hr[o],Ai(()=>Af(o,performance.timeOrigin+performance.now()))},c);return Hr[o]={id:g,ae:c},0}function v0(o,c,g,f){o>>>=0,c>>>=0,g>>>=0,f>>>=0;var x=new Date().getFullYear(),E=new Date(x,0,1).getTimezoneOffset();x=new Date(x,6,1).getTimezoneOffset();var O=Math.max(E,x);(w(),j)[o>>>2>>>0]=60*O,(w(),M)[c>>>2>>>0]=+(E!=x),o=(c=B=>{var Z=Math.abs(B);return`UTC${0<=B?"-":"+"}${String(Math.floor(Z/60)).padStart(2,"0")}${String(Z%60).padStart(2,"0")}`})(E),c=c(x),x<E?(Vt(o,g,17),Vt(c,f,17)):(Vt(o,f,17),Vt(c,g,17))}var x0=()=>Date.now();function T0(o,c,g){return g>>>=0,0<=o&&3>=o?(o===0?o=Date.now():o=performance.timeOrigin+performance.now(),o=Math.round(1e6*o),(w(),de)[g>>>3>>>0]=BigInt(o),0):28}var Fn=[],hf=(o,c)=>{Fn.length=0;for(var g;g=(w(),V)[o++>>>0];){var f=g!=105;c+=(f&=g!=112)&&c%8?4:0,Fn.push(g==112?(w(),j)[c>>>2>>>0]:g==106?(w(),de)[c>>>3>>>0]:g==105?(w(),M)[c>>>2>>>0]:(w(),J)[c>>>3>>>0]),c+=f?8:4}return Fn};function S0(o,c,g){return o>>>=0,c=hf(c>>>0,g>>>0),es[o](...c)}function k0(o,c,g){return o>>>=0,c=hf(c>>>0,g>>>0),es[o](...c)}var A0=()=>{};function E0(o,c){return I(De(o>>>0,c>>>0))}var I0=()=>{throw Ie+=1,"unwind"};function C0(){return 4294901760}var z0=()=>navigator.hardwareConcurrency,pr={},Oi=o=>{var c;return(c=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(o))?+c[1]:(c=/:(\d+):\d+(?:\)|$)/.exec(o))?2147483648|+c[1]:0},ff=o=>{for(var c of o)(o=Oi(c))&&(pr[o]=c)};function O0(){var o=Error().stack.toString().split(`
`);return o[0]=="Error"&&o.shift(),ff(o),pr.gd=Oi(o[3]),pr.Jd=o,pr.gd}function Ri(o){if(!(o=pr[o>>>0]))return 0;var c;if(c=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(o))o=c[1];else if(c=/^\s+at (.*) \(.*\)$/.exec(o))o=c[1];else{if(!(c=/^(.+?)@/.exec(o)))return 0;o=c[1]}Tt(Ri.hd??0),c=ki(o)+1;var g=Fr(c);return g&&Vt(o,g,c),Ri.hd=g,Ri.hd}function R0(o){o>>>=0;var c=(w(),V).length;if(o<=c||4294901760<o)return!1;for(var g=1;4>=g;g*=2){var f=c*(1+.2/g);f=Math.min(f,o+100663296);e:{f=(Math.min(4294901760,65536*Math.ceil(Math.max(o,f)/65536))-_t.buffer.byteLength+65535)/65536|0;try{_t.grow(f),Y();var x=1;break e}catch{}x=void 0}if(x)return!0}return!1}function M0(o,c,g){if(o>>>=0,c>>>=0,pr.gd==o)var f=pr.Jd;else(f=Error().stack.toString().split(`
`))[0]=="Error"&&f.shift(),ff(f);for(var x=3;f[x]&&Oi(f[x])!=o;)++x;for(o=0;o<g&&f[o+x];++o)(w(),M)[c+4*o>>>2>>>0]=Oi(f[o+x]);return o}var jn,Kn={},mf=()=>{var f;if(!jn){var o,c={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(((f=globalThis.navigator)==null?void 0:f.language)??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(o in Kn)Kn[o]===void 0?delete c[o]:c[o]=Kn[o];var g=[];for(o in c)g.push(`${o}=${c[o]}`);jn=g}return jn};function gf(o,c){if(a)return oe(19,1,o,c);o>>>=0,c>>>=0;var g,f=0,x=0;for(g of mf()){var E=c+f;(w(),j)[o+x>>>2>>>0]=E,f+=Vt(g,E,1/0)+1,x+=4}return 0}function yf(o,c){if(a)return oe(20,1,o,c);o>>>=0,c>>>=0;var g=mf();for(var f of((w(),j)[o>>>2>>>0]=g.length,o=0,g))o+=ki(f)+1;return(w(),j)[c>>>2>>>0]=o,0}function bf(o){return a?oe(21,1,o):52}function wf(o,c,g,f){return a?oe(22,1,o,c,g,f):52}function _f(o,c,g,f){return a?oe(23,1,o,c,g,f):70}var D0=[null,[],[]];function $f(o,c,g,f){if(a)return oe(24,1,o,c,g,f);c>>>=0,g>>>=0,f>>>=0;for(var x=0,E=0;E<g;E++){var O=(w(),j)[c>>>2>>>0],B=(w(),j)[c+4>>>2>>>0];c+=8;for(var Z=0;Z<B;Z++){var Q=o,ce=(w(),V)[O+Z>>>0],ve=D0[Q];ce===0||ce===10?((Q===1?A:I)(Ph(ve)),ve.length=0):ve.push(ce)}x+=B}return(w(),j)[f>>>2>>>0]=x,0}function B0(o){return o>>>0}a||(function(){for(var o=t.numThreads-1;o--;)Bn();Ge.push(async()=>{var c=(async function(){if(!a)return Promise.all(wt.map(Wr))})();Be++,await c,--Be==0&&He&&(c=He,He=null,c())})})(),a||(_t=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),Y()),t.wasmBinary&&(m=t.wasmBinary),t.stackSave=()=>me(),t.stackRestore=o=>he(o),t.stackAlloc=o=>Xn(o),t.setValue=function(o,c,g="i8"){switch(g.endsWith("*")&&(g="*"),g){case"i1":case"i8":(w(),P)[o>>>0]=c;break;case"i16":(w(),F)[o>>>1>>>0]=c;break;case"i32":(w(),M)[o>>>2>>>0]=c;break;case"i64":(w(),de)[o>>>3>>>0]=BigInt(c);break;case"float":(w(),X)[o>>>2>>>0]=c;break;case"double":(w(),J)[o>>>3>>>0]=c;break;case"*":(w(),j)[o>>>2>>>0]=c;break;default:W(`invalid type for setValue: ${g}`)}},t.getValue=function(o,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":return(w(),P)[o>>>0];case"i16":return(w(),F)[o>>>1>>>0];case"i32":return(w(),M)[o>>>2>>>0];case"i64":return(w(),de)[o>>>3>>>0];case"float":return(w(),X)[o>>>2>>>0];case"double":return(w(),J)[o>>>3>>>0];case"*":return(w(),j)[o>>>2>>>0];default:W(`invalid type for getValue: ${c}`)}},t.UTF8ToString=De,t.stringToUTF8=Vt,t.lengthBytesUTF8=ki;var vf,xf,Mi,Tt,Fr,Zn,Tf,Sf,kf,Yn,Af,Ef,ye,jr,If,he,Xn,me,Cf,Qn,zf,Of,Rf,Jn,Mf,Df,Bf,Nf,Pf,Uf,Lf,qf,Gf,Wf,Vf,Hf,Ff,jf,Kf,Zf,Yf,Xf,Qf,Jf,em,tm,rm,im,am,nm,sm,om,um,lm,dm,cm,pm,hm,fm,mm,gm,ym,bm,Rt,N0=[We,et,Si,Uh,Lh,qh,Gh,Wh,Vh,Hh,Fh,jh,Kh,Zh,Yh,Xh,df,cf,pf,gf,yf,bf,wf,_f,$f],es={1055492:(o,c,g,f,x)=>{if(t===void 0||!t.Yc)return 1;if((o=De(Number(o>>>0))).startsWith("./")&&(o=o.substring(2)),!(o=t.Yc.get(o)))return 2;if(c=Number(c>>>0),g=Number(g>>>0),f=Number(f>>>0),c+g>o.byteLength)return 3;try{let E=o.subarray(c,c+g);switch(x){case 0:(w(),V).set(E,f>>>0);break;case 1:t.Qd?t.Qd(f,E):t.Id(f,E);break;default:return 4}return 0}catch{return 4}},1056316:(o,c,g)=>{t.td(o,(w(),V).subarray(c>>>0,c+g>>>0))},1056380:()=>t.Sd(),1056422:o=>{t.sd(o)},1056459:()=>{t.Bd()},1056490:()=>{t.Cd()},1056519:()=>{t.Gd()},1056544:o=>t.Ad(o),1056577:o=>t.Ed(o),1056609:(o,c,g)=>{t.ed(Number(o),Number(c),Number(g),!0)},1056672:(o,c,g)=>{t.ed(Number(o),Number(c),Number(g))},1056729:()=>typeof wasmOffsetConverter<"u",1056786:o=>{t.$b("Abs",o,void 0)},1056837:o=>{t.$b("Neg",o,void 0)},1056888:o=>{t.$b("Floor",o,void 0)},1056941:o=>{t.$b("Ceil",o,void 0)},1056993:o=>{t.$b("Reciprocal",o,void 0)},1057051:o=>{t.$b("Sqrt",o,void 0)},1057103:o=>{t.$b("Exp",o,void 0)},1057154:o=>{t.$b("Erf",o,void 0)},1057205:o=>{t.$b("Sigmoid",o,void 0)},1057260:(o,c,g)=>{t.$b("HardSigmoid",o,{alpha:c,beta:g})},1057339:o=>{t.$b("HardSwish",o,void 0)},1057396:o=>{t.$b("Log",o,void 0)},1057447:o=>{t.$b("Sin",o,void 0)},1057498:o=>{t.$b("Cos",o,void 0)},1057549:o=>{t.$b("Tan",o,void 0)},1057600:o=>{t.$b("Asin",o,void 0)},1057652:o=>{t.$b("Acos",o,void 0)},1057704:o=>{t.$b("Atan",o,void 0)},1057756:o=>{t.$b("Sinh",o,void 0)},1057808:o=>{t.$b("Cosh",o,void 0)},1057860:o=>{t.$b("Asinh",o,void 0)},1057913:o=>{t.$b("Acosh",o,void 0)},1057966:o=>{t.$b("Atanh",o,void 0)},1058019:o=>{t.$b("Tanh",o,void 0)},1058071:o=>{t.$b("Not",o,void 0)},1058122:(o,c,g)=>{t.$b("Clip",o,{min:c,max:g})},1058191:o=>{t.$b("Clip",o,void 0)},1058243:(o,c)=>{t.$b("Elu",o,{alpha:c})},1058301:o=>{t.$b("Gelu",o,void 0)},1058353:o=>{t.$b("Relu",o,void 0)},1058405:(o,c)=>{t.$b("LeakyRelu",o,{alpha:c})},1058469:(o,c)=>{t.$b("ThresholdedRelu",o,{alpha:c})},1058539:(o,c)=>{t.$b("Cast",o,{to:c})},1058597:o=>{t.$b("Add",o,void 0)},1058648:o=>{t.$b("Sub",o,void 0)},1058699:o=>{t.$b("Mul",o,void 0)},1058750:o=>{t.$b("Div",o,void 0)},1058801:o=>{t.$b("Pow",o,void 0)},1058852:o=>{t.$b("Equal",o,void 0)},1058905:o=>{t.$b("Greater",o,void 0)},1058960:o=>{t.$b("GreaterOrEqual",o,void 0)},1059022:o=>{t.$b("Less",o,void 0)},1059074:o=>{t.$b("LessOrEqual",o,void 0)},1059133:(o,c,g,f,x)=>{t.$b("ReduceMean",o,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from((w(),M).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},1059308:(o,c,g,f,x)=>{t.$b("ReduceMax",o,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from((w(),M).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},1059482:(o,c,g,f,x)=>{t.$b("ReduceMin",o,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from((w(),M).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},1059656:(o,c,g,f,x)=>{t.$b("ReduceProd",o,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from((w(),M).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},1059831:(o,c,g,f,x)=>{t.$b("ReduceSum",o,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from((w(),M).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},1060005:(o,c,g,f,x)=>{t.$b("ReduceL1",o,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from((w(),M).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},1060178:(o,c,g,f,x)=>{t.$b("ReduceL2",o,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from((w(),M).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},1060351:(o,c,g,f,x)=>{t.$b("ReduceLogSum",o,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from((w(),M).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},1060528:(o,c,g,f,x)=>{t.$b("ReduceSumSquare",o,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from((w(),M).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},1060708:(o,c,g,f,x)=>{t.$b("ReduceLogSumExp",o,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from((w(),M).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},1060888:o=>{t.$b("Where",o,void 0)},1060941:(o,c,g)=>{t.$b("Transpose",o,{perm:c?Array.from((w(),M).subarray(Number(c)>>>0,Number(g)>>>0)):[]})},1061065:(o,c,g,f)=>{t.$b("DepthToSpace",o,{blocksize:c,mode:De(g),format:f?"NHWC":"NCHW"})},1061198:(o,c,g,f)=>{t.$b("DepthToSpace",o,{blocksize:c,mode:De(g),format:f?"NHWC":"NCHW"})},1061331:(o,c,g,f)=>{t.$b("DFT",o,{axis:c,inverse:g,onesided:f})},1061423:(o,c,g,f,x,E,O,B,Z,Q,ce,ve,ke,Ce,Ft)=>{t.$b("ConvTranspose",o,{format:Z?"NHWC":"NCHW",autoPad:c,dilations:[g],group:f,kernelShape:[x],pads:[E,O],strides:[B],wIsConst:()=>!!(w(),P)[Q>>>0],outputPadding:ce?Array.from((w(),M).subarray(Number(ce)>>>0,Number(ve)>>>0)):[],outputShape:ke?Array.from((w(),M).subarray(Number(ke)>>>0,Number(Ce)>>>0)):[],activation:De(Ft)})},1061856:(o,c,g,f,x,E,O,B,Z,Q,ce,ve,ke,Ce)=>{t.$b("ConvTranspose",o,{format:B?"NHWC":"NCHW",autoPad:c,dilations:Array.from((w(),M).subarray(Number(g)>>>0,(Number(g)>>>0)+2>>>0)),group:f,kernelShape:Array.from((w(),M).subarray(Number(x)>>>0,(Number(x)>>>0)+2>>>0)),pads:Array.from((w(),M).subarray(Number(E)>>>0,(Number(E)>>>0)+4>>>0)),strides:Array.from((w(),M).subarray(Number(O)>>>0,(Number(O)>>>0)+2>>>0)),wIsConst:()=>!!(w(),P)[Z>>>0],outputPadding:Q?Array.from((w(),M).subarray(Number(Q)>>>0,Number(ce)>>>0)):[],outputShape:ve?Array.from((w(),M).subarray(Number(ve)>>>0,Number(ke)>>>0)):[],activation:De(Ce)})},1062517:(o,c,g,f,x,E,O,B,Z,Q,ce,ve,ke,Ce,Ft)=>{t.$b("ConvTranspose",o,{format:Z?"NHWC":"NCHW",autoPad:c,dilations:[g],group:f,kernelShape:[x],pads:[E,O],strides:[B],wIsConst:()=>!!(w(),P)[Q>>>0],outputPadding:ce?Array.from((w(),M).subarray(Number(ce)>>>0,Number(ve)>>>0)):[],outputShape:ke?Array.from((w(),M).subarray(Number(ke)>>>0,Number(Ce)>>>0)):[],activation:De(Ft)})},1062950:(o,c,g,f,x,E,O,B,Z,Q,ce,ve,ke,Ce)=>{t.$b("ConvTranspose",o,{format:B?"NHWC":"NCHW",autoPad:c,dilations:Array.from((w(),M).subarray(Number(g)>>>0,(Number(g)>>>0)+2>>>0)),group:f,kernelShape:Array.from((w(),M).subarray(Number(x)>>>0,(Number(x)>>>0)+2>>>0)),pads:Array.from((w(),M).subarray(Number(E)>>>0,(Number(E)>>>0)+4>>>0)),strides:Array.from((w(),M).subarray(Number(O)>>>0,(Number(O)>>>0)+2>>>0)),wIsConst:()=>!!(w(),P)[Z>>>0],outputPadding:Q?Array.from((w(),M).subarray(Number(Q)>>>0,Number(ce)>>>0)):[],outputShape:ve?Array.from((w(),M).subarray(Number(ve)>>>0,Number(ke)>>>0)):[],activation:De(Ce)})},1063611:(o,c)=>{t.$b("GlobalAveragePool",o,{format:c?"NHWC":"NCHW"})},1063702:(o,c,g,f,x,E,O,B,Z,Q,ce,ve,ke,Ce)=>{t.$b("AveragePool",o,{format:Ce?"NHWC":"NCHW",auto_pad:c,ceil_mode:g,count_include_pad:f,storage_order:x,dilations:E?Array.from((w(),M).subarray(Number(E)>>>0,Number(O)>>>0)):[],kernel_shape:B?Array.from((w(),M).subarray(Number(B)>>>0,Number(Z)>>>0)):[],pads:Q?Array.from((w(),M).subarray(Number(Q)>>>0,Number(ce)>>>0)):[],strides:ve?Array.from((w(),M).subarray(Number(ve)>>>0,Number(ke)>>>0)):[]})},1064181:(o,c)=>{t.$b("GlobalAveragePool",o,{format:c?"NHWC":"NCHW"})},1064272:(o,c,g,f,x,E,O,B,Z,Q,ce,ve,ke,Ce)=>{t.$b("AveragePool",o,{format:Ce?"NHWC":"NCHW",auto_pad:c,ceil_mode:g,count_include_pad:f,storage_order:x,dilations:E?Array.from((w(),M).subarray(Number(E)>>>0,Number(O)>>>0)):[],kernel_shape:B?Array.from((w(),M).subarray(Number(B)>>>0,Number(Z)>>>0)):[],pads:Q?Array.from((w(),M).subarray(Number(Q)>>>0,Number(ce)>>>0)):[],strides:ve?Array.from((w(),M).subarray(Number(ve)>>>0,Number(ke)>>>0)):[]})},1064751:(o,c)=>{t.$b("GlobalMaxPool",o,{format:c?"NHWC":"NCHW"})},1064838:(o,c,g,f,x,E,O,B,Z,Q,ce,ve,ke,Ce)=>{t.$b("MaxPool",o,{format:Ce?"NHWC":"NCHW",auto_pad:c,ceil_mode:g,count_include_pad:f,storage_order:x,dilations:E?Array.from((w(),M).subarray(Number(E)>>>0,Number(O)>>>0)):[],kernel_shape:B?Array.from((w(),M).subarray(Number(B)>>>0,Number(Z)>>>0)):[],pads:Q?Array.from((w(),M).subarray(Number(Q)>>>0,Number(ce)>>>0)):[],strides:ve?Array.from((w(),M).subarray(Number(ve)>>>0,Number(ke)>>>0)):[]})},1065313:(o,c)=>{t.$b("GlobalMaxPool",o,{format:c?"NHWC":"NCHW"})},1065400:(o,c,g,f,x,E,O,B,Z,Q,ce,ve,ke,Ce)=>{t.$b("MaxPool",o,{format:Ce?"NHWC":"NCHW",auto_pad:c,ceil_mode:g,count_include_pad:f,storage_order:x,dilations:E?Array.from((w(),M).subarray(Number(E)>>>0,Number(O)>>>0)):[],kernel_shape:B?Array.from((w(),M).subarray(Number(B)>>>0,Number(Z)>>>0)):[],pads:Q?Array.from((w(),M).subarray(Number(Q)>>>0,Number(ce)>>>0)):[],strides:ve?Array.from((w(),M).subarray(Number(ve)>>>0,Number(ke)>>>0)):[]})},1065875:(o,c,g,f,x)=>{t.$b("Gemm",o,{alpha:c,beta:g,transA:f,transB:x})},1065979:o=>{t.$b("MatMul",o,void 0)},1066033:(o,c,g,f)=>{t.$b("ArgMax",o,{keepDims:!!c,selectLastIndex:!!g,axis:f})},1066141:(o,c,g,f)=>{t.$b("ArgMin",o,{keepDims:!!c,selectLastIndex:!!g,axis:f})},1066249:(o,c)=>{t.$b("Softmax",o,{axis:c})},1066312:(o,c)=>{t.$b("Concat",o,{axis:c})},1066372:(o,c,g,f,x)=>{t.$b("Split",o,{axis:c,numOutputs:g,splitSizes:f?Array.from((w(),M).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},1066528:o=>{t.$b("Expand",o,void 0)},1066582:(o,c)=>{t.$b("Gather",o,{axis:Number(c)})},1066653:(o,c)=>{t.$b("GatherElements",o,{axis:Number(c)})},1066732:(o,c)=>{t.$b("GatherND",o,{batch_dims:Number(c)})},1066811:(o,c,g,f,x,E,O,B,Z,Q,ce)=>{t.$b("Resize",o,{antialias:c,axes:g?Array.from((w(),M).subarray(Number(g)>>>0,Number(f)>>>0)):[],coordinateTransformMode:De(x),cubicCoeffA:E,excludeOutside:O,extrapolationValue:B,keepAspectRatioPolicy:De(Z),mode:De(Q),nearestMode:De(ce)})},1067173:(o,c,g,f,x,E,O)=>{t.$b("Slice",o,{starts:c?Array.from((w(),M).subarray(Number(c)>>>0,Number(g)>>>0)):[],ends:f?Array.from((w(),M).subarray(Number(f)>>>0,Number(x)>>>0)):[],axes:E?Array.from((w(),M).subarray(Number(E)>>>0,Number(O)>>>0)):[]})},1067437:o=>{t.$b("Tile",o,void 0)},1067489:(o,c,g)=>{t.$b("InstanceNormalization",o,{epsilon:c,format:g?"NHWC":"NCHW"})},1067603:(o,c,g)=>{t.$b("InstanceNormalization",o,{epsilon:c,format:g?"NHWC":"NCHW"})},1067717:o=>{t.$b("Range",o,void 0)},1067770:(o,c)=>{t.$b("Einsum",o,{equation:De(c)})},1067851:(o,c,g,f,x)=>{t.$b("Pad",o,{mode:c,value:g,pads:f?Array.from((w(),M).subarray(Number(f)>>>0,Number(x)>>>0)):[]})},1067994:(o,c,g,f,x,E)=>{t.$b("BatchNormalization",o,{epsilon:c,momentum:g,spatial:!!x,trainingMode:!!f,format:E?"NHWC":"NCHW"})},1068163:(o,c,g,f,x,E)=>{t.$b("BatchNormalization",o,{epsilon:c,momentum:g,spatial:!!x,trainingMode:!!f,format:E?"NHWC":"NCHW"})},1068332:(o,c,g)=>{t.$b("CumSum",o,{exclusive:Number(c),reverse:Number(g)})},1068429:(o,c,g)=>{t.$b("DequantizeLinear",o,{axis:c,blockSize:g})},1068519:(o,c,g,f,x)=>{t.$b("GridSample",o,{align_corners:c,mode:De(g),padding_mode:De(f),format:x?"NHWC":"NCHW"})},1068689:(o,c,g,f,x)=>{t.$b("GridSample",o,{align_corners:c,mode:De(g),padding_mode:De(f),format:x?"NHWC":"NCHW"})},1068859:(o,c)=>{t.$b("ScatterND",o,{reduction:De(c)})},1068944:(o,c,g,f,x,E,O,B,Z)=>{t.$b("Attention",o,{numHeads:c,isUnidirectional:g,maskFilterValue:f,scale:x,doRotary:E,qkvHiddenSizes:O?Array.from((w(),M).subarray(Number(B)>>>0,Number(B)+O>>>0)):[],pastPresentShareBuffer:!!Z})},1069216:o=>{t.$b("BiasAdd",o,void 0)},1069271:o=>{t.$b("BiasSplitGelu",o,void 0)},1069332:o=>{t.$b("FastGelu",o,void 0)},1069388:(o,c,g,f,x,E,O,B,Z,Q,ce,ve,ke,Ce,Ft,ts)=>{t.$b("Conv",o,{format:ve?"NHWC":"NCHW",auto_pad:c,dilations:g?Array.from((w(),M).subarray(Number(g)>>>0,Number(f)>>>0)):[],group:x,kernel_shape:E?Array.from((w(),M).subarray(Number(E)>>>0,Number(O)>>>0)):[],pads:B?Array.from((w(),M).subarray(Number(B)>>>0,Number(Z)>>>0)):[],strides:Q?Array.from((w(),M).subarray(Number(Q)>>>0,Number(ce)>>>0)):[],w_is_const:()=>!!(w(),P)[Number(ke)>>>0],activation:De(Ce),activation_params:Ft?Array.from((w(),X).subarray(Number(Ft)>>>0,Number(ts)>>>0)):[]})},1069972:o=>{t.$b("Gelu",o,void 0)},1070024:(o,c,g,f,x,E,O,B,Z)=>{t.$b("GroupQueryAttention",o,{numHeads:c,kvNumHeads:g,scale:f,softcap:x,doRotary:E,rotaryInterleaved:O,smoothSoftmax:B,localWindowSize:Z})},1070241:(o,c,g,f)=>{t.$b("LayerNormalization",o,{axis:c,epsilon:g,simplified:!!f})},1070352:(o,c,g,f)=>{t.$b("LayerNormalization",o,{axis:c,epsilon:g,simplified:!!f})},1070463:(o,c,g,f,x,E)=>{t.$b("MatMulNBits",o,{k:c,n:g,accuracyLevel:f,bits:x,blockSize:E})},1070590:(o,c,g,f,x,E)=>{t.$b("MultiHeadAttention",o,{numHeads:c,isUnidirectional:g,maskFilterValue:f,scale:x,doRotary:E})},1070749:(o,c)=>{t.$b("QuickGelu",o,{alpha:c})},1070813:(o,c,g,f,x)=>{t.$b("RotaryEmbedding",o,{interleaved:!!c,numHeads:g,rotaryEmbeddingDim:f,scale:x})},1070952:(o,c,g)=>{t.$b("SkipLayerNormalization",o,{epsilon:c,simplified:!!g})},1071054:(o,c,g)=>{t.$b("SkipLayerNormalization",o,{epsilon:c,simplified:!!g})},1071156:(o,c,g,f)=>{t.$b("GatherBlockQuantized",o,{gatherAxis:c,quantizeAxis:g,blockSize:f})},1071277:o=>{t.Fd(o)},1071311:(o,c)=>t.Hd(Number(o),Number(c),t.Xc.Kd,t.Xc.errors)};function P0(o,c,g){return nf(async()=>{await t.Dd(Number(o),Number(c),Number(g))})}function U0(){return typeof wasmOffsetConverter<"u"}function L0(o,c,g,f){var x=me();try{return qf(o,c,g,f)}catch(E){if(he(x),E!==E+0)throw E;ye(1,0)}}function q0(o,c,g){var f=me();try{return Nf(o,c,g)}catch(x){if(he(f),x!==x+0)throw x;ye(1,0)}}function G0(o){var c=me();try{Mf(o)}catch(g){if(he(c),g!==g+0)throw g;ye(1,0)}}function W0(o,c){var g=me();try{return Jn(o,c)}catch(f){if(he(g),f!==f+0)throw f;ye(1,0)}}function V0(o,c,g){var f=me();try{Rf(o,c,g)}catch(x){if(he(f),x!==x+0)throw x;ye(1,0)}}function H0(o,c){var g=me();try{Gf(o,c)}catch(f){if(he(g),f!==f+0)throw f;ye(1,0)}}function F0(o,c,g,f,x,E,O){var B=me();try{return Uf(o,c,g,f,x,E,O)}catch(Z){if(he(B),Z!==Z+0)throw Z;ye(1,0)}}function j0(o,c,g,f,x,E){var O=me();try{Df(o,c,g,f,x,E)}catch(B){if(he(O),B!==B+0)throw B;ye(1,0)}}function K0(o,c,g,f){var x=me();try{Lf(o,c,g,f)}catch(E){if(he(x),E!==E+0)throw E;ye(1,0)}}function Z0(o,c,g,f,x){var E=me();try{Bf(o,c,g,f,x)}catch(O){if(he(E),O!==O+0)throw O;ye(1,0)}}function Y0(o,c,g,f,x,E,O){var B=me();try{Vf(o,c,g,f,x,E,O)}catch(Z){if(he(B),Z!==Z+0)throw Z;ye(1,0)}}function X0(o,c,g,f,x,E,O){var B=me();try{Hf(o,c,g,f,x,E,O)}catch(Z){if(he(B),Z!==Z+0)throw Z;ye(1,0)}}function Q0(o,c,g,f,x,E,O,B){var Z=me();try{Zf(o,c,g,f,x,E,O,B)}catch(Q){if(he(Z),Q!==Q+0)throw Q;ye(1,0)}}function J0(o,c,g,f,x){var E=me();try{return Wf(o,c,g,f,x)}catch(O){if(he(E),O!==O+0)throw O;ye(1,0)}}function eb(o,c,g){var f=me();try{return Yf(o,c,g)}catch(x){if(he(f),x!==x+0)throw x;ye(1,0)}}function tb(o,c,g,f,x,E,O,B){var Z=me();try{Xf(o,c,g,f,x,E,O,B)}catch(Q){if(he(Z),Q!==Q+0)throw Q;ye(1,0)}}function rb(o,c,g,f,x,E,O,B,Z,Q,ce,ve){var ke=me();try{Ff(o,c,g,f,x,E,O,B,Z,Q,ce,ve)}catch(Ce){if(he(ke),Ce!==Ce+0)throw Ce;ye(1,0)}}function ib(o,c,g){var f=me();try{return Qf(o,c,g)}catch(x){if(he(f),x!==x+0)throw x;return ye(1,0),0n}}function ab(o,c,g,f,x,E,O,B,Z){var Q=me();try{Pf(o,c,g,f,x,E,O,B,Z)}catch(ce){if(he(Q),ce!==ce+0)throw ce;ye(1,0)}}function nb(o){var c=me();try{return Jf(o)}catch(g){if(he(c),g!==g+0)throw g;ye(1,0)}}function sb(o,c){var g=me();try{return fm(o,c)}catch(f){if(he(g),f!==f+0)throw f;return ye(1,0),0n}}function ob(o){var c=me();try{return em(o)}catch(g){if(he(c),g!==g+0)throw g;return ye(1,0),0n}}function ub(o,c,g,f){var x=me();try{return sm(o,c,g,f)}catch(E){if(he(x),E!==E+0)throw E;ye(1,0)}}function lb(o,c,g,f,x){var E=me();try{return om(o,c,g,f,x)}catch(O){if(he(E),O!==O+0)throw O;ye(1,0)}}function db(o,c,g,f,x,E){var O=me();try{return um(o,c,g,f,x,E)}catch(B){if(he(O),B!==B+0)throw B;ye(1,0)}}function cb(o,c,g,f,x,E){var O=me();try{return jf(o,c,g,f,x,E)}catch(B){if(he(O),B!==B+0)throw B;ye(1,0)}}function pb(o,c,g,f,x,E){var O=me();try{return lm(o,c,g,f,x,E)}catch(B){if(he(O),B!==B+0)throw B;ye(1,0)}}function hb(o,c,g,f,x,E,O,B){var Z=me();try{return Kf(o,c,g,f,x,E,O,B)}catch(Q){if(he(Z),Q!==Q+0)throw Q;ye(1,0)}}function fb(o,c,g,f,x){var E=me();try{return dm(o,c,g,f,x)}catch(O){if(he(E),O!==O+0)throw O;return ye(1,0),0n}}function mb(o,c,g,f){var x=me();try{return cm(o,c,g,f)}catch(E){if(he(x),E!==E+0)throw E;ye(1,0)}}function gb(o,c,g,f){var x=me();try{return pm(o,c,g,f)}catch(E){if(he(x),E!==E+0)throw E;ye(1,0)}}function yb(o,c,g,f,x,E,O,B,Z,Q,ce,ve){var ke=me();try{return hm(o,c,g,f,x,E,O,B,Z,Q,ce,ve)}catch(Ce){if(he(ke),Ce!==Ce+0)throw Ce;ye(1,0)}}function bb(o,c,g,f,x,E,O,B,Z,Q,ce){var ve=me();try{am(o,c,g,f,x,E,O,B,Z,Q,ce)}catch(ke){if(he(ve),ke!==ke+0)throw ke;ye(1,0)}}function wb(o,c,g,f,x,E,O,B,Z,Q,ce,ve,ke,Ce,Ft,ts){var xb=me();try{nm(o,c,g,f,x,E,O,B,Z,Q,ce,ve,ke,Ce,Ft,ts)}catch(rs){if(he(xb),rs!==rs+0)throw rs;ye(1,0)}}function _b(o,c,g){var f=me();try{return tm(o,c,g)}catch(x){if(he(f),x!==x+0)throw x;ye(1,0)}}function $b(o,c,g){var f=me();try{return rm(o,c,g)}catch(x){if(he(f),x!==x+0)throw x;ye(1,0)}}function vb(o,c,g,f){var x=me();try{im(o,c,g,f)}catch(E){if(he(x),E!==E+0)throw E;ye(1,0)}}function Di(){if(0<Be)He=Di;else if(a)_==null||_(t),ee();else{for(var o=Ge;0<o.length;)o.shift()(t);0<Be?He=Di:(t.calledRun=!0,S||(ee(),_==null||_(t)))}}return a||(Rt=await qe(),Di()),t.PTR_SIZE=4,q?t:new Promise((o,c)=>{_=o,T=c})}var As,Es,Fm=L(()=>{"use strict";var e,t;As=ks,Es=(t=(e=globalThis.self)==null?void 0:e.name)==null?void 0:t.startsWith("em-pthread"),Es&&ks()}),Fi,ji,Is,Qe,Cs,Yr,zs,Os,Ki,Rs,Zi,Ms,Yi,Ds,Xi=L(()=>{"use strict";Wi(),Fi=typeof location>"u"?void 0:location.origin,ji=self.location.href>"file:"&&self.location.href<"file;",Is=()=>{if(ji){let e=URL;return new URL(new e("ort.bundle.min.mjs",self.location.href).href,Fi).href}return self.location.href},Qe=Is(),Cs=()=>{if(Qe&&!Qe.startsWith("blob:"))return Qe.substring(0,Qe.lastIndexOf("/")+1)},Yr=(e,t)=>{try{let r=t??Qe;return(r?new URL(e,r):new URL(e)).origin===Fi}catch{return!1}},zs=(e,t)=>{let r=t??Qe;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},Os=(e,t)=>`${t??"./"}${e}`,Ki=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},Rs=async e=>(await import(e)).default,Zi=(Hm(),$r(xs)).default,Ms=async()=>{if(!Qe)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Yr(Qe))return[void 0,Zi()];let e=await Ki(Qe);return[e,Zi(e)]},Yi=(Fm(),$r(Ss)).default,Ds=async(e,t,r,i)=>{let a=Yi&&!(e||t);if(a)if(Qe)a=Yr(Qe)||i&&!r;else if(i&&!r)a=!0;else throw new Error("cannot determine the script source URL.");if(a)return[void 0,Yi];{let n="ort-wasm-simd-threaded.jsep.mjs",s=e??zs(n,t),u=r&&s&&!Yr(s,t),l=u?await Ki(s):s??Os(n,t);return[u?l:void 0,await Rs(l)]}}}),Qi,Xr,Tr,Ji,Bs,Ns,Ps,ea,Ee,Qt=L(()=>{"use strict";Xi(),Xr=!1,Tr=!1,Ji=!1,Bs=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Ns=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Ps=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},ea=async e=>{if(Xr)return Promise.resolve();if(Tr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Ji)throw new Error("previous call to 'initializeWebAssembly()' failed.");Tr=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!Ps())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!Ns())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=Bs();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let a=e.wasmPaths,n=typeof a=="string"?a:void 0,s=a==null?void 0:a.mjs,u=(s==null?void 0:s.href)??s,l=a==null?void 0:a.wasm,d=(l==null?void 0:l.href)??l,h=e.wasmBinary,[p,m]=await Ds(u,n,r>1,!!h||!!d),b=!1,y=[];if(t>0&&y.push(new Promise(_=>{setTimeout(()=>{b=!0,_()},t)})),y.push(new Promise((_,T)=>{let v={numThreads:r};if(h)v.wasmBinary=h,v.locateFile=$=>$;else if(d||n)v.locateFile=$=>d??n+$;else if(u&&u.indexOf("blob:")!==0)v.locateFile=$=>new URL($,u).href;else if(p){let $=Cs();$&&(v.locateFile=k=>$+k)}m(v).then($=>{Tr=!1,Xr=!0,Qi=$,_(),p&&URL.revokeObjectURL(p)},$=>{Tr=!1,Ji=!0,T($)})})),await Promise.race(y),b)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Ee=()=>{if(Xr&&Qi)return Qi;throw new Error("WebAssembly is not initialized yet.")}}),st,Qr,Se,ta=L(()=>{"use strict";Qt(),st=(e,t)=>{let r=Ee(),i=r.lengthBytesUTF8(e)+1,a=r._malloc(i);return r.stringToUTF8(e,a,i),t.push(a),a},Qr=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([a,n])=>{let s=t?t+a:a;if(typeof n=="object")Qr(n,s+".",r,i);else if(typeof n=="string"||typeof n=="number")i(s,n.toString());else if(typeof n=="boolean")i(s,n?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof n}`)})},Se=e=>{let t=Ee(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetLastError(a,a+i);let n=Number(t.getValue(a,i===4?"i32":"i64")),s=t.getValue(a+i,"*"),u=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${n}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(r)}}}),Us,jm=L(()=>{"use strict";Qt(),ta(),Us=e=>{let t=Ee(),r=0,i=[],a=e||{};try{if((e==null?void 0:e.logSeverityLevel)===void 0)a.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if((e==null?void 0:e.logVerbosityLevel)===void 0)a.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);(e==null?void 0:e.terminate)===void 0&&(a.terminate=!1);let n=0;return(e==null?void 0:e.tag)!==void 0&&(n=st(e.tag,i)),r=t._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,n),r===0&&Se("Can't create run options."),(e==null?void 0:e.extra)!==void 0&&Qr(e.extra,"",new WeakSet,(s,u)=>{let l=st(s,i),d=st(u,i);t._OrtAddRunConfigEntry(r,l,d)!==0&&Se(`Can't set a run config entry: ${s} - ${u}.`)}),[r,i]}catch(n){throw r!==0&&t._OrtReleaseRunOptions(r),i.forEach(s=>t._free(s)),n}}}),Ls,qs,Gs,Jt,Ws,Vs,Km=L(()=>{"use strict";Qt(),ta(),Ls=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},qs=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Gs=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Jt=(e,t,r,i)=>{let a=st(t,i),n=st(r,i);Ee()._OrtAddSessionConfigEntry(e,a,n)!==0&&Se(`Can't set a session config entry: ${t} - ${r}.`)},Ws=async(e,t,r)=>{let i=t.executionProviders;for(let a of i){let n=typeof a=="string"?a:a.name,s=[];switch(n){case"webnn":if(n="WEBNN",Jt(e,"session.disable_quant_qdq","1",r),Jt(e,"session.disable_qdq_constant_folding","1",r),typeof a!="string"){let p=a==null?void 0:a.deviceType;p&&Jt(e,"deviceType",p,r)}break;case"webgpu":if(n="JS",typeof a!="string"){let p=a;if(p!=null&&p.preferredLayout){if(p.preferredLayout!=="NCHW"&&p.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${p.preferredLayout}`);Jt(e,"preferredLayout",p.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${n}`)}let u=st(n,r),l=s.length,d=0,h=0;if(l>0){d=Ee()._malloc(l*Ee().PTR_SIZE),r.push(d),h=Ee()._malloc(l*Ee().PTR_SIZE),r.push(h);for(let p=0;p<l;p++)Ee().setValue(d+p*Ee().PTR_SIZE,s[p][0],"*"),Ee().setValue(h+p*Ee().PTR_SIZE,s[p][1],"*")}await Ee()._OrtAppendExecutionProvider(e,u,d,h,l)!==0&&Se(`Can't append execution provider: ${n}.`)}},Vs=async e=>{let t=Ee(),r=0,i=[],a=e||{};Gs(a);try{let n=Ls(a.graphOptimizationLevel??"all"),s=qs(a.executionMode??"sequential"),u=typeof a.logId=="string"?st(a.logId,i):0,l=a.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let d=a.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let h=typeof a.optimizedModelFilePath=="string"?st(a.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(n,!!a.enableCpuMemArena,!!a.enableMemPattern,s,!!a.enableProfiling,0,u,l,d,h),r===0&&Se("Can't create session options."),a.executionProviders&&await Ws(r,a,i),a.enableGraphCapture!==void 0){if(typeof a.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${a.enableGraphCapture}`);Jt(r,"enableGraphCapture",a.enableGraphCapture.toString(),i)}if(a.freeDimensionOverrides)for(let[p,m]of Object.entries(a.freeDimensionOverrides)){if(typeof p!="string")throw new Error(`free dimension override name must be a string: ${p}`);if(typeof m!="number"||!Number.isInteger(m)||m<0)throw new Error(`free dimension override value must be a non-negative integer: ${m}`);let b=st(p,i);t._OrtAddFreeDimensionOverride(r,b,m)!==0&&Se(`Can't set a free dimension override: ${p} - ${m}.`)}return a.extra!==void 0&&Qr(a.extra,"",new WeakSet,(p,m)=>{Jt(r,p,m,i)}),[r,i]}catch(n){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&Se("Can't release session options."),i.forEach(s=>t._free(s)),n}}}),er,At,tr,Jr,ei,ra,ia,aa,ne=L(()=>{"use strict";er=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},At=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},tr=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((a,n)=>a*n,1);return r>0?Math.ceil(i*r):void 0},Jr=e=>{switch(e){case"float16":return typeof Float16Array<"u"?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},ei=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},ra=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",ia=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",aa=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),na,Hs=L(()=>{"use strict";Wi(),na=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let a=t.body.getReader(),n;try{n=new ArrayBuffer(i)}catch(u){if(u instanceof RangeError){let l=Math.ceil(i/65536);n=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw u}let s=0;for(;;){let{done:u,value:l}=await a.read();if(u)break;let d=l.byteLength;new Uint8Array(n,s,d).set(l),s+=d}return new Uint8Array(n,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Fs,js,Ks,Zs,sa,Ys,we,Et=L(()=>{"use strict";ne(),Fs=["V","I","W","E","F"],js=(e,t)=>{console.log(`[${Fs[e]},${new Date().toISOString()}]${t}`)},sa=(e,t)=>{Ks=e,Zs=t},Ys=(e,t)=>{let r=ei(e),i=ei(Ks);r>=i&&js(r,typeof t=="function"?t():t)},we=(...e)=>{Zs&&Ys(...e)}}),Xs,mr,D,ti,Qs,Js,eo,ue=L(()=>{"use strict";Xs=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},mr=class{static calcShape(e,t,r=!1){let i=e.length,a=t.length;if(i===0)return t;if(a===0)return e;let n=Math.max(e.length,t.length),s=new Array(n);if(r){if(i<2||a<2)return;let u=Xs.calcMatMulShape([e[i-2],e[i-1]],[t[a-2],t[a-1]]);if(u===void 0)return;[s[n-2],s[n-1]]=u}for(let u=r?3:1;u<=n;u++){let l=i-u<0?1:e[i-u],d=a-u<0?1:t[a-u];if(l!==d&&l>1&&d>1)return;let h=Math.max(l,d);if(l&&d)s[n-u]=Math.max(l,d);else{if(h>1)return;s[n-u]=0}}return s}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let a=1;a<=r;a++)if(e[r-a]!==1&&e[r-a]!==t[i-a])return!1;return!0}},D=class Bi{static size(t){return Bi.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let a=new Array(i),n=i-1;for(;n>=0;){if(t[n]%r===0){a[n]=t[n]/r;break}if(r%t[n]!==0)throw new Error("cannot convert shape");a[n]=1,r/=t[n],n--}for(n--;n>=0;n--)a[n]=t[n];return a}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Bi.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Bi.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let a=1;for(let n=r;n<i;n++){if(t[n]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");a*=Number(t[n])}return a}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let a=r-3;a>=0;--a)i[a]=i[a+1]*t[a+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((a,n)=>a+r[n]+r[n+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,a)=>i===r[a])}},ti=class jt{static adjustPoolAttributes(t,r,i,a,n,s){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=i.length?i.push(r[u+2]):i[u]=r[u+2];for(let u=0;u<i.length;u++)if(u<a.length){if(a[u]<0)throw new Error("strides should be greater than or equal to 1")}else a.push(1);for(let u=0;u<i.length;u++)if(u<n.length){if(n[u]<0)throw new Error("dilations should be greater than or equal to 1")}else n.push(1);for(let u=0;u<i.length*2;u++)if(u<s.length){if(s[u]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let u=0;u<i.length;u++){if(i[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[u]>=i[u]||s[u+i.length]>=i[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,a,n,s,u){if(u){if(n.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(a.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)jt.adjustPadAndReturnShape(t[l+(s?1:2)],r[l],i[l],a[l],n,l,l+t.length-2,u)}}static computePoolOutputShape(t,r,i,a,n,s,u,l=0){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let d=[r[0],r[1]];return jt.computeShapeHelper(t,r,d,i,a,n,s,u,l),d}static computeConvOutputShape(t,r,i,a,n,s,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],r[0]];return jt.computeShapeHelper(!1,t,l,i,a,n,s,u),l}static computeShapeHelper(t,r,i,a,n,s,u,l,d=0){if(t)for(let h=0;h<r.length-2;h++)i.push(1);else for(let h=0;h<r.length-2;h++)i.push(jt.adjustPadAndReturnShape(r[h+2],a[h],n[h],s[h],u,h,h+r.length-2,l,d))}static computeOutputSize(t,r,i,a,n){let s=Math.floor(t/r)+1;return n===1&&(s=Math.ceil(t/r)+1,(s-1)*r>=i+a&&(s-=1)),s}static adjustPadAndReturnShape(t,r,i,a,n,s,u,l,d=0){let h=i*(a-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return n[s]=0,n[u]=0,jt.computeOutputSize(t-h,r,t,0,d);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let p=(Math.floor((t+r-1)/r)-1)*r+a-t;return n[s]=Math.floor(l==="SAME_LOWER"?(p+1)/2:p/2),n[u]=p-n[s],jt.computeOutputSize(t+n[s]+n[u]-h,r,t,n[s],d)}default:throw new Error("Unsupported AutoPad type")}else return jt.computeOutputSize(t+n[s]+n[u]-h,r,t,n[s],d)}},Qs=class{static getShapeOfGemmResult(e,t,r,i,a){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let n,s,u;t?(n=e[1],s=e[0]):(n=e[0],s=e[1]);let l=-1;if(i?(u=r[0],l=1):(u=r[1],l=0),r[l]!==s)throw new Error("dimension mismatch");if(n<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(a&&!mr.isValidBroadcast(a,[n,u]))throw new Error("gemm: invalid bias shape for broadcast");return[n,u,s]}},Js=-34028234663852886e22,eo=34028234663852886e22}),oa,to=L(()=>{"use strict";ne(),oa=(e,t)=>new(Jr(t))(e)}),ua,ro,la,io,da,ao,ca,pa,ha,no,so,Zm=L(()=>{"use strict";ne(),Et(),ua=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),ro=(e,t)=>{if(t==="int32")return e;let r=ua.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let a=e.byteLength/i,n=new(Jr(t))(e.buffer,e.byteOffset,a);switch(t){case"int64":case"uint64":{let s=new Int32Array(a);for(let u=0;u<a;u++){let l=n[u];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[u]=Number(l)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&n.some(u=>u>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(n,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},la=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let a=BigInt64Array.from(i,BigInt);return new Uint8Array(a.buffer)}case"uint64":{if(i.some(n=>n<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let a=BigUint64Array.from(i,BigInt);return new Uint8Array(a.buffer)}case"int8":{if(i.some(n=>n<-128||n>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let a=Int8Array.from(i,Number);return new Uint8Array(a.buffer)}case"uint8":{if(i.some(a=>a<0||a>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(n=>n<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let a=Uint32Array.from(i,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},io=1,da=()=>io++,ao=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),ca=(e,t)=>{let r=ua.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,a)=>i*a)*r/8):0},pa=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:a,shape:n,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=a,this.tensorShape=n,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return ca(this.dataType,this.tensorShape)}destroy(){we("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=la(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return new Uint8Array(r).buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,a)=>i===r[a])}setIsDataConverted(e){this.isDataConverted=e}},ha=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let a=this.tensorManager.getMLContext(e),n=this.tensorManager.getMLOpSupportLimits(e),s;if(!(n!=null&&n.input.dataTypes.includes(t))){if(s=ao.get(t),!s||(n==null?void 0:n.input.dataTypes.includes(s)))throw new Error(`WebNN backend does not support data type: ${t}`);we("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(a,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==ca(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,u,!0,!0,s),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=ro(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else we("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){var t,r;if(this.activeUpload){let i=(t=this.wrapper)!=null&&t.isDataConverted?la(this.activeUpload,(r=this.wrapper)==null?void 0:r.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(i):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(i);return}else return i.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},no=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=da();return this.tensorTrackersById.set(e,new ha(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,a){we("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${a}}`);let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");return n.ensureTensor(e,r,i,a)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){we("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t==null?void 0:t.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let a=this.getMLContext(e),n=da(),s=new pa({sessionId:e,context:a,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(n,new ha(this,s)),this.externalTensors.add(s),n}async getCachedTensor(e,t,r,i,a,n,s){let u=this.getMLContext(e);for(let[d,h]of this.freeTensors.entries())if(h.canReuseTensor(u,t,r)){we("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}`);let p=this.freeTensors.splice(d,1)[0];return p.sessionId=e,p}we("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}}`);let l=await u.createTensor({dataType:s??t,shape:r,dimensions:r,usage:i,writable:a,readable:n});return new pa({sessionId:e,context:u,tensor:l,dataType:t,shape:r,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},so=(...e)=>new no(...e)}),Sr,oo,uo,Ym=L(()=>{"use strict";ne(),Qt(),to(),Zm(),Et(),Sr=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),oo=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((a,n)=>a===i[n]&&e[a]===t[a])},uo=class{constructor(e){this.tensorManager=so(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,sa(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){we("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){we("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)we("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>oo(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(a=>a.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){we("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,a){let n=Sr.get(r);if(!n)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,n,i,a)}async createTemporaryTensor(e,t,r){we("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=Sr.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,a,i,r,!1);let n=this.temporarySessionTensorIds.get(e);return n?n.push(a):this.temporarySessionTensorIds.set(e,[a]),a}uploadTensor(e,t){if(!Ee().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");we("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return oa(r,t)}}registerMLTensor(e,t,r,i){let a=Sr.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);let n=this.tensorManager.registerTensor(e,t,a,i);return we("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${i}} -> {tensorId: ${n}}`),n}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=Sr.get(er(t)),a=this.mlOpSupportLimitsBySessionId.get(e);return typeof i>"u"?!1:r?!!(a!=null&&a.input.dataTypes.includes(i)):!!(a!=null&&a.output.dataTypes.includes(i))}flush(){}}}),fa=L(()=>{"use strict"}),ma,ri,ii,lo,co,ga,ya,po,ho,Xm=L(()=>{"use strict";Et(),fa(),ma=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),ri=[],ii=e=>Math.ceil(Number(e)/16)*16,lo=e=>{for(let t=0;t<ri.length;t++){let r=ri[t];if(e<=r)return r}return Math.ceil(e/16)*16},co=1,ga=()=>co++,ya=async(e,t,r,i)=>{let a=ii(r),n=e.device.createBuffer({size:a,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,n,0,a),e.flush(),await n.mapAsync(GPUMapMode.READ);let u=n.getMappedRange();if(i){let l=i();return l.set(new Uint8Array(u,0,r)),l}else return new Uint8Array(u.slice(0,r))}finally{n.destroy()}},po=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of ma)ri.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,a=t.byteLength,n=ii(a),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==a)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${a}`);if(n===a&&i%4===0)this.backend.device.queue.writeBuffer(s.gpuData.buffer,0,r,i,a);else{let u=new Uint8Array(n);u.set(t),this.backend.device.queue.writeBuffer(s.gpuData.buffer,0,u,0,n)}we("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=ii(r.originalSize),n=this.backend.getCommandEncoder();this.backend.endComputePass(),n.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,a)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return we("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=ga();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),we("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),we("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=lo(e),i,a=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,n=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||n){let u=(a?this.freeBuffers:this.freeUniformBuffers).get(r);u?u.length>0?i=u.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let s={id:ga(),type:0,buffer:i};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),we("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){var t;return(t=this.storageCache.get(e))==null?void 0:t.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return we("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await ya(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=ma.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(we("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},ho=(...e)=>new po(...e)}),fo,xe,Oe=L(()=>{"use strict";fo=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},xe=e=>new fo(e)}),gr,ai,Ne,Pe,ie,Re,ba,yr,Dt,re,kr,N,te,mo,wa,go,yo,le=L(()=>{"use strict";ne(),ue(),gr=64,ai=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Ne=(e,t=1)=>{let r=ai(e,t);return typeof r=="string"?r:r[0]},Pe=(e,t=1)=>{let r=ai(e,t);return typeof r=="string"?r:r[1]},ie=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:D.computeStrides(r)})}),t},Re=e=>e%4===0?4:e%2===0?2:1,ba=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,yr=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,Dt=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,re=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,kr=(e,t,r,i,a)=>{let n=typeof r=="number",s=n?r:r.length,u=[...new Array(s).keys()],l=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,d=ai(t,a),h=typeof d=="string"?d:d[1],p=typeof d=="string"?d:d[0],m={indices:l,value:h,storage:p,tensor:t},b=q=>typeof q=="string"?q:`${q}u`,y={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},_=n?"uniforms.":"",T=`${_}${e}_shape`,v=`${_}${e}_strides`,$="";for(let q=0;q<s-1;q++)$+=`
    let dim${q} = current / ${re(v,q,s)};
    let rest${q} = current % ${re(v,q,s)};
    indices[${q}] = dim${q};
    current = rest${q};
    `;$+=`indices[${s-1}] = current;`;let k=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${m.indices} {
    var indices: ${m.indices};
    var current = offset;
    ${$}
    return indices;
  }`,A=q=>(y.offsetToIndices=!0,s<2?q:`o2i_${e}(${q})`),I=[];if(s>=2)for(let q=s-1;q>=0;q--)I.push(`${re(v,q,s)} * (indices[${q}])`);let S=s<2?"":`
  fn i2o_${e}(indices: ${m.indices}) -> u32 {
    return ${I.join("+")};
  }`,C=q=>(y.indicesToOffset=!0,s<2?q:`i2o_${e}(${q})`),w=(...q)=>s===0?"0u":`${m.indices}(${q.map(b).join(",")})`,R=(q,Y)=>s<2?`${q}`:`${re(q,Y,s)}`,P=(q,Y,ee)=>s<2?`${q}=${ee};`:`${re(q,Y,s)}=${ee};`,V={},F=(q,Y)=>{y.broadcastedIndicesToOffset=!0;let ee=`${Y.name}broadcastedIndicesTo${e}Offset`;if(ee in V)return`${ee}(${q})`;let W=[];for(let K=s-1;K>=0;K--){let qe=Y.indicesGet("outputIndices",K+Y.rank-s);W.push(`${R(v,K)} * (${qe} % ${R(T,K)})`)}return V[ee]=`fn ${ee}(outputIndices: ${Y.type.indices}) -> u32 {
             return ${W.length>0?W.join("+"):"0u"};
           }`,`${ee}(${q})`},U=(q,Y)=>(()=>{if(m.storage===m.value)return`${e}[${q}]=${Y};`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`${e}[${q}]=vec2<u32>(u32(${Y}), select(0u, 0xFFFFFFFFu, ${Y} < 0));`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`${e}[${q}]=vec2<u32>(u32(${Y}), 0u);`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`${e}[${q}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${Y}));`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),M=q=>(()=>{if(m.storage===m.value)return`${e}[${q}]`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`i32(${e}[${q}].x)`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`u32(${e}[${q}].x)`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${q}] & 0xFFu), bool(${e}[${q}] & 0xFF00u), bool(${e}[${q}] & 0xFF0000u), bool(${e}[${q}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),j=s<2?"":`
  fn get_${e}ByIndices(indices: ${m.indices}) -> ${h} {
    return ${M(`i2o_${e}(indices)`)};
  }`,X=s<2?"":(()=>{let q=u.map(ee=>`d${ee}: u32`).join(", "),Y=u.map(ee=>`d${ee}`).join(", ");return`
  fn get_${e}(${q}) -> ${h} {
    return get_${e}ByIndices(${w(Y)});
  }`})(),J=(...q)=>{if(q.length!==s)throw new Error(`indices length must be ${s}`);let Y=q.map(b).join(",");return s===0?M("0u"):s===1?M(Y[0]):(y.get=!0,y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}(${Y})`)},de=q=>s<2?M(q):(y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}ByIndices(${q})`),H=s<2?"":`
  fn set_${e}ByIndices(indices: ${m.indices}, value: ${h}) {
    ${U(`i2o_${e}(indices)`,"value")}
  }`,pe=s<2?"":(()=>{let q=u.map(ee=>`d${ee}: u32`).join(", "),Y=u.map(ee=>`d${ee}`).join(", ");return`
  fn set_${e}(${q}, value: ${h}) {
    set_${e}ByIndices(${w(Y)}, value);
  }`})();return{impl:()=>{let q=[],Y=!1;return y.offsetToIndices&&(q.push(k),Y=!0),y.indicesToOffset&&(q.push(S),Y=!0),y.broadcastedIndicesToOffset&&(Object.values(V).forEach(ee=>q.push(ee)),Y=!0),y.set&&(q.push(pe),Y=!0),y.setByIndices&&(q.push(H),Y=!0),y.get&&(q.push(X),Y=!0),y.getByIndices&&(q.push(j),Y=!0),!n&&Y&&q.unshift(`const ${T} = ${m.indices}(${r.join(",")});`,`const ${v} = ${m.indices}(${D.computeStrides(r).join(",")});`),q.join(`
`)},type:m,offsetToIndices:A,indicesToOffset:C,broadcastedIndicesToOffset:F,indices:w,indicesGet:R,indicesSet:P,set:(...q)=>{if(q.length!==s+1)throw new Error(`indices length must be ${s}`);let Y=q[s];if(typeof Y!="string")throw new Error("value must be string");let ee=q.slice(0,s).map(b).join(",");return s===0?U("0u",Y):s===1?U(ee[0],Y):(y.set=!0,y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}(${ee}, ${Y})`)},setByOffset:U,setByIndices:(q,Y)=>s<2?U(q,Y):(y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}ByIndices(${q}, ${Y});`),get:J,getByOffset:M,getByIndices:de,usage:i,name:e,strides:v,shape:T,rank:s}},N=(e,t,r,i=1)=>kr(e,t,r,"input",i),te=(e,t,r,i=1)=>kr(e,t,r,"output",i),mo=(e,t,r)=>kr(e,t,r,"atomicOutput",1),wa=(e,t,r,i=1)=>kr(e,t,r,"internal",i),go=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=gr){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,n=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${n}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let a=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${a}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},yo=(e,t)=>new go(e,t)}),bo,_a,wo,_o,$o,vo,Je,xo,To,Bt=L(()=>{"use strict";ne(),ue(),Oe(),le(),bo=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},_a=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),wo=(e,t)=>D.sortBasedOnPerm(e,_a(e.length,t)),_o=(e,t,r,i)=>{let a=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let n=0;n<t;++n)a+=`a[${e[n]}]=i[${n}];`;return a+="return a;}"},$o=(e,t)=>{let r=[],i=[];for(let a=0;a<e.length;++a)e[a]!==1&&r.push(e[a]),e[t[a]]!==1&&i.push(t[a]);return{newShape:r,newPerm:i}},vo=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},Je=(e,t)=>{let r=e.dataType,i=e.dims.length,a=_a(i,t),n=wo(e.dims,a),s=e.dims,u=n,l=i<2||vo(a,e.dims),d;if(l)return d=y=>{let _=N("input",r,s,4),T=te("output",r,u,4);return`
  ${y.registerUniform("output_size","u32").declareVariables(_,T)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let y=D.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64/4)},programUniforms:[{type:12,data:Math.ceil(y/4)}]}},getShaderSource:d};let{newShape:h,newPerm:p}=$o(e.dims,a),m=D.areEqual(p,[2,3,1]),b=D.areEqual(p,[3,1,2]);if(h.length===2||m||b){s=m?[h[0],h[1]*h[2]]:b?[h[0]*h[1],h[2]]:h,u=[s[1],s[0]];let y=16;return d=_=>{let T=N("a",r,s.length),v=te("output",r,u.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(T,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${y+1}>, ${y}>;
  ${_.mainStart([y,y,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${y} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${y}u + local_id.x;
    let input_row = workgroup_id_x * ${y}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${T.getByIndices(`${T.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${y}u + local_id.x;
    let output_row = workgroup_id_y * ${y}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=D.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/y),y:Math.ceil(u[0]/y)},programUniforms:[{type:12,data:_},...ie(s,u)]}},getShaderSource:d}}return d=y=>{let _=N("a",r,s.length),T=te("output",r,u.length);return`
  ${y.registerUniform("output_size","u32").declareVariables(_,T)}

  ${_o(a,i,_,T)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${T.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${T.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let y=D.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...ie(s,u)]}},getShaderSource:d}},xo=(e,t)=>{bo(e.inputs,t.perm),e.compute(Je(e.inputs[0],t.perm))},To=e=>xe({perm:e.perm})}),So,ko,Ao,Eo,Io,Co,zo,Oo,Ro,Mo,ot,Do,Bo,No,Po,Uo,Lo,qo,Go,Wo,Vo,Qm=L(()=>{"use strict";ne(),ue(),le(),va(),Bt(),So={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},ko={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Ao={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Eo={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Io=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},Co=(e,t)=>{let r=[],i=e.length;for(let n=0;n<i;n++)t.indexOf(n)===-1&&r.push(e[n]);let a=t.map(n=>e[n]);return[r,a]},zo=(e,t)=>{let r=e.length+t.length,i=[],a=0;for(let n=0;n<r;n++)t.indexOf(n)===-1?i.push(e[a++]):i.push(1);return i},Oo=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},Ro=(e,t)=>{let r=[];if(!Oo(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},Mo=(e,t,r,i,a,n,s)=>{let u=r[0].dims,l=D.size(n),d=D.size(s),h=N("_A",r[0].dataType,u),p=te("output",a,n),m=64;l===1&&(m=256);let b=`
          var<workgroup> aBestValues : array<f32, ${m}>;
       `,y=_=>`
        ${_.registerUniform("reduceSize","u32").declareVariables(h,p)}
        ${b}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${_.mainStart(m)}

          let outputIndex = global_idx / ${m};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Ao[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${m}) {
           let candidate = f32(${h.getByOffset("offset + k")});
           bestValue = ${So[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${m}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${ko[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${p.setByOffset("outputIndex",`${i==="mean"?`${p.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${p.type.storage}(${Eo[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${m}`,inputDependencies:["type"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:l},programUniforms:[{type:12,data:d}]})}},ot=(e,t,r,i)=>{let a=e.inputs.length===1?r:$a(e.inputs,r),n=a.axes;n.length===0&&!a.noopWithEmptyAxes&&(n=e.inputs[0].dims.map((b,y)=>y));let s=D.normalizeAxes(n,e.inputs[0].dims.length),u=s,l=e.inputs[0],d=Ro(u,e.inputs[0].dims.length);d.length>0&&(l=e.compute(Je(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],u=Io(u.length,l.dims.length));let[h,p]=Co(l.dims,u),m=h;a.keepDims&&(m=zo(h,s)),e.compute(Mo(t,a.cacheKey,[l],i,e.inputs[0].dataType,m,p),{inputs:[l]})},Do=(e,t)=>{ot(e,"ReduceMeanShared",t,"mean")},Bo=(e,t)=>{ot(e,"ReduceL1Shared",t,"l1")},No=(e,t)=>{ot(e,"ReduceL2Shared",t,"l2")},Po=(e,t)=>{ot(e,"ReduceLogSumExpShared",t,"logSumExp")},Uo=(e,t)=>{ot(e,"ReduceMaxShared",t,"max")},Lo=(e,t)=>{ot(e,"ReduceMinShared",t,"min")},qo=(e,t)=>{ot(e,"ReduceProdShared",t,"prod")},Go=(e,t)=>{ot(e,"ReduceSumShared",t,"sum")},Wo=(e,t)=>{ot(e,"ReduceSumSquareShared",t,"sumSquare")},Vo=(e,t)=>{ot(e,"ReduceLogSumShared",t,"logSum")}}),ut,Ho,ni,$a,lt,Fo,jo,Ko,Zo,Yo,Xo,Qo,Jo,eu,tu,dt,ru,iu,au,nu,su,ou,uu,lu,du,cu,va=L(()=>{"use strict";ne(),ue(),Oe(),le(),Qm(),ut=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Ho=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],ni=(e,t,r,i,a,n,s=!1,u=!1)=>{let l=[],d=r[0].dims,h=d.length,p=D.normalizeAxes(a,h),m=!u&&p.length===0;d.forEach((_,T)=>{m||p.indexOf(T)>=0?s&&l.push(1):l.push(_)});let b=l.length,y=D.size(l);return{name:e,shaderCache:t,getShaderSource:_=>{let T=[],v=N("_A",r[0].dataType,h),$=te("output",n,b),k=i(v,$,p),A=k[2];for(let I=0,S=0;I<h;I++)m||p.indexOf(I)>=0?(s&&S++,A=`for(var j${I}: u32 = 0; j${I} < ${d[I]}; j${I}++) {
                  ${k[2].includes("last_index")?`let last_index = j${I};`:""}
                  ${v.indicesSet("input_indices",I,`j${I}`)}
                  ${A}
                }`):(T.push(`${v.indicesSet("input_indices",I,$.indicesGet("output_indices",S))};`),S++);return`

        ${_.registerUniform("output_size","u32").declareVariables(v,$)}

        ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${$.offsetToIndices("global_idx")};

          ${T.join(`
`)}
          ${k[0]}       // init ops for reduce max/min
          ${k[1]}
          ${A}
          ${k[3]}
          ${k.length===4?$.setByOffset("global_idx","value"):k.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:n}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...ie(d,l)]})}},$a=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),xe({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},lt=(e,t,r,i)=>{let a=e.inputs,n=a.length===1?r:$a(a,r);e.compute(ni(t,{hint:n.cacheKey,inputDependencies:["rank"]},[a[0]],n.noopWithEmptyAxes&&n.axes.length===0?Ho:i,n.axes,a[0].dataType,n.keepDims,n.noopWithEmptyAxes),{inputs:[0]})},Fo=(e,t)=>{ut(e.inputs),lt(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},jo=(e,t)=>{ut(e.inputs),lt(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},Ko=(e,t)=>{ut(e.inputs),lt(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Zo=(e,t)=>{ut(e.inputs),lt(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},Yo=(e,t)=>{ut(e.inputs),lt(e,"ReduceMax",t,(r,i,a)=>{let n=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&n.push(r.indicesSet("input_indices",s,0));return[`${n.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},Xo=(e,t)=>{ut(e.inputs),lt(e,"ReduceMean",t,(r,i,a)=>{let n=1;for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&(n*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${n});`]})},Qo=(e,t)=>{ut(e.inputs),lt(e,"ReduceMin",t,(r,i,a)=>{let n=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&n.push(`input_indices[${s}] = 0;`);return[`${n.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},Jo=(e,t)=>{ut(e.inputs),lt(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},eu=(e,t)=>{ut(e.inputs),lt(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},tu=(e,t)=>{ut(e.inputs),lt(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},dt=(e,t,r)=>{if(t.length===0)return r;let i=1,a=1;for(let n=0;n<t.length;n++)t.indexOf(n)===-1?i*=e[n]:a*=e[n];return a<32&&i>1024},ru=(e,t)=>{dt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Xo(e,t):Do(e,t)},iu=(e,t)=>{dt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?jo(e,t):Bo(e,t)},au=(e,t)=>{dt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ko(e,t):No(e,t)},nu=(e,t)=>{dt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Zo(e,t):Po(e,t)},su=(e,t)=>{dt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Yo(e,t):Uo(e,t)},ou=(e,t)=>{dt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Qo(e,t):Lo(e,t)},uu=(e,t)=>{dt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Jo(e,t):qo(e,t)},lu=(e,t)=>{dt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?eu(e,t):Go(e,t)},du=(e,t)=>{dt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?tu(e,t):Wo(e,t)},cu=(e,t)=>{dt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Fo(e,t):Vo(e,t)}}),xa,pu,hu,Ta,Jm=L(()=>{"use strict";ne(),Oe(),va(),xa=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},pu=(e,t)=>{xa(e.inputs);let r=(i,a,n)=>{let s=[];for(let u=0;u<i.rank;u++)(n.indexOf(u)>=0||n.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(ni("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},hu=(e,t)=>{xa(e.inputs);let r=(i,a,n)=>{let s=[];for(let u=0;u<i.rank;u++)(n.indexOf(u)>=0||n.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(ni("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Ta=e=>xe(e)}),fu,si,mu,gu,yu,Ar,bu,wu,Sa=L(()=>{"use strict";ne(),ue(),fa(),le(),fu=(e,t)=>{let r=e[0],i=e[1],a=e[2],n=e[3],s=e[4],u=e[5];if(s&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],d=r.dims[1],h=r.dims[2];if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==h)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(a.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let p=a.dims[0]/3,m=p,b=m;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let k of t.qkvHiddenSizes)if(k%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");p=t.qkvHiddenSizes[0],m=t.qkvHiddenSizes[1],b=t.qkvHiddenSizes[2]}let y=d;if(p!==m)throw new Error("qkv_hidden_sizes first element should be same as the second");if(a.dims[0]!==p+m+b)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let _=0;if(s){if(m!==b)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==m/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(_=s.dims[3])}let T=y+_,v=-1,$=0;if(n)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==t.numHeads||u.dims[2]!==d||u.dims[3]!==T)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:d,pastSequenceLength:_,kvSequenceLength:y,totalSequenceLength:T,maxSequenceLength:v,inputHiddenSize:h,hiddenSize:p,vHiddenSize:b,headSize:Math.floor(p/t.numHeads),vHeadSize:Math.floor(b/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:$,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},si=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e==null?void 0:e.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,mu=(e,t,r,i,a,n,s,u)=>{let l=Re(s?1:n),d=64,h=n/l;h<d&&(d=32);let p=Math.ceil(n/l/d),m=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:a},{type:12,data:h},{type:12,data:p}],b=Ne(e.dataType,l),y=Pe(1,l),_=["type"];s&&_.push("type"),u&&_.push("type");let T=v=>{let $=te("x",e.dataType,e.dims,l),k=[$],A=s?N("seq_lens",s.dataType,s.dims):void 0;A&&k.push(A);let I=u?N("total_sequence_length_input",u.dataType,u.dims):void 0;I&&k.push(I);let S=Pe(e.dataType),C=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${v.registerUniforms(C).declareVariables(...k)}
  ${v.mainStart([d,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${si(A,I,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${y}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${y}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${d}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${y}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${y}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${d}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${$.type.value}(${S}(1.0) / ${S}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${y}(x[offset + i]);
        x[offset + i] = ${$.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${$.type.value}(${S}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${d};${b};${l}`,inputDependencies:_},getShaderSource:T,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:a,z:t*r},programUniforms:m})}},gu=(e,t,r,i,a,n,s,u,l)=>{let d=s+n.kvSequenceLength,h=[n.batchSize,n.numHeads,n.sequenceLength,d],p=e>1&&i,m=n.kvNumHeads?n.kvNumHeads:n.numHeads,b=p?[n.batchSize,m,d,n.headSize]:void 0,y=n.nReps?n.nReps:1,_=n.scale===0?1/Math.sqrt(n.headSize):n.scale,T=Re(n.headSize),v=n.headSize/T,$=12,k={x:Math.ceil(d/$),y:Math.ceil(n.sequenceLength/$),z:n.batchSize*n.numHeads},A=[{type:12,data:n.sequenceLength},{type:12,data:v},{type:12,data:d},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:1,data:_},{type:12,data:s},{type:12,data:n.kvSequenceLength},{type:12,data:y}],I=p&&i&&D.size(i.dims)>0,S=["type","type"];I&&S.push("type"),a&&S.push("type"),u&&S.push("type"),l&&S.push("type");let C=[{dims:h,dataType:t.dataType,gpuDataType:0}];p&&C.push({dims:b,dataType:t.dataType,gpuDataType:0});let w=R=>{let P=N("q",t.dataType,t.dims,T),V=N("key",r.dataType,r.dims,T),F=[P,V];if(I){let H=N("past_key",i.dataType,i.dims,T);F.push(H)}a&&F.push(N("attention_bias",a.dataType,a.dims));let U=u?N("seq_lens",u.dataType,u.dims):void 0;U&&F.push(U);let M=l?N("total_sequence_length_input",l.dataType,l.dims):void 0;M&&F.push(M);let j=te("output",t.dataType,h),X=[j];p&&X.push(te("present_key",t.dataType,b,T));let J=Pe(1,T),de=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${$}u;

  var<workgroup> tileQ: array<${P.type.storage}, ${$*$}>;
  var<workgroup> tileK: array<${P.type.storage}, ${$*$}>;
  ${R.registerUniforms(de).declareVariables(...F,...X)}
  ${R.mainStart([$,$,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${y===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${y===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${si(U,M,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${I&&p?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${p?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${J}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${I&&p?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${p?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${J}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(T){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${T}`)}})()};
        output[outputIdx] = ${j.type.value} (sum * uniforms.alpha) + ${a?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${T};${a!==void 0};${i!==void 0};${e}`,inputDependencies:S},getRunData:()=>({outputs:C,dispatchGroup:k,programUniforms:A}),getShaderSource:w}},yu=(e,t,r,i,a,n,s=void 0,u=void 0)=>{let l=n+a.kvSequenceLength,d=a.nReps?a.nReps:1,h=a.vHiddenSize*d,p=e>1&&i,m=a.kvNumHeads?a.kvNumHeads:a.numHeads,b=p?[a.batchSize,m,l,a.headSize]:void 0,y=[a.batchSize,a.sequenceLength,h],_=12,T={x:Math.ceil(a.vHeadSize/_),y:Math.ceil(a.sequenceLength/_),z:a.batchSize*a.numHeads},v=[{type:12,data:a.sequenceLength},{type:12,data:l},{type:12,data:a.vHeadSize},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:12,data:h},{type:12,data:n},{type:12,data:a.kvSequenceLength},{type:12,data:d}],$=p&&i&&D.size(i.dims)>0,k=["type","type"];$&&k.push("type"),s&&k.push("type"),u&&k.push("type");let A=[{dims:y,dataType:t.dataType,gpuDataType:0}];p&&A.push({dims:b,dataType:t.dataType,gpuDataType:0});let I=S=>{let C=N("probs",t.dataType,t.dims),w=N("v",r.dataType,r.dims),R=[C,w];$&&R.push(N("past_value",i.dataType,i.dims));let P=s?N("seq_lens",s.dataType,s.dims):void 0;s&&R.push(P);let V=u?N("total_sequence_length_input",u.dataType,u.dims):void 0;u&&R.push(V);let F=[te("output",t.dataType,y)];p&&F.push(te("present_value",t.dataType,b));let U=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;
  var<workgroup> tileQ: array<${C.type.value}, ${_*_}>;
  var<workgroup> tileV: array<${C.type.value}, ${_*_}>;
  ${S.registerUniforms(U).declareVariables(...R,...F)}
  ${S.mainStart([_,_,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${d===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${d===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${si(P,V,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${$&&p?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${p?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${C.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${$&&p?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${p?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:k},getRunData:()=>({outputs:A,dispatchGroup:T,programUniforms:v}),getShaderSource:I}},Ar=(e,t,r,i,a,n,s,u,l,d,h=void 0,p=void 0)=>{let m=Math.min(e.outputCount,1+(s?1:0)+(u?1:0)),b=m>1?s:void 0,y=m>1?u:void 0,_=m>1?d.pastSequenceLength:0,T=_+d.kvSequenceLength,v=l&&D.size(l.dims)>0?l:void 0,$=[t,r];b&&D.size(b.dims)>0&&$.push(b),v&&$.push(v),h&&$.push(h),p&&$.push(p);let k=e.compute(gu(m,t,r,b,v,d,_,h,p),{inputs:$,outputs:m>1?[-1,1]:[-1]})[0];e.compute(mu(k,d.batchSize,d.numHeads,_,d.sequenceLength,T,h,p),{inputs:h&&p?[k,h,p]:[k],outputs:[]});let A=[k,i];y&&D.size(y.dims)>0&&A.push(y),h&&A.push(h),p&&A.push(p),e.compute(yu(m,k,i,y,d,_,h,p),{inputs:A,outputs:m>1?[0,2]:[0]})},bu=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,a=t.inputHiddenSize,n=t.headSize,s=12,u={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:i},{type:12,data:a},{type:12,data:n},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],h=p=>{let m=te("output_q",l[0].dataType,r),b=te("output_k",l[0].dataType,r),y=te("output_v",l[0].dataType,r),_=N("input",l[0].dataType,l[0].dims),T=N("weight",l[1].dataType,l[1].dims),v=N("bias",l[2].dataType,l[2].dims),$=_.type.storage,k=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${$}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${$}, ${s*s}>;
  var<workgroup> tileWeightK: array<${$}, ${s*s}>;
  var<workgroup> tileWeightV: array<${$}, ${s*s}>;
  ${p.registerUniforms(k).declareVariables(_,T,v,m,b,y)}
  ${p.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${$}(0);
    var valueK = ${$}(0);
    var valueV = ${$}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:d}),getShaderSource:h},{inputs:l,outputs:[-1,-1,-1]})},wu=(e,t)=>{let r=fu(e.inputs,t),[i,a,n]=bu(e,r);return Ar(e,i,a,n,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),_u,$u,vu,xu,eg=L(()=>{"use strict";rt(),ne(),ue(),Oe(),le(),_u=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,a,n)=>{let s=a.length;if(s!==i.length)throw new Error(`${n}: num dimensions != ${s}`);a.forEach((u,l)=>{if(u!==i[l])throw new Error(`${n}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},$u=(e,t)=>{let{epsilon:r,spatial:i,format:a}=t,n=e[0].dims,s=i?Re(n[n.length-1]):1,u=a==="NHWC"&&n.length>1?s:1,l=D.size(n)/s,d=i,h=d?n.length:n,p=N("x",e[0].dataType,e[0].dims,s),m=N("scale",e[1].dataType,e[1].dims,u),b=N("bias",e[2].dataType,e[2].dims,u),y=N("inputMean",e[3].dataType,e[3].dims,u),_=N("inputVar",e[4].dataType,e[4].dims,u),T=te("y",e[0].dataType,h,s),v=()=>{let k="";if(i)k=`let cOffset = ${n.length===1?"0u":a==="NHWC"?`outputIndices[${n.length-1}] / ${s}`:"outputIndices[1]"};`;else if(a==="NCHW")k=`
            ${T.indicesSet("outputIndices","0","0")}
            let cOffset = ${T.indicesToOffset("outputIndices")};`;else{k=`var cIndices = ${m.type.indices}(0);
                       cIndices[0] = outputIndices[${n.length-1}];`;for(let A=1;A<m.rank;A++)k+=`cIndices[${A}] = outputIndices[${A}];`;k+=`let cOffset = ${m.indicesToOffset("cIndices")};`}return k},$=k=>`
  const epsilon = ${r};
  ${k.registerUniform("outputSize","u32").declareVariables(p,m,b,y,_,T)}
  ${k.mainStart()}
  ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${T.offsetToIndices(`global_idx * ${s}`)};
    ${v()}
    let scale = ${m.getByOffset("cOffset")};
    let bias = ${b.getByOffset("cOffset")};
    let inputMean = ${y.getByOffset("cOffset")};
    let inputVar = ${_.getByOffset("cOffset")};
    let x = ${p.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${T.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${s}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:$,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d?[{type:12,data:l},...ie(n)]:[{type:12,data:l}]})}},vu=e=>xe(e),xu=(e,t)=>{let{inputs:r,outputCount:i}=e,a=vu({...t,outputCount:i});if(Ae.webgpu.validateInputContent&&_u(r,a),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute($u(r,a))}}),Tu,Su,ku,tg=L(()=>{"use strict";ue(),le(),Tu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Su=e=>{let t=e[0].dims,r=e[0].dims[2],i=D.size(t)/4,a=e[0].dataType,n=N("input",a,t,4),s=N("bias",a,[r],4),u=N("residual",a,t,4),l=te("output",a,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:d=>`
  const channels = ${r}u / 4;
  ${d.declareVariables(n,s,u,l)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${n.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},ku=e=>{Tu(e.inputs),e.compute(Su(e.inputs))}}),Au,_e,Eu,Iu,Cu,zu,Ou,Ru,Mu,Du,Bu,Nu,Pu,Uu,Lu,qu,Er,Gu,oi,Wu,Vu,Hu,Fu,ju,Ku,Zu,Yu,Xu,Qu,Ju,el,tl,rl,il,al,nl,ka,sl,Aa,Ea,ol,ul,ll,dl,cl,pl,Ia=L(()=>{"use strict";ne(),ue(),Oe(),le(),Au=(e,t,r,i,a,n,s)=>{let u=Math.ceil(t/4),l="";typeof a=="string"?l=`${a}(a)`:l=a("a");let d=N("inputData",r,[u],4),h=te("outputData",i,[u],4),p=[{name:"vec_size",type:"u32"}];return s&&p.push(...s),`
      ${e.registerUniforms(p).declareVariables(d,h)}

  ${n??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${h.setByOffset("global_idx",l)}
  }`},_e=(e,t,r,i,a,n=e.dataType,s,u)=>{let l=[{type:12,data:Math.ceil(D.size(e.dims)/4)}];return s&&l.push(...s),{name:t,shaderCache:{hint:a,inputDependencies:["type"]},getShaderSource:d=>Au(d,D.size(e.dims),e.dataType,n,r,i,u),getRunData:d=>({outputs:[{dims:e.dims,dataType:n}],dispatchGroup:{x:Math.ceil(D.size(d[0].dims)/64/4)},programUniforms:l})}},Eu=e=>{e.compute(_e(e.inputs[0],"Abs","abs"))},Iu=e=>{e.compute(_e(e.inputs[0],"Acos","acos"))},Cu=e=>{e.compute(_e(e.inputs[0],"Acosh","acosh"))},zu=e=>{e.compute(_e(e.inputs[0],"Asin","asin"))},Ou=e=>{e.compute(_e(e.inputs[0],"Asinh","asinh"))},Ru=e=>{e.compute(_e(e.inputs[0],"Atan","atan"))},Mu=e=>{e.compute(_e(e.inputs[0],"Atanh","atanh"))},Du=e=>xe(e),Bu=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(_e(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Nu=e=>{let t,r,i=e.length>=2&&e[1].data!==0,a=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=a?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=a?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return xe({min:t,max:r})},Pu=(e,t)=>{let r=t||Nu(e.inputs),i=Pe(e.inputs[0].dataType);e.compute(_e(e.inputs[0],"Clip",a=>`clamp(${a}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},Uu=e=>{e.compute(_e(e.inputs[0],"Ceil","ceil"))},Lu=e=>{e.compute(_e(e.inputs[0],"Cos","cos"))},qu=e=>{e.compute(_e(e.inputs[0],"Cosh","cosh"))},Er=e=>xe(e),Gu=(e,t)=>{let r=Pe(e.inputs[0].dataType);e.compute(_e(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},oi=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,Wu=e=>{let t=Pe(e.inputs[0].dataType);e.compute(_e(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,oi(t)))},Vu=e=>{e.compute(_e(e.inputs[0],"Exp","exp"))},Hu=e=>{e.compute(_e(e.inputs[0],"Floor","floor"))},Fu=e=>{let t=Pe(e.inputs[0].dataType);e.compute(_e(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,oi(t)))},ju=(e,t)=>{let r=Pe(e.inputs[0].dataType);e.compute(_e(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},Ku=e=>{e.compute(_e(e.inputs[0],"Not",t=>`!${t}`))},Zu=e=>{e.compute(_e(e.inputs[0],"Neg",t=>`-${t}`))},Yu=e=>{e.compute(_e(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},Xu=e=>{let t=Pe(e.inputs[0].dataType);e.compute(_e(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},Qu=e=>{e.compute(_e(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Ju=e=>xe(e),el=(e,t)=>{let r=Pe(e.inputs[0].dataType);e.compute(_e(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},tl=e=>{let t=Pe(e.inputs[0].dataType);e.compute(_e(e.inputs[0],"HardSwish",r=>`${r} * max(vec4<${t}>(0.0), min(vec4<${t}>(1.0), vec4<${t}>(${t}(1.0 / 6.0)) * ${r} + vec4<${t}>(0.5)))`))},rl=e=>{e.compute(_e(e.inputs[0],"Sin","sin"))},il=e=>{e.compute(_e(e.inputs[0],"Sinh","sinh"))},al=e=>{e.compute(_e(e.inputs[0],"Sqrt","sqrt"))},nl=e=>{e.compute(_e(e.inputs[0],"Tan","tan"))},ka=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,sl=e=>{e.compute(_e(e.inputs[0],"Tanh",ka))},Aa=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${ka("v")};
}
`,Ea=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,ol=e=>{let t=Pe(e.inputs[0].dataType);e.compute(_e(e.inputs[0],"FastGelu",Ea,Aa(t),void 0,e.inputs[0].dataType))},ul=(e,t)=>{let r=Pe(e.inputs[0].dataType);return e.compute(_e(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},ll=e=>{e.compute(_e(e.inputs[0],"Log","log"))},dl=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,cl=e=>`quick_gelu_impl(${e})`,pl=(e,t)=>{let r=Pe(e.inputs[0].dataType);e.compute(_e(e.inputs[0],"QuickGelu",cl,dl(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),hl,fl,ml,rg=L(()=>{"use strict";ue(),le(),Ia(),hl=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},fl=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=N("input",e[0].dataType,e[0].dims,4),i=N("bias",e[0].dataType,[e[0].dims[2]],4),a=te("output",e[0].dataType,t,4),n=D.size(t)/4,s=Ne(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(r,i,a)}

  ${oi(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${a.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},ml=e=>{hl(e.inputs),e.compute(fl(e.inputs))}}),gl,yl,ct,bl,wl,_l,$l,vl,xl,Tl,Sl,kl,Al,ig=L(()=>{"use strict";ne(),ue(),le(),gl=(e,t,r,i,a,n,s,u,l,d,h,p)=>{let m,b;typeof u=="string"?m=b=($,k)=>`${u}((${$}),(${k}))`:typeof u=="function"?m=b=u:(m=u.scalar,b=u.vector);let y=te("outputData",h,i.length,4),_=N("aData",l,t.length,4),T=N("bData",d,r.length,4),v;if(a)if(n){let $=D.size(t)===1,k=D.size(r)===1,A=t.length>0&&t[t.length-1]%4===0,I=r.length>0&&r[r.length-1]%4===0;$||k?v=y.setByOffset("global_idx",b($?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"),k?`${T.type.value}(${T.getByOffset("0")}.x)`:T.getByOffset("global_idx"))):v=`
            let outputIndices = ${y.offsetToIndices("global_idx * 4u")};
            let offsetA = ${_.broadcastedIndicesToOffset("outputIndices",y)};
            let offsetB = ${T.broadcastedIndicesToOffset("outputIndices",y)};
            ${y.setByOffset("global_idx",b(s||A?_.getByOffset("offsetA / 4u"):`${_.type.value}(${_.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||I?T.getByOffset("offsetB / 4u"):`${T.type.value}(${T.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else v=y.setByOffset("global_idx",b(_.getByOffset("global_idx"),T.getByOffset("global_idx")));else{if(!n)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let $=(k,A,I="")=>{let S=`aData[indexA${A}][componentA${A}]`,C=`bData[indexB${A}][componentB${A}]`;return`
            let outputIndices${A} = ${y.offsetToIndices(`global_idx * 4u + ${A}u`)};
            let offsetA${A} = ${_.broadcastedIndicesToOffset(`outputIndices${A}`,y)};
            let offsetB${A} = ${T.broadcastedIndicesToOffset(`outputIndices${A}`,y)};
            let indexA${A} = offsetA${A} / 4u;
            let indexB${A} = offsetB${A} / 4u;
            let componentA${A} = offsetA${A} % 4u;
            let componentB${A} = offsetB${A} % 4u;
            ${k}[${A}] = ${I}(${m(S,C)});
          `};h===9?v=`
            var data = vec4<u32>(0);
            ${$("data",0,"u32")}
            ${$("data",1,"u32")}
            ${$("data",2,"u32")}
            ${$("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:v=`
            ${$("outputData[global_idx]",0)}
            ${$("outputData[global_idx]",1)}
            ${$("outputData[global_idx]",2)}
            ${$("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(_,T,y)}

        ${p??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`},yl=(e,t,r,i,a,n,s=r.dataType)=>{let u=r.dims.map(Number),l=i.dims.map(Number),d=!D.areEqual(u,l),h=u,p=D.size(u),m=!1,b=!1,y=[d];if(d){let _=mr.calcShape(u,l,!1);if(!_)throw new Error("Can't perform binary op on the given tensors");h=_.slice(),p=D.size(h);let T=D.size(u)===1,v=D.size(l)===1,$=u.length>0&&u[u.length-1]%4===0,k=l.length>0&&l[l.length-1]%4===0;y.push(T),y.push(v),y.push($),y.push(k);let A=1;for(let I=1;I<h.length;I++){let S=u[u.length-I],C=l[l.length-I];if(S===C)A*=S;else break}A%4===0?(b=!0,m=!0):(T||v||$||k)&&(m=!0)}else m=!0;return y.push(m),{name:e,shaderCache:{hint:t+y.map(_=>_.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:_=>gl(_,u,l,h,m,d,b,a,r.dataType,i.dataType,s,n),getRunData:()=>({outputs:[{dims:h,dataType:s}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:Math.ceil(D.size(h)/4)},...ie(u,l,h)]})}},ct=(e,t,r,i,a,n)=>{e.compute(yl(t,a??"",e.inputs[0],e.inputs[1],r,i,n))},bl=e=>{ct(e,"Add",(t,r)=>`${t}+${r}`)},wl=e=>{ct(e,"Div",(t,r)=>`${t}/${r}`)},_l=e=>{ct(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},$l=e=>{ct(e,"Mul",(t,r)=>`${t}*${r}`)},vl=e=>{let t=N("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;ct(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},xl=e=>{ct(e,"Sub",(t,r)=>`${t}-${r}`)},Tl=e=>{ct(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Sl=e=>{ct(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},kl=e=>{ct(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Al=e=>{ct(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),El,Il,Cl,zl,Ol,Rl,ag=L(()=>{"use strict";ne(),ue(),Oe(),le(),El=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],a=i.dataType,n=i.dims.length;e.forEach((s,u)=>{if(u!==r){if(s.dataType!==a)throw new Error("input tensors should be one type");if(s.dims.length!==n)throw new Error("input tensors should have the same shape");s.dims.forEach((l,d)=>{if(d!==t&&l!==i.dims[d])throw new Error("non concat dimensions must match")})}})},Il=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Cl=(e,t)=>{let r=e.length,i=[];for(let a=0;a<r;++a){let n=t.setByOffset("global_idx",e[a].getByIndices("indices"));r===1?i.push(n):a===0?i.push(`if (inputIndex == ${a}u) { ${n} }`):a===r-1?i.push(`else { ${n} }`):i.push(`else if (inputIndex == ${a}) { ${n} }`)}return i.join(`
`)},zl=(e,t,r,i)=>{let a=D.size(r),n=new Array(e.length),s=new Array(e.length),u=0,l=[],d=[],h=[{type:12,data:a}];for(let _=0;_<e.length;++_)u+=e[_].dims[t],n[_]=u,d.push(e[_].dims.length),s[_]=N(`input${_}`,i,d[_]),l.push("rank"),h.push({type:12,data:n[_]});for(let _=0;_<e.length;++_)h.push(...ie(e[_].dims));h.push(...ie(r));let p=te("output",i,r.length),m=p.indicesGet("indices",t),b=Array.from(Array(n.length).keys()).map(_=>`uniforms.sizeInConcatAxis${_}`).join(","),y=_=>`

  ${(()=>{_.registerUniform("outputSize","u32");for(let T=0;T<e.length;T++)_.registerUniform(`sizeInConcatAxis${T}`,"u32");return _.declareVariables(...s,p)})()}

  ${Il(n.length,b)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${p.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${m});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${n.length}u>(${b});
      ${m} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Cl(s,p)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:h}),getShaderSource:y}},Ol=(e,t)=>{let r=e.inputs,i=r[0].dims,a=D.normalizeAxis(t.axis,i.length);El(r,a);let n=i.slice();n[a]=r.reduce((u,l)=>u+(l.dims.length>a?l.dims[a]:0),0);let s=r.filter(u=>D.size(u.dims)>0);e.compute(zl(s,a,n,r[0].dataType),{inputs:s})},Rl=e=>xe({axis:e.axis})}),rr,ir,ar,Ca,nr=L(()=>{"use strict";ne(),ue(),rr=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},ir=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},ar=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Ca=e=>{let t=(e==null?void 0:e.activation)||"";if(t==="HardSigmoid"){let[r,i]=(e==null?void 0:e.activation_params)||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=(e==null?void 0:e.activation_params)||[Js,eo];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=(e==null?void 0:e.activation_params)||[.01];return{activation:t,alpha:r}}return{activation:t}}}),Le,Ml,za=L(()=>{"use strict";Le=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Ml=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Dl,ng=L(()=>{"use strict";Dl=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),Ir,Oa,Ra=L(()=>{"use strict";ne(),ue(),le(),nr(),Ir=(e,t,r,i,a)=>{let n=i-r;return`
      ${Array.from({length:r}).map((s,u)=>`
      if (${re(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,re(a,u+n,i))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},Oa=(e,t,r,i,a=!1,n)=>{let s=e[0].dims,u=e[1].dims,l=s[s.length-2],d=u[u.length-1],h=s[s.length-1],p=Re(d),m=Re(h),b=Re(l),y=D.size(r)/p/b,_=e.length>2,T=i?i.slice(0,-2):r.slice(0,-2),v=[D.size(T),l,d],$=[{type:12,data:y},{type:12,data:l},{type:12,data:d},{type:12,data:h}];ir(t,$),$.push(...ie(T,s,u)),_&&$.push(...ie(e[2].dims)),$.push(...ie(v));let k=A=>{let I=wa("batch_dims",e[0].dataType,T.length),S=N("a",e[0].dataType,s.length,m),C=N("b",e[1].dataType,u.length,p),w=te("output",e[0].dataType,v.length,p),R=Ne(w.type.tensor),P=rr(t,w.type.value,R),V=[S,C],F="";if(_){let j=a?p:1;V.push(N("bias",e[2].dataType,e[2].dims.length,j)),F=`${a?`value += bias[col / ${j}];`:`value += ${w.type.value}(bias[row + i]);`}`}let U=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];ar(t,U);let M=()=>{let j=`var a_data: ${S.type.value};`;for(let X=0;X<m;X++)j+=`
              let b_data${X} = b[(b_offset + (k + ${X}) * uniforms.N + col) / ${p}];`;for(let X=0;X<b;X++){j+=`a_data = a[(a_offset + (row + ${X}) * uniforms.K + k) / ${m}];`;for(let J=0;J<m;J++)j+=`
            values[${X}] = fma(${C.type.value}(a_data${m===1?"":`[${J}]`}), b_data${J}, values[${X}]);
`}return j};return`
  ${A.registerUniforms(U).registerInternalVariables(I).declareVariables(...V,w)}
  ${A.mainStart()}
    ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${p})) * ${p};
    var index1 = global_idx / (uniforms.N / ${p});
    let stride1 = uniforms.M / ${b};
    let row = (index1 % stride1) * ${b};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${I.offsetToIndices("batch")};`}

    var a_indices: ${S.type.indices};
    ${Ir("a_indices",S,S.rank-2,I.rank,"batch_indices")}
    ${S.indicesSet("a_indices",S.rank-2,0)}
    ${S.indicesSet("a_indices",S.rank-1,0)}
    let a_offset = ${S.indicesToOffset("a_indices")};

    var b_indices: ${C.type.indices};
    ${Ir("b_indices",C,C.rank-2,I.rank,"batch_indices")}
    ${C.indicesSet("b_indices",C.rank-2,0)}
    ${C.indicesSet("b_indices",C.rank-1,0)}
    let b_offset = ${C.indicesToOffset("b_indices")};
    var values: array<${w.type.value}, ${b}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${m}) {
      ${M()}
    }
    for (var i = 0u; i < ${b}u; i++) {
      var value = values[i];
      ${F}
      ${P}
      let cur_indices = ${w.type.indices}(batch, row + i, col);
      let offset = ${w.indicesToOffset("cur_indices")};
      ${w.setByOffset(`offset / ${p}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${p};${m};${b};${a}`,inputDependencies:_?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:$}),getShaderSource:k}}}),Bl,Nl,Ma,Da,Pl,Ba,Ul,ui,Na=L(()=>{"use strict";ne(),ue(),le(),nr(),Ra(),za(),Bl=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Nl=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Ma=(e,t,r="f32",i,a=!1,n=32,s=!1,u=32)=>{let l=t[1]*e[1],d=t[0]*e[0],h=a?l:n,p=a?n:l,m=h/t[0],b=n/t[1];if(!((a&&m===4&&e[1]===4||!a&&(m===3||m===4))&&h%t[0]===0&&n%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${a} is true, innerElementSize ${m} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${m} must be 3 or 4.
  tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}. tileInner ${n} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${m}<${r}>, ${h/m}>, ${p}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${d/e[0]}>, ${n}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${m};
const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${s?`${Math.ceil(u/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${b};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Bl(a,i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${m===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Nl(a,m)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Da=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Pl=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Ba=(e,t,r="f32",i,a=!1,n=32,s=!1,u=32,l=!1)=>{let d=e[1]*t[1],h=e[0]*t[0],p=a?d:n,m=a?n:d;if(!(m%t[1]===0&&p%t[0]===0&&n%t[1]===0))throw new Error(`tileAHight ${m} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}, tileInner ${n} must be divisible by workgroupSize[1]${t[1]}`);let b=m/t[1],y=p/t[0],_=n/t[1],T=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${h};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${m}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          ${Da(a,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${n}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${a?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${d};

let tileRowA = i32(localId.y) * ${b};
let tileColA = i32(localId.x) * ${y};
let tileRowB = i32(localId.y) * ${_};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${y}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Da(a,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Pl(a)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${p}>, ${m}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${h}>, ${n}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(u/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${T}
  }
`},Ul=(e,t,r,i,a=!1)=>{let[n,s,u,l]=i,d=Ne(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${Le(e,d)} {
      var value = ${Le(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${Ir("aIndices",s,s.rank-2,n.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${Le(e,d)} {
      var value = ${Le(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${Ir("bIndices",u,u.rank-2,n.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Le(e,d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${a?"bias[colIn]":`${Le(e,d)}(bias[row])`};`:""}
        ${r}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},ui=(e,t,r,i,a=!1,n)=>{let s=e[0].dims,u=e[1].dims,l=s.slice(0,-2),d=u.slice(0,-2),h=i?i.slice(0,-2):r.slice(0,-2),p=D.size(h),m=s[s.length-2],b=s[s.length-1],y=u[u.length-1],_=b%4===0&&y%4===0,T=m<=8?[4,1,1]:[4,4,1],v=[8,8,1],$=[Math.ceil(y/v[0]/T[0]),Math.ceil(m/v[1]/T[1]),Math.ceil(p/v[2]/T[2])],k=_?4:1,A=[...l,m,b/k],I=A.length,S=[...d,b,y/k],C=S.length,w=[p,m,y/k],R=[{type:6,data:m},{type:6,data:y},{type:6,data:b}];ir(t,R),R.push(...ie(h,A,S));let P=["rank","rank"],V=e.length>2;V&&(R.push(...ie(e[2].dims)),P.push("rank")),R.push(...ie(w));let F=U=>{let M=h.length,j=wa("batchDims",e[0].dataType,M,1),X=Ne(e[0].dataType),J=N("a",e[0].dataType,I,k),de=N("b",e[1].dataType,C,k),H=te("result",e[0].dataType,w.length,k),pe=[J,de];if(V){let K=a?k:1;pe.push(N("bias",e[2].dataType,e[2].dims.length,K))}let q=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];ar(t,q);let Y=Ne(H.type.tensor),ee=rr(t,H.type.value,Y),W=Ul(k,V,ee,[j,J,de,H],a);return`
  ${U.registerUniforms(q).registerInternalVariables(j).declareVariables(...pe,H)}
  ${W}
  ${_?Ma(T,v,X,j):Ba(T,v,X,j)}
                   `};return{name:"MatMul",shaderCache:{hint:`${T};${t.activation};${_};${a}`,inputDependencies:P},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:$[0],y:$[1],z:$[2]},programUniforms:R}),getShaderSource:F}}}),Ll,ql,sg=L(()=>{"use strict";ne(),Et(),le(),nr(),za(),ng(),Na(),Ll=(e,t,r,i,a=!1,n,s=4,u=4,l=4,d="f32")=>{let h=R=>{switch(R){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${R} is not supported.`)}},p=R=>{switch(R){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${R} is not supported.`)}},m=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,b=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,y=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",_=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",T=e?"row":"col",v=e?"col":"row",$=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${T} / outWidth;
    let outCol = ${T} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${Le(s,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${y} && xCol >= 0 && xCol < ${_}) {
      ${m}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${h(s)}
    }
    return resData;`,k=e?t&&i?`
    let col = colIn * ${s};
    ${$}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${$}
    }
    return ${Le(s,d)}(0.0);`:i&&r?`
    let col = colIn * ${s};
    ${$}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${$}
    }
    return ${Le(s,d)}(0.0);`,A=e?i&&r?p(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${p(u)}
    }
    return ${Le(u,d)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${p(u)}
    }
    return ${Le(u,d)}(0.0);`,I=Le(l,d),S=Le(e?s:u,d),C=Le(e?u:s,d),w=rr(n,I,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${S} {
      ${e?k:A}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e?A:k}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${I}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${b}
      ${Ml(a)}
      ${w}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},ql=(e,t,r,i,a,n,s,u,l)=>{let d=t.format==="NHWC",h=d?e[0].dims[3]:e[0].dims[1],p=r[0],m=d?r[2]:r[3],b=d?r[1]:r[2],y=d?r[3]:r[1],_=d&&(h%4===0||h%3===0)&&y%4===0,T=d?y:m*b,v=d?m*b:y,$=[8,8,1],k=i<=8?[4,1,1]:[4,4,1],A=[Math.ceil(T/$[0]/k[0]),Math.ceil(v/$[1]/k[1]),Math.ceil(p/$[2]/k[2])];we("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${A}`);let I=_?d&&h%4!==0?3:4:1,S=$[1]*k[1],C=$[0]*k[0],w=Math.max($[0]*I,$[1]),R=i%S===0,P=a%C===0,V=n%w===0,F=_?[I,4,4]:[1,1,1],U=[{type:6,data:i},{type:6,data:a},{type:6,data:n},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];ir(t,U),U.push(...ie(e[0].dims,e[1].dims));let M=["rank","rank"];s&&(U.push(...ie(e[2].dims)),M.push("rank")),U.push(...ie(r));let j=X=>{let J=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];ar(t,J);let de=_?4:1,H=Ne(e[0].dataType),pe=`
      fn setOutputAtIndex(flatIndex : i32, value : ${_?`vec4<${H}>`:H}) {
        result[flatIndex] = ${_?`vec4<${H}>`:H}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${_?`vec4<${H}>`:H}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${_?"/ 4":""}, value);
      }`,q=N("x",e[0].dataType,e[0].dims.length,I===3?1:I),Y=N("w",e[1].dataType,e[1].dims.length,de),ee=[q,Y],W=te("result",e[0].dataType,r.length,de);if(s){let K=N("bias",e[2].dataType,e[2].dims.length,de);ee.push(K),pe+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${_?`vec4<${H}>`:H} {
          return bias[coords.${d?"w":"y"}${_?"/ 4":""}];
        }`}return`
        ${Dl("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${X.registerUniforms(J).declareVariables(...ee,W)}
        ${pe}
        ${Ll(d,R,P,V,s,t,F[0],F[1],F[2],H)}
        ${_?Ma(k,$,H,void 0,!d,w):Ba(k,$,H,void 0,!d,w,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${I};${_};${R};${P};${V};${S};${C};${w}`,inputDependencies:M},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:A[0],y:A[1],z:A[2]},programUniforms:U}),getShaderSource:j}}}),Gl,Pa,Cr,Wl,Ua,Vl,Hl,Fl,og=L(()=>{"use strict";ne(),Et(),ue(),le(),nr(),za(),Gl=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Pa=e=>typeof e=="number"?[e,e,e]:e,Cr=(e,t)=>t<=1?e:e+(e-1)*(t-1),Wl=(e,t,r,i=1)=>{let a=Cr(t,i);return Math.floor((e[0]*(r-1)-r+a)/2)},Ua=(e,t,r,i,a)=>{a==null&&(a=Wl(e,t[0],i[0]));let n=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*a>=t[s]&&(n[s]=Math.trunc((e[s]-t[s]+2*a)/i[s]+1));return n},Vl=(e,t,r,i,a,n,s,u,l,d)=>{let h,p,m,b;if(e==="VALID"&&(e=0),typeof e=="number"){h={top:e,bottom:e,left:e,right:e,front:e,back:e};let y=Ua([t,r,i,1],[u,l,d],1,[a,n,s],e);p=y[0],m=y[1],b=y[2]}else if(Array.isArray(e)){if(!e.every((_,T,v)=>_===v[0]))throw Error(`Unsupported padding parameter: ${e}`);h={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let y=Ua([t,r,i,1],[u,l,d],1,[a,n,s],e[0]);p=y[0],m=y[1],b=y[2]}else if(e==="SAME_UPPER"){p=Math.ceil(t/a),m=Math.ceil(r/n),b=Math.ceil(i/s);let y=(p-1)*a+u-t,_=(m-1)*n+l-r,T=(b-1)*s+d-i,v=Math.floor(y/2),$=y-v,k=Math.floor(_/2),A=_-k,I=Math.floor(T/2),S=T-I;h={top:k,bottom:A,left:I,right:S,front:v,back:$}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:h,outDepth:p,outHeight:m,outWidth:b}},Hl=(e,t,r,i,a,n=!1,s="channelsLast")=>{let u,l,d,h,p;if(s==="channelsLast")[u,l,d,h,p]=e;else if(s==="channelsFirst")[u,p,l,d,h]=e;else throw new Error(`Unknown dataFormat ${s}`);let[m,,b,y,_]=t,[T,v,$]=Pa(r),[k,A,I]=Pa(i),S=Cr(b,k),C=Cr(y,A),w=Cr(_,I),{padInfo:R,outDepth:P,outHeight:V,outWidth:F}=Vl(a,l,d,h,T,v,$,S,C,w),U=n?m*p:m,M=[0,0,0,0,0];return s==="channelsFirst"?M=[u,U,P,V,F]:s==="channelsLast"&&(M=[u,P,V,F,U]),{batchSize:u,dataFormat:s,inDepth:l,inHeight:d,inWidth:h,inChannels:p,outDepth:P,outHeight:V,outWidth:F,outChannels:U,padInfo:R,strideDepth:T,strideHeight:v,strideWidth:$,filterDepth:b,filterHeight:y,filterWidth:_,effectiveFilterDepth:S,effectiveFilterHeight:C,effectiveFilterWidth:w,dilationDepth:k,dilationHeight:A,dilationWidth:I,inShape:e,outShape:M,filterShape:t}},Fl=(e,t,r,i,a,n)=>{let s=n==="channelsLast",u=s?e[0].dims[3]:e[0].dims[1],l=!1,d=[64,1,1],h={x:r.map(($,k)=>k)},p=[Math.ceil(Gl(h.x.map($=>r[$]))/d[0]),1,1];we("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${p}`);let m=l?s&&u%4!==0?3:4:1,b=D.size(r),y=[{type:12,data:b},{type:12,data:i},{type:12,data:a},{type:12,data:t.strides},{type:12,data:t.dilations}];ir(t,y),y.push(...ie(e[0].dims,e[1].dims));let _=["rank","rank"],T=e.length===3;T&&(y.push(...ie(e[2].dims)),_.push("rank")),y.push(...ie(r));let v=$=>{let k=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:a.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];ar(t,k);let A=l?4:1,I=Ne(e[0].dataType),S=N("x",e[0].dataType,e[0].dims.length,m===3?1:m),C=N("W",e[1].dataType,e[1].dims.length,A),w=[S,C],R=te("result",e[0].dataType,r.length,A),P="";if(T){let U=N("bias",e[2].dataType,e[2].dims.length,A);w.push(U),P+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l?`vec4<${I}>`:I} {
          return bias[${s?re("coords",4,5):re("coords",1,5)}${l?"/ 4":""}];
        }`}let V=Le(m,I),F=rr(t,V,I);return`
            ${P}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${S.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${C.getByIndices("aIndices")};
            }
          ${$.registerUniforms(k).declareVariables(...w,R)}
          ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${R.offsetToIndices("global_idx")};
              let batch = ${re("coords",0,S.rank)};
              let d2 = ${s?re("coords",S.rank-1,S.rank):re("coords",1,S.rank)};
              let xFRCCorner = vec3<u32>(${s?re("coords",1,S.rank):re("coords",2,S.rank)},
              ${s?re("coords",2,S.rank):re("coords",3,S.rank)},
              ${s?re("coords",3,S.rank):re("coords",4,S.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?re("uniforms.x_shape",1,S.rank):re("uniforms.x_shape",2,S.rank)};
              let xShapeZ = ${s?re("uniforms.x_shape",2,S.rank):re("uniforms.x_shape",3,S.rank)};
              let xShapeW = ${s?re("uniforms.x_shape",3,S.rank):re("uniforms.x_shape",4,S.rank)};
              let xShapeU = ${s?re("uniforms.x_shape",4,S.rank):re("uniforms.x_shape",1,S.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${T?"value = value + getBiasByOutputCoords(coords)":""};
              ${F}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${m};${T}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:p[0],y:p[1],z:p[2]},programUniforms:y}),getShaderSource:v}}}),jl,Kl,ug=L(()=>{"use strict";ne(),ue(),le(),nr(),jl=(e,t,r,i)=>{let a=e.length>2,n=a?"value += b[output_channel];":"",s=e[0].dims,u=e[1].dims,l=t.format==="NHWC",d=l?r[3]:r[1],h=d/t.group,p=l&&h>=4?Re(d):1,m=D.size(r)/p,b=[{type:12,data:m},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:h}];ir(t,b),b.push(...ie(s,[u[0],u[1],u[2],u[3]/p]));let y=a?["rank","rank","rank"]:["rank","rank"];b.push(...ie([r[0],r[1],r[2],r[3]/p]));let _=T=>{let v=te("output",e[0].dataType,r.length,p),$=Ne(v.type.tensor),k=rr(t,v.type.value,$),A=N("x",e[0].dataType,s.length),I=N("w",e[1].dataType,u.length,p),S=[A,I];a&&S.push(N("b",e[2].dataType,e[2].dims,p));let C=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];ar(t,C);let w=l?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${A.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${I.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${A.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${I.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${T.registerUniforms(C).declareVariables(...S,v)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${p} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${w}
    ${n}
    ${k}
    ${v.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${p}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:b}),getShaderSource:_}},Kl=(e,t,r,i)=>{let a=e.length>2,n=Re(r[3]),s=Re(r[2]),u=D.size(r)/n/s,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/n],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/n],h=[r[0],r[1],r[2],r[3]/n],p=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];ir(t,p),p.push(...ie(l,d,h));let m=(s-1)*t.strides[1]+d[1],b=y=>{let _=te("output",e[0].dataType,h.length,n),T=Ne(_.type.tensor),v=rr(t,_.type.value,T),$=N("x",e[0].dataType,l.length,n),k=N("w",e[1].dataType,d.length,n),A=[$,k];a&&A.push(N("b",e[2].dataType,e[2].dims,n));let I=a?"value += b[output_channel];":"",S=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return ar(t,S),`
  ${y.registerUniforms(S).declareVariables(...A,_)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${$.type.value}, ${m}>;
    var values: array<${_.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${m}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${$.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${$.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${k.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${I}
      ${v}
      ${_.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${n};${s};${m};${d[0]};${d[1]}`,inputDependencies:a?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:p}),getShaderSource:b}}}),Zl,li,Yl,di,La,qa,Xl,Ql,Ga,lg=L(()=>{"use strict";ue(),sg(),og(),Na(),ug(),nr(),Ra(),Bt(),Zl=(e,t,r,i,a,n)=>{let s=e[0],u=e.slice(n?1:2,n?3:4),l=u.length,d=t[0],h=t.slice(2).map((m,b)=>m+(m-1)*(r[b]-1)),p=u.map((m,b)=>m+i[b]+i[b+l]).map((m,b)=>Math.floor((m-h[b]+a[b])/a[b]));return p.splice(0,0,s),p.splice(n?3:1,0,d),p},li=[2,3,1,0],Yl=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},di=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let n=2;n<t[1].dims.length;++n)r[n-2]===0&&(r[n-2]=t[1].dims[n]);let i=e.pads.slice();ti.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let a=Object.assign({},e);return Object.assign(a,{kernelShape:r,pads:i}),a},La=e=>{let t=Ca(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],a=e.dilations,n=e.group,s=e.kernel_shape,u=e.pads,l=e.strides,d=e.w_is_const();return{autoPad:i,format:r,dilations:a,group:n,kernelShape:s,pads:u,strides:l,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},qa=(e,t,r,i)=>{let a=r.format==="NHWC",n=Zl(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,a);if(r.group!==1){let S=[t[0]];if(a){let C=e.kernelCustomData.wT??e.compute(Je(t[1],li),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=C),S.push(C)}else S.push(t[1]);t.length===3&&S.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&a&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(Kl(S,r,n,i),{inputs:S}):e.compute(jl(S,r,n,i),{inputs:S});return}let s=t.length===3,u=t[0].dims[a?1:2],l=t[0].dims[a?2:3],d=t[0].dims[a?3:1],h=t[1].dims[2],p=t[1].dims[3],m=n[a?1:2],b=n[a?2:3],y=n[a?3:1],_=a&&h===u&&p===l&&r.pads[0]===0&&r.pads[1]===0;if(_||h===1&&p===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let S=n[0],C,w,R,P=[];if(a){let U=e.kernelCustomData.wT??e.compute(Je(t[1],li),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=U),_){let M=u*l*d;C=t[0].reshape([1,S,M]),w=U.reshape([1,M,y]),R=[1,S,y]}else C=t[0].reshape([S,u*l,d]),w=U.reshape([1,d,y]),R=[S,m*b,y];P.push(C),P.push(w)}else C=t[0].reshape([S,d,u*l]),w=t[1].reshape([1,y,d]),R=[S,y,m*b],P.push(w),P.push(C);s&&P.push(t[2]);let V=R[2],F=P[0].dims[P[0].dims.length-1];V<8&&F<8?e.compute(Oa(P,r,n,R,a,i),{inputs:P}):e.compute(ui(P,r,n,R,a,i),{inputs:P});return}let T=!0,v=e.kernelCustomData.wT??e.compute(Je(t[1],li),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=v);let $=[t[0],v];s&&$.push(t[2]);let k=a?m*b:y,A=a?y:m*b,I=h*p*d;e.compute(ql($,r,n,k,A,I,s,T,i),{inputs:$})},Xl=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=[0,t.pads[0],0,t.pads[1]],n=[1].concat(t.strides),s=[1].concat(t.dilations),u=[1].concat(t.kernelShape),l=di({...t,pads:a,strides:n,dilations:s,kernelShape:u},i);qa(e,i,l,d=>r?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},Ql=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",a=di(r,t),n=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=Hl(t[0].dims,t[1].dims,r.strides,r.dilations,n,!1,i);e.compute(Fl(t,a,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],i))},Ga=(e,t)=>{if(Yl(e.inputs,t),e.inputs[0].dims.length===3)Xl(e,t);else if(e.inputs[0].dims.length===5)Ql(e,e.inputs,t);else{let r=di(t,e.inputs);qa(e,e.inputs,r)}}}),Jl,dg=L(()=>{"use strict";ne(),Et(),ue(),le(),Jl=(e,t,r)=>{let i=e.length>2,a=t.outputShape,n=t.format==="NHWC",s=t.group,u=e[1].dims,l=u[2]/s,d=u[3],h=n?Re(l):1,p=n&&d===1&&l>=4,m=p?Math.floor(l/4)*4:Math.floor(l/h)*h,b=l-m,y=n?Re(d):1,_=n?d===1?h:y:1,T=D.size(a)/y,v=[Math.ceil(T/64),1,1];we("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${v}`);let $=["rank","rank"],k=[t.strides[0],t.strides[1]],A=[t.kernelShape[n?1:2],t.kernelShape[n?2:3]],I=[t.dilations[0],t.dilations[1]],S=[A[0]+(t.dilations[0]<=1?0:(t.kernelShape[n?1:2]-1)*(t.dilations[0]-1)),A[1]+(t.dilations[1]<=1?0:(t.kernelShape[n?2:3]-1)*(t.dilations[1]-1))],C=[S[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),S[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],w=[{type:12,data:T},{type:12,data:k},{type:12,data:A},{type:12,data:I},{type:12,data:S},{type:6,data:C},{type:12,data:m},{type:12,data:l},{type:12,data:d},...ie(e[0].dims,e[1].dims)];i&&(w.push(...ie(e[2].dims)),$.push("rank")),w.push(...ie(a));let R=P=>{let V=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:k.length},{name:"filter_dims",type:"u32",length:A.length},{name:"dilations",type:"u32",length:A.length},{name:"effective_filter_dims",type:"u32",length:S.length},{name:"pads",type:"i32",length:C.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],F=Ne(e[0].dataType),U=n?1:2,M=n?2:3,j=n?3:1,X=N("W",e[1].dataType,e[1].dims.length,_),J=N("Dy",e[0].dataType,e[0].dims.length,h),de=[J,X];i&&de.push(N("bias",e[2].dataType,[a[j]].length,y));let H=te("result",e[0].dataType,a.length,y),pe=()=>{let ee="";if(p)h===4?ee+=`
        let xValue = ${J.getByOffset("x_offset")};
        let wValue = ${X.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:h===2?ee+=`
          dotProd = dotProd + dot(vec4<${F}>(${J.getByOffset("x_offset")}, ${J.getByOffset("x_offset + 1u")}), vec4<${F}>(${X.getByOffset("w_offset")}, ${X.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:h===1&&(ee+=`
          dotProd = dotProd + dot(vec4<${F}>(${J.getByOffset("x_offset")}, ${J.getByOffset("x_offset + 1u")}, ${J.getByOffset("x_offset + 2u")}, ${J.getByOffset("x_offset + 3u")}), vec4<${F}>(${X.getByOffset("w_offset")}, ${X.getByOffset("w_offset + 1u")}, ${X.getByOffset("w_offset + 2u")}, ${X.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(ee+=`
                  let xValue = ${n?J.getByOffset(`${J.indicesToOffset(`${J.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${h}`):J.get("batch","inputChannel","idyR","idyC")};
        `,h===1)ee+=`
          let w_offset = ${X.indicesToOffset(`${X.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${X.getByOffset(`w_offset / ${_}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let W=0;W<h;W++)ee+=`
            let wValue${W} = ${X.getByOffset(`${X.indicesToOffset(`${X.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${W}, wOutChannel)`)} / ${_}`)};
            dotProd = dotProd + xValue[${W}] * wValue${W};`;return ee},q=()=>{if(b===0)return"";if(!p)throw new Error(`packInputAs4 ${p} is not true.`);let ee="";if(h===1){ee+="dotProd = dotProd";for(let W=0;W<b;W++)ee+=`
            + ${J.getByOffset(`x_offset + ${W}`)} * ${X.getByOffset(`w_offset + ${W}`)}`;ee+=";"}else if(h===2){if(b!==2)throw new Error(`Invalid inputChannelsRemainder ${b}.`);ee+=`
          let xValue = ${J.getByOffset("x_offset")};
          let wValue = ${X.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return ee},Y=`
            let outputIndices = ${H.offsetToIndices(`global_idx * ${y}`)};
            let batch = ${H.indicesGet("outputIndices",0)};
            let d1 = ${H.indicesGet("outputIndices",j)};
            let r = ${H.indicesGet("outputIndices",U)};
            let c = ${H.indicesGet("outputIndices",M)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${H.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${F}(dyRCorner) + ${F}(wR)) / ${F}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${F}(uniforms.Dy_shape[${U}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${F}(dyCCorner) + ${F}(wC)) / ${F}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${F}(uniforms.Dy_shape[${M}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${p?`
                var x_offset = ${J.indicesToOffset(`${J.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${h};
                var w_offset = ${X.indicesToOffset(`${X.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${_};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${p?4:h}) {
                  ${pe()}
                  inputChannel = inputChannel + ${p?4:h};
                }
                ${q()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${y}]`:""};
            ${H.setByOffset("global_idx","value")};
          `;return`
    ${P.registerUniforms(V).declareVariables(...de,H)}
      ${P.mainStart()}
      ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${Y}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${h}${_}${y}${p}${b}`,inputDependencies:$},getRunData:()=>({dispatchGroup:{x:v[0],y:v[1],z:v[2]},outputs:[{dims:r?r(a):a,dataType:e[0].dataType}],programUniforms:w}),getShaderSource:R}}}),ed,td,rd,Wa,id,ad,Va,nd,sd,cg=L(()=>{"use strict";dg(),nr(),Bt(),ed=(e,t,r,i,a,n)=>(e-1)*t+r+(i-1)*a+1-n,td=(e,t,r,i,a)=>{let n=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=n,r[a]=e-n):t==="SAME_LOWER"&&(r[i]=e-n,r[a]=n)},rd=(e,t,r,i,a,n,s,u,l,d)=>{let h=e.length-2,p=d.length===0;l.length<h&&l.push(...Array(h-l.length).fill(0));let m=e[0],b=t[u?3:1]*a;for(let y=0,_=e.length-h-(u?1:0);y<h;++y,++_){let T=e[_],v=p?T*s[y]:d[y],$=ed(T,s[y],n[y],t[_],r[y],v);td($,i,n,y,y+h),p&&d.push(s[y]*(T-1)+l[y]+(t[_]-1)*r[y]+1-n[y]-n[y+h])}d.splice(0,0,m),d.splice(u?3:1,0,b)},Wa=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((p,m)=>p*m,1)===0){r.length=0;for(let p=2;p<t[1].dims.length;++p)r.push(t[1].dims[p])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let a=e.pads.slice(),n=e.outputShape.slice(),s=e.outputPadding.slice(),u=t[0].dims,l=e.dilations.slice();if(l.reduce((p,m)=>p+m,0)===0){let p=t[0].dims.length-2;l=new Array(p).fill(1)}let d=e.strides.slice();if(d.reduce((p,m)=>p+m,0)===0){let p=t[0].dims.length-2;d=new Array(p).fill(1)}rd(u,r,l,e.autoPad,e.group,a,d,i,s,n);let h=Object.assign({},e);return Object.assign(h,{kernelShape:r,pads:a,outputPadding:s,outputShape:n,dilations:l,strides:d}),h},id=e=>{let t=Ca(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],a=e.dilations,n=e.group??1,s=e.kernelShape,u=e.pads,l=e.strides,d=e.wIsConst(),h=e.outputPadding,p=e.outputShape;return{autoPad:i,format:r,dilations:a,group:n,kernelShape:s,outputPadding:h,outputShape:p,pads:u,strides:l,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},ad=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let a=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==a))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.reduce((s,u)=>s+u,0)>0&&t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.reduce((s,u)=>s+u,0)>0&&t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.reduce((s,u)=>s+u,0)>0&&t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.outputPadding.length!==n&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${n}D`);if(t.kernelShape.reduce((s,u)=>s+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Va=(e,t,r,i)=>{let a=e.kernelCustomData.wT??e.compute(Je(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=a);let n=[t[0],a];t.length===3&&n.push(t[2]),e.compute(Jl(n,r,i),{inputs:n})},nd=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=t.kernelShape;(a.length===0||a[0]===0)&&(a=[e.inputs[1].dims[2]]);let n=t.dilations;(n.length===0||n[0]===0)&&(n=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],s=[1].concat(s),n=[1].concat(n),a=[1].concat(a);let l=t.outputPadding;l=[0].concat(l);let d=Wa({...t,pads:u,strides:s,dilations:n,kernelShape:a,outputPadding:l},i);Va(e,i,d,h=>r?[h[0],h[2],h[3]]:[h[0],h[1],h[3]])},sd=(e,t)=>{if(ad(e.inputs,t),e.inputs[0].dims.length===3)nd(e,t);else{let r=Wa(t,e.inputs);Va(e,e.inputs,r)}}}),od,ud,ld,pg=L(()=>{"use strict";ne(),ue(),Oe(),le(),od=(e,t,r,i)=>{let a=D.size(t),n=t.length,s=N("input",e,n),u=te("output",e,n),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),d=D.normalizeAxis(l,n),h=p=>{let m=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,b=re("uniforms.input_shape","uniforms.axis",n),y=i.reverse?m+(i.exclusive?" + 1":""):"0",_=i.reverse?b:m+(i.exclusive?"":" + 1");return`
                ${p.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,u)}
                ${p.mainStart()}
                  ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${y};
                  let last : i32 = ${_};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},{type:12,data:d},...ie(t,t)]}),getShaderSource:h}},ud=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,a=e.inputs[1];e.compute(od(i,r,a,t),{inputs:[0]})},ld=e=>{let t=e.exclusive===1,r=e.reverse===1;return xe({exclusive:t,reverse:r})}}),dd,cd,pd,hd,fd,hg=L(()=>{"use strict";ne(),ue(),Oe(),le(),dd=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},cd=(e,t,r,i)=>{let a=[];a.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let n=0;n<t;++n)a.push(r.indicesSet("a",e[n],`i[${n}]`));return a.push("return a;}"),a.join(`
`)},pd=(e,t)=>{let r,i,a,n,s,u,l=t.format==="NHWC",d=t.blocksize,h=t.mode==="DCR";l?([r,i,a,n]=e.dims,s=h?[r,i,a,d,d,n/d**2]:[r,i,a,n/d**2,d,d],u=h?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,a,n]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=h?[r,d,d,n/d**2,i,a]:[r,n/d**2,d,d,i,a],u=h?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let p=e.reshape(s),m=p.dims.length,b=e.dataType,y=N("a",b,m),_=te("output",b,m),T=v=>`
  ${v.registerUniform("output_size","u32").declareVariables(y,_)}

  ${cd(u,m,y,_)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:v=>{let $=l?[r,i*d,a*d,n/d**2]:[r,n/d**2,i*d,a*d],k=D.size($),A=p.dims,I=D.sortBasedOnPerm(A,u);return{outputs:[{dims:$,dataType:v[0].dataType}],dispatchGroup:{x:Math.ceil(k/64)},programUniforms:[{type:12,data:k},...ie(A,I)]}},getShaderSource:T}},hd=(e,t)=>{dd(e.inputs),e.compute(pd(e.inputs[0],t))},fd=e=>xe({blocksize:e.blocksize,mode:e.mode,format:e.format})}),It,zr,ci,Ha,Nt,md,gd,yd,Fa,ja,Ka,bd,wd,Za,_d,$d,vd,fg=L(()=>{"use strict";ne(),ue(),Oe(),le(),It=256,zr=512,ci=2*Math.PI,Ha=e=>{let t=[],r=e;for(let i of[4,2,3,5])for(;r%i===0;)t.push(i),r/=i;return r===1?t:void 0},Nt=e=>{let t=e.toPrecision(9);return/[.eE]/.test(t)?t:`${t}.0`},md=(e,t,r,i,a)=>{let n=r/e,s=zr-i,u=d=>`smem[${s}u + base + ${d*t}u]`,l=`  for (var t = local_idx; t < ${n}u; t += ${It}u) {
`;l+=`    let twiddleIndex = t % ${t}u;
    let angleUnit = f32(twiddleIndex);
`,l+=`    var leg: array<vec2<f32>, 5>;
`;for(let d=0;d<e;d++){let h=`${i}u + t + ${d*n}u`;if(d===0)l+=`    leg[0] = smem[${h}];
`;else{let p=a*ci*d/(e*t);l+=`    { let a = ${Nt(p)} * angleUnit; leg[${d}] = cmul(smem[${h}], vec2<f32>(cos(a), sin(a))); }
`}}if(l+=`    let base = (t / ${t}u) * ${t*e}u + twiddleIndex;
`,e===2)l+=`    ${u(0)} = leg[0] + leg[1];
    ${u(1)} = leg[0] - leg[1];
`;else if(e===4){let d=a<0?"vec2<f32>(oddDiff.y, -oddDiff.x)":"vec2<f32>(-oddDiff.y, oddDiff.x)";l+=`    let evenSum = leg[0] + leg[2]; let evenDiff = leg[0] - leg[2];
`,l+=`    let oddSum = leg[1] + leg[3]; let oddDiff = leg[1] - leg[3];
`,l+=`    let oddRot = ${d};
`,l+=`    ${u(0)} = evenSum + oddSum;
    ${u(1)} = evenDiff + oddRot;
`,l+=`    ${u(2)} = evenSum - oddSum;
    ${u(3)} = evenDiff - oddRot;
`}else for(let d=0;d<e;d++){let h=["leg[0]"];for(let p=1;p<e;p++){let m=a*ci*(p*d)/e,b=Nt(Math.cos(m)),y=Nt(Math.sin(m));h.push(`vec2<f32>(leg[${p}].x*${b} - leg[${p}].y*${y}, leg[${p}].x*${y} + leg[${p}].y*${b})`)}l+=`    ${u(d)} = ${h.join(" + ")};
`}return`${l}  }
  workgroupBarrier();
`},gd=(e,t,r)=>{let i="",a=1,n=0;for(let s of e)i+=md(s,a,t,n,r),a*=s,n=zr-n;return{code:i,resultOffset:n}},yd=(e,t,r,i,a)=>{let n=e.dims,s=n.length,u=n[s-1],l=n[t],d=r&&i?(l-1)*2:l;a!==void 0&&(d=a);let h=r&&i?1:2,p=i&&!r?Math.floor(d/2)+1:d,m=n.slice();m[t]=p,m[s-1]=h;let b=1;for(let _=t+1;_<s-1;_++)b*=n[_];let y=D.size(n)/u/l;return{dataType:e.dataType,outputDims:m,length:d,signalLength:l,inner:b,batch:y,inputComponents:u,outputComponents:h,outputLength:p,inverse:r,onesided:i}},Fa=(e,t)=>[t,e.length,e.inputComponents,e.outputComponents,e.inverse,e.onesided].join(";"),ja=e=>[{type:12,data:e.batch},{type:12,data:e.signalLength},{type:12,data:e.inner},{type:12,data:e.outputLength}],Ka=(e,t,r)=>e.registerUniform("batch","u32").registerUniform("signalLength","u32").registerUniform("inner","u32").registerUniform("outputLength","u32").declareVariables(t,r),bd=e=>{let{dataType:t,length:r,inputComponents:i,outputComponents:a,inverse:n,onesided:s}=e,u=Pe(t),l=n?1:-1,d=n?1/r:1,h=Ha(r),p=m=>{let b=N("x",t,[1]),y=te("y",t,[1]),_=I=>{let S=`inBase + (${I}) * uniforms.inner * ${i}u`,C=`f32(${b.getByOffset(S)})`,w=i===2?`f32(${b.getByOffset(`${S} + 1u`)})`:"0.0";return`vec2<f32>(${C}, ${w})`},T;if(n&&s){let I=Math.floor(r/2)+1,S=r%2===0?`select(provided, provided - 1u, provided == ${I}u)`:"provided";T=`
    let provided = min(uniforms.signalLength, ${I}u);
    for (var i = local_idx; i < ${r}u; i += ${It}u) {
      if (i < provided) { smem[i] = ${_("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();
    for (var k = local_idx + 1u; k < ${S}; k += ${It}u) {
      let h = smem[k];
      smem[${r}u - k] = vec2<f32>(h.x, -h.y);
    }
    workgroupBarrier();`}else T=`
    let loadCount = min(uniforms.signalLength, ${r}u);
    for (var i = local_idx; i < ${r}u; i += ${It}u) {
      if (i < loadCount) { smem[i] = ${_("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();`;let{code:v,resultOffset:$}=gd(h,r,l),k=d===1?`smem[${$}u + i]`:`smem[${$}u + i] * ${Nt(d)}`,A=a===2?y.setByOffset("off + 1u",`${u}(v.y)`):"";return`
  ${Ka(m,b,y)}
  var<workgroup> smem: array<vec2<f32>, ${2*zr}>;
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${m.mainStart(It)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${i}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${a}u;
    ${T}
${v}    for (var i = local_idx; i < uniforms.outputLength; i += ${It}u) {
      let v = ${k};
      let off = outBase + i * uniforms.inner * ${a}u;
      ${y.setByOffset("off",`${u}(v.x)`)}
      ${A}
    }
  }`};return{name:"DFT",shaderCache:{hint:Fa(e,"fft"),inputDependencies:["type"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:ja(e),dispatchGroup:{x:e.batch}})}},wd=e=>{let{dataType:t,length:r,inputComponents:i,outputComponents:a,inverse:n,onesided:s}=e,u=Pe(t),l=n?1:-1,d=n?1/r:1,h=p=>{let m=N("x",t,[1]),b=te("y",t,[1]),y=k=>{let A=`inBase + (${k}) * uniforms.inner * ${i}u`,I=`f32(${m.getByOffset(A)})`,S=i===2?`f32(${m.getByOffset(`${A} + 1u`)})`:"0.0";return`vec2<f32>(${I}, ${S})`},_=n&&s?`fn spectrum(inBase: u32, k: u32) -> vec2<f32> {
    let provided = min(uniforms.signalLength, ${Math.floor(r/2)+1}u);
    if (k < provided) { return ${y("k")}; }
    let m = ${r}u - k;
    if (m < provided) {
      let h = ${y("m")};
      return vec2<f32>(h.x, -h.y);
    }
    return vec2<f32>(0.0, 0.0);
  }`:`fn spectrum(inBase: u32, n: u32) -> vec2<f32> {
    if (n < uniforms.signalLength) { return ${y("n")}; }
    return vec2<f32>(0.0, 0.0);
  }`,T=`
      let angle = ${Nt(l*ci)} * f32(knMod) / ${Nt(r)};
      acc += cmul(spectrum(inBase, n), vec2<f32>(cos(angle), sin(angle)));
      knMod += k;
      if (knMod >= ${r}u) { knMod -= ${r}u; }`,v=a===2?b.setByOffset("off + 1u",`${u}(v.y)`):"",$=d===1?"acc":`acc * ${Nt(d)}`;return`
  ${Ka(p,m,b)}
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${_}
  ${p.mainStart(It)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${i}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${a}u;
    for (var k = local_idx; k < uniforms.outputLength; k += ${It}u) {
      var acc = vec2<f32>(0.0, 0.0);
      var knMod = 0u;
      for (var n = 0u; n < ${r}u; n++) {${T}
      }
      let v = ${$};
      let off = outBase + k * uniforms.inner * ${a}u;
      ${b.setByOffset("off",`${u}(v.x)`)}
      ${v}
    }
  }`};return{name:"DFT",shaderCache:{hint:Fa(e,"direct"),inputDependencies:["type"]},getShaderSource:h,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:ja(e),dispatchGroup:{x:e.batch}})}},Za=e=>{if(!e||e.dataType===0)return;if(D.size(e.dims)!==1)throw new Error("DFT optional scalar inputs must have exactly 1 element.");if(e.dataType===6)return e.getInt32Array()[0];let t=Number(e.getBigInt64Array()[0]);if(!Number.isSafeInteger(t))throw new Error("DFT optional scalar inputs are out of JavaScript safe integer range.");return t},_d=e=>{if(!e||e.length<1)throw new Error("DFT requires at least 1 input.");let t=e[0].dims;if(t.length<2)throw new Error("DFT input must have at least 2 dimensions.");let r=t[t.length-1];if(r!==1&&r!==2)throw new Error("DFT input's innermost dimension must be 1 (real) or 2 (complex).")},$d=(e,t)=>{_d(e.inputs);let r=e.inputs[0],i=r.dims.length,a=t.inverse!==0,n=t.onesided!==0,s=Za(e.inputs[1]);if(s!==void 0&&s<=0)throw new Error("dft_length must be greater than zero.");let u=D.normalizeAxis(Za(e.inputs[2])??t.axis,i);if(u===i-1)throw new Error("DFT axis must refer to a signal dimension, not the innermost (real/imaginary) dimension.");if(a&&n&&r.dims[i-1]!==2)throw new Error("Inverse one-sided DFT (IRFFT) requires complex-valued input (innermost dimension 2).");let l=yd(r,u,a,n,s);if(l.length<=0)throw new Error(`Invalid DFT length: ${l.length}`);let d=l.length<=zr&&Ha(l.length)!==void 0?bd(l):wd(l);e.compute(d,{inputs:[0]})},vd=e=>xe({axis:e.axis??1,inverse:e.inverse??0,onesided:e.onesided??0})}),pi,Or,Ya,xd,Td,Sd,kd,Xa,Ad,Ed,Id,mg=L(()=>{"use strict";ne(),ue(),Oe(),le(),pi="[a-zA-Z]|\\.\\.\\.",Or="("+pi+")+",Ya="^"+Or+"$",xd="("+Or+",)*"+Or,Td="^"+xd+"$",Sd=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},kd=class{constructor(e,t){var a;this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(Td)))throw new Error("Invalid LHS term");if(r.split(",").forEach((n,s)=>{let u=e[s].dims.slice();if(!n.match(RegExp(Ya)))throw new Error("Invalid LHS term");let l=this.processTerm(n,!0,u,s);this.lhs.push(l)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([n,s])=>s.count===1||n==="...").map(([n])=>n).join("");else if(!i.match(RegExp(Or)))throw new Error("Invalid RHS");(a=i.match(RegExp(pi,"g")))==null||a.forEach(n=>{if(n==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let s=this.symbolToInfo.get(n);if(s===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(s.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let a=r.length,n=!1,s=[],u=0;if(!e.match(RegExp(Ya))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(pi,"g")),d=new Sd(i);return l==null||l.forEach((h,p)=>{if(h==="..."){if(n)throw new Error("Only one ellipsis is allowed per input term");n=!0;let m=a-l.length+1;if(m<0)throw new Error("Ellipsis out of bounds");if(s=r.slice(u,u+m),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let b=0;b<s.length;b++){let y=String.fromCharCode(48+b);d.addSymbol(y,p+b),this.addSymbol(y,r[u++],i)}}else d.addSymbol(h,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(h,r[u++],i)}),d}},Xa=e=>e+"_max",Ad=(e,t,r,i)=>{let a=e.map(d=>d.length).map((d,h)=>N(`input${h}`,t,d)),n=D.size(i),s=te("output",t,i.length),u=[...r.symbolToInfo.keys()].filter(d=>!r.rhs.symbolToIndices.has(d)),l=d=>{let h=[],p="var prod = 1.0;",m="var sum = 0.0;",b="sum += prod;",y=[],_=[],T=[],v=[],$=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((A,I)=>{var S;if(r.rhs.symbolToIndices.has(I)){let C=(S=r.rhs.symbolToIndices.get(I))==null?void 0:S[0];C!==void 0&&r.lhs.forEach((w,R)=>{if(A.inputIndices.includes(R)){let P=w.symbolToIndices.get(I);if(P===void 0)throw new Error("Invalid symbol error");P.forEach(V=>{h.push(`${a[R].indicesSet(`input${R}Indices`,V,s.indicesGet("outputIndices",C))}`)})}})}else r.lhs.forEach((C,w)=>{if(A.inputIndices.includes(w)){let R=C.symbolToIndices.get(I);if(R===void 0)throw new Error("Invalid symbol error");R.forEach(P=>{y.push(`${a[w].indicesSet(`input${w}Indices`,P,`${I}`)}`)}),v.push(`prod *= ${a[w].getByIndices(`input${w}Indices`)};`)}}),_.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${Xa(I)}; ${I}++) {`),T.push("}")});let k=$?[...h,`let sum = ${a.map((A,I)=>A.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...h,m,..._,...y,p,...v,b,...T];return`
            ${d.registerUniforms(u.map(A=>({name:`${Xa(A)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,s)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${a.map((A,I)=>`var input${I}Indices: ${a[I].type.indices};`).join(`
`)}
            ${k.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let d=u.filter(p=>r.symbolToInfo.has(p)).map(p=>{var m;return{type:12,data:((m=r.symbolToInfo.get(p))==null?void 0:m.dimValue)||0}});d.push({type:12,data:n});let h=e.map((p,m)=>[...ie(p)]).reduce((p,m)=>p.concat(m),d);return h.push(...ie(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:h}},getShaderSource:l}},Ed=(e,t)=>{let r=new kd(e.inputs,t.equation),i=r.outputDims,a=e.inputs.map((n,s)=>n.dims);e.compute(Ad(a,e.inputs[0].dataType,r,i))},Id=e=>{let t=e.equation.replace(/\s+/g,"");return xe({equation:t})}}),Cd,Qa,zd,Od,Rd,gg=L(()=>{"use strict";ne(),ue(),le(),Cd=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,a=t.length<r.length?0:t.length-r.length;for(;i<r.length&&a<t.length;++i,++a)if(r[i]!==t[a]&&r[i]!==1&&t[a]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Qa=(e,t)=>{let r=e.length-t.length,i=[];for(let a=0;a<r;++a)i.push(e[a]);for(let a=0;a<t.length;++a)i.push(t[a]===1?e[a+r]:t[a]);return i},zd=(e,t)=>e.length>t.length?Qa(e,t):Qa(t,e),Od=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=zd(t,r),a=e[0].dataType,n=a===9||D.size(t)===1,s=a===9||t.length>0&&t[t.length-1]%4===0?4:1,u=n||i.length>0&&i[i.length-1]%4===0?4:1,l=Math.ceil(D.size(i)/u),d=p=>{let m=N("input",a,t.length,s),b=te("output",a,i.length,u),y;if(a===9){let _=(T,v,$="")=>`
          let outputIndices${v} = ${b.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${m.broadcastedIndicesToOffset(`outputIndices${v}`,b)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${T}[${v}] = ${$}(${m.getByOffset(`index${v}`)}[component${v}]);
        `;y=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${_("data",0,"u32")}
        ${_("data",1,"u32")}
        ${_("data",2,"u32")}
        ${_("data",3,"u32")}
        ${b.setByOffset("global_idx","data")}
      }`}else y=`
        let outputIndices = ${b.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${m.broadcastedIndicesToOffset("outputIndices",b)};
        let data = ${b.type.value}(${m.getByOffset(`inputOffset / ${s}`)});
        ${b.setByOffset("global_idx","data")}
      }`;return`
    ${p.registerUniform("vec_size","u32").declareVariables(m,b)}
    ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${y}`},h=[{type:12,data:l},...ie(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${s}${u}`,inputDependencies:["rank"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:h})}},Rd=e=>{Cd(e.inputs),e.compute(Od(e.inputs),{inputs:[0]})}}),Md,Dd,yg=L(()=>{"use strict";ne(),ue(),le(),Ia(),Md=e=>{let t=e[0].dataType,r=D.size(e[0].dims),i=D.size(e[1].dims),a=i%4===0,n=s=>{let u=N("x",t,[1],4),l=N("bias",t,[1],4),d=te("y",t,[1],4),h=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],p=b=>`
      let bias${b}_offset: u32 = (global_idx * 4 + ${b}) % uniforms.bias_size;
      let bias${b} = ${l.getByOffset(`bias${b}_offset / 4`)}[bias${b}_offset % 4];`,m=a?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${p(0)}${p(1)}${p(2)}${p(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(h).declareVariables(u,l,d)}

    ${Aa(Pe(t))}

    ${s.mainStart(gr)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${m}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",Ea("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${a}`,inputDependencies:["type","type"]},getShaderSource:n,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/gr/4)}})}},Dd=e=>{e.inputs.length<2||D.size(e.inputs[1].dims)===0?ol(e):e.compute(Md(e.inputs))}}),Bd,Nd,Pd,Ud,bg=L(()=>{"use strict";ne(),ue(),Oe(),le(),Bd=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Nd=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,n=D.normalizeAxis(t.axis,a),s=r.slice(0);s.splice(n,1,...i);let u=r[n],l=e[0].dataType===9?4:1,d=Math.ceil(D.size(s)/l),h=[{type:12,data:d},{type:6,data:u},{type:12,data:n},...ie(e[0].dims,e[1].dims,s)],p=m=>{let b=N("data",e[0].dataType,e[0].dims.length,l),y=N("inputIndices",e[1].dataType,e[1].dims.length),_=te("output",e[0].dataType,s.length,l),T=$=>{let k=i.length,A=`var indicesIndices${$}  = ${y.type.indices}(0);`;for(let I=0;I<k;I++)A+=`${k>1?`indicesIndices${$}[${I}]`:`indicesIndices${$}`} = ${s.length>1?`outputIndices${$}[uniforms.axis + ${I}]`:`outputIndices${$}`};`;A+=`
          var idx${$} = ${y.getByIndices(`indicesIndices${$}`)};
          if (idx${$} < 0) {
            idx${$} = idx${$} + uniforms.axisDimLimit;
          }
          var dataIndices${$} : ${b.type.indices};
        `;for(let I=0,S=0;I<a;I++)I===n?(A+=`${a>1?`dataIndices${$}[${I}]`:`dataIndices${$}`} = u32(idx${$});`,S+=k):(A+=`${a>1?`dataIndices${$}[${I}]`:`dataIndices${$}`} = ${s.length>1?`outputIndices${$}[${S}]`:`outputIndices${$}`};`,S++);return A},v;if(e[0].dataType===9){let $=(k,A,I="")=>`
          let outputIndices${A} = ${_.offsetToIndices(`outputOffset + ${A}u`)};
          ${T(A)};
          let offset${A} = ${b.indicesToOffset(`dataIndices${A}`)};
          let index${A} = offset${A} / 4u;
          let component${A} = offset${A} % 4u;
          ${k}[${A}] = ${I}(${b.getByOffset(`index${A}`)}[component${A}]);
        `;v=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${$("value",0,"u32")}
        ${$("value",1,"u32")}
        ${$("value",2,"u32")}
        ${$("value",3,"u32")}
        ${_.setByOffset("global_idx","value")}
      `}else v=`
      let outputIndices = ${_.offsetToIndices("global_idx")};
      ${T("")};
      let value = ${b.getByIndices("dataIndices")};
      ${_.setByOffset("global_idx","value")};
      `;return`
      ${m.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(b,y,_)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:h}),getShaderSource:p}},Pd=e=>xe({axis:e.axis}),Ud=(e,t)=>{let r=e.inputs;Bd(r),e.compute(Nd(e.inputs,t))}}),Ld,qd,Gd,wg=L(()=>{"use strict";ne(),ue(),le(),Ld=(e,t,r,i,a,n,s,u,l)=>{let d=[{type:12,data:n},{type:12,data:i},{type:12,data:a},{type:12,data:r},{type:12,data:s},{type:12,data:u},{type:12,data:l}],h=[n];d.push(...ie(t.dims,h));let p=m=>{let b=N("indices_data",t.dataType,t.dims.length),y=te("input_slice_offsets_data",12,1,1),_=[b,y],T=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:a.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${m.registerUniforms(T).declareVariables(..._)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${a.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${a.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:h,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:d}),getShaderSource:p},{inputs:[t],outputs:[-1]})[0]},qd=(e,t)=>{let r=e.inputs,i=r[0].dims,a=r[0].dataType,n=r[1].dims,s=n[n.length-1],u=D.sizeToDimension(n,n.length-1),l=D.sizeFromDimension(i,t.batchDims+s),d=D.sizeToDimension(i,t.batchDims),h=D.sizeFromDimension(i,t.batchDims),p=u/d,m=new Array(s),b=l;for(let A=0;A<s;++A)m[s-1-A]=b,b*=i[t.batchDims+s-1-A];let y=Ld(e,r[1],m,t.batchDims,i,u,p,h,s),_=t.batchDims+s;if(_>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let T=n.slice(0,-1).concat(i.slice(_)),v=D.size(T),$=[{type:12,data:v},{type:12,data:l},...ie(r[0].dims,y.dims,T)],k=A=>{let I=N("data",r[0].dataType,r[0].dims.length),S=N("slice_offsets",12,y.dims.length),C=te("output",r[0].dataType,T.length);return`
          ${A.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(I,S,C)}
            ${A.mainStart()}
            ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:T,dataType:a}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:$}),getShaderSource:k},{inputs:[r[0],y]})},Gd=e=>({batchDims:e.batch_dims,cacheKey:""})}),Wd,Vd,Hd,Fd,_g=L(()=>{"use strict";ne(),ue(),Oe(),le(),Wd=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=D.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,a=e[0],n=e[2],s=e.length===4?e[3]:void 0;if(n.dims.length!==a.dims.length||!a.dims.map((u,l)=>l===r?Math.ceil(u/i)===n.dims[l]:u===n.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==a.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==n.dims.length||!s.dims.map((u,l)=>u===n.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Vd=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,n=D.normalizeAxis(t.gatherAxis,a),s=D.normalizeAxis(t.quantizeAxis,a),u=r.slice(0);u.splice(n,1,...i);let l=D.size(u),d=e[2].dataType,h=e[0].dataType===22,p=[{type:12,data:l},{type:12,data:s},{type:12,data:n},{type:12,data:t.blockSize},...ie(...e.map((b,y)=>b.dims),u)],m=b=>{let y=N("data",e[0].dataType,e[0].dims.length),_=N("inputIndices",e[1].dataType,e[1].dims.length),T=N("scales",e[2].dataType,e[2].dims.length),v=e.length>3?N("zeroPoint",e[3].dataType,e[3].dims.length):void 0,$=te("output",d,u.length),k=[y,_,T];v&&k.push(v);let A=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${b.registerUniforms(A).declareVariables(...k,$)}
        ${b.mainStart()}
        let output_indices = ${$.offsetToIndices("global_idx")};
        var indices_indices = ${_.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${$.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${_.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${$.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${y.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${$.indicesGet("output_indices","i")};
          ${y.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${_.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[n]};
        }
        ${y.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${$.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${y.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${y.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${y.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${T.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${T.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${T.getByIndices("scale_indices")};
        ${v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Pe(d)}(quantized_data - zero_point) * scale;
        ${$.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((b,y)=>y!==1).map(b=>b.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(b,y)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:d}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:m}},Hd=(e,t)=>{let r=e.inputs;Wd(r,t),e.compute(Vd(e.inputs,t))},Fd=e=>xe({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),jd,Kd,Zd,Yd,$g=L(()=>{"use strict";ne(),ue(),Oe(),le(),jd=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Kd=(e,t)=>{let r=e[0].dims,i=e[0].dataType,a=r.length,n=e[1].dims,s=e[1].dataType,u=D.normalizeAxis(t.axis,a),l=r[u],d=n.slice(0),h=D.size(d),p=N("input",i,a),m=N("indicesInput",s,n.length),b=te("output",i,d.length),y=[{type:12,data:h},{type:6,data:l},{type:12,data:u}];return y.push(...ie(r,n,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:y}),getShaderSource:_=>`
      ${_.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(p,m,b)}
      ${_.mainStart()}
      ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${b.offsetToIndices("global_idx")};

      var idx = ${m.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${p.type.indices}(outputIndices);
      ${p.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${p.getByIndices("inputIndices")};

      ${b.setByOffset("global_idx","value")};
  }`}},Zd=e=>xe({axis:e.axis}),Yd=(e,t)=>{let r=e.inputs;jd(r),e.compute(Kd(e.inputs,t))}}),Xd,Qd,Jd,ec,vg=L(()=>{"use strict";ne(),ue(),le(),Xd=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Qd=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[a,n,s]=Qs.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),u=[a,n];if(!u)throw new Error("Can't use gemm on the given tensors");let l=16,d=Math.ceil(n/l),h=Math.ceil(a/l),p=!0,m=D.size(u),b=[{type:12,data:p?d:m},{type:12,data:a},{type:12,data:n},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],y=["type","type"];e.length===3&&(b.push(...ie(e[2].dims)),y.push("rank")),b.push(...ie(u));let _=v=>{let $="";t.transA&&t.transB?$="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?$="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?$="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&($="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let k=t.alpha===1?"":"value *= uniforms.alpha;",A=N("a",e[0].dataType,e[0].dims),I=N("b",e[1].dataType,e[1].dims),S=A.type.value,C=null,w=[A,I];e.length===3&&(C=N("c",e[2].dataType,e[2].dims.length),w.push(C));let R=te("output",e[0].dataType,u.length);w.push(R);let P=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${v.registerUniforms(P).declareVariables(...w)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${S}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${$}
    }

    ${k}
    ${C!=null?`let cOffset = ${C.broadcastedIndicesToOffset("vec2(m, n)",R)}; value += ${S}(uniforms.beta) * ${C.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},T=v=>{let $=N("a",e[0].dataType,e[0].dims),k=N("b",e[1].dataType,e[1].dims),A=null,I=[$,k];e.length===3&&(A=N("c",e[2].dataType,e[2].dims.length),I.push(A));let S=te("output",e[0].dataType,u.length);I.push(S);let C=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],w="",R="";t.transA&&t.transB?(R=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,w="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(R=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,w="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(R=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,w="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(R=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,w="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let P=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${v.registerUniforms(C).declareVariables(...I)}
  var<workgroup> tile_a: array<array<${$.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${k.type.storage}, ${l}>, ${l}>;
  ${v.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${S.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${R}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${w}
      }
      workgroupBarrier();
    }

    ${P}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${A!=null?`let cOffset = ${A.broadcastedIndicesToOffset("vec2(m, n)",S)}; value += ${S.type.value}(uniforms.beta) * ${A.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return p?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:d*h},programUniforms:b}),getShaderSource:T}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:b}),getShaderSource:_}},Jd=e=>{let t=e.transA,r=e.transB,i=e.alpha,a=e.beta;return{transA:t,transB:r,alpha:i,beta:a,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},ec=(e,t)=>{Xd(e.inputs),e.compute(Qd(e.inputs,t))}}),mt,Ct,sr,or,tc,rc,ic,ac,nc,sc,oc,uc,lc,dc,xg=L(()=>{"use strict";ne(),ue(),Oe(),le(),[mt,Ct,sr,or]=[0,1,2,3],tc=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},rc=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,ic=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,ac=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,nc=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,sc=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${mt}] = batch;
     indices[${Ct}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${sr}] = u32(r);
            indices[${or}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${sr}] = u32(clamp(r, 0, H - 1));
          indices[${or}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${sr}] = gs_reflect(r, border[1], border[3]);
          indices[${or}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,oc=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${mt}], indices[${Ct}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${mt}], indices[${Ct}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${mt}], indices[${Ct}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${mt}], indices[${Ct}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${mt}], indices[${Ct}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${mt}], indices[${Ct}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,uc=(e,t)=>{let r=N("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],a=N("grid",e[1].dataType,i.length,2),n=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(n=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[mt,Ct,sr,or]=[0,3,1,2]);let s=te("output",e[0].dataType,n.length),u=r.type.value,l=D.size(n),d=[{type:12,data:l},...ie(e[0].dims,i,n)],h=p=>`
  ${p.registerUniform("output_size","u32").declareVariables(r,a,s)}
  ${rc}
  ${ic(u)}
  ${ac(t)}
  ${nc(t)}
  ${sc(r,u,t)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${sr}]);
      let W_in = i32(uniforms.x_shape[${or}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${mt}], indices[${sr}], indices[${or}]);
      let nxy = ${a.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${oc(s,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:p=>{let m=D.size(n);return{outputs:[{dims:n,dataType:p[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:d}},getShaderSource:h}},lc=(e,t)=>{tc(e.inputs),e.compute(uc(e.inputs,t))},dc=e=>xe({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),je,cc,pc,Ja,hc,Rr,fc,mc=L(()=>{"use strict";ne(),ue(),Oe(),fa(),Sa(),le(),Bt(),je=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,cc=(e,t)=>{let r=e[0],i=je(e,1),a=je(e,2),n=je(e,3),s=je(e,4),u=je(e,5),l=je(e,6),d=je(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let h=r.dims[0],p=r.dims[1],m=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],b=p,y=0,_=0,T=Math.floor(m/t.numHeads);if(l&&d&&D.size(l.dims)&&D.size(d.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==h||l.dims[1]!==t.numHeads||l.dims[3]!==T)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==h||d.dims[1]!==t.numHeads||d.dims[3]!==T)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=l.dims[2],_=l.dims[2]}else if(l&&D.size(l.dims)||d&&D.size(d.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(i&&D.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');v=2,b=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==T)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,b=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==T)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,b=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}if(n&&D.size(n.dims)>0){if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let $=y+b,k=0;if(s&&D.size(s.dims)>0){k=8;let C=s.dims;throw C.length===1?C[0]===h?k=1:C[0]===3*h+2&&(k=3):C.length===2&&C[0]===h&&C[1]===$&&(k=5),k===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let A=!1,I=m;if(a&&D.size(a.dims)>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(b!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=a.dims[2]}else{if(b!==a.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');I=a.dims[1]*a.dims[3],A=!0}}let S=!1;if(s&&D.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(u&&D.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==h||u.dims[1]!==t.numHeads||u.dims[2]!==p||u.dims[3]!==$)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:h,sequenceLength:p,pastSequenceLength:y,kvSequenceLength:b,totalSequenceLength:$,maxSequenceLength:_,inputHiddenSize:0,hiddenSize:m,vHiddenSize:I,headSize:T,vHeadSize:Math.floor(I/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:k,scale:t.scale,broadcastResPosBias:S,passPastInKv:A,qkvFormat:v}},pc=e=>xe({...e}),Ja=xe({perm:[0,2,1,3]}),hc=(e,t,r,i,a,n,s)=>{let u=[i,a,n],l=D.size(u),d=[{type:12,data:l},{type:12,data:s},{type:12,data:n}],h=p=>{let m=te("qkv_with_bias",t.dataType,u),b=N("qkv",t.dataType,u),y=N("bias",r.dataType,u),_=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${p.registerUniforms(_).declareVariables(b,y,m)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:h},{inputs:[t,r],outputs:[-1]})[0]},Rr=(e,t,r,i,a,n,s,u)=>{let l=n;if(s&&D.size(s.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=hc(e,n,s,t,i,r*a,u),l=l.reshape([t,i,r,a]),r===1||i===1?l:e.compute(Je(l,Ja.perm),{inputs:[l],outputs:[-1]})[0]}else return n.dims.length===3&&(l=n.reshape([t,i,r,a])),r===1||i===1?l:e.compute(Je(l,Ja.perm),{inputs:[l],outputs:[-1]})[0]},fc=(e,t)=>{let r=cc(e.inputs,t),i=e.inputs[0],a=je(e.inputs,1),n=je(e.inputs,2),s=je(e.inputs,3),u=je(e.inputs,4),l=je(e.inputs,5),d=je(e.inputs,6),h=je(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if((a==null?void 0:a.dims.length)===5)throw new Error("Packed KV is not implemented");let p=a&&n&&a.dims.length===4&&n.dims.length===4,m=Rr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,s,0);if(p)return Ar(e,m,a,n,u,void 0,d,h,l,r);if(!a||!n)throw new Error("key and value must be provided");let b=Rr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,a,s,r.hiddenSize),y=Rr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,n,s,2*r.hiddenSize);Ar(e,m,b,y,u,void 0,d,h,l,r)}}),gc,yc,bc,wc,en,_c,$c,vc=L(()=>{"use strict";ne(),ue(),Oe(),le(),gc=e=>{if(!e||e.length<1)throw new Error("too few inputs")},yc=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(a=>r.push(Number(a))),i=r.length),xe({numOutputs:i,axis:t.axis,splitSizes:r})},bc=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${re("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,wc=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let a=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(a):i===0?r.push(`if (output_number == ${i}u) { ${a} }`):i===t-1?r.push(`else { ${a} }`):r.push(`else if (output_number == ${i}) { ${a} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},en=(e,t)=>{let r=e[0].dims,i=D.size(r),a=e[0].dataType,n=D.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),u=N("input",a,r.length),l=new Array(t.numOutputs),d=[],h=[],p=0,m=[{type:12,data:i}];for(let y=0;y<t.numOutputs;y++){p+=t.splitSizes[y],l[y]=p;let _=r.slice();_[n]=t.splitSizes[y],h.push(_),s[y]=te(`output${y}`,a,_.length),d.push({dims:h[y],dataType:e[0].dataType})}m.push({type:12,data:l},...ie(r,...h));let b=y=>`
  ${y.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(u,...s)}
  ${bc(l.length)}
  ${wc(s)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",n)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${re("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${u.indicesSet("indices",n,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:m})}},_c=(e,t)=>{gc(e.inputs);let r=e.inputs.length===1?t:yc(e.inputs,t);e.compute(en(e.inputs,r),{inputs:[0]})},$c=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return xe({axis:t,numOutputs:i,splitSizes:r})}}),xc,hi,Tc,Sc=L(()=>{"use strict";ne(),ue(),Oe(),le(),xc=(e,t)=>{let[r,i,a,n]=e,{numHeads:s,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!D.areEqual(i.dims,[])&&!D.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(!D.areEqual(a.dims,n.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],d=r.dims[r.dims.length-2],h=a.dims[0],p=D.sizeFromDimension(r.dims,1)/d,m=u===0?a.dims[1]*2:p/s;if(u>m)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(l!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(d!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(d>h)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(m/2!==a.dims[1]&&u/2!==a.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`)},hi=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:a,scale:n}=t,s=e[0].dims[0],u=D.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],d=u/l,h=e[2].dims[1],p=a===0?h*2:d/i,m=new Array(s,l,d/p,p-h),b=D.computeStrides(m),y=[{type:1,data:n},{type:12,data:m},{type:12,data:b},...e[0].dims.length===3?new Array({type:12,data:[u,d,p,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,p,l*p,1]}):[],...ie(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],_=T=>{let v=N("input",e[0].dataType,e[0].dims.length),$=N("position_ids",e[1].dataType,e[1].dims.length),k=N("cos_cache",e[2].dataType,e[2].dims.length),A=N("sin_cache",e[3].dataType,e[3].dims.length),I=te("output",e[0].dataType,e[0].dims.length);return T.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:m.length},{name:"global_strides",type:"u32",length:b.length},{name:"input_output_strides",type:"u32",length:b.length}]),`
        ${T.declareVariables(v,$,k,A,I)}

        ${T.mainStart(gr)}
          let half_rotary_emb_dim = uniforms.${k.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${$.broadcastedIndicesToOffset("bsnh.xy",te("",$.type.tensor,2))};
            let position_id =
                u32(${$.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${v.getByOffset("i")} * ${k.get("position_id","bsnh[3]")} -
                ${v.getByOffset("j")} * ${A.get("position_id","bsnh[3]")};
            ${I.setByOffset("i","re")}
            let im = ${v.getByOffset("i")} * ${A.get("position_id","bsnh[3]")} +
                ${v.getByOffset("j")} * ${k.get("position_id","bsnh[3]")};
            ${I.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${I.setByOffset("k",v.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:xe({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(D.size(m)/gr)},programUniforms:y})}},Tc=(e,t)=>{xc(e.inputs,t),e.compute(hi(e.inputs,t))}}),kc,Ac,tn,Ec,Ic,Tg=L(()=>{"use strict";Oe(),ne(),Sa(),mc(),vc(),Bt(),Sc(),le(),kc=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],a=e[2],n=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,l=r.dims[0],d=r.dims[1],h=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],p=d,m=0,b=!i||i.dims.length===0,y=Math.floor(b?h/(t.numHeads+2*t.kvNumHeads):h/t.numHeads);b&&(h=y*t.numHeads);let _=n&&n.dims.length!==0,T=s&&s.dims.length!==0;if(_&&n.dims.length===4&&n.dims[0]===l&&n.dims[1]!==t.kvNumHeads&&n.dims[2]===t.kvNumHeads&&n.dims[3]===y)throw new Error("BSNH pastKey/pastValue is not supported");if(_&&T){if(n.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=n.dims[2]}else if(_||T)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');p=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');p=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');p=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let $=0,k=!1,A=t.kvNumHeads?y*t.kvNumHeads:h;if(a&&a.dims.length>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(p!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');A=a.dims[2]}else{if(p!==a.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');A=a.dims[1]*a.dims[3],k=!0}}let I=e.length>4?e[5]:void 0;if(I){if(I.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let S=I.dims.reduce((C,w)=>C*w,1);if(S!==l)throw new Error(`seqlens_k must have batch_size (${l}) elements, got ${S}.`);for(let C=0;C<I.dims.length;C++)if(I.dims[C]!==1&&I.dims[C]!==l)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${l}), got dims[${C}] = ${I.dims[C]}.`)}return{batchSize:l,sequenceLength:d,pastSequenceLength:m,kvSequenceLength:p,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:h,vHiddenSize:A,headSize:y,vHeadSize:Math.floor(A/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:$,scale:t.scale,broadcastResPosBias:!1,passPastInKv:k,qkvFormat:v}},Ac=xe({perm:[0,2,1,3]}),tn=(e,t,r)=>{let i=t,a=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,a,r.headSize]),i=e.compute(Je(i,Ac.perm),{inputs:[i],outputs:[-1]})[0]),i},Ec=(e,t,r,i)=>{let a=7,n=["type","type"],s=[e*t],u=e*t,l=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],d=h=>{let p=N("seq_lens",r.dataType,r.dims),m=N("total_seq_lens",i.dataType,i.dims),b=te("pos_ids",a,s),y=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${h.registerUniforms(y).declareVariables(p,m,b)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${m.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${p.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${b.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${b.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${b.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:n},getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:d}},Ic=(e,t)=>{var A;if(e.inputs.length>14&&e.inputs[14]||e.inputs.length>15&&e.inputs[15])throw new Error("GroupQueryAttention (JSEP): q_norm_weight / k_norm_weight inputs are not supported. The per-head Q/K RMS normalization prologue is implemented only on the CUDA and native WebGPU EPs.");let r=kc(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(((A=e.inputs[1])==null?void 0:A.dims.length)===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],a=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,n=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,h=r.kvNumHeads?r.kvNumHeads:r.numHeads,p=xe({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,h*r.headSize,h*r.headSize]}),[m,b,y]=!a&&!n?e.compute(en([i],p),{inputs:[i],outputs:[-1,-1,-1]}):[i,a,n],_,T;if(t.doRotary){let I=e.compute(Ec(r.batchSize,r.sequenceLength,l,d),{inputs:[l,d],outputs:[-1]})[0],S=e.inputs[7],C=e.inputs[8],w=xe({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),R=[m,I,S,C],P=[-1];_=e.compute(hi(R,w),{inputs:R,outputs:P})[0],R.splice(0,1,b);let V=xe({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});T=e.compute(hi(R,V),{inputs:R,outputs:P})[0]}let v=Rr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?_:m,void 0,0),$=tn(e,t.doRotary?T:b,r),k=tn(e,y,r);Ar(e,v,$,k,void 0,void 0,s,u,void 0,r,l,d)}}),rn,Cc,zc,Oc,Sg=L(()=>{"use strict";ne(),ue(),Bt(),le(),rn=(e,t,r,i,a,n,s,u)=>{let l=Re(n),d=l===1?"f32":`vec${l}f`,h=l===1?"vec2f":`mat2x${l}f`,p=a*s,m=64;p===1&&(m=256);let b=[a,s,n/l],y=[a,s,2],_=["rank","type","type"],T=[];T.push(...ie(b,y));let v=$=>{let k=N("x",t.dataType,3,l),A=N("scale",r.dataType,r.dims),I=N("bias",i.dataType,i.dims),S=te("output",1,3,2),C=[k,A,I,S];return`
  var<workgroup> workgroup_shared : array<${h}, ${m}>;
  const workgroup_size = ${m}u;
  ${$.declareVariables(...C)}
  ${$.mainStart(m)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${k.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${h}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Dt("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${Dt("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${u};${m}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:y,dataType:1}],dispatchGroup:{x:p},programUniforms:T}),getShaderSource:v},{inputs:[t,r,i],outputs:[-1]})[0]},Cc=(e,t,r)=>{let i=t[0].dims,a=i,n=2,s=i[0],u=i[1],l=D.sizeFromDimension(i,n),d=Re(l),h=D.size(a)/d,p=rn(e,t[0],t[1],t[2],s,l,u,r.epsilon),m=[s,u,l/d],b=[s,u],y=["type","none"],_=T=>{let v=N("x",t[0].dataType,m.length,d),$=N("scale_shift",1,b.length,2),k=te("output",t[0].dataType,m.length,d),A=[v,$,k];return`
  ${T.registerUniform("output_size","u32").declareVariables(...A)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${k.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${$.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${k.type.value}(scale_shift.x) + ${k.type.value}(scale_shift.y);
      ${k.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},...ie(m,b,m)]}),getShaderSource:_},{inputs:[t[0],p]})},zc=(e,t,r)=>{let i=t[0].dims,a=i,n=i[0],s=i[i.length-1],u=D.sizeFromDimension(i,1)/s,l=Re(s),d=D.size(a)/l,h=[{type:12,data:u},{type:12,data:Math.floor(s/l)}],p=["type","type"],m=!1,b=[0,i.length-1];for(let v=0;v<i.length-2;v++)m=m||i[v+1]!==1,b.push(v+1);m=m&&i[i.length-1]!==1;let y=m?e.compute(Je(e.inputs[0],b),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},(v,$)=>i[b[$]])),_=rn(e,y,t[1],t[2],n,u,s,r.epsilon),T=v=>{let $=Ne(t[0].dataType),k=l===1?"vec2f":`mat${l}x2f`,A=C=>{let w=C===0?"x":"y",R=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${$}(${R}(scale.${w}))`;case 2:return`vec2<${$}>(${R}(scale[0].${w}, scale[1].${w}))`;case 4:return`vec4<${$}>(${R}(scale[0].${w}, scale[1].${w}, scale[2].${w}, scale[3].${w}))`;default:throw new Error(`Not supported compoents ${l}`)}},I=N("input",t[0].dataType,t[0].dims,l),S=te("output",t[0].dataType,a,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${I.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${k}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${S.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${A(0)}, ${A(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:h}),getShaderSource:T},{inputs:[t[0],_]})},Oc=(e,t)=>{t.format==="NHWC"?zc(e,e.inputs,t):Cc(e,e.inputs,t)}}),Rc,Mc,Dc,kg=L(()=>{"use strict";ne(),ue(),le(),Rc=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Mc=(e,t,r)=>{let i=t.simplified,a=e[0].dims,n=e[1],s=!i&&e[2],u=a,l=D.normalizeAxis(t.axis,a.length),d=D.sizeToDimension(a,l),h=D.sizeFromDimension(a,l),p=D.size(n.dims),m=s?D.size(s.dims):0;if(p!==h||s&&m!==h)throw new Error(`Size of X.shape()[axis:] == ${h}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${p} and bias size of ${m}`);let b=[];for(let I=0;I<a.length;++I)I<l?b.push(a[I]):b.push(1);let y=Re(h),_=["type","type"],T=[{type:12,data:d},{type:1,data:h},{type:12,data:Math.floor(h/y)},{type:1,data:t.epsilon}];s&&_.push("type");let v=r>1,$=r>2,k=I=>{let S=Ne(e[0].dataType),C=[N("x",e[0].dataType,e[0].dims,y),N("scale",n.dataType,n.dims,y)];s&&C.push(N("bias",s.dataType,s.dims,y)),C.push(te("output",e[0].dataType,u,y)),v&&C.push(te("mean_data_output",1,b)),$&&C.push(te("inv_std_output",1,b));let w=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${I.registerUniforms(w).declareVariables(...C)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${ba("f32",y)};
    var mean_square_vector = ${ba("f32",y)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${yr(S,y,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Dt("mean_vector",y)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Dt("mean_square_vector",y)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${yr(S,y,"x[j + offset]")};
      let f32scale = ${yr(S,y,"scale[j]")};
      output[j + offset] = ${C[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${yr(S,y,"bias[j]")}`:""}
      );
    }

    ${v?"mean_data_output[global_idx] = mean":""};
    ${$?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},A=[{dims:u,dataType:e[0].dataType}];return v&&A.push({dims:b,dataType:1}),$&&A.push({dims:b,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${y};${r};${i}`,inputDependencies:_},getRunData:()=>({outputs:A,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:T}),getShaderSource:k}},Dc=(e,t)=>{Rc(e.inputs),e.compute(Mc(e.inputs,t,e.outputCount))}}),Bc,Nc,Ag=L(()=>{"use strict";ue(),Ra(),Na(),Bc=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Nc=e=>{Bc(e.inputs);let t=mr.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(Oa(e.inputs,{activation:""},t));else{let a=t[t.length-2],n=D.size(e.inputs[0].dims.slice(0,-2)),s=D.size(e.inputs[1].dims.slice(0,-2));if(n!==1&&a===1&&s===1){let u=e.inputs[0].reshape([1,n,i]),l=e.inputs[1].reshape([1,i,r]),d=[1,n,r],h=[u,l];e.compute(ui(h,{activation:""},t,d),{inputs:h})}else e.compute(ui(e.inputs,{activation:""},t))}}}),Pc,Uc,Lc,qc,Gc,Eg=L(()=>{"use strict";ne(),ue(),Oe(),le(),Pc=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let a=Math.floor((t.k+t.blockSize-1)/t.blockSize),n=t.blockSize/8*t.bits,s=e[1];if(!D.areEqual(s.dims,[t.n,a,n]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(D.size(u)!==t.n*a)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,d=t.n*(t.bits===8?a:Math.floor((a*t.bits+7)/8));if(D.size(l)!==d)throw new Error("zeroPoints input size error.")}},Uc=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],n=t.k,s=t.n,u=r.slice(0,i-2),l=D.size(u),d=e[1].dims[2]/4,h=e[0].dataType,p=Re(t.k),m=Re(d),b=Re(s),y=u.concat([a,s]),_=a>1&&s/b%2===0?2:1,T=D.size(y)/b/_,v=64,$=[],k=[l,a,n/p],A=D.convertShape(e[1].dims).slice();A.splice(-1,1,d/m),$.push(...ie(k)),$.push(...ie(A)),$.push(...ie(e[2].dims)),e.length===4&&$.push(...ie(D.convertShape(e[3].dims)));let I=[l,a,s/b];$.push(...ie(I));let S=C=>{let w=k.length,R=N("a",e[0].dataType,w,p),P=N("b",12,A.length,m),V=N("scales",e[2].dataType,e[2].dims.length),F=[R,P,V],U=e.length===4?N("zero_points",12,e[3].dims.length):void 0;U&&F.push(U);let M=I.length,j=te("output",e[0].dataType,M,b),X=Ne(e[0].dataType),J=(()=>{switch(p){case 1:return`array<${X}, 8>`;case 2:return`mat4x2<${X}>`;case 4:return`mat2x4<${X}>`;default:throw new Error(`${p}-component is not supported.`)}})(),de=Math.floor(32/t.bits),H=Math.floor(de/8),pe=()=>{let ee="";for(let W=0;W<H;W++){let K=W*t.bits*4,qe=K+t.bits;ee+=`
          // reuse a data (pass ${W})
            var input_offset${W>0?W:""} = ${W===0?R.indicesToOffset(`${R.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${W>0?W:""}: ${J};
            for (var j${W>0?W:""}: u32 = 0; j${W>0?W:""} < ${8/p}; j${W>0?W:""}++) {
              a_data${W>0?W:""}[j${W>0?W:""}] = ${R.getByOffset(`input_offset${W>0?W:""}`)};
              input_offset${W>0?W:""}++;
            }
          `;for(let be=0;be<b*_;be++)ee+=`
            b_value = ${m===1?`b${be}_data`:`b${be}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${W*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${K}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${qe}u) & b_mask);`}
            b_quantized_values = ${J}(${Array.from({length:4},(ze,Ge)=>`${X}(b_value_lower[${Ge}]), ${X}(b_value_upper[${Ge}])`).join(", ")});
            b_dequantized_values = ${p===1?`${J}(${Array.from({length:8},(ze,Ge)=>`(b_quantized_values[${Ge}] - ${U?`zero_point${be}`:"zero_point"}) * scale${be}`).join(", ")});`:`(b_quantized_values - ${J}(${Array(8).fill(`${U?`zero_point${be}`:"zero_point"}`).join(",")})) * scale${be};`};
            workgroup_shared[local_id.x * ${_} + ${Math.floor(be/b)}]${b>1?`[${be%b}]`:""} += ${Array.from({length:8/p},(ze,Ge)=>`${p===1?`a_data${W>0?W:""}[${Ge}] * b_dequantized_values[${Ge}]`:`dot(a_data${W>0?W:""}[${Ge}], b_dequantized_values[${Ge}])`}`).join(" + ")};
          `}return ee},q=()=>{let ee=`
            var col_index = col * ${b};
            ${U?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${X}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            `;for(let W=0;W<b*_;W++)ee+=`
            let scale${W} = ${V.getByOffset("col_index * nBlocksPerCol + block")};
            ${U?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${U.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${W} = ${X}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return ee},Y=()=>{let ee=`col_index = col * ${b};`;for(let W=0;W<b*_;W++)ee+=`
            let b${W}_data = ${P.getByIndices(`${P.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return ee+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${J};
            var b_dequantized_values: ${J};`,ee};return`
        var<workgroup> workgroup_shared: array<${j.type.value}, ${_*v}>;
        ${C.declareVariables(...F,j)}
        ${C.mainStart([v,1,1])}
          let output_indices = ${j.offsetToIndices(`(global_idx / ${v}) * ${_}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/p};
            ${q()}
            for (var word: u32 = 0; word < ${d}; word += ${m}) {
              ${Y()}
              for (var i: u32 = 0; i < ${m}; i++) {
                ${pe()}
                word_offset += ${de/p};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${_}) {
            var output_value: ${j.type.value} = ${j.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${_};
            }
            ${j.setByIndices(`${j.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${p};${m};${b};${_};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:h}],dispatchGroup:{x:T},programUniforms:$}),getShaderSource:S}},Lc=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],n=t.k,s=t.n,u=r.slice(0,i-2),l=D.size(u),d=e[1].dims[2]/4,h=e[0].dataType,p=Re(t.k),m=Re(d),b=u.concat([a,s]),y=128,_=s%8===0?8:s%4===0?4:1,T=y/_,v=Math.floor(32/t.bits),$=T*m*v,k=$/p,A=$/t.blockSize,I=D.size(b)/_,S=[],C=[l,a,n/p],w=D.convertShape(e[1].dims).slice();w.splice(-1,1,d/m),S.push(...ie(C)),S.push(...ie(w)),S.push(...ie(e[2].dims)),e.length===4&&S.push(...ie(D.convertShape(e[3].dims)));let R=[l,a,s];S.push(...ie(R));let P=V=>{let F=C.length,U=N("a",e[0].dataType,F,p),M=N("b",12,w.length,m),j=N("scales",e[2].dataType,e[2].dims.length),X=[U,M,j],J=e.length===4?N("zero_points",12,e[3].dims.length):void 0;J&&X.push(J);let de=R.length,H=te("output",e[0].dataType,de),pe=Ne(e[0].dataType),q=()=>{switch(p){case 1:return`
          let a_data0 = vec4<${pe}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${pe}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${pe}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${pe}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${p}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${U.type.value}, ${k}>;
        var<workgroup> inter_results: array<array<${H.type.value}, ${T}>, ${_}>;
        ${V.declareVariables(...X,H)}
        ${V.mainStart([T,_,1])}
          let output_indices = ${H.offsetToIndices(`workgroup_index * ${_}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${A} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${k};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${k}; a_offset += ${y})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${U.getByIndices(`${U.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${U.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${A} + local_id.x;
            ${J?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${J.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${pe}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${pe}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            let scale = ${j.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${M.getByIndices(`${M.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/p};
            for (var i: u32 = 0; i < ${m}; i++) {
              let b_value = ${m===1?"b_data":"b_data[i]"};
              ${(()=>{let Y=Math.floor(v/8),ee="";for(let W=0;W<Y;W++){let K=W*t.bits*4,qe=K+t.bits;ee+=`
              ${q()}
              {${t.bits===2?`
                let half_word = b_value >> ${W*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${K}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${qe}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${pe}>(${Array.from({length:4},(be,ze)=>`${pe}(b_value_lower[${ze}]), ${pe}(b_value_upper[${ze}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${pe}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(be,ze)=>`${`dot(a_data${ze}, b_dequantized_values[${ze}])`}`).join(" + ")};
              }
              word_offset += ${8/p};`}return ee})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${_}) {
            var output_value: ${H.type.value} = ${H.type.value}(0);
            for (var b = 0u; b < ${T}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${H.setByIndices(`${H.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${p};${m};${T};${_}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:b,dataType:h}],dispatchGroup:{x:I},programUniforms:S}),getShaderSource:P}},qc=(e,t)=>{Pc(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Lc(e.inputs,t)):e.compute(Uc(e.inputs,t))},Gc=e=>xe(e)}),Wc,Vc,Hc,Fc,jc,Kc,Zc,Yc,Xc,Ig=L(()=>{"use strict";ne(),ue(),le(),Wc=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Vc=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
            k = i32(${e.indicesGet("indices",a)}) - ${re("uniforms.pads",a,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${re("uniforms.x_shape",a,t)})) {
              break;
            }
            offset += k * i32(${re("uniforms.x_strides",a,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},Hc=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${re("uniforms.pads",a,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${re("uniforms.x_shape",a,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${re("uniforms.x_shape",a,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${re("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},Fc=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${re("uniforms.pads",a,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${re("uniforms.x_shape",a,t)})) {
                  k = i32(${re("uniforms.x_shape",a,t)}) - 1;
                }
                offset += k * i32(${re("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},jc=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${re("uniforms.pads",a,r)};
                if (k < 0)  {
                  k += i32(${re("uniforms.x_shape",a,t)}]);
                }
                if (k >= i32(${re("uniforms.x_shape",a,t)})) {
                  k -= i32(${re("uniforms.x_shape",a,t)});
                }
                offset += k * i32(${re("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},Kc=(e,t,r)=>{switch(r.mode){case 0:return Vc(e,t,r.pads.length);case 1:return Hc(e,t,r.pads.length);case 2:return Fc(e,t,r.pads.length);case 3:return jc(e,t,r.pads.length);default:throw new Error("Invalid mode")}},Zc=(e,t)=>{let r=D.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,a=D.size(r),n=[{type:12,data:a},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&n.push({type:s?e[2].dataType:1,data:t.value}),n.push(...ie(e[0].dims,r));let u=["rank"],l=d=>{let h=te("output",e[0].dataType,r.length),p=N("x",e[0].dataType,i.length),m=p.type.value,b=Kc(h,i.length,t),y=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&y.push({name:"constant_value",type:s?m:"f32"}),`
            ${d.registerUniforms(y).declareVariables(p,h)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${h.offsetToIndices("global_idx")};

            var value = ${m}(0);
            ${b}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(D.size(r)/64)},programUniforms:n}),getShaderSource:l}},Yc=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,a=e[0].dims.length,n=new Int32Array(2*a).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let l=0;l<u.length;l++)n[Number(u[l])]=Number(r[l]),n[Number(u[l])+a]=Number(r[l+u.length])}else r.forEach((u,l)=>n[Number(l)]=Number(u));let s=[];return n.forEach(u=>s.push(u)),{mode:t.mode,value:i,pads:s}}else return t},Xc=(e,t)=>{Wc(e.inputs);let r=Yc(e.inputs,t);e.compute(Zc(e.inputs,r),{inputs:[0]})}}),Mr,an,nn,sn,on,Qc,Jc,un,ln,ep,tp,dn,rp,ip,cn,ap,np,sp,op,Cg=L(()=>{"use strict";rt(),ne(),ue(),le(),Mr=e=>{if(Ae.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},an=(e,t,r)=>{let i=t.format==="NHWC",a=e.dims.slice();i&&a.splice(1,0,a.pop());let n=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),u=t.strides.slice(),l=n?t.dilations.slice():[],d=t.pads.slice();ti.adjustPoolAttributes(r,a,s,u,l,d);let h=ti.computePoolOutputShape(r,a,u,l,s,d,t.autoPad,t.ceilMode),p=Object.assign({},t);n?Object.assign(p,{kernelShape:s,strides:u,pads:d,dilations:l,cacheKey:t.cacheKey}):Object.assign(p,{kernelShape:s,strides:u,pads:d,cacheKey:t.cacheKey});let m=h.slice();return m.push(m.splice(1,1)[0]),[p,i?m:h]},nn=(e,t)=>{let r=t.format==="NHWC",i=D.size(e),a=D.size(t.kernelShape),n=[{type:12,data:i},{type:12,data:a}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],h=t.pads[t.pads.length-1],p=!!(d+h);n.push({type:12,data:u},{type:12,data:l},{type:12,data:d},{type:12,data:h}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let m=!1;if(t.kernelShape.length===2){let b=t.kernelShape[t.kernelShape.length-2],y=t.strides[t.strides.length-2],_=t.pads[t.pads.length/2-2],T=t.pads[t.pads.length-2];m=!!(_+T),n.push({type:12,data:b},{type:12,data:y},{type:12,data:_},{type:12,data:T}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[n,s,!0,p,m]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=D.computeStrides(t.kernelShape);n.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((d,h)=>d+h);return[n,s,!!l,!1,!1]}},sn=(e,t,r,i,a,n,s,u,l,d,h,p)=>{let m=a.format==="NHWC",b=t.type.value,y=te("output",t.type.tensor,i);if(a.kernelShape.length<=2){let _="",T="",v="",$=r-(m?2:1);if(h?_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${$}] < 0 || xIndices[${$}]
                      >= uniforms.x_shape[${$}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`:_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`,a.kernelShape.length===2){let k=r-(m?3:2);p?T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${k}] = indices[${k}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${k}] < 0 || xIndices[${k}] >= uniforms.x_shape[${k}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${k}] = indices[${k}] * uniforms.sh - uniforms.phStart + j;
                `,v=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var value = ${b}(${u});
              var pad = 0;
              ${T}
              ${_}
              ${v}
              ${s}

              output[global_idx] = value;
            }`}else{if(m)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let _=a.kernelShape.length,T=a.pads.length,v="";return d?v=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${n}
              }`:v=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${n}
            `,`
            ${e.registerUniforms(l).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var offsets: array<u32, ${_}>;

              var value = ${b}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${_-1}u; j++) {
                  offsets[j] = offset / ${re("uniforms.kernelStrides","j",_)};
                  offset -= offsets[j] * ${re("uniforms.kernelStrides","j",_)};
                }
                offsets[${_-1}] = offset;

                isPad = false;
                for (var j = ${r-_}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${re("uniforms.strides",`j - ${r-_}u`,_)}
                    + offsets[j - ${r-_}u] - ${re("uniforms.pads","j - 2u",T)};
                  ${v}
              }
              ${s}

              output[global_idx] = value;
            }`}},on=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Qc=e=>`${on(e)};${e.countIncludePad}`,Jc=e=>`${on(e)};${e.storageOrder};${e.dilations}`,un=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),ln=(e,t,r,i)=>{let[a,n]=an(t,i,r),s=N("x",t.dataType,t.dims.length),u=s.type.value,l="value += x_val;",d="";a.countIncludePad?d+=`value /= ${u}(uniforms.kernelSize);`:d+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[h,p,m,b,y]=nn(n,a);h.push(...ie(t.dims,n));let _=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${m};${b};${y}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(D.size(n)/64)},programUniforms:h}),getShaderSource:T=>sn(T,s,t.dims.length,n.length,a,l,d,0,p,m,b,y)}},ep=e=>{let t=e.count_include_pad!==0,r=un(e);if(r.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding/divisor) is not yet implemented in the WebGPU AveragePool kernel");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:Qc(i)}},tp=(e,t)=>{Mr(e.inputs),e.compute(ln("AveragePool",e.inputs[0],!1,t))},dn={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},rp=e=>{let t=e.format;return{format:t,...dn,cacheKey:t}},ip=(e,t)=>{Mr(e.inputs),e.compute(ln("GlobalAveragePool",e.inputs[0],!0,t))},cn=(e,t,r,i)=>{let[a,n]=an(t,i,r),s=`
      value = max(x_val, value);
    `,u="",l=N("x",t.dataType,t.dims.length),d=["rank"],[h,p,m,b,y]=nn(n,a);return h.push(...ie(t.dims,n)),{name:e,shaderCache:{hint:`${i.cacheKey};${m};${b};${y}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(D.size(n)/64)},programUniforms:h}),getShaderSource:_=>sn(_,l,t.dims.length,n.length,a,s,u,t.dataType===10?-65504:-1e5,p,m,b,y)}},ap=(e,t)=>{Mr(e.inputs),e.compute(cn("MaxPool",e.inputs[0],!1,t))},np=e=>{let t=e.storage_order,r=e.dilations,i=un(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding) is not yet implemented in the WebGPU MaxPool kernel");let a={storageOrder:t,dilations:r,...i,cacheKey:""};return{...a,cacheKey:Jc(a)}},sp=e=>{let t=e.format;return{format:t,...dn,cacheKey:t}},op=(e,t)=>{Mr(e.inputs),e.compute(cn("GlobalMaxPool",e.inputs[0],!0,t))}}),up,lp,dp,cp,zg=L(()=>{"use strict";ne(),ue(),Oe(),le(),up=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((a,n)=>n===t.axis||a===e[0].dims[n]).reduce((a,n)=>a&&n,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},lp=(e,t)=>{let r=D.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,a=i===3,n=e[0].dims,s=e[1].dataType,u=D.size(n),l=i===3||i===2,d=l?[Math.ceil(D.size(e[0].dims)/4)]:e[0].dims,h=e[1].dims,p=e.length>2?e[2]:void 0,m=p?l?[Math.ceil(D.size(p.dims)/4)]:p.dims:void 0,b=h.length===0||h.length===1&&h[0]===1,y=b===!1&&h.length===1,_=Re(u),T=b&&(!l||_===4),v=T?_:1,$=T&&!l?_:1,k=N("input",l?12:i,d.length,$),A=N("scale",s,h.length),I=p?N("zero_point",l?12:i,m.length):void 0,S=te("output",s,n.length,v),C=[k,A];I&&C.push(I);let w=[d,h];p&&w.push(m);let R=[{type:12,data:u/v},{type:12,data:r},{type:12,data:t.blockSize},...ie(...w,n)],P=V=>{let F=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${V.registerUniforms(F).declareVariables(...C,S)}
      ${V.mainStart()}
          ${V.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${S.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${k.getByOffset("global_idx / 4")};
            let x_vec = ${a?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${v===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${k.getByOffset("global_idx")};`};

          // Set scale input
          ${b?`let scale_value= ${A.getByOffset("0")}`:y?`
            let scale_index = ${S.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${A.getByOffset("scale_index")};`:`
            var scale_indices: ${A.type.indices} = output_indices;
            let index = ${A.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${A.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${A.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${I?b?l?`
                let zero_point_input = ${I.getByOffset("0")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${I.getByOffset("0")}`:y?l?`
                let zero_point_index = ${S.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${I.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${S.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${I.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${A.indicesToOffset("scale_indices")};
                let zero_point_input = ${I.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${I.getByIndices("scale_indices")};`:`let zero_point_value = ${l?a?"i32":"u32":k.type.value}(0);`};
      // Compute and write output
      ${S.setByOffset("global_idx",`${S.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:I?["rank","rank","rank"]:["rank","rank"]},getShaderSource:P,getRunData:()=>({outputs:[{dims:n,dataType:s}],dispatchGroup:{x:Math.ceil(u/v/64),y:1,z:1},programUniforms:R})}},dp=(e,t)=>{up(e.inputs,t),e.compute(lp(e.inputs,t))},cp=e=>xe({axis:e.axis,blockSize:e.blockSize})}),pp,hp,fp,Og=L(()=>{"use strict";rt(),ne(),le(),pp=(e,t,r)=>{let i=e===t,a=e<t&&r<0,n=e>t&&r>0;if(i||a||n)throw new Error("Range these inputs' contents are invalid.")},hp=(e,t,r,i)=>{let a=Math.abs(Math.ceil((t-e)/r)),n=[a],s=a,u=[{type:12,data:s},{type:i,data:e},{type:i,data:r},...ie(n)],l=d=>{let h=te("output",i,n.length),p=h.type.value,m=[{name:"outputSize",type:"u32"},{name:"start",type:p},{name:"delta",type:p}];return`
        ${d.registerUniforms(m).declareVariables(h)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${p}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:n,dataType:i}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},fp=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),Ae.webgpu.validateInputContent&&pp(t,r,i),e.compute(hp(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),mp,gp,yp,bp,Rg=L(()=>{"use strict";ne(),ue(),Oe(),le(),mp=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let a=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,n=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return i==="i32"||i==="u32"?`atomicAdd(&${t}, bitcast<${i}>(${r}));`:`
              ${a}bitcast<${i}>(oldValue) + (${r})${n}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${a}max(bitcast<f32>(oldValue), (${r}))${n}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${a}min(bitcast<${i}>(oldValue), (${r}))${n}`;case"mul":return`${a}(bitcast<${i}>(oldValue) * (${r}))${n}`;default:throw new Error(`Reduction ${e} is not supported.`)}},gp=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r,n=1,s=Math.ceil(D.sizeToDimension(i,i.length-1)/n),u=i[i.length-1],l=D.sizeFromDimension(r,u),d=[{type:12,data:s},{type:12,data:u},{type:12,data:l},...ie(e[1].dims,e[2].dims,a)],h=p=>{let m=N("indices",e[1].dataType,e[1].dims.length),b=N("updates",e[2].dataType,e[2].dims.length,n),y=t.reduction!=="none"&&t.reduction!==""?mo("output",e[0].dataType,a.length):te("output",e[0].dataType,a.length,n);return`
      ${p.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(m,b,y)}
      ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${mp(t.reduction,"output[data_offset + i]","value",y.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:h}},yp=e=>xe({reduction:e.reduction}),bp=(e,t)=>{e.compute(gp(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),wp,_p,$p,pn,vp,xp,Tp,Sp,kp,Ap,Ep,Ip,hn,Cp,zp,Op,Rp,Mp,Dp,Bp,Mg=L(()=>{"use strict";ne(),ue(),Oe(),le(),wp=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},_p=(e,t,r)=>{t.every(a=>a>=0&&a<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((a,n)=>i[a]=e[n]),i},$p=(e,t,r,i,a,n)=>{let[s,u,l]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(h=>n.push(h));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(h=>i.push(h)),i.length!==0&&i.length!==d&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");wp(i,t),t.axes.length>0&&_p(i,t.axes,d).forEach((h,p)=>i[p]=h)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(h=>a.push(Number(h))),a.length!==0&&a.length!==d&&r>=18&&a.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(a.length!==0&&a.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof a<"u"&&i.length>0&&a.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},pn=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,vp=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${pn("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${pn("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",xp=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Tp=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),a=e.length===0?i:e.slice();return t.length>0?(t.forEach((n,s)=>{i[n]=a[s],i[s+r]=a[t.length+s]}),i):a},Sp=(e,t,r,i)=>{let a=[];if(r.length>0)if(i.length>0){if(e.forEach(n=>a.push(n)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((n,s)=>a[n]=r[s])}else r.forEach(n=>a.push(n));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");a=e.map((n,s)=>Math.round(n*t[s]))}return a},kp=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(n=>t[n]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(n=>t[n]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let a=e.slice();return r.axes.length>0?(r.axes.forEach(n=>t[n]=i),r.axes.forEach(n=>a[n]=Math.round(e[n]*t[n]))):(t.fill(i,0,t.length),a.forEach((n,s)=>a[s]=Math.round(n*t[s]))),a},Ap=(e,t,r,i,a)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${re("uniforms.scales","i",i)};
        var roi_low = ${re("uniforms.roi","i",a)};
        var roi_hi = ${re("uniforms.roi",`i + ${t.length}`,a)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${re("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${re("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Ep=(e,t,r,i,a,n,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${re("uniforms.scales","i",a)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${re("uniforms.roi","i",n)};
          var roi_hi = ${re("uniforms.roi",`i + ${r.length}`,n)};
          var input_shape_i = ${re("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${re("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,Ip=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${re("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,hn=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Cp=(e,t,r,i,a)=>{let[n,s,u,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${hn(e,l,n,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${s}];
      var col:${d} = originalIndices[${u}];
      ${i?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${a};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${n}])`:"0"};
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},zp=(e,t,r,i,a,n,s,u,l,d)=>{let h=r.length===2,p=!0,[m,b]=h?[0,1]:p?[2,3]:[1,2],y=e.type.value,_=T=>{let v=T===m?"row":"col";return`
      fn ${v}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices",T)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${a[T]},
        ${i[T]}, ${r[T]}, ${n[T]}, ${n[T]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[T]} - 1))) {
          return ${l};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${v}: ${y} = originalIdx + ${y}(i);
          if (${v} < 0 || ${v} >= ${r[T]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${l};`:`${v} = max(0, min(${v}, ${r[T]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",T,`u32(${v})`)};
          data[i + 1] = ${T===m?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${_(m)};
    ${_(b)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${y}, 4>, coefs: array<${y}, 4>) -> ${y} {
    var coefsSum: ${y} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${y} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Op=(e,t,r,i,a)=>{let[n,s,u,l,d]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],h=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${h} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${hn(e,d,n,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${h} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${h} = originalIndices[${s}];
      var height:${h} = originalIndices[${u}];
      var width:${h} = originalIndices[${l}];
      ${i?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${a};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${n}])`:"0"};

      var x111: ${h} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${h} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${h} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${h} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${h} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${h} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${h} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${h} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${h} = abs(depth - ${h}(depth1));
      var dx2: ${h} = abs(${h}(depth2) - depth);
      var dy1: ${h} = abs(height - ${h}(height1));
      var dy2: ${h} = abs(${h}(height2) - height);
      var dz1: ${h} = abs(width - ${h}(width1));
      var dz2: ${h} = abs(${h}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},Rp=(e,t,r,i,a,n)=>{let s=e.dims,u=Tp(n,t.axes,s.length),l=Sp(s,i,a,t.axes),d=i.slice();i.length===0&&(d=s.map(($,k)=>$===0?1:l[k]/$),t.keepAspectRatioPolicy!=="stretch"&&(l=kp(s,d,t)));let h=te("output",e.dataType,l.length),p=N("input",e.dataType,s.length),m=D.size(l),b=s.length===l.length&&s.every(($,k)=>$===l[k]),y=t.coordinateTransformMode==="tf_crop_and_resize",_=t.extrapolationValue,T=p.type.value,v=$=>`
      ${b?"":`
      ${vp(t.coordinateTransformMode,T)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Ip(p,s)};
              ${xp(t.nearestMode,r,T)};
              ${Ep(p,h,s,l,d.length,u.length,y)};
              `;case"linear":return`
              ${Ap(h,s,l,d.length,u.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${Cp(p,h,s,y,_)}`;if(s.length===3||s.length===5)return`${Op(p,h,s,y,_)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${zp(p,h,s,l,d,u,t.cubicCoeffA,y,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${$.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",u.length).declareVariables(p,h)}
      ${$.mainStart()}
        ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${b?"output[global_idx] = input[global_idx];":`
        let output_indices = ${h.offsetToIndices("global_idx")};
        var input_indices: ${p.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${p.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${d.length>0?t.mode==="cubic"?d:d.length:""}|${a.length>0?a:""}|${u.length>0?u:""}|${b}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},{type:1,data:d},{type:1,data:u},...ie(s,l)]})}},Mp=e=>{let t=e.customDataBuffer;return new Uint32Array(t.buffer,t.byteOffset,1)[0]},Dp=(e,t)=>{let r=[],i=[],a=[],n=Mp(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");$p(e.inputs,t,n,r,i,a),e.compute(Rp(e.inputs[0],t,n,r,i,a),{inputs:[0]})},Bp=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,a=e.cubicCoeffA,n=e.excludeOutside!==0,s=e.extrapolationValue,u=e.keepAspectRatioPolicy,l=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return xe({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:a,excludeOutside:n,extrapolationValue:s,keepAspectRatioPolicy:u,mode:l,nearestMode:d})}}),Np,Pp,Up,Dg=L(()=>{"use strict";ne(),ue(),le(),Np=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let a=t.dims[t.dims.length-1],n=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==a)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==n)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==a)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==a)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==a)throw new Error("Bias must have the same hidden size as input")}},Pp=(e,t,r,i)=>{let a=t.simplified,n=e[0].dims,s=D.size(n),u=n,l=s,d=n.slice(-1)[0],h=i?n.slice(0,-1).concat(1):[],p=!a&&e.length>3,m=e.length>4,b=i&&r>1,y=i&&r>2,_=r>3,T=64,v=Re(d),$=[{type:12,data:l},{type:12,data:v},{type:12,data:d},{type:1,data:t.epsilon}],k=I=>{let S=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],C=[N("x",e[0].dataType,e[0].dims,v),N("skip",e[1].dataType,e[1].dims,v),N("gamma",e[2].dataType,e[2].dims,v)];p&&C.push(N("beta",e[3].dataType,e[3].dims,v)),m&&C.push(N("bias",e[4].dataType,e[4].dims,v)),C.push(te("output",e[0].dataType,u,v)),b&&C.push(te("mean_output",1,h)),y&&C.push(te("inv_std_output",1,h)),_&&C.push(te("input_skip_bias_sum",e[0].dataType,u,v));let w=Ne(e[0].dataType),R=Ne(1,v);return`

      ${I.registerUniforms(S).declareVariables(...C)}
      var<workgroup> sum_shared : array<${R}, ${T}>;
      var<workgroup> sum_squared_shared : array<${R}, ${T}>;

      ${I.mainStart([T,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${T};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${T};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${T-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${m?"bias[offset1d + i]":w+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${_?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${yr(w,v,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${T};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${Dt("sum",v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Dt("square_sum",v)} / f32(uniforms.hidden_size) ${a?"":"- mean * mean"} + uniforms.epsilon);
        ${b?"mean_output[global_idx] = mean;":""}
        ${y?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${a?"":`- ${w}(mean)`}) *
            ${w}(inv_std_dev) * gamma[offset1d + i]
            ${p?"+ beta[offset1d + i]":""};
        }
      }`},A=[{dims:u,dataType:e[0].dataType}];return r>1&&A.push({dims:h,dataType:1}),r>2&&A.push({dims:h,dataType:1}),r>3&&A.push({dims:n,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${v};${b};${y};${_}`,inputDependencies:e.map((I,S)=>"type")},getShaderSource:k,getRunData:()=>({outputs:A,dispatchGroup:{x:Math.ceil(l/d)},programUniforms:$})}},Up=(e,t)=>{Np(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Pp(e.inputs,t,e.outputCount,!1),{outputs:r})}}),Lp,Dr,qp,fn,Gp,Wp,Vp,Hp,Bg=L(()=>{"use strict";ne(),ue(),Oe(),le(),Lp=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},Dr=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},qp=(e,t)=>{if(e.length>1){let r=Dr(e,1),i=Dr(e,2),a=Dr(e,3);return a.length===0&&(a=[...Array(e[0].dims.length).keys()]),xe({starts:r,ends:i,axes:a})}else return t},fn=(e,t,r,i,a)=>{let n=e;return e<0&&(n+=r[i[t]]),a[t]<0?Math.max(0,Math.min(n,r[i[t]]-1)):Math.max(0,Math.min(n,r[i[t]]))},Gp=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${re("uniforms.input_shape","i",r.length)};
            let steps_i = ${re("uniforms.steps","i",r.length)};
            let signs_i = ${re("uniforms.signs","i",r.length)};
            let starts_i = ${re("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Wp=(e,t)=>{let r=e[0].dims,i=D.size(r),a=t.axes.length>0?D.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],n=Dr(e,4);n.forEach(v=>v!==0||(()=>{throw new Error("step cannot be 0")})),n.length===0&&(n=Array(a.length).fill(1));let s=t.starts.map((v,$)=>fn(v,$,r,a,n)),u=t.ends.map((v,$)=>fn(v,$,r,a,n));if(a.length!==s.length||a.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(a.length!==r.length)for(let v=0;v<r.length;++v)a.includes(v)||(s.splice(v,0,0),u.splice(v,0,r[v]),n.splice(v,0,1));let l=n.map(v=>Math.sign(v));n.forEach((v,$,k)=>{if(v<0){let A=(u[$]-s[$])/v,I=s[$],S=I+A*n[$];s[$]=S,u[$]=I,k[$]=-v}});let d=r.slice(0);a.forEach((v,$)=>{d[v]=Math.ceil((u[v]-s[v])/n[v])});let h={dims:d,dataType:e[0].dataType},p=te("output",e[0].dataType,d.length),m=N("input",e[0].dataType,e[0].dims.length),b=D.size(d),y=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:n.length}],_=[{type:12,data:b},{type:12,data:s},{type:6,data:l},{type:12,data:n},...ie(e[0].dims,d)],T=v=>`
      ${v.registerUniforms(y).declareVariables(m,p)}
        ${Gp(m,p,r)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${p.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${p.setByOffset("global_idx",m.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${s.length}_${n.length}`,inputDependencies:["rank"]},getShaderSource:T,getRunData:()=>({outputs:[h],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:_})}},Vp=(e,t)=>{Lp(e.inputs,t);let r=qp(e.inputs,t);e.compute(Wp(e.inputs,r),{inputs:[0]})},Hp=e=>{let t=e.starts,r=e.ends,i=e.axes;return xe({starts:t,ends:r,axes:i})}}),Fp,jp,Kp,Zp,Ng=L(()=>{"use strict";ne(),ue(),Oe(),Bt(),le(),Fp=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},jp=(e,t)=>{let r=e.inputs[0],i=r.dims,a=D.size(i),n=i.length,s=D.normalizeAxis(t.axis,n),u=s<i.length-1,l,d=[];u?(d=Array.from({length:n},(C,w)=>w),d[s]=n-1,d[n-1]=s,l=e.compute(Je(r,d),{inputs:[r],outputs:[-1]})[0]):l=r;let h=l.dims,p=h[n-1],m=a/p,b=Re(p),y=p/b,_=64;m===1&&(_=256);let T=(C,w)=>w===4?`max(max(${C}.x, ${C}.y), max(${C}.z, ${C}.w))`:w===2?`max(${C}.x, ${C}.y)`:w===3?`max(max(${C}.x, ${C}.y), ${C}.z)`:C,v=N("x",l.dataType,l.dims,b),$=te("result",l.dataType,l.dims,b),k=v.type.value,A=Ne(l.dataType)==="f32"?`var threadMax = ${k}(-3.4028234663852886e+38f);`:`var threadMax = ${k}(-65504.0h);`,I=C=>`
      var<workgroup> rowMaxShared : ${k};
      var<workgroup> rowSumShared : ${k};
      var<workgroup> threadShared : array<${k}, ${_}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${k} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${k}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${C.registerUniform("packedCols","i32").declareVariables(v,$)}
      ${C.mainStart(_)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${_};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${A}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${k}(${T("threadShared[0]",b)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${k}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${k}(${Dt("threadShared[0]",b)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${k}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,S=e.compute({name:"Softmax",shaderCache:{hint:`${b};${_}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:h,dataType:l.dataType}],dispatchGroup:{x:m},programUniforms:[{type:6,data:y}]}),getShaderSource:I},{inputs:[l],outputs:[u?-1:0]})[0];u&&e.compute(Je(S,d),{inputs:[S]})},Kp=(e,t)=>{Fp(e.inputs),jp(e,t)},Zp=e=>xe({axis:e.axis})}),mn,Yp,Xp,Qp,Jp,Pg=L(()=>{"use strict";ne(),ue(),le(),mn=e=>Array.from(e.getBigInt64Array(),Number),Yp=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(mn(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Xp=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},Qp=(e,t)=>{let r=e[0].dims,i=t??mn(e[1]),a=Xp(r,i),n=D.size(a),s=e[0].dataType,u=N("input",s,r.length),l=te("output",s,a.length),d=h=>`
      const inputShape = ${u.indices(...r)};
      ${h.registerUniform("output_size","u32").declareVariables(u,l)}
      ${h.mainStart()}
      ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},...ie(e[0].dims,a)]}),getShaderSource:d}},Jp=e=>{Yp(e.inputs),e.compute(Qp(e.inputs),{inputs:[0]})}}),eh,th,rh,Ug=L(()=>{"use strict";ne(),ue(),le(),eh=(e,t,r,i,a)=>{let n=te("output_data",a,r.length,4),s=N("a_data",t[1].dataType,t[1].dims.length,4),u=N("b_data",t[2].dataType,t[2].dims.length,4),l=N("c_data",t[0].dataType,t[0].dims.length,4),d,h=(p,m,b)=>`select(${m}, ${p}, ${b})`;if(!i)d=n.setByOffset("global_idx",h(s.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let p=(m,b,y="")=>{let _=`a_data[index_a${b}][component_a${b}]`,T=`b_data[index_b${b}][component_b${b}]`,v=`bool(c_data[index_c${b}] & (0xffu << (component_c${b} * 8)))`;return`
            let output_indices${b} = ${n.offsetToIndices(`global_idx * 4u + ${b}u`)};
            let offset_a${b} = ${s.broadcastedIndicesToOffset(`output_indices${b}`,n)};
            let offset_b${b} = ${u.broadcastedIndicesToOffset(`output_indices${b}`,n)};
            let offset_c${b} = ${l.broadcastedIndicesToOffset(`output_indices${b}`,n)};
            let index_a${b} = offset_a${b} / 4u;
            let index_b${b} = offset_b${b} / 4u;
            let index_c${b} = offset_c${b} / 4u;
            let component_a${b} = offset_a${b} % 4u;
            let component_b${b} = offset_b${b} % 4u;
            let component_c${b} = offset_c${b} % 4u;
            ${m}[${b}] = ${y}(${h(_,T,v)});
          `};a===9?d=`
            var data = vec4<u32>(0);
            ${p("data",0,"u32")}
            ${p("data",1,"u32")}
            ${p("data",2,"u32")}
            ${p("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:d=`
            ${p("output_data[global_idx]",0)}
            ${p("output_data[global_idx]",1)}
            ${p("output_data[global_idx]",2)}
            ${p("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,s,u,n)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},th=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,a=e[1].dataType,n=!(D.areEqual(t,r)&&D.areEqual(r,i)),s=t,u=D.size(t);if(n){let d=mr.calcShape(mr.calcShape(t,r,!1),i,!1);if(!d)throw new Error("Can't perform where op on the given tensors");s=d,u=D.size(s)}let l=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>eh(d,e,s,n,a),getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:l},...ie(i,t,r,s)]})}},rh=e=>{e.compute(th(e.inputs))}}),ih,Lg=L(()=>{"use strict";Jm(),Sa(),eg(),tg(),rg(),ig(),ag(),lg(),cg(),pg(),hg(),fg(),mg(),gg(),yg(),bg(),wg(),_g(),$g(),vg(),xg(),Tg(),Sg(),kg(),Ag(),Eg(),mc(),Ig(),Cg(),zg(),Og(),Rg(),va(),Mg(),Sc(),Dg(),Bg(),Ng(),vc(),Pg(),Bt(),Ia(),Ug(),ih=new Map([["Abs",[Eu]],["Acos",[Iu]],["Acosh",[Cu]],["Add",[bl]],["ArgMax",[hu,Ta]],["ArgMin",[pu,Ta]],["Asin",[zu]],["Asinh",[Ou]],["Atan",[Ru]],["Atanh",[Mu]],["Attention",[wu]],["AveragePool",[tp,ep]],["BatchNormalization",[xu]],["BiasAdd",[ku]],["BiasSplitGelu",[ml]],["Cast",[Bu,Du]],["Ceil",[Uu]],["Clip",[Pu]],["Concat",[Ol,Rl]],["Conv",[Ga,La]],["ConvTranspose",[sd,id]],["Cos",[Lu]],["Cosh",[qu]],["CumSum",[ud,ld]],["DepthToSpace",[hd,fd]],["DequantizeLinear",[dp,cp]],["DFT",[$d,vd]],["Div",[wl]],["Einsum",[Ed,Id]],["Elu",[Gu,Er]],["Equal",[_l]],["Erf",[Wu]],["Exp",[Vu]],["Expand",[Rd]],["FastGelu",[Dd]],["Floor",[Hu]],["FusedConv",[Ga,La]],["Gather",[Ud,Pd]],["GatherElements",[Yd,Zd]],["GatherBlockQuantized",[Hd,Fd]],["GatherND",[qd,Gd]],["Gelu",[Fu]],["Gemm",[ec,Jd]],["GlobalAveragePool",[ip,rp]],["GlobalMaxPool",[op,sp]],["Greater",[Tl]],["GreaterOrEqual",[kl]],["GridSample",[lc,dc]],["GroupQueryAttention",[Ic]],["HardSigmoid",[el,Ju]],["HardSwish",[tl]],["InstanceNormalization",[Oc]],["LayerNormalization",[Dc]],["LeakyRelu",[ju,Er]],["Less",[Sl]],["LessOrEqual",[Al]],["Log",[ll]],["MatMul",[Nc]],["MatMulNBits",[qc,Gc]],["MaxPool",[ap,np]],["Mul",[$l]],["MultiHeadAttention",[fc,pc]],["Neg",[Zu]],["Not",[Ku]],["Pad",[Xc]],["Pow",[vl]],["QuickGelu",[pl,Er]],["Range",[fp]],["Reciprocal",[Yu]],["ReduceMin",[ou]],["ReduceMean",[ru]],["ReduceMax",[su]],["ReduceSum",[lu]],["ReduceProd",[uu]],["ReduceL1",[iu]],["ReduceL2",[au]],["ReduceLogSum",[cu]],["ReduceLogSumExp",[nu]],["ReduceSumSquare",[du]],["Relu",[Xu]],["Resize",[Dp,Bp]],["RotaryEmbedding",[Tc]],["ScatterND",[bp,yp]],["Sigmoid",[Qu]],["Sin",[rl]],["Sinh",[il]],["Slice",[Vp,Hp]],["SkipLayerNormalization",[Up]],["Split",[_c,$c]],["Sqrt",[al]],["Softmax",[Kp,Zp]],["Sub",[xl]],["Tan",[nl]],["Tanh",[sl]],["ThresholdedRelu",[ul,Er]],["Tile",[Jp]],["Transpose",[xo,To]],["Where",[rh]]])}),ah,qg=L(()=>{"use strict";rt(),Et(),le(),ah=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,a){ft(e.programInfo.name);let n=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let d of t)u.push({binding:u.length,resource:{buffer:d.buffer}});for(let d of r)u.push({binding:u.length,resource:{buffer:d.buffer}});a&&u.push({binding:u.length,resource:a});let l=n.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),nt(e.programInfo.name)}dispose(){}build(e,t){ft(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(d=>{r.features.has(d.feature)&&i.push(`enable ${d.extension};`)});let a=yo(t,this.backend.device.limits),n=e.getShaderSource(a),s=`${i.join(`
`)}
${a.additionalImplementations}
${n}`,u=r.createShaderModule({code:s,label:e.name});we("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let l=r.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return nt(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=a&&r<=a&&i<=a)return[t,r,i];let n=t*r*i,s=Math.ceil(Math.sqrt(n));if(s>a){if(s=Math.ceil(Math.cbrt(n)),s>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),nh={};hr(nh,{WebGpuBackend:()=>lh});var sh,oh,uh,lh,Gg=L(()=>{"use strict";rt(),ne(),Et(),to(),Xm(),Lg(),qg(),sh=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let a=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${a}`);break}case"rank":{let n=e[i].dims.length;r.push(`${a};${n}`);break}case"dims":{let n=e[i].dims.join(",");r.push(`${a};${n}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},oh=(e,t,r)=>{var a,n;let i=e.name;return(a=e.shaderCache)!=null&&a.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${sh(t,((n=e.shaderCache)==null?void 0:n.inputDependencies)??new Array(t.length).fill("dims"))}`,i},uh=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},lh=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},a=u=>t.features.has(u)&&r.push(u)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups"),this.device=await t.requestDevice(i);let n=t,s=t.info??(typeof n.requestAdapterInfo=="function"?await n.requestAdapterInfo():void 0);this.adapterInfo=new uh(s),this.gpuDataManager=ho(this),this.programManager=new ah(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,sa(e.logLevel,!!e.debug),this.device.onuncapturederror=u=>{u.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${u.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){var e;typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&((e=this.env)!=null&&e.webgpu)&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;ft(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{var i;let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let a=0;a<t.length/2;a++){let n=r[a],s=n.kernelId,u=this.kernels.get(s),l=u.kernelType,d=u.kernelName,h=n.programName,p=n.inputTensorViews,m=n.outputTensorViews,b=t[a*2],y=t[a*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=b);let _=Number(b-this.queryTimeBase),T=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(_)||!Number.isSafeInteger(T))throw new RangeError("incorrect timestamp range");if((i=this.env.webgpu.profiling)!=null&&i.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:p.map(v=>({dims:v.dims,dataType:At(v.dataType)})),outputsMetadata:m.map(v=>({dims:v.dims,dataType:At(v.dataType)})),kernelId:s,kernelType:l,kernelName:d,programName:h,startTime:_,endTime:T});else{let v="";p.forEach((k,A)=>{v+=`input[${A}]: [${k.dims}] | ${At(k.dataType)}, `});let $="";m.forEach((k,A)=>{$+=`output[${A}]: [${k.dims}] | ${At(k.dataType)}, `}),console.log(`[profiling] kernel "${s}|${l}|${d}|${h}" ${v}${$}start time: ${_} ns, execution time: ${T-_} ns`)}Zr("GPU",`${h}::${b}::${y}`)}e.unmap(),this.pendingQueries.delete(e)}),nt()}run(e,t,r,i,a,n){ft(e.name);let s=[];for(let $=0;$<t.length;++$){let k=t[$].data;if(k===0)continue;let A=this.gpuDataManager.get(k);if(!A)throw new Error(`no GPU data for input: ${k}`);s.push(A)}let{outputs:u,dispatchGroup:l,programUniforms:d}=e.getRunData(t),h=r.length===0?u.map(($,k)=>k):r;if(h.length!==u.length)throw new Error(`Output size ${h.length} must be equal to ${u.length}.`);let p=[],m=[];for(let $=0;$<u.length;++$){if(!Number.isInteger(h[$])||h[$]<-3||h[$]>=n)throw new Error(`Invalid output index: ${h[$]}`);if(h[$]===-3)continue;let k=h[$]===-1,A=h[$]===-2,I=k||A?a(u[$].dataType,u[$].dims):i(h[$],u[$].dataType,u[$].dims);if(p.push(I),I.data===0)continue;let S=this.gpuDataManager.get(I.data);if(!S)throw new Error(`no GPU data for output: ${I.data}`);if(k&&this.temporaryData.push(S),A){let C=this.kernelPersistentData.get(this.currentKernelId);C||(C=[],this.kernelPersistentData.set(this.currentKernelId,C)),C.push(S)}m.push(S)}if(s.length!==t.length||m.length!==p.length){if(m.length===0)return nt(e.name),p;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let b;if(d){let $=0,k=[];d.forEach(C=>{let w=typeof C.data=="number"?[C.data]:C.data;if(w.length===0)return;let R=C.type===10?2:4,P,V;C.type===10?(V=w.length>4?16:w.length>2?8:w.length*R,P=w.length>4?16:R*w.length):(V=w.length<=2?w.length*R:16,P=16),$=Math.ceil($/V)*V,k.push($);let F=C.type===10?8:4;$+=w.length>4?Math.ceil(w.length/F)*P:w.length*R});let A=16;$=Math.ceil($/A)*A;let I=new ArrayBuffer($);d.forEach((C,w)=>{let R=k[w],P=typeof C.data=="number"?[C.data]:C.data;if(C.type===6)new Int32Array(I,R,P.length).set(P);else if(C.type===12)new Uint32Array(I,R,P.length).set(P);else if(C.type===10)new Uint16Array(I,R,P.length).set(P);else if(C.type===1)new Float32Array(I,R,P.length).set(P);else throw new Error(`Unsupported uniform type: ${At(C.type)}`)});let S=this.gpuDataManager.create($,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(S.buffer,0,I,0,$),this.gpuDataManager.release(S.id),b={offset:0,size:$,buffer:S.buffer}}let y=this.programManager.normalizeDispatchGroupSize(l),_=y[1]===1&&y[2]===1,T=oh(e,t,_),v=this.programManager.getArtifact(T);if(v||(v=this.programManager.build(e,y),this.programManager.setArtifact(T,v),we("info",()=>`[artifact] key: ${T}, programName: ${e.name}`)),d&&v.uniformVariablesInfo){if(d.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${d.length} in program "${v.programInfo.name}".`);for(let $=0;$<d.length;$++){let k=d[$],A=k.type,I=typeof k.data=="number"?1:k.data.length,[S,C]=v.uniformVariablesInfo[$];if(A!==S||I!==C)throw new Error(`Uniform variable ${$} mismatch: expect type ${S} with size ${C}, got type ${A} with size ${I} in program "${v.programInfo.name}".`)}}if(we("info",()=>`[ProgramManager] run "${e.name}" (key=${T}) with ${y[0]}x${y[1]}x${y[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let $={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:t,outputTensorViews:p};this.pendingKernels.push($),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push($)}return this.programManager.run(v,s,m,y,b),nt(e.name),p}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let a=ih.get(e);if(!a)throw new Error(`kernel not implemented: ${e}`);let n={kernelType:e,kernelName:i,kernelEntry:a[0],attributes:[a[1],r]};this.kernels.set(t,n)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let a=i.kernelType,n=i.kernelName,s=i.kernelEntry,u=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${n}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),we("info",()=>`[WebGPU] Start to run kernel "[${a}] ${n}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(t,u[1]),0}catch(d){return r.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${n}" failed. ${d}`)),1}finally{l&&r.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${a}] ${n}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let a=this.sessionExternalDataMapping.get(e);a||(a=new Map,this.sessionExternalDataMapping.set(e,a));let n=a.get(t),s=this.gpuDataManager.registerExternalBuffer(r,i,n);return a.set(t,[s,r]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await ya(this,e,t);return oa(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){var e;this.queryType="none",(((e=this.env.webgpu.profiling)==null?void 0:e.mode)==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){we("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){we("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){we("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let a=this.getComputePassEncoder(),n=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(n.computePipeline),a.setBindGroup(0,n.bindGroup),a.dispatchWorkgroups(...n.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),dh={};hr(dh,{init:()=>ph});var fi,ch,ph,Wg=L(()=>{"use strict";ne(),Et(),ue(),Ym(),fi=class vm{constructor(t,r,i,a){this.module=t,this.dataType=r,this.data=i,this.dims=a}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=D.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=D.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=D.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=D.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(D.size(t)!==D.size(this.dims))throw new Error("Invalid new shape");return new vm(this.module,this.dataType,this.data,t)}},ch=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,a=r/e.PTR_SIZE,n=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*a++,n));let s=Number(e.getValue(i*a++,n));this.outputCount=Number(e.getValue(i*a++,n)),this.customDataOffset=Number(e.getValue(i*a++,"*")),this.customDataSize=Number(e.getValue(i*a++,n));let u=[];for(let l=0;l<s;l++){let d=Number(e.getValue(i*a++,n)),h=Number(e.getValue(i*a++,"*")),p=Number(e.getValue(i*a++,n)),m=[];for(let b=0;b<p;b++)m.push(Number(e.getValue(i*a++,n)));u.push(new fi(e,d,h,m))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){var s;let r=((s=t==null?void 0:t.inputs)==null?void 0:s.map(u=>typeof u=="number"?this.inputs[u]:u))??this.inputs,i=(t==null?void 0:t.outputs)??[],a=(u,l,d)=>new fi(this.module,l,this.output(u,d),d),n=(u,l)=>{let d=tr(u,l);if(!d)throw new Error(`Unsupported data type: ${u}`);let h=d>0?this.backend.gpuDataManager.create(d).id:0;return new fi(this.module,u,h,l)};return this.backend.run(e,r,i,a,n,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,a=i===4?"i32":"i64",n=this.module.stackAlloc((1+t.length)*i);this.module.setValue(n,t.length,a);for(let s=0;s<t.length;s++)this.module.setValue(n+i*(s+1),t[s],a);return this.module._JsepOutput(this.opKernelContext,e,n)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},ph=async(e,t,r,i)=>{let a=t.jsepInit;if(!a)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let n=(Gg(),$r(nh)).WebGpuBackend,s=new n;await s.initialize(r,i),a("webgpu",[s,u=>s.alloc(Number(u)),u=>s.free(u),(u,l,d,h=!1)=>{if(h)we("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(l)}, size=${Number(d)}`),s.memcpy(Number(u),Number(l));else{we("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(l)}, size=${Number(d)}`);let p=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(d));s.upload(Number(l),p)}},async(u,l,d)=>{we("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${l}, size=${d}`),await s.download(Number(u),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+d)>>>0))},(u,l,d)=>s.createKernel(u,Number(l),d,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),u=>s.releaseKernel(u),(u,l,d,h)=>{we("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${u}, contextDataOffset=${l}`);let p=new ch(t,s,Number(l));return s.computeKernel(Number(u),p,h)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let n=new uo(r);a("webnn",[n,()=>n.reserveTensorId(),s=>n.releaseTensorId(s),async(s,u,l,d,h)=>n.ensureTensor(s,u,l,d,h),(s,u)=>{n.uploadTensor(s,u)},async(s,u)=>n.downloadTensor(s,u),(s,u)=>n.registerMLContext(s,u),!!r.trace])}}}),hh,gn,yn,Pt,fh,bn,mi,wn,_n,$n,vn,xn,Tn,mh=L(()=>{"use strict";rt(),jm(),Km(),ne(),Qt(),ta(),Hs(),hh=(e,t)=>{Ee()._OrtInit(e,t)!==0&&Se("Can't initialize onnxruntime.")},gn=async e=>{hh(e.wasm.numThreads,ei(e.logLevel))},yn=async(e,t)=>{var i,a;(a=(i=Ee()).asyncInit)==null||a.call(i);let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let n=e.webgpu.powerPreference;if(n!==void 0&&n!=="low-power"&&n!=="high-performance")throw new Error(`Invalid powerPreference setting: "${n}"`);let s=e.webgpu.forceFallbackAdapter;if(s!==void 0&&typeof s!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${s}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:n,forceFallbackAdapter:s}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let n=(Wg(),$r(dh)).init;t==="webgpu"&&await n("webgpu",Ee(),e,r),t==="webnn"&&await n("webnn",Ee(),e)}},Pt=new Map,fh=e=>{let t=Ee(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,a,a+i)!==0&&Se("Can't get session input/output count.");let n=i===4?"i32":"i64";return[Number(t.getValue(a,n)),Number(t.getValue(a+i,n))]}finally{t.stackRestore(r)}},bn=(e,t)=>{let r=Ee(),i=r.stackSave(),a=0;try{let n=r.PTR_SIZE,s=r.stackAlloc(2*n);r._OrtGetInputOutputMetadata(e,t,s,s+n)!==0&&Se("Can't get session input/output metadata.");let u=Number(r.getValue(s,"*"));a=Number(r.getValue(s+n,"*"));let l=r.HEAP32[a/4];if(l===0)return[u,0];let d=r.HEAPU32[a/4+1],h=[];for(let p=0;p<d;p++){let m=Number(r.getValue(a+8+p*n,"*"));h.push(m!==0?r.UTF8ToString(m):Number(r.getValue(a+8+(p+d)*n,"*")))}return[u,l,h]}finally{r.stackRestore(i),a!==0&&r._OrtFree(a)}},mi=e=>{let t=Ee(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},wn=async(e,t)=>{var p,m,b,y;let r,i,a=Ee();Array.isArray(e)?[r,i]=e:e.buffer===a.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=mi(e);let n=0,s=0,u=0,l=[],d=[],h=[];try{if([s,l]=await Vs(t),(t==null?void 0:t.externalData)&&a.mountExternalData){let w=[];for(let R of t.externalData){let P=typeof R=="string"?R:R.path,V=typeof R=="string"?R:R.data;w.push(na(V).then(F=>{a.mountExternalData(P,F)}))}await Promise.all(w)}for(let w of(t==null?void 0:t.executionProviders)??[])if((typeof w=="string"?w:w.name)==="webnn"){if(a.shouldTransferToMLTensor=!1,typeof w!="string"){let R=w,P=R==null?void 0:R.context,V=R==null?void 0:R.gpuDevice,F=R==null?void 0:R.deviceType,U=R==null?void 0:R.powerPreference;P?a.currentContext=P:V?a.currentContext=await a.webnnCreateMLContext(V):a.currentContext=await a.webnnCreateMLContext({deviceType:F,powerPreference:U})}else a.currentContext=await a.webnnCreateMLContext();break}n=await a._OrtCreateSession(r,i,s),(p=a.webgpuOnCreateSession)==null||p.call(a,n),n===0&&Se("Can't create a session."),(m=a.jsepOnCreateSession)==null||m.call(a),a.currentContext&&(a.webnnRegisterMLContext(n,a.currentContext),a.currentContext=void 0,a.shouldTransferToMLTensor=!0);let[_,T]=fh(n),v=!!(t!=null&&t.enableGraphCapture),$=[],k=[],A=[],I=[],S=[];for(let w=0;w<_;w++){let[R,P,V]=bn(n,w);R===0&&Se("Can't get an input name."),d.push(R);let F=a.UTF8ToString(R);$.push(F),A.push(P===0?{name:F,isTensor:!1}:{name:F,isTensor:!0,type:At(P),shape:V})}for(let w=0;w<T;w++){let[R,P,V]=bn(n,w+_);R===0&&Se("Can't get an output name."),h.push(R);let F=a.UTF8ToString(R);k.push(F),I.push(P===0?{name:F,isTensor:!1}:{name:F,isTensor:!0,type:At(P),shape:V});{if(v&&(t==null?void 0:t.preferredOutputLocation)===void 0){S.push("gpu-buffer");continue}let U=typeof(t==null?void 0:t.preferredOutputLocation)=="string"?t.preferredOutputLocation:((b=t==null?void 0:t.preferredOutputLocation)==null?void 0:b[F])??"cpu",M=a.webnnIsGraphOutput;if(U==="cpu"&&M&&M(n,F)){S.push("ml-tensor-cpu-output");continue}if(U!=="cpu"&&U!=="cpu-pinned"&&U!=="gpu-buffer"&&U!=="ml-tensor")throw new Error(`Not supported preferred output location: ${U}.`);if(v&&U!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${U}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);S.push(U)}}let C=null;return S.some(w=>w==="gpu-buffer"||w==="ml-tensor"||w==="ml-tensor-cpu-output")&&(u=a._OrtCreateBinding(n),u===0&&Se("Can't create IO binding."),C={handle:u,outputPreferredLocations:S,outputPreferredLocationsEncoded:S.map(w=>w==="ml-tensor-cpu-output"?"ml-tensor":w).map(w=>aa(w))}),Pt.set(n,[n,d,h,C,v,!1]),[n,$,k,A,I]}catch(_){throw d.forEach(T=>a._OrtFree(T)),h.forEach(T=>a._OrtFree(T)),u!==0&&a._OrtReleaseBinding(u)!==0&&Se("Can't release IO binding."),n!==0&&a._OrtReleaseSession(n)!==0&&Se("Can't release session."),_}finally{a._free(r),s!==0&&a._OrtReleaseSessionOptions(s)!==0&&Se("Can't release session options."),l.forEach(_=>a._free(_)),(y=a.unmountExternalData)==null||y.call(a)}},_n=e=>{var l,d,h;let t=Ee(),r=Pt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,a,n,s,u]=r;s&&(u&&t._OrtClearBoundOutputs(s.handle)!==0&&Se("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&Se("Can't release IO binding.")),(l=t.jsepOnReleaseSession)==null||l.call(t,e),(d=t.webnnOnReleaseSession)==null||d.call(t,e),(h=t.webgpuOnReleaseSession)==null||h.call(t,e),a.forEach(p=>t._OrtFree(p)),n.forEach(p=>t._OrtFree(p)),t._OrtReleaseSession(i)!==0&&Se("Can't release session."),Pt.delete(e)},$n=async(e,t,r,i,a,n,s=!1)=>{if(!e){t.push(0);return}let u=Ee(),l=u.PTR_SIZE,d=e[0],h=e[1],p=e[3],m=p,b,y;if(d==="string"&&(p==="gpu-buffer"||p==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&p!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${n} when enableGraphCapture is true.`);if(p==="gpu-buffer"){let v=e[2].gpuBuffer;y=tr(er(d),h);{let $=u.jsepRegisterBuffer;if(!$)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');b=$(i,n,v,y)}}else if(p==="ml-tensor"){let v=e[2].mlTensor;y=tr(er(d),h);let $=u.webnnRegisterMLTensor;if(!$)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');b=$(i,v,er(d),h)}else{let v=e[2];if(Array.isArray(v)){y=l*v.length,b=u._malloc(y),r.push(b);for(let $=0;$<v.length;$++){if(typeof v[$]!="string")throw new TypeError(`tensor data at index ${$} is not a string`);u.setValue(b+$*l,st(v[$],r),"*")}}else{let $=u.webnnIsGraphInput,k=u.webnnIsGraphOutput;if(d!=="string"&&$&&k){let A=u.UTF8ToString(a);if($(i,A)||k(i,A)){let I=er(d);y=tr(I,h),m="ml-tensor";let S=u.webnnCreateTemporaryTensor,C=u.webnnUploadTensor;if(!S||!C)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let w=await S(i,I,h);C(w,new Uint8Array(v.buffer,v.byteOffset,v.byteLength)),b=w}else y=v.byteLength,b=u._malloc(y),r.push(b),u.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,y),b)}else y=v.byteLength,b=u._malloc(y),r.push(b),u.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,y),b)}}let _=u.stackSave(),T=u.stackAlloc(4*h.length);try{h.forEach(($,k)=>u.setValue(T+k*l,$,l===4?"i32":"i64"));let v=u._OrtCreateTensor(er(d),b,y,T,h.length,aa(m));v===0&&Se(`Can't create tensor for input/output. session=${i}, index=${n}.`),t.push(v)}finally{u.stackRestore(_)}},vn=async(e,t,r,i,a,n)=>{var F,U,M,j;let s=Ee(),u=s.PTR_SIZE,l=Pt.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let d=l[0],h=l[1],p=l[2],m=l[3],b=l[4],y=l[5],_=t.length,T=i.length,v=0,$=[],k=[],A=[],I=[],S=[],C=s.stackSave(),w=s.stackAlloc(_*u),R=s.stackAlloc(_*u),P=s.stackAlloc(T*u),V=s.stackAlloc(T*u);try{[v,$]=Us(n),Yt("wasm prepareInputOutputTensor");for(let H=0;H<_;H++)await $n(r[H],k,I,e,h[t[H]],t[H],b);for(let H=0;H<T;H++)await $n(a[H],A,I,e,p[i[H]],_+i[H],b);Xt("wasm prepareInputOutputTensor");for(let H=0;H<_;H++)s.setValue(w+H*u,k[H],"*"),s.setValue(R+H*u,h[t[H]],"*");for(let H=0;H<T;H++)s.setValue(P+H*u,A[H],"*"),s.setValue(V+H*u,p[i[H]],"*");if(m&&!y){let{handle:H,outputPreferredLocations:pe,outputPreferredLocationsEncoded:q}=m;if(h.length!==_)throw new Error(`input count from feeds (${_}) is expected to be always equal to model's input count (${h.length}).`);Yt("wasm bindInputsOutputs");for(let Y=0;Y<_;Y++){let ee=t[Y];await s._OrtBindInput(H,h[ee],k[Y])!==0&&Se(`Can't bind input[${Y}] for session=${e}.`)}for(let Y=0;Y<T;Y++){let ee=i[Y];(F=a[Y])!=null&&F[3]?(S.push(A[Y]),s._OrtBindOutput(H,p[ee],A[Y],0)!==0&&Se(`Can't bind pre-allocated output[${Y}] for session=${e}.`)):s._OrtBindOutput(H,p[ee],0,q[ee])!==0&&Se(`Can't bind output[${Y}] to ${pe[Y]} for session=${e}.`)}Xt("wasm bindInputsOutputs"),Pt.set(e,[d,h,p,m,b,!0])}(U=s.jsepOnRunStart)==null||U.call(s,d),(M=s.webnnOnRunStart)==null||M.call(s,d);let X;m?X=await s._OrtRunWithBinding(d,m.handle,T,P,v):X=await s._OrtRun(d,R,w,_,V,T,P,v),X!==0&&Se("failed to call OrtRun().");let J=[],de=[];Yt("wasm ProcessOutputTensor");for(let H=0;H<T;H++){let pe=Number(s.getValue(P+H*u,"*"));if(pe===A[H]||S.includes(A[H])){J.push(a[H]),pe!==A[H]&&s._OrtReleaseTensor(pe)!==0&&Se("Can't release tensor.");continue}let q=s.stackSave(),Y=s.stackAlloc(4*u),ee=!1,W,K=0;try{s._OrtGetTensorData(pe,Y,Y+u,Y+2*u,Y+3*u)!==0&&Se(`Can't access output tensor data on index ${H}.`);let qe=u===4?"i32":"i64",be=Number(s.getValue(Y,qe));K=s.getValue(Y+u,"*");let ze=s.getValue(Y+u*2,"*"),Ge=Number(s.getValue(Y+u*3,qe)),Be=[];for(let Ie=0;Ie<Ge;Ie++)Be.push(Number(s.getValue(ze+Ie*u,qe)));s._OrtFree(ze)!==0&&Se("Can't free memory for tensor dims.");let He=Be.reduce((Ie,oe)=>Ie*oe,1);W=At(be);let bt=m==null?void 0:m.outputPreferredLocations[i[H]];if(W==="string"){if(bt==="gpu-buffer"||bt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Ie=[];for(let oe=0;oe<He;oe++){let We=s.getValue(K+oe*u,"*"),et=s.getValue(K+(oe+1)*u,"*"),Gt=oe===He-1?void 0:et-We;Ie.push(s.UTF8ToString(We,Gt))}J.push([W,Be,Ie,"cpu"])}else if(bt==="gpu-buffer"&&He>0){let Ie=s.jsepGetBuffer;if(!Ie)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let oe=Ie(K),We=tr(be,He);if(We===void 0||!ra(W))throw new Error(`Unsupported data type: ${W}`);ee=!0,J.push([W,Be,{gpuBuffer:oe,download:s.jsepCreateDownloader(oe,We,W),dispose:()=>{s._OrtReleaseTensor(pe)!==0&&Se("Can't release tensor.")}},"gpu-buffer"])}else if(bt==="ml-tensor"&&He>0){let Ie=s.webnnEnsureTensor,oe=s.webnnIsGraphInputOutputTypeSupported;if(!Ie||!oe)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(tr(be,He)===void 0||!ia(W))throw new Error(`Unsupported data type: ${W}`);if(!oe(e,W,!1))throw new Error(`preferredLocation "ml-tensor" for ${W} output is not supported by current WebNN Context.`);let We=await Ie(e,K,be,Be,!1);ee=!0,J.push([W,Be,{mlTensor:We,download:s.webnnCreateMLTensorDownloader(K,W),dispose:()=>{s.webnnReleaseTensorId(K),s._OrtReleaseTensor(pe)}},"ml-tensor"])}else if(bt==="ml-tensor-cpu-output"&&He>0){let Ie=s.webnnCreateMLTensorDownloader(K,W)(),oe=J.length;ee=!0,de.push((async()=>{let We=[oe,await Ie];return s.webnnReleaseTensorId(K),s._OrtReleaseTensor(pe),We})()),J.push([W,Be,[],"cpu"])}else{let Ie=Jr(W),oe=new Ie(He);new Uint8Array(oe.buffer,oe.byteOffset,oe.byteLength).set(s.HEAPU8.subarray(K,K+oe.byteLength)),J.push([W,Be,oe,"cpu"])}}finally{s.stackRestore(q),W==="string"&&K&&s._free(K),ee||s._OrtReleaseTensor(pe)}}m&&!b&&(s._OrtClearBoundOutputs(m.handle)!==0&&Se("Can't clear bound outputs."),Pt.set(e,[d,h,p,m,b,!1]));for(let[H,pe]of await Promise.all(de))J[H][2]=pe;return Xt("wasm ProcessOutputTensor"),J}finally{(j=s.webnnOnRunEnd)==null||j.call(s,d),s.stackRestore(C),k.forEach(X=>s._OrtReleaseTensor(X)),A.forEach(X=>s._OrtReleaseTensor(X)),I.forEach(X=>s._free(X)),v!==0&&s._OrtReleaseRunOptions(v),$.forEach(X=>s._free(X))}},xn=e=>{let t=Ee(),r=Pt.get(e);if(!r)throw new Error("invalid session id");let i=r[0],a=t._OrtEndProfiling(i);a===0&&Se("Can't get an profile file name."),t._OrtFree(a)},Tn=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),Ut,Ze,br,Br,Nr,gi,Sn,yi,ur,lr,gh,yh,bh,wh,_h,$h,vh,xh,Th=L(()=>{"use strict";rt(),mh(),Qt(),Xi(),Ut=()=>!!Ae.wasm.proxy&&typeof document<"u",br=!1,Br=!1,Nr=!1,yi=new Map,ur=(e,t)=>{let r=yi.get(e);r?r.push(t):yi.set(e,[t])},lr=()=>{if(br||!Br||Nr||!Ze)throw new Error("worker not ready")},gh=e=>{switch(e.data.type){case"init-wasm":br=!1,e.data.err?(Nr=!0,Sn[1](e.data.err)):(Br=!0,Sn[0]()),gi&&(URL.revokeObjectURL(gi),gi=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=yi.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},yh=async()=>{if(!Br){if(br)throw new Error("multiple calls to 'initWasm()' detected.");if(Nr)throw new Error("previous call to 'initWasm()' failed.");if(br=!0,Ut())return new Promise((e,t)=>{Ze==null||Ze.terminate(),Ms().then(([r,i])=>{try{Ze=i,Ze.onerror=n=>t(n),Ze.onmessage=gh,Sn=[e,t];let a={type:"init-wasm",in:Ae};!a.in.wasm.wasmPaths&&(r||ji)&&(a.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",self.location.href).href}),Ze.postMessage(a),gi=r}catch(a){t(a)}},t)});try{await ea(Ae.wasm),await gn(Ae),Br=!0}catch(e){throw Nr=!0,e}finally{br=!1}}},bh=async e=>{if(Ut())return lr(),new Promise((t,r)=>{ur("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:Ae}};Ze.postMessage(i)});await yn(Ae,e)},wh=async e=>Ut()?(lr(),new Promise((t,r)=>{ur("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};Ze.postMessage(i,[e.buffer])})):mi(e),_h=async(e,t)=>{if(Ut()){if(t!=null&&t.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return lr(),new Promise((r,i)=>{ur("create",[r,i]);let a={type:"create",in:{model:e,options:{...t}}},n=[];e instanceof Uint8Array&&n.push(e.buffer),Ze.postMessage(a,n)})}else return wn(e,t)},$h=async e=>{if(Ut())return lr(),new Promise((t,r)=>{ur("release",[t,r]);let i={type:"release",in:e};Ze.postMessage(i)});_n(e)},vh=async(e,t,r,i,a,n)=>{if(Ut()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(a.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return lr(),new Promise((s,u)=>{ur("run",[s,u]);let l=r,d={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:i,options:n}};Ze.postMessage(d,Tn(l))})}else return vn(e,t,r,i,a,n)},xh=async e=>{if(Ut())return lr(),new Promise((t,r)=>{ur("end-profiling",[t,r]);let i={type:"end-profiling",in:e};Ze.postMessage(i)});xn(e)}}),kn,Sh,kh,Vg=L(()=>{"use strict";rt(),Th(),ne(),Wi(),Hs(),kn=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Sh=e=>{switch(e[3]){case"cpu":return new at(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!ra(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:a}=e[2];return at.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:a})}case"ml-tensor":{let t=e[0];if(!ia(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:a}=e[2];return at.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:a})}default:throw new Error(`invalid data location: ${e[3]}`)}},kh=class{async fetchModelAndCopyToWasmMemory(e){return wh(await na(e))}async loadModel(e,t){ft();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await _h(r,t),nt()}async dispose(){return $h(this.sessionId)}async run(e,t,r){ft();let i=[],a=[];Object.entries(e).forEach(p=>{let m=p[0],b=p[1],y=this.inputNames.indexOf(m);if(y===-1)throw new Error(`invalid input '${m}'`);i.push(b),a.push(y)});let n=[],s=[];Object.entries(t).forEach(p=>{let m=p[0],b=p[1],y=this.outputNames.indexOf(m);if(y===-1)throw new Error(`invalid output '${m}'`);n.push(b),s.push(y)});let u=i.map((p,m)=>kn(p,()=>`input "${this.inputNames[a[m]]}"`)),l=n.map((p,m)=>p?kn(p,()=>`output "${this.outputNames[s[m]]}"`):null),d=await vh(this.sessionId,a,u,s,l,r),h={};for(let p=0;p<d.length;p++)h[this.outputNames[s[p]]]=n[p]??Sh(d[p]);return nt(),h}startProfiling(){}endProfiling(){xh(this.sessionId)}}}),Ah={};hr(Ah,{OnnxruntimeWebAssemblyBackend:()=>En,initializeFlags:()=>An,wasmBackend:()=>Eh});var An,En,Eh,Hg=L(()=>{"use strict";rt(),Th(),Vg(),An=()=>{(typeof Ae.wasm.initTimeout!="number"||Ae.wasm.initTimeout<0)&&(Ae.wasm.initTimeout=0);let e=Ae.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),Ae.wasm.simd=!1),typeof Ae.wasm.proxy!="boolean"&&(Ae.wasm.proxy=!1),typeof Ae.wasm.trace!="boolean"&&(Ae.wasm.trace=!1),typeof Ae.wasm.numThreads!="number"||!Number.isInteger(Ae.wasm.numThreads)||Ae.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)Ae.wasm.numThreads=1;else{let t=typeof navigator>"u"?Im("node:os").cpus().length:navigator.hardwareConcurrency;Ae.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},En=class{async init(e){An(),await yh(),await bh(e)}async createInferenceSessionHandler(e,t){let r=new kh;return await r.loadModel(e,t),r}},Eh=new En});rt(),rt(),rt();var Fg="1.29.0";{let e=(Hg(),$r(Ah)).wasmBackend;fr("webgpu",e,5),fr("webnn",e,5),fr("cpu",e,10),fr("wasm",e,10)}Object.defineProperty(Ae.versions,"web",{value:Fg,enumerable:!0});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function jg(){if(typeof crypto<"u"&&typeof crypto.randomUUID=="function")return crypto.randomUUID();const e=()=>Math.floor(Math.random()*256),t=new Array(16).fill(0).map(e);t[6]=t[6]&15|64,t[8]=t[8]&63|128;const r=t.map(i=>i.toString(16).padStart(2,"0"));return`${r.slice(0,4).join("")}-${r.slice(4,6).join("")}-${r.slice(6,8).join("")}-${r.slice(8,10).join("")}-${r.slice(10,16).join("")}`}const yt=class yt{static async logSession(t){try{let i=(await ae.storage.local.get(yt.STORAGE_KEY))[yt.STORAGE_KEY]??[];i.push(t),i.length>15&&(i=i.slice(-15));for(let a=0;a<Math.max(0,i.length-3);a++)i[a].maskedImageBase64&&(i[a]={...i[a],maskedImageBase64:""});try{await ae.storage.local.set({[yt.STORAGE_KEY]:i})}catch(a){console.warn("[SessionLogger] Storage quota exceeded, trimming sessions:",a),i=i.slice(-3).map(n=>({...n,maskedImageBase64:""})),await ae.storage.local.set({[yt.STORAGE_KEY]:i})}}catch(r){console.warn("[SessionLogger] Could not append session to storage:",r)}}static async getSessions(){try{return(await ae.storage.local.get(yt.STORAGE_KEY))[yt.STORAGE_KEY]??[]}catch{return[]}}static async clear(){try{await ae.storage.local.remove(yt.STORAGE_KEY)}catch{}}};is(yt,"STORAGE_KEY","agent_sessions");let In=yt;function Kg(e,t){const r=e[0]+e[2],i=e[1]+e[3],a=t[0]+t[2],n=t[1]+t[3],s=Math.max(0,Math.min(r,a)-Math.max(e[0],t[0])),u=Math.max(0,Math.min(i,n)-Math.max(e[1],t[1])),l=s*u,d=e[2]*e[3],h=t[2]*t[3],p=d+h-l;return p>0?l/p:0}function Zg(e,t=.45){if(e.length===0)return[];const r=e.map((n,s)=>s);r.sort((n,s)=>e[s][4]-e[n][4]);const i=[],a=new Set;for(const n of r)if(!a.has(n)){i.push(n);for(const s of r)s===n||a.has(s)||Kg(e[n],e[s])>t&&a.add(s)}return i}function Yg(e){const{width:t,height:r,data:i}=e,a=new Float32Array(3*t*r),n=t*r;for(let s=0;s<n;s++){const u=i[s*4]/255,l=i[s*4+1]/255,d=i[s*4+2]/255;a[s]=u,a[n+s]=l,a[2*n+s]=d}return a}function Xg(e,t,r){return e&&r>=8&&t>=6?{tier:"TIER_1_HIGH",hasWebGPU:!0,cores:t,memoryGB:r,executionProviders:["webgpu","wasm"],numThreads:Math.min(4,Math.max(1,t-1)),label:"Tier 1: High-Capacity Workstation (WebGPU Active)",badge:"TIER 1 (WebGPU)"}:r>=4&&t>=4?{tier:"TIER_2_MID",hasWebGPU:e,cores:t,memoryGB:r,executionProviders:e?["webgpu","wasm"]:["wasm"],numThreads:Math.min(4,Math.max(1,t-1)),label:"Tier 2: Standard Balanced (WASM Multi-Thread)",badge:e?"TIER 2 (WebGPU Hybrid)":"TIER 2 (WASM SIMD)"}:{tier:"TIER_3_LOW",hasWebGPU:!1,cores:t,memoryGB:r,executionProviders:["wasm"],numThreads:1,label:"Tier 3: Resource-Constrained (WASM Lite Single-Thread)",badge:"TIER 3 (WASM Lite)"}}let Pr=null;async function Qg(){if(Pr)return Pr;let e=!1,t=4,r=8;if(typeof navigator<"u"){t=navigator.hardwareConcurrency||4;const i=navigator.deviceMemory;typeof i=="number"&&i>0&&(r=i)}if(typeof navigator<"u"&&"gpu"in navigator&&navigator.gpu)try{const i=navigator.gpu.requestAdapter(),a=new Promise(s=>setTimeout(()=>s(null),500)),n=await Promise.race([i,a]);e=n!=null}catch{e=!1}return Pr=Xg(e,t,r),console.log("[hardwareTier] Profile detected:",Pr.label,`(WebGPU: ${e}, RAM: ${r}GB, Cores: ${t})`),Pr}const Cn=ae.runtime.getURL("/onnx/ui_detector.onnx"),Ih=["button","input","link","image","dropdown","option","checkbox_radio","tab"],Jg=.4,ey=.45,gt=640,ty=8400;let zn=null,bi=null,wi="degraded";async function ry(){return zn||bi||(bi=(async()=>{try{const e=await fetch(Cn);if(!e.ok)throw new Error(`Model fetch failed with status ${e.status}`);const t=await e.arrayBuffer(),r=await Qg();Ae.wasm.numThreads=r.numThreads;const i=await Gi.create(t,{executionProviders:r.executionProviders,graphOptimizationLevel:"all"});return zn=i,wi="live",console.log(`[onnxEngine] Session created successfully with ${r.badge} (${r.executionProviders.join(", ")})`),i}catch(e){return wi="degraded",console.warn("[onnxEngine] Session creation failed (degraded):",e instanceof Error?e.message:e),null}})(),bi)}async function iy(e){if(!e||typeof e!="string"||e.trim().length===0)throw new Error("decodeBase64ToImageData: Invalid or empty base64 string");const t=e.replace(/^data:image\/\w+;base64,/,"");if(!t||t.trim().length===0)throw new Error("decodeBase64ToImageData: Empty base64 payload");let r;try{r=atob(t)}catch(p){throw new Error(`decodeBase64ToImageData: Failed to decode base64: ${p instanceof Error?p.message:String(p)}`)}const i=new Uint8Array(r.length);for(let p=0;p<r.length;p++)i[p]=r.charCodeAt(p);const a=new Blob([i],{type:"image/png"});let n;try{n=await createImageBitmap(a)}catch(p){throw new Error(`decodeBase64ToImageData: Failed to create ImageBitmap from blob: ${p instanceof Error?p.message:String(p)}`)}const s=n.width,u=n.height,d=new OffscreenCanvas(s,u).getContext("2d");if(!d)throw n.close(),new Error("Failed to get 2D context from OffscreenCanvas");return d.drawImage(n,0,0),n.close(),{imageData:d.getImageData(0,0,s,u),width:s,height:u}}async function ay(e){const{imageData:t,width:r,height:i}=await iy(e),n=new OffscreenCanvas(gt,gt).getContext("2d");if(!n)throw new Error("Failed to get 2D context");const s=new OffscreenCanvas(r,i),u=s.getContext("2d");if(!u)throw new Error("Failed to get temp 2D context");u.putImageData(t,0,0),n.drawImage(s,0,0,gt,gt);const l=n.getImageData(0,0,gt,gt);return{tensor:Yg(l),origWidth:r,origHeight:i}}function ny(e,t,r,i){const a=Ih.length,n=4+a,s=ty;let u=!0;i&&i.length>=3&&(i[1]===n&&i[2]===s?u=!0:i[1]===s&&i[2]===n&&(u=!1));const l=[];for(let b=0;b<s;b++){const y=u?e[0*s+b]:e[b*n+0],_=u?e[1*s+b]:e[b*n+1],T=u?e[2*s+b]:e[b*n+2],v=u?e[3*s+b]:e[b*n+3];let $=0,k=0;for(let S=0;S<a;S++){const C=u?e[(4+S)*s+b]:e[b*n+4+S];C>$&&($=C,k=S)}if($<Jg)continue;const A=y-T/2,I=_-v/2;l.push([A,I,T,v,$,k])}if(l.length===0)return[];const d=Zg(l,ey),h=t/gt,p=r/gt,m=[];for(const b of d){const[y,_,T,v,$,k]=l[b];m.push({type:"ui_element",className:Ih[k],confidence:$,bbox:[y*h,_*p,T*h,v*p]})}return m}async function sy(e){if(!e||typeof e!="string"||e.trim().length===0)return[];const t=Date.now();try{const r=await ry();if(!r)return[];const{tensor:i,origWidth:a,origHeight:n}=await ay(e),s=r.inputNames[0],u=r.outputNames[0],l=new at("float32",i,[1,3,gt,gt]),d={};d[s]=l;const p=(await r.run(d))[u],m=p.data,b=ny(m,a,n,p.dims),y=Date.now()-t;return console.log(`[onnxEngine] Detected ${b.length} UI elements in ${y}ms`),b}catch(r){return wi="degraded",console.warn("[onnxEngine] detectUIElements failed (degraded):",r instanceof Error?r.message:r),[]}}function oy(){return wi}async function uy(){console.log("[onnxEngine] Checking:",Cn);try{const e=await fetch(Cn,{method:"GET",headers:{Range:"bytes=0-0"}});return console.log("[onnxEngine] Response status:",e.status),e.ok||e.status===206}catch(e){return console.error("[onnxEngine] Availability check failed:",e instanceof Error?e.message:e),!1}}const Ch=ae.runtime.getURL("/onnx/ocr_det.onnx"),zh=ae.runtime.getURL("/onnx/ocr_rec.onnx");let ly="degraded";function dy(){return ly}async function cy(){try{const e=ae.runtime.getURL("/onnx/ocr_dict.txt");console.log("[ocrEngine] Checking Sovereign OCR models:",Ch,zh,e);const[t,r,i]=await Promise.all([fetch(Ch,{method:"GET",headers:{Range:"bytes=0-0"}}),fetch(zh,{method:"GET",headers:{Range:"bytes=0-0"}}),fetch(e,{method:"GET",headers:{Range:"bytes=0-0"}})]),a=(t.ok||t.status===206)&&(r.ok||r.status===206)&&(i.ok||i.status===206);return console.log("[ocrEngine] Sovereign models available:",a,`(det=${t.status}, rec=${r.status}, dict=${i.status})`),a}catch(e){return console.warn("[ocrEngine] Sovereign OCR check failed:",e instanceof Error?e.message:e),!1}}Ae.wasm.numThreads=1,console.log("🛰 Background script initialized");const On="http://localhost:3000/api/step",py="141207",Ke=35,hy=2500;let Ur=!1;console.log("🌐 SERVER_URL:",On);const Lr={apiCalls:0,totalPayloadSent:0,lastLatency:0,loopStatus:"Idle"};let Oh=0;const Lt={ui:"degraded",face:"degraded",ocr:"degraded",lastInferenceMs:0};let fy=!1;async function my(){const e=ae.runtime.getURL("/mediapipe/face_landmarker.task");console.log("[background] Checking Face model:",e);try{const t=await fetch(e,{method:"GET",headers:{Range:"bytes=0-0"}});return console.log("[background] Face model response status:",t.status),t.ok||t.status===206}catch(t){return console.error("[background] Face availability check failed:",t instanceof Error?t.message:t),!1}}function gy(){return Lt.ui=oy(),Lt.ocr=dy(),Lt.lastInferenceMs=Oh,Lt}async function Rn(){console.log("[background] Running model availability checks...");try{const[e,t,r]=await Promise.all([uy(),my(),cy()]);e&&(Lt.ui="live"),t&&(Lt.face="live"),r&&(Lt.ocr="live"),fy=!0,console.log("[background] Results - UI:",e,"Face:",t,"OCR:",r),console.log("[background] modelStatus after check:",JSON.stringify(Lt))}catch(e){console.error("[background] Availability check error:",e instanceof Error?e.message:e)}}function Ye(e){Lr.loopStatus=e}function yy(e,t){const r=((e==null?void 0:e.length)??0)+((t==null?void 0:t.length)??0);Lr.totalPayloadSent+=r/1024}async function dr(e){return new Promise(t=>setTimeout(t,e))}function se(e){try{ae.runtime.sendMessage(e)}catch(t){console.warn("Failed to send runtime message (popup may be closed):",t instanceof Error?t.message:t)}}async function by(e,t,r="",i=[],a=null,n,s,u,l,d,h){console.log("🌐 Sending request to:",On);try{const p=new AbortController,m=setTimeout(()=>p.abort(),35e3),b=await fetch(On,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json","x-secret-password":py},body:JSON.stringify({task:e,maskedDom:t,redactedImage:r,redaction_legend:i,scratchpad:a,sessionId:n,step:s,rawImage:u,vlmImage:h||r||u,subTasks:l,actionHistory:d}),signal:p.signal});if(clearTimeout(m),!b.ok){let y=`Server responded with status ${b.status}`;try{const _=await b.json();_&&_.error&&(y=`${y}: ${_.error}`)}catch{}throw new Error(y)}return b.json()}catch(p){const m=p instanceof Error?p.name:"Unknown",b=p instanceof Error?p.message:String(p),y=p instanceof Error&&p.message.match(/status (\d+)/)?RegExp.$1:"N/A";throw console.error(`❌ SERVER ERROR — name: ${m}, message: ${b}, httpStatus: ${y}`),p}}async function wy(e){try{return await sy(e)}catch(t){return console.warn("Local UI vision degraded:",t instanceof Error?t.message:t),[]}}function Rh(e){return e?e.startsWith("chrome://")||e.startsWith("chrome-extension://")||e.startsWith("edge://")||e.startsWith("about:")||e.includes("chromewebstore.google.com")||e.includes("chrome.google.com/webstore"):!0}async function _i(e,t=5){for(let r=0;r<t;r++){try{const i=await ae.tabs.sendMessage(e,{type:"PING"});if(i&&i.success)return!0}catch{}try{await ae.scripting.executeScript({target:{tabId:e},files:["content-scripts/content.js"]})}catch{}await dr(400)}try{const r=await ae.tabs.sendMessage(e,{type:"PING"});return!!(r&&r.success)}catch{return!1}}async function qr(e,t=8e3){const r=Date.now();for(;Date.now()-r<t;){try{if((await ae.tabs.get(e)).status==="complete")break}catch{}await dr(300)}return await _i(e,4)}function Mh(e,t,r,i){var a,n;if(r==="back")return"Search Results Catalog";if(r==="scroll")return i==="up"?"Scroll Up":"Scroll Down Page";if(r==="done")return"Mission Accomplished";if((r==="select"||r==="choose")&&i&&typeof i=="string")return`"${i.trim()}" in dropdown (${e||"select"})`;if(!e)return"Active Page";if(typeof e=="string"){const s=e.replace(/^#/,"");if(s.startsWith("agent-")){const u=s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`\\[${u}\\][^
<]*<([a-zA-Z0-9]+)[^>]*>([^<
\r]{2,80})`,"i"),d=t.match(l);if(d&&((a=d[2])!=null&&a.trim())){const m=d[2].trim().replace(/\s+/g," ");if(m.length>0&&!m.startsWith("<"))return m.length>45?`"${m.slice(0,42)}..."`:`"${m}"`}const h=new RegExp(`\\[${u}\\][^
]*?(?:placeholder|aria-label|title)="([^"\r
]{2,60})"`,"i"),p=t.match(h);if(p&&((n=p[1])!=null&&n.trim())){const m=p[1].trim();return m.length>45?`"${m.slice(0,42)}..."`:`"${m}"`}return`#${s}`}}return e}function _y(e){const t=e.toLowerCase(),i=["amazon.","flipkart.","myntra.","walmart.","ebay.","bestbuy.","aliexpress.","target.","ajio.","meesho."].some(p=>t.includes(p)),n=["under ₹","under rs","under $","buy ","purchase","shoes","smartphone","phone under","laptop under","cheapest","best price","discount","rating >","stars & up","add to cart"].some(p=>t.includes(p)),s=["linkedin","twitter","x.com","tweet","mail.","gmail","outlook","hostinger","send email","send an email","compose","draft email","write email","google sheet","google doc","sheets.new","docs.new","notion","spreadsheet","post on","create post","write post","write a post","share a post","publish","submit form","fill form","sign up","register","apply now","create an account","new sheet","new doc","reply to","comment on","send message","direct message","shortlist","participate"],u=s.some(p=>h(t,s)),l=["sih","problem statement","research","search for","find details","gather details","scrape","extract","list all","find information","wikipedia","news","articles","bulletin","portal","results for","look up","lookup","what is","who is"],d=l.some(p=>h(t,l));function h(p,m){return m.some(b=>p.includes(b))}return i||n&&!u?"shopping":u?"workflow":d?"info":"workflow"}function $y(e,t){const r=e.toLowerCase(),i=(t||"").toLowerCase(),a=[{triggers:["linkedin.com","linkedin"],url:"https://www.linkedin.com",hostMatch:"linkedin.com"},{triggers:["twitter.com","x.com","twitter"],url:"https://twitter.com",hostMatch:"x.com"},{triggers:["github.com","github"],url:"https://github.com",hostMatch:"github.com"},{triggers:["amazon.in","amazon.com","amazon"],url:"https://www.amazon.in",hostMatch:"amazon."},{triggers:["flipkart.com","flipkart"],url:"https://www.flipkart.com",hostMatch:"flipkart.com"},{triggers:["gmail.com","gmail","mail.google.com"],url:"https://mail.google.com",hostMatch:"mail.google.com"},{triggers:["sih.gov.in","sih portal","sih"],url:"https://sih.gov.in",hostMatch:"sih.gov.in"},{triggers:["bhuvan.nrsc.gov.in","isro bhuvan","bhuvan thematic","bhuvan"],url:"https://bhuvan.nrsc.gov.in",hostMatch:"bhuvan"},{triggers:["bhoonidhi.nrsc.gov.in","bhoonidhi"],url:"https://bhoonidhi.nrsc.gov.in",hostMatch:"bhoonidhi"},{triggers:["mosdac.gov.in","mosdac"],url:"https://www.mosdac.gov.in",hostMatch:"mosdac"},{triggers:["vedas.sac.gov.in","vedas"],url:"https://vedas.sac.gov.in",hostMatch:"vedas"},{triggers:["isro.gov.in","isro portal","isro website"],url:"https://www.isro.gov.in",hostMatch:"isro.gov.in"},{triggers:["youtube.com","youtube"],url:"https://www.youtube.com",hostMatch:"youtube.com"},{triggers:["reddit.com","reddit"],url:"https://www.reddit.com",hostMatch:"reddit.com"}],n=/^(?:go to|open|navigate to|visit|browse to|launch)\s+/i.test(r),s=!i||i.includes("google.com")||i.includes("google.co")||i.includes("bing.com")||i.includes("duckduckgo.com")||i.includes("newtab")||i.includes("chrome://")||i==="about:blank";for(const l of a)if(l.triggers.some(h=>r.includes(h))){if(i.includes(l.hostMatch))return null;if(n||s)return l.url}const u=r.match(/\b(?:https?:\/\/)?([a-z0-9-]+\.[a-z]{2,}(?:\/[^\s]*)?)\b/i);if(u&&(n||s)){const l=u[0];return l.startsWith("http")?l:`https://${l}`}return null}function qt(e){var d,h;let t=0,r=0,i=0;const a=[];let n="",s=0,u=0,l=!1;if(e&&typeof e=="object"){const p=e;if(Array.isArray(p.evaluatedCandidates)){t=p.evaluatedCandidates.length;for(const m of p.evaluatedCandidates)m.verdict==="rejected"?(r++,m.rejectionReason&&a.push(m.rejectionReason)):m.verdict==="candidate_matched"&&i++}if(Array.isArray(p.extractedItems)&&(t=Math.max(t,p.extractedItems.length),i=Math.max(i,p.extractedItems.length)),Array.isArray(p.milestones)){u=p.milestones.length,s=p.milestones.filter(b=>b.status==="completed").length;const m=p.milestones.find(b=>b.status==="in_progress");m&&m.name&&(n=m.name)}((d=p.verificationGate)!=null&&d.satisfied||(h=p.workflowGate)!=null&&h.actionConfirmed)&&(l=!0,i=Math.max(i,1))}return{evaluatedCount:t,rejectedCount:r,matchedCount:i,rejectionReasons:a,activeMilestone:n,completedMilestonesCount:s,totalMilestonesCount:u,isGoalVerified:l}}async function vy(e,t){var M,j,X,J,de,H,pe,q,Y,ee,W;console.log("🚀 runAgentLoop started");const r=jg();let i=Date.now();const a=[];let n=[];const s=async(K,qe)=>{const be={sessionId:r,timestamp:i,userPrompt:e,subTasks:a,maskedDomText:K,maskedImageBase64:qe,returnedActions:n};await In.logSession(be)};let u=null;if(typeof((M=ae==null?void 0:ae.tabs)==null?void 0:M.get)=="function")try{const K=await ae.tabs.get(t);u=$y(e,K==null?void 0:K.url);const qe=Rh(K==null?void 0:K.url),be=(j=K==null?void 0:K.url)==null?void 0:j.includes("dashboard.html");if(u){if(se({type:"LOG_UPDATE",payload:`🌐 Destination detected: Navigating directly to ${u}...`}),be&&typeof((X=ae==null?void 0:ae.tabs)==null?void 0:X.create)=="function"){const ze=await ae.tabs.create({url:u,active:!0});ze&&ze.id&&(t=ze.id)}else typeof((J=ae==null?void 0:ae.tabs)==null?void 0:J.update)=="function"&&await ae.tabs.update(t,{url:u});n.push({type:"navigate",value:u}),await qr(t,1e4),await dr(1500)}else if(qe){if(se({type:"LOG_UPDATE",payload:"🚀 Homepage/New Tab detected. Auto-launching search gateway to start mission..."}),be&&typeof((de=ae==null?void 0:ae.tabs)==null?void 0:de.create)=="function"){const ze=await ae.tabs.create({url:"https://www.google.com",active:!0});ze&&ze.id&&(t=ze.id)}else typeof((H=ae==null?void 0:ae.tabs)==null?void 0:H.update)=="function"&&await ae.tabs.update(t,{url:"https://www.google.com"});await qr(t,1e4)}}catch(K){console.warn("[background] Tab setup / destination check error:",K)}if(se({type:"LOG_UPDATE",payload:"Checking content script injection..."}),!await _i(t)){se({type:"LOG_UPDATE",payload:"Failed to inject content script. Make sure the tab is a normal web page (not chrome:// or a store page)."}),Ye("Idle");return}se({type:"LOG_UPDATE",payload:"Content script ready."});let h=_y(e);const p=new Map;let m=0,b="",y=null,_="",T="",v=0,$=0,k=0,A=null;const I=[];let S="",C="",w=-1;const R={contentTyped:!1,typedContentSnippet:"",submissionInitiated:!1,submissionStep:-1,submissionButtonLabel:""};let P="",V=!1,F=!1,U=1;Ur=!1,se({type:"AGENT_STATUS",payload:{isRunning:!0}});try{await ae.tabs.sendMessage(t,{type:"SHOW_SHIELD",payload:{active:!0}})}catch{}u&&se({type:"AGENT_ACTIVITY",payload:{step:1,maxSteps:Ke,phase:"Executing",thought:`Navigated directly to destination from task: ${u}`,action:"navigate",targetLabel:u,value:u,statusText:`Navigated directly to ${u}`,taskMode:h,actionCount:1,...qt(y)}});try{for(let K=1;K<=Ke;K++){if(U=K,Ur){se({type:"LOG_UPDATE",payload:"🛑 Agent stopped by user."});break}try{if(!await ae.tabs.get(t)){se({type:"LOG_UPDATE",payload:"Target tab was closed. Aborting agent loop."});break}}catch{se({type:"LOG_UPDATE",payload:"Target tab was closed. Aborting agent loop."});break}Ye("Scanning");const qe=qt(y);se({type:"AGENT_ACTIVITY",payload:{step:K,maxSteps:Ke,phase:"Scanning",thought:P,statusText:`Step ${K}/${Ke}: Scanning DOM structure & visual frame...`,taskMode:h,actionCount:n.length,...qe}}),se({type:"LOG_UPDATE",payload:`Step ${K}: Scanning DOM & capturing screen...`});let be="",ze=!1;for(let G=0;G<3;G++)try{const fe=await ae.tabs.sendMessage(t,{type:"GET_DOM"});if(fe&&fe.success&&fe.data){be=JSON.parse(fe.data).maskedText||"",_=be,ze=!0;break}}catch{await _i(t,2),await dr(500)}if(!ze){se({type:"LOG_UPDATE",payload:`Step ${K}: Reconnecting to page...`}),await qr(t);continue}const Ge=be.length+"_"+(be.match(/value="[^"]"/g)||[]).length;if(Ge===b&&Ge!=="0_0"){if(m++,m>=12){se({type:"LOG_UPDATE",payload:"Agent paused: Page unchanged for 12 consecutive steps. Ending run."});break}}else m=0,p.clear();b=Ge;const Be=be.toLowerCase(),He=["post successful","view post","post published","your post was shared","your post was sent","your tweet was sent","message sent","your message has been sent","email sent successfully","response has been recorded","form submitted successfully","thank you for your submission","submission confirmed","submission received"].some(G=>Be.includes(G)),bt=(Be.includes("start a post")||Be.includes("compose")||Be.includes("new tweet"))&&!Be.includes('contenteditable="true"')&&!Be.includes("share your thoughts"),oe=(R.contentTyped||S.length>15)&&(R.submissionInitiated||C&&w>0||K>=4&&S.length>30);if(h==="workflow"&&oe&&(He||bt||K>(R.submissionStep>0?R.submissionStep:w))){const G=R.submissionButtonLabel||"Post";console.log(`✅ [Universal Workflow Pre-Flight Terminator] Submission confirmed on page (${G}). Concluding mission.`),se({type:"LOG_UPDATE",payload:`✅ Universal Workflow Complete: ${G} submitted and confirmed on page. Mission accomplished!`});const fe="Workflow Executed & Verified",$e="Workflow action executed successfully!",ge=`Workflow successfully executed: Content submitted via ${G} and confirmed on page.`;se({type:"AGENT_ACTIVITY",payload:{step:K,maxSteps:Ke,phase:"Complete",thought:`Workflow submission verified on page (${G}). Concluding mission.`,action:"done",targetLabel:fe,statusText:$e,summary:ge,taskMode:h,actionCount:n.length,...qt(y)}}),V=!0,F=!0,n.push({type:"done"}),await s(_,T),Ye("Idle"),se({type:"AGENT_STATUS",payload:{isRunning:!1}});try{await ae.tabs.update(t,{active:!0}),await ae.tabs.sendMessage(t,{type:"SHOW_SHIELD",payload:{active:!1}})}catch{}break}Ye("Redacting"),se({type:"AGENT_ACTIVITY",payload:{step:K,maxSteps:Ke,phase:"Redacting",thought:P,statusText:`Step ${K}/${Ke}: Shielding sensitive data locally in enclave...`,...qt(y)}});let We="",et="",Gt=[];try{const G=await Promise.race([ae.tabs.sendMessage(t,{type:"GET_SCREENSHOT"}),new Promise(fe=>setTimeout(()=>fe(null),12e3))]);G&&G.success&&G.image&&(et=G.image.replace(/^data:image\/\w+;base64,/,""),G.rawImage&&(We=G.rawImage.replace(/^data:image\/\w+;base64,/,"")),Gt=G.legend||[],T=et)}catch(G){console.warn("Content script GET_SCREENSHOT error:",G)}if(!We&&typeof((pe=ae==null?void 0:ae.tabs)==null?void 0:pe.captureVisibleTab)=="function")try{const G=await ae.tabs.captureVisibleTab(null,{format:"jpeg",quality:70});G&&(We=G.replace(/^data:image\/\w+;base64,/,""),console.log(`📸 [Bulletproof Capture] Fallback direct capture succeeded for Step ${K}`))}catch(G){console.warn("[Bulletproof Capture] Direct captureVisibleTab fallback failed:",G)}et||(se({type:"LOG_UPDATE",payload:`Step ${K}: Visual frame unavailable or timed out. Proceeding with DOM-first perception.`}),et="",T="");const wt=et||"";let zt=[];try{const G=Date.now();zt=await wy(et),Oh=Date.now()-G,zt.length>0&&se({type:"LOG_UPDATE",payload:`Local CV processed. Detected ${zt.length} UI element(s).`})}catch{}Ye("Thinking"),se({type:"AGENT_ACTIVITY",payload:{step:K,maxSteps:Ke,phase:"Thinking",thought:P,statusText:`Step ${K}/${Ke}: Zero-trust reasoning & decision in progress...`,...qt(y)}}),se({type:"LOG_UPDATE",payload:`Step ${K}: PII redacted locally. Querying hybrid VLM...`});let z;try{const G=Date.now();z=await by(e,be,et,Gt,y,r,K,We,a,I.slice(-8),wt),Lr.lastLatency=Date.now()-G,Lr.apiCalls+=1,yy(be,et)}catch(G){const fe=G instanceof Error?G.message:"Unknown error";se({type:"LOG_UPDATE",payload:`Step ${K}: Server connection failed (${fe}). Aborting loop.`});break}if(z){if(!z.selector&&z.target&&(z.selector=String(z.target)),!z.id&&typeof z.selector=="string"){const G=z.selector.match(/data-agent-id=['"]([^'"]+)['"]/);G?z.id=G[1]:(z.selector.startsWith("agent-")||z.selector.startsWith("R"))&&(z.id=z.selector)}if(z.value||(typeof z.text=="string"?z.value=z.text:typeof z.url=="string"?z.value=z.url:typeof z.query=="string"&&(z.value=z.query)),z.action==="navigate"&&!z.value&&z.url&&(z.value=z.url),z.action==="type"&&typeof z.value=="string"){const G=z.value.trim().replace(/[\r\n]+$/,"");(/^https?:\/\/[^\s]+$/i.test(G)||/^(?:www\.)[a-z0-9-]+(?:\.[a-z0-9-]+)+(?:\/[^\s]*)?$/i.test(G))&&(console.log(`🌐 [Auto-Navigate] Converting action: 'type' with URL "${G}" into action: 'navigate'`),se({type:"LOG_UPDATE",payload:`🌐 Auto-Navigating directly to ${G} instead of typing URL into input.`}),z.action="navigate",z.value=G.startsWith("http")?G:`https://${G}`,delete z.id,delete z.selector)}z.thought&&(P=z.thought),z.taskMode&&typeof z.taskMode=="string"&&(h=z.taskMode),z.updatedScratchpad&&(y=z.updatedScratchpad,se({type:"SCRATCHPAD_UPDATE",payload:y}))}const Te=qt(y);if(h==="workflow"&&(R.submissionInitiated||C&&w>0)){const G=R.submissionStep>0?R.submissionStep:w,fe=Mh(z.id||z.selector,be,z.action,z.value),$e=`${z.selector||""} ${z.id||""} ${fe} ${z.thought||""} ${typeof z.value=="string"?z.value:""}`.toLowerCase(),ge=["start a post","create a post","write a post","compose","new post","new tweet","new message","start writing","share-box","feed-shared-creator","share-box-feed-entry"].some(Fe=>$e.includes(Fe)),pt=z.action==="type",Me=z.action==="click"&&["post","send","submit","publish","tweet","share-actions"].some(Fe=>$e.includes(Fe));if(!(Te.totalMilestonesCount>1&&Te.completedMilestonesCount<Te.totalMilestonesCount&&Te.activeMilestone&&!Te.activeMilestone.toLowerCase().includes("post")&&!Te.activeMilestone.toLowerCase().includes("send")&&!Te.activeMilestone.toLowerCase().includes("submit")&&!Te.activeMilestone.toLowerCase().includes("compose")&&!Te.activeMilestone.toLowerCase().includes("verify"))&&(ge||pt||Me||K>G)){const Fe=R.submissionButtonLabel||"Post";console.log(`✅ [Universal Workflow Guard] Workflow submission verified (${Fe}). Overriding to action: "done".`),se({type:"LOG_UPDATE",payload:`✅ Workflow Complete: ${Fe} submitted and verified successfully. Concluding mission.`}),z.action="done",z.summary=`Workflow successfully executed: Content submitted via ${Fe} and confirmed on page.`,delete z.id,delete z.selector,delete z.value}}h==="shopping"&&z.action==="type"&&typeof z.value=="string"&&(z.value.includes(`
`)||v>=1)&&v++;const Gr=h==="shopping"&&Te.rejectedCount>0&&(!Te.activeMilestone||!Te.activeMilestone.toLowerCase().includes("navigate")&&!Te.activeMilestone.toLowerCase().includes("query")&&!Te.activeMilestone.toLowerCase().includes("search/filter"));let Wr=!1;if(Gr&&z.action==="type"){const G=z.id||z.selector&&((q=z.selector.match(/data-agent-id=['"]([^'"]+)['"]/))==null?void 0:q[1]);if(G){const fe=G.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),$e=be.match(new RegExp(`\\[${fe}\\]([^
\r]+)`,"i"));if($e){const ge=$e[1].toLowerCase(),pt=ge.includes('role="dialog"')||ge.includes('role="textbox"')||ge.includes("contenteditable")||ge.includes("ql-editor")||ge.includes("prosemirror")||ge.includes("drafteditor");Wr=(ge.includes('type="search"')||ge.includes('role="search"')||ge.includes('name="q"')||ge.includes('name="field-keywords"')||ge.includes("twotabsearchtextbox")||ge.includes("search-input")||ge.includes('placeholder="search'))&&!pt}}}h==="shopping"&&Gr&&Wr&&(A==null?void 0:A.type)==="click"&&z.action==="type"&&typeof z.value=="string"&&z.value.length>2&&(console.log('🔄 [LoopGuard] Intercepted redundant search on product page. Overriding to "back" action to return to search catalog.'),se({type:"LOG_UPDATE",payload:"🔄 Anti-Loop Guard: Product rejected — backtracking to search catalog instead of re-searching."}),z.action="back",delete z.id,delete z.selector,delete z.value);const _t=z.id||z.selector||"",tt={action:z.action,target:_t,value:typeof z.value=="string"?z.value.slice(0,30):""};if(I.length>=2){const G=I[I.length-1],fe=I[I.length-2];if(G.action===tt.action&&G.target===tt.target&&G.value===tt.value&&fe.action===tt.action&&fe.target===tt.target&&fe.value===tt.value)if(se({type:"LOG_UPDATE",payload:`⚠ Anti-Loop Guard: Stutter detected on ${tt.action} (${tt.target||tt.value}). Breaking repetition...`}),h==="workflow")se({type:"LOG_UPDATE",payload:`✅ Workflow Stutter Breaker: Concluding repeated action on "${tt.action}". Mission complete.`}),z.action="done",z.summary=`Workflow action concluded after repeated execution on ${tt.target||"target"}.`,delete z.id,delete z.selector,delete z.value;else if(z.action==="type")try{const ge=await ae.tabs.sendMessage(t,{type:"GET_PROGRESSION_BUTTON"});ge&&ge.success&&ge.found&&(ge.id||ge.selector)?(se({type:"LOG_UPDATE",payload:`🎯 Progression Breaker: Found action button "${ge.label||"Submit"}". Progressing forward...`}),z.action="click",ge.id&&(z.id=ge.id),ge.selector&&(z.selector=ge.selector),delete z.value):(z.action="scroll",z.value="down",delete z.id,delete z.selector)}catch{z.action="scroll",z.value="down",delete z.id,delete z.selector}else z.action==="click"&&(z.action="scroll",z.value="down",delete z.id,delete z.selector)}if(h==="shopping"&&(K<10&&Te.matchedCount===0?(y&&typeof y=="object"&&(y.explorationDirective="CONTINUE EXPLORING: The top items on screen are sponsored ads or out of budget. Do NOT stop or declare saturation. Scroll down to inspect organic results or click sidebar filters (Price / Rating) to locate qualifying items."),z.action==="done"&&(se({type:"LOG_UPDATE",payload:`🛍 Catalog Guard: Premature exit intercepted (step ${K}/10, 0 matches). Scrolling down to inspect organic listings...`}),z.action="scroll",z.value="down",z.amount=800,delete z.id,delete z.selector)):K>=16&&(k>=2||$>=4)&&y&&typeof y=="object"&&(y.saturationDirective=`CANDIDATE SATURATION (${Te.evaluatedCount} evaluated): After thorough exploration across multiple scrolls/inspections, conclude with action 'done' and present your comparative summary of best alternatives.`)),h==="shopping"&&K>=22&&Te.evaluatedCount>=3&&z.action!=="done"&&(v>=3||$>=5||m>=2)){se({type:"LOG_UPDATE",payload:"🎯 Exploration threshold reached. Synthesizing comparative summary of evaluated options..."}),z.action="done";const G=(y==null?void 0:y.evaluatedCandidates)||[];z.summary=`Evaluated ${Te.evaluatedCount} candidate options against constraints. Comparative Summary:
`+G.map((fe,$e)=>`${$e+1}. ${fe.title||"Option"}: Price ${fe.price||"N/A"}, Rating ${fe.rating||"N/A"}${fe.rejectionReason?` (Note: ${fe.rejectionReason})`:" (Matched)"}`).join(`
`)+`

Recommendation: Evaluated top alternatives within budget.`}if(z.action==="done"){V=!0,U=K;let G="",fe=!1;if(h==="shopping"){if(y&&typeof y=="object"){const Me=y,Ve=Me.verificationGate||Me.matchedProduct||Me.selectedItem||Me.finalChoice;if(Ve&&typeof Ve=="object"){const Fe=Ve.matchedTitle||Ve.title||Ve.name||"",vi=Ve.matchedPrice||Ve.price||"",xi=Ve.matchedRating||Ve.rating||"",Ti=!Fe||Fe==="None"||Fe.toLowerCase().includes("none")||Fe.toLowerCase().includes("n/a");!Ti&&Ve.satisfied!==!1?(fe=!0,G=` Matched: ${[Fe,vi,xi].filter(Boolean).join(" | ")}`):Ti||(G=` Best Alternative: ${[Fe,vi,xi].filter(Boolean).join(" | ")}`)}}}else if(h==="workflow"){const Me=y;fe=!!((Y=Me==null?void 0:Me.workflowGate)!=null&&Y.actionConfirmed||Te.isGoalVerified)}else{const Me=y;fe=!!((ee=Me==null?void 0:Me.verificationGate)!=null&&ee.satisfied||Me!=null&&Me.extractedItems&&Me.extractedItems.length>0)}const $e=typeof z.summary=="string"&&z.summary.trim()?z.summary.trim():typeof z.value=="string"&&z.value.trim()?z.value.trim():G||(h==="workflow"?"Workflow action completed successfully.":"Mission completed successfully.");se(h==="workflow"?{type:"LOG_UPDATE",payload:`✅ Workflow Complete! ${$e.slice(0,140)}`}:h==="info"?{type:"LOG_UPDATE",payload:`📊 Research Complete! ${$e.slice(0,140)}`}:fe?{type:"LOG_UPDATE",payload:`✅ Task Complete!${G}`}:G?{type:"LOG_UPDATE",payload:`🎯 Exploration Concluded:${G}`}:{type:"LOG_UPDATE",payload:"🎯 Exploration Concluded: Evaluated available options."});const ge=h==="workflow"?"Workflow Executed & Verified":h==="info"?"Information Synthesized":fe?"Mission Goal Certified":"Catalog Options Evaluated",pt=h==="workflow"?"Workflow action executed successfully!":h==="info"?"Research and extraction completed.":fe?"Task completed successfully!":"Exploration completed. See evaluated options.";se({type:"AGENT_ACTIVITY",payload:{step:K,maxSteps:Ke,phase:"Complete",thought:z.thought||P,action:"done",targetLabel:ge,statusText:pt,summary:$e,taskMode:h,actionCount:n.length,...Te}}),V=!0,F=!0,n.push({type:"done"}),await s(_,T),Ye("Idle"),se({type:"AGENT_STATUS",payload:{isRunning:!1}});try{await ae.tabs.update(t,{active:!0}),await ae.tabs.sendMessage(t,{type:"SHOW_SHIELD",payload:{active:!1}})}catch{}break}const wr=z.selector||z.id||(typeof z.value=="string"?z.value.slice(0,30):"action"),$t=`${z.action}:${wr}`,Vr=p.get($t)||0;if(Vr>=2){se({type:"LOG_UPDATE",payload:`⚠ Target "${$t}" failed ${Vr} times consecutively. Skipping to allow alternative strategy.`});continue}if(z.action==="navigate"){if(F){console.log("[background] Task already completed; rejecting post-completion navigation.");break}let G=(typeof z.value=="string"?z.value.trim():"")||z.url||"";if(G.includes("google.com")&&(h==="workflow"||w>0||R.submissionInitiated)){console.log("[background] Guard: Rejecting navigation to google.com during workflow execution/completion.");continue}if(G){!G.startsWith("http://")&&!G.startsWith("https://")&&(G="https://"+G),Ye("Executing"),n.push({type:"navigate",value:G}),a.push(`navigate: ${G}`),se({type:"LOG_UPDATE",payload:`Step ${K}: Navigating to ${G}...`}),se({type:"AGENT_ACTIVITY",payload:{step:K,maxSteps:Ke,phase:"Executing",thought:z.thought||`Navigating to ${G}`,action:"navigate",targetLabel:G,value:G,statusText:`Step ${K}: Navigating to ${G}...`,taskMode:h,actionCount:n.length,...Te}}),m=0,b="";try{await ae.tabs.update(t,{url:G}),await qr(t),await dr(2e3),await _i(t)}catch(fe){console.warn("[background] Direct navigation error:",fe)}continue}}if(z.action==="click"||z.action==="select"||z.action==="zoom"||z.action==="type"||z.action==="navigate"||z.action==="scroll"||z.action==="back"){Ye("Executing"),n.push({type:z.action,selector:z.selector,id:z.id,value:z.value}),a.push(z.id??z.selector??(typeof z.value=="string"?z.value:"action"));const G=Mh(z.id||z.selector,be,z.action,z.value),fe=z.action==="back";if(se({type:"AGENT_ACTIVITY",payload:{step:K,maxSteps:Ke,phase:fe?"Backtracking":"Executing",thought:z.thought||P,action:z.action,targetLabel:G,value:z.value,statusText:fe?h==="shopping"?`Step ${K}: Backtracking to search catalog...`:`Step ${K}: Navigating back...`:`Step ${K}: Executing ${z.action} on ${G}`,taskMode:h,actionCount:n.length+1,...Te}}),se({type:"LOG_UPDATE",payload:`Step ${K}: Executing ${z.action} on ${G}`}),A={type:z.action,id:z.id,selector:z.selector,value:z.value},I.push({action:z.action,target:z.id||z.selector||"",value:typeof z.value=="string"?z.value.slice(0,30):""}),I.length>20&&I.shift(),z.action==="type"&&typeof z.value=="string")S=z.value.trim().replace(/[\r\n]+$/,""),S.length>15&&(R.contentTyped=!0,R.typedContentSnippet=S.slice(0,50)),!["post","compose","tweet","contenteditable","textbox","share-box","feed-shared"].some(ge=>`${z.selector||""} ${z.id||""}`.toLowerCase().includes(ge))&&(z.value.endsWith(`
`)||z.value.endsWith("\r"))&&S.length>15&&(C=S,w=K,R.submissionInitiated=!0,R.submissionStep=K,R.submissionButtonLabel="Enter");else if(z.action==="click"){const $e=`${z.selector||""} ${z.id||""} ${z.thought||""} ${G}`.toLowerCase(),pt=!["start a post","create a post","write a post","start writing","new post","compose","new tweet","new message","start a discussion"].some(Ve=>$e.includes(Ve))&&["send","post","submit","publish","reply","tweet","wds-ic-send","share-actions","send-filled"].some(Ve=>$e.includes(Ve)),Me=R.contentTyped||S.length>15;pt&&Me&&(C=S||R.typedContentSnippet,w=K,R.submissionInitiated=!0,R.submissionStep=K,R.submissionButtonLabel=G||"Post")}z.action==="scroll"?$++:z.action==="click"&&(Te.activeMilestone&&(Te.activeMilestone.toLowerCase().includes("inspect")||Te.activeMilestone.toLowerCase().includes("candidate")||Te.activeMilestone.toLowerCase().includes("spec"))||z.thought&&z.thought.toLowerCase().includes("candidate"))&&k++;try{const $e=await ae.tabs.sendMessage(t,{type:"EXECUTE_ACTION",payload:z}),ge=R.contentTyped||S.length>15;$e&&$e.isSubmitAction&&ge&&(R.submissionInitiated=!0,R.submissionStep=K,R.submissionButtonLabel=$e.buttonLabel||R.submissionButtonLabel||"Post"),$e&&$e.success===!1?(p.set($t,Vr+1),se({type:"LOG_UPDATE",payload:`⚠ Action notice: ${$e.error||"Failed"}.`}),y&&typeof y=="object"&&(y.lastExecutionFailure=`Action '${z.action}' on '${$t}' failed: ${$e.error}. Choose alternative element.`)):$e&&$e.success===!0&&(p.delete($t),y&&typeof y=="object"&&delete y.lastExecutionFailure)}catch($e){console.log("Action triggered navigation / page transition:",$e)}}const Wt=z.action==="select"||typeof z.selector=="string"&&(z.selector.includes("select")||z.selector.includes("theme")||z.selector.includes("state"))?600:350;await dr(Wt);try{await Promise.race([ae.tabs.sendMessage(t,{type:"WAIT_FOR_STABLE"}),new Promise(G=>setTimeout(()=>G(null),3500))])}catch{}try{const G=await ae.tabs.query({active:!0,currentWindow:!0});G&&((W=G[0])!=null&&W.id)&&G[0].id!==t&&G[0].openerTabId===t&&!Rh(G[0].url)&&(t=G[0].id,se({type:"LOG_UPDATE",payload:`Following child tab navigation (${t}).`}))}catch{}await qr(t),await dr(hy)}await s(_,T),Ye("Idle"),se({type:"AGENT_ACTIVITY",payload:{step:Ke,maxSteps:Ke,phase:"Complete",thought:P,statusText:"Agent execution finished.",...qt(y)}})}catch(K){se({type:"LOG_UPDATE",payload:`Agent loop error: ${K instanceof Error?K.message:"Unknown error"}`}),await s(_,T),Ye("Idle")}finally{se({type:"AGENT_STATUS",payload:{isRunning:!1}}),V||se({type:"AGENT_ACTIVITY",payload:{step:U,maxSteps:Ke,phase:Ur?"Aborted":"Idle",thought:P,statusText:Ur?"Agent stopped by user.":"Agent idle.",...qt(y)}});try{await ae.tabs.update(t,{active:!0}),await ae.tabs.sendMessage(t,{type:"SHOW_SHIELD",payload:{active:!1}})}catch{}}}const xy=Kt(()=>{var t,r;Rn();try{(t=chrome==null?void 0:chrome.sidePanel)!=null&&t.setPanelBehavior&&chrome.sidePanel.setPanelBehavior({openPanelOnActionClick:!0}).catch(i=>{console.warn("[background] sidePanel.setPanelBehavior error:",i)})}catch(i){console.warn("[background] sidePanel not available:",i)}let e=0;ae.runtime.onMessage.addListener((i,a,n)=>{if(console.log("📡 Received runtime message:",i),(i==null?void 0:i.type)==="GET_TELEMETRY")return Rn(),n(Lr),!1;if((i==null?void 0:i.type)==="GET_MODEL_STATUS")return(async()=>(await Rn(),n(gy())))(),!0;if(i.type==="CAPTURE_TAB"){const u=Date.now()-e,l=u<500?500-u:0;return setTimeout(async()=>{try{e=Date.now();const d=await ae.tabs.captureVisibleTab(null,{format:"jpeg",quality:70});n(d)}catch{setTimeout(async()=>{try{e=Date.now();const h=await ae.tabs.captureVisibleTab(null,{format:"jpeg",quality:70});n(h)}catch{n(null)}},600)}},l),!0}if(i.type==="STOP_AGENT")return Ur=!0,Ye("Idle"),ae.tabs.query({active:!0,currentWindow:!0}).then(s=>{var u;(u=s[0])!=null&&u.id&&ae.tabs.sendMessage(s[0].id,{type:"SHOW_SHIELD",payload:{active:!1}}).catch(()=>{})}).catch(()=>{}),n({success:!0}),!1;if(i.type==="START_AGENT"){const s=i.payload,u=i.targetTabId;return Ye("Scanning"),se({type:"LOG_UPDATE",payload:"Agent started..."}),n({success:!0}),(async()=>{var l;try{let d=u;if(!d){const h=await ae.tabs.query({active:!0,currentWindow:!0});h&&((l=h[0])!=null&&l.id)&&(d=h[0].id)}if(!d){se({type:"LOG_UPDATE",payload:"No target tab found"}),Ye("Idle"),se({type:"AGENT_STATUS",payload:{isRunning:!1}});return}try{await ae.tabs.update(d,{active:!0})}catch{}await vy(s,d)}catch{se({type:"LOG_UPDATE",payload:"Agent loop failed to start"}),Ye("Idle"),se({type:"AGENT_STATUS",payload:{isRunning:!1}})}})(),!1}return!1});try{(r=chrome==null?void 0:chrome.sidePanel)!=null&&r.setPanelBehavior&&chrome.sidePanel.setPanelBehavior({openPanelOnActionClick:!0}).catch(()=>{})}catch{}});function Ab(){}function $i(e,...t){}const Ty={debug:(...e)=>$i(console.debug,...e),log:(...e)=>$i(console.log,...e),warn:(...e)=>$i(console.warn,...e),error:(...e)=>$i(console.error,...e)};let Mn;try{Mn=xy.main(),Mn instanceof Promise&&console.warn("The background's main() function return a promise, but it must be synchronous")}catch(e){throw Ty.error("The background crashed on startup!"),e}return Mn})();
background;
