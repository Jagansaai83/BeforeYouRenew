export const catalog = [
{id:'stand',name:'Fold laptop stand',category:'Workspace',cents:3900,icon:'stand',description:'Aluminium · adjustable height'},
{id:'keyboard',name:'Quiet wireless keyboard',category:'Workspace',cents:5900,icon:'keyboard',description:'Compact layout · rechargeable'},
{id:'light',name:'Focus desk light',category:'Workspace',cents:4500,icon:'light',description:'Warm & cool light · dimmable'},
{id:'headphones',name:'Everyday headphones',category:'Audio',cents:7900,icon:'headphones',description:'Over-ear · noise isolation'},
{id:'mouse',name:'Ergonomic mouse',category:'Workspace',cents:2900,icon:'mouse',description:'Wireless · comfortable grip'},
{id:'speaker',name:'Pocket speaker',category:'Audio',cents:4900,icon:'speaker',description:'Portable · USB-C charging'}];
export function validatePlan(raw,budget){
 if(!raw || !Array.isArray(raw.items)||raw.items.length<1||raw.items.length>6) throw Error('Choose between 1 and 6 catalog items.');
 const seen=new Set();const items=raw.items.map(x=>{const p=catalog.find(p=>p.id===x.id);if(!p||seen.has(x.id)||!Number.isInteger(x.quantity)||x.quantity<1||x.quantity>5)throw Error('Invalid catalog selection.');seen.add(x.id);return {...p,quantity:x.quantity};});
 const total=items.reduce((s,p)=>s+p.cents*p.quantity,0);if(!Number.isSafeInteger(budget)||budget<100||budget>100000||total>budget)throw Error('The selection exceeds your budget.');
 if(typeof raw.reason!=='string'||raw.reason.length>1200)throw Error('Invalid explanation.');return {items,total,reason:raw.reason,budget};
}
export function demoPlan(prompt,budget){const ids=/audio|music|headphone/i.test(prompt)?['headphones','speaker']:['stand','keyboard','light','mouse'];let remaining=budget;const items=ids.flatMap(id=>{const p=catalog.find(x=>x.id===id);if(p.cents>remaining)return [];remaining-=p.cents;return [{id,quantity:1}];});return validatePlan({items,reason:'Sample planner selected complementary items from the fixed catalog, stopping at your budget. Connect Gemini for personalized AI recommendations.'},budget);}
export function completedCapture(order,total){const caps=order.purchase_units?.flatMap(u=>u.payments?.captures??[])??[];return order.status==='COMPLETED'&&caps.length===1&&caps[0].status==='COMPLETED'&&caps[0].amount?.currency_code==='USD'&&caps[0].amount.value===(total/100).toFixed(2);}
