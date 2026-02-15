import { Talent } from "@/types/talent";
import { User, MapPin, Briefcase, Clock } from "lucide-react";

interface TalentCardProps {
  talent: Talent;
}

export function TalentCard({ talent }: TalentCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all duration-300 hover:border-blue-500 cursor-pointer group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900">{talent.name}</h3>
              <span className="text-xs text-gray-500">({talent.gender}, {talent.age}세)</span>
            </div>
            <div className="text-sm text-blue-600 font-medium">
              {talent.desiredJob} 희망
            </div>
          </div>
        </div>
        <span className="text-xs text-gray-400">{talent.registeredAt}</span>
      </div>

      <h4 className="text-base font-bold text-gray-800 mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">
        {talent.title}
      </h4>

      <div className="space-y-1 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Briefcase className="w-4 h-4 text-gray-400" />
          <span>경력: <span className="font-medium text-gray-900">{talent.career}</span></span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>희망지역: {talent.desiredLocation}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 pt-3 border-t border-gray-100">
        {talent.tags?.map((tag, index) => (
          <span key={index} className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
