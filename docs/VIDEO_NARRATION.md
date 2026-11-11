# Video narration and recording plan

Target: 2:40–2:55. Record the actual app, not a generated video. Record connected steps only after successful real Gemini and PayPal sandbox acceptance. Hide keys, account passwords and personal details.

## 0:00–0:20 — problem
A cheaper software renewal can become an expensive mistake when a team loses a workflow it relies on. BeforeYouRenew lets a customer rehearse a downgrade before paying. This demonstration uses Atlas Reports, a fictional reporting merchant.

## 0:20–0:45 — AI interpretation
Northstar Studio wants to reduce its annual cost while keeping eight seats, weekly reports and monthly audit exports. Gemini interprets the request using the catalog and workflow evidence. The customer reviews the sources and confirms which workflows are essential. AI proposes requirements; the customer decides.

## 0:45–1:15 — execution
Now we run the workflows against all three plans. Essential is cheaper, but it fails the seat requirement, scheduled delivery and audit history. Team passes. Here are the generated report and audit artifacts. The scheduler creates a job artifact; this demo does not send email.

## 1:15–1:35 — decision
Team is $288 for the year, compared with the current $600 Scale plan. That is a $312 difference in this sample catalog. A required failure blocks checkout. The server calculates the price independently, and the customer must approve the exact renewal.

## 1:35–2:15 — PayPal
We continue to PayPal sandbox and approve with a test buyer account. Returning to the app is not proof of payment. The server verifies the capture, exact amount, currency and renewal reference before recording completion.

[Only show and say this after an actual successful sandbox transaction. Cut loading time, not required approval steps.]

## 2:15–2:35 — reliability
The activity view ties the decision to the payment. Checking the same completed renewal again returns the existing capture. Our automated fault-injection tests also exercise lost capture responses and concurrent checkout requests.

## 2:35–2:50 — close
BeforeYouRenew combines AI interpretation, executable evidence and customer-approved payments. The next step is to instrument real merchant workflows so renewal teams can demonstrate what customers keep before they commit.
