(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();var j,ne;class et extends Error{}et.prototype.name="InvalidTokenError";function As(r){return decodeURIComponent(atob(r).replace(/(.)/g,(t,e)=>{let s=e.charCodeAt(0).toString(16).toUpperCase();return s.length<2&&(s="0"+s),"%"+s}))}function ws(r){let t=r.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return As(t)}catch{return atob(t)}}function Es(r,t){if(typeof r!="string")throw new et("Invalid token specified: must be a string");t||(t={});const e=t.header===!0?0:1,s=r.split(".")[e];if(typeof s!="string")throw new et(`Invalid token specified: missing part #${e+1}`);let i;try{i=ws(s)}catch(n){throw new et(`Invalid token specified: invalid base64 for part #${e+1} (${n.message})`)}try{return JSON.parse(i)}catch(n){throw new et(`Invalid token specified: invalid json for part #${e+1} (${n.message})`)}}function xs(r,t){const e=Ne(t,r);return new Promise((s,i)=>{if(e){const n=e.localName;customElements.whenDefined(n).then(()=>s(e))}else i({context:t,reason:`No provider for this context "${t}:`})})}function Ne(r,t){const e=`[provides="${r}"]`;if(!t||t===document.getRootNode())return;const s=t.closest(e);if(s)return s;const i=t.getRootNode();if(i instanceof ShadowRoot)return Ne(r,i.host)}class Ss extends CustomEvent{constructor(t,e="mu:message"){super(e,{bubbles:!0,composed:!0,detail:t})}}function Me(r="mu:message"){return(t,...e)=>t.dispatchEvent(new Ss(e,r))}class Yt{constructor(t,e,s="service:message",i=!0){this._pending=[],this._context=e,this._update=t,this._eventType=s,this._running=i}attach(t){t.addEventListener(this._eventType,e=>{e.stopPropagation();const s=e.detail;this.consume(s)})}start(){this._running||(console.log(`Starting ${this._eventType} service`),this._running=!0,this._pending.forEach(t=>this.process(t)))}apply(t){this._context.apply(t)}consume(t){this._running?this.process(t):(console.log(`Queueing ${this._eventType} message`,t),this._pending.push(t))}process(t){console.log(`Processing ${this._eventType} message`,t);const e=this._update(t,this.apply.bind(this));e&&e(this._context.value)}}function Ps(r){return t=>({...t,...r})}const jt="mu:auth:jwt",Le=class He extends Yt{constructor(t,e){super((s,i)=>this.update(s,i),t,He.EVENT_TYPE),this._redirectForLogin=e}update(t,e){switch(t[0]){case"auth/signin":const{token:s,redirect:i}=t[1];return e(Os(s)),Nt(i);case"auth/signout":return e(Ts()),Nt(this._redirectForLogin);case"auth/redirect":return Nt(this._redirectForLogin,{next:window.location.href});default:const n=t[0];throw new Error(`Unhandled Auth message "${n}"`)}}};Le.EVENT_TYPE="auth:message";let ks=Le;const Cs=Me(ks.EVENT_TYPE);function Nt(r,t={}){if(!r)return;const e=window.location.href,s=new URL(r,e);return Object.entries(t).forEach(([i,n])=>s.searchParams.set(i,n)),()=>{console.log("Redirecting to ",r),window.location.assign(s)}}class _t{constructor(){this.authenticated=!1,this.username="anonymous"}static deauthenticate(t){return t.authenticated=!1,t.username="anonymous",localStorage.removeItem(jt),t}}class vt extends _t{constructor(t){super();const e=Es(t);console.log("Token payload",e),this.token=t,this.authenticated=!0,this.username=e.username}static authenticate(t){const e=new vt(t);return localStorage.setItem(jt,t),e}static authenticateFromLocalStorage(){const t=localStorage.getItem(jt);return t?vt.authenticate(t):new _t}}function Os(r){return Ps({user:vt.authenticate(r),token:r})}function Ts(){return r=>{const t=r.user;return{user:t&&t.authenticated?_t.deauthenticate(t):t,token:""}}}function Dt(r,t,e){const s=r.target,i=new CustomEvent(t,{bubbles:!0,composed:!0,detail:e});console.log(`Relaying event from ${r.type}:`,i),s.dispatchEvent(i),r.stopPropagation()}function oe(r,t="*"){return r.composedPath().find(s=>{const i=s;return i.tagName&&i.matches(t)})}function Ie(r,...t){const e=r.map((i,n)=>n?[t[n-1],i]:[i]).flat().join("");let s=new CSSStyleSheet;return s.replaceSync(e),s}const Rs=new DOMParser;function N(r,...t){const e=t.map(l),s=r.map((a,p)=>{if(p===0)return[a];const f=e[p-1];return f instanceof Node?[`<ins id="mu-html-${p-1}"></ins>`,a]:[f,a]}).flat().join(""),i=Rs.parseFromString(s,"text/html"),n=i.head.childElementCount?i.head.children:i.body.children,o=new DocumentFragment;return o.replaceChildren(...n),e.forEach((a,p)=>{if(a instanceof Node){const f=o.querySelector(`ins#mu-html-${p}`);if(f){const u=f.parentNode;u==null||u.replaceChild(a,f)}else console.log("Missing insertion point:",`ins#mu-html-${p}`)}}),o;function l(a,p){if(a===null)return"";switch(typeof a){case"string":return ae(a);case"bigint":case"boolean":case"number":case"symbol":return ae(a.toString());case"object":if(a instanceof Node||a instanceof DocumentFragment)return a;if(Array.isArray(a)){const f=new DocumentFragment,u=a.map(l);return f.replaceChildren(...u),f}return new Text(a.toString());default:return new Comment(`[invalid parameter of type "${typeof a}"]`)}}}function ae(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function St(r,t={mode:"open"}){const e=r.attachShadow(t),s={template:i,styles:n};return s;function i(o){const l=o.firstElementChild,a=l&&l.tagName==="TEMPLATE"?l:void 0;return a&&e.appendChild(a.content.cloneNode(!0)),s}function n(...o){e.adoptedStyleSheets=o}}j=class extends HTMLElement{constructor(){super(),this._state={},St(this).template(j.template).styles(j.styles),this.addEventListener("change",r=>{const t=r.target;if(t){const e=t.name,s=t.value;e&&(this._state[e]=s)}}),this.form&&this.form.addEventListener("submit",r=>{r.preventDefault(),Dt(r,"mu-form:submit",this._state)})}set init(r){this._state=r||{},Us(this._state,this)}get form(){var r;return(r=this.shadowRoot)==null?void 0:r.querySelector("form")}},j.template=N`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style></style>
    </template>
  `,j.styles=Ie`
    form {
      display: grid;
      gap: var(--size-spacing-medium);
      grid-column: 1/-1;
      grid-template-columns:
        subgrid
        [start] [label] [input] [col2] [col3] [end];
    }
    ::slotted(label) {
      display: grid;
      grid-column: label / end;
      grid-template-columns: subgrid;
      gap: var(--size-spacing-medium);
    }
    ::slotted(fieldset) {
      display: contents;
    }
    button[type="submit"] {
      grid-column: input;
      justify-self: start;
    }
  `;function Us(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!i;break;case"date":o.value=i.toISOString().substr(0,10);break;default:o.value=i;break}}}return r}const ze=class je extends Yt{constructor(t){super((e,s)=>this.update(e,s),t,je.EVENT_TYPE)}update(t,e){switch(t[0]){case"history/navigate":{const{href:s,state:i}=t[1];e(Ms(s,i));break}case"history/redirect":{const{href:s,state:i}=t[1];e(Ls(s,i));break}}}};ze.EVENT_TYPE="history:message";let Ns=ze;function Ms(r,t={}){return history.pushState(t,"",r),()=>({location:document.location,state:history.state})}function Ls(r,t={}){return history.replaceState(t,"",r),()=>({location:document.location,state:history.state})}const Hs=Me(Ns.EVENT_TYPE);class $t{constructor(t,e){this._effects=[],this._target=t,this._contextLabel=e}observe(t=void 0){return new Promise((e,s)=>{if(this._provider){const i=new le(this._provider,t);this._effects.push(i),e(i)}else xs(this._target,this._contextLabel).then(i=>{const n=new le(i,t);this._provider=i,this._effects.push(n),i.attach(o=>this._handleChange(o)),e(n)}).catch(i=>console.log(`Observer ${this._contextLabel}: ${i}`,i))})}_handleChange(t){console.log("Received change event for observers",t,this._effects),t.stopPropagation(),this._effects.forEach(e=>e.runEffect())}}class le{constructor(t,e){this._provider=t,e&&this.setEffect(e)}get context(){return this._provider.context}get value(){return this.context.value}setEffect(t){this._effectFn=t,this.runEffect()}runEffect(){this._effectFn&&this._effectFn(this.context.value)}}const De=class Ve extends HTMLElement{constructor(){super(),this._state={},this._user=new _t,this._authObserver=new $t(this,"blazing:auth"),St(this).template(Ve.template),this.form&&this.form.addEventListener("submit",t=>{if(t.preventDefault(),this.src||this.action){if(console.log("Submitting form",this._state),this.action)this.action(this._state);else if(this.src){const e=this.isNew?"POST":"PUT",s=this.isNew?"created":"updated",i=this.isNew?this.src.replace(/[/][$]new$/,""):this.src;Is(i,this._state,e,this.authorization).then(n=>Q(n,this)).then(n=>{const o=`mu-rest-form:${s}`,l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,[s]:n,url:i}});this.dispatchEvent(l)}).catch(n=>{const o="mu-rest-form:error",l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,error:n,url:i,request:this._state}});this.dispatchEvent(l)})}}}),this.addEventListener("change",t=>{const e=t.target;if(e){const s=e.name,i=e.value;s&&(this._state[s]=i)}})}get src(){return this.getAttribute("src")}get isNew(){return this.hasAttribute("new")}set init(t){this._state=t||{},Q(this._state,this)}get form(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("form")}get authorization(){var t;return(t=this._user)!=null&&t.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}connectedCallback(){this._authObserver.observe(({user:t})=>{t&&(this._user=t,this.src&&!this.isNew&&ce(this.src,this.authorization).then(e=>{this._state=e,Q(e,this)}))})}attributeChangedCallback(t,e,s){switch(t){case"src":this.src&&s&&s!==e&&!this.isNew&&ce(this.src,this.authorization).then(i=>{this._state=i,Q(i,this)});break;case"new":s&&(this._state={},Q({},this));break}}};De.observedAttributes=["src","new","action"];De.template=N`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style>
        form {
          display: grid;
          gap: var(--size-spacing-medium);
          grid-template-columns: [start] 1fr [label] 1fr [input] 3fr 1fr [end];
        }
        ::slotted(label) {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
        button[type="submit"] {
          grid-column: input;
          justify-self: start;
        }
      </style>
    </template>
  `;function ce(r,t){return fetch(r,{headers:t}).then(e=>{if(e.status!==200)throw`Status: ${e.status}`;return e.json()}).catch(e=>console.log(`Failed to load form from ${r}:`,e))}function Q(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!i;break;default:o.value=i;break}}}return r}function Is(r,t,e="PUT",s={}){return fetch(r,{method:e,headers:{"Content-Type":"application/json",...s},body:JSON.stringify(t)}).then(i=>{if(i.status!=200&&i.status!=201)throw`Form submission failed: Status ${i.status}`;return i.json()})}const zs=class qe extends Yt{constructor(t,e){super(e,t,qe.EVENT_TYPE,!1)}};zs.EVENT_TYPE="mu:message";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gt=globalThis,Kt=gt.ShadowRoot&&(gt.ShadyCSS===void 0||gt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Jt=Symbol(),he=new WeakMap;let Be=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Jt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Kt&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=he.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&he.set(e,t))}return t}toString(){return this.cssText}};const js=r=>new Be(typeof r=="string"?r:r+"",void 0,Jt),Ds=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new Be(e,r,Jt)},Vs=(r,t)=>{if(Kt)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=gt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},ue=Kt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return js(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:qs,defineProperty:Bs,getOwnPropertyDescriptor:Fs,getOwnPropertyNames:Ws,getOwnPropertySymbols:Ys,getPrototypeOf:Ks}=Object,W=globalThis,de=W.trustedTypes,Js=de?de.emptyScript:"",pe=W.reactiveElementPolyfillSupport,st=(r,t)=>r,bt={toAttribute(r,t){switch(t){case Boolean:r=r?Js:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Zt=(r,t)=>!qs(r,t),fe={attribute:!0,type:String,converter:bt,reflect:!1,hasChanged:Zt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),W.litPropertyMetadata??(W.litPropertyMetadata=new WeakMap);let V=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=fe){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Bs(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=Fs(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return i==null?void 0:i.call(this)},set(o){const l=i==null?void 0:i.call(this);n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??fe}static _$Ei(){if(this.hasOwnProperty(st("elementProperties")))return;const t=Ks(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(st("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(st("properties"))){const e=this.properties,s=[...Ws(e),...Ys(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(ue(i))}else t!==void 0&&e.push(ue(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Vs(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var s;const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(n!==void 0&&i.reflect===!0){const o=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:bt).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){var s;const i=this.constructor,n=i._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const o=i.getPropertyOptions(n),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)==null?void 0:s.fromAttribute)!==void 0?o.converter:bt;this._$Em=n,this[n]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??Zt)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$EO)==null||t.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(s)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}};V.elementStyles=[],V.shadowRootOptions={mode:"open"},V[st("elementProperties")]=new Map,V[st("finalized")]=new Map,pe==null||pe({ReactiveElement:V}),(W.reactiveElementVersions??(W.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const At=globalThis,wt=At.trustedTypes,me=wt?wt.createPolicy("lit-html",{createHTML:r=>r}):void 0,Fe="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,We="?"+x,Zs=`<${We}>`,L=document,nt=()=>L.createComment(""),ot=r=>r===null||typeof r!="object"&&typeof r!="function",Qt=Array.isArray,Qs=r=>Qt(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",Mt=`[ 	
\f\r]`,G=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ge=/-->/g,ye=/>/g,O=RegExp(`>|${Mt}(?:([^\\s"'>=/]+)(${Mt}*=${Mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_e=/'/g,ve=/"/g,Ye=/^(?:script|style|textarea|title)$/i,Gs=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),X=Gs(1),Y=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),$e=new WeakMap,R=L.createTreeWalker(L,129);function Ke(r,t){if(!Qt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return me!==void 0?me.createHTML(t):t}const Xs=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=G;for(let l=0;l<e;l++){const a=r[l];let p,f,u=-1,c=0;for(;c<a.length&&(o.lastIndex=c,f=o.exec(a),f!==null);)c=o.lastIndex,o===G?f[1]==="!--"?o=ge:f[1]!==void 0?o=ye:f[2]!==void 0?(Ye.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=O):f[3]!==void 0&&(o=O):o===O?f[0]===">"?(o=i??G,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,p=f[1],o=f[3]===void 0?O:f[3]==='"'?ve:_e):o===ve||o===_e?o=O:o===ge||o===ye?o=G:(o=O,i=void 0);const h=o===O&&r[l+1].startsWith("/>")?" ":"";n+=o===G?a+Zs:u>=0?(s.push(p),a.slice(0,u)+Fe+a.slice(u)+x+h):a+x+(u===-2?l:h)}return[Ke(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};let Vt=class Je{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[p,f]=Xs(t,e);if(this.el=Je.createElement(p,s),R.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=R.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(Fe)){const c=f[o++],h=i.getAttribute(u).split(x),d=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:d[2],strings:h,ctor:d[1]==="."?ei:d[1]==="?"?si:d[1]==="@"?ii:Pt}),i.removeAttribute(u)}else u.startsWith(x)&&(a.push({type:6,index:n}),i.removeAttribute(u));if(Ye.test(i.tagName)){const u=i.textContent.split(x),c=u.length-1;if(c>0){i.textContent=wt?wt.emptyScript:"";for(let h=0;h<c;h++)i.append(u[h],nt()),R.nextNode(),a.push({type:2,index:++n});i.append(u[c],nt())}}}else if(i.nodeType===8)if(i.data===We)a.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(x,u+1))!==-1;)a.push({type:7,index:n}),u+=x.length-1}n++}}static createElement(t,e){const s=L.createElement("template");return s.innerHTML=t,s}};function K(r,t,e=r,s){var i,n;if(t===Y)return t;let o=s!==void 0?(i=e.o)==null?void 0:i[s]:e.l;const l=ot(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==l&&((n=o==null?void 0:o._$AO)==null||n.call(o,!1),l===void 0?o=void 0:(o=new l(r),o._$AT(r,e,s)),s!==void 0?(e.o??(e.o=[]))[s]=o:e.l=o),o!==void 0&&(t=K(r,o._$AS(r,t.values),o,s)),t}class ti{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??L).importNode(e,!0);R.currentNode=i;let n=R.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let p;a.type===2?p=new ht(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new ri(n,this,t)),this._$AV.push(p),a=s[++l]}o!==(a==null?void 0:a.index)&&(n=R.nextNode(),o++)}return R.currentNode=L,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class ht{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this.v}constructor(t,e,s,i){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this.v=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),ot(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==Y&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Qs(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==v&&ot(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,n=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Vt.createElement(Ke(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)==null?void 0:e._$AD)===n)this._$AH.p(s);else{const o=new ti(n,this),l=o.u(this.options);o.p(s),this.T(l),this._$AH=o}}_$AC(t){let e=$e.get(t.strings);return e===void 0&&$e.set(t.strings,e=new Vt(t)),e}k(t){Qt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new ht(this.O(nt()),this.O(nt()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this.v=t,(e=this._$AP)==null||e.call(this,t))}}class Pt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=v}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=K(this,t,e,0),o=!ot(t)||t!==this._$AH&&t!==Y,o&&(this._$AH=t);else{const l=t;let a,p;for(t=n[0],a=0;a<n.length-1;a++)p=K(this,l[s+a],e,a),p===Y&&(p=this._$AH[a]),o||(o=!ot(p)||p!==this._$AH[a]),p===v?t=v:t!==v&&(t+=(p??"")+n[a+1]),this._$AH[a]=p}o&&!i&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ei extends Pt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}}class si extends Pt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==v)}}class ii extends Pt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??v)===Y)return;const s=this._$AH,i=t===v&&s!==v||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==v&&(s===v||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class ri{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const be=At.litHtmlPolyfillSupport;be==null||be(Vt,ht),(At.litHtmlVersions??(At.litHtmlVersions=[])).push("3.2.0");const ni=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new ht(t.insertBefore(nt(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let B=class extends V{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.o=ni(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this.o)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.o)==null||t.setConnected(!1)}render(){return Y}};B._$litElement$=!0,B.finalized=!0,(ne=globalThis.litElementHydrateSupport)==null||ne.call(globalThis,{LitElement:B});const Ae=globalThis.litElementPolyfillSupport;Ae==null||Ae({LitElement:B});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const oi={attribute:!0,type:String,converter:bt,reflect:!1,hasChanged:Zt},ai=(r=oi,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.P(o,void 0,r),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function Ze(r){return(t,e)=>typeof e=="object"?ai(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Qe(r){return Ze({...r,state:!0,attribute:!1})}function li(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function ci(r){throw new Error('Could not dynamically require "'+r+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Ge={};(function(r){var t=function(){var e=function(u,c,h,d){for(h=h||{},d=u.length;d--;h[u[d]]=c);return h},s=[1,9],i=[1,10],n=[1,11],o=[1,12],l=[5,11,12,13,14,15],a={trace:function(){},yy:{},symbols_:{error:2,root:3,expressions:4,EOF:5,expression:6,optional:7,literal:8,splat:9,param:10,"(":11,")":12,LITERAL:13,SPLAT:14,PARAM:15,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",11:"(",12:")",13:"LITERAL",14:"SPLAT",15:"PARAM"},productions_:[0,[3,2],[3,1],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[7,3],[8,1],[9,1],[10,1]],performAction:function(c,h,d,g,m,y,Ct){var A=y.length-1;switch(m){case 1:return new g.Root({},[y[A-1]]);case 2:return new g.Root({},[new g.Literal({value:""})]);case 3:this.$=new g.Concat({},[y[A-1],y[A]]);break;case 4:case 5:this.$=y[A];break;case 6:this.$=new g.Literal({value:y[A]});break;case 7:this.$=new g.Splat({name:y[A]});break;case 8:this.$=new g.Param({name:y[A]});break;case 9:this.$=new g.Optional({},[y[A-1]]);break;case 10:this.$=c;break;case 11:case 12:this.$=c.slice(1);break}},table:[{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[3]},{5:[1,13],6:14,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[2,2]},e(l,[2,4]),e(l,[2,5]),e(l,[2,6]),e(l,[2,7]),e(l,[2,8]),{4:15,6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},e(l,[2,10]),e(l,[2,11]),e(l,[2,12]),{1:[2,1]},e(l,[2,3]),{6:14,7:5,8:6,9:7,10:8,11:s,12:[1,16],13:i,14:n,15:o},e(l,[2,9])],defaultActions:{3:[2,2],13:[2,1]},parseError:function(c,h){if(h.recoverable)this.trace(c);else{let d=function(g,m){this.message=g,this.hash=m};throw d.prototype=Error,new d(c,h)}},parse:function(c){var h=this,d=[0],g=[null],m=[],y=this.table,Ct="",A=0,se=0,_s=2,ie=1,vs=m.slice.call(arguments,1),_=Object.create(this.lexer),k={yy:{}};for(var Ot in this.yy)Object.prototype.hasOwnProperty.call(this.yy,Ot)&&(k.yy[Ot]=this.yy[Ot]);_.setInput(c,k.yy),k.yy.lexer=_,k.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var Tt=_.yylloc;m.push(Tt);var $s=_.options&&_.options.ranges;typeof k.yy.parseError=="function"?this.parseError=k.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var bs=function(){var z;return z=_.lex()||ie,typeof z!="number"&&(z=h.symbols_[z]||z),z},b,C,w,Rt,I={},ft,E,re,mt;;){if(C=d[d.length-1],this.defaultActions[C]?w=this.defaultActions[C]:((b===null||typeof b>"u")&&(b=bs()),w=y[C]&&y[C][b]),typeof w>"u"||!w.length||!w[0]){var Ut="";mt=[];for(ft in y[C])this.terminals_[ft]&&ft>_s&&mt.push("'"+this.terminals_[ft]+"'");_.showPosition?Ut="Parse error on line "+(A+1)+`:
`+_.showPosition()+`
Expecting `+mt.join(", ")+", got '"+(this.terminals_[b]||b)+"'":Ut="Parse error on line "+(A+1)+": Unexpected "+(b==ie?"end of input":"'"+(this.terminals_[b]||b)+"'"),this.parseError(Ut,{text:_.match,token:this.terminals_[b]||b,line:_.yylineno,loc:Tt,expected:mt})}if(w[0]instanceof Array&&w.length>1)throw new Error("Parse Error: multiple actions possible at state: "+C+", token: "+b);switch(w[0]){case 1:d.push(b),g.push(_.yytext),m.push(_.yylloc),d.push(w[1]),b=null,se=_.yyleng,Ct=_.yytext,A=_.yylineno,Tt=_.yylloc;break;case 2:if(E=this.productions_[w[1]][1],I.$=g[g.length-E],I._$={first_line:m[m.length-(E||1)].first_line,last_line:m[m.length-1].last_line,first_column:m[m.length-(E||1)].first_column,last_column:m[m.length-1].last_column},$s&&(I._$.range=[m[m.length-(E||1)].range[0],m[m.length-1].range[1]]),Rt=this.performAction.apply(I,[Ct,se,A,k.yy,w[1],g,m].concat(vs)),typeof Rt<"u")return Rt;E&&(d=d.slice(0,-1*E*2),g=g.slice(0,-1*E),m=m.slice(0,-1*E)),d.push(this.productions_[w[1]][0]),g.push(I.$),m.push(I._$),re=y[d[d.length-2]][d[d.length-1]],d.push(re);break;case 3:return!0}}return!0}},p=function(){var u={EOF:1,parseError:function(h,d){if(this.yy.parser)this.yy.parser.parseError(h,d);else throw new Error(h)},setInput:function(c,h){return this.yy=h||this.yy||{},this._input=c,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var c=this._input[0];this.yytext+=c,this.yyleng++,this.offset++,this.match+=c,this.matched+=c;var h=c.match(/(?:\r\n?|\n).*/g);return h?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),c},unput:function(c){var h=c.length,d=c.split(/(?:\r\n?|\n)/g);this._input=c+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-h),this.offset-=h;var g=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),d.length-1&&(this.yylineno-=d.length-1);var m=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:d?(d.length===g.length?this.yylloc.first_column:0)+g[g.length-d.length].length-d[0].length:this.yylloc.first_column-h},this.options.ranges&&(this.yylloc.range=[m[0],m[0]+this.yyleng-h]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(c){this.unput(this.match.slice(c))},pastInput:function(){var c=this.matched.substr(0,this.matched.length-this.match.length);return(c.length>20?"...":"")+c.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var c=this.match;return c.length<20&&(c+=this._input.substr(0,20-c.length)),(c.substr(0,20)+(c.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var c=this.pastInput(),h=new Array(c.length+1).join("-");return c+this.upcomingInput()+`
`+h+"^"},test_match:function(c,h){var d,g,m;if(this.options.backtrack_lexer&&(m={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(m.yylloc.range=this.yylloc.range.slice(0))),g=c[0].match(/(?:\r\n?|\n).*/g),g&&(this.yylineno+=g.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:g?g[g.length-1].length-g[g.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+c[0].length},this.yytext+=c[0],this.match+=c[0],this.matches=c,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(c[0].length),this.matched+=c[0],d=this.performAction.call(this,this.yy,this,h,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),d)return d;if(this._backtrack){for(var y in m)this[y]=m[y];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var c,h,d,g;this._more||(this.yytext="",this.match="");for(var m=this._currentRules(),y=0;y<m.length;y++)if(d=this._input.match(this.rules[m[y]]),d&&(!h||d[0].length>h[0].length)){if(h=d,g=y,this.options.backtrack_lexer){if(c=this.test_match(d,m[y]),c!==!1)return c;if(this._backtrack){h=!1;continue}else return!1}else if(!this.options.flex)break}return h?(c=this.test_match(h,m[g]),c!==!1?c:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var h=this.next();return h||this.lex()},begin:function(h){this.conditionStack.push(h)},popState:function(){var h=this.conditionStack.length-1;return h>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(h){return h=this.conditionStack.length-1-Math.abs(h||0),h>=0?this.conditionStack[h]:"INITIAL"},pushState:function(h){this.begin(h)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(h,d,g,m){switch(g){case 0:return"(";case 1:return")";case 2:return"SPLAT";case 3:return"PARAM";case 4:return"LITERAL";case 5:return"LITERAL";case 6:return"EOF"}},rules:[/^(?:\()/,/^(?:\))/,/^(?:\*+\w+)/,/^(?::+\w+)/,/^(?:[\w%\-~\n]+)/,/^(?:.)/,/^(?:$)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6],inclusive:!0}}};return u}();a.lexer=p;function f(){this.yy={}}return f.prototype=a,a.Parser=f,new f}();typeof ci<"u"&&(r.parser=t,r.Parser=t.Parser,r.parse=function(){return t.parse.apply(t,arguments)})})(Ge);function D(r){return function(t,e){return{displayName:r,props:t,children:e||[]}}}var Xe={Root:D("Root"),Concat:D("Concat"),Literal:D("Literal"),Splat:D("Splat"),Param:D("Param"),Optional:D("Optional")},ts=Ge.parser;ts.yy=Xe;var hi=ts,ui=Object.keys(Xe);function di(r){return ui.forEach(function(t){if(typeof r[t]>"u")throw new Error("No handler defined for "+t.displayName)}),{visit:function(t,e){return this.handlers[t.displayName].call(this,t,e)},handlers:r}}var es=di,pi=es,fi=/[\-{}\[\]+?.,\\\^$|#\s]/g;function ss(r){this.captures=r.captures,this.re=r.re}ss.prototype.match=function(r){var t=this.re.exec(r),e={};if(t)return this.captures.forEach(function(s,i){typeof t[i+1]>"u"?e[s]=void 0:e[s]=decodeURIComponent(t[i+1])}),e};var mi=pi({Concat:function(r){return r.children.reduce((function(t,e){var s=this.visit(e);return{re:t.re+s.re,captures:t.captures.concat(s.captures)}}).bind(this),{re:"",captures:[]})},Literal:function(r){return{re:r.props.value.replace(fi,"\\$&"),captures:[]}},Splat:function(r){return{re:"([^?]*?)",captures:[r.props.name]}},Param:function(r){return{re:"([^\\/\\?]+)",captures:[r.props.name]}},Optional:function(r){var t=this.visit(r.children[0]);return{re:"(?:"+t.re+")?",captures:t.captures}},Root:function(r){var t=this.visit(r.children[0]);return new ss({re:new RegExp("^"+t.re+"(?=\\?|$)"),captures:t.captures})}}),gi=mi,yi=es,_i=yi({Concat:function(r,t){var e=r.children.map((function(s){return this.visit(s,t)}).bind(this));return e.some(function(s){return s===!1})?!1:e.join("")},Literal:function(r){return decodeURI(r.props.value)},Splat:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Param:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Optional:function(r,t){var e=this.visit(r.children[0],t);return e||""},Root:function(r,t){t=t||{};var e=this.visit(r.children[0],t);return e?encodeURI(e):!1}}),vi=_i,$i=hi,bi=gi,Ai=vi;ut.prototype=Object.create(null);ut.prototype.match=function(r){var t=bi.visit(this.ast),e=t.match(r);return e||!1};ut.prototype.reverse=function(r){return Ai.visit(this.ast,r)};function ut(r){var t;if(this?t=this:t=Object.create(ut.prototype),typeof r>"u")throw new Error("A route spec is required");return t.spec=r,t.ast=$i.parse(r),t}var wi=ut,Ei=wi,xi=Ei;const Si=li(xi);var Pi=Object.defineProperty,is=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Pi(t,e,i),i};const rs=class extends B{constructor(t,e,s=""){super(),this._cases=[],this._fallback=()=>X` <h1>Not Found</h1> `,this._cases=t.map(i=>({...i,route:new Si(i.path)})),this._historyObserver=new $t(this,e),this._authObserver=new $t(this,s)}connectedCallback(){this._historyObserver.observe(({location:t})=>{console.log("New location",t),t&&(this._match=this.matchRoute(t))}),this._authObserver.observe(({user:t})=>{this._user=t}),super.connectedCallback()}render(){return console.log("Rendering for match",this._match,this._user),X` <main>${(()=>{const e=this._match;if(e){if("view"in e)return this._user?e.auth&&e.auth!=="public"&&this._user&&!this._user.authenticated?(Cs(this,"auth/redirect"),X` <h1>Redirecting for Login</h1> `):(console.log("Loading view, ",e.params,e.query),e.view(e.params||{},e.query)):X` <h1>Authenticating</h1> `;if("redirect"in e){const s=e.redirect;if(typeof s=="string")return this.redirect(s),X` <h1>Redirecting to ${s}…</h1> `}}return this._fallback({})})()}</main> `}updated(t){t.has("_match")&&this.requestUpdate()}matchRoute(t){const{search:e,pathname:s}=t,i=new URLSearchParams(e),n=s+e;for(const o of this._cases){const l=o.route.match(n);if(l)return{...o,path:s,params:l,query:i}}}redirect(t){Hs(this,"history/redirect",{href:t})}};rs.styles=Ds`
    :host,
    main {
      display: contents;
    }
  `;let ns=rs;is([Qe()],ns.prototype,"_user");is([Qe()],ns.prototype,"_match");const os=class as extends HTMLElement{constructor(){if(super(),St(this).template(as.template),this.shadowRoot){const t=this.shadowRoot.querySelector("slot[name='actuator']");t&&t.addEventListener("click",()=>this.toggle())}}toggle(){this.hasAttribute("open")?this.removeAttribute("open"):this.setAttribute("open","open")}};os.template=N`
    <template>
      <slot name="actuator"><button>Menu</button></slot>
      <div id="panel">
        <slot></slot>
      </div>

      <style>
        :host {
          position: relative;
        }
        #is-shown {
          display: none;
        }
        #panel {
          display: none;

          position: absolute;
          right: 0;
          margin-top: var(--size-spacing-small);
          width: max-content;
          padding: var(--size-spacing-small);
          border-radius: var(--size-radius-small);
          background: var(--color-background-card);
          color: var(--color-text);
          box-shadow: var(--shadow-popover);
        }
        :host([open]) #panel {
          display: block;
        }
      </style>
    </template>
  `;let ki=os;const Ci=Object.freeze(Object.defineProperty({__proto__:null,Element:ki},Symbol.toStringTag,{value:"Module"})),ls=class qt extends HTMLElement{constructor(){super(),this._array=[],St(this).template(qt.template).styles(qt.styles),this.addEventListener("input-array:add",t=>{t.stopPropagation(),this.append(cs("",this._array.length))}),this.addEventListener("input-array:remove",t=>{t.stopPropagation(),this.removeClosestItem(t.target)}),this.addEventListener("change",t=>{t.stopPropagation();const e=t.target;if(e&&e!==this){const s=new Event("change",{bubbles:!0}),i=e.value,n=e.closest("label");if(n){const o=Array.from(this.children).indexOf(n);this._array[o]=i,this.dispatchEvent(s)}}}),this.addEventListener("click",t=>{oe(t,"button.add")?Dt(t,"input-array:add"):oe(t,"button.remove")&&Dt(t,"input-array:remove")})}get name(){return this.getAttribute("name")}get value(){return this._array}set value(t){this._array=Array.isArray(t)?t:[t],Oi(this._array,this)}removeClosestItem(t){const e=t.closest("label");if(console.log("Removing closest item:",e,t),e){const s=Array.from(this.children).indexOf(e);this._array.splice(s,1),e.remove()}}};ls.template=N`
    <template>
      <ul>
        <slot></slot>
      </ul>
      <button class="add">
        <slot name="label-add">Add one</slot>
        <style></style>
      </button>
    </template>
  `;ls.styles=Ie`
    :host {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: input / end;
    }
    ul {
      display: contents;
    }
    button.add {
      grid-column: input / input-end;
    }
    ::slotted(label) {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: subgrid;
    }
  `;function Oi(r,t){t.replaceChildren(),r.forEach((e,s)=>t.append(cs(e)))}function cs(r,t){const e=r===void 0?N`<input />`:N`<input value="${r}" />`;return N`
    <label>
      ${e}
      <button class="remove" type="button">Remove</button>
    </label>
  `}function hs(r){return Object.entries(r).map(([t,e])=>{customElements.get(t)||customElements.define(t,e)}),customElements}var Ti=Object.defineProperty,Ri=Object.getOwnPropertyDescriptor,Ui=(r,t,e,s)=>{for(var i=Ri(t,e),n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Ti(t,e,i),i};class Ni extends B{constructor(t){super(),this._pending=[],this._observer=new $t(this,t)}get model(){return this._lastModel=this._context?this._context.value:{},this._lastModel}connectedCallback(){var t;super.connectedCallback(),(t=this._observer)==null||t.observe().then(e=>{console.log("View effect (initial)",this,e),this._context=e.context,this._pending.length&&this._pending.forEach(([s,i])=>{console.log("Dispatching queued event",i,s),s.dispatchEvent(i)}),e.setEffect(()=>{var s;if(console.log("View effect",this,e,(s=this._context)==null?void 0:s.value),this._context)console.log("requesting update"),this.requestUpdate();else throw"View context not ready for effect"})})}dispatchMessage(t,e=this){const s=new CustomEvent("mu:message",{bubbles:!0,composed:!0,detail:t});this._context?(console.log("Dispatching message event",s),e.dispatchEvent(s)):(console.log("Queueing message event",s),this._pending.push([e,s]))}ref(t){return this.model?this.model[t]:void 0}}Ui([Ze()],Ni.prototype,"model");/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yt=globalThis,Gt=yt.ShadowRoot&&(yt.ShadyCSS===void 0||yt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Xt=Symbol(),we=new WeakMap;let us=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Xt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Gt&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=we.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&we.set(e,t))}return t}toString(){return this.cssText}};const Mi=r=>new us(typeof r=="string"?r:r+"",void 0,Xt),dt=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new us(e,r,Xt)},Li=(r,t)=>{if(Gt)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=yt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},Ee=Gt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Mi(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Hi,defineProperty:Ii,getOwnPropertyDescriptor:zi,getOwnPropertyNames:ji,getOwnPropertySymbols:Di,getPrototypeOf:Vi}=Object,P=globalThis,xe=P.trustedTypes,qi=xe?xe.emptyScript:"",Lt=P.reactiveElementPolyfillSupport,it=(r,t)=>r,Bt={toAttribute(r,t){switch(t){case Boolean:r=r?qi:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},ds=(r,t)=>!Hi(r,t),Se={attribute:!0,type:String,converter:Bt,reflect:!1,useDefault:!1,hasChanged:ds};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),P.litPropertyMetadata??(P.litPropertyMetadata=new WeakMap);let q=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Se){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Ii(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=zi(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){const l=i==null?void 0:i.call(this);n==null||n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Se}static _$Ei(){if(this.hasOwnProperty(it("elementProperties")))return;const t=Vi(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(it("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(it("properties"))){const e=this.properties,s=[...ji(e),...Di(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Ee(i))}else t!==void 0&&e.push(Ee(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Li(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var n;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:Bt).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){var n,o;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const l=s.getPropertyOptions(i),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((n=l.converter)==null?void 0:n.fromAttribute)!==void 0?l.converter:Bt;this._$Em=i,this[i]=a.fromAttribute(e,l.type)??((o=this._$Ej)==null?void 0:o.get(i))??null,this._$Em=null}}requestUpdate(t,e,s){var i;if(t!==void 0){const n=this.constructor,o=this[t];if(s??(s=n.getPropertyOptions(t)),!((s.hasChanged??ds)(o,e)||s.useDefault&&s.reflect&&o===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i){const{wrapped:l}=o,a=this[n];l!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,o,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};q.elementStyles=[],q.shadowRootOptions={mode:"open"},q[it("elementProperties")]=new Map,q[it("finalized")]=new Map,Lt==null||Lt({ReactiveElement:q}),(P.reactiveElementVersions??(P.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rt=globalThis,Et=rt.trustedTypes,Pe=Et?Et.createPolicy("lit-html",{createHTML:r=>r}):void 0,ps="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,fs="?"+S,Bi=`<${fs}>`,H=document,at=()=>H.createComment(""),lt=r=>r===null||typeof r!="object"&&typeof r!="function",te=Array.isArray,Fi=r=>te(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",Ht=`[ 	
\f\r]`,tt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ke=/-->/g,Ce=/>/g,T=RegExp(`>|${Ht}(?:([^\\s"'>=/]+)(${Ht}*=${Ht}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Oe=/'/g,Te=/"/g,ms=/^(?:script|style|textarea|title)$/i,Wi=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),gs=Wi(1),J=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),Re=new WeakMap,U=H.createTreeWalker(H,129);function ys(r,t){if(!te(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Pe!==void 0?Pe.createHTML(t):t}const Yi=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=tt;for(let l=0;l<e;l++){const a=r[l];let p,f,u=-1,c=0;for(;c<a.length&&(o.lastIndex=c,f=o.exec(a),f!==null);)c=o.lastIndex,o===tt?f[1]==="!--"?o=ke:f[1]!==void 0?o=Ce:f[2]!==void 0?(ms.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=T):f[3]!==void 0&&(o=T):o===T?f[0]===">"?(o=i??tt,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,p=f[1],o=f[3]===void 0?T:f[3]==='"'?Te:Oe):o===Te||o===Oe?o=T:o===ke||o===Ce?o=tt:(o=T,i=void 0);const h=o===T&&r[l+1].startsWith("/>")?" ":"";n+=o===tt?a+Bi:u>=0?(s.push(p),a.slice(0,u)+ps+a.slice(u)+S+h):a+S+(u===-2?l:h)}return[ys(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class ct{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[p,f]=Yi(t,e);if(this.el=ct.createElement(p,s),U.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=U.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(ps)){const c=f[o++],h=i.getAttribute(u).split(S),d=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:d[2],strings:h,ctor:d[1]==="."?Ji:d[1]==="?"?Zi:d[1]==="@"?Qi:kt}),i.removeAttribute(u)}else u.startsWith(S)&&(a.push({type:6,index:n}),i.removeAttribute(u));if(ms.test(i.tagName)){const u=i.textContent.split(S),c=u.length-1;if(c>0){i.textContent=Et?Et.emptyScript:"";for(let h=0;h<c;h++)i.append(u[h],at()),U.nextNode(),a.push({type:2,index:++n});i.append(u[c],at())}}}else if(i.nodeType===8)if(i.data===fs)a.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(S,u+1))!==-1;)a.push({type:7,index:n}),u+=S.length-1}n++}}static createElement(t,e){const s=H.createElement("template");return s.innerHTML=t,s}}function Z(r,t,e=r,s){var o,l;if(t===J)return t;let i=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const n=lt(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=Z(r,i._$AS(r,t.values),i,s)),t}class Ki{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??H).importNode(e,!0);U.currentNode=i;let n=U.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let p;a.type===2?p=new pt(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new Gi(n,this,t)),this._$AV.push(p),a=s[++l]}o!==(a==null?void 0:a.index)&&(n=U.nextNode(),o++)}return U.currentNode=H,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class pt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),lt(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==J&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Fi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==$&&lt(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=ct.createElement(ys(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(e);else{const o=new Ki(i,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(t){let e=Re.get(t.strings);return e===void 0&&Re.set(t.strings,e=new ct(t)),e}k(t){te(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new pt(this.O(at()),this.O(at()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class kt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=$}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=Z(this,t,e,0),o=!lt(t)||t!==this._$AH&&t!==J,o&&(this._$AH=t);else{const l=t;let a,p;for(t=n[0],a=0;a<n.length-1;a++)p=Z(this,l[s+a],e,a),p===J&&(p=this._$AH[a]),o||(o=!lt(p)||p!==this._$AH[a]),p===$?t=$:t!==$&&(t+=(p??"")+n[a+1]),this._$AH[a]=p}o&&!i&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ji extends kt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}}class Zi extends kt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}}class Qi extends kt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??$)===J)return;const s=this._$AH,i=t===$&&s!==$||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==$&&(s===$||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Gi{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const It=rt.litHtmlPolyfillSupport;It==null||It(ct,pt),(rt.litHtmlVersions??(rt.litHtmlVersions=[])).push("3.3.0");const Xi=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new pt(t.insertBefore(at(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M=globalThis;class F extends q{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Xi(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return J}}var Ue;F._$litElement$=!0,F.finalized=!0,(Ue=M.litElementHydrateSupport)==null||Ue.call(M,{LitElement:F});const zt=M.litElementPolyfillSupport;zt==null||zt({LitElement:F});(M.litElementVersions??(M.litElementVersions=[])).push("4.2.0");const ee=class ee extends F{render(){return gs`<h1 class="nice">meep</h1>`}};ee.styles=dt`
    h1 {
      font-size: 24px;
      background: red;
    }
  `;let Ft=ee;const tr=dt`
    img {
        max-width: 100%;
    }

    body {
        margin: 0;
        background-color: var(--color-page-bg);
    }

    /* stuff under header, etc */
    .body-content {
        margin: 0 3em 0 3em;

    }

    .body-content-field {
        margin: 0 1em 0 1em;
    }
`,er={styles:tr},sr=dt`
    .mansalva-regular {
        font-family: "Mansalva", sans-serif;
        font-weight: 400;
        font-style: normal;
        margin: 0 0;
    }

    /* banners and things */
    .navbar {
        background-color: var(--color-primary);
        width: 100%;
        padding: .25em .25em 0 .25em;
    }

    .main-image {
        opacity: 0.65;
    }

    h3, h2, h1, p, td, a, li{
        color: var(--color-text);
        text-shadow: var(--color-text-shadow);
        font-family: "Mansalva", sans-serif;
    }

    /*!* text *!*/
    /*p {*/
    /*    font-family: "Times New Roman", sans-serif;*/
    /*    font-size: var(--font-size-small);*/
    /*}*/

    /* index.html */
    .header-text {
        background-color: var(--color-secondary);
        text-align: center;
        font-size: var(--font-size-larger);

    }

    .title-text {
        background-color: var(--color-tertiary);
        text-align: center;
        font-size: var(--font-size-medium);
        padding: 0.5em 0.5em 0.5em 0.5em;
    }

    .subtitle-text {
        background-color: var(--color-quaternary);
        text-align: right;
        font-size: var(--font-size-medium);
        padding: 0.15em 0.5em 0.15em 0.5em;

    }

    .index-grid {
        --page-grids: 3;
        display: grid;
        align-content: end;
        grid-template-columns: repeat(
        var(--page-grids), 1fr
    );

        gap:
                var(--box-gap);

        grid-column:
                span min(
                        5,
                        var(--page-grids)
                ) / -1;

        @media screen and (max-width: 50rem) {
            grid-template-columns: 1fr;
        }
    }

    /* at the top of each individual concept page (ie a specific field/mob page) */
    .page-title {
        font-family: "Mansalva", sans-serif;
    }

    /* image with text on top */
    .img-under-text {
        position: relative;
        text-align: center;
        color: white;
        > img {
            opacity: .6;
        }
        > p {
            background-color: rgba(0, 0, 0, 0.35);
            padding: var(--box-gap);
        }
    }

    /* centering text on image*/
    .centered {
        opacity: 1;
        /*color: black;*/
        position: absolute;
        line-height: 2em;
        font-size: 1em;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .small-border-box {
    }

    .box-grid {
        display: flex;
        flex-wrap: wrap;
        gap: var(--box-gap);

        & > * {
            width: fit-content;
            flex-grow: 1;
        }
    }

    .two-one-grid {   /* for field, shop (needs a new name) */
        display: grid;
        grid-template-columns: 2fr 1fr;
        width: 100%;
        gap: var(--box-gap);

        @media screen and (max-width: 50rem) {
            grid-template-columns: 1fr;
        }
    }

    .mob-box {     /* for boxes displaying mobs on each field */
        border: var(--box-border-width) solid var(--box-border-color);
        padding: 10px 20px;

        >.mob-img {
            width: 90%;
        }
    }

    .table {   /* the stat table (for borders, spacing) */
        width: 100%;
        border-collapse: collapse;

        >th, td {
            border: 1px solid black;
            padding: 10px 1px 10px 10px;
            text-align: left;
        }
    }

    .flower-box {   /* for types of flowers on fields */
        display: flex;
        flex-wrap: wrap;
        border: var(--box-border-width) solid var(--box-border-color);

        >.flower-icon {
            width: var(--icon-size);
            height: var(--icon-size);
        }
    }

    .shop-box {     /* for player accessories */
        display: flex;
        align-items: center;
        gap: 20px;
        border: var(--box-border-width) solid var(--box-border-color);
        padding: 20px 25px;
        //margin-top: -1.35em;

        > img {
            width: 150px;
            margin: 0 1.5em 0 1.5em;
        }

        .info {     /* stats, cost, etc */
            flex-grow: 1;
            margin: 0 1.5em 0 0;
            padding-bottom: 1.5em;
        }
    }

    .shop-tool-box {    /* for player tools */
        border: var(--box-border-width) solid var(--box-border-color);
        padding: 0 20px;
        margin-bottom: 1em;

        > img {
            width: 150px;
        }

    }

    .bee-container {
        display: flex;
        flex-wrap: wrap;
        gap: var(--box-gap);
    }

    .bee-box {
        border: var(--box-border-width) solid var(--box-border-color);
        flex-basis: 250px;
        flex-grow: 1;
        padding: 0 1em 1em 1em;

        > img {
            width: 80%;
        }
    }

    .bear-grid {   /* for image, bear quests */
        display: grid;
        grid-template-columns: 1fr 2fr;
        width: 100%;
        gap: var(--box-gap);

        @media screen and (max-width: 50rem) {
            grid-template-columns: 1fr;
        }

        >img {
            width: 100%;
        }

        > .info {
        }

        & > * .questbox {
            border: 2px solid black;
            margin-bottom: 1em;
        }

    }

    .noobshop {
        background-color: rgba(221, 252, 228, 0.5);
    }

    .common {
        background-color: var(--color-common);
    }

    .legendary {
        background-color: var(--color-legendary);
    }

    svg.icon {
        display: inline;
        height: 1.75em;
        width: 1.75em;
        vertical-align: text-top;
        fill: currentColor;
    }
`,ir={styles:sr},rr=dt`
    :root {
        --color-text: rgb(51 51 51);
        --color-text-shadow: rgb(225, 197, 119);

        --color-link: rgb(135, 157, 193);

        --color-common: lightgoldenrodyellow;
        --color-legendary: lightblue;

        --color-page-bg: white;

        --color-primary: #fdf2b0;
        --color-secondary: #f3d17c;
        --color-tertiary: #d9e0a3;
        --color-quaternary: #c4cea1;
        --color-quinary: #cf9963;

        --box-width: 250px;
        --box-padding-width: 10px;
        --box-padding-height: 20px;

        --font-size-small: 1em;
        --font-size-medium: 1.25em;
        --font-size-large: 1.5em;
        --font-size-larger: 2em;

        --box-gap: 2em;

        --flower-box-padding: 0.25em;

        --mob-img: 150px;
        --mob-box: 250px;

        --icon-size: 3.5em;

        --box-border-width: 2px;
        --box-border-color: black;
    }

    body.dark-mode {
        --color-page-bg: rgb(48, 48, 48);

        --color-primary: #a88d8d;
        --color-secondary: #6a7e79;
        --color-tertiary: rgb(119, 80, 80);
        --color-quaternary: #798a72;
        --color-quinary: rgba(221, 252, 228, 0.5);

        --color-text: rgb(255, 255, 255);
        --color-text-shadow: rgb(166, 85, 85);
    }
`,nr={styles:rr},xt=class xt extends F{render(){return gs` <p>hello</p>
            `}};xt.uses=hs({"mu-dropdown":Ci.Element}),xt.styles=[er.styles,ir.styles,nr.styles,dt``];let Wt=xt;hs({"testing-element":Ft,navbar:Wt});
