import{i as n,x as h,r as l,p as y,t as f,b as v,n as o}from"./navbar-BLgWEL6a.js";var $=Object.defineProperty,p=(c,t,r,b)=>{for(var s=void 0,a=c.length-1,i;a>=0;a--)(i=c[a])&&(s=i(t,r,s)||s);return s&&$(t,r,s),s};const d=class d extends n{constructor(){super(...arguments),this.eggs=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){return h`
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
    `}hydrate(t){fetch(t).then(r=>r.json()).then(r=>{console.log(r.eggs),this.eggs=r.eggs}).catch(r=>console.error("error getting egg data:",r))}};d.styles=[l.styles,y.styles,f.styles,v``];let e=d;p([o()],e.prototype,"src");p([o({type:Array})],e.prototype,"eggs");export{e as E};
