"use client";

import { Star, ExternalLink, Megaphone } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AdItem } from "@/data/mock-ads";

interface SpecialAdCardProps {
  ads?: AdItem[];
}

export function SpecialAdCard({ ads = [] }: SpecialAdCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (ads.length <= 1) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ads.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [ads.length]);

  const currentAd = ads[currentIndex] || {
    companyName: "스페셜 광고",
    title: "광고 문의 환영",
    description: "스페셜 광고 영역입니다.",
    link: "/ads"
  };

  return (
    <Link href={currentAd.link} className="block h-full">
      <div className="group relative bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:border-blue-500 flex flex-col h-full">
        <div className="absolute top-2 right-2 text-blue-400">
          <Star className="w-4 h-4 fill-current" />
        </div>

        <div className={`transition-opacity duration-500 flex-grow flex flex-col ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
              <Megaphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {currentAd.companyName}
              </h3>
              <span className="text-xs text-blue-600 font-medium">
                주목도 높은 영역
              </span>
            </div>
          </div>

          <h4 className="text-base font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors whitespace-pre-line">
            {currentAd.title}
          </h4>

          <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-grow">
            {currentAd.description}
          </p>
        </div>

        <div className="mt-auto pt-3 border-t border-blue-100 flex justify-between items-center text-xs">
          <span className="text-blue-600 font-medium">광고 문의</span>
          <span className="text-gray-400 flex items-center gap-1">
            자세히 보기 <ExternalLink className="w-3 h-3" />
          </span>
        </div>

        {/* Pagination Dots */}
        {ads.length > 1 && (
          <div className="flex justify-center gap-1 mt-2">
            {ads.map((_, idx) => (
              <div 
                key={idx}
                className={`w-1 h-1 rounded-full transition-colors duration-300 ${idx === currentIndex ? 'bg-blue-500' : 'bg-blue-200'}`}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
