import React, { useState } from 'react';
import { MapPin, DollarSign, Shield } from 'lucide-react';

const LOCATIONS = [
  'Padang',
  'Bukittinggi',
  'Payakumbuh',
  'Pariaman',
  'Solok',
  'Pesisir Selatan',
  'Agam',
  'Tanah Datar',
  'Pasaman',
  'Lima Puluh Kota',
];

const SPECIES = ['Catfish', 'Tilapia', 'Gourami'];

const RISK = ['Aggressive', 'Moderate', 'Conservative'];

export default function PlannerForm({ onAnalyze }) {
  const [form, setForm] = useState({
    species: SPECIES[0],
    location: LOCATIONS[0],
    capital: 5000,
    risk: RISK[1],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'capital' ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.capital || form.capital < 1000) {
      alert('Please enter a starting capital of at least $1,000 to proceed.');
      return;
    }
    onAnalyze(form);
  };

  return (
    <section className="bg-white/80 backdrop-blur rounded-xl shadow-sm border border-emerald-100 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter your starting assumptions</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Fish species</span>
          <select
            name="species"
            value={form.species}
            onChange={handleChange}
            className="h-11 rounded-lg border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
          >
            {SPECIES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600 flex items-center gap-1"><MapPin className="h-4 w-4"/>Location (West Sumatra)</span>
          <select
            name="location"
            value={form.location}
            onChange={handleChange}
            className="h-11 rounded-lg border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
          >
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600 flex items-center gap-1"><DollarSign className="h-4 w-4"/>Initial capital (USD)</span>
          <input
            type="number"
            min={0}
            name="capital"
            value={form.capital}
            onChange={handleChange}
            className="h-11 rounded-lg border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 px-3"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600 flex items-center gap-1"><Shield className="h-4 w-4"/>Risk profile</span>
          <select
            name="risk"
            value={form.risk}
            onChange={handleChange}
            className="h-11 rounded-lg border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
          >
            {RISK.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </label>

        <div className="md:col-span-2 flex justify-end pt-2">
          <button type="submit" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg transition">
            Analyze Feasibility
          </button>
        </div>
      </form>
    </section>
  );
}
