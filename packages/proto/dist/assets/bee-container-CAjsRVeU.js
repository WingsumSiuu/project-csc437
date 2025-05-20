import{i as y,x as n,r as p,a as m,n as i}from"./state-B6XRztWW.js";import{p as b,t as f}from"./navbar-C0ivQOmu.js";var g=Object.defineProperty,d=(c,e,t,r)=>{for(var s=void 0,l=c.length-1,h;l>=0;l--)(h=c[l])&&(s=h(e,t,s)||s);return s&&g(e,t,s),s};const o=class o extends y{constructor(){super(...arguments),this.common=[],this.rare=[],this.legendary=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){return n`
            <h3 class="title-text">Common Bees</h3>
            <div class="bee-container">
                ${this.renderBeeBox(this.common)}
            </div>
            <br>
            <hr>
            <h3 class="title-text">Rare Bees</h3>
            <div class="bee-container">
                ${this.renderBeeBox(this.rare)}
            </div>
            <br>
            <hr>
            <h3 class="title-text">Legendary Bees</h3>
            <div class="bee-container">
                ${this.renderBeeBox(this.legendary)}
            </div>
        `}renderBeeBox(e){return e.map(t=>n`
            <div class="bee-box">
                <h3>${t.beename}</h3>
                <p>${t.desc}<hr>
                <img src=${t.imgsrc}
                     alt="bee">
                <hr>
                <p>Token Ability: ${t.ability}</p>
                <hr>
                <p>Bee Stats:</p>
                <table class="table">
                    <tr>
                        <td>Energy</td>
                        <td>${t.stats[0]}</td>
                    </tr>
                    <tr>
                        <td>Attack</td>
                        <td>${t.stats[1]}</td>
                    </tr>
                    <tr>
                        <td>Speed</td>
                        <td>${t.stats[2]}</td>
                    </tr>
                    <tr>
                        <td>Pollen Collection Rate</td>
                        <td>${t.stats[3]}</td>
                    </tr>
                </table>
            </div>
        `)}hydrate(e){fetch(e).then(t=>t.json()).then(t=>{t!=null&&t.bees&&(this.common=t.bees.filter(r=>r.rarity==="common"),this.rare=t.bees.filter(r=>r.rarity==="rare"),this.legendary=t.bees.filter(r=>r.rarity==="legendary"))}).catch(t=>console.error("error getting bee data:",t))}};o.styles=[p.styles,b.styles,f.styles,m``];let a=o;d([i()],a.prototype,"src");d([i({type:Array})],a.prototype,"common");d([i({type:Array})],a.prototype,"rare");d([i({type:Array})],a.prototype,"legendary");export{a as B};
