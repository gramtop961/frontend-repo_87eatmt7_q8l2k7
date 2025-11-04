import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import PlannerForm from './components/PlannerForm';
import AnalysisSummary from './components/AnalysisSummary';
import DetailedPlan from './components/DetailedPlan';

function analyze({ species, location, capital, risk }) {
  // Simple heuristic to simulate AI-driven feasibility
  const base = {
    Catfish: 65,
    Tilapia: 70,
    Gourami: 60,
  }[species] || 60;

  const locationBoostMap = {
    Padang: 8,
    Bukittinggi: 5,
    Payakumbuh: 6,
    Pariaman: 7,
    Solok: 4,
    'Pesisir Selatan': 9,
    Agam: 5,
    'Tanah Datar': 6,
    Pasaman: 4,
    'Lima Puluh Kota': 6,
  };
  const locationBoost = locationBoostMap[location] ?? 5;

  const capitalBoost = Math.min(15, Math.max(0, Math.floor((capital - 3000) / 1000)));
  const riskAdj = risk === 'Aggressive' ? 8 : risk === 'Moderate' ? 3 : -4;
  const viabilityScore = Math.max(20, Math.min(95, Math.round(base + locationBoost + capitalBoost + riskAdj)));

  const regionalPotential =
    location === 'Pesisir Selatan'
      ? 'Strong export channels via coastal logistics'
      : location === 'Padang'
        ? 'High local demand and accessible distribution hubs'
        : 'Stable buyer network and input availability';

  const roiBase = species === 'Tilapia' ? 10 : species === 'Catfish' ? 9 : 12;
  const roiRisk = risk === 'Conservative' ? +2 : risk === 'Aggressive' ? -2 : 0;
  const roiCapital = capital > 8000 ? -2 : capital < 3000 ? +2 : 0;
  const roiMonths = Math.max(6, roiBase + roiRisk + roiCapital);

  const notes = viabilityScore >= 75
    ? 'High feasibility with robust operational outlook.'
    : viabilityScore >= 55
      ? 'Feasible with targeted optimizations.'
      : 'Proceed cautiously; consider boosting capital or adjusting risk.';

  return { viabilityScore, regionalPotential, roiMonths, notes };
}

function buildPlan(inputs, summary) {
  const { species, location, capital, risk } = inputs;

  const suppliers = [
    { name: `${species} Fingerlings Co.`, type: 'Hatchery', city: location, contact: '+62 821-XXXX-1111' },
    { name: 'Sumbar AquaFeed', type: 'Feed supplier', city: location, contact: '+62 822-XXXX-2222' },
    { name: 'Nusantara Water Tech', type: 'Equipment', city: 'Padang', contact: '+62 823-XXXX-3333' },
    { name: 'Vet Ikan Andalas', type: 'Veterinary & Lab', city: 'Bukittinggi', contact: '+62 824-XXXX-4444' },
  ];

  const startup = Math.min(capital, 4000 + (risk === 'Aggressive' ? 1000 : risk === 'Conservative' ? -500 : 0));
  const opex = 800 + (species === 'Gourami' ? 120 : 0);
  const revenue = 1600 + (summary.viabilityScore - 60) * 8;

  const phases = [
    { title: 'Site selection & permits', detail: 'Confirm land/pond availability, secure local permits, and assess water source quality (pH 6.5–8.5, ammonia <0.02 mg/L).' },
    { title: 'Infrastructure setup', detail: 'Construct/rehabilitate ponds (300–500 m² each), install aeration and simple filtration; prepare storage and biosecurity perimeter.' },
    { title: 'Sourcing & stocking', detail: `Procure ${species.toLowerCase()} fingerlings from certified hatcheries; stock at recommended density and acclimate to site conditions.` },
    { title: 'Operations & SOPs', detail: 'Establish feeding regimen, water testing cadence, and health monitoring; track FCR and daily mortality.' },
    { title: 'Go-to-market', detail: 'Secure purchase agreements with local buyers, restaurants, and markets; plan harvest schedule and cold-chain logistics.' },
  ];

  const risks = [
    'Price volatility: lock in forward contracts with regional buyers when possible.',
    'Biosecurity: quarantine new stock, sanitize equipment, control pond access.',
    'Water quality swings: implement weekly testing and backup aeration.',
    'Extreme weather: maintain drainage and emergency feed reserves (2 weeks).',
  ];

  return {
    location,
    roiMonths: summary.roiMonths,
    suppliers,
    phases,
    financials: { startup, opex, revenue },
    risks,
  };
}

export default function App() {
  const [inputs, setInputs] = useState(null);
  const [summary, setSummary] = useState(null);
  const [plan, setPlan] = useState(null);

  const handleAnalyze = (data) => {
    const s = analyze(data);
    setInputs(data);
    setSummary(s);
    setPlan(null);
  };

  const handleApprove = () => {
    if (!inputs || !summary) return;
    const p = buildPlan(inputs, summary);
    setPlan(p);
  };

  const handleReset = () => {
    setInputs(null);
    setSummary(null);
    setPlan(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div className="text-center mb-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Plan your fish farming venture</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Get a feasibility score, understand regional potential, and unlock a detailed, step-by-step plan tailored to West Sumatra.</p>
        </div>

        <PlannerForm onAnalyze={handleAnalyze} />

        <AnalysisSummary summary={summary} onApprove={handleApprove} onReset={handleReset} />

        {plan && <DetailedPlan plan={plan} />}

        {!summary && (
          <div className="text-center text-sm text-gray-500">Fill the form to generate your initial report.</div>
        )}
      </main>

      <footer className="py-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} AquacultureAI Sumbar. Guidance only — validate locally before investing.
      </footer>
    </div>
  );
}
