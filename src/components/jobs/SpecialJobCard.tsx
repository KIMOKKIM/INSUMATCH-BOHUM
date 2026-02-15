import { JobListing } from "@/types/job";
import { Star, MapPin, Building2 } from "lucide-react";

interface SpecialJobCardProps {
  job: JobListing;
}

export function SpecialJobCard({ job }: SpecialJobCardProps) {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:border-blue-500 flex flex-col h-full">
      <div className="absolute top-2 right-2 text-yellow-400">
        <Star className="w-4 h-4 fill-current" />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
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

      <h4 className="text-base font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {job.title}
      </h4>

      <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-grow">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {job.tags?.slice(0, 2).map((tag, index) => (
          <span key={index} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
        <span className="text-blue-600 font-medium">{job.salary || "급여 협의"}</span>
        <span className="text-gray-400">{job.postedAt}</span>
      </div>
    </div>
  );
}
