import{f as h,u as d,i as l}from"./lit-element-DyX19HMz.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const u={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:h},f=(t=u,s,e)=>{const{kind:n,metadata:i}=e;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),n==="setter"&&((t=Object.create(t)).wrapped=!0),r.set(e.name,t),n==="accessor"){const{name:a}=e;return{set(o){const c=s.get.call(this);s.set.call(this,o),this.requestUpdate(a,c,t)},init(o){return o!==void 0&&this.C(a,void 0,t,o),o}}}if(n==="setter"){const{name:a}=e;return function(o){const c=this[a];s.call(this,o),this.requestUpdate(a,c,t)}}throw Error("Unsupported decorator location: "+n)};function p(t){return(s,e)=>typeof e=="object"?f(t,s,e):((n,i,r)=>{const a=i.hasOwnProperty(r);return i.constructor.createProperty(r,n),a?Object.getOwnPropertyDescriptor(i,r):void 0})(t,s,e)}/**
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
