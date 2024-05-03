import{flags as s,patterns as k,monthMap as I,dayMap as w,timeDuration as x,timeDurationMap as T}from"./helpers.js";const L=(e,t,a,r)=>new RegExp((t?"^":"")+String(e).substr(1,String(e).length-2)+(a?"$":""),r||"gi"),M=(...e)=>e.length?new Date(...e):new Date,A=(e,t,a)=>Math.random().toString(e??20).substring(t??2,a??12),P=e=>{for(var t of I)if(t[1].includes(e.toLowerCase()))return t[0]+1;return 0},O=e=>{for(var t of w)if(t[1].includes(e.toLowerCase()))return t[0]+1;return 0};var e=class{#holder;constructor(e){this.#holder=e??{propertyOps:new Map,objectOps:new Map,rootOp:null,rootKey:"root",context:"json",mode:"and",condition:"and",defaultDate:[1991,6,1]}}getEngineState(){return this.#holder}scanDirectives(e,t){let a=!1,r=String(),i=!1;try{for(var n in e.headers)n.toLowerCase()==s.resolve.toLowerCase()?(a=!0,r=atob(e.headers[n])):n.toLowerCase()==s.client.toLowerCase()&&(i=!0);return{resolve:a,schema:r,client:i}}catch(e){return t.setHeader("Syntaxe-Schema-Resolved",!1),t.setHeader("Syntaxe-Schema-Resolved-Error",String(e)),console.error({date:new Date,error:e}),{resolve:!1}}}async#filterOperations(t){try{let m;return String(t).trim().startsWith("[")&&(this.#holder.context="root",t="{ rootPropertyIdentifier }"+t),String(t).replace(L(k.general.newLine),"").replace(L(k.operations.propertyOp),(_,e)=>{let t=_.split("").indexOf("["),a=_.substring(0,t),r=_.substring(t).replace(L(k.general.opList),"]*^*[").split("*^*"),i="*instr-p:id_"+A(),n=r.map(e=>String(e).replace(L(k.general.operation,!0,!0),"")),s="and";(m=JSON.stringify(n)).match(/"cond:/)&&(s=m.match(/"cond:\\"or\\"/)?"or":"and",n=n.filter(e=>!e.match(/cond:/)));var _=L(k.general.omission,null,!0),l=a.trim().match(_);return this.#holder.propertyOps.set(i,{property:a.trim().replace(_,""),operation:n,condition:s,omit:Boolean(l)}),i}).replace(L(k.operations.objectOp,null,!0),(_,e)=>{let t=_.split("").indexOf("["),a=_.substring(t).replace(L(k.general.opList),"]*^*[").split("*^*"),r=a.map(e=>String(e).replace(L(k.general.operation,!0,!0),""));return m=JSON.stringify(r),this.#holder.condition=m.match(/"cond:/)&&m.match(/"cond:\\"or\\"/)?"or":"and",this.#holder.mode=m.match(/"mode:/)&&m.match(/"mode:\\"or\\"/)?"or":"and",r=r.filter(e=>!e.match(/mode:/)&&!e.match(/cond:/)),this.#holder.rootOp=r,"}"}).replace(L(k.operations.objectOp),(_,e)=>{let t=_.split("").indexOf("["),a=_.substring(t).replace(L(k.general.opList),"]*^*[").split("*^*"),r="*instr-o:id_"+A(),i=a.map(e=>String(e).replace(L(k.general.operation,!0,!0),"")),n="and",s="and";return(m=JSON.stringify(i)).match(/"cond:/)&&(n=m.match(/"cond:\\"or\\"/)?"or":"and",i=i.filter(e=>!e.match(/cond:/))),m.match(/"mode:/)&&(s=m.match(/"mode:\\"or\\"/)?"or":"and",i=i.filter(e=>!e.match(/mode:/))),this.#holder.objectOps.set(r,{operation:i,mode:s,condition:n}),"} "+r})}catch(e){return t}}async filterSchema(e){try{var t=await this.#filterOperations(e),a=String(t).replace(L(k.general.newLine),"").replace(L(k.schema.commaAndSpace)," ").replace(L(k.schema.objectProperty),(_,e)=>`"${e}"`).replace(L(k.schema.spaceAndBrace),(_,e)=>({'" "':'":1, "','" {':'": {','"{':'": {','" }':'":1 }','"}':'":1 }'})[_]||"").replace(L(k.schema.braceAndSpace),'}, "');return{status:!0,schema:JSON.parse(a)}}catch(e){return{status:!1}}}async walkThroughHandler({data:t,res:a}){var r=a.syntaxeSchema["schema"];if(r)try{var i,n,s="string"==typeof t&&"root"!=this.#holder.context?JSON.parse(t):t;let e="json"==this.#holder.context?(await this.#schemaWalkThrough({schema:r,subject:s})).result:s;return this.#holder.rootOp&&(i="*instr-p:id_"+A(),this.#holder.propertyOps.set(i,{property:this.#holder.rootKey,operation:this.#holder.rootOp,condition:this.#holder.condition}),n=await this.#schemaWalkThrough({schema:{[i]:1},subject:{[this.#holder.rootKey]:e}}),e=n.schemaPass?n.result[this.#holder.rootKey]:n.result[this.#holder.rootKey]instanceof Array?[]:Object.create(null)),a.setHeader("Syntaxe-Schema-Resolved",!0),JSON.stringify(e)}catch(e){a.setHeader("Syntaxe-Schema-Resolved",!1),a.setHeader("Syntaxe-Schema-Resolved-Error",String(e)),console.error({date:new Date,error:e,schema:r})}}async#schemaWalkThrough({schema:c,subject:d,mode:e}){let g={},t=!0,a=new Set([]),D=null;if(Array.isArray(d)){g=[];for(var r of d){r=await this.#schemaWalkThrough({schema:c,subject:r,mode:e});r.schemaPass&&g.push(r.result)}}else{let s=Object.keys(c),o=-1;for(var h of s){++o;let l=!0,m=new Set([]),u=null,e=L(k.general.omission,null,!0),i=Boolean(h.match(e)),n=h;if(h=h.replace(e,""),this.#holder.propertyOps.has(h)){let s=d[(u=this.#holder.propertyOps.get(h)).property];if(d.hasOwnProperty(u.property)){for(let t=0;t<u.operation.length;t++){var v=u.operation[t],b=v.split("").indexOf(":");let[r,e]=[v.substr(0,b),v.substr(++b)],i={},n=(r=r||e,e&&(D=String(e).replace(L(k.general.quotes,!0,!0),"")||""),["in","nin","ini","nini","sin","snin","dtin","dtnin","dtinrange","dtninrange","dtmin","dtmnin","dtminrange","dtmninrange","yin","ynin","yinrange","yninrange","min","mnin","minrange","mninrange","din","dnin","dinrange","dninrange","dwin","dwnin","dwinrange","dwninrange","hin","hnin","hinrange","hninrange","minin","minnin","mininrange","minninrange","tin","tnin","tinrange","tninrange","agoin","btw"].includes(r)?String(D).replace(L(k.general.operation,!0,!0),"").split(",").map(e=>{e=String(e).trim().replace(L(k.general.quotes,!0,!0),"");return["sin","snin","yin","ynin","btw"].includes(r)?Number(e):e}):[]);switch(r){case"as":u.alias=D;break;case"rew":D=D==r?"":D,s=String(s).replace(L(k.general.raws),D||"");break;case"rw":D=D==r?"":D,s=String(s).replace(L(k.general.ws),D||"");break;case"eq":l=String(s)===D;break;case"eqi":l=String(s).toLowerCase()===D.toLowerCase();break;case"ne":l=String(s)!==D;break;case"nei":l=String(s).toLowerCase()!==D.toLowerCase();break;case"gt":l=Number(s)>Number(D);break;case"gte":l=Number(s)>=Number(D);break;case"lt":l=Number(s)<Number(D);break;case"lte":l=Number(s)<=Number(D);break;case"nn":l=![null,void 0,""].includes(s);break;case"in":l=Array.isArray(s)?s.some(t=>n.some(e=>e==t||e===t)):n.some(e=>e==s||e===s);break;case"nin":l=Array.isArray(s)?s.every(t=>!n.some(e=>e==t||e===t)):!n.some(e=>e==s||e===s);break;case"ini":case"nini":n=n.join(",").toLowerCase().split(","),i.status=Array.isArray(s)?s.some(e=>Array.from(n).includes(String(e).toLowerCase())):Array.from(n).includes(String(s).toLowerCase()),l="ini"==r?i.status:!i.status;break;case"regex":case"regexne":i.regexPattern=D.trim().substring(1).split("/"),i.status=new RegExp(i.regexPattern[0],i.regexPattern[1]).test(s),l="regex"==r?i.status:!i.status;break;case"regexin":case"regexnin":i.regexCluster=D.replace(L(k.general.operation,!0,!0),"").split(","),l=i.regexCluster.some(e=>(i.regexPattern=e.trim().substring(1).split("/"),i.status=Array.isArray(s)?s.some(e=>new RegExp(i.regexPattern[0],i.regexPattern[1]).test(e)):new RegExp(i.regexPattern[0],i.regexPattern[1]).test(s),"regexin"==r?i.status:!i.status));break;case"size":s=s instanceof Array||"string"==typeof s?s.length:"object"==typeof s?Object.keys(s).length:s;break;case"seq":l=s.length==Number(D);break;case"sne":l=s.length!=Number(D);break;case"sgt":l=s.length>Number(D);break;case"slt":l=s.length<Number(D);break;case"sgte":l=s.length>=Number(D);break;case"slte":l=s.length<=Number(D);break;case"sin":case"snin":var[p,f]=[Math.min(...Array.from(n)),Math.max(...Array.from(n))];i.status=s.length>=p&&s.length<=f,l="sin"==r?i.status:!i.status;break;case"dteq":case"dtne":[i.valueDate,i.filteredDate]=[M(s).toLocaleDateString(),M(D).toLocaleDateString()],i.status="Invalid Date"!=i.valueDate&&i.valueDate==i.filteredDate,l="dteq"==r?i.status:!i.status;break;case"dtgt":case"dtlt":[i.valueDate,i.filteredDate]=[M(M(s).toLocaleDateString()),M(M(D).toLocaleDateString())],l=![String(i.valueDate),String(i.filteredDate)].includes("Invalid Date")&&("dtgt"==r?i.valueDate>i.filteredDate:i.valueDate<i.filteredDate);break;case"dtgte":case"dtlte":[i.valueDate,i.filteredDate]=[M(s),M(D)],l=![String(i.valueDate),String(i.filteredDate)].includes("Invalid Date")&&(("dtgte"==r?i.valueDate>i.filteredDate:i.valueDate<i.filteredDate)||i.valueDate.toLocaleDateString()==i.filteredDate.toLocaleDateString());break;case"dtin":case"dtnin":i.valueDate=M(s).toLocaleDateString(),i.haystack=n,i.status=i.haystack.some(e=>{e=M(e).toLocaleDateString();return"Invalid Date"!=e&&i.valueDate==e}),l=![String(i.valueDate)].includes("Invalid Date")&&("dtin"==r?i.status:!i.status);break;case"dtinrange":case"dtninrange":i.valueDate=M(M(s).toLocaleDateString()),i.haystack={min:M(M(n[0]).toLocaleDateString()),max:2==n.length?M(M(n[1]).toLocaleDateString()):M().toLocaleDateString()},i.status=(i.valueDate>i.haystack.min||i.valueDate.toLocaleDateString()==i.haystack.min.toLocaleDateString())&&(i.valueDate<i.haystack.max||i.valueDate.toLocaleDateString()==i.haystack.max.toLocaleDateString()),l=![String(i.valueDate),String(i.haystack.min),String(i.haystack.max)].includes("Invalid Date")&&("dtinrange"==r?i.status:!i.status);break;case"dtmeq":case"dtmne":[i.valueDate,i.filteredDate]=[M(s),M(D)],i.status="Invalid Date"!=String(i.valueDate)&&String(i.valueDate)==String(i.filteredDate),l="dtmeq"==r?i.status:!i.status;break;case"dtmgt":case"dtmlt":[i.valueDate,i.filteredDate]=[M(s),M(D)],l=![String(i.valueDate),String(i.filteredDate)].includes("Invalid Date")&&("dtmgt"==r?i.valueDate>i.filteredDate:i.valueDate<i.filteredDate);break;case"dtmgte":case"dtmlte":[i.valueDate,i.filteredDate]=[M(s),M(D)],l=![String(i.valueDate),String(i.filteredDate)].includes("Invalid Date")&&(("dtmgte"==r?i.valueDate>i.filteredDate:i.valueDate<i.filteredDate)||String(i.valueDate)==String(i.filteredDate));break;case"dtmin":case"dtmnin":i.valueDate=M(s),i.haystack=n,i.status=i.haystack.some(e=>{e=M(e);return"Invalid Date"!=e&&String(i.valueDate)==String(e)}),l=![String(i.valueDate)].includes("Invalid Date")&&("dtmin"==r?i.status:!i.status);break;case"dtminrange":case"dtmninrange":i.valueDate=M(s),i.haystack={min:M(n[0]),max:M(n[1])},i.status=(i.valueDate>i.haystack.min||String(i.valueDate)==String(i.haystack.min))&&(i.valueDate<i.haystack.max||String(i.valueDate)==String(i.haystack.max)),l=![String(i.valueDate),String(i.haystack.min),String(i.haystack.max)].includes("Invalid Date")&&("dtminrange"==r?i.status:!i.status);break;case"yeq":case"yne":[i.valueDate,i.filteredDate]=[M(s),D],i.status=![String(i.valueDate)].includes("Invalid Date")&&String(i.valueDate.getFullYear())==String(i.filteredDate),l="yeq"==r?i.status:!i.status;break;case"ygt":case"ylt":[i.valueDate,i.filteredDate]=[M(s),D],l=![String(i.valueDate)].includes("Invalid Date")&&("ygt"==r?Number(i.valueDate.getFullYear())>Number(i.filteredDate):Number(i.valueDate.getFullYear())<Number(i.filteredDate));break;case"ygte":case"ylte":[i.valueDate,i.filteredDate]=[M(s),D],l=![String(i.valueDate)].includes("Invalid Date")&&("ygte"==r?Number(i.valueDate.getFullYear())>=Number(i.filteredDate):Number(i.valueDate.getFullYear())<=Number(i.filteredDate));break;case"yin":case"ynin":i.valueDate=M(s),i.haystack=n,i.status=i.haystack.some(e=>"Invalid Date"!=e&&String(i.valueDate.getFullYear())==String(e)),l=![String(i.valueDate)].includes("Invalid Date")&&("yin"==r?i.status:!i.status);break;case"yinrange":case"yninrange":i.valueDate=M(s),i.haystack={min:n[0],max:n[1]},i.status=Number(i.valueDate.getFullYear())>=Number(i.haystack.min)&&Number(i.valueDate.getFullYear())<=Number(i.haystack.max),l=![String(i.valueDate)].includes("Invalid Date")&&("yinrange"==r?i.status:!i.status);break;case"meq":case"mne":[i.valueDate,i.filteredDate]=[M(s),D],i.monthFilter=(i.valueDate.getMonth()||0)+1,i.status=![String(i.valueDate)].includes("Invalid Date")&&(isNaN(i.filteredDate)&&Array.from(I.get(i.valueDate.getMonth())).includes(String(i.filteredDate).toLowerCase())||!isNaN(i.filteredDate)&&String(i.monthFilter)==String(Number(i.filteredDate))),l="meq"==r?i.status:!i.status;break;case"mgt":case"mlt":i.valueDate=M(s),i.monthFilter=(i.valueDate.getMonth()||0)+1,i.filteredDate=isNaN(D)?P(D):D,l=![String(i.valueDate)].includes("Invalid Date")&&1<=Number(i.filteredDate)&&Number(i.filteredDate)<=12&&("mgt"==r?Number(i.monthFilter)>Number(i.filteredDate):Number(i.monthFilter)<Number(i.filteredDate));break;case"mgte":case"mlte":i.valueDate=M(s),i.monthFilter=(i.valueDate.getMonth()||0)+1,i.filteredDate=isNaN(D)?P(D):D,l=![String(i.valueDate)].includes("Invalid Date")&&1<=Number(i.filteredDate)&&Number(i.filteredDate)<=12&&("mgte"==r?Number(i.monthFilter)>=Number(i.filteredDate):Number(i.monthFilter)<=Number(i.filteredDate));break;case"min":case"mnin":i.valueDate=M(s),i.monthFilter=(i.valueDate.getMonth()||0)+1,i.haystack=n,i.status=i.haystack.some(e=>{e=isNaN(e)?P(e):e;return String(i.monthFilter)==String(Number(e))}),l=![String(i.valueDate)].includes("Invalid Date")&&("min"==r?i.status:!i.status);break;case"minrange":case"mninrange":i.valueDate=M(s),i.monthFilter=(i.valueDate.getMonth()||0)+1,i.isNaN=n.some(e=>isNaN(e)),i.haystack=i.isNaN?n.map(e=>isNaN(e)?P(e):e):[n[0],n[1]],i.haystack={min:Math.min(i.haystack[0],i.haystack[1]),max:Math.max(i.haystack[0],i.haystack[1])},i.status=1<=Number(i.haystack.min)&&Number(i.haystack.max)<=12&&Number(i.monthFilter)>=Number(i.haystack.min)&&Number(i.monthFilter)<=Number(i.haystack.max),l=![String(i.valueDate)].includes("Invalid Date")&&("minrange"==r?i.status:!i.status);break;case"today":[i.valueDate,i.filteredDate]=[M(s),M()],l=![String(i.valueDate)].includes("Invalid Date")&&i.valueDate.toLocaleDateString()==i.filteredDate.toLocaleDateString();break;case"deq":case"dne":[i.valueDate,i.filteredDate]=[M(s),D],i.status=![String(i.valueDate)].includes("Invalid Date")&&(isNaN(i.filteredDate)&&Array.from(w.get(i.valueDate.getDay())).includes(String(i.filteredDate).toLowerCase())||!isNaN(i.filteredDate)&&String(i.valueDate.getDate())==String(Number(i.filteredDate))),l="deq"==r?i.status:!i.status;break;case"dgt":case"dlt":[i.valueDate,i.filteredDate]=[M(s),D],l=![String(i.valueDate)].includes("Invalid Date")&&("dgt"==r?Number(i.valueDate.getDate())>Number(i.filteredDate):Number(i.valueDate.getDate())<Number(i.filteredDate));break;case"dgte":case"dlte":[i.valueDate,i.filteredDate]=[M(s),D],l=![String(i.valueDate)].includes("Invalid Date")&&("dgte"==r?Number(i.valueDate.getDate())>=Number(i.filteredDate):Number(i.valueDate.getDate())<=Number(i.filteredDate));break;case"din":case"dnin":i.valueDate=M(s),i.haystack=n,i.status=i.haystack.some(e=>String(Number(i.valueDate.getDate()))==String(Number(e))),l=![String(i.valueDate)].includes("Invalid Date")&&("din"==r?i.status:!i.status);break;case"dinrange":case"dninrange":i.valueDate=M(s),i.haystack={min:Math.min(n[0],n[1]),max:Math.max(n[0],n[1])},i.status=1<=Number(i.haystack.min)&&Number(i.haystack.max)<=31&&Number(i.valueDate.getDate())>=Number(i.haystack.min)&&Number(i.valueDate.getDate())<=Number(i.haystack.max),l=![String(i.valueDate)].includes("Invalid Date")&&("dinrange"==r?i.status:!i.status);break;case"dweq":case"dwne":[i.valueDate,i.filteredDate]=[M(s),D],i.dayFilter=(i.valueDate.getDay()||0)+1,i.status=![String(i.valueDate)].includes("Invalid Date")&&(isNaN(i.filteredDate)&&Array.from(w.get(i.valueDate.getDay())).includes(String(i.filteredDate).toLowerCase())||!isNaN(i.filteredDate)&&String(i.dayFilter)==String(Number(i.filteredDate))),l="dweq"==r?i.status:!i.status;break;case"dwgt":case"dwlt":i.valueDate=M(s),i.dayFilter=(i.valueDate.getDay()||0)+1,i.filteredDate=isNaN(D)?O(D):D,l=![String(i.valueDate)].includes("Invalid Date")&&1<=Number(i.filteredDate)&&Number(i.filteredDate)<=7&&("dwgt"==r?Number(i.dayFilter)>Number(i.filteredDate):Number(i.dayFilter)<Number(i.filteredDate));break;case"dwgte":case"dwlte":i.valueDate=M(s),i.dayFilter=(i.valueDate.getDay()||0)+1,i.filteredDate=isNaN(D)?O(D):D,l=![String(i.valueDate)].includes("Invalid Date")&&1<=Number(i.filteredDate)&&Number(i.filteredDate)<=7&&("dwgte"==r?Number(i.dayFilter)>=Number(i.filteredDate):Number(i.dayFilter)<=Number(i.filteredDate));break;case"dwin":case"dwnin":i.valueDate=M(s),i.dayFilter=(i.valueDate.getDay()||0)+1,i.haystack=n,i.status=i.haystack.some(e=>{e=isNaN(e)?O(e):e;return String(i.dayFilter)==String(Number(e))}),l=![String(i.valueDate)].includes("Invalid Date")&&("dwin"==r?i.status:!i.status);break;case"dwinrange":case"dwninrange":i.valueDate=M(s),i.dayFilter=(i.valueDate.getDay()||0)+1,i.isNaN=n.some(e=>isNaN(e)),i.haystack=i.isNaN?n.map(e=>isNaN(e)?O(e):e):[n[0],n[1]],i.haystack={min:Math.min(i.haystack[0],i.haystack[1]),max:Math.max(i.haystack[0],i.haystack[1])},i.status=1<=Number(i.haystack.min)&&Number(i.haystack.max)<=7&&Number(i.dayFilter)>=Number(i.haystack.min)&&Number(i.dayFilter)<=Number(i.haystack.max),l=![String(i.valueDate)].includes("Invalid Date")&&("dwinrange"==r?i.status:!i.status);break;case"heq":case"hne":case"hgt":case"hlt":case"hgte":case"hlte":switch([i.valueDate,i.filteredDate]=[M(s),D],i.isNaN=isNaN(i.filteredDate),i.timeInfo=i.isNaN?{hour:Number(i.filteredDate.replace(L(k.general.nonDigit),"")),meridiem:i.filteredDate.replace(L(k.general.nonAlphabet),"")}:{hour:Number(i.filteredDate)},i.isNaN&&(i.timeInfo.hour+="pm"==i.timeInfo.meridiem.toLowerCase()&&12!=i.timeInfo.hour?12:"am"==i.timeInfo.meridiem.toLowerCase()&&12!=i.timeInfo.hour||"am"==i.timeInfo.meridiem.toLowerCase()?0:-12),r){case"heq":case"hne":i.status=![String(i.valueDate)].includes("Invalid Date")&&String(i.valueDate.getHours())==String(i.timeInfo.hour),l="heq"==r?i.status:!i.status;break;case"hgt":case"hlt":l=![String(i.valueDate)].includes("Invalid Date")&&("hgt"==r?i.valueDate.getHours()>i.timeInfo.hour:i.valueDate.getHours()<i.timeInfo.hour);break;default:l=![String(i.valueDate)].includes("Invalid Date")&&("hgte"==r?i.valueDate.getHours()>=i.timeInfo.hour:i.valueDate.getHours()<=i.timeInfo.hour)}break;case"hin":case"hnin":i.valueDate=M(s),i.status=![String(i.valueDate)].includes("Invalid Date")&&n.some(e=>(i.isNaN=isNaN(e),i.timeInfo=i.isNaN?{hour:Number(String(e).replace(L(k.general.nonDigit),"")),meridiem:String(e).replace(L(k.general.nonAlphabet),"")}:{hour:Number(e)},i.isNaN&&(i.timeInfo.hour+="pm"==i.timeInfo.meridiem.toLowerCase()&&12!=i.timeInfo.hour?12:"am"==i.timeInfo.meridiem.toLowerCase()&&12!=i.timeInfo.hour||"am"==i.timeInfo.meridiem.toLowerCase()?0:-12),String(i.valueDate.getHours())==String(i.timeInfo.hour))),l="hin"==r?i.status:!i.status;break;case"hinrange":case"hninrange":i.valueDate=M(s),i.haystack=2<=n.length?[n[0],n[1]]:[n[0],n[0]],i.timeInfoRange=i.haystack.map(e=>(i.isNaN=isNaN(e),i.timeInfo=i.isNaN?{hour:Number(String(e).replace(L(k.general.nonDigit),"")),meridiem:String(e).replace(L(k.general.nonAlphabet),"")}:{hour:Number(e)},i.isNaN&&(i.timeInfo.hour+="pm"==i.timeInfo.meridiem.toLowerCase()&&12!=i.timeInfo.hour?12:"am"==i.timeInfo.meridiem.toLowerCase()&&12!=i.timeInfo.hour||"am"==i.timeInfo.meridiem.toLowerCase()?0:-12),i.timeInfo.hour)),i.haystack=[Math.min(...i.timeInfoRange),Math.max(...i.timeInfoRange)],i.status=![String(i.valueDate)].includes("Invalid Date")&&Number(i.valueDate.getHours())>=i.haystack[0]&&Number(i.valueDate.getHours())<=i.haystack[1],l="hinrange"==r?i.status:!i.status;break;case"mineq":case"minne":case"mingt":case"minlt":case"mingte":case"minlte":switch([i.valueDate,i.filteredDate]=[M(s),D],i.minutes=i.valueDate.getMinutes(),r){case"mineq":case"minne":i.status=![String(i.valueDate)].includes("Invalid Date")&&String(i.minutes)==String(Number(i.filteredDate)),l="mineq"==r?i.status:!i.status;break;case"mingt":case"minlt":l=![String(i.valueDate)].includes("Invalid Date")&&("mingt"==r?i.minutes>Number(i.filteredDate):i.minutes<Number(i.filteredDate));break;default:l=![String(i.valueDate)].includes("Invalid Date")&&("mingte"==r?i.minutes>=Number(i.filteredDate):i.minutes<=Number(i.filteredDate))}break;case"minin":case"minnin":i.valueDate=M(s),i.minutes=i.valueDate.getMinutes(),i.status=![String(i.valueDate)].includes("Invalid Date")&&n.some(e=>String(Number(e))==String(i.minutes)),l="minin"==r?i.status:!i.status;break;case"mininrange":case"minninrange":i.valueDate=M(s),i.minutes=i.valueDate.getMinutes(),i.haystack=2<=n.length?[n[0],n[1]]:[n[0],n[n.length-1]],i.status=![String(i.valueDate)].includes("Invalid Date")&&i.minutes>=i.haystack[0]&&i.minutes<=i.haystack[1],l="mininrange"==r?i.status:!i.status;break;case"teq":case"tne":case"tgt":case"tlt":switch([i.valueDate,i.filteredDate]=[M(s),D],i.possibleMeridiem=i.filteredDate.replace(L(k.general.nonAlphabet),"").toLowerCase(),i.hasMeridiem=["am","pm"].includes(i.possibleMeridiem),i.timeParts=i.filteredDate.replace(L(k.general.nonTimeXter),"").split(":").map(e=>Number(e)),i.timeInfo=i.hasMeridiem?{hour:Number(i.timeParts[0]),meridiem:i.possibleMeridiem}:{hour:Number(i.timeParts[0])},i.hasMeridiem&&(i.timeInfo.hour+="pm"==i.timeInfo.meridiem&&12!=i.timeInfo.hour?12:"am"==i.timeInfo.meridiem&&12!=i.timeInfo.hour||"am"==i.timeInfo.meridiem?0:-12),i.timeParts[0]=i.timeInfo.hour,i.valueTimeParts=[i.valueDate.getHours(),i.valueDate.getMinutes(),i.valueDate.getSeconds()],i.valueDateTime=M(...this.#holder.defaultDate,...i.valueTimeParts),i.filteredDateTime=M(...this.#holder.defaultDate,...i.timeParts),r){case"teq":case"tne":i.status=![String(i.valueDate)].includes("Invalid Date")&&String(i.valueDateTime)==String(i.filteredDateTime),l="teq"==r?i.status:!i.status;break;case"tgt":case"tlt":l=![String(i.valueDate)].includes("Invalid Date")&&("tgt"==r?i.valueDateTime>i.filteredDateTime:i.valueDateTime<i.filteredDateTime);break;case"tgte":case"tlte":l=![String(i.valueDate)].includes("Invalid Date")&&("tgte"==r?i.valueDateTime>=i.filteredDateTime:i.valueDateTime<=i.filteredDateTime)}break;case"tin":case"tnin":i.valueDate=M(s),i.valueTimeParts=[i.valueDate.getHours(),i.valueDate.getMinutes(),i.valueDate.getSeconds()],i.valueDateTime=M(...this.#holder.defaultDate,...i.valueTimeParts),i.status=![String(i.valueDate)].includes("Invalid Date")&&n.some(e=>(i.possibleMeridiem=String(e).replace(L(k.general.nonAlphabet),"").toLowerCase(),i.hasMeridiem=["am","pm"].includes(i.possibleMeridiem),i.timeParts=String(e).replace(L(k.general.nonTimeXter),"").split(":").map(e=>Number(e)),i.timeInfo=i.hasMeridiem?{hour:Number(i.timeParts[0]),meridiem:i.possibleMeridiem}:{hour:Number(i.timeParts[0])},i.hasMeridiem&&(i.timeInfo.hour+="pm"==i.timeInfo.meridiem&&12!=i.timeInfo.hour?12:"am"==i.timeInfo.meridiem&&12!=i.timeInfo.hour||"am"==i.timeInfo.meridiem?0:-12),i.timeParts[0]=i.timeInfo.hour,i.filteredDateTime=M(...this.#holder.defaultDate,...i.timeParts),String(i.valueDateTime)==String(i.filteredDateTime))),l="tin"==r?i.status:!i.status;break;case"tinrange":case"tninrange":i.valueDate=M(s),i.valueTimeParts=[i.valueDate.getHours(),i.valueDate.getMinutes(),i.valueDate.getSeconds()],i.valueDateTime=M(...this.#holder.defaultDate,...i.valueTimeParts),i.haystack=2<=n.length?[n[0],n[1]]:[n[0],n[0]],i.haystackTimeParts=i.haystack.map(e=>(i.possibleMeridiem=String(e).replace(L(k.general.nonAlphabet),"").toLowerCase(),i.hasMeridiem=["am","pm"].includes(i.possibleMeridiem),i.timeParts=String(e).replace(L(k.general.nonTimeXter),"").split(":").map(e=>Number(e)),i.timeInfo=i.hasMeridiem?{hour:Number(i.timeParts[0]),meridiem:i.possibleMeridiem}:{hour:Number(i.timeParts[0])},i.hasMeridiem&&(i.timeInfo.hour+="pm"==i.timeInfo.meridiem&&12!=i.timeInfo.hour?12:"am"==i.timeInfo.meridiem&&12!=i.timeInfo.hour||"am"==i.timeInfo.meridiem?0:-12),i.timeParts[0]=i.timeInfo.hour,M(...this.#holder.defaultDate,...i.timeParts))),i.status=![String(i.valueDate)].includes("Invalid Date")&&(i.valueDateTime>i.haystackTimeParts[0]||String(i.valueDateTime)==String(i.haystackTimeParts[0]))&&(i.valueDateTime<i.haystackTimeParts[1]||String(i.valueDateTime)==String(i.haystackTimeParts[1])),l="tinrange"==r?i.status:!i.status;break;case"ago":[i.valueDate,i.filteredDate]=[M(s),D],i.timeSpan={sign:i.filteredDate.replace(L(k.general.nonSign),""),time:i.filteredDate.replace(L(k.general.nonDecimal),""),duration:i.filteredDate.replace(L(k.general.nonAlphabet),"").toLowerCase()},l=!!(x.includes(i.timeSpan.duration)&&0<Number(i.timeSpan.time))&&(i.timeSpan.ticks=T.get(i.timeSpan.duration),i.timeSpan.ms=Number(i.timeSpan.time)*i.timeSpan.ticks,i.timeSpan.lapse=M().getTime()-i.timeSpan.ms,i.range={min:i.timeSpan.lapse,max:i.timeSpan.lapse+i.timeSpan.ticks,maxWithSign:"+"==i.timeSpan.sign?M().getTime():null},i.status=i.timeSpan.sign?"+"==i.timeSpan.sign?i.valueDate.getTime()>=i.range.min&&i.valueDate.getTime()<=(i.range.maxWithSign||i.range.max):i.valueDate.getTime()<=i.range.min:i.valueDate.getTime()>=i.range.min&&i.valueDate.getTime()<=i.range.max,![String(i.valueDate)].includes("Invalid Date"))&&i.status;break;case"agoin":i.valueDate=M(s),i.haystack=2==n.length?[n[0],n[1]]:[n[0],n[0]],i.haystackTimeMs=i.haystack.map(e=>(i.timeSpan={time:e.replace(L(k.general.nonDecimal),""),duration:e.replace(L(k.general.nonAlphabet),"").toLowerCase()},x.includes(i.timeSpan.duration)&&0<Number(i.timeSpan.time)?(i.timeSpan.ticks=T.get(i.timeSpan.duration),i.timeSpan.ms=Number(i.timeSpan.time)*i.timeSpan.ticks,i.timeSpan.lapse=M().getTime()-i.timeSpan.ms,{min:i.timeSpan.lapse,max:i.timeSpan.lapse+i.timeSpan.ticks}):0)),i.range={min:Math.min(i.haystackTimeMs[0].min,i.haystackTimeMs[1].min),max:Math.max(i.haystackTimeMs[0].max,i.haystackTimeMs[1].max)},i.status=i.valueDate.getTime()>=i.range.min&&i.valueDate.getTime()<=i.range.max,l=![String(i.valueDate)].includes("Invalid Date")&&i.status;break;case"first":s=Array.isArray(s)?isNaN(D)?s[0]||[]:s.slice(0,Number(D)):s;break;case"last":s=Array.isArray(s)?isNaN(D)?s[s.length-1]||[]:s.slice(-Number(D.replace(L(k.general.nonDigit),""))):s;break;case"btw":i.haystack=2==n.length?[Number(n[0])-1,n[1]]:[0,n[0]],s=Array.isArray(s)?s.slice(i.haystack[0],i.haystack[1])||[]:s;break;case"dist":let t=new Set([]),a=new Set([]);s=Array.isArray(s)?Array.from(s,e=>"object"!=typeof e||r==D?t.add(e):e[D]&&a.has(e[D])?null:t.add(e)&&a.add(e[D])):s,s=Array.from(t.values())}m.add(l)}u.omit||(g[u.alias||u.property]=s)}}else if(d.hasOwnProperty(h))if(1===c[h])i||(g[h]=d[h]);else{let e=!1,t="and",a=String(),r=null;var S,y,N;this.#holder.objectOps.has(s[o+1])&&(y=s[o+1],S=h,r=this.#holder.objectOps.get(y),a="*instr-p:id_"+A(),t=r.mode,r.operation.length)&&(y=r.operation.findIndex(e=>e.match(/^as:\".*\"$/)),e=!(0<=y)||(N=String(r.operation[y]).split(":")[1],r.currentKeyAlias=N.replace(L(k.general.quotes,!0,!0),""),r.operation.splice(y,1),0<r.operation.length),this.#holder.propertyOps.set(a,{property:S,operation:r.operation,condition:r.condition})),i&&!e||(g[r?.currentKeyAlias||h]=(await this.#schemaWalkThrough({schema:c[h]??c[n],subject:d[h],mode:t})).result),e&&(N=await this.#schemaWalkThrough({schema:{[a]:1},subject:{[h]:g[r?.currentKeyAlias||h]}}),i?delete g[r?.currentKeyAlias||h]:g[r?.currentKeyAlias||h]=N.schemaPass?N.result[h]:N.result[h]instanceof Array?[]:Object.create(null),m.add(N.schemaPass))}a.add(1<m.size?"or"==u.condition:Array.from(m.values())[0]??l)}t=this.#holder.propertyOps.size<1||(1<a.size?"or"==(e??this.#holder.mode):Array.from(a.values())[0])}return{schemaPass:t,result:g}}};export{s as flags,e as SyntaxeEngine};