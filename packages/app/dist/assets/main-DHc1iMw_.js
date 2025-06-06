import{i as c,a as m,O as W,d as $,b as X,x as l,e as U,V as Y,f as Z,c as B,h as V,_ as ee,s as te}from"./lit-element-D-IlZiMg.js";import{r as p,h,a as R,n as d}from"./reset.css-GqgX-KTo.js";const re=c`
    svg.icon {
        height: 2em;
        width: 2em;
        display: inline;
        vertical-align: text-top;
        fill: var(--color-text);
    }`,k={styles:re};var se=Object.defineProperty,q=(i,t,e,o)=>{for(var r=void 0,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(t,e,r)||r);return r&&se(t,e,r),r};function ie(i){const e=i.target.checked;U.relay(i,"dark-mode",{checked:e})}function oe(i){U.relay(i,"auth:message",["auth/signout"])}const C=class C extends m{constructor(){super(...arguments),this.loggedIn=!1,this._authObserver=new W(this,"beeswarm:auth")}render(){return l`
             <header>
                <div class="navbar">
                    <div class="logo-flex">
                        <h1 @click=${()=>window.location.href="/"}>
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
                                        Profile
                                    </a>
                                </li>
                                <li class="when-signed-in">
                                    <a id="signout" @click=${oe}>Sign Out</a>
                                </li>
                                <li class="when-signed-out">
                                    <a @click=${()=>location.assign("/login.html")}>Sign In</a>
                                </li>
                                <li>
                                    <label @change=${ie}>
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
    `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&t.authenticated?(this.loggedIn=!0,this.userid=t.username):(this.loggedIn=!1,this.userid=void 0)})}static initializeOnce(){function t(e,o){e.classList.toggle("dark-mode",o)}document.body.addEventListener("dark-mode",e=>{var o;return t(e.currentTarget,(o=e.detail)==null?void 0:o.checked)})}};C.uses=$({"mu-dropdown":X.Element}),C.styles=[p.styles,h.styles,k.styles,c`
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

    
        `];let b=C;q([R()],b.prototype,"loggedIn");q([R()],b.prototype,"userid");var ae=Object.defineProperty,E=(i,t,e,o)=>{for(var r=void 0,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(t,e,r)||r);return r&&ae(t,e,r),r};const M=class M extends m{constructor(){super(...arguments),this.showDef=!1,this.showDev=!1}render(){return l`
            <br>
            <br>
            <br>
            <h1 class="main-title">welcome, beekeeper!</h1>
            <br>
            <br>
            <br>
            <hr>
            <img class="main-image" src="/images/bss.png" alt="Bee Swarm Simulator">
            <hr>
            <div class="def-content">
                <p>card 1</p>
                <div class="card">
                    <h3 class="def" @click=${()=>this.showDef=!this.showDef} style="cursor: crosshair;">
                        <span class="carrot">${this.showDef?"▼":"▶"}</span> def
                    </h3>
                    ${this.showDef?l`
                         <ul>
                             <li>a simulator game on Roblox that entails whacking a pad of flowers to collect pollen, crack open eggs,
                                 all to collect bees!</li>
                             <li>aka a great way to waste time</li>
                             <li>free to play (with micro transactions of course)</li>
                         </ul>
                     `:""}
                </div>
                <p>card 2</p>
                <div class="card">
                    <h3 class="def" @click=${()=>this.showDev=!this.showDev} style="cursor: crosshair;">
                        <span class="carrot">${this.showDev?"▼":"▶"}</span> dev
                    </h3>
    
                    ${this.showDev?l`
                         <ul>
                             <li>onett</li>
                             <li>published march 23, 2018</li>
                         </ul>
                     `:""}
                 </div>
            </div>
            <br>
            <hr>
            <h1 class="header-text">the bss info hub</h1>
            <div class="body-content index-grid">
                <div class="small-border-box">
                    <h3 class="title-text">0 bee zone</h3>
                    <p>fields</p>
                    <ul>
                        <li>
                            <a href="/app/field/dandelion">dandelion field</a>
                        </li>
                    </ul>
                    <p>shops</p>
                    <ul>
                        <li>
                            <a href="/app/shops/noob-shop">noob shop</a>
                        </li>
                    </ul>
                    <p>bears</p>
                    <ul>
                        <li>
                            <a href="/app/bear/black">black bear</a>
                        </li>
                        <li>
                            <a href="/app/bear/mother">mother bear</a>
                        </li>
                    </ul>
                </div>
                <div class="small-border-box">
                    <h3 class="title-text">5 bee zone</h3>
                    <p>fields</p>
                    <ul>
                        <li>
                            <a href="/app/field/spider">spider field</a>
                        </li>
                        <li>
                            <a href="/app/field/bamboo">bamboo field</a>
                        </li>
                    </ul>
                    <p>no shop in zone</p>
                    <p>bears</p>
                    <ul>
                        <li>
                            <a href="/app/bear/panda">panda bear</a>
                        </li>
                    </ul>
                </div>
                <div class="small-border-box">
                    <h3 class="title-text">miscellaneous</h3>
                    <ul>
                        <li>
                            <a href="/app/eggs">eggs</a>
                        </li>
                        <li>
                            <a href="/app/bees">bees</a>
                        </li>
                    </ul>
                </div>
            </div>
            <br>
            <br>
    `}};M.styles=[p.styles,h.styles,k.styles,c`
            .carrot {
                font-size: 0.7em;
            }

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
                font-size: 1em;
            }

            .def-content {
                padding: 0 15em;
            }

            .card {
                border: 2px solid var(--color-line);
                border-radius: 1em;
            }

            .def {
                padding: 0.25em 1em;
                text-align: left;
                background-color: var(--color-secondary);
                font-size: var(--font-size-medium);

                background: var(--color-seven);

                > .indent {
                    padding-left: 5em;
                }

            }
            
            .header-text {
                background-color: var(--color-secondary);
                text-align: center;
                font-size: 1.7em;
                padding: 0.25em 0;
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

                gap: var(--box-gap);

                grid-column: span min(
                        5,
                        var(--page-grids)
                ) / -1;

                @media screen and (max-width: 50rem) {
                    grid-template-columns: 1fr;
                }
            }
        `];let f=M;E([d({type:Boolean})],f.prototype,"showDef");E([d({type:Boolean})],f.prototype,"showDev");var le=Object.defineProperty,H=(i,t,e,o)=>{for(var r=void 0,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(t,e,r)||r);return r&&le(t,e,r),r};const A=class A extends m{constructor(){super(...arguments),this.src="/api/eggs",this.eggs=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){return l`
            ${this.eggs.map(t=>l`
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
        `}hydrate(t){fetch(t).then(e=>e.json()).then(e=>{console.log(e.eggs),this.eggs=e.eggs}).catch(e=>console.error("error getting egg data:",e))}};A.styles=[p.styles,h.styles,c`
            .shop-box {    
                display: flex;
                align-items: center;
                gap: 20px;
                border: var(--box-border-width) solid var(--color-line);
                padding: 20px 25px;

                > img {
                    width: 150px;
                    margin: 0 1.5em 0 1.5em;
                }

                .info {    
                    flex-grow: 1;
                    margin: 0 1.5em 0 0;
                    padding-bottom: 1.5em;
                    padding-left: 1.3em;
                }

                @media screen and (max-width: 60rem) {
                    display: flex;
                    flex-wrap: wrap;
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
                    border: 1px solid var(--color-line);
                    padding: 10px 1px 10px 10px;
                    text-align: left;
                }
            }
        `];let v=A;H([d()],v.prototype,"src");H([d({type:Array})],v.prototype,"eggs");const z=class z extends m{render(){return l`
            <br>
            <br>
            <br>
            <div class="body-content-intro-text">
                <h1 class="page-title">the (partial) bee swarm simulator egg list</h1>
                <p>in bee swarm sim, eggs hatch bees.</p>
                <p>eggs are usually purchasable, though rarer eggs tend to be difficult to consistently acquire.</p>
            </div>
            <br>
            <br>
            <hr />
            <div class="body-content">
                <h3 class="title-text">Eggs</h3>
                <egg-container></egg-container>
            </div>
            `}};z.uses=$({"egg-container":v}),z.styles=[p.styles,h.styles,k.styles,c`
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

        `];let O=z;var de=Object.defineProperty,g=(i,t,e,o)=>{for(var r=void 0,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(t,e,r)||r);return r&&de(t,e,r),r};const L=class L extends m{constructor(){super(...arguments),this.src="/api/bees",this.common=[],this.rare=[],this.legendary=[],this.epic=[],this.showCommon=!0,this.showRare=!0,this.showEpic=!0,this.showLegendary=!0}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){return l`
            <h3 class="title-text" @click=${()=>this.showCommon=!this.showCommon}>
                <span class="carrot">${this.showCommon?"▼":"▶"}</span> the one and only common bee
            </h3>
            ${this.showCommon?this.renderBeeBox(this.common):""}
            <hr>
            
            <h3 class="title-text" @click=${()=>this.showRare=!this.showRare}>
                <span class="carrot">${this.showRare?"▼":"▶"}</span> rare bees 
            </h3>
            ${this.showRare?this.renderBeeBox(this.rare):""}
            <hr>
    
            <h3 class="title-text" @click=${()=>this.showLegendary=!this.showLegendary}>
                <span class="carrot">${this.showLegendary?"▼":"▶"}</span> legendary bees
            </h3>
            ${this.showLegendary?this.renderBeeBox(this.legendary):""}
            <hr>
    
            <h3 class="title-text" @click=${()=>this.showEpic=!this.showEpic}>
                <span class="carrot">${this.showEpic?"▼":"▶"}</span> epic bees
            </h3>
            ${this.showEpic?this.renderBeeBox(this.epic):""}
            <br>
        `}renderBeeBox(t){return t.map(e=>l`
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
        `)}hydrate(t){fetch(t).then(e=>e.json()).then(e=>{e!=null&&e.bees&&(this.common=e.bees.filter(o=>o.rarity==="common"),this.rare=e.bees.filter(o=>o.rarity==="rare"),this.legendary=e.bees.filter(o=>o.rarity==="legendary"),this.epic=e.bees.filter(o=>o.rarity==="epic"))}).catch(e=>console.error("error getting bee data:",e))}};L.styles=[p.styles,h.styles,c`
            .carrot {
                font-size: 0.7em;
            }
            
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
                    padding-bottom: 1.5em;
                    padding-left: 1.3em;
                }

                @media screen and (max-width: 60rem) {
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
                    border: 1px solid var(--color-line);
                    padding: 0.5em;
                }
            }
        `];let n=L;g([d()],n.prototype,"src");g([d({type:Array})],n.prototype,"common");g([d({type:Array})],n.prototype,"rare");g([d({type:Array})],n.prototype,"legendary");g([d({type:Array})],n.prototype,"epic");g([d({type:Boolean})],n.prototype,"showCommon");g([d({type:Boolean})],n.prototype,"showRare");g([d({type:Boolean})],n.prototype,"showEpic");g([d({type:Boolean})],n.prototype,"showLegendary");const _=class _ extends m{render(){return l`
            <br>
            <br>
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
        `}};_.uses=$({"bee-container":n}),_.styles=[p.styles,h.styles,k.styles,c`
            .body-content-intro-text {
                text-align: center;
                padding-bottom: 1em;
            }

            .page-title {
                font-family: "Mansalva", sans-serif;
                text-shadow: 2px 2px var(--color-text-shadow);
            }

        `];let D=_;var ne=Object.defineProperty,J=(i,t,e,o)=>{for(var r=void 0,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(t,e,r)||r);return r&&ne(t,e,r),r};const j=class j extends m{connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){var t,e,o,r,s,a,G,I;return l`
            <br>
            <br>
            <br>
            <div class="body-content-intro-text">
                <h1 class="page-title">${(t=this.field)==null?void 0:t.fieldname} field</h1>
                <p>${(e=this.field)==null?void 0:e.desc}</p>
            </div>
            <br>
            <br>
            <br>
            <hr>
            <div class="img-under-text">
                <img src="${(o=this.field)==null?void 0:o.image}" alt="an image of a field">
            </div>
            <hr>
            <div class="body-content">
                <div class="two-one-grid">
                    <div>
                        <h3 class="title-text">Mob(s)</h3>
                        <div class="mobs-flex">
                            ${(s=(r=this.field)==null?void 0:r.mobs)!=null&&s.length?this.renderMobBox((a=this.field)==null?void 0:a.mobs):l`<p>No mobs in this field</p>`}
                        </div>
                    </div>

                    <div>
                        <h3 class="title-text">Flower(s)</h3>
                        ${(I=(G=this.field)==null?void 0:G.flowers)!=null&&I.length?this.renderFlowerBox(this.field.flowers):l`<p>No flowers in this field</p>`}       
                    </div>

                </div>
            </div>
            <br>
            <br>
    `}renderMobBox(t=[]){return console.log(t[0]),console.log(t[0].mobname),t.map(e=>{var o,r,s;return l`
            <div class="mob-box">
                <h3>${e.mobname} (level ${e.level})</h3>
                <hr />
                <img class="mob-img" src="${e.image}" alt="imagine a mob picture" />
                <hr />
                <p>Mob Stats</p>
                <table class="table">
                    <tr>
                        <td>Health</td>
                        <td>${(o=e.stats)==null?void 0:o.health}</td>
                    </tr>
                    <tr>
                        <td>Damage</td>
                        <td>${(r=e.stats)==null?void 0:r.damage}</td>
                    </tr>
                    <tr>
                        <td>Honey Dropped</td>
                        <td>${(s=e.stats)==null?void 0:s.drop}</td>
                    </tr>
                </table>
                <br>
            </div>
        `})}renderFlowerBox(t){return t.map(e=>l`
            <div class="flower-box" style="background-color: ${this.getFlowerColor(e)};">
                <svg class="flower-icon">
                    <use href="../../icons/bee.svg#icon-flower"></use>
                </svg>
                <p>${e} flowers</p>
            </div>
        `)}getFlowerColor(t){switch(t){case"blue":return"var(--color-flower-blue)";case"red":return"var(--color-flower-red)";case"white":return"var(--color-flower-white)";default:return"white"}}hydrate(t){fetch(t).then(e=>e.json()).then(e=>{this.field=e}).catch(e=>console.error("error getting field+mob data:",e))}};j.styles=[p.styles,h.styles,c`
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
                border: var(--box-border-width) solid var(--color-line);;
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
                border: var(--box-border-width) solid var(--color-line);;
                
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
        `];let x=j;J([d({type:String})],x.prototype,"src");J([d({type:Object})],x.prototype,"field");var ce=Object.defineProperty,Q=(i,t,e,o)=>{for(var r=void 0,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(t,e,r)||r);return r&&ce(t,e,r),r};const T=class T extends m{constructor(){super(...arguments),this.showGear=!0,this.showTools=!0}render(){return l`
            <br>
            <br>
            <br>
            <div class="body-content-intro-text">
                <h1 class="page-title">welcome to the noob shop</h1>
                <p>the home of your first bee swarm simulator purchase!</p>
            </div>
            <br>
            <br>
            <hr>
            <div class="body-content">
                <div class="two-one-grid">
                    <div>
                        <h3 class="title-text" @click=${()=>this.showGear=!this.showGear} style="cursor: pointer;">
                            <span class="carrot">${this.showGear?"▼":"▶"}</span> player gear
                        </h3>
                        
                        ${this.showGear?l`
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
                        <h3 class="subtitle-text">pollen holder</h3>
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
                        <h3 class="subtitle-text">boots</h3>
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
                        `:""}
                    </div>
                    <div>
                        <h3 class="title-text" @click=${()=>this.showTools=!this.showTools} style="cursor: pointer;">
                            <span class="carrot">${this.showTools?"▼":"▶"}</span> tools sold
                        </h3>
                         ${this.showTools?l`
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
                        `:""}
                    </div>
                </div>
            </div>
    `}};T.styles=[p.styles,h.styles,k.styles,c`
            .carrot {
                font-size: 0.7em;
            }
            
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
                border: var(--box-border-width) solid var(--color-line);;
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
                border: var(--box-border-width) solid var(--color-line);
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
        
    `];let y=T;Q([d({type:Boolean})],y.prototype,"showGear");Q([d({type:Boolean})],y.prototype,"showTools");const K={};var pe=Object.defineProperty,he=Object.getOwnPropertyDescriptor,S=(i,t,e,o)=>{for(var r=o>1?void 0:o?he(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&pe(t,e,r),r};const P=class P extends Y{constructor(){super("beeswarm:model"),this.mode="view"}get user(){return console.log("hello "+this.userid+" "+this.model.profile),this.model.profile}render(){return this.mode==="edit"?this.renderEditor():this.renderView()}renderView(){const{userid:t,name:e,nickname:o,level:r,color:s,profilePicture:a}=this.user||{};return l`
        <button @click=${()=>{this.mode="edit"}}>
          edit
        </button>
        <p>username: ${this.userid}</p>
      <img src=${a} alt=${e} />
      <dl>
        <dt>Username</dt>
        <dd>${t}</dd>
        <dt>Nickname</dt>
        <dd>${o}</dd>
        <dt>Level</dt>
        <dd>${r}</dd>
        <dt>Favorite Color</dt>
        <dd>
          <slot name="color-swatch">
            <span
              class="swatch"
              style="background: ${s}"></span>
          </slot>
          <slot name="color-name">${s}</slot>
        </dd>
      </dl>
      </section>
      </template>`}renderEditor(){const{name:t,profilePicture:e}=this.user||{};return l`
            <button @click=${()=>{this.mode="view"}}>
                view
            </button>
            <p>username: ${this.userid}</p>
      <mu-form
        .init=${K}
        @mu-form:submit=${this.handleSubmit}
    }>
        <img src=${e} alt=${t} />
        <dl>
          <dt>profile picture</dt>
          <dd>
            <input
              type="file"
              @change=${o=>{const s=o.target.files;s&&s.length&&this.handleAvatarSelected(s)}}
            />
          </dd>
          <dt>Nickname</dt>
          <dd><input name="nickname"></dd>
          <dt>Level</dt>
          <dd><input name="level"></dd>
          <dt>Favorite Color</dt>
          <dd>
            <input type="color" name="color">
          </dd>
        </dl>
      </mu-form>`}connectedCallback(){super.connectedCallback(),this.userid&&(this.dispatchMessage(["profile/select",{userid:this.userid}]),console.log("profile"+this.userid))}attributeChangedCallback(t,e,o){super.attributeChangedCallback(t,e,o),t==="userid"&&e!==o&&o&&this.dispatchMessage(["profile/select",{userid:o}])}handleSubmit(t){const e={...this.user,...t.detail};this._profile_pic&&(e.profilePicture=this._profile_pic),this.userid&&this.dispatchMessage(["profile/save",{userid:this.userid,profile:e,onSuccess:()=>this.mode="view",onFailure:o=>{console.log("Error saving profile",o)}}])}handleAvatarSelected(t){t&&t.length&&new Promise((o,r)=>{const s=new FileReader;s.onload=()=>o(s.result),s.onerror=a=>r(a),s.readAsDataURL(t[0])}).then(o=>this._profile_pic=o)}firstUpdated(){this.userid&&this.dispatchMessage(["profile/select",{userid:this.userid}])}};P.uses=$({"mu-form":Z.Element}),P.styles=[p.styles,h.styles,c`
    :host {
      display: contents;
      grid-column: 2/-2;
      display: grid;
      grid-template-columns: subgrid;
    }
    section {
      display: grid;
      grid-template-columns: subgrid;
      align-items: end;
      grid-column: 1 / -1;
    }
    h1 {
      grid-row: 4;
      grid-column: auto / span 2;
    }
    img {
      display: block;
      grid-column: auto / span 2;
      grid-row: 1 / span 4;
    }
    .swatch {
      display: inline-block;
      width: 2em;
      aspect-ratio: 1;
      vertical-align: middle;
    }
    dl {
      display: grid;
      grid-column: 1 / -1;
      grid-row: 5 / auto;
      grid-template-columns: subgrid;
      align-items: baseline;
    }
    dt {
      grid-column: 1 / span 2;
      color: var(--color-text);
    }
    dd {
      grid-column: 3 / -1;
    }
    mu-form {
      display: contents;
    }
    input {
     margin: 1em 0;
     font: inherit;
    }
  `];let u=P;S([d({attribute:"userid"})],u.prototype,"userid",2);S([R()],u.prototype,"user",1);S([d()],u.prototype,"mode",2);var me=Object.defineProperty,N=(i,t,e,o)=>{for(var r=void 0,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(t,e,r)||r);return r&&me(t,e,r),r};const F=class F extends m{connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){var t,e,o,r;return l`
            <br>
            <br>
            <br>
            <div class="body-content">
                <p>&gt; current viewing: bears </p>
                <div class="bear-grid">
                    <div class="profile">
                        <div class="card">
                            <h1 class="page-title">${(t=this.bear)==null?void 0:t.bearname} bear</h1>
                            <hr>
                            <p>${(e=this.bear)==null?void 0:e.desc}</p>
                        </div>
                        <br>
                        <img src="${(o=this.bear)==null?void 0:o.image}" alt="bear" />
                    </div>
                    <div class="info">
                        <h3 class="title-text">Quests</h3>
                        ${(r=this.bear)==null?void 0:r.quests.map(s=>l`
                            <div class="questbox">
                                <p class="subtitle-text">${s.title}</p>
                                <ul>
                                    ${s.tasks.map(a=>l`<li>${a}</li>`)}
                                    <li>Reward: ${s.reward}</li>
                                </ul>
                            </div>
                        `)}
                    </div>
                </div>
            </div>
    `}hydrate(t){fetch(t).then(e=>e.json()).then(e=>{this.bear=e}).catch(e=>console.error("error getting bear data:",e))}};F.styles=[p.styles,h.styles,c`
            .body-content-intro-text {
                text-align: center;
                padding-bottom: 1em;
            }

            .page-title {
                font-family: "Mansalva", sans-serif;
                text-shadow:  2px 2px var(--color-secondary);
            }
            
            .title-text {
                background-color: var(--color-tertiary);
                text-align: center;
                font-size: 1.5em;
                padding: 0.5em 0.5em 0.5em 0.5em;
            }

            .subtitle-text {
                background-color: var(--color-secondary);
                text-align: right;
                font-size: 1.3em;
                padding: 0.15em 0.5em 0.15em 0.5em;

            }
            
            .bear-grid {
                display: grid;
                grid-template-columns: 1fr 2fr;
                width: 100%;
                gap: var(--box-gap);
    
                @media screen and (max-width: 50rem) {
                    grid-template-columns: 1fr;
                }

                & > * img {
                    width: 325px;     
                    height: 325px;  
                    border-radius: 50%;
                    object-fit: cover; 
                    border: 2px solid var(--color-line);
                }
    
                > .profile {
                    padding-top: 1.5em;
                }
            
                & > * .questbox {
                    border: 2px solid var(--color-line);;
                    margin-bottom: 1em;
            }

            .card {
                padding: 0 2em;
                border: 2px solid var(--color-line);
                border-radius: 1em;
            }
            
        `];let w=F;N([d({type:String})],w.prototype,"src");N([d({type:Object})],w.prototype,"bear");function ge(i,t,e){switch(i[0]){case"profile/save":be(i[1],e).then(r=>t(s=>({...s,profile:r}))).then(()=>{const{onSuccess:r}=i[1];r&&r()}).catch(r=>{const{onFailure:s}=i[1];s&&s(r)});break;case"profile/select":ue(i[1],e).then(r=>{console.log("applying profile to model:",r),t(s=>({...s,profile:r}))});break;default:const o=i[0];throw new Error(`Unhandled message "${o}"`)}}function be(i,t){return fetch(`/api/users/${i.userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...B.headers(t)},body:JSON.stringify(i.profile)}).then(e=>{if(e.status===200)return e.json();throw new Error(`Failed to save profile for ${i.userid}`)}).then(e=>{if(e)return e})}function ue(i,t){return fetch(`/api/users/${i.userid}`,{headers:B.headers(t)}).then(e=>{if(e.status===200)return console.log("got it"),e.json();console.log("no it")}).then(e=>{if(e)return console.log("Profile:",e),e})}const fe=[{path:"/app/field/:name",view:i=>l`
            <field-view src="/api/fields/${i.name}"></field-view>
        `},{path:"/app/bear/:name",view:i=>l`
            <bear-view src="/api/bears/${i.name}"></bear-view>
        `},{auth:"protected",path:"/app/profile/:userid",view:i=>l`
              <profile-view userid=${i.userid}> </profile-view>
        `},{auth:"protected",path:"/app/profile/:userid/edit",view:i=>l`
      <profile-view userid=${i.userid} mode="edit">
      </profile-view>
    `},{path:"/app/npcs/:name",view:i=>l`
            <npc-view npcname=${i.name}></npc-view>
        `},{path:"/app/shops/noob-shop",view:()=>l`
            <noob-shop-view></noob-shop-view>
        `},{path:"/app/bees",view:()=>l`
            <bee-view></bee-view>
        `},{path:"/app/eggs",view:()=>l`
            <egg-view></egg-view>
        `},{path:"/app",view:()=>l`
            <home-view></home-view>
        `},{path:"/",redirect:"/app"}];$({"mu-auth":B.Provider,"mu-history":V.Provider,"mu-store":class extends te.Provider{constructor(){super(ge,K,"beeswarm:auth")}},"navbar-element":b,"home-view":f,"egg-view":O,"bee-view":D,"field-view":x,"bear-view":w,"noob-shop-view":y,"profile-view":u,"mu-switch":class extends ee.Element{constructor(){super(fe,"beeswarm:history","beeswarm:auth")}}});b.initializeOnce();
