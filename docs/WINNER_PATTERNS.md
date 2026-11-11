# Verified precedents and submission decisions

Research date: 10 November 2026. Current competition winners have not been announced. Past awards do not disclose a guaranteed winning formula.

Official source: https://developer.paypal.com/community/blog/winners-dev-days-hackathon/

- CrawlerPal won first place at PayPal Dev Days 2025 with a paywall AI assistant using PayPal APIs.
- Codebusters placed second by modernizing Shopware 6 from JS SDK v5 to then-beta v6.
- Rosen placed third with a social trading app powered by PYUSD.

A first-person account describes CrawlerPal using a Postman Flow for vaulting and later payments: https://community.postman.com/t/postman-paypal-community-winning/79892
This does not establish its complete architecture or demonstrate that one SDK caused the award.

## Our engineering and demonstration approach (inference)

1. Solve a specific customer problem: cheaper annual plans can disable essential workflows.
2. Show AI interpreting needs, customer-confirmed requirements, executed checks, explicit approval, sandbox capture and verified ledger.
3. Make differentiation observable: Essential fails; Team produces working artifacts before payment.
4. Show retrying the same renewal does not duplicate capture or ledger completion.
5. Keep server-side Orders v2 for our one-time annual purchase. Vaulting, PYUSD and MCP are unnecessary for this scope.
6. Supply a reproducible build and disclose fictional merchant/data boundaries.

## Submission gates

Real Gemini and PayPal acceptance, public licensed repository, judge access or fully tested local instructions, public YouTube video under three minutes, complete Devpost form. Mocked tests alone do not satisfy connected-service verification.
