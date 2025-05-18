import{i as l,x as h,r as y,p as n,t as f,a as m}from"./navbar-CtcXgyiu.js";import{n as p}from"./property-gHQ6Dv-u.js";var v=Object.defineProperty,o=(i,t,r,$)=>{for(var s=void 0,a=i.length-1,c;a>=0;a--)(c=i[a])&&(s=c(t,r,s)||s);return s&&v(t,r,s),s};const d=class d extends l{constructor(){super(...arguments),this.eggs=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){return h`
            ${this.eggs.map(t=>h`
                <div class="shop-box">
                    <img width="100px" src="${t.imgsrc}" />
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
    `}hydrate(t){fetch(t).then(r=>r.json()).then(r=>{r!=null&&r.eggs&&(this.eggs=r.eggs)}).catch(r=>console.error("error getting egg data:",r))}};d.styles=[y.styles,n.styles,f.styles,m``];let e=d;o([p()],e.prototype,"src");o([p({type:Array})],e.prototype,"eggs");export{e as E};
