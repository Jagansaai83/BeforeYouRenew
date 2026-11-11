# Verification plan

## Automated
1. `npm test` — deterministic workflow and capture-contract tests.
2. `npx tsc --noEmit` — application type checking.
3. `npm run build` — Worker/client bundling.
4. `npm run test:integration` — built Worker + D1 + controlled provider HTTP responses.

The provider mock deliberately records a successful capture and returns a 503 to simulate a lost response. The next verification reads the completed order without sending another capture. Assertions check the ledger is updated once. This is fault-injection evidence, not a claim about a real external service run.

## Real sandbox acceptance — requires credentials
- Gemini returns valid JSON with evidence citations; no sample label appears.
- Unsupported/invalid credentials produce honest errors, not fallback success.
- Essential is blocked with all Northstar workflows required.
- Team order is exactly USD 288.00 despite any browser amount manipulation.
- Separate sandbox buyer approves; return does not itself count as paid.
- Verify captures, checks amount/reference and records one next-term renewal.
- Refresh/reverify returns the same capture; Activity remains consistent.
- Cancel at PayPal; no renewal completion is recorded.
- Another user cannot read/reconcile the first user's records.
- Confirm provider transaction IDs in the PayPal sandbox dashboard.

Keep credentials out of recordings and repository files. Record date, configuration, order/capture IDs and actual results only after running these tests. Real sandbox verification has not been performed by the automated suite.
