import { useEffect, useState } from 'react';
import { MapPin, DollarSign, Shield, Fish, ArrowRight } from 'lucide-react';

const LOCATIONS = [
  'Padang',
  'Bukittinggi',
  'Pariaman',
  'Payakumbuh',
  'Painan',
  'Solok',
  'Sawahlunto',
  'Dharmasraya',
  'Agam',
  'TanahDatar',
];

const SPECIES = ['Tilapia', 'Catfish', 'Shrimp', 'Milkfish', 'Pangasius'];

export default function PlannerForm({ defaultValues, onSubmit }) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  useEffect(() => setValues(defaultValues), [defaultValues]);

  const validate = () => {
    const e = {};
    if (!values.species) e.species = 'Choose a species';
    if (!values.location) e.location = 'Select a location';
    if (!values.capital || Number(values.capital) < 1000) e.capital = 'Minimum capital is 1,000';
    if (!values.risk) e.risk = 'Select risk profile';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...values, capital: Number(values.capital) });
  };

  const fieldClass = 'w-full rounded-lg bg-white/5 px-3 py-2.5 text-slate-100 ring-1 ring-white/10 placeholder:text-slate-400 focus:ring-emerald-500/60 focus:outline-none';

  return (
    <section className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-6 shadow-xl shadow-black/20">
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight text-white">Enter your assumptions</h2>
          <p className="mt-1 text-sm text-slate-300">We’ll assess feasibility for your location and generate an optimized plan.</p>
        </div>

        <form onSubmit={submit} className="grid grid-cols-1 gap-5">
          {/* Species */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm text-slate-200">
              <Fish className="h-4 w-4 text-emerald-400" /> Species
            </label>
            <select
              className={fieldClass}
              value={values.species}
              onChange={(e) => setValues((v) => ({ ...v, species: e.target.value }))}
            >
              {SPECIES.map((s) => (
                <option className="bg-slate-900" key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.species && <p className="mt-1 text-xs text-rose-400">{errors.species}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm text-slate-200">
              <MapPin className="h-4 w-4 text-emerald-400" /> Location in West Sumatra
            </label>
            <select
              className={fieldClass}
              value={values.location}
              onChange={(e) => setValues((v) => ({ ...v, location: e.target.value }))}
            >
              {LOCATIONS.map((s) => (
                <option className="bg-slate-900" key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.location && <p className="mt-1 text-xs text-rose-400">{errors.location}</p>}
          </div>

          {/* Capital */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm text-slate-200">
              <DollarSign className="h-4 w-4 text-emerald-400" /> Initial Capital (IDR)
            </label>
            <input
              type="number"
              min={1000}
              step={500}
              className={fieldClass}
              placeholder="e.g. 20000"
              value={values.capital}
              onChange={(e) => setValues((v) => ({ ...v, capital: e.target.value }))}
            />
            {errors.capital && <p className="mt-1 text-xs text-rose-400">{errors.capital}</p>}
          </div>

          {/* Risk */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm text-slate-200">
              <Shield className="h-4 w-4 text-emerald-400" /> Risk profile
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['Conservative', 'Balanced', 'Aggressive'].map((r) => {
                const active = values.risk === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setValues((v) => ({ ...v, risk: r }))}
                    className={`rounded-lg px-3 py-2.5 text-sm ring-1 ${
                      active
                        ? 'bg-emerald-500/10 text-emerald-300 ring-emerald-400/40'
                        : 'bg-white/5 text-slate-200 ring-white/10 hover:bg-white/10'
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
            {errors.risk && <p className="mt-1 text-xs text-rose-400">{errors.risk}</p>}
          </div>

          <div className="mt-2 flex items-center justify-end gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 font-medium text-emerald-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400"
            >
              Analyze Feasibility <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
