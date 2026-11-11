# Devpost submission copy — BeforeYouRenew

Status: draft. Add verified repository/video links and complete connected-service acceptance before final submission. Do not describe mocked tests as real provider transactions.

## Project name
BeforeYouRenew

## Elevator pitch
Renew with evidence. BeforeYouRenew uses AI to understand your needs, tests which software plans keep essential workflows running, and lets you approve an eligible plan through PayPal sandbox.

## Inspiration
A renewal decision is more than a price comparison. Moving to a cheaper plan can remove the scheduled report or audit history that a team depends on. We wanted to make that risk visible before the customer commits to another year.

## What it does
BeforeYouRenew is a merchant-side renewal decision workspace. In our fictional reporting product, Atlas Reports, a customer describes what must keep working. The Gemini integration interprets those needs against supplied catalog and workflow evidence. The customer confirms the required workflows, then executable checks run CSV export, scheduler job creation and audit export against three plans.

The app identifies the lowest-cost eligible plan. For the Northstar Studio fixture, Essential fails the required checks, Team passes at $288 per year, and the current Scale plan costs $600. The $312 difference is a comparison of authored demonstration prices, not a claim of real customer savings.

After explicit approval, the server creates a PayPal sandbox order. The renewal ledger can mark completion only after verifying the provider's order, capture, currency, amount and renewal reference. The AI cannot choose the authoritative price or mark a payment successful.

## How we built it
React and TypeScript provide the decision workspace. A Vinext/Cloudflare Worker API performs identity checks, request validation, rate limiting and owner-scoped database access. D1 stores immutable assessments and renewal events. Gemini is used for structured requirement interpretation; deterministic JavaScript executes the workflow checks. PayPal Orders v2 implements server-side create, buyer approval and capture. Stable request IDs and order reconciliation support safe retries after uncertain responses.

## Challenges we ran into
A cheap plan is not necessarily eligible. We separated model interpretation from executable eligibility checks and required human confirmation of important workflows.

Payment responses can be lost even when a capture succeeds. The server reconciles the existing order before retrying and keeps one renewal reservation per customer and demonstration term. Tests inject a lost capture response and check that recovery does not send another capture.

## Accomplishments
The prototype makes failure evidence visible before payment, shows the output of successful operations, and retains an auditable decision/payment history. Twenty unit tests and 38 integration assertions passed. Integration tests use the built Worker and D1 with controlled external-service mocks; they do not establish live provider verification. The downloadable package was separately installed, built and started successfully in Linux.

## What we learned
Payment safety depends on explicit state transitions and authoritative server checks. AI is useful for interpreting a customer's goal, while executable operations provide evidence for a purchase decision. A focused demo is strongest when users can see both a blocked path and a successful path.

## What's next
Instrument real merchant workflows, validate the experience with renewal teams, add verified webhook processing and periodic reconciliation, and build entitlement activation, refund and cancellation handling.

## Built with
TypeScript, JavaScript, React, Vinext, Cloudflare Workers, Cloudflare D1, Drizzle ORM, Gemini API, PayPal Orders v2, Node.js, Miniflare.

## Scope and judge access
Atlas Reports, its prices and its data are fixtures. A scheduler artifact does not send email. This is a one-time prepaid annual licence purchase, not a modification to another vendor's recurring subscription. Offline mode is explicitly labelled and makes no AI/payment calls.

The hosted preview is currently owner-private. Use the README local-run instructions until judge access is arranged. The public source must not contain secrets; use environment configuration and a dedicated test-access arrangement.

## Links to supply before submitting
- Public GitHub/GitLab/Bitbucket repository: pending account connection.
- Public YouTube video under three minutes: pending recording after connected verification.
- Hosted judge demo or complete local setup instructions: local instructions included in README.
