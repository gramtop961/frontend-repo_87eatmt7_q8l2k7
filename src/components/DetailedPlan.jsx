import { CalendarClock, Building2, DollarSign, ShieldCheck, Factory, Truck, RefreshCw } from 'lucide-react';

export default function DetailedPlan({ plan, onRestart }) {
  const currency = (n) => new Intl.NumberFormat('id-ID').format(n);

  return (
    <section className="mx-auto max-w-5xl">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-6 shadow-xl shadow-black/20">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white">Detailed execution plan</h2>
            <p className="mt-1 text-sm text-slate-300">Phased roadmap, local suppliers, and financial breakdown.</p>
          </div>
          <button onClick={onRestart} className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-sm text-slate-200 ring-1 ring-white/10 hover:bg-white/10">
            <RefreshCw className="h-4 w-4" /> Start again
          </button>
        </div>

        {/* Phases */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {plan.phases.map((p, i) => (
            <div key={i} className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="flex items-center gap-2 text-slate-200">
                <CalendarClock className="h-4 w-4 text-emerald-400" /> {p.title}
              </div>
              <ul className="mt-2 space-y-1 text-sm text-slate-300">
                {p.items.map((it, idx) => (
                  <li key={idx}>• {it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Suppliers */}
        <div className="mt-6 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
          <div className="flex items-center gap-2 text-slate-200">
            <Factory className="h-4 w-4 text-emerald-400" /> Local suppliers
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
            {plan.suppliers.map((s, i) => (
              <div key={i} className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">
                <div className="font-medium text-white">{s.name}</div>
                <div className="text-xs text-slate-300">{s.specialty}</div>
                <div className="mt-1 inline-flex items-center gap-1 text-xs text-slate-400">
                  <Truck className="h-3 w-3" /> {s.location}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Finance */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
            <div className="flex items-center gap-2 text-slate-200">
              <Building2 className="h-4 w-4 text-emerald-400" /> Capital allocation
            </div>
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              <li>Seeds & broodstock: IDR {currency(plan.finance.seed)}</li>
              <li>Infrastructure: IDR {currency(plan.finance.infrastructure)}</li>
              <li>Feed (3-4 months): IDR {currency(plan.finance.feed)}</li>
              <li>Reserve & contingency: IDR {currency(plan.finance.reserve)}</li>
            </ul>
          </div>

          <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
            <div className="flex items-center gap-2 text-slate-200">
              <DollarSign className="h-4 w-4 text-emerald-400" /> Monthly projection
            </div>
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              <li>Revenue: IDR {currency(plan.finance.monthlyRevenue)}</li>
              <li>Costs: IDR {currency(plan.finance.monthlyCost)}</li>
              <li className="font-medium text-white">Profit: IDR {currency(plan.finance.monthlyProfit)}</li>
              <li className="text-xs text-slate-400">Projected break-even in {plan.finance.roiMonths} months</li>
            </ul>
          </div>

          <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
            <div className="flex items-center gap-2 text-slate-200">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> Risk mitigation
            </div>
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              {plan.riskMitigation.map((r, i) => (
                <li key={i}>• {r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
