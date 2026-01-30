import React from "react";
import {
  ListChecks,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";

export default function ProjectMetrics({ project }) {
  const total = project?.total_tasks || 48;
  const completed = project?.completed_tasks || 32;
  const pending = total - completed;
  const progress = project?.progress || 66;

  const assigned = project?.budget_assigned || 150000;
  const used = project?.budget_used || 98500;
  const remaining = assigned - used;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6">
      <h3 className="text-base font-semibold text-gray-800">
        Project Metrics
      </h3>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <MetricCard
          icon={<ListChecks />}
          label="Total Tasks"
          value={total}
        />
        <MetricCard
          icon={<CheckCircle />}
          label="Completed"
          value={completed}
        />
        <MetricCard
          icon={<Clock />}
          label="Pending"
          value={pending}
        />
        <MetricCard
          icon={<TrendingUp />}
          label="Progress"
          value={`${progress}%`}
        />
      </div>

      {/* BUDGET */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Budget Overview</span>
          <span className="font-medium">{progress}% used</span>
        </div>

        <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-black"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="space-y-1 text-sm">
          <BudgetRow label="Assigned" value={assigned} />
          <BudgetRow label="Used" value={used} used />
          <BudgetRow label="Remaining" value={remaining} remaining />
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable ---------- */

function MetricCard({ icon, label, value }) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 text-center space-y-2">
      <div className="mx-auto text-gray-600">{icon}</div>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

function BudgetRow({ label, value, used, remaining }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span
        className={`font-semibold ${
          used
            ? "text-orange-600"
            : remaining
            ? "text-green-600"
            : "text-gray-800"
        }`}
      >
        ${value.toLocaleString()}
      </span>
    </div>
  );
}
