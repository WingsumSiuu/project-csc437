import{i as d,a as p,O as q,d as $,b as N,x as o,e as D,c as C,h as U,_ as Z,s as j}from"./lit-element-DyX19HMz.js";import{r as h,h as g,a as T,n}from"./reset.css-C_ssTLzj.js";const G=d`
    svg.icon {
        height: 2em;
        width: 2em;
        display: inline;
        vertical-align: text-top;
        fill: var(--color-text);
    }`,v={styles:G};var J=Object.defineProperty,H=(s,t,e,a)=>{for(var r=void 0,i=s.length-1,l;i>=0;i--)(l=s[i])&&(r=l(t,e,r)||r);return r&&J(t,e,r),r};function K(s){const e=s.target.checked;D.relay(s,"dark-mode",{checked:e})}function Q(s){D.relay(s,"auth:message",["auth/signout"])}const u=class u extends p{constructor(){super(...arguments),this.loggedIn=!1,this._authObserver=new q(this,"beeswarm:auth")}render(){return o`
             <header>
                <div class="navbar">
                    <div class="logo-flex">
                        <h1  @click=${()=>window.location.href="/"}>
                            <svg class="icon">
                                <use href="/icons/bee.svg#icon-bee" />
                            </svg>
                            bee swarm simulator
                        </h1>
                    </div>
                    
                    <div class="right-flex">
                        <mu-dropdown>
                            <a slot="actuator">
                                Hello, ${this.userid||"beekeeper"}
                            </a>
                            <menu>
                                <li>
                                    <a href="/app/profile/${this.userid}">
                                        View Profile
                                    </a>
                                </li>
                                <li>
                                    <a href="/app/profile/${this.userid}/edit">
                                        Edit Profile
                                    </a>
                                </li>
                                <li class="when-signed-in">
                                    <a id="signout" @click=${Q}>Sign Out</a>
                                </li>
                                <li class="when-signed-out">
                                    <a href="/login">Sign In</a>
                                </li>
                                <li>
                                    <label @change=${K}>
                                        <input type="checkbox" />
                                        <svg class="icon">
                                            <use href="/icons/bee.svg#icon-dark-mode" />
                                        </svg>
                                    </label>
                                </li>
                            </menu>
                        </mu-dropdown>
                    </div>
                </div>
            </header>
    `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&t.authenticated?(this.loggedIn=!0,this.userid=t.username):(this.loggedIn=!1,this.userid=void 0)})}static initializeOnce(){function t(e,a){e.classList.toggle("dark-mode",a)}document.body.addEventListener("dark-mode",e=>{var a;return t(e.currentTarget,(a=e.detail)==null?void 0:a.checked)})}};u.uses=$({"mu-dropdown":N.Element}),u.styles=[h.styles,g.styles,v.styles,d`
            .navbar {
                display: flex;
                justify-content: space-between;
                
                background-color: var(--color-primary);
                width: 100%;
                height: 4em;
                margin-top: -0.5em;
                
                > .logo-flex {
                    padding-left: 1em;
                    font-size: 0.8em;
                }
                
                > .right-flex {
                    padding-right: 1em;
                    display: flex;
                    align-items: flex-end;
                    font-size: 1.2em;
                    
                    li {
                        font-size: 0.8em;
                    }
                    
                }
                
                nav.logged-out .when-signed-in,
                nav.logged-in .when-signed-out {
                    display: none;
                }
                
            }

    
        `];let m=u;H([T()],m.prototype,"loggedIn");H([T()],m.prototype,"userid");const O=class O extends p{render(){return o`
            <br>
            <h1 class="main-title">welcome, beekeeper</h1>
            <p class="body-content-intro-text">a simulator game on Roblox that entails whacking a pad of flowers to collect pollen, crack open eggs,
                all to collect bees!<br>aka a great way to waste time<br><br>free to play (with micro transactions of course)</p>
            <hr>
            <img class="main-image" src="/images/bss.png" alt="Bee Swarm Simulator">
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
    `}};O.styles=[h.styles,g.styles,v.styles,d`
            .main-title {
                font-size: 2rem;
                text-align: center;
                text-shadow: .2em .15em var(--color-text-shadow);
            }
            
            .main-image {
                opacity: 0.65;
            }

            .body-content-intro-text {
                text-align: center;
                padding-bottom: 1em;
                font-size: 1.2em;
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
        `];let k=O;var W=Object.defineProperty,I=(s,t,e,a)=>{for(var r=void 0,i=s.length-1,l;i>=0;i--)(l=s[i])&&(r=l(t,e,r)||r);return r&&W(t,e,r),r};const S=class S extends p{constructor(){super(...arguments),this.src="/api/eggs",this.eggs=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){return o`
            ${this.eggs.map(t=>o`
                <div class="shop-box">
                    <img width="100px" src="${t.imgsrc}" alt="egg image" />
                    <div class="info">
                        <h3 class="egg-name">${t.eggname}</h3>
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
                <br>
            `)}
        `}hydrate(t){fetch(t).then(e=>e.json()).then(e=>{console.log(e.eggs),this.eggs=e.eggs}).catch(e=>console.error("error getting egg data:",e))}};S.styles=[h.styles,g.styles,d`
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

            .egg-name {
                font-size: 1.3em;
                text-shadow: 2px 2px var(--color-tertiary);
            }

            table {   
                width: 100%;
                border-collapse: collapse;

                >th, td {
                    border: 1px solid var(--color-text);
                    padding: 10px 1px 10px 10px;
                    text-align: left;
                }
            }
        `];let b=S;I([n()],b.prototype,"src");I([n({type:Array})],b.prototype,"eggs");const y=class y extends p{render(){return o`
            <br>
            <br>
            <div class="body-content-intro-text">
                <h1 class="page-title">the (partial) bee swarm simulator egg list</h1>
                <p>in bee swarm sim, eggs hatch bees.</p>
                <p>eggs are usually purchasable, though rarer eggs tend to be difficult to consistently acquire.</p>
            </div>
            <br>
            <hr />
            <div class="body-content">
                <h3 class="title-text">Eggs</h3>
                <egg-container></egg-container>
            </div>
            `}};y.uses=$({"egg-container":b}),y.styles=[h.styles,g.styles,v.styles,d`
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

        `];let z=y;var X=Object.defineProperty,x=(s,t,e,a)=>{for(var r=void 0,i=s.length-1,l;i>=0;i--)(l=s[i])&&(r=l(t,e,r)||r);return r&&X(t,e,r),r};const M=class M extends p{constructor(){super(...arguments),this.src="/api/bees",this.common=[],this.rare=[],this.legendary=[],this.epic=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){return o`
            <h3 class="title-text">Common Bees</h3>
            ${this.renderBeeBox(this.common)}
            <hr>
            <h3 class="title-text">Rare Bees</h3>
            ${this.renderBeeBox(this.rare)}
            <hr>
            <h3 class="title-text">Legendary Bees</h3>
            ${this.renderBeeBox(this.legendary)}
            <hr>
            <h3 class="title-text">Epic Bees</h3>
            ${this.renderBeeBox(this.epic)}
            <br>
        `}renderBeeBox(t){return t.map(e=>o`
            <div class="bee-container">
                <img src=${e.imgsrc} alt="bee">
                <div class="info">
                    <h3 class="bee-name">${e.beename}</h3>
                    <p>${e.desc}<p>
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
            </div>
            <br>
        `)}hydrate(t){fetch(t).then(e=>e.json()).then(e=>{e!=null&&e.bees&&(this.common=e.bees.filter(a=>a.rarity==="common"),this.rare=e.bees.filter(a=>a.rarity==="rare"),this.legendary=e.bees.filter(a=>a.rarity==="legendary"),this.epic=e.bees.filter(a=>a.rarity==="epic"))}).catch(e=>console.error("error getting bee data:",e))}};M.styles=[h.styles,g.styles,d`
            .bee-container {
                display: flex;
                align-items: center;
                gap: 20px;
                border: var(--box-border-width) solid var(--box-border-color);
                padding: 20px 25px;

                > img {
                    width: 250px;
                    margin: 0 1.5em 0 1.5em;
                    
                }

                .info {
                    flex-grow: 1;
                    margin: 0 1.5em 0 0;
                }

                @media screen and (max-width: 50rem) {
                    display: flex;
                    flex-wrap: wrap;
                }
            
            }

            .title-text {
                background-color: var(--color-tertiary);
                text-align: center;
                font-size: var(--font-size-medium);
                padding: 0.5em 0.5em 0.5em 0.5em;
            }
            
            .bee-name {
                font-size: 1.3em;
                text-shadow: 2px 1.5px var(--color-tertiary);
            }

            table {
                width: 100%;
                border-collapse: collapse;
                
                > th, td {
                    border: 1px solid var(--color-text);
                    padding: 0.5em;
                }
            }
        `];let c=M;x([n()],c.prototype,"src");x([n({type:Array})],c.prototype,"common");x([n({type:Array})],c.prototype,"rare");x([n({type:Array})],c.prototype,"legendary");x([n({type:Array})],c.prototype,"epic");const w=class w extends p{render(){return o`
            <br>

            <div class="body-content-intro-text">
                <h1 class="page-title">the (partial) bee swarm simulator bees list</h1>
                <p>your little fuzzy friends who fight for you, collect pollen for you, and convert pollen to honey for you</p>
                <p>treat them well</p>
            </div>
            <br>
            <hr>
            <div class="body-content">
                <bee-container></bee-container>
            </div>
        `}};w.uses=$({"bee-container":c}),w.styles=[h.styles,g.styles,v.styles,d`
            .body-content-intro-text {
                text-align: center;
                padding-bottom: 1em;
            }

            .page-title {
                font-family: "Mansalva", sans-serif;
                text-shadow: 2px 2px var(--color-text-shadow);
            }

        `];let B=w;var Y=Object.defineProperty,L=(s,t,e,a)=>{for(var r=void 0,i=s.length-1,l;i>=0;i--)(l=s[i])&&(r=l(t,e,r)||r);return r&&Y(t,e,r),r};const F=class F extends p{connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){var t,e,a,r,i,l,R,_;return o`
            <div class="body-content-intro-text">
                <h1 class="page-title">${(t=this.field)==null?void 0:t.fieldname} field</h1>
                <p>${(e=this.field)==null?void 0:e.desc}</p>
            </div>
            <hr>
            <div class="img-under-text">
                <img src="${(a=this.field)==null?void 0:a.image}" alt="an image of a field">
            </div>
            <hr>
            <br>
            <div class="body-content">
                <div class="two-one-grid">
                    <div>
                        <h3 class="title-text">Mob(s)</h3>
                        <div class="mobs-flex">
                            ${(i=(r=this.field)==null?void 0:r.mobs)!=null&&i.length?this.renderMobBox((l=this.field)==null?void 0:l.mobs):o`<p>No mobs in this field</p>`}
                        </div>
                    </div>

                    <div>
                        <h3 class="title-text">Flower(s)</h3>
                        ${(_=(R=this.field)==null?void 0:R.flowers)!=null&&_.length?this.renderFlowerBox(this.field.flowers):o`<p>No flowers in this field</p>`}       
                    </div>

                </div>
            </div>
            <br>
            <br>
    `}renderMobBox(t=[]){return console.log(t[0]),console.log(t[0].mobname),t.map(e=>{var a,r,i;return o`
            <div class="mob-box">
                <h3>${e.mobname} (level ${e.level})</h3>
                <hr />
                <img class="mob-img" src="${e.image}" alt="imagine a mob picture" />
                <hr />
                <p>Mob Stats</p>
                <table class="table">
                    <tr>
                        <td>Health</td>
                        <td>${(a=e.stats)==null?void 0:a.health}</td>
                    </tr>
                    <tr>
                        <td>Damage</td>
                        <td>${(r=e.stats)==null?void 0:r.damage}</td>
                    </tr>
                    <tr>
                        <td>Honey Dropped</td>
                        <td>${(i=e.stats)==null?void 0:i.drop}</td>
                    </tr>
                </table>
                <br>
            </div>
        `})}renderFlowerBox(t){return t.map(e=>o`
            <div class="flower-box" style="background-color: ${this.getFlowerColor(e)};">
                <svg class="flower-icon">
                    <use href="../../icons/bee.svg#icon-flower"></use>
                </svg>
                <p>${e} flowers</p>
            </div>
        `)}getFlowerColor(t){switch(t){case"blue":return"var(--color-flower-blue)";case"red":return"var(--color-flower-red)";case"white":return"var(--color-flower-white)";default:return"white"}}hydrate(t){fetch(t).then(e=>e.json()).then(e=>{this.field=e}).catch(e=>console.error("error getting field+mob data:",e))}};F.styles=[h.styles,g.styles,d`
            .body-content-intro-text {
                text-align: center;
                padding-bottom: 1em;
            }

            .img-under-text {
                > img {
                    opacity: .6;
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
                
                > .flower-icon {
                    width: var(--icon-size);
                    height: var(--icon-size);
                    fill: var(--color-text);
                    padding-top: 0.3em;
                }
            }

            table {   
                width: 100%;
                border-collapse: collapse;

                >th, td {
                    border: 1px solid var(--color-text);
                    padding: 10px 1px 10px 10px;
                    text-align: left;
                }
            }
        `];let f=F;L([n({type:String})],f.prototype,"src");L([n({type:Object})],f.prototype,"field");const A=class A extends p{render(){return o`
            <br>
            <div class="body-content-intro-text">
                <h1 class="page-title">welcome to the noob shop</h1>
                <p>the home of your first bee swarm simulator purchase!</p>
            </div>
            <br>
            <hr>
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
    `}};A.styles=[h.styles,g.styles,v.styles,d`
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

                @media screen and (max-width: 70rem) {
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
                @media screen and (max-width: 70rem) {
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
                
                @media screen and (max-width: 70rem) {
                    flex-grow: 1;
                    
                }

            }
        
    `];let P=A;const E={};function V(s,t,e){switch(s[0]){case"profile/save":ee(s[1],e).then(r=>t(i=>({...i,profile:r}))).then(()=>{const{onSuccess:r}=s[1];r&&r()}).catch(r=>{const{onFailure:i}=s[1];i&&i(r)});break;case"profile/select":te(s[1],e).then(r=>t(i=>({...i,profile:r})));break;default:const a=s[0];throw new Error(`Unhandled message "${a}"`)}}function ee(s,t){return fetch(`/api/users/${s.userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...C.headers(t)},body:JSON.stringify(s.profile)}).then(e=>{if(e.status===200)return e.json();throw new Error(`Failed to save profile for ${s.userid}`)}).then(e=>{if(e)return e})}function te(s,t){return fetch(`/api/users/${s.userid}`,{headers:C.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Profile:",e),e})}const re=[{path:"/app/field/:name",view:s=>o`
            <field-view src="/api/fields/${s.name}"></field-view>
        `},{auth:"protected",path:"/app/profile/:id",view:s=>o`
              <profile-view user-id=${s.id}>
              </profile-view>
        `},{path:"/app/npcs/:name",view:s=>o`
            <npc-view npcname=${s.name}></npc-view>
        `},{path:"/app/shops/noob-shop",view:()=>o`
            <noob-shop-view></noob-shop-view>
        `},{path:"/app/bees",view:()=>o`
            <bee-view></bee-view>
        `},{path:"/app/eggs",view:()=>o`
            <egg-view></egg-view>
        `},{path:"/app",view:()=>o`
            <home-view></home-view>
        `},{path:"/",redirect:"/app"}];$({"mu-auth":C.Provider,"mu-history":U.Provider,"mu-store":class extends j.Provider{constructor(){super(V,E,"beeswarm:auth")}},"navbar-element":m,"home-view":k,"egg-view":z,"bee-view":B,"field-view":f,"noob-shop-view":P,"mu-switch":class extends Z.Element{constructor(){super(re,"beeswarm:history","beeswarm:auth")}}});m.initializeOnce();
