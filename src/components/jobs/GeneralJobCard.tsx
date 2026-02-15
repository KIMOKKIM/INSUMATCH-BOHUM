import { JobListing } from "@/types/job";
import { MapPin, Building2, Briefcase } from "lucide-react";

interface GeneralJobCardProps {
  job: JobListing;
}

export function GeneralJobCard({ job }: GeneralJobCardProps) {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:border-blue-500">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {job.companyName}
            </h3>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {job.location}
            </span>
          </div>
        </div>
        <span className="text-xs text-gray-400">{job.postedAt}</span>
      </div>

      <h4 className="text-sm font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {job.title}
      </h4>

      <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
        <span className="flex items-center gap-1">
          <Briefcase className="w-3 h-3" />
          {job.jobType}
        </span>
        <span className="text-gray-300">|</span>
        <span>{job.salary || "급여 협의"}</span>
      </div>
    </div>
  );
}
