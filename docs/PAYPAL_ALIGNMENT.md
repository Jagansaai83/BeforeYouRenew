# PayPal criteria and implementation mapping

Official criteria are equally weighted. There is no published preference for a particular AI framework, an agent count or a flashy stack. Sources checked 10 Nov 2026:

- https://paypalaihackathon.devpost.com/rules
- https://developer.paypal.com/api/rest/integration/orders-api
- https://developer.paypal.com/api/rest/reference/idempotency/
- https://developer.paypal.com/api/rest/integration/orders-api/api-use-cases/advanced/
- https://developer.paypal.com/api/rest/webhooks/rest/

| Criterion | This project's evidence | Remaining validation |
|---|---|---|
| Technical implementation | Executable plan rehearsal, structured AI, server Orders v2 create/capture, reconciliation, D1 atomic ledger | Real provider credentials and end-to-end recording |
| Design | Goal, evidence, required workflows, results, approval and history form one journey | Broader usability/accessibility testing |
| Potential impact | Prevent a renewal downgrade from breaking reporting workflows | Real customer interviews and actual vendor adapters |
| Innovation | Demonstrate failed and successful operations before payment | Differentiation is a hypothesis; no world-first claim |
| Presentation | Under-three-minute script showing a failure, recovery and payment | Public YouTube video |

## Integration decisions

Server-side Orders v2 is central: the app cannot mark the renewal completed until it verifies provider status, order ID, custom reference, capture status, exact amount and USD currency. The browser and AI cannot supply the authoritative price.

Stable PayPal-Request-Id values are scoped to create and capture. Same order/term records survive response loss. GET reconciliation precedes a capture retry. PayPal's Orders documentation describes a default six-hour idempotency window; unresolved create retries stop after five hours. Do not assume another endpoint's retention period applies here.

A successful return URL is not proof of payment. A cancelled checkout is not success. The demo explicitly requires server confirmation after buyer approval.

Webhook listeners require reachable HTTPS endpoints and verified messages. Owner-private hosting prevents provider delivery, so this release uses manual authenticated reconciliation. Production expansion needs verified/deduplicated webhook handling and periodic reconciliation, not an unverified placeholder endpoint.

A single prepaid annual license is purchased. No claim is made that Orders v2 modifies another merchant's recurring subscription or provides escrow.
