import{a as m,x as d,i as p,d as f,c as b}from"./lit-element-D-IlZiMg.js";import{r as g,h as v,a as u,n as c}from"./reset.css-GqgX-KTo.js";var y=Object.defineProperty,i=(h,s,t,o)=>{for(var e=void 0,r=h.length-1,l;r>=0;r--)(l=h[r])&&(e=l(s,t,e)||e);return e&&y(s,t,e),e};const n=class n extends m{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}render(){return d`
      <form
        @change=${s=>this.handleChange(s)}
        @submit=${s=>this.handleSubmit(s)}
      >
        <slot></slot>
        <slot name="button">
          <button
            ?disabled=${!this.canSubmit}
            type="submit">
            <slot name="button-label">Login</slot>
          </button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `}handleChange(s){const t=s.target,o=t==null?void 0:t.name,e=t==null?void 0:t.value,r=this.formData;switch(o){case"username":this.formData={...r,username:e};break;case"password":this.formData={...r,password:e};break}}handleSubmit(s){s.preventDefault(),this.canSubmit&&fetch((this==null?void 0:this.api)||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(t=>{if(t.status!==200&&t.status!==201)throw"Login failed";return t.json()}).then(t=>{const{token:o}=t,e=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:o,redirect:this.redirect}]});console.log("dispatching message",e),this.dispatchEvent(e)}).catch(t=>{console.log(t),this.error=t.toString()})}};n.styles=[g.styles,v.styles,p`
      .error:not(:empty) {
        color: lightcoral;
        border: 1px solid lightcoral;
        padding: 0.25em;
      }
  `];let a=n;i([u()],a.prototype,"formData");i([c()],a.prototype,"api");i([c()],a.prototype,"redirect");i([u()],a.prototype,"error");f({"mu-auth":b.Provider,"login-form":a});
