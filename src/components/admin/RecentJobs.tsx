"use client";

import { useEffect, useState } from "react";
import { Briefcase } from "lucide-react";
import ApproveButton from "./ApproveButton";

export default function RecentJobs() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      if (mounted) setJobs(data);
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleApproved = (id: string) => {
    setJobs((s) => s.map((j) => (j.id === id ? { ...j, status: "진행중" } : j)));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">최근 등록 공고</h3>
      <div className="space-y-4">
        {jobs.slice(0, 8).map((job) => (
          <div key={job.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{job.title}</p>
                <p className="text-xs text-gray-500">{job.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                {job.status || "승인대기"}
              </span>
              {job.status === "승인대기" && <ApproveButton id={job.id} onApproved={handleApproved} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

