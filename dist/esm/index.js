import{SyntaxeEngine as o}from"./lib/engine.js";var e=new Object;e.init=(e=null)=>{if(!e||!e.app)throw new Error("No app detected.");new t(e)};const t=class{constructor(e=null){this.#configureForAdapter(e)}#configureForAdapter(e){try{e.app&&"function"==typeof e.app.getHttpAdapter&&Object.getOwnPropertySymbols(e.app.getHttpAdapter().getInstance()).find(e=>"Symbol(fastify.state)"==e.toString())&&e.enabled&&this.#adjustToAdapterInstance(e);var t=e.enabled?this.#syntaxeEnabled:this.#syntaxeDisabled;e.app.use(t)}catch(e){console.error(e)}}#adjustToAdapterInstance(e){try{var t=e.app.getHttpAdapter().getInstance();t.addHook("onRequest",(e,t,a)=>{t.setHeader=function(e,t){return this.raw.setHeader(e,t)},t.end=function(){this.raw.end()},e.res=t,a()}),t.addHook("onSend",(e,t,a,n)=>{try{t.syntaxeSchema=e.raw.syntaxeSchema;var s=e.raw.syntaxeEngineState;new o(s).walkThroughHandler({data:a,res:t}).then(e=>{n(null,e)}).catch(e=>n(null,a))}catch(e){}})}catch(e){console.error(e)}}async#syntaxeEnabled(e,t,a){try{var n=new o,{resolve:s,schema:r}=n.scanDirectives(e,t);t.setHeader("Syntaxe-Enabled",!0),s&&(t.syntaxeSchema=e.syntaxeSchema=await n.filterSchema(r),t.syntaxeEngineInstance=n,e.syntaxeEngineState=n.getEngineState(),t.syntaxeSchema.status?new d(t):(t.setHeader("Syntaxe-Schema-Resolved",!1),t.setHeader("Syntaxe-Schema-Resolved-Error","Query failed. Check your schema and try again.")))}catch(e){console.error(e)}a()}async#syntaxeDisabled(e,t,a){t.setHeader("Syntaxe-Enabled",!1),a()}},d=class{#response;#data;#send;constructor(e){this.#response=e,this.#send=this.#response.send,this.#response.send=this.#delegate()}#delegate(){return async e=>{var t=this.#response.syntaxeEngineInstance;this.#data=await t.walkThroughHandler({data:e,res:this.#response})??e,this.#respond()}}#respond(){this.#send.call(this.#response,this.#data)}};export default e;