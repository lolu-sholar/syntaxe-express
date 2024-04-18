"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SyntaxeIO=void 0;var r=require("./lib/engine.js");(exports.SyntaxeIO=new Object).init=(e=null)=>{if(!e||!e.app)throw new Error("No app detected.");new s(e)};const s=class{constructor(e=null){e.app.set("syntaxeEnabledStatus",e.enabled),e.app.use(this.#request)}async#request(e,s,t){var{resolve:a,schema:n}=(0,r.scanDirectives)(e,s),e=e.app.get("syntaxeEnabledStatus");s.set("Syntaxe-Enabled",e),e&&a&&(s.syntaxeSchema=await(0,r.filterSchema)(n),s.syntaxeSchema.status?new i(s):(s.set("Syntaxe-Schema-Resolved",!1),s.set("Syntaxe-Schema-Resolved-Error","Query failed. Check your schema and try again."))),t()}},i=class{#response;#data;#send;constructor(e){this.#response=e,this.#send=this.#response.send,this.#response.send=this.#delegate()}#delegate(){return async e=>{this.#data=await(0,r.walkThroughHandler)({data:e,res:this.#response})??e,this.#respond()}}#respond(){this.#send.call(this.#response,this.#data)}};