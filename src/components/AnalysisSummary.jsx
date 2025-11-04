import React from 'react';
import { ThumbsUp } from 'lucide-react';

export default function AnalysisSummary({ summary, onApprove, onReset }) {
  if (!summary) return null;

  const scoreColor = summary.viabilityScore >= 75
    ? 'bg-emerald-600'
    : summary.viabilityScore >= 50
      ? 'bg-amber-500'
      : 'bg-rose-600';

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Feasibility snapshot</h3>
          <p className="text-sm text-gray-600 mt-1">AI-generated summary based on your inputs</p>
        </div>
        <button onClick={onReset} className="text-sm text-emerald-700 hover:text-emerald-800">Start over</button>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Viability score</span>
            <span className="font-medium text-gray-800">{summary.viabilityScore}%</span>
          </div>
          <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full ${scoreColor}`} style={{ width: `${summary.viabilityScore}%` }} />
          </div>
          <p className="text-xs text-gray-500 mt-2">{summary.notes}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-1">Regional potential</p>
          <p className="text-base font-medium text-gray-800">{summary.regionalPotential}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-1">Projected ROI timeline</p>
          <p className="text-base font-medium text-gray-800">{summary.roiMonths} months</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          onClick={onApprove}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg transition"
        >
          <ThumbsUp className="h-4 w-4" /> Approve & Generate Detailed Plan
        </button>
        <span className="text-xs text-gray-500">You can refine inputs later</span>
      </div>
    </section>
  );
}
