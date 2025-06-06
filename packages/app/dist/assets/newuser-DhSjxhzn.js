import{d as s,r as a,a as o,x as u,e as c,c as i}from"./lit-element-D-IlZiMg.js";s({"restful-form":a.FormElement});class l extends o{render(){return u`
      <restful-form new src="/auth/register">
        <slot></slot>
      </restful-form>
    `}get next(){return new URLSearchParams(document.location.search).get("next")}constructor(){super(),this.addEventListener("mu-rest-form:created",e=>{const t=e.detail,{token:n}=t.created,r=this.next||"/";console.log("signup successful",t,r),c.relay(e,"auth:message",["auth/signin",{token:n,redirect:r}])})}}s({"mu-auth":i.Provider,"signup-form":l});
