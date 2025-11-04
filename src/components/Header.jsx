import { Fish, Rocket, CheckCircle } from 'lucide-react';

export default function HeaderHero({ step = 0, onBack }) {
  const steps = [
    { label: 'Inputs' },
    { label: 'Analyze' },
    { label: 'Plan' },
  ];
  const clamped = Math.min(3, Math.max(0, step));

  return (
    <header className="relative overflow-hidden">
      {/* Background gradient halos */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-16 translate-y-16 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-12 pb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
              <Fish className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">AquacultureAI Sumbar</h1>
              <p className="text-sm text-slate-300">Smart planning for fish farms in West Sumatra</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 ring-1 ring-white/10">
            <Rocket className="h-4 w-4 text-emerald-400" />
            <span className="text-sm text-slate-200">AI-guided Feasibility & Planning</span>
          </div>
        </div>

        {/* Stepper */}
        <div className="mt-8">
          <ol className="flex items-center gap-3">
            {['Inputs', 'Analyze', 'Plan'].map((label, idx) => {
              const active = idx <= Math.min(clamped, 3);
              return (
                <li key={label} className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm ${
                    active ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300' : 'border-white/15 bg-white/5 text-slate-300'
                  }`}>
                    {active ? <CheckCircle className="h-4 w-4" /> : idx + 1}
                  </div>
                  <span className={`text-sm ${active ? 'text-white' : 'text-slate-400'}`}>{label}</span>
                  {idx < 2 && <div className={`h-px w-10 ${active ? 'bg-emerald-400/60' : 'bg-white/10'}`} />}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </header>
  );
}
