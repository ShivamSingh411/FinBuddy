import React, { useState, useMemo } from 'react';
import {
  Compass,
  Home,
  GraduationCap,
  Car,
  Sparkles,
  Briefcase,
  Plus,
  Trash2,
  Info,
} from 'lucide-react';
import { GlassCard, CardHeader } from '../components/common/GlassCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ExpenseBreakdownChart } from '../components/charts/ExpenseBreakdownChart';
import { LIFE_EVENT_TEMPLATES } from '../services/demoData';
import { useFinance } from '../context/FinanceContext';

export const LifeEventsPage = () => {
  const { formatCurrency } = useFinance();

  const [selectedEventId, setSelectedEventId] = useState('le_moving');
  const [contingencyBufferPct, setContingencyBufferPct] = useState(10); // 10%
  const [targetMonths, setTargetMonths] = useState(12); // 12 months deadline

  // Editable line items state mapped by event ID
  const [eventData, setEventData] = useState(() => {
    const map = {};
    LIFE_EVENT_TEMPLATES.forEach((tpl) => {
      map[tpl.id] = [...tpl.items];
    });
    return map;
  });

  const activeTemplate = LIFE_EVENT_TEMPLATES.find((tpl) => tpl.id === selectedEventId) || LIFE_EVENT_TEMPLATES[0];
  const currentItems = eventData[selectedEventId] || [];

  // Update item cost
  const handleCostChange = (index, newCost) => {
    const val = parseFloat(newCost) || 0;
    setEventData((prev) => {
      const updated = [...prev[selectedEventId]];
      updated[index] = { ...updated[index], cost: val };
      return { ...prev, [selectedEventId]: updated };
    });
  };

  // Add custom line item
  const handleAddItem = () => {
    const name = prompt('Enter item name (e.g. Moving Insurance, Rental Application Fee):');
    if (name && name.trim()) {
      setEventData((prev) => ({
        ...prev,
        [selectedEventId]: [...prev[selectedEventId], { name: name.trim(), cost: 200 }],
      }));
    }
  };

  // Remove line item
  const handleRemoveItem = (index) => {
    setEventData((prev) => ({
      ...prev,
      [selectedEventId]: prev[selectedEventId].filter((_, idx) => idx !== index),
    }));
  };

  // Financial calculations
  const calculation = useMemo(() => {
    const baseTotal = currentItems.reduce((acc, item) => acc + Number(item.cost || 0), 0);
    const bufferAmt = (baseTotal * contingencyBufferPct) / 100;
    const finalTarget = baseTotal + bufferAmt;
    const monthlySavingsNeeded = targetMonths > 0 ? finalTarget / targetMonths : finalTarget;

    return {
      baseTotal,
      bufferAmt,
      finalTarget,
      monthlySavingsNeeded,
    };
  }, [currentItems, contingencyBufferPct, targetMonths]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* Top Banner */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-500/15 px-3 py-0.5 rounded-full border border-teal-500/30">
            Life Transition Costing
          </span>
          <Badge variant="teal" size="sm">Predictor Engine</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
          Life Event Cost Predictor
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Select a major life transition, customize cost categories, add contingency buffers, and generate a monthly funding roadmap.
        </p>
      </div>

      {/* 5 Life Event Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {LIFE_EVENT_TEMPLATES.map((tpl) => {
          const isSelected = tpl.id === selectedEventId;
          return (
            <button
              key={tpl.id}
              onClick={() => setSelectedEventId(tpl.id)}
              className={`p-4 rounded-3xl text-left transition-all duration-200 border cursor-pointer ${
                isSelected
                  ? 'glass-panel-elevated ring-2 ring-teal-500 shadow-lg -translate-y-1'
                  : 'glass-panel-subtle hover:bg-white/70 hover:-translate-y-0.5'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-3 ${
                  isSelected
                    ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                    : 'bg-slate-200/60 text-slate-700'
                }`}
              >
                {tpl.icon === 'Home' && <Home className="w-5 h-5" />}
                {tpl.icon === 'GraduationCap' && <GraduationCap className="w-5 h-5" />}
                {tpl.icon === 'Car' && <Car className="w-5 h-5" />}
                {tpl.icon === 'Sparkles' && <Sparkles className="w-5 h-5" />}
                {tpl.icon === 'Briefcase' && <Briefcase className="w-5 h-5" />}
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                {tpl.title}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                ~${tpl.defaultTotal.toLocaleString()} est.
              </p>
            </button>
          );
        })}
      </div>

      {/* Highlighted Results Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <GlassCard className="bg-gradient-to-br from-teal-500/15 via-white/70 to-emerald-500/10">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Recommended Target Total
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-teal-800 font-heading mt-1.5">
            {formatCurrency(calculation.finalTarget)}
          </div>
          <p className="text-xs text-teal-700/80 mt-1">
            Includes {contingencyBufferPct}% buffer ({formatCurrency(calculation.bufferAmt)})
          </p>
        </GlassCard>

        <GlassCard>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Monthly Savings Pace
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mt-1.5">
            {formatCurrency(calculation.monthlySavingsNeeded)}/mo
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Over your chosen {targetMonths}-month timeline
          </p>
        </GlassCard>

        <GlassCard>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Base Itemized Cost
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-slate-800 font-heading mt-1.5">
            {formatCurrency(calculation.baseTotal)}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Across {currentItems.length} customizable components
          </p>
        </GlassCard>
      </div>

      {/* Cost Customizer & Breakdown Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Itemized Line Items List */}
        <GlassCard className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 mb-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                {activeTemplate.title} Expenses
              </h3>
              <p className="text-xs text-slate-500">{activeTemplate.description}</p>
            </div>
            <Button variant="outline" size="sm" icon={Plus} onClick={handleAddItem}>
              Add Line Item
            </Button>
          </div>

          <div className="space-y-3">
            {currentItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/70 border border-slate-100"
              >
                <span className="text-xs sm:text-sm font-semibold text-slate-800 truncate min-w-0">
                  {item.name}
                </span>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="relative w-32">
                    <span className="absolute left-2.5 top-2 text-xs font-bold text-slate-400">
                      $
                    </span>
                    <input
                      type="number"
                      step="50"
                      value={item.cost}
                      onChange={(e) => handleCostChange(idx, e.target.value)}
                      className="w-full pl-6 pr-2 py-1.5 text-xs font-bold font-mono rounded-xl glass-input text-right"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveItem(idx)}
                    className="p-1.5 text-slate-400 hover:text-rose-500"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline & Contingency Sliders */}
          <div className="mt-6 pt-5 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">Contingency Safety Buffer</label>
                <span className="text-xs font-bold font-mono text-teal-700">
                  {contingencyBufferPct}% (+{formatCurrency(calculation.bufferAmt)})
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="5"
                value={contingencyBufferPct}
                onChange={(e) => setContingencyBufferPct(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>0% (Tight)</span>
                <span>10% (Standard)</span>
                <span>25% (Generous)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">Target Savings Timeline</label>
                <span className="text-xs font-bold font-mono text-teal-700">
                  {targetMonths} Months
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="36"
                step="3"
                value={targetMonths}
                onChange={(e) => setTargetMonths(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>3 mo</span>
                <span>12 mo</span>
                <span>36 mo</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Breakdown Visualizer */}
        <GlassCard className="p-6 flex flex-col justify-between">
          <div>
            <CardHeader
              title="Distribution Profile"
              subtitle="Where your funds are allocated"
              icon={Compass}
            />
            <ExpenseBreakdownChart items={currentItems} height={240} />
          </div>

          <div className="mt-4 p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-[11px] text-teal-800 flex items-start gap-2">
            <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span>
              <strong>Estimate Notice:</strong> Calculated figures represent planning benchmarks based on standard regional costs. Actual expenses vary by geography and personal choice.
            </span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
