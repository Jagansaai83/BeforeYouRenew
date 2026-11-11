
export const POLICY = 'atlas-2026-11-v1';
export const TERM = '2026-11-13/2027-11-13';

export const tiers = [
  {
    id: 'essential',
    name: 'Essential',
    annual: 14400,
    seats: 5,
    scheduled: false,
    rows: 100,
    days: 7,
    description: 'Manual reporting for small workspaces.'
  },
  {
    id: 'team',
    name: 'Team',
    annual: 28800,
    seats: 15,
    scheduled: true,
    rows: 10000,
    days: 90,
    description: 'Recurring reporting for growing teams.'
  },
  {
    id: 'scale',
    name: 'Scale',
    annual: 60000,
    seats: 50,
    scheduled: true,
    rows: 100000,
    days: 365,
    description: 'High-volume reporting and longer history.'
  }
];

export const scenarios = [
  {
    id: 'studio',
    name: 'Northstar Studio',
    detail: '8 seats · weekly delivery · 30-day history',
    seats: 8,
    rows: 250,
    days: 30,
    goal: 'Reduce renewal cost while keeping our eight seats, weekly client reports and monthly audit exports working.'
  },
  {
    id: 'solo',
    name: 'Independent consultant',
    detail: '1 seat · manual exports · 7-day history',
    seats: 1,
    rows: 40,
    days: 7,
    goal: 'Keep manual CSV reports and a short audit trail. Automatic weekly delivery is optional.'
  },
  {
    id: 'archive',
    name: 'Archive-heavy team',
    detail: '12 seats · weekly delivery · 180-day history',
    seats: 12,
    rows: 500,
    days: 180,
    goal: 'Keep weekly reports, twelve seats and a six-month audit trail.'
  }
];

export const workflows = {
  report: 'Client report export',
  schedule: 'Weekly delivery job',
  audit: 'Audit history export'
};

export const evidence = [
  {
    id: 'DOC-01',
    title: 'Annual plan catalog',
    text: 'Essential: $144/year, 5 seats, 100 rows/export, no scheduled jobs, 7-day history. Team: $288/year, 15 seats, 10,000 rows/export, scheduled jobs, 90-day history. Scale: $600/year, 50 seats, 100,000 rows/export, scheduled jobs, 365-day history.'
  },
  {
    id: 'DOC-02',
    title: 'Northstar workflow manifest',
    text: 'Northstar uses 8 seats, a 250-row weekly client report, automatic weekly delivery and 30-day audit exports.'
  },
  {
    id: 'DOC-03',
    title: 'Consultant workflow manifest',
    text: 'Consultant uses 1 seat, manual 40-row CSV exports and 7-day audit exports. Scheduled delivery is optional.'
  },
  {
    id: 'DOC-04',
    title: 'Archive workflow manifest',
    text: 'Archive team uses 12 seats, 500-row weekly reports, automatic delivery and 180-day audit exports.'
  }
];

export class PolicyError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

export function validateInput(b) {
  if (!b || typeof b !== 'object' || Array.isArray(b)) {
    throw new PolicyError('A JSON object is required.');
  }

  const scenario = scenarios.find(s => s.id === b.scenario);

  if (!scenario) {
    throw new PolicyError('Choose a supported workspace.');
  }

  if (
    typeof b.goal !== 'string' ||
    b.goal.trim().length < 8 ||
    b.goal.length > 1200
  ) {
    throw new PolicyError(
      'Describe your goal in 8–1,200 characters.'
    );
  }

  return {
    scenario,
    goal: b.goal.trim()
  };
}

// Executable operations for a fictional SaaS application.

export function atlas(plan) {
  return {
    report(rows, seats) {
      if (seats > plan.seats) {
        throw Error(
          `Seat limit ${plan.seats}; workspace needs ${seats}.`
        );
      }

      if (rows.length > plan.rows) {
        throw Error(
          `Export limit ${plan.rows} rows; report needs ${rows.length}.`
        );
      }

      return {
        count: rows.length,
        csv: 'client,total\n' +
          rows.map((v, i) => `Client ${i + 1},${v}`).join('\n')
      };
    },

    schedule() {
      if (!plan.scheduled) {
        throw Error(
          'Scheduled delivery is unavailable on this plan.'
        );
      }

      return {
        job: 'weekly-client-report',
        cron: '0 9 * * 1',
        queued: true
      };
    },

    audit(days) {
      if (days > plan.days) {
        throw Error(
          `History limit ${plan.days} days; workflow needs ${days}.`
        );
      }

      return {
        days,
        records: Array.from(
          { length: days },
          (_, i) => ({
            day: i + 1,
            event: 'report.created'
          })
        )
      };
    }
  };
}

export function rehearse(scenarioId, required) {
  const s = scenarios.find(x => x.id === scenarioId);

  if (!s) {
    throw new PolicyError('Unknown workspace.');
  }

  if (
    !Array.isArray(required) ||
    !required.length ||
    required.length > 3 ||
    new Set(required).size !== required.length ||
    required.some(id => !Object.hasOwn(workflows, id))
  ) {
    throw new PolicyError(
      'Select valid, distinct required workflows.'
    );
  }

  return tiers.map(p => {
    const app = atlas(p);

    const checks = Object.entries(workflows).map(([id, name]) => {
      try {
        const output =
          id === 'report'
            ? app.report(
                Array.from({ length: s.rows }, (_, i) => i + 100),
                s.seats
              )
            : id === 'schedule'
              ? app.schedule()
              : app.audit(s.days);

        return {
          id,
          name,
          required: required.includes(id),
          passed: true,
          detail:
            id === 'report'
              ? `Exported ${output.count} rows for ${s.seats} seats.`
              : id === 'schedule'
                ? 'Created weekly delivery job.'
                : `Exported ${output.days} audit records.`,
          artifact: output
        };
      } catch (e) {
        return {
          id,
          name,
          required: required.includes(id),
          passed: false,
          detail: e.message,
          artifact: null
        };
      }
    });

    return {
      plan: p.id,
      annual: p.annual,
      checks,
      eligible: checks.every(c => !c.required || c.passed),
      savings: 60000 - p.annual
    };
  });
}

export function assess(input, required) {
  const runs = rehearse(input.scenario.id, required);

  return {
    scenario: input.scenario.id,
    goal: input.goal,
    required,
    runs,
    recommended:
      runs
        .filter(r => r.eligible)
        .sort((a, b) => a.annual - b.annual)[0]?.plan ?? null,
    policy: POLICY,
    term: TERM
  };
}

export function validateAdvice(v) {
  if (
    !v ||
    typeof v.summary !== 'string' ||
    v.summary.length < 10 ||
    v.summary.length > 1500 ||
    !Array.isArray(v.citations) ||
    !v.citations.length ||
    v.citations.length > 4 ||
    v.citations.some(id => !evidence.some(e => e.id === id)) ||
    !Array.isArray(v.proposedWorkflows) ||
    !v.proposedWorkflows.length ||
    v.proposedWorkflows.length > 3 ||
    new Set(v.proposedWorkflows).size !==
      v.proposedWorkflows.length ||
    v.proposedWorkflows.some(id => !Object.hasOwn(workflows, id))
  ) {
    throw new PolicyError(
      'AI response did not match the evidence contract. Please retry.',
      502
    );
  }

  return {
    summary: v.summary,
    citations: v.citations,
    proposedWorkflows: v.proposedWorkflows
  };
}

// Secure PayPal capture verification with diagnostic logging.
// The original verification requirements remain enforced.

export function verifyCapture(d, r) {
  const units = d?.purchase_units ?? [];

  const caps = units.flatMap(
    u => u.payments?.captures ?? []
  );

  const unit = units[0];
  const cap = caps[0];

  const checks = {
    orderId: d?.id === r.paypal,
    orderCompleted: d?.status === 'COMPLETED',
    singlePurchaseUnit: units.length === 1,
    renewalId: unit?.custom_id === r.id,
    singleCapture: caps.length === 1,
    captureCompleted: cap?.status === 'COMPLETED',
    captureIdPresent:
      typeof cap?.id === 'string' && cap.id.length > 0,
    currencyCorrect:
      cap?.amount?.currency_code === 'USD',
    amountCorrect:
      cap?.amount?.value === (r.amount / 100).toFixed(2)
  };

  const failedChecks = Object.entries(checks)
    .filter(([, passed]) => !passed)
    .map(([name]) => name);

  if (failedChecks.length > 0) {
    console.error('PayPal verification checks:', checks);
    console.error('Failed verification fields:', failedChecks);

    throw new PolicyError(
      'Payment does not match this renewal. No license change was applied.',
      409
    );
  }

  return cap.id;
}
