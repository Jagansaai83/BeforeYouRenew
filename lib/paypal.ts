import {PolicyError} from './renewal.mjs';
let token:{key:string;value:string;expires:number}|undefined;
let pending:Promise<string>|undefined;
export async function paypal(e:Record<string,any>,path:string,body?:unknown,key?:string){
 if(!e.PAYPAL_CLIENT_ID||!e.PAYPAL_CLIENT_SECRET)throw new PolicyError('PayPal sandbox is not configured.',503);
 const base='https://api-m.sandbox.paypal.com';
 async function auth(){if(token&&token.key===e.PAYPAL_CLIENT_ID&&token.expires>Date.now())return token.value;if(pending)return pending;pending=(async()=>{const r=await fetch(base+'/v1/oauth2/token',{method:'POST',headers:{Authorization:'Basic '+btoa(e.PAYPAL_CLIENT_ID+':'+e.PAYPAL_CLIENT_SECRET),'Content-Type':'application/x-www-form-urlencoded'},body:'grant_type=client_credentials',signal:AbortSignal.timeout(12000)});if(!r.ok)throw new PolicyError('PayPal authentication failed. Check sandbox credentials.',502);const d:any=await r.json();token={key:e.PAYPAL_CLIENT_ID,value:d.access_token,expires:Date.now()+Math.max(0,d.expires_in-60)*1000};return d.access_token as string;})();try{return await pending;}finally{pending=undefined;}}
 const access=await auth();const r=await fetch(base+path,{method:body===undefined?'GET':'POST',headers:{Authorization:'Bearer '+access,'Content-Type':'application/json',...(key?{'PayPal-Request-Id':key}:{})},body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(18000)});if(!r.ok){if(r.status===401)token=undefined;throw new PolicyError('PayPal could not confirm the operation. Retry this same renewal, not a replacement.',502);}return r.json() as Promise<any>;
}
