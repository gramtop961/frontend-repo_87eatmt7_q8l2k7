import { useEffect, useMemo, useState } from 'react';
import HeaderHero from './components/Header.jsx';
import PlannerForm from './components/PlannerForm.jsx';
import AnalysisSummary from './components/AnalysisSummary.jsx';
import DetailedPlan from './components/DetailedPlan.jsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Simple route manager without react-router using History API
const useSimpleRouter = (initialPath = '/') => {
  const [path, setPath] = useState(() => window.location.pathname || initialPath);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (to) => {
    if (to !== path) {
      window.history.pushState({}, '', to);
      setPath(to);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return { path, navigate };
};

export default function App() {
  const { path, navigate } = useSimpleRouter('/');

  // Global state shared across steps
  const [inputs, setInputs] = useState({
    species: 'Tilapia',
    location: 'Padang',
    capital: 20000,
    risk: 'Balanced',
  });
  const [analysis, setAnalysis] = useState(null);
  const [plan, setPlan] = useState(null);

  // Derived step index for progress UI
  const stepIndex = useMemo(() => {
    switch (path) {
      case '/':
        return 0;
      case '/inputs':
        return 1;
      case '/analyze':
        return 2;
      case '/plan':
        return 3;
      default:
        return 0;
    }
  }, [path]);

  // Heuristic "AI" analysis
  const analyze = (vals) => {
    const speciesBase = {
      Tilapia: 75,
      Catfish: 68,
      Shrimp: 82,
      Milkfish: 70,
      Pangasius: 73,
    };
    const locBoost = {
      Padang: 8,
      Bukittinggi: 5,
      Pariaman: 7,
      Payakumbuh: 6,
      Painan: 9,
      Solok: 7,
      Sawahlunto: 4,
      Dharmasraya: 5,
      Agam: 6,
      TanahDatar: 6,
    };
    const riskAdj = { Conservative: -6, Balanced: 0, Aggressive: 4 };

    const base = speciesBase[vals.species] ?? 65;
    const loc = locBoost[vals.location] ?? 5;
    const cap = Math.min(20, Math.floor((Number(vals.capital) || 0) / 5000) * 3);
    const risk = riskAdj[vals.risk] ?? 0;

    const score = Math.max(0, Math.min(100, base + loc + cap + risk));
    const roiMonths = Math.max(6, 18 - Math.floor(score / 8));

    return {
      score,
      roiMonths,
      regionPotential: score > 80 ? 'Excellent' : score > 65 ? 'Good' : 'Moderate',
      notes: [
        `Species fit: ${base}/100`,
        `Regional conditions boost: +${loc}`,
        `Capital readiness boost: +${cap}`,
        `Risk adjustment: ${risk >= 0 ? '+' : ''}${risk}`,
      ],
    };
  };

  // Heuristic planner
  const buildPlan = (vals, result) => {
    const phases = [
      {
        title: 'Month 0-1: Setup & Permits',
        items: [
          'Finalize pond/site selection and obtain local permits',
          'Secure broodstock or certified seeds',
          'Arrange water testing and baseline quality parameters',
        ],
      },
      {
        title: 'Month 2-3: Stocking & Conditioning',
        items: [
          'Acclimate fry to pond conditions and stock at optimal density',
          'Implement daily feeding & health monitoring routines',
          'Install aeration and backup power solutions',
        ],
      },
      {
        title: 'Month 4-6: Growth & Optimization',
        items: [
          'Fine-tune feed conversion ratio (FCR) using weekly sampling',
          'Adopt partial harvest strategy based on market demand',
          'Lock in buyer contracts for predictable cash flow',
        ],
      },
    ];

    const suppliers = [
      { name: 'Sumbar Aqua Supply', specialty: 'Seeds & Broodstock', location: 'Padang' },
      { name: 'Minang Feeds Co.', specialty: 'High-protein feed', location: 'Pariaman' },
      { name: 'Andalas Water Lab', specialty: 'Water testing & consultancy', location: 'Bukittinggi' },
    ];

    const capital = Number(vals.capital) || 0;
    const seed = Math.round(capital * 0.25);
    const infrastructure = Math.round(capital * 0.35);
    const feed = Math.round(capital * 0.30);
    const reserve = Math.round(capital - seed - infrastructure - feed);

    const monthlyRevenue = Math.round((result.score / 100) * (capital * 0.28));
    const monthlyCost = Math.round(capital * 0.08);

    return {
      phases,
      suppliers,
      finance: {
        seed,
        infrastructure,
        feed,
        reserve,
        monthlyRevenue,
        monthlyCost,
        monthlyProfit: monthlyRevenue - monthlyCost,
        roiMonths: result.roiMonths,
      },
      riskMitigation: [
        'Maintain biosecurity protocol and quarantine new stock',
        'Diversify feed sources to manage price volatility',
        'Keep emergency aeration and generator tested monthly',
        'Insure stock against disease/weather where feasible',
      ],
    };
  };

  const handleSubmitInputs = (vals) => {
    setInputs(vals);
    const res = analyze(vals);
    setAnalysis(res);
    setPlan(null);
    navigate('/analyze');
  };

  const handleApprove = () => {
    const p = buildPlan(inputs, analysis);
    setPlan(p);
    navigate('/plan');
  };

  const handleRestart = () => {
    setPlan(null);
    setAnalysis(null);
    navigate('/inputs');
  };

  useEffect(() => {
    // Initialize route to a friendly entry
    if (path === '/') navigate('/inputs');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <HeaderHero step={stepIndex} onBack={() => window.history.back()} />

      <main className="mx-auto max-w-6xl px-4 pb-24">
        {/* Step navigation buttons (mobile-friendly) */}
        <div className="sticky top-0 z-20 -mx-4 mb-6 bg-gradient-to-b from-slate-950/80 to-slate-900/30 backdrop-blur supports-[backdrop-filter]:bg-white/5">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-sm text-slate-200 ring-1 ring-white/10 hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <div className="text-xs text-slate-300">Step {stepIndex + 1} of 4</div>
          </div>
        </div>

        {path === '/inputs' && (
          <div className="animate-in slide-in-from-bottom-4 duration-300">
            <PlannerForm defaultValues={inputs} onSubmit={handleSubmitInputs} />
          </div>
        )}

        {path === '/analyze' && analysis && (
          <div className="animate-in fade-in duration-300">
            <AnalysisSummary data={analysis} onApprove={handleApprove} onReset={handleRestart} onBack={() => navigate('/inputs')} />
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleApprove}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 font-medium text-emerald-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400"
              >
                Continue to Plan <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {path === '/plan' && plan && (
          <div className="animate-in fade-in duration-300">
            <DetailedPlan plan={plan} onRestart={handleRestart} />
          </div>
        )}
      </main>

      <footer className="border-t border-white/5 bg-slate-950/60 py-8 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} AquacultureAI Sumbar — Guided planning for thriving farms
      </footer>
    </div>
  );
}
