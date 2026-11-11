# BeforeYouRenew

**Rehearse a software downgrade before paying for the next year.** Built by Jagan Saai V for the PayPal AI Hackathon.

A fictional reporting merchant, Atlas Reports, offers three annual plans. AI interprets the customer's goal with evidence citations. The customer confirms required workflows. Real functions execute CSV export, scheduler job creation, and audit export under each candidate plan. The cheapest passing plan can proceed to PayPal sandbox checkout. Server verification records the renewal for the next term.

Northstar Studio demonstrates the core story: Essential ($144/year) fails its required workflows. Team ($288/year) passes and costs $312 less than Scale ($600/year). These are authored catalog prices, not measured customer savings.

## Run locally — Windows, macOS or Linux

Install Node.js 22.13+ and npm. From this folder:

```sh
npm ci
npm run demo
```

Open http://127.0.0.1:8787. The loopback-only runner automatically applies migrations and supplies a local test identity. It never binds to a public interface. Stop with Ctrl+C. Data stays in `.demo-data/` between runs. The hosted build instead requires trusted ChatGPT identity headers and never enables this local adapter.

`npm run dev` is the platform development server; without trusted identity it rejects protected APIs. Use `npm run demo` for a complete local demonstration. See SETUP_REFERENCE.md for platform-specific build details.

## Watch the Product Demo

[▶ Watch BeforeYouRenew – PayPal AI Hackathon 2026 Demo](https://youtu.be/jyNbsXvz37U?si=lLECOnMyM2cqYw3c)

A demonstration of AI-powered renewal analysis, workflow rehearsal, plan comparison, and PayPal sandbox payment verification.

The video uses a fictional merchant and sandbox transactions. No real payments are processed.


## Configure real external sandbox services

Copy `.env.example` to `.dev.vars` locally, then fill in:

- `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` from a PayPal sandbox REST application.
- `GEMINI_API_KEY` from an authorized Gemini account.
- Optional `GEMINI_MODEL` (default `gemini-3.8-flash`; verify availability for your account).

Run `node scripts/check-config.mjs` to check credential presence without displaying secrets or contacting providers.

For the hosted app, use server runtime secret settings. Never commit credentials or enter them into the browser application. A PayPal sandbox business application and a separate sandbox personal buyer are needed for approval. All PayPal calls are hard-coded to `api-m.sandbox.paypal.com`; live payments are not supported.

The public source does not contain API keys. Judges can run with their own sandbox credentials. Do not publish production account details as testing credentials.

## Modes and their limits

| Mode | Analysis | Workflows | Persistence | Payment |
|---|---|---|---|---|
| Offline walkthrough | Authored explanation | Runs in browser | None | Disabled; local simulation only |
| Signed-in sample | Authored explanation | Runs on server | D1 | Sandbox available if configured |
| Connected | Gemini structured analysis | Runs on server | D1 | PayPal sandbox create/approve/capture |

Missing AI credentials do not silently pretend to be AI. A configured provider failure returns an error rather than a fabricated answer. Simulations never create orders or update renewal state. Sample mode alone does not satisfy the hackathon's AI + PayPal requirement.

## End-to-end walkthrough

1. Select Northstar Studio and analyze its renewal goal.
2. Review the explanation and DOC citations; confirm all three workflows.
3. Run the rehearsal. Inspect the failed Essential traces and passing Team artifacts.
4. Select Team and review the exact $288 annual renewal.
5. Check the approval box and continue to PayPal sandbox.
6. Approve with the separate sandbox buyer account.
7. Return and click Verify & complete sandbox payment.
8. Activity records the provider order/capture IDs and the scheduled next-term license.

This is a **one-time annual license renewal** for a fictional merchant, not a PayPal recurring subscription revision. The term is a fixed demonstration fixture: 13 Nov 2026 through 13 Nov 2027. No existing external subscription is cancelled. Recorded renewal state represents a scheduled next-term entitlement; production entitlement activation is outside this demonstration.

If a capture response is lost, use Verify payment on the SAME renewal. The server reads PayPal's order before retrying capture. Do not create a replacement order for an unknown outcome. Unresolved create operations older than five hours require merchant reconciliation. One customer can have only one renewal record for the fixed term; this deliberately blocks duplicate checkout across assessments. Refund/cancellation and changing a started renewal are not implemented.

## Tests

```sh
npm test
npx tsc --noEmit
npm run build
npm run test:integration
```

Unit tests verify executable outcomes, input limits, AI contracts, budget arithmetic and exact capture matching. Integration tests use the actual built Worker and D1 with **mock external HTTP responses**. They cover authentication, cross-origin rejection, ownership, blocked plans, server pricing, human approval, simulation separation, duplicate checkout, unknown-outcome recovery and atomic ledger updates. They do not prove live Gemini or PayPal sandbox access.

## Architecture

React/Vinext UI → same-origin Worker API → trusted identity + origin/size/quota checks → Gemini requirement interpretation → human-confirmed workflow manifest → deterministic Atlas operations → immutable assessment → PayPal Orders v2 → exact capture verification → transactional renewal/event ledger.

D1 indexes bound owner-scoped history queries. OAuth tokens are cached per isolate; external calls have deadlines. The small fixture catalog needs no remote lookup. Model output is bounded and cannot set prices, identities, URLs or payment state. No model-generated code is executed.

See docs/SECURITY.md, docs/PAYPAL_ALIGNMENT.md, docs/TESTING.md, and SUBMISSION.md.

## Honest release boundaries

This is a tested hackathon prototype, not a production-certified payment system. Real vendor integrations, tax/shipping, refunds/disputes, automatic term activation, webhook processing, backup/retention controls, production load benchmarks and independent security review remain future work. A private hosted app blocks PayPal webhook deliveries; this version uses explicit authenticated status reconciliation instead of claiming webhook support.

The three workflow operations are real local code, but the merchant, data and entitlements are fixtures. A queued-job artifact does not send a real email. Citations are checked for allowed source IDs, not guaranteed semantically correct by an independent model. Customers must review the AI's interpretation.

## License

MIT (LICENSE). Third-party dependencies retain their licenses. Lucide icons use ISC. No third-party product photos or PayPal logos are bundled.

## Repeatable verification

`.github/workflows/verify.yml` runs unit tests, TypeScript checking, the build, and mocked-provider integration tests on GitHub. No payment or AI secrets are needed for CI. See `docs/WINNER_PATTERNS.md` for the researched submission approach.
