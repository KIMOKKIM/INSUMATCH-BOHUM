import { Talent } from "@/types/talent";
import { User, MapPin, Briefcase } from "lucide-react";

interface TalentCardProps {
  talent: Talent;
}

export function TalentCard({ talent }: TalentCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:border-blue-500 cursor-pointer group">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors flex-shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1">
              <h3 className="font-bold text-gray-900 text-sm truncate">{talent.name}</h3>
              <span className="text-[10px] text-gray-500 whitespace-nowrap">({talent.gender}, {talent.age})</span>
            </div>
            <div className="text-xs text-blue-600 font-medium truncate">
              {talent.desiredJob} 희망
            </div>
          </div>
        </div>
      </div>

      <h4 className="text-sm font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
        {talent.title}
      </h4>

      <div className="space-y-0.5 mb-3">
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Briefcase className="w-3 h-3 text-gray-400 flex-shrink-0" />
          <span className="truncate">경력: <span className="font-medium text-gray-900">{talent.career}</span></span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
          <span className="truncate">희망: {talent.desiredLocation}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-100">
        {talent.tags?.slice(0, 2).map((tag, index) => (
          <span key={index} className="text-[10px] bg-gray-50 text-gray-500 px-1.5 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
