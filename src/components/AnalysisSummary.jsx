import { CheckCircle2, TrendingUp, Info, ArrowLeft, ArrowRight } from 'lucide-react';

export default function AnalysisSummary({ data, onApprove, onReset, onBack }) {
  const pct = Math.min(100, Math.max(0, data.score));

  return (
    <section className="mx-auto max-w-4xl">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-6 shadow-xl shadow-black/20">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white">Feasibility summary</h2>
            <p className="mt-1 text-sm text-slate-300">AI-style analysis of your inputs with a projected ROI timeline.</p>
          </div>
          <button onClick={onBack} className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-sm text-slate-200 ring-1 ring-white/10 hover:bg-white/10">
            <ArrowLeft className="h-4 w-4" /> Adjust inputs
          </button>
        </div>

        {/* Score bar */}
        <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">Viability score</span>
            <span className="font-medium text-white">{pct}/100</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-white/10">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-slate-400">Regional potential: {data.regionPotential}</div>
        </div>

        {/* Details */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
            <div className="flex items-center gap-2 text-slate-200">
              <TrendingUp className="h-4 w-4 text-emerald-400" /> Projected ROI
            </div>
            <p className="mt-2 text-2xl font-semibold text-white">{data.roiMonths} months</p>
            <p className="mt-1 text-xs text-slate-400">Expected to reach break-even with current assumptions.</p>
          </div>

          <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
            <div className="flex items-center gap-2 text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Strengths
            </div>
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              {data.notes.map((n, i) => (
                <li key={i}>• {n}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
            <div className="flex items-center gap-2 text-slate-200">
              <Info className="h-4 w-4 text-emerald-400" /> Next steps
            </div>
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              <li>Validate supplier availability</li>
              <li>Confirm target stocking density</li>
              <li>Align buyer contracts</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-slate-200 ring-1 ring-white/10 hover:bg-white/10"
          >
            Start over
          </button>

          <button
            onClick={onApprove}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 font-medium text-emerald-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400"
          >
            Approve & Generate Plan <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
