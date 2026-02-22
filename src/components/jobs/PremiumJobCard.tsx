import { JobListing } from "@/types/job";
import { MapPin, Building2, Crown } from "lucide-react";
import Link from "next/link";

interface PremiumJobCardProps {
  job: JobListing;
}

export function PremiumJobCard({ job }: PremiumJobCardProps) {
  return (
    <Link href={`/jobs/${job.id}`} className="block h-full">
      <div className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-500 h-full flex flex-col md:flex-row">
        <div className="absolute top-0 left-0 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-br-lg z-10 flex items-center gap-1">
          <Crown className="w-3 h-3" />
          PREMIUM
        </div>
        
        {/* Image Section */}
        <div className="relative w-full md:w-1/3 h-48 md:h-auto overflow-hidden bg-gray-100">
          {job.imageUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img 
              src={job.imageUrl} 
              alt={job.companyName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Building2 className="w-12 h-12" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10" />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-blue-600 flex items-center gap-2">
                {job.companyName}
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100 font-medium">
                  {job.jobType}
                </span>
              </h3>
              <span className="text-xs text-gray-400">{job.postedAt}</span>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h2>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {job.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {job.tags?.map((tag, index) => (
                <span key={index} className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>
              {job.salary && (
                <div className="font-medium text-blue-600">
                  {job.salary}
                </div>
              )}
            </div>
            <span className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              지원하기
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
