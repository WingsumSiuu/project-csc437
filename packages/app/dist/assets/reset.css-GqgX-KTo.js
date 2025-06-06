import{g as h,u as d,i as l}from"./lit-element-D-IlZiMg.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const u={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:h},f=(t=u,o,e)=>{const{kind:n,metadata:i}=e;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),n==="setter"&&((t=Object.create(t)).wrapped=!0),r.set(e.name,t),n==="accessor"){const{name:a}=e;return{set(s){const c=o.get.call(this);o.set.call(this,s),this.requestUpdate(a,c,t)},init(s){return s!==void 0&&this.C(a,void 0,t,s),s}}}if(n==="setter"){const{name:a}=e;return function(s){const c=this[a];o.call(this,s),this.requestUpdate(a,c,t)}}throw Error("Unsupported decorator location: "+n)};function p(t){return(o,e)=>typeof e=="object"?f(t,o,e):((n,i,r)=>{const a=i.hasOwnProperty(r);return i.constructor.createProperty(r,n),a?Object.getOwnPropertyDescriptor(i,r):void 0})(t,o,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function b(t){return p({...t,state:!0,attribute:!1})}const g=l`
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
    
    `,v={styles:g},m=l`
    img {
        max-width: 100%;
    }

    body {
        margin: 0;
        background-color: var(--color-page-bg);
    }
    
    .body-content {
        margin: 0 3em 0 3em;

    }
    
`,w={styles:m};export{b as a,v as h,p as n,w as r};
