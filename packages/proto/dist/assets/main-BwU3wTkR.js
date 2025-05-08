import{i as p,x as l,r as b,p as y,t as g,a as v,n,d as f,E as m,N as h}from"./egg-container-DU3LHXje.js";var $=Object.defineProperty,o=(d,t,e,u)=>{for(var s=void 0,a=d.length-1,c;a>=0;a--)(c=d[a])&&(s=c(t,e,s)||s);return s&&$(t,e,s),s};const i=class i extends p{constructor(){super(...arguments),this.bees=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){return l`
            <h3 class="subtitle-text">Common Bees</h3>
            <div class="bee-container">
                ${this.bees.map(t=>l`
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
                </div>
            `)}
    `}hydrate(t){fetch(t).then(e=>e.json()).then(e=>{e!=null&&e.bees&&(this.bees=e.bees)}).catch(e=>console.error("error getting bee data:",e))}};i.styles=[b.styles,y.styles,g.styles,v``];let r=i;o([n()],r.prototype,"src");o([n({type:Array})],r.prototype,"bees");f({"navbar-element":h,"egg-container":m,"bee-container":r});h.initializeOnce();
