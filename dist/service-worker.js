if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise(async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()})),r.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},r=(r,s)=>{Promise.all(r.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(r)};self.define=(r,i,n)=>{s[r]||(s[r]=Promise.resolve().then(()=>{let s={};const t={uri:location.origin+r.slice(1)};return Promise.all(i.map(r=>{switch(r){case"exports":return s;case"module":return t;default:return e(r)}})).then(e=>{const r=n(...e);return s.default||(s.default=r),s})}))}}define("./service-worker.js",["./workbox-1bbb3e0e"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"./index.html",revision:"10bb346110805956bd84a15f5ab1afa9"},{url:"8e430783728a2ea71725f422894e3385.jpg",revision:"4b201391e56325db1b532de1b0ffd30d"},{url:"d5a90463850e37437b1f89bc54e68258.png",revision:"e7c57e478dfcaed2ff5f9113149e5d8d"},{url:"main.css",revision:"6e16885cf3c8d96452efd1ca62355641"},{url:"main.js",revision:"6a2d2f382ab666908879a05fdd6243fc"},{url:"main.js.LICENSE.txt",revision:"692f961ab7aa37aba29e68a9f14e6048"}],{})}));
