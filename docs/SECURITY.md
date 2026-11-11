# Security and performance review

## Trust boundaries
- Hosted identity comes from Sites' trusted gateway. Every protected read/write is owner-scoped. Standalone public deployment MUST add real session verification and strip client-supplied identity headers.
- Local demo binds only to 127.0.0.1:8787, rejects unexpected Host headers, replaces identity headers and is not a public deployment mechanism.
- Browser writes require matching Origin, JSON content type, bounded UTF-8 body (8 KB), and a signed-in identity.
- Persistent rate limits: 30 writes/minute and 50 analyses/day per user. Add edge/global quotas before broad access; these limits are not a WAF.
- AI text is untrusted. Schema checks constrain citation IDs, lengths and workflow names. Prices and pass/fail outcomes are determined outside the model. Human selection of required workflows is explicit.
- Payment destinations are fixed provider hosts. Approval redirects require HTTPS and exactly www.sandbox.paypal.com, with no credentials or custom port.
- A unique owner+term index prevents parallel assessments creating separate renewals. Stable request IDs support provider retries. Unique capture IDs and transactional updates prevent duplicate recorded fulfillment.
- Exact order ID, custom_id, currency, amount and completed capture status are required. A timeout never means payment failed or succeeded by itself.
- Errors expose a generic request ID for unexpected failures; logs omit goals, credentials and payment payloads.
- Browser rendering uses React text escaping. CSP restricts external connections and object execution. Inline script/style allowances remain necessary for the current framework; a nonce-based policy is future hardening, not claimed complete XSS prevention.

## Performance controls
- Indexed owner-scoped history with fixed result limits; no unbounded history scan returned to the browser.
- Token cache and single-flight refresh per isolate; no credential exposure in frontend bundles.
- AI and payment HTTP deadlines; bounded AI output and goals; deterministic fixture operations.
- Cleanup deletes at most 100 expired quota rows per write.

No production throughput or latency claims have been invented. Real provider calls, load tests, backup/restore drills, dependency vulnerability auditing, CSRF/session review for independent hosting and external security assessment remain release gates.

## Operational limits
Fixed fixture term, no refunds, no external subscription cancellation, no automatic entitlement activation, no public webhook endpoint, no deletion UI/retention job. Merchant reconciliation is required for unresolved order creation after the retry window. A client must not create a new identity to evade one-renewal-per-term protection.
