(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();var Y,Re;class dt extends Error{}dt.prototype.name="InvalidTokenError";function ei(r){return decodeURIComponent(atob(r).replace(/(.)/g,(t,e)=>{let s=e.charCodeAt(0).toString(16).toUpperCase();return s.length<2&&(s="0"+s),"%"+s}))}function si(r){let t=r.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return ei(t)}catch{return atob(t)}}function as(r,t){if(typeof r!="string")throw new dt("Invalid token specified: must be a string");t||(t={});const e=t.header===!0?0:1,s=r.split(".")[e];if(typeof s!="string")throw new dt(`Invalid token specified: missing part #${e+1}`);let i;try{i=si(s)}catch(n){throw new dt(`Invalid token specified: invalid base64 for part #${e+1} (${n.message})`)}try{return JSON.parse(i)}catch(n){throw new dt(`Invalid token specified: invalid json for part #${e+1} (${n.message})`)}}const ii="mu:context",se=`${ii}:change`;class ri{constructor(t,e){this._proxy=ni(t,e)}get value(){return this._proxy}set value(t){Object.assign(this._proxy,t)}apply(t){this.value=t(this.value)}}class de extends HTMLElement{constructor(t){super(),console.log("Constructing context provider",this),this.context=new ri(t,this),this.style.display="contents"}attach(t){return this.addEventListener(se,t),t}detach(t){this.removeEventListener(se,t)}}function ni(r,t){return new Proxy(r,{get:(s,i,n)=>{if(i==="then")return;const o=Reflect.get(s,i,n);return console.log(`Context['${i}'] => `,o),o},set:(s,i,n,o)=>{const l=r[i];console.log(`Context['${i.toString()}'] <= `,n);const a=Reflect.set(s,i,n,o);if(a){let u=new CustomEvent(se,{bubbles:!0,cancelable:!0,composed:!0});Object.assign(u,{property:i,oldValue:l,value:n}),t.dispatchEvent(u)}else console.log(`Context['${i}] was not set to ${n}`);return a}})}function oi(r,t){const e=ls(t,r);return new Promise((s,i)=>{if(e){const n=e.localName;customElements.whenDefined(n).then(()=>s(e))}else i({context:t,reason:`No provider for this context "${t}:`})})}function ls(r,t){const e=`[provides="${r}"]`;if(!t||t===document.getRootNode())return;const s=t.closest(e);if(s)return s;const i=t.getRootNode();if(i instanceof ShadowRoot)return ls(r,i.host)}class ai extends CustomEvent{constructor(t,e="mu:message"){super(e,{bubbles:!0,composed:!0,detail:t})}}function cs(r="mu:message"){return(t,...e)=>t.dispatchEvent(new ai(e,r))}class ue{constructor(t,e,s="service:message",i=!0){this._pending=[],this._context=e,this._update=t,this._eventType=s,this._running=i}attach(t){t.addEventListener(this._eventType,e=>{e.stopPropagation();const s=e.detail;this.consume(s)})}start(){this._running||(console.log(`Starting ${this._eventType} service`),this._running=!0,this._pending.forEach(t=>this.process(t)))}apply(t){this._context.apply(t)}consume(t){this._running?this.process(t):(console.log(`Queueing ${this._eventType} message`,t),this._pending.push(t))}process(t){console.log(`Processing ${this._eventType} message`,t);const e=this._update(t,this.apply.bind(this));e&&e(this._context.value)}}function li(r){return t=>({...t,...r})}const ie="mu:auth:jwt",hs=class ds extends ue{constructor(t,e){super((s,i)=>this.update(s,i),t,ds.EVENT_TYPE),this._redirectForLogin=e}update(t,e){switch(t[0]){case"auth/signin":const{token:s,redirect:i}=t[1];return e(hi(s)),Zt(i);case"auth/signout":return e(di()),Zt(this._redirectForLogin);case"auth/redirect":return Zt(this._redirectForLogin,{next:window.location.href});default:const n=t[0];throw new Error(`Unhandled Auth message "${n}"`)}}};hs.EVENT_TYPE="auth:message";let us=hs;const ps=cs(us.EVENT_TYPE);function Zt(r,t={}){if(!r)return;const e=window.location.href,s=new URL(r,e);return Object.entries(t).forEach(([i,n])=>s.searchParams.set(i,n)),()=>{console.log("Redirecting to ",r),window.location.assign(s)}}class ci extends de{get redirect(){return this.getAttribute("redirect")||void 0}constructor(){const t=X.authenticateFromLocalStorage();super({user:t,token:t.authenticated?t.token:void 0})}connectedCallback(){new us(this.context,this.redirect).attach(this)}}class Q{constructor(){this.authenticated=!1,this.username="anonymous"}static deauthenticate(t){return t.authenticated=!1,t.username="anonymous",localStorage.removeItem(ie),t}}class X extends Q{constructor(t){super();const e=as(t);console.log("Token payload",e),this.token=t,this.authenticated=!0,this.username=e.username}static authenticate(t){const e=new X(t);return localStorage.setItem(ie,t),e}static authenticateFromLocalStorage(){const t=localStorage.getItem(ie);return t?X.authenticate(t):new Q}}function hi(r){return li({user:X.authenticate(r),token:r})}function di(){return r=>{const t=r.user;return{user:t&&t.authenticated?Q.deauthenticate(t):t,token:""}}}function ui(r){return r.authenticated?{Authorization:`Bearer ${r.token||"NO_TOKEN"}`}:{}}function pi(r){return r.authenticated?as(r.token||""):{}}const pe=Object.freeze(Object.defineProperty({__proto__:null,AuthenticatedUser:X,Provider:ci,User:Q,dispatch:ps,headers:ui,payload:pi},Symbol.toStringTag,{value:"Module"}));function Ot(r,t,e){const s=r.target,i=new CustomEvent(t,{bubbles:!0,composed:!0,detail:e});console.log(`Relaying event from ${r.type}:`,i),s.dispatchEvent(i),r.stopPropagation()}function re(r,t="*"){return r.composedPath().find(s=>{const i=s;return i.tagName&&i.matches(t)})}const fs=Object.freeze(Object.defineProperty({__proto__:null,originalTarget:re,relay:Ot},Symbol.toStringTag,{value:"Module"}));function ms(r,...t){const e=r.map((i,n)=>n?[t[n-1],i]:[i]).flat().join("");let s=new CSSStyleSheet;return s.replaceSync(e),s}const fi=new DOMParser;function z(r,...t){const e=t.map(l),s=r.map((a,u)=>{if(u===0)return[a];const f=e[u-1];return f instanceof Node?[`<ins id="mu-html-${u-1}"></ins>`,a]:[f,a]}).flat().join(""),i=fi.parseFromString(s,"text/html"),n=i.head.childElementCount?i.head.children:i.body.children,o=new DocumentFragment;return o.replaceChildren(...n),e.forEach((a,u)=>{if(a instanceof Node){const f=o.querySelector(`ins#mu-html-${u}`);if(f){const d=f.parentNode;d==null||d.replaceChild(a,f)}else console.log("Missing insertion point:",`ins#mu-html-${u}`)}}),o;function l(a,u){if(a===null)return"";switch(typeof a){case"string":return Ue(a);case"bigint":case"boolean":case"number":case"symbol":return Ue(a.toString());case"object":if(a instanceof Node||a instanceof DocumentFragment)return a;if(Array.isArray(a)){const f=new DocumentFragment,d=a.map(l);return f.replaceChildren(...d),f}return new Text(a.toString());default:return new Comment(`[invalid parameter of type "${typeof a}"]`)}}}function Ue(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function zt(r,t={mode:"open"}){const e=r.attachShadow(t),s={template:i,styles:n};return s;function i(o){const l=o.firstElementChild,a=l&&l.tagName==="TEMPLATE"?l:void 0;return a&&e.appendChild(a.content.cloneNode(!0)),s}function n(...o){e.adoptedStyleSheets=o}}Y=class extends HTMLElement{constructor(){super(),this._state={},zt(this).template(Y.template).styles(Y.styles),this.addEventListener("change",r=>{const t=r.target;if(t){const e=t.name,s=t.value;e&&(this._state[e]=s)}}),this.form&&this.form.addEventListener("submit",r=>{r.preventDefault(),Ot(r,"mu-form:submit",this._state)})}set init(r){this._state=r||{},mi(this._state,this)}get form(){var r;return(r=this.shadowRoot)==null?void 0:r.querySelector("form")}},Y.template=z`
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
  `,Y.styles=ms`
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
  `;function mi(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!i;break;case"date":o.value=i.toISOString().substr(0,10);break;default:o.value=i;break}}}return r}const gs=class ys extends ue{constructor(t){super((e,s)=>this.update(e,s),t,ys.EVENT_TYPE)}update(t,e){switch(t[0]){case"history/navigate":{const{href:s,state:i}=t[1];e(yi(s,i));break}case"history/redirect":{const{href:s,state:i}=t[1];e(vi(s,i));break}}}};gs.EVENT_TYPE="history:message";let fe=gs;class Ne extends de{constructor(){super({location:document.location,state:{}}),this.addEventListener("click",t=>{const e=gi(t);if(e){const s=new URL(e.href);s.origin===this.context.value.location.origin&&(console.log("Preventing Click Event on <A>",t),t.preventDefault(),me(e,"history/navigate",{href:s.pathname+s.search}))}}),window.addEventListener("popstate",t=>{console.log("Popstate",t.state),this.context.value={location:document.location,state:t.state}})}connectedCallback(){new fe(this.context).attach(this)}}function gi(r){const t=r.currentTarget,e=s=>s.tagName=="A"&&s.href;if(r.button===0)if(r.composed){const i=r.composedPath().find(e);return i||void 0}else{for(let s=r.target;s;s===t?null:s.parentElement)if(e(s))return s;return}}function yi(r,t={}){return history.pushState(t,"",r),()=>({location:document.location,state:history.state})}function vi(r,t={}){return history.replaceState(t,"",r),()=>({location:document.location,state:history.state})}const me=cs(fe.EVENT_TYPE),_i=Object.freeze(Object.defineProperty({__proto__:null,HistoryProvider:Ne,Provider:Ne,Service:fe,dispatch:me},Symbol.toStringTag,{value:"Module"}));class tt{constructor(t,e){this._effects=[],this._target=t,this._contextLabel=e}observe(t=void 0){return new Promise((e,s)=>{if(this._provider){const i=new Me(this._provider,t);this._effects.push(i),e(i)}else oi(this._target,this._contextLabel).then(i=>{const n=new Me(i,t);this._provider=i,this._effects.push(n),i.attach(o=>this._handleChange(o)),e(n)}).catch(i=>console.log(`Observer ${this._contextLabel}: ${i}`,i))})}_handleChange(t){console.log("Received change event for observers",t,this._effects),t.stopPropagation(),this._effects.forEach(e=>e.runEffect())}}class Me{constructor(t,e){this._provider=t,e&&this.setEffect(e)}get context(){return this._provider.context}get value(){return this.context.value}setEffect(t){this._effectFn=t,this.runEffect()}runEffect(){this._effectFn&&this._effectFn(this.context.value)}}const vs=class _s extends HTMLElement{constructor(){super(),this._state={},this._user=new Q,this._authObserver=new tt(this,"blazing:auth"),zt(this).template(_s.template),this.form&&this.form.addEventListener("submit",t=>{if(t.preventDefault(),this.src||this.action){if(console.log("Submitting form",this._state),this.action)this.action(this._state);else if(this.src){const e=this.isNew?"POST":"PUT",s=this.isNew?"created":"updated",i=this.isNew?this.src.replace(/[/][$]new$/,""):this.src;bi(i,this._state,e,this.authorization).then(n=>at(n,this)).then(n=>{const o=`mu-rest-form:${s}`,l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,[s]:n,url:i}});this.dispatchEvent(l)}).catch(n=>{const o="mu-rest-form:error",l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,error:n,url:i,request:this._state}});this.dispatchEvent(l)})}}}),this.addEventListener("change",t=>{const e=t.target;if(e){const s=e.name,i=e.value;s&&(this._state[s]=i)}})}get src(){return this.getAttribute("src")}get isNew(){return this.hasAttribute("new")}set init(t){this._state=t||{},at(this._state,this)}get form(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("form")}get authorization(){var t;return(t=this._user)!=null&&t.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}connectedCallback(){this._authObserver.observe(({user:t})=>{t&&(this._user=t,this.src&&!this.isNew&&Le(this.src,this.authorization).then(e=>{this._state=e,at(e,this)}))})}attributeChangedCallback(t,e,s){switch(t){case"src":this.src&&s&&s!==e&&!this.isNew&&Le(this.src,this.authorization).then(i=>{this._state=i,at(i,this)});break;case"new":s&&(this._state={},at({},this));break}}};vs.observedAttributes=["src","new","action"];vs.template=z`
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
  `;function Le(r,t){return fetch(r,{headers:t}).then(e=>{if(e.status!==200)throw`Status: ${e.status}`;return e.json()}).catch(e=>console.log(`Failed to load form from ${r}:`,e))}function at(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!i;break;default:o.value=i;break}}}return r}function bi(r,t,e="PUT",s={}){return fetch(r,{method:e,headers:{"Content-Type":"application/json",...s},body:JSON.stringify(t)}).then(i=>{if(i.status!=200&&i.status!=201)throw`Form submission failed: Status ${i.status}`;return i.json()})}const bs=class $s extends ue{constructor(t,e){super(e,t,$s.EVENT_TYPE,!1)}};bs.EVENT_TYPE="mu:message";let ws=bs;class $i extends de{constructor(t,e,s){super(e),this._user=new Q,this._updateFn=t,this._authObserver=new tt(this,s)}connectedCallback(){const t=new ws(this.context,(e,s)=>this._updateFn(e,s,this._user));t.attach(this),this._authObserver.observe(({user:e})=>{console.log("Store got auth",e),e&&(this._user=e),t.start()})}}const wi=Object.freeze(Object.defineProperty({__proto__:null,Provider:$i,Service:ws},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const kt=globalThis,ge=kt.ShadowRoot&&(kt.ShadyCSS===void 0||kt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ye=Symbol(),He=new WeakMap;let xs=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==ye)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(ge&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=He.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&He.set(e,t))}return t}toString(){return this.cssText}};const xi=r=>new xs(typeof r=="string"?r:r+"",void 0,ye),Ai=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new xs(e,r,ye)},Ei=(r,t)=>{if(ge)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=kt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},je=ge?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return xi(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Si,defineProperty:Pi,getOwnPropertyDescriptor:ki,getOwnPropertyNames:Ci,getOwnPropertySymbols:Oi,getPrototypeOf:Ti}=Object,et=globalThis,Ie=et.trustedTypes,Ri=Ie?Ie.emptyScript:"",ze=et.reactiveElementPolyfillSupport,ut=(r,t)=>r,Tt={toAttribute(r,t){switch(t){case Boolean:r=r?Ri:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},ve=(r,t)=>!Si(r,t),De={attribute:!0,type:String,converter:Tt,reflect:!1,hasChanged:ve};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),et.litPropertyMetadata??(et.litPropertyMetadata=new WeakMap);let J=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=De){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Pi(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=ki(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return i==null?void 0:i.call(this)},set(o){const l=i==null?void 0:i.call(this);n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??De}static _$Ei(){if(this.hasOwnProperty(ut("elementProperties")))return;const t=Ti(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ut("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ut("properties"))){const e=this.properties,s=[...Ci(e),...Oi(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(je(i))}else t!==void 0&&e.push(je(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ei(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var s;const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(n!==void 0&&i.reflect===!0){const o=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:Tt).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){var s;const i=this.constructor,n=i._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const o=i.getPropertyOptions(n),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)==null?void 0:s.fromAttribute)!==void 0?o.converter:Tt;this._$Em=n,this[n]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??ve)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$EO)==null||t.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(s)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}};J.elementStyles=[],J.shadowRootOptions={mode:"open"},J[ut("elementProperties")]=new Map,J[ut("finalized")]=new Map,ze==null||ze({ReactiveElement:J}),(et.reactiveElementVersions??(et.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Rt=globalThis,Ut=Rt.trustedTypes,Be=Ut?Ut.createPolicy("lit-html",{createHTML:r=>r}):void 0,As="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,Es="?"+C,Ui=`<${Es}>`,B=document,mt=()=>B.createComment(""),gt=r=>r===null||typeof r!="object"&&typeof r!="function",_e=Array.isArray,Ni=r=>_e(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",Gt=`[ 	
\f\r]`,lt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Fe=/-->/g,qe=/>/g,L=RegExp(`>|${Gt}(?:([^\\s"'>=/]+)(${Gt}*=${Gt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ve=/'/g,We=/"/g,Ss=/^(?:script|style|textarea|title)$/i,Mi=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),ct=Mi(1),st=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),Ye=new WeakMap,j=B.createTreeWalker(B,129);function Ps(r,t){if(!_e(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Be!==void 0?Be.createHTML(t):t}const Li=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=lt;for(let l=0;l<e;l++){const a=r[l];let u,f,d=-1,c=0;for(;c<a.length&&(o.lastIndex=c,f=o.exec(a),f!==null);)c=o.lastIndex,o===lt?f[1]==="!--"?o=Fe:f[1]!==void 0?o=qe:f[2]!==void 0?(Ss.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=L):f[3]!==void 0&&(o=L):o===L?f[0]===">"?(o=i??lt,d=-1):f[1]===void 0?d=-2:(d=o.lastIndex-f[2].length,u=f[1],o=f[3]===void 0?L:f[3]==='"'?We:Ve):o===We||o===Ve?o=L:o===Fe||o===qe?o=lt:(o=L,i=void 0);const h=o===L&&r[l+1].startsWith("/>")?" ":"";n+=o===lt?a+Ui:d>=0?(s.push(u),a.slice(0,d)+As+a.slice(d)+C+h):a+C+(d===-2?l:h)}return[Ps(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};let ne=class ks{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[u,f]=Li(t,e);if(this.el=ks.createElement(u,s),j.currentNode=this.el.content,e===2||e===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=j.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const d of i.getAttributeNames())if(d.endsWith(As)){const c=f[o++],h=i.getAttribute(d).split(C),p=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:p[2],strings:h,ctor:p[1]==="."?ji:p[1]==="?"?Ii:p[1]==="@"?zi:Dt}),i.removeAttribute(d)}else d.startsWith(C)&&(a.push({type:6,index:n}),i.removeAttribute(d));if(Ss.test(i.tagName)){const d=i.textContent.split(C),c=d.length-1;if(c>0){i.textContent=Ut?Ut.emptyScript:"";for(let h=0;h<c;h++)i.append(d[h],mt()),j.nextNode(),a.push({type:2,index:++n});i.append(d[c],mt())}}}else if(i.nodeType===8)if(i.data===Es)a.push({type:2,index:n});else{let d=-1;for(;(d=i.data.indexOf(C,d+1))!==-1;)a.push({type:7,index:n}),d+=C.length-1}n++}}static createElement(t,e){const s=B.createElement("template");return s.innerHTML=t,s}};function it(r,t,e=r,s){var i,n;if(t===st)return t;let o=s!==void 0?(i=e.o)==null?void 0:i[s]:e.l;const l=gt(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==l&&((n=o==null?void 0:o._$AO)==null||n.call(o,!1),l===void 0?o=void 0:(o=new l(r),o._$AT(r,e,s)),s!==void 0?(e.o??(e.o=[]))[s]=o:e.l=o),o!==void 0&&(t=it(r,o._$AS(r,t.values),o,s)),t}class Hi{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??B).importNode(e,!0);j.currentNode=i;let n=j.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let u;a.type===2?u=new wt(n,n.nextSibling,this,t):a.type===1?u=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(u=new Di(n,this,t)),this._$AV.push(u),a=s[++l]}o!==(a==null?void 0:a.index)&&(n=j.nextNode(),o++)}return j.currentNode=B,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class wt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this.v}constructor(t,e,s,i){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this.v=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=it(this,t,e),gt(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==st&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ni(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==b&&gt(this._$AH)?this._$AA.nextSibling.data=t:this.T(B.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,n=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=ne.createElement(Ps(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)==null?void 0:e._$AD)===n)this._$AH.p(s);else{const o=new Hi(n,this),l=o.u(this.options);o.p(s),this.T(l),this._$AH=o}}_$AC(t){let e=Ye.get(t.strings);return e===void 0&&Ye.set(t.strings,e=new ne(t)),e}k(t){_e(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new wt(this.O(mt()),this.O(mt()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this.v=t,(e=this._$AP)==null||e.call(this,t))}}class Dt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=it(this,t,e,0),o=!gt(t)||t!==this._$AH&&t!==st,o&&(this._$AH=t);else{const l=t;let a,u;for(t=n[0],a=0;a<n.length-1;a++)u=it(this,l[s+a],e,a),u===st&&(u=this._$AH[a]),o||(o=!gt(u)||u!==this._$AH[a]),u===b?t=b:t!==b&&(t+=(u??"")+n[a+1]),this._$AH[a]=u}o&&!i&&this.j(t)}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ji extends Dt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===b?void 0:t}}class Ii extends Dt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}}class zi extends Dt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=it(this,t,e,0)??b)===st)return;const s=this._$AH,i=t===b&&s!==b||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==b&&(s===b||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Di{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){it(this,t)}}const Ke=Rt.litHtmlPolyfillSupport;Ke==null||Ke(ne,wt),(Rt.litHtmlVersions??(Rt.litHtmlVersions=[])).push("3.2.0");const Bi=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new wt(t.insertBefore(mt(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let G=class extends J{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.o=Bi(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this.o)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.o)==null||t.setConnected(!1)}render(){return st}};G._$litElement$=!0,G.finalized=!0,(Re=globalThis.litElementHydrateSupport)==null||Re.call(globalThis,{LitElement:G});const Je=globalThis.litElementPolyfillSupport;Je==null||Je({LitElement:G});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Fi={attribute:!0,type:String,converter:Tt,reflect:!1,hasChanged:ve},qi=(r=Fi,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.P(o,void 0,r),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function Cs(r){return(t,e)=>typeof e=="object"?qi(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Os(r){return Cs({...r,state:!0,attribute:!1})}function Vi(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function Wi(r){throw new Error('Could not dynamically require "'+r+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Ts={};(function(r){var t=function(){var e=function(d,c,h,p){for(h=h||{},p=d.length;p--;h[d[p]]=c);return h},s=[1,9],i=[1,10],n=[1,11],o=[1,12],l=[5,11,12,13,14,15],a={trace:function(){},yy:{},symbols_:{error:2,root:3,expressions:4,EOF:5,expression:6,optional:7,literal:8,splat:9,param:10,"(":11,")":12,LITERAL:13,SPLAT:14,PARAM:15,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",11:"(",12:")",13:"LITERAL",14:"SPLAT",15:"PARAM"},productions_:[0,[3,2],[3,1],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[7,3],[8,1],[9,1],[10,1]],performAction:function(c,h,p,g,m,y,Vt){var x=y.length-1;switch(m){case 1:return new g.Root({},[y[x-1]]);case 2:return new g.Root({},[new g.Literal({value:""})]);case 3:this.$=new g.Concat({},[y[x-1],y[x]]);break;case 4:case 5:this.$=y[x];break;case 6:this.$=new g.Literal({value:y[x]});break;case 7:this.$=new g.Splat({name:y[x]});break;case 8:this.$=new g.Param({name:y[x]});break;case 9:this.$=new g.Optional({},[y[x-1]]);break;case 10:this.$=c;break;case 11:case 12:this.$=c.slice(1);break}},table:[{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[3]},{5:[1,13],6:14,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[2,2]},e(l,[2,4]),e(l,[2,5]),e(l,[2,6]),e(l,[2,7]),e(l,[2,8]),{4:15,6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},e(l,[2,10]),e(l,[2,11]),e(l,[2,12]),{1:[2,1]},e(l,[2,3]),{6:14,7:5,8:6,9:7,10:8,11:s,12:[1,16],13:i,14:n,15:o},e(l,[2,9])],defaultActions:{3:[2,2],13:[2,1]},parseError:function(c,h){if(h.recoverable)this.trace(c);else{let p=function(g,m){this.message=g,this.hash=m};throw p.prototype=Error,new p(c,h)}},parse:function(c){var h=this,p=[0],g=[null],m=[],y=this.table,Vt="",x=0,Ce=0,Gs=2,Oe=1,Qs=m.slice.call(arguments,1),_=Object.create(this.lexer),N={yy:{}};for(var Wt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,Wt)&&(N.yy[Wt]=this.yy[Wt]);_.setInput(c,N.yy),N.yy.lexer=_,N.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var Yt=_.yylloc;m.push(Yt);var Xs=_.options&&_.options.ranges;typeof N.yy.parseError=="function"?this.parseError=N.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var ti=function(){var W;return W=_.lex()||Oe,typeof W!="number"&&(W=h.symbols_[W]||W),W},w,M,A,Kt,V={},St,P,Te,Pt;;){if(M=p[p.length-1],this.defaultActions[M]?A=this.defaultActions[M]:((w===null||typeof w>"u")&&(w=ti()),A=y[M]&&y[M][w]),typeof A>"u"||!A.length||!A[0]){var Jt="";Pt=[];for(St in y[M])this.terminals_[St]&&St>Gs&&Pt.push("'"+this.terminals_[St]+"'");_.showPosition?Jt="Parse error on line "+(x+1)+`:
`+_.showPosition()+`
Expecting `+Pt.join(", ")+", got '"+(this.terminals_[w]||w)+"'":Jt="Parse error on line "+(x+1)+": Unexpected "+(w==Oe?"end of input":"'"+(this.terminals_[w]||w)+"'"),this.parseError(Jt,{text:_.match,token:this.terminals_[w]||w,line:_.yylineno,loc:Yt,expected:Pt})}if(A[0]instanceof Array&&A.length>1)throw new Error("Parse Error: multiple actions possible at state: "+M+", token: "+w);switch(A[0]){case 1:p.push(w),g.push(_.yytext),m.push(_.yylloc),p.push(A[1]),w=null,Ce=_.yyleng,Vt=_.yytext,x=_.yylineno,Yt=_.yylloc;break;case 2:if(P=this.productions_[A[1]][1],V.$=g[g.length-P],V._$={first_line:m[m.length-(P||1)].first_line,last_line:m[m.length-1].last_line,first_column:m[m.length-(P||1)].first_column,last_column:m[m.length-1].last_column},Xs&&(V._$.range=[m[m.length-(P||1)].range[0],m[m.length-1].range[1]]),Kt=this.performAction.apply(V,[Vt,Ce,x,N.yy,A[1],g,m].concat(Qs)),typeof Kt<"u")return Kt;P&&(p=p.slice(0,-1*P*2),g=g.slice(0,-1*P),m=m.slice(0,-1*P)),p.push(this.productions_[A[1]][0]),g.push(V.$),m.push(V._$),Te=y[p[p.length-2]][p[p.length-1]],p.push(Te);break;case 3:return!0}}return!0}},u=function(){var d={EOF:1,parseError:function(h,p){if(this.yy.parser)this.yy.parser.parseError(h,p);else throw new Error(h)},setInput:function(c,h){return this.yy=h||this.yy||{},this._input=c,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var c=this._input[0];this.yytext+=c,this.yyleng++,this.offset++,this.match+=c,this.matched+=c;var h=c.match(/(?:\r\n?|\n).*/g);return h?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),c},unput:function(c){var h=c.length,p=c.split(/(?:\r\n?|\n)/g);this._input=c+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-h),this.offset-=h;var g=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),p.length-1&&(this.yylineno-=p.length-1);var m=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:p?(p.length===g.length?this.yylloc.first_column:0)+g[g.length-p.length].length-p[0].length:this.yylloc.first_column-h},this.options.ranges&&(this.yylloc.range=[m[0],m[0]+this.yyleng-h]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(c){this.unput(this.match.slice(c))},pastInput:function(){var c=this.matched.substr(0,this.matched.length-this.match.length);return(c.length>20?"...":"")+c.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var c=this.match;return c.length<20&&(c+=this._input.substr(0,20-c.length)),(c.substr(0,20)+(c.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var c=this.pastInput(),h=new Array(c.length+1).join("-");return c+this.upcomingInput()+`
`+h+"^"},test_match:function(c,h){var p,g,m;if(this.options.backtrack_lexer&&(m={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(m.yylloc.range=this.yylloc.range.slice(0))),g=c[0].match(/(?:\r\n?|\n).*/g),g&&(this.yylineno+=g.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:g?g[g.length-1].length-g[g.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+c[0].length},this.yytext+=c[0],this.match+=c[0],this.matches=c,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(c[0].length),this.matched+=c[0],p=this.performAction.call(this,this.yy,this,h,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),p)return p;if(this._backtrack){for(var y in m)this[y]=m[y];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var c,h,p,g;this._more||(this.yytext="",this.match="");for(var m=this._currentRules(),y=0;y<m.length;y++)if(p=this._input.match(this.rules[m[y]]),p&&(!h||p[0].length>h[0].length)){if(h=p,g=y,this.options.backtrack_lexer){if(c=this.test_match(p,m[y]),c!==!1)return c;if(this._backtrack){h=!1;continue}else return!1}else if(!this.options.flex)break}return h?(c=this.test_match(h,m[g]),c!==!1?c:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var h=this.next();return h||this.lex()},begin:function(h){this.conditionStack.push(h)},popState:function(){var h=this.conditionStack.length-1;return h>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(h){return h=this.conditionStack.length-1-Math.abs(h||0),h>=0?this.conditionStack[h]:"INITIAL"},pushState:function(h){this.begin(h)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(h,p,g,m){switch(g){case 0:return"(";case 1:return")";case 2:return"SPLAT";case 3:return"PARAM";case 4:return"LITERAL";case 5:return"LITERAL";case 6:return"EOF"}},rules:[/^(?:\()/,/^(?:\))/,/^(?:\*+\w+)/,/^(?::+\w+)/,/^(?:[\w%\-~\n]+)/,/^(?:.)/,/^(?:$)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6],inclusive:!0}}};return d}();a.lexer=u;function f(){this.yy={}}return f.prototype=a,a.Parser=f,new f}();typeof Wi<"u"&&(r.parser=t,r.Parser=t.Parser,r.parse=function(){return t.parse.apply(t,arguments)})})(Ts);function K(r){return function(t,e){return{displayName:r,props:t,children:e||[]}}}var Rs={Root:K("Root"),Concat:K("Concat"),Literal:K("Literal"),Splat:K("Splat"),Param:K("Param"),Optional:K("Optional")},Us=Ts.parser;Us.yy=Rs;var Yi=Us,Ki=Object.keys(Rs);function Ji(r){return Ki.forEach(function(t){if(typeof r[t]>"u")throw new Error("No handler defined for "+t.displayName)}),{visit:function(t,e){return this.handlers[t.displayName].call(this,t,e)},handlers:r}}var Ns=Ji,Zi=Ns,Gi=/[\-{}\[\]+?.,\\\^$|#\s]/g;function Ms(r){this.captures=r.captures,this.re=r.re}Ms.prototype.match=function(r){var t=this.re.exec(r),e={};if(t)return this.captures.forEach(function(s,i){typeof t[i+1]>"u"?e[s]=void 0:e[s]=decodeURIComponent(t[i+1])}),e};var Qi=Zi({Concat:function(r){return r.children.reduce((function(t,e){var s=this.visit(e);return{re:t.re+s.re,captures:t.captures.concat(s.captures)}}).bind(this),{re:"",captures:[]})},Literal:function(r){return{re:r.props.value.replace(Gi,"\\$&"),captures:[]}},Splat:function(r){return{re:"([^?]*?)",captures:[r.props.name]}},Param:function(r){return{re:"([^\\/\\?]+)",captures:[r.props.name]}},Optional:function(r){var t=this.visit(r.children[0]);return{re:"(?:"+t.re+")?",captures:t.captures}},Root:function(r){var t=this.visit(r.children[0]);return new Ms({re:new RegExp("^"+t.re+"(?=\\?|$)"),captures:t.captures})}}),Xi=Qi,tr=Ns,er=tr({Concat:function(r,t){var e=r.children.map((function(s){return this.visit(s,t)}).bind(this));return e.some(function(s){return s===!1})?!1:e.join("")},Literal:function(r){return decodeURI(r.props.value)},Splat:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Param:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Optional:function(r,t){var e=this.visit(r.children[0],t);return e||""},Root:function(r,t){t=t||{};var e=this.visit(r.children[0],t);return e?encodeURI(e):!1}}),sr=er,ir=Yi,rr=Xi,nr=sr;xt.prototype=Object.create(null);xt.prototype.match=function(r){var t=rr.visit(this.ast),e=t.match(r);return e||!1};xt.prototype.reverse=function(r){return nr.visit(this.ast,r)};function xt(r){var t;if(this?t=this:t=Object.create(xt.prototype),typeof r>"u")throw new Error("A route spec is required");return t.spec=r,t.ast=ir.parse(r),t}var or=xt,ar=or,lr=ar;const cr=Vi(lr);var hr=Object.defineProperty,Ls=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&hr(t,e,i),i};const Hs=class extends G{constructor(t,e,s=""){super(),this._cases=[],this._fallback=()=>ct` <h1>Not Found</h1> `,this._cases=t.map(i=>({...i,route:new cr(i.path)})),this._historyObserver=new tt(this,e),this._authObserver=new tt(this,s)}connectedCallback(){this._historyObserver.observe(({location:t})=>{console.log("New location",t),t&&(this._match=this.matchRoute(t))}),this._authObserver.observe(({user:t})=>{this._user=t}),super.connectedCallback()}render(){return console.log("Rendering for match",this._match,this._user),ct` <main>${(()=>{const e=this._match;if(e){if("view"in e)return this._user?e.auth&&e.auth!=="public"&&this._user&&!this._user.authenticated?(ps(this,"auth/redirect"),ct` <h1>Redirecting for Login</h1> `):(console.log("Loading view, ",e.params,e.query),e.view(e.params||{},e.query)):ct` <h1>Authenticating</h1> `;if("redirect"in e){const s=e.redirect;if(typeof s=="string")return this.redirect(s),ct` <h1>Redirecting to ${s}…</h1> `}}return this._fallback({})})()}</main> `}updated(t){t.has("_match")&&this.requestUpdate()}matchRoute(t){const{search:e,pathname:s}=t,i=new URLSearchParams(e),n=s+e;for(const o of this._cases){const l=o.route.match(n);if(l)return{...o,path:s,params:l,query:i}}}redirect(t){me(this,"history/redirect",{href:t})}};Hs.styles=Ai`
    :host,
    main {
      display: contents;
    }
  `;let Nt=Hs;Ls([Os()],Nt.prototype,"_user");Ls([Os()],Nt.prototype,"_match");const dr=Object.freeze(Object.defineProperty({__proto__:null,Element:Nt,Switch:Nt},Symbol.toStringTag,{value:"Module"})),js=class Is extends HTMLElement{constructor(){if(super(),zt(this).template(Is.template),this.shadowRoot){const t=this.shadowRoot.querySelector("slot[name='actuator']");t&&t.addEventListener("click",()=>this.toggle())}}toggle(){this.hasAttribute("open")?this.removeAttribute("open"):this.setAttribute("open","open")}};js.template=z`
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
  `;let ur=js;const pr=Object.freeze(Object.defineProperty({__proto__:null,Element:ur},Symbol.toStringTag,{value:"Module"})),zs=class oe extends HTMLElement{constructor(){super(),this._array=[],zt(this).template(oe.template).styles(oe.styles),this.addEventListener("input-array:add",t=>{t.stopPropagation(),this.append(Ds("",this._array.length))}),this.addEventListener("input-array:remove",t=>{t.stopPropagation(),this.removeClosestItem(t.target)}),this.addEventListener("change",t=>{t.stopPropagation();const e=t.target;if(e&&e!==this){const s=new Event("change",{bubbles:!0}),i=e.value,n=e.closest("label");if(n){const o=Array.from(this.children).indexOf(n);this._array[o]=i,this.dispatchEvent(s)}}}),this.addEventListener("click",t=>{re(t,"button.add")?Ot(t,"input-array:add"):re(t,"button.remove")&&Ot(t,"input-array:remove")})}get name(){return this.getAttribute("name")}get value(){return this._array}set value(t){this._array=Array.isArray(t)?t:[t],fr(this._array,this)}removeClosestItem(t){const e=t.closest("label");if(console.log("Removing closest item:",e,t),e){const s=Array.from(this.children).indexOf(e);this._array.splice(s,1),e.remove()}}};zs.template=z`
    <template>
      <ul>
        <slot></slot>
      </ul>
      <button class="add">
        <slot name="label-add">Add one</slot>
        <style></style>
      </button>
    </template>
  `;zs.styles=ms`
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
  `;function fr(r,t){t.replaceChildren(),r.forEach((e,s)=>t.append(Ds(e)))}function Ds(r,t){const e=r===void 0?z`<input />`:z`<input value="${r}" />`;return z`
    <label>
      ${e}
      <button class="remove" type="button">Remove</button>
    </label>
  `}function Bt(r){return Object.entries(r).map(([t,e])=>{customElements.get(t)||customElements.define(t,e)}),customElements}var mr=Object.defineProperty,gr=Object.getOwnPropertyDescriptor,yr=(r,t,e,s)=>{for(var i=gr(t,e),n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&mr(t,e,i),i};class vr extends G{constructor(t){super(),this._pending=[],this._observer=new tt(this,t)}get model(){return this._lastModel=this._context?this._context.value:{},this._lastModel}connectedCallback(){var t;super.connectedCallback(),(t=this._observer)==null||t.observe().then(e=>{console.log("View effect (initial)",this,e),this._context=e.context,this._pending.length&&this._pending.forEach(([s,i])=>{console.log("Dispatching queued event",i,s),s.dispatchEvent(i)}),e.setEffect(()=>{var s;if(console.log("View effect",this,e,(s=this._context)==null?void 0:s.value),this._context)console.log("requesting update"),this.requestUpdate();else throw"View context not ready for effect"})})}dispatchMessage(t,e=this){const s=new CustomEvent("mu:message",{bubbles:!0,composed:!0,detail:t});this._context?(console.log("Dispatching message event",s),e.dispatchEvent(s)):(console.log("Queueing message event",s),this._pending.push([e,s]))}ref(t){return this.model?this.model[t]:void 0}}yr([Cs()],vr.prototype,"model");/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ct=globalThis,be=Ct.ShadowRoot&&(Ct.ShadyCSS===void 0||Ct.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$e=Symbol(),Ze=new WeakMap;let Bs=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==$e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(be&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Ze.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Ze.set(e,t))}return t}toString(){return this.cssText}};const _r=r=>new Bs(typeof r=="string"?r:r+"",void 0,$e),S=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new Bs(e,r,$e)},br=(r,t)=>{if(be)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=Ct.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},Ge=be?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return _r(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:$r,defineProperty:wr,getOwnPropertyDescriptor:xr,getOwnPropertyNames:Ar,getOwnPropertySymbols:Er,getPrototypeOf:Sr}=Object,T=globalThis,Qe=T.trustedTypes,Pr=Qe?Qe.emptyScript:"",Qt=T.reactiveElementPolyfillSupport,pt=(r,t)=>r,Mt={toAttribute(r,t){switch(t){case Boolean:r=r?Pr:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},we=(r,t)=>!$r(r,t),Xe={attribute:!0,type:String,converter:Mt,reflect:!1,useDefault:!1,hasChanged:we};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),T.litPropertyMetadata??(T.litPropertyMetadata=new WeakMap);let Z=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Xe){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&wr(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=xr(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){const l=i==null?void 0:i.call(this);n==null||n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Xe}static _$Ei(){if(this.hasOwnProperty(pt("elementProperties")))return;const t=Sr(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(pt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(pt("properties"))){const e=this.properties,s=[...Ar(e),...Er(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Ge(i))}else t!==void 0&&e.push(Ge(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return br(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var n;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:Mt).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){var n,o;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const l=s.getPropertyOptions(i),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((n=l.converter)==null?void 0:n.fromAttribute)!==void 0?l.converter:Mt;this._$Em=i,this[i]=a.fromAttribute(e,l.type)??((o=this._$Ej)==null?void 0:o.get(i))??null,this._$Em=null}}requestUpdate(t,e,s){var i;if(t!==void 0){const n=this.constructor,o=this[t];if(s??(s=n.getPropertyOptions(t)),!((s.hasChanged??we)(o,e)||s.useDefault&&s.reflect&&o===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i){const{wrapped:l}=o,a=this[n];l!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,o,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};Z.elementStyles=[],Z.shadowRootOptions={mode:"open"},Z[pt("elementProperties")]=new Map,Z[pt("finalized")]=new Map,Qt==null||Qt({ReactiveElement:Z}),(T.reactiveElementVersions??(T.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ft=globalThis,Lt=ft.trustedTypes,ts=Lt?Lt.createPolicy("lit-html",{createHTML:r=>r}):void 0,Fs="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,qs="?"+O,kr=`<${qs}>`,F=document,yt=()=>F.createComment(""),vt=r=>r===null||typeof r!="object"&&typeof r!="function",xe=Array.isArray,Cr=r=>xe(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",Xt=`[ 	
\f\r]`,ht=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,es=/-->/g,ss=/>/g,H=RegExp(`>|${Xt}(?:([^\\s"'>=/]+)(${Xt}*=${Xt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),is=/'/g,rs=/"/g,Vs=/^(?:script|style|textarea|title)$/i,Or=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),v=Or(1),rt=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),ns=new WeakMap,I=F.createTreeWalker(F,129);function Ws(r,t){if(!xe(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ts!==void 0?ts.createHTML(t):t}const Tr=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=ht;for(let l=0;l<e;l++){const a=r[l];let u,f,d=-1,c=0;for(;c<a.length&&(o.lastIndex=c,f=o.exec(a),f!==null);)c=o.lastIndex,o===ht?f[1]==="!--"?o=es:f[1]!==void 0?o=ss:f[2]!==void 0?(Vs.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=H):f[3]!==void 0&&(o=H):o===H?f[0]===">"?(o=i??ht,d=-1):f[1]===void 0?d=-2:(d=o.lastIndex-f[2].length,u=f[1],o=f[3]===void 0?H:f[3]==='"'?rs:is):o===rs||o===is?o=H:o===es||o===ss?o=ht:(o=H,i=void 0);const h=o===H&&r[l+1].startsWith("/>")?" ":"";n+=o===ht?a+kr:d>=0?(s.push(u),a.slice(0,d)+Fs+a.slice(d)+O+h):a+O+(d===-2?l:h)}return[Ws(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class _t{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[u,f]=Tr(t,e);if(this.el=_t.createElement(u,s),I.currentNode=this.el.content,e===2||e===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=I.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const d of i.getAttributeNames())if(d.endsWith(Fs)){const c=f[o++],h=i.getAttribute(d).split(O),p=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:p[2],strings:h,ctor:p[1]==="."?Ur:p[1]==="?"?Nr:p[1]==="@"?Mr:Ft}),i.removeAttribute(d)}else d.startsWith(O)&&(a.push({type:6,index:n}),i.removeAttribute(d));if(Vs.test(i.tagName)){const d=i.textContent.split(O),c=d.length-1;if(c>0){i.textContent=Lt?Lt.emptyScript:"";for(let h=0;h<c;h++)i.append(d[h],yt()),I.nextNode(),a.push({type:2,index:++n});i.append(d[c],yt())}}}else if(i.nodeType===8)if(i.data===qs)a.push({type:2,index:n});else{let d=-1;for(;(d=i.data.indexOf(O,d+1))!==-1;)a.push({type:7,index:n}),d+=O.length-1}n++}}static createElement(t,e){const s=F.createElement("template");return s.innerHTML=t,s}}function nt(r,t,e=r,s){var o,l;if(t===rt)return t;let i=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const n=vt(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=nt(r,i._$AS(r,t.values),i,s)),t}class Rr{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??F).importNode(e,!0);I.currentNode=i;let n=I.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let u;a.type===2?u=new At(n,n.nextSibling,this,t):a.type===1?u=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(u=new Lr(n,this,t)),this._$AV.push(u),a=s[++l]}o!==(a==null?void 0:a.index)&&(n=I.nextNode(),o++)}return I.currentNode=F,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class At{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=nt(this,t,e),vt(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==rt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Cr(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==$&&vt(this._$AH)?this._$AA.nextSibling.data=t:this.T(F.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=_t.createElement(Ws(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(e);else{const o=new Rr(i,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(t){let e=ns.get(t.strings);return e===void 0&&ns.set(t.strings,e=new _t(t)),e}k(t){xe(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new At(this.O(yt()),this.O(yt()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class Ft{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=$}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=nt(this,t,e,0),o=!vt(t)||t!==this._$AH&&t!==rt,o&&(this._$AH=t);else{const l=t;let a,u;for(t=n[0],a=0;a<n.length-1;a++)u=nt(this,l[s+a],e,a),u===rt&&(u=this._$AH[a]),o||(o=!vt(u)||u!==this._$AH[a]),u===$?t=$:t!==$&&(t+=(u??"")+n[a+1]),this._$AH[a]=u}o&&!i&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ur extends Ft{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}}class Nr extends Ft{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}}class Mr extends Ft{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=nt(this,t,e,0)??$)===rt)return;const s=this._$AH,i=t===$&&s!==$||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==$&&(s===$||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Lr{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){nt(this,t)}}const te=ft.litHtmlPolyfillSupport;te==null||te(_t,At),(ft.litHtmlVersions??(ft.litHtmlVersions=[])).push("3.3.0");const Hr=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new At(t.insertBefore(yt(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const D=globalThis;class E extends Z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Hr(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return rt}}var os;E._$litElement$=!0,E.finalized=!0,(os=D.litElementHydrateSupport)==null||os.call(D,{LitElement:E});const ee=D.litElementPolyfillSupport;ee==null||ee({LitElement:E});(D.litElementVersions??(D.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const jr={attribute:!0,type:String,converter:Mt,reflect:!1,hasChanged:we},Ir=(r=jr,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.C(o,void 0,r,l),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function k(r){return(t,e)=>typeof e=="object"?Ir(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ys(r){return k({...r,state:!0,attribute:!1})}const zr=S`
    .mansalva-regular {
        font-family: "Mansalva", sans-serif;
        font-weight: 400;
        font-style: normal;
        margin: 0 0;
    }

    h3, h2, h1, p, td, th, a, li, label {
        color: var(--color-text);
        text-shadow: var(--color-text-shadow);
        font-family: "Mansalva", sans-serif;
    }
    
    `,R={styles:zr},Dr=S`
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
        margin: 0 0.5em 0 0.5em;
    }
`,U={styles:Dr},Br=S`
    svg.icon {
        display: inline;
        height: 1.75em;
        width: 1.75em;
        vertical-align: text-top;
        fill: currentColor;
    }
    `,Et={styles:Br};var Fr=Object.defineProperty,Ks=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Fr(t,e,i),i};function qr(r){const e=r.target.checked;fs.relay(r,"dark-mode",{checked:e})}function Vr(r){fs.relay(r,"auth:message",["auth/signout"])}const Ht=class Ht extends E{constructor(){super(...arguments),this.loggedIn=!1,this._authObserver=new tt(this,"beeswarm:auth")}render(){return v`
             <header>
                <div class="navbar">
                    <div class="logo-flex">
                        <h1  @click=${()=>window.location.href="/"}>bee swarm simulator
                            <svg class="icon">
                                <use href="/icons/bee.svg#icon-bee" />
                            </svg>
                        </h1>
                    </div>

                    <div class="dark-flex">
                    <mu-dropdown>
                        <a slot="actuator">
                            Hello, ${this.userid||"beekeeper"}
                        </a>
                        <menu>
                            <li>
                                <label @change=${qr}>
                                    <input type="checkbox" />
                                    Dark Mode
                                </label>
                            </li>
                            <li class="when-signed-in">
                                <a id="signout" @click=${Vr}>Sign Out</a>
                            </li>
                            <li class="when-signed-out">
                                <a href="/login">Sign In</a>
                            </li>
                        </menu>
                    </mu-dropdown>
                    </div>
                </div>
            </header>
        `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&t.authenticated?(this.loggedIn=!0,this.userid=t.username):(this.loggedIn=!1,this.userid=void 0)})}static initializeOnce(){function t(e,s){e.classList.toggle("dark-mode",s)}document.body.addEventListener("dark-mode",e=>{var s;return t(e.currentTarget,(s=e.detail)==null?void 0:s.checked)})}};Ht.uses=Bt({"mu-dropdown":pr.Element}),Ht.styles=[U.styles,R.styles,Et.styles,S`
            .navbar {
                display: flex;
                justify-content: space-between;
                
                background-color: var(--color-primary);
                width: 100%;
                height: 5em;
                margin-top: -0.5em;
                
                > .logo-flex {
                    padding-left: 1em;
                }
                
                > .dark-flex {
                    padding-right: 1em;
                }    
            }
    
        `];let ot=Ht;Ks([Ys()],ot.prototype,"loggedIn");Ks([Ys()],ot.prototype,"userid");const Ae=class Ae extends E{render(){return v`
            <img class="main-image" src="/images/bss.png" alt="Bee Swarm Simulator">
            <hr>
            <p class="body-content-intro-text">a simulator game on Roblox that entails whacking a pad of flowers to collect pollen, crack open eggs,
                all to collect bees!<br>aka a great way to waste time<br><br>free to play (with micro transactions of course)</p>
            <hr>
            <h1 class="header-text">The Hub</h1>
            <div class="body-content index-grid">
                <div class="small-border-box">
                    <h3 class="title-text">0 Bee Zone</h3>
                    <p>Fields</p>
                    <ul>
                        <li>
                            <a href="/app/field/dandelion">Dandelion Field</a>
                        </li>
                    </ul>
                    <p>Shops</p>
                    <ul>
                        <li>
                            <a href="/app/shops/noob-shop">Noob Shop</a>
                        </li>
                    </ul>
                    <p>NPCs</p>
                    <ul>
                        <li>
                            <a href="/npcs/blackbear.html">Black bear</a>
                        </li>
                        <li>
                            <a href="/npcs/motherbear.html">Mother bear</a>
                        </li>
                    </ul>
                </div>
                <div class="small-border-box">
                    <h3 class="title-text">5 Bee Zone</h3>
                    <p>Fields</p>
                    <ul>
                        <li>
                            <a href="/app/field/spider">Spider Field</a>
                        </li>
                        <li>
                            <a href="/app/field/bamboo">Bamboo Field</a>
                        </li>
                    </ul>
                    <p>No shop in zone</p>
                    <p>NPCs</p>
                    <!--                    <p>in progress</p>-->
                    <ul>
                        <li>
                            <a href="/npcs/pandabear.html">Panda bear</a>
                        </li>
                    </ul>
                </div>
                <div class="small-border-box">
                    <h3 class="title-text">Miscellaneous</h3>
                    <ul>
                        <li>
                            <a href="/app/eggs">Eggs</a>
                        </li>
                        <li>
                            <a href="/app/bees">Bees</a>
                        </li>
                    </ul>
                </div>
            </div>
            <br>
            <br>
    `}};Ae.styles=[U.styles,R.styles,Et.styles,S`
            .main-image {
                opacity: 0.65;
            }

            .body-content-intro-text {
                text-align: center;
                padding-bottom: 1em;
            }

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
        `];let ae=Ae;var Wr=Object.defineProperty,Js=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Wr(t,e,i),i};const Ee=class Ee extends E{constructor(){super(...arguments),this.src="/api/eggs",this.eggs=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){return v`
            ${this.eggs.map(t=>v`
                <div class="shop-box">
                    <img width="100px" src="${t.imgsrc}" alt="egg image" />
                    <div class="info">
                        <h3>${t.eggname}</h3>
                        <hr>
                        <p>Cost: ${t.cost}</p>
                        <hr>
                        <p>Bee Hatch Chances:</p>
                        <table class="table">
                            <tr>
                                <th>Rarity</th>
                                <th>Chance</th>
                            </tr>
                            <tr>
                                <td>Common</td>
                                <td>${t.rarity[0]}%</td>
                            </tr>
                            <tr>
                                <td>Rare</td>
                                <td>${t.rarity[1]}%</td>
                            </tr>
                            <tr>
                                <td>Epic</td>
                                <td>${t.rarity[2]}%</td>
                            </tr>
                            <tr>
                                <td>Legendary</td>
                                <td>${t.rarity[3]}%</td>
                            </tr>
                        </table>
                    </div>
                </div>
            `)}
        `}hydrate(t){fetch(t).then(e=>e.json()).then(e=>{console.log(e.eggs),this.eggs=e.eggs}).catch(e=>console.error("error getting egg data:",e))}};Ee.styles=[U.styles,R.styles,S`
            .shop-box {    
                display: flex;
                align-items: center;
                gap: 20px;
                border: var(--box-border-width) solid var(--box-border-color);
                padding: 20px 25px;

                > img {
                    width: 150px;
                    margin: 0 1.5em 0 1.5em;
                }

                .info {    
                    flex-grow: 1;
                    margin: 0 1.5em 0 0;
                    padding-bottom: 1.5em;
                }
            }

            .table {   
                width: 100%;
                border-collapse: collapse;

                >th, td {
                    border: 1px solid black;
                    padding: 10px 1px 10px 10px;
                    text-align: left;
                }
            }
        `];let bt=Ee;Js([k()],bt.prototype,"src");Js([k({type:Array})],bt.prototype,"eggs");const jt=class jt extends E{render(){return v`
            <br>
            <br>
            <div class="body-content-intro-text">
                <h1 class="page-title">the Bee Swarm Simulator Egg List</h1>
                <p>In Bee Swarm, eggs hatch bees.</p>
                <p>Eggs are usually purchasable, though rarer eggs tend to be quite difficult to consistently acquire.</p>
            </div>
            <br>
            <hr />
            <br>
            <div class="body-content">
                <h3 class="title-text">Eggs</h3>
                <egg-container></egg-container>
            </div>
            `}};jt.uses=Bt({"egg-container":bt}),jt.styles=[U.styles,R.styles,Et.styles,S`
            .body-content-intro-text {
                text-align: center;
                padding-bottom: 1em;
            }

            .page-title {
                font-family: "Mansalva", sans-serif;
                text-shadow:  2px 2px var(--color-text-shadow);
            }

            .title-text {
                background-color: var(--color-tertiary);
                text-align: center;
                font-size: var(--font-size-medium);
                padding: 0.5em 0.5em 0.5em 0.5em;
            }

        `];let le=jt;var Yr=Object.defineProperty,qt=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Yr(t,e,i),i};const Se=class Se extends E{constructor(){super(...arguments),this.src="/api/bees",this.common=[],this.rare=[],this.legendary=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){return v`
            <h3 class="title-text">Common Bees</h3>
            <div class="bee-container">
                ${this.renderBeeBox(this.common)}
            </div>
            <br>
            <hr>
            <br>
            <h3 class="title-text">Rare Bees</h3>
            <div class="bee-container">
                ${this.renderBeeBox(this.rare)}
            </div>
            <br>
            <hr>
            <br>
            <h3 class="title-text">Legendary Bees</h3>
            <div class="bee-container">
                ${this.renderBeeBox(this.legendary)}
            </div>
        `}renderBeeBox(t){return t.map(e=>v`
            <div class="bee-box">
                <h3>${e.beename}</h3>
                <p>${e.desc}<hr>
                <img src=${e.imgsrc}
                     alt="bee">
                <hr>
                <p>Token Ability: ${e.ability}</p>
                <hr>
                <p>Bee Stats:</p>
                <table class="table">
                    <tr>
                        <td>Energy</td>
                        <td>${e.stats[0]}</td>
                    </tr>
                    <tr>
                        <td>Attack</td>
                        <td>${e.stats[1]}</td>
                    </tr>
                    <tr>
                        <td>Speed</td>
                        <td>${e.stats[2]}</td>
                    </tr>
                    <tr>
                        <td>Pollen Collection Rate</td>
                        <td>${e.stats[3]}</td>
                    </tr>
                </table>
            </div>
        `)}hydrate(t){fetch(t).then(e=>e.json()).then(e=>{e!=null&&e.bees&&(this.common=e.bees.filter(s=>s.rarity==="common"),this.rare=e.bees.filter(s=>s.rarity==="rare"),this.legendary=e.bees.filter(s=>s.rarity==="legendary"))}).catch(e=>console.error("error getting bee data:",e))}};Se.styles=[U.styles,R.styles,S`
            .bee-container {
                display: flex;
                flex-wrap: wrap;
                gap: 1em;
            }

            .bee-box {
                border: var(--box-border-width) solid var(--box-border-color);
                flex-basis: 270px;
                flex-grow: 1;
                padding: 0 1em 1em 1em;

                > img {
                    width: 80%;
                }
            }

            .title-text {
                background-color: var(--color-tertiary);
                text-align: center;
                font-size: var(--font-size-medium);
                padding: 0.5em 0.5em 0.5em 0.5em;
            }
        `];let q=Se;qt([k()],q.prototype,"src");qt([k({type:Array})],q.prototype,"common");qt([k({type:Array})],q.prototype,"rare");qt([k({type:Array})],q.prototype,"legendary");const It=class It extends E{render(){return v`
            <br>
            <br>
            <div class="body-content-intro-text">
                <h1 class="page-title">the bee swarm simulator bees list</h1>
                <p>your little fuzzy friends who fight for you, collect pollen for you, and convert pollen to honey for you</p>
                <p>treat them well</p>
            </div>
            <br>
            <hr> 
            <br>
            <div class="body-content">
                <bee-container></bee-container>
            </div>
        `}};It.uses=Bt({"bee-container":q}),It.styles=[U.styles,R.styles,Et.styles,S`
            .body-content-intro-text {
                text-align: center;
                padding-bottom: 1em;
            }

            .page-title {
                font-family: "Mansalva", sans-serif;
                text-shadow: 2px 2px var(--color-text-shadow);
            }

        `];let ce=It;var Kr=Object.defineProperty,Zs=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Kr(t,e,i),i};const Pe=class Pe extends E{connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){var t,e,s,i,n,o,l,a;return v`
            <div class="body-content-intro-text">
                <h1 class="page-title">${(t=this.field)==null?void 0:t.fieldname} field</h1>
                <p>${(e=this.field)==null?void 0:e.desc}</p>
            </div>
            <hr>
            <div class="img-under-text">
                <img src="${(s=this.field)==null?void 0:s.image}" alt="an image of a field">
            </div>
            <hr>
            <br>
            <div class="body-content-field">
                <div class="two-one-grid">
                    <div>
                        <h3 class="title-text">Mob(s)</h3>
                        <div class="mobs-flex">
                            ${(n=(i=this.field)==null?void 0:i.mobs)!=null&&n.length?this.renderMobBox((o=this.field)==null?void 0:o.mobs):v`<p>No mobs in this field</p>`}
                        </div>
                    </div>

                    <div>
                        <h3 class="title-text">Flower(s)</h3>
                        ${(a=(l=this.field)==null?void 0:l.flowers)!=null&&a.length?this.renderFlowerBox(this.field.flowers):v`<p>No flowers in this field</p>`}       
                    </div>

                </div>
            </div>
    `}renderMobBox(t=[]){return console.log(t[0]),console.log(t[0].mobname),t.map(e=>{var s,i,n;return v`
            <div class="mob-box">
                <h3>${e.mobname} (level ${e.level})</h3>
                <br>
                <hr />
                <img class="mob-img" src="${e.image}" alt="imagine a mob picture" />
                <hr />
                <p>Mob Stats</p>
                <table class="table">
                    <tr>
                        <td>Health</td>
                        <td>${(s=e.stats)==null?void 0:s.health}</td>
                    </tr>
                    <tr>
                        <td>Damage</td>
                        <td>${(i=e.stats)==null?void 0:i.damage}</td>
                    </tr>
                    <tr>
                        <td>Honey Dropped</td>
                        <td>${(n=e.stats)==null?void 0:n.drop}</td>
                    </tr>
                </table>
            </div>
        `})}renderFlowerBox(t){return t.map(e=>v`
            <div class="flower-box">
                <svg class="flower-icon">
                    <use href="../../icons/bee.svg#icon-flower"></use>
                </svg>
                <p>${e} flowers</p>
            </div>
        `)}hydrate(t){fetch(t).then(e=>e.json()).then(e=>{this.field=e}).catch(e=>console.error("error getting field+mob data:",e))}};Pe.styles=[U.styles,R.styles,S`
            .body-content-intro-text {
                text-align: center;
                padding-bottom: 1em;
            }

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

            .two-one-grid { 
                display: grid;
                grid-template-columns: 2fr 1fr;
                width: 100%;
                gap: var(--box-gap);

                @media screen and (max-width: 50rem) {
                    grid-template-columns: 1fr;
                }
            }

            .title-text {
                background-color: var(--color-tertiary);
                text-align: center;
                font-size: var(--font-size-medium);
                padding: 0.5em 0.5em 0.5em 0.5em;
            }

            .page-title {
                font-family: "Mansalva", sans-serif;
                text-shadow:  2px 2px var(--color-text-shadow);
            }
            
            .mob-box {   
                border: var(--box-border-width) solid var(--box-border-color);
                padding: 10px 20px;
                flex-basis: 250px;
                flex-grow: 1;

                >.mob-img {
                    width: 90%;
                }
            }
            
            .mobs-flex {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5em;
            }
            
            .flower-box {  
                display: flex;
                flex-wrap: wrap;
                border: var(--box-border-width) solid var(--box-border-color);

                >.flower-icon {
                    width: var(--icon-size);
                    height: var(--icon-size);
                }
            }

            .table {   
                width: 100%;
                border-collapse: collapse;

                >th, td {
                    border: 1px solid black;
                    padding: 10px 1px 10px 10px;
                    text-align: left;
                }
            }
        `];let $t=Pe;Zs([k({type:String})],$t.prototype,"src");Zs([k({type:Object})],$t.prototype,"field");const ke=class ke extends E{render(){return v`
            <br>
            <br>
            <div class="body-content-intro-text">
                <h1 class="page-title">welcome to the noob shop</h1>
                <p>the home of your first bee swarm simulator purchase!</p>
            </div>
            <br>
            <hr>
            <br>
            <div class="body-content">
                <div class="two-one-grid">
                    <div>
                        <h3 class="title-text">Player Gear</h3>
                        <h3 class="subtitle-text">Head</h3>
                        <div class="shop-box">
                            <img src="/images/tools/helmet.jpeg" alt="helmet">
                            <div class="info">
                                <h3>helmet</h3>
                                <p>upgraded defense!</p>
                                <hr>
                                <p>price: 30000 honey</p>
                                <p>+25% defense</p>
                            </div>
                        </div>
                        <h3 class="subtitle-text">Belt</h3>
                        <div class="shop-box">
                            <img src="/images/tools/belt-pocket.webp" alt="belt pocket">
                            <div class="info">
                                <h3>belt pocket</h3>
                                <p>another pocket for pollen + a lucky charm</p>
                                <hr>
                                <p>price: 14000 honey</p>
                                <p>+25% loot luck and +5000 pollen capacity</p>
                            </div>
                        </div>
                        <h3 class="subtitle-text">Pollen Holder</h3>
                        <div class="shop-box">
                            <img src="/images/tools/pouch.webp" alt="pouch">
                            <div class="info">
                                <h3>pouch</h3>
                                <p>the starter gear</p>
                                <hr>
                                <p>capacity: 200 pollen</p>
                                <p>price: 0 honey</p>
                            </div>
                        </div>
                        <h3 class="subtitle-text">Boots</h3>
                        <div class="shop-box">
                            <img src="/images/tools/basicboots.webp" alt="basic boots">
                            <div class="info">
                                <h3>basic boots</h3>
                                <p>rain boots</p>
                                <hr>
                                <p>price: 4400 honey</p>
                                <p>+4 movement speed</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 class="title-text">Tools Sold</h3>
                        <div class="tool-boxes-flex">
                            <div class="shop-tool-box">
                                <h3>scooper</h3>
                                <p>your first tool</p>
                                <hr>
                                <img src="/images/tools/scooper.webp" alt="scooper">
                                <hr>
                                <p>cost: 0 honey</p>
                                <p>collection Range: 2 tiles</p>
                                <p>pollen Collection Rate: 2 per 0.8 seconds</p>
                            </div>
                            <div class="shop-tool-box">
                                <h3>vacuum</h3>
                                <p>brr</p>
                                <hr>
                                <img src="/images/tools/vacuum.webp" alt="vacuum">
                                <hr>
                                <p>cost: 14000 honey</p>
                                <p>collection Range: 13 tiles</p>
                                <p>pollen Collection Rate: 2 per 0.8 seconds</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `}};ke.styles=[U.styles,R.styles,Et.styles,S`
            .body-content-intro-text {
                text-align: center;
                padding-bottom: 1em;
            }

            .page-title {
                font-family: "Mansalva", sans-serif;
                text-shadow:  2px 2px var(--color-text-shadow);
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
            
            .two-one-grid { 
                display: grid;
                grid-template-columns: 2fr 1fr;
                width: 100%;
                gap: var(--box-gap);

                @media screen and (max-width: 60rem) {
                    grid-template-columns: 1fr;
                }
            }

            .shop-box {   
                display: flex;
                align-items: center;
                gap: 20px;
                border: var(--box-border-width) solid var(--box-border-color);
                padding: 20px 25px;
                margin-top: -1.35em;

                > img {
                    width: 150px;
                    margin: 0 1.5em 0 1.5em;
                }

                .info {    
                    flex-grow: 1;
                    margin: 0 1.5em 0 0;
                }
            }

            .tool-boxes-flex {
                @media screen and (max-width: 60rem) {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1em;
                }
            }
            
            .shop-tool-box {   
                border: var(--box-border-width) solid var(--box-border-color);
                padding: 0 20px;
                margin-bottom: 1em;

                > img {
                    height: 250px;
                    padding: 1em 0;
                }

                @media screen and (max-width: 60rem) {
                    flex-grow: 1;
                }

            }
        
    `];let he=ke;const Jr={};function Zr(r,t,e){switch(r[0]){case"profile/save":Gr(r[1],e).then(i=>t(n=>({...n,profile:i}))).then(()=>{const{onSuccess:i}=r[1];i&&i()}).catch(i=>{const{onFailure:n}=r[1];n&&n(i)});break;case"profile/select":Qr(r[1],e).then(i=>t(n=>({...n,profile:i})));break;default:const s=r[0];throw new Error(`Unhandled message "${s}"`)}}function Gr(r,t){return fetch(`/api/users/${r.userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...pe.headers(t)},body:JSON.stringify(r.profile)}).then(e=>{if(e.status===200)return e.json();throw new Error(`Failed to save profile for ${r.userid}`)}).then(e=>{if(e)return e})}function Qr(r,t){return fetch(`/api/users/${r.userid}`,{headers:pe.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Profile:",e),e})}const Xr=[{path:"/app/field/:name",view:r=>v`
            <field-view src="/api/fields/${r.name}"></field-view>
        `},{auth:"protected",path:"/app/profile/:id",view:r=>v`
              <profile-view user-id=${r.id}>
              </profile-view>
        `},{path:"/app/npcs/:name",view:r=>v`
            <npc-view npcname=${r.name}></npc-view>
        `},{path:"/app/shops/noob-shop",view:()=>v`
            <noob-shop-view></noob-shop-view>
        `},{path:"/app/bees",view:()=>v`
            <bee-view></bee-view>
        `},{path:"/app/eggs",view:()=>v`
            <egg-view></egg-view>
        `},{path:"/app",view:()=>v`
            <home-view></home-view>
        `},{path:"/",redirect:"/app"}];Bt({"mu-auth":pe.Provider,"mu-history":_i.Provider,"mu-store":class extends wi.Provider{constructor(){super(Zr,Jr,"beeswarm:auth")}},"navbar-element":ot,"home-view":ae,"egg-view":le,"bee-view":ce,"field-view":$t,"noob-shop-view":he,"mu-switch":class extends dr.Element{constructor(){super(Xr,"beeswarm:history","beeswarm:auth")}}});ot.initializeOnce();
