import{i as c,V as A,O as V,d as _,a as ee,x as l,r as h,h as m,e as H,b as y,c as g,n,f as te,g as S,j as re,_ as se,s as ie}from"./reset.css-DRchHByS.js";const oe=c`
    svg.icon {
        height: 2em;
        width: 2em;
        display: inline;
        vertical-align: text-top;
        fill: var(--color-text);
    }`,x={styles:oe};var ae=Object.defineProperty,le=Object.getOwnPropertyDescriptor,L=(o,t,e,s)=>{for(var r=s>1?void 0:s?le(t,e):t,i=o.length-1,a;i>=0;i--)(a=o[i])&&(r=(s?a(t,e,r):a(r))||r);return s&&r&&ae(t,e,r),r};function ne(o){const e=o.target.checked;H.relay(o,"dark-mode",{checked:e})}const O=class O extends A{constructor(){super("beeswarm:model"),this.loggedIn=!1,this._authObserver=new V(this,"beeswarm:auth")}get profile(){return console.log("hello "+this.userid+" "+this.model.profile),this.model.profile}render(){var s,r;const t=((s=this.profile)==null?void 0:s.profilePicture)||"/images/bees/basicbee.webp",e=((r=this.profile)==null?void 0:r.color)||"#cccccc";return l`
             <header>
                <div class="navbar">
                    <div class="logo-flex">
                        <h1>
                            <svg class="icon">
                                <use href="/icons/bee.svg#icon-bee" />
                            </svg>
                            bee swarm simulator
                        </h1>
                    </div>

                    <nav class="links">
                        <a href="/app">home</a>
                        <a href="/app/eggs">eggs</a>
                        <a href="/app/bees">bees</a>
                    </nav>
                    
                    <div class="right-flex">
                        <mu-dropdown>
                            <img
                                    slot="actuator"
                                    src=${t}
                                    alt="Profile Picture"
                                    class="pic"
                                    style="border: 3px solid ${e}"
                            />
                            <menu>
                                <li>
                                    Hello, ${this.userid}
                                </li>
                                <li>
                                    <a href="/app/profile/${this.userid}">
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <a href="/app/pollen/${this.userid}">
                                        My Pollen
                                    </a>
                                </li>
                                <li>
                                    ${this.loggedIn?this.renderSignOutButton():this.renderSignInButton()}
                                </li>
                                <li>
                                    <label @change=${ne}>
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
    `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&t.authenticated?(this.loggedIn=!0,this.userid=t.username,console.log("hello "+this.userid),this.dispatchMessage(["profile/select",{userid:this.userid}])):(this.loggedIn=!1,this.userid=void 0)})}static initializeOnce(){function t(e,s){e.classList.toggle("dark-mode",s)}document.body.addEventListener("dark-mode",e=>{var s;return t(e.currentTarget,(s=e.detail)==null?void 0:s.checked)})}renderSignOutButton(){return l`
            <button
                    @click=${t=>{H.relay(t,"auth:message",["auth/signout"])}}
            >
                Sign Out
            </button>
        `}renderSignInButton(){return l`
            <button @click=${()=>{window.location.href="/login.html"}}>
                Sign In
            </button>
        `}};O.uses=_({"mu-dropdown":ee.Element}),O.styles=[h.styles,m.styles,x.styles,c`
            .navbar {
                justify-content: space-between;

                align-items: center;
                display: flex;

                background-color: var(--color-primary);
                width: 100%;
                
                height: 4em;

                > .logo-flex {
                    padding-left: 1em;
                    font-size: 0.8em;
                    padding-top: 0.8em;
                }

                > .right-flex {
                    padding-right: 1em;
                    font-size: 1.2em;
                    li {
                        font-size: 0.8em;
                    }
                }
                
            }
            
            .pic {
                width: 2em;
                height: 2em;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid var(--color-line);
            }
            
            button {
                font-family: "Mansalva", sans-serif;
                background: none;
                border: none;
                margin-top: 1em;
            }

            .links {
                display: flex;
                gap: 1.5rem;
            }
        `];let u=O;L([y()],u.prototype,"loggedIn",2);L([y()],u.prototype,"userid",2);L([y()],u.prototype,"profile",1);var de=Object.defineProperty,J=(o,t,e,s)=>{for(var r=void 0,i=o.length-1,a;i>=0;i--)(a=o[i])&&(r=a(t,e,r)||r);return r&&de(t,e,r),r};const T=class T extends g{constructor(){super(...arguments),this.showDef=!1,this.showDev=!1}render(){return l`
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
    `}};T.styles=[h.styles,m.styles,x.styles,c`
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
        `];let w=T;J([n({type:Boolean})],w.prototype,"showDef");J([n({type:Boolean})],w.prototype,"showDev");var ce=Object.defineProperty,Q=(o,t,e,s)=>{for(var r=void 0,i=o.length-1,a;i>=0;i--)(a=o[i])&&(r=a(t,e,r)||r);return r&&ce(t,e,r),r};const I=class I extends g{constructor(){super(...arguments),this.src="/api/eggs",this.eggs=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){return l`
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
        `}hydrate(t){fetch(t).then(e=>e.json()).then(e=>{console.log(e.eggs),this.eggs=e.eggs}).catch(e=>console.error("error getting egg data:",e))}};I.styles=[h.styles,m.styles,c`
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
        `];let $=I;Q([n()],$.prototype,"src");Q([n({type:Array})],$.prototype,"eggs");const B=class B extends g{render(){return l`
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
                <h3 class="title-text">eggs</h3>
                <egg-container></egg-container>
            </div>
            `}};B.uses=_({"egg-container":$}),B.styles=[h.styles,m.styles,x.styles,c`
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

        `];let j=B;var pe=Object.defineProperty,b=(o,t,e,s)=>{for(var r=void 0,i=o.length-1,a;i>=0;i--)(a=o[i])&&(r=a(t,e,r)||r);return r&&pe(t,e,r),r};const F=class F extends g{constructor(){super(...arguments),this.src="/api/bees",this.common=[],this.rare=[],this.legendary=[],this.epic=[],this.showCommon=!0,this.showRare=!0,this.showEpic=!0,this.showLegendary=!0}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){return l`
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
        `)}hydrate(t){fetch(t).then(e=>e.json()).then(e=>{e!=null&&e.bees&&(this.common=e.bees.filter(s=>s.rarity==="common"),this.rare=e.bees.filter(s=>s.rarity==="rare"),this.legendary=e.bees.filter(s=>s.rarity==="legendary"),this.epic=e.bees.filter(s=>s.rarity==="epic"))}).catch(e=>console.error("error getting bee data:",e))}};F.styles=[h.styles,m.styles,c`
            .carrot {
                font-size: 0.7em;
            }
            
            .bee-container {
                display: flex;
                align-items: center;
                gap: 20px;
                border: var(--box-border-width) solid var(--color-line);
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
        `];let d=F;b([n()],d.prototype,"src");b([n({type:Array})],d.prototype,"common");b([n({type:Array})],d.prototype,"rare");b([n({type:Array})],d.prototype,"legendary");b([n({type:Array})],d.prototype,"epic");b([n({type:Boolean})],d.prototype,"showCommon");b([n({type:Boolean})],d.prototype,"showRare");b([n({type:Boolean})],d.prototype,"showEpic");b([n({type:Boolean})],d.prototype,"showLegendary");const D=class D extends g{render(){return l`
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
        `}};D.uses=_({"bee-container":d}),D.styles=[h.styles,m.styles,x.styles,c`
            .body-content-intro-text {
                text-align: center;
                padding-bottom: 1em;
            }

            .page-title {
                font-family: "Mansalva", sans-serif;
                text-shadow: 2px 2px var(--color-text-shadow);
            }

        `];let R=D;var he=Object.defineProperty,K=(o,t,e,s)=>{for(var r=void 0,i=o.length-1,a;i>=0;i--)(a=o[i])&&(r=a(t,e,r)||r);return r&&he(t,e,r),r};const q=class q extends g{connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){var t,e,s,r,i,a,v,E;return l`
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
                <img src="${(s=this.field)==null?void 0:s.image}" alt="an image of a field">
            </div>
            <hr>
            <div class="body-content">
                <div class="two-one-grid">
                    <div>
                        <h3 class="title-text">Mob(s)</h3>
                        <div class="mobs-flex">
                            ${(i=(r=this.field)==null?void 0:r.mobs)!=null&&i.length?this.renderMobBox((a=this.field)==null?void 0:a.mobs):l`<p>No mobs in this field</p>`}
                        </div>
                    </div>

                    <div>
                        <h3 class="title-text">Flower(s)</h3>
                        ${(E=(v=this.field)==null?void 0:v.flowers)!=null&&E.length?this.renderFlowerBox(this.field.flowers):l`<p>No flowers in this field</p>`}       
                    </div>

                </div>
            </div>
            <br>
            <br>
    `}renderMobBox(t=[]){return console.log(t[0]),console.log(t[0].mobname),t.map(e=>{var s,r,i;return l`
            <div class="mob-box">
                <h3>${e.mobname} (level ${e.level})</h3>
                <hr />
                <img class="mob-img" src="${e.image}" alt="imagine a mob picture" />
                <hr />
                <p>Mob Stats</p>
                <table class="table">
                    <tr>
                        <td>Health</td>
                        <td>${(s=e.stats)==null?void 0:s.health}</td>
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
        `})}renderFlowerBox(t){return t.map(e=>l`
            <div class="flower-box" style="background-color: ${this.getFlowerColor(e)};">
                <svg class="flower-icon">
                    <use href="../../icons/bee.svg#icon-flower"></use>
                </svg>
                <p>${e} flowers</p>
            </div>
        `)}getFlowerColor(t){switch(t){case"blue":return"var(--color-flower-blue)";case"red":return"var(--color-flower-red)";case"white":return"var(--color-flower-white)";default:return"white"}}hydrate(t){fetch(t).then(e=>e.json()).then(e=>{this.field=e}).catch(e=>console.error("error getting field+mob data:",e))}};q.styles=[h.styles,m.styles,c`
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
        `];let k=q;K([n({type:String})],k.prototype,"src");K([n({type:Object})],k.prototype,"field");var me=Object.defineProperty,W=(o,t,e,s)=>{for(var r=void 0,i=o.length-1,a;i>=0;i--)(a=o[i])&&(r=a(t,e,r)||r);return r&&me(t,e,r),r};const G=class G extends g{constructor(){super(...arguments),this.showGear=!0,this.showTools=!0}render(){return l`
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
    `}};G.styles=[h.styles,m.styles,x.styles,c`
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
        
    `];let z=G;W([n({type:Boolean})],z.prototype,"showGear");W([n({type:Boolean})],z.prototype,"showTools");const X={};var be=Object.defineProperty,ge=Object.getOwnPropertyDescriptor,f=(o,t,e,s)=>{for(var r=s>1?void 0:s?ge(t,e):t,i=o.length-1,a;i>=0;i--)(a=o[i])&&(r=(s?a(t,e,r):a(r))||r);return s&&r&&be(t,e,r),r};const M=class M extends A{constructor(){super("beeswarm:model"),this.showName=!0,this.showNickname=!0,this.showLevel=!0,this.showColor=!0,this.mode="view"}get user(){return this.model.profile}render(){return this.mode==="edit"?this.renderEditor():this.renderView()}renderView(){const{userid:t,nickname:e,level:s,color:r,profilePicture:i}=this.user||{};return l`
            <div class="body-content">
                <br>
                <br>
                <br>
                <h1 class="main-title">${t}'s profile</h1>
                <button @click=${()=>{this.mode="edit"}}>
                    edit
                </button>
                <br>
                <br>
                <br>
                <div class="form-card">
                    <div class="two-one-grid">
                        <div>
                            <h3>user id: ${this.userid}</h3>
                            <p>* userid is permanent</p>
                            <hr>
                            <h3>display name</h3>
                            <p style="padding-left: 1.5em;">${e||"none"}</p>
                            <h3>level</h3>
                            <p style="padding-left: 1.5em;">${s||"none"}</p>
                            <h3>color</h3>
                            <div style="display: flex; align-items: center; gap: 1rem; padding-left: 1.5em;">
                                <div style="width: 20px; height: 20px; background-color: ${r}; border: 2px solid var(--color-line);"></div>
                                <p style="margin: 0;">${r||"not specified"}</p>
                            </div>
                        </div>
                        <div class="col">
                            <h3>profile picture</h3>
                            <img src=${i} class="profpic" style="border: 3px solid ${r}" alt="pp"/>
                            <br>
                            <br>
                        </div>
                    </div>
                </div>
            <br>
            <br>
            </div>
        `}renderEditor(){const{nickname:t,level:e,color:s,profilePicture:r}=this.user||{};return l`
            <div class="body-content">
            <br>
            <br>
            <br>
            <h1 class="main-title">${this.userid}'s profile (edit mode)</h1>
                <div>
                    <button @click=${()=>{this.mode="view"}}>
                        view
                    </button>
                    <br>
                    <br>
                    <br>
                    <div class="form-card">
                        <div class="two-one-grid">
                            <div>
                                <h3>user id: ${this.userid}</h3>
                                <p>* userid is permanent</p>
                                <hr>
                                <mu-form
                                        .init=${X}
                                        @mu-form:submit=${this.handleSubmit}
                                >
                                    <dl>
                                        <dt>display name</dt>
                                        <dd><input name="nickname" value=${t}  required /></dd>
                
                                        <dt>level</dt>
                                        <dd><input name="level" type="number" min="0" value=${e}  required /></dd>
                
                                        <dt>favorite color</dt>
                                        <dd><input name="color" type="color" value=${s} /></dd>
                                        
                                        <dt>Avatar</dt>
                                        <dd>
                                            <input
                                                type="file"
                                                @change=${i=>{const v=i.target.files;v&&v.length&&this.handleAvatarSelected(v)}}
                                            />
                                        </dd>
                                    </dl>
                                    <br>
                                    <br>
                                    <br>
                            </div>
                            <div class="col">
                                <h3>profile picture</h3>
                                <img src=${this._profile_pic||r} class="profpic" style="border: 3px solid ${s}" alt="pp"/>
                                <br>
                                <br>
                            </div>
                        </div>
                        </div>
                    </mu-form>
                </div>
                <br>
        `}connectedCallback(){super.connectedCallback(),this.userid&&(console.log("Dispatching select message for:",this.userid),this.dispatchMessage(["profile/select",{userid:this.userid}]),console.log("profile"+this.user))}attributeChangedCallback(t,e,s){super.attributeChangedCallback(t,e,s),t==="userid"&&e!==s&&s&&this.dispatchMessage(["profile/select",{userid:s}])}handleSubmit(t){const e={...this.user,...t.detail};this._profile_pic&&(e.profilePicture=this._profile_pic),this.userid&&this.dispatchMessage(["profile/save",{userid:this.userid,profile:e,onSuccess:()=>this.mode="view",onFailure:s=>{console.log("Error saving profile",s)}}])}handleAvatarSelected(t){t&&t.length&&new Promise((s,r)=>{const i=new FileReader;i.onload=()=>s(i.result),i.onerror=a=>r(a),i.readAsDataURL(t[0])}).then(s=>this._profile_pic=s)}firstUpdated(){this.userid&&this.dispatchMessage(["profile/select",{userid:this.userid}])}};M.uses=_({"mu-form":te.Element}),M.styles=[h.styles,m.styles,c`
            dt {
                font-size: 1.17em;
            }
            
            .main-title {
                font-size: 2rem;
                text-shadow: .2em .15em var(--color-text-shadow);
                text-align: center;
            }

            .card {
                border: 2px solid var(--color-line);
                border-radius: 1em;
            }

            .form-card {
                padding: 0 1.5em;
                border: 2px solid var(--color-line);
                border-radius: 1em;
            }

            .banner {
                padding: 0.25em 1em;
                text-align: left;
                background-color: var(--color-secondary);
                font-size: var(--font-size-medium);

                background: var(--color-seven);
            }

            .card-content {
                padding-left: 1.25em;
            }

            .carrot {
                font-size: 0.7em;
            }

            .two-one-grid {
                display: grid;
                grid-template-columns: 1fr 2fr;
                width: 100%;
                gap: var(--box-gap);

                @media screen and (max-width: 70rem) {
                    grid-template-columns: 1fr;
                }
            }

            .col {
                text-align: center;
                padding-top: 1em;
            }

            .profpic {
                width: 300px;
                height: 300px;
                border-radius: 50%;
                object-fit: cover;
            }

            button {
                font-family: "Mansalva", sans-serif;
                font-size: 1em;
                border: 2px solid var(--color-line);
                padding: 0.25em 1em;
                background-color: var(--color-primary);
                border-radius: 30%;
            }

            mu-form {
                display: contents;
            }

            input {
                margin: 1em 0;
                font: inherit;
            }

            dl, dt {
                font-family: "mansalva", sans-serif;
            }
        `];let p=M;f([n({type:Boolean})],p.prototype,"showName",2);f([n({type:Boolean})],p.prototype,"showNickname",2);f([n({type:Boolean})],p.prototype,"showLevel",2);f([n({type:Boolean})],p.prototype,"showColor",2);f([n({attribute:"userid"})],p.prototype,"userid",2);f([y()],p.prototype,"user",1);f([n()],p.prototype,"mode",2);f([y()],p.prototype,"_profile_pic",2);var fe=Object.defineProperty,Y=(o,t,e,s)=>{for(var r=void 0,i=o.length-1,a;i>=0;i--)(a=o[i])&&(r=a(t,e,r)||r);return r&&fe(t,e,r),r};const U=class U extends g{connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){var t,e,s,r;return l`
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
                        <br>
                        <img src="${(s=this.bear)==null?void 0:s.image}" alt="bear" />
                    </div>
                    <div class="info">
                        <h3 class="title-text">Quests</h3>
                        ${(r=this.bear)==null?void 0:r.quests.map(i=>l`
                            <div class="questbox">
                                <p class="subtitle-text">${i.title}</p>
                                <ul>
                                    ${i.tasks.map(a=>l`<li>${a}</li>`)}
                                    <li>Reward: ${i.reward}</li>
                                </ul>
                            </div>
                        `)}
                    </div>
                </div>
            </div>
    `}hydrate(t){fetch(t).then(e=>e.json()).then(e=>{this.bear=e}).catch(e=>console.error("error getting bear data:",e))}};U.styles=[h.styles,m.styles,c`
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
            
        `];let C=U;Y([n({type:String})],C.prototype,"src");Y([n({type:Object})],C.prototype,"bear");var ue=Object.defineProperty,ve=Object.getOwnPropertyDescriptor,Z=(o,t,e,s)=>{for(var r=s>1?void 0:s?ve(t,e):t,i=o.length-1,a;i>=0;i--)(a=o[i])&&(r=(s?a(t,e,r):a(r))||r);return s&&r&&ue(t,e,r),r};const N=class N extends A{get user(){return this.model.profile}constructor(){super("beeswarm:model")}render(){const{pollen:t}=this.user||{};return l`
            <br>
            <br>
            <br>
            <div class="body-content-intro-text">
                <h1 class="page-title">the bee swarm experience</h1>
                <p>welcome to the <s>cookie</s> pollen clicker!</p>
            </div>
            <br>
            <br>
            <hr>
            <div class="body-content">
                <p>${t}</p>
                <button @click=${this.handleClick}>Collect Pollen</button>
            </div>
    `}connectedCallback(){super.connectedCallback(),this.userid&&this.dispatchMessage(["profile/select",{userid:this.userid}])}handleClick(){var t;if(this.userid&&((t=this.user)==null?void 0:t.pollen)!==void 0){const e=this.user.pollen+1;this.dispatchMessage(["pollen/save",{userid:this.userid,newPollen:e}])}}};N.styles=[h.styles,m.styles,x.styles,c`
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
            
        
    `];let P=N;Z([n({attribute:"userid"})],P.prototype,"userid",2);Z([y()],P.prototype,"user",1);function ye(o,t,e){switch(o[0]){case"profile/save":we(o[1],e).then(r=>t(i=>({...i,profile:r}))).then(()=>{const{onSuccess:r}=o[1];r&&r()}).catch(r=>{const{onFailure:i}=o[1];i&&i(r)});break;case"profile/select":$e(o[1],e).then(r=>{console.log("applying profile to model:",r),t(i=>({...i,profile:r}))});break;case"pollen/save":xe(o[1],e).then(r=>{console.log("applying profile to model:",r),t(i=>({...i,profile:r}))});break;default:const s=o[0];throw new Error(`Unhandled message "${s}"`)}}function xe(o,t){return fetch(`/api/users/pollen/${o.userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...S.headers(t)},body:JSON.stringify({pollen:o.newPollen})}).then(e=>{if(e.status===200)return e.json();throw new Error(`failed to update pollen for ${o.userid}`)}).then(e=>e)}function we(o,t){return fetch(`/api/users/${o.userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...S.headers(t)},body:JSON.stringify(o.profile)}).then(e=>{if(e.status===200)return e.json();throw new Error(`Failed to save profile for ${o.userid}`)}).then(e=>{if(e)return e})}function $e(o,t){return fetch(`/api/users/${o.userid}`,{headers:S.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Profile:",e),e})}const ke=[{path:"/app/field/:name",view:o=>l`
            <field-view src="/api/fields/${o.name}"></field-view>
        `},{path:"/app/bear/:name",view:o=>l`
            <bear-view src="/api/bears/${o.name}"></bear-view>
        `},{auth:"protected",path:"/app/profile/:userid",view:o=>l`
              <profile-view userid=${o.userid}> </profile-view>
        `},{auth:"protected",path:"/app/pollen/:userid",view:o=>l`
              <pollen-view userid=${o.userid}> </pollen-view>
        `},{path:"/app/npcs/:name",view:o=>l`
            <npc-view npcname=${o.name}></npc-view>
        `},{path:"/app/shops/noob-shop",view:()=>l`
            <noob-shop-view></noob-shop-view>
        `},{path:"/app/bees",view:()=>l`
            <bee-view></bee-view>
        `},{path:"/app/eggs",view:()=>l`
            <egg-view></egg-view>
        `},{path:"/app",view:()=>l`
            <home-view></home-view>
        `},{path:"/",redirect:"/app"}];_({"mu-auth":S.Provider,"mu-history":re.Provider,"mu-store":class extends ie.Provider{constructor(){super(ye,X,"beeswarm:auth")}},"navbar-element":u,"home-view":w,"egg-view":j,"bee-view":R,"field-view":k,"bear-view":C,"noob-shop-view":z,"profile-view":p,"pollen-view":P,"mu-switch":class extends se.Element{constructor(){super(ke,"beeswarm:history","beeswarm:auth")}}});u.initializeOnce();
