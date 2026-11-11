// Report presence only; never print credentials or send requests.
import fs from 'node:fs';
let input='';try{input=fs.readFileSync('.dev.vars','utf8')}catch{}
let missing=false;
for(const key of ['PAYPAL_CLIENT_ID','PAYPAL_CLIENT_SECRET','GEMINI_API_KEY']){
 const line=input.split(/\r?\n/).find(s=>s.startsWith(key+'='));
 const value=(process.env[key]??line?.slice(key.length+1)??'').trim().replace(/^['"]|['"]$/g,'');
 console.log(key+': '+(value?'present (not verified)':'MISSING'));missing ||= !value;
}
console.log('PayPal is sandbox-only. Presence does not prove provider access.');
process.exitCode=missing?1:0;
