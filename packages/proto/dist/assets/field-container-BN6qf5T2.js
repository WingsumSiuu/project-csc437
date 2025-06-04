import{i as v,x as d,r as g,p as b,t as m,b as x,n as f}from"./navbar-rDali1mL.js";var $=Object.defineProperty,p=(h,t,e,r)=>{for(var s=void 0,i=h.length-1,l;i>=0;i--)(l=h[i])&&(s=l(t,e,s)||s);return s&&$(t,e,s),s};const a=class a extends v{connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){var t,e,r,s,i,l,c,n;return d`
            <div class="body-content-intro-text">
                <h1 class="page-title">${(t=this.field)==null?void 0:t.fieldname} field</h1>
                <p>${(e=this.field)==null?void 0:e.desc}</p>
            </div>
            <hr>
            <div class="img-under-text">
                <img src="${(r=this.field)==null?void 0:r.image}" alt="an image of a field">
            </div>
            <hr>
            <br>
            <div class="body-content-field">
                <div class="two-one-grid">
                    <div>
                        <h3 class="title-text">Mob(s)</h3>
                        ${(i=(s=this.field)==null?void 0:s.mobs)!=null&&i.length?this.renderMobBox((l=this.field)==null?void 0:l.mobs):d`<p>No mobs in this field</p>`}
                    </div>

                    <div>
                        <h3 class="title-text">Flower(s)</h3>
                        ${(n=(c=this.field)==null?void 0:c.flowers)!=null&&n.length?this.renderFlowerBox(this.field.flowers):d`<p>No flowers in this field</p>`}       
                    </div>

                </div>
            </div>
    `}renderMobBox(t=[]){return console.log(t[0]),console.log(t[0].mobname),t.map(e=>{var r,s,i;return d`
            <div class="mob-box">
                <h3>${e.mobname} (level ${e.level})</h3>
                <hr />
                <img class="mob-img" src="${e.image}" alt="imagine a mob picture" />
                <hr />
                <p>Mob Stats</p>
                <table class="table">
                    <tr>
                        <td>Health</td>
                        <td>${(r=e.stats)==null?void 0:r.health}</td>
                    </tr>
                    <tr>
                        <td>Damage</td>
                        <td>${(s=e.stats)==null?void 0:s.damage}</td>
                    </tr>
                    <tr>
                        <td>Honey Dropped</td>
                        <td>${(i=e.stats)==null?void 0:i.drop}</td>
                    </tr>
                </table>
            </div>
        `})}renderFlowerBox(t){return t.map(e=>d`
            <div class="flower-box">
                <svg class="flower-icon">
                    <use href="../../icons/bee.svg#icon-flower"></use>
                </svg>
                <p>${e} flowers</p>
            </div>
        `)}hydrate(t){fetch(t).then(e=>e.json()).then(e=>{this.field=e,console.log(e)}).catch(e=>console.error("error getting field+mob data:",e))}};a.styles=[g.styles,b.styles,m.styles,x``];let o=a;p([f()],o.prototype,"src");p([f({type:Object})],o.prototype,"field");export{o as F};
