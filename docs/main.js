(()=>{var e,t,n,r,i={927:(e,t,n)=>{"use strict";n.a(e,(async(e,t)=>{try{var r=n(329);console.log("oxi");const s=32,a=Math.floor(Math.random()*2**32);function c(e){return Math.floor(e/1e3*s)}function f(e){const t=new TextEncoder;let n=[];switch(e.$){case"SetNick":n.push(0),n.push(...new Uint8Array(new BigUint64Array([BigInt(e.time)]).buffer).slice(0,6)),n.push(...new Uint8Array(new BigUint64Array([BigInt(e.pid)]).buffer).slice(0,6)),n.push(...t.encode(e.name));break;case"KeyEvent":n.push(1),n.push(...new Uint8Array(new BigUint64Array([BigInt(e.time)]).buffer).slice(0,6)),n.push(...new Uint8Array(new BigUint64Array([BigInt(e.pid)]).buffer).slice(0,6)),n.push(e.key.charCodeAt(0)),n.push(e.down?1:0)}return new Uint8Array(n)}function w(e){const t=new TextDecoder;switch(e[0]){case 0:{const n=new Uint8Array(8);n.set(e.slice(1,7),0);const r=Number(new BigUint64Array(n.buffer)[0]),i=new Uint8Array(8);return i.set(e.slice(7,13),0),{$:"SetNick",time:r,pid:Number(new BigUint64Array(i.buffer)[0]),name:t.decode(e.slice(13))}}case 1:{const t=new Uint8Array(8);t.set(e.slice(1,7),0);const n=Number(new BigUint64Array(t.buffer)[0]),r=new Uint8Array(8);return r.set(e.slice(7,13),0),{$:"KeyEvent",time:n,pid:Number(new BigUint64Array(r.buffer)[0]),key:String.fromCharCode(e[13]),down:1===e[14]}}default:throw new Error("Unknown action type")}}function h(e,t){switch((t=JSON.parse(JSON.stringify(t))).players[e.pid]||(t.players[e.pid]={id:e.pid,name:"Anon",pos:{x:256,y:128},key:{}}),e.$){case"SetNick":t.players[e.pid].name=e.name;break;case"KeyEvent":t.players[e.pid].key[e.key]=e.down}return t}function u(e){e=JSON.parse(JSON.stringify(e));var t=1/s;for(var n in e.players){var r=e.players[n];r.pos.x+=((r.key.D?1:0)+(r.key.A?-1:0))*t*64,r.pos.y+=((r.key.S?1:0)+(r.key.W?-1:0))*t*64}return e.tick+=1,e}function p(e){const t=document.getElementById("canvas"),n=t.getContext("2d");if(n){n.fillStyle="white",n.fillRect(0,0,t.width,t.height);for(const t of Object.values(e.players))n.beginPath(),n.arc(t.pos.x,t.pos.y,15,0,2*Math.PI),n.fillStyle="gray",n.fill(),n.fillStyle="black",n.font="12px Arial",n.textAlign="center",n.fillText(t.name,t.pos.x,t.pos.y-20)}}function y(e){var t=1/0;for(var n in e)t=Math.min(t,parseInt(n));return t}function l(e){for(var t={tick:0,players:{}},n=y(e),r=c(g.time()),i=n;i<r;++i){t=u(t);var o=e[i];if(o)for(var s of o)t=h(s,t)}return t}const d={};function m(e){const t=e.key.toUpperCase();if(["W","A","S","D"].includes(t)){const r="keydown"===e.type;if(d[t]!==r){d[t]=r;var n={$:"KeyEvent",time:g.time(),pid:a,key:t,down:r};g.send(i,f(n))}}}function b(e){try{var t=w(e),n=c(t.time),r=JSON.stringify(t);o.action_logs[n]||(o.action_logs[n]=[]);var i=o.action_logs[n];for(let e of i)if(JSON.stringify(e)==r)return;i.push(t)}catch(e){}}function _(){p(l(o.action_logs)),requestAnimationFrame(_)}window.addEventListener("keydown",m),window.addEventListener("keyup",m);var i=1014,o={state_logs:{},action_logs:{}};const g=new r.z;await g.init("ws://localhost:7171"),g.recv(i,b),_(),t()}catch(v){t(v)}}),1)},329:(e,t,n)=>{"use strict";n.d(t,{z:()=>o});var r=null;"undefined"!=typeof WebSocket?r=WebSocket:"undefined"!=typeof MozWebSocket?r=MozWebSocket:void 0!==n.g?r=n.g.WebSocket||n.g.MozWebSocket:"undefined"!=typeof window?r=window.WebSocket||window.MozWebSocket:"undefined"!=typeof self&&(r=self.WebSocket||self.MozWebSocket);const i=r;class o{constructor(){this.rooms=new Map,this.server_time_offset=0,this.best_ping=1/0,this.last_ping_time=0}init(e){return new Promise(((t,n)=>{this.ws=new i(e),this.ws.binaryType="arraybuffer",this.ws.onopen=()=>{this.sync_time(),t()},this.ws.onerror=e=>n(e),this.ws.onmessage=e=>{const t=e.data;this.handle_message(new Uint8Array(t instanceof ArrayBuffer?t:new ArrayBuffer(0)))}}))}send(e,t){const n=new Uint8Array(7+t.length);n[0]=2,this.write_uint48_be(n,1,e),n.set(t,7),this.ws.send(n)}recv(e,t){return this.rooms.has(e)||(this.rooms.set(e,new Set),this.join_room(e)),this.rooms.get(e).add(t),()=>{this.rooms.get(e).delete(t),0===this.rooms.get(e).size&&(this.rooms.delete(e),this.exit_room(e))}}time(){return Date.now()+this.server_time_offset}handle_message(e){var t;switch(e[0]){case 3:const n=this.read_uint48_be(e,1),r=(this.read_uint48_be(e,7),e.slice(13));null===(t=this.rooms.get(n))||void 0===t||t.forEach((e=>e(r)));break;case 6:this.handle_pong(e)}}join_room(e){const t=new Uint8Array(7);t[0]=0,this.write_uint48_be(t,1,e),this.ws.send(t)}exit_room(e){const t=new Uint8Array(7);t[0]=1,this.write_uint48_be(t,1,e),this.ws.send(t)}sync_time(){const e=new Uint8Array(1);e[0]=5;const t=Date.now();this.ws.send(e),this.last_ping_time=t}handle_pong(e){const t=Date.now(),n=this.read_uint48_be(e,1),r=t-this.last_ping_time;r<this.best_ping&&(this.best_ping=r,this.server_time_offset=n-t+Math.floor(r/2)),setTimeout((()=>this.sync_time()),3e3)}write_uint48_be(e,t,n){e[t]=n/Math.pow(2,40)&255,e[t+1]=n/Math.pow(2,32)&255,e[t+2]=n/Math.pow(2,24)&255,e[t+3]=n/Math.pow(2,16)&255,e[t+4]=n/Math.pow(2,8)&255,e[t+5]=255&n}read_uint48_be(e,t){return e[t]*Math.pow(2,40)+e[t+1]*Math.pow(2,32)+e[t+2]*Math.pow(2,24)+e[t+3]*Math.pow(2,16)+e[t+4]*Math.pow(2,8)+e[t+5]}}n(357),n(524),n(350),n(111),n(43)},357:e=>{"use strict";e.exports=function(){throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object")}},524:()=>{},111:()=>{},350:()=>{},43:()=>{}},o={};function s(e){var t=o[e];if(void 0!==t)return t.exports;var n=o[e]={exports:{}};return i[e](n,n.exports,s),n.exports}e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",n="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",r=e=>{e&&e.d<1&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},s.a=(i,o,s)=>{var a;s&&((a=[]).d=-1);var c,f,w,h=new Set,u=i.exports,p=new Promise(((e,t)=>{w=t,f=e}));p[t]=u,p[e]=e=>(a&&e(a),h.forEach(e),p.catch((e=>{}))),i.exports=p,o((i=>{var o;c=(i=>i.map((i=>{if(null!==i&&"object"==typeof i){if(i[e])return i;if(i.then){var o=[];o.d=0,i.then((e=>{s[t]=e,r(o)}),(e=>{s[n]=e,r(o)}));var s={};return s[e]=e=>e(o),s}}var a={};return a[e]=e=>{},a[t]=i,a})))(i);var s=()=>c.map((e=>{if(e[n])throw e[n];return e[t]})),f=new Promise((t=>{(o=()=>t(s)).r=0;var n=e=>e!==a&&!h.has(e)&&(h.add(e),e&&!e.d&&(o.r++,e.push(o)));c.map((t=>t[e](n)))}));return o.r?f:s()}),(e=>(e?w(p[n]=e):f(u),r(a)))),a&&a.d<0&&(a.d=0)},s.d=(e,t)=>{for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s(927)})();