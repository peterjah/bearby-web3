(function(t,e){typeof exports==="object"&&typeof module!=="undefined"?e(exports):typeof define==="function"&&define.amd?define(["exports"],e):(t=typeof globalThis!=="undefined"?globalThis:t||self,e(t.web3={}))})(this,(function(t){"use strict";function e(t,e,s,n){if(s==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof e==="function"?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return s==="m"?n:s==="a"?n.call(t):n?n.value:e.get(t)}function s(t,e,s,n,a){if(n==="m")throw new TypeError("Private method is not writable");if(n==="a"&&!a)throw new TypeError("Private accessor was defined without a setter");if(typeof e==="function"?t!==e||!a:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return n==="a"?a.call(t,s):a?a.value=s:e.set(t,s),s}const n="website favicon is required";const a="Wallet is not connected";const i="Invalid sign params";const o="Request failed by timeout";const r="bearby-web3 available only browser";var c;class l{constructor(t){c.set(this,void 0);s(this,c,t,"f")}deploy(){}call(){}read(){}}c=new WeakMap;const h="BearBy";const d={CONTENT:`@/${h}/content-script`,INJECTED:`@/${h}/injected-script`};const u={GET_DATA:`@/${h}/get-wallet-data`,ACCOUNT_CHANGED:`@/${h}/accounts-just-changed`,CONTENT_PROXY_MEHTOD:`@/${h}/proxy-method`,CONTENT_PROXY_RESULT:`@/${h}/response-from-content`,CONNECT_APP:`@/${h}/connect-app`,RESPONSE_CONNECT_APP:`@/${h}/respoonse-connect-app`,NETWORK_CHANGED:`@/${h}/network-just-changed`,LOCKED:`@/${h}/guard-just-lock`,TX_TO_SEND:`@/${h}/add-tx-to-send`,TX_TO_SEND_RESULT:`@/${h}/response-tx-result`,SIGN_MESSAGE:`@/${h}/sign-message-call`,SING_MESSAGE_RESULT:`@/${h}/sign-message-response`};var f,p,E,y,T;const{document:w}=globalThis;class _{constructor(t){f.add(this);p.set(this,void 0);s(this,p,t,"f")}listen(t){w.addEventListener(e(this,p,"f"),(e=>{if(e&&e.detail){t(JSON.parse(e.detail))}}))}send(t,s){t.from=e(this,p,"f");if(Object.values(d).includes(s)){e(this,f,"m",E).call(this,JSON.stringify(t),s)}}}p=new WeakMap,f=new WeakSet,E=function t(s,n){w.dispatchEvent(e(this,f,"m",T).call(this,s,n))},y=function t(e){return{detail:e}},T=function t(s,n){return new CustomEvent(n,e(this,f,"m",y).call(this,s))};var m;class S{constructor(){m.set(this,[])}on(t){e(this,m,"f").push(t);return()=>this.removeListener(t)}removeListener(t){const s=e(this,m,"f").indexOf(t);if(s>-1)e(this,m,"f").splice(s,1)}removeAllListeners(){e(this,m,"f").splice(0,e(this,m,"f").length)}emit(...t){e(this,m,"f").forEach((e=>e.apply(this,t)))}once(t){const e=this.on(((...s)=>{e();t.apply(this,s)}))}}m=new WeakMap;var N;class b{constructor(t){N.set(this,void 0);s(this,N,t,"f")}get type(){return e(this,N,"f").type}get payload(){return e(this,N,"f").payload}send(t,s){const n=JSON.stringify(e(this,N,"f"));const a=JSON.parse(n);t.send(a,s)}}N=new WeakMap;class C{constructor(){this.stream=new _(d.INJECTED);this.subject=new S;this.stream.listen((t=>{this.subject.emit(t)}))}initialized(){const t=u.GET_DATA;const e=d.CONTENT;new b({type:t,payload:{}}).send(this.stream,e)}}function O(){const t=20;return[...Array(t)].map((()=>Math.floor(Math.random()*16).toString(16))).join("")}const g=5e3;var v,A;class R{constructor(t,e){v.set(this,void 0);A.set(this,void 0);s(this,v,t,"f");s(this,A,e,"f")}async send(t){const s=u.CONTENT_PROXY_MEHTOD;const n=d.CONTENT;const a=O();let i;new b({type:s,payload:{body:t,uuid:a}}).send(e(this,v,"f"),n);const r=new Promise(((t,s)=>{i=e(this,A,"f").on((e=>{if(e.type!==u.CONTENT_PROXY_RESULT)return;if(!e.payload||!e.payload.uuid)return;if(e.payload.uuid!==a)return;if(e.payload&&e.payload.reject){i();return s(new Error(e.payload.reject))}delete e.payload.uuid;i();return t(e.payload.resolve)}))}));const c=new Promise(((t,e)=>{setTimeout((()=>{if(i)i();e(new Error(o))}),g)}));return Promise.race([r,c])}}v=new WeakMap,A=new WeakMap;var k;(function(t){t["GET_STATUS"]="get_status";t["GET_ADDRESSES"]="get_addresses";t["GET_BLOCKS"]="get_block";t["GET_ENDORSEMENTS"]="get_endorsements";t["GET_OPERATIONS"]="get_operations";t["GET_CLIQUES"]="get_cliques";t["GET_STAKERS"]="get_stakers";t["GET_FILTERED_SC_OUTPUT_EVENT"]="get_filtered_sc_output_event";t["EXECUTE_READ_ONLY_BYTECODE"]="execute_read_only_bytecode";t["EXECUTE_READ_ONLY_CALL"]="execute_read_only_call"})(k||(k={}));function D(t){return Array.from(t,(t=>t.toString(16).padStart(2,"0"))).join("")}class G{constructor(t,e,s,n,a,i){this.type=t;this.amount=String(e);this.recipient=s;this.parameter=n;this.contract=a?D(a):a;this.functionName=i}get payload(){return JSON.parse(JSON.stringify({type:this.type,amount:this.amount,fee:this.fee,gasPrice:this.gasPrice,gasLimit:this.gasLimit,coins:this.coins,code:this.contract,func:this.functionName,params:JSON.stringify(this.parameter),parallelCoins:this.parallelCoins,sequentialCoins:this.sequentialCoins,toAddr:this.recipient}))}}var P;(function(t){t[t["Payment"]=0]="Payment";t[t["RollBuy"]=1]="RollBuy";t[t["RollSell"]=2]="RollSell";t[t["ExecuteSC"]=3]="ExecuteSC";t[t["CallSC"]=4]="CallSC"})(P||(P={}));var M,L;class W{constructor(t,e){M.set(this,void 0);L.set(this,void 0);s(this,M,t,"f");s(this,L,e,"f")}async getNodesStatus(){const t=k.GET_STATUS;return e(this,M,"f").send([{method:t,params:[]}])}async getAddresses(...t){const s=k.GET_ADDRESSES;return e(this,M,"f").send([{method:s,params:[t]}])}async getBlocks(...t){const s=k.GET_BLOCKS;return e(this,M,"f").send([{method:s,params:[t]}])}async getOperations(...t){const s=k.GET_OPERATIONS;return e(this,M,"f").send([{method:s,params:[t]}])}async getStakers(){const t=k.GET_STAKERS;return e(this,M,"f").send([{method:t,params:[]}])}async getEndorsements(...t){const s=k.GET_ENDORSEMENTS;return e(this,M,"f").send([{method:s,params:[t]}])}async getCliques(){const t=k.GET_CLIQUES;return e(this,M,"f").send([{method:t,params:[]}])}async getFilteredSCOutputEvent(t){const s=k.GET_FILTERED_SC_OUTPUT_EVENT;return e(this,M,"f").send([{method:s,params:[t]}])}async executeReadOlyBytecode(t){const s=k.EXECUTE_READ_ONLY_BYTECODE;return e(this,M,"f").send([{method:s,params:[t]}])}async executeReadOnlyCall(t){const s=k.EXECUTE_READ_ONLY_CALL;return e(this,M,"f").send([{method:s,params:[t]}])}async payment(t,s){const n=new G(P.Payment,t,s);return e(this,L,"f").signTransaction(n)}async buyRolls(t){const s=new G(P.RollBuy,t);return e(this,L,"f").signTransaction(s)}async sellRolls(t){const s=new G(P.RollSell,t);return e(this,L,"f").signTransaction(s)}}M=new WeakMap,L=new WeakMap;function j(t,e){if(!t){throw new Error(e)}}function U(){let t=globalThis.document.querySelector("link[rel*='icon']");if(!t){throw new Error(n)}return t.href}var $,x;class I{constructor(t,e){$.set(this,void 0);x.set(this,void 0);s(this,$,t,"f");s(this,x,e,"f")}get base58(){return e(this,x,"f")}subscribe(t){if(this.base58){t(this.base58)}const n=e(this,$,"f").on((n=>{switch(n.type){case u.ACCOUNT_CHANGED:s(this,x,n.payload.base58,"f");break;case u.GET_DATA:s(this,x,n.payload.base58,"f");break;default:return}t(e(this,x,"f"))}));return{unsubscribe:()=>n()}}}$=new WeakMap,x=new WeakMap;var B,X;class Y{constructor(t,e){B.set(this,void 0);X.set(this,void 0);s(this,B,t,"f");if(e){s(this,X,e,"f")}}get net(){return e(this,X,"f")}subscribe(t){t(this.net);const n=e(this,B,"f").on((e=>{switch(e.type){case u.GET_DATA:s(this,X,e.payload.net,"f");break;case u.NETWORK_CHANGED:s(this,X,e.payload.net,"f");break;default:return}t(this.net)}));return{unsubscribe:()=>n()}}}B=new WeakMap,X=new WeakMap;var J,K,H,q,z,F,Q,V;class Z{constructor(t,n){J.add(this);K.set(this,void 0);H.set(this,void 0);q.set(this,void 0);z.set(this,void 0);F.set(this,false);Q.set(this,false);s(this,q,t,"f");s(this,z,n,"f");s(this,K,new I(n),"f");s(this,H,new Y(n),"f");e(this,J,"m",V).call(this)}get account(){return e(this,K,"f")}get network(){return e(this,H,"f")}get connected(){return e(this,F,"f")}get enabled(){return e(this,Q,"f")}async connect(){const t=u.CONNECT_APP;const n=d.CONTENT;const a=O();const i=window.document.title;const o=U();const r={title:i,icon:o,uuid:a};new b({type:t,payload:r}).send(e(this,q,"f"),n);return new Promise(((t,n)=>{const i=e(this,z,"f").on((o=>{if(o.type!==u.RESPONSE_CONNECT_APP)return;if(o.payload.uuid!==a)return;if(o.payload.reject){i();return n(new Error(o.payload.reject))}s(this,F,Boolean(o.payload.resolve),"f");s(this,K,new I(e(this,z,"f"),o.payload.base58),"f");i();return t(this.connected)}))}))}async signMessage(t){j(this.connected,a);const s=u.SIGN_MESSAGE;const n=d.CONTENT;const i=O();const o=window.document.title;const r=U();const c={message:t,uuid:i,title:o,icon:r};new b({type:s,payload:c}).send(e(this,q,"f"),n);return new Promise(((t,s)=>{const n=e(this,z,"f").on((e=>{if(e.type!==u.SING_MESSAGE_RESULT)return;if(e.payload.uuid!==i)return;if(e.payload&&e.payload.reject){n();return s(new Error(e.payload.reject))}n();return t(e.payload.resolve)}))}))}async signTransaction(t){j(this.connected,a);j(t instanceof G,i);const s=u.TX_TO_SEND;const n=d.CONTENT;const o=O();const r={...t.payload,uuid:o,title:window.document.title,icon:U()};new b({type:s,payload:r}).send(e(this,q,"f"),n);return new Promise(((t,s)=>{const n=e(this,z,"f").on((e=>{if(e.type!==u.TX_TO_SEND_RESULT)return;if(e.payload.uuid!==o)return;if(e.payload&&e.payload.reject){n();return s(new Error(e.payload.reject))}n();return t(e.payload.resolve)}))}))}subscribe(t){const s=e(this,z,"f").on((e=>{t()}));return{unsubscribe:()=>s()}}}K=new WeakMap,H=new WeakMap,q=new WeakMap,z=new WeakMap,F=new WeakMap,Q=new WeakMap,J=new WeakSet,V=function t(){if(!globalThis.window)return;e(this,z,"f").on((t=>{switch(t.type){case u.LOCKED:s(this,Q,t.payload.enabled,"f");break;case u.ACCOUNT_CHANGED:s(this,K,new I(e(this,z,"f"),t.payload.base58),"f");break;case u.GET_DATA:s(this,K,new I(e(this,z,"f"),t.payload.base58),"f");s(this,Q,t.payload.enabled,"f");s(this,F,t.payload.connected,"f");s(this,H,new Y(e(this,z,"f"),t.payload.net),"f");break;case u.NETWORK_CHANGED:s(this,H,new Y(e(this,z,"f"),t.payload.net),"f");break}}))};var tt,et;class st{constructor(){tt.set(this,new C);et.set(this,new R(e(this,tt,"f").stream,e(this,tt,"f").subject));this.wallet=new Z(e(this,tt,"f").stream,e(this,tt,"f").subject);this.contract=new l(e(this,et,"f"));this.massa=new W(e(this,et,"f"),this.wallet);try{e(this,tt,"f").initialized();globalThis.window["bearby"]=Object.freeze(this)}catch(t){console.debug(r)}}}tt=new WeakMap,et=new WeakMap;const nt=new st;t.ContentProvider=R;t.Massa=W;t.Wallet=Z;t.Web3=st;t.web3=nt;Object.defineProperty(t,"__esModule",{value:true})}));
//# sourceMappingURL=index.js.map
