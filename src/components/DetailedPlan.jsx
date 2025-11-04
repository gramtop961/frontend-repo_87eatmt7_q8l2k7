import React from 'react';
import { ClipboardList, Factory, AlertTriangle, DollarSign, MapPin } from 'lucide-react';

export default function DetailedPlan({ plan }) {
  if (!plan) return null;

  const currency = (v) => v.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Your actionable business plan</h3>
        <div className="text-xs text-gray-500">Location: <span className="font-medium text-gray-700">{plan.location}</span></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border border-emerald-100 p-4">
            <div className="flex items-center gap-2 text-emerald-700 font-medium mb-3"><ClipboardList className="h-4 w-4"/> Phase-by-phase roadmap</div>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              {plan.phases.map((p, i) => (
                <li key={i}>
                  <span className="font-medium text-gray-800">{p.title}:</span> {p.detail}
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-lg border border-emerald-100 p-4">
            <div className="flex items-center gap-2 text-emerald-700 font-medium mb-3"><Factory className="h-4 w-4"/> Local suppliers</div>
            <ul className="space-y-2 text-sm text-gray-700">
              {plan.suppliers.map((s, i) => (
                <li key={i} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-gray-800">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.type} • {s.contact}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500"><MapPin className="h-3 w-3"/> {s.city}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-emerald-100 p-4">
            <div className="flex items-center gap-2 text-emerald-700 font-medium mb-3"><DollarSign className="h-4 w-4"/> Financial breakdown</div>
            <dl className="text-sm">
              <div className="flex items-center justify-between py-1"><dt className="text-gray-600">Startup costs</dt><dd className="font-medium text-gray-800">{currency(plan.financials.startup)}</dd></div>
              <div className="flex items-center justify-between py-1"><dt className="text-gray-600">Monthly OPEX</dt><dd className="font-medium text-gray-800">{currency(plan.financials.opex)}</dd></div>
              <div className="flex items-center justify-between py-1"><dt className="text-gray-600">Monthly revenue (est.)</dt><dd className="font-medium text-gray-800">{currency(plan.financials.revenue)}</dd></div>
              <div className="flex items-center justify-between py-1 border-t mt-2 pt-2"><dt className="text-gray-600">Projected ROI</dt><dd className="font-semibold text-emerald-700">{plan.roiMonths} months</dd></div>
            </dl>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-2 text-amber-800 font-medium mb-3"><AlertTriangle className="h-4 w-4"/> Risk mitigation</div>
            <ul className="list-disc list-inside space-y-1 text-sm text-amber-900">
              {plan.risks.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
