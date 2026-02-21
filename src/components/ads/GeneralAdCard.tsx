"use client";

import { Megaphone, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AdItem } from "@/data/mock-ads";

interface GeneralAdCardProps {
  ads?: AdItem[];
}

export function GeneralAdCard({ ads = [] }: GeneralAdCardProps) {
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
    companyName: "일반 광고",
    title: "광고 문의 환영",
    description: "일반 광고 영역입니다.",
    link: "/ads"
  };

  return (
    <Link href={currentAd.link} className="block h-full">
      <div className="group relative bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:border-gray-400 h-full flex flex-col justify-between">
        <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 flex-shrink-0">
                <Megaphone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {currentAd.companyName}
                </h3>
                <span className="text-xs text-gray-500">
                  배너 광고 영역
                </span>
              </div>
            </div>
            <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">AD</span>
          </div>

          <h4 className="text-sm font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors whitespace-pre-line">
            {currentAd.title}
          </h4>
          
          <p className="text-xs text-gray-500 line-clamp-1">
            {currentAd.description}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
          <span className="flex items-center gap-1">
            광고 문의 환영
          </span>
          <span className="text-blue-600 flex items-center gap-1">
            문의하기 <ExternalLink className="w-3 h-3" />
          </span>
        </div>

        {/* Pagination Dots */}
        {ads.length > 1 && (
          <div className="flex justify-center gap-1 mt-2">
            {ads.map((_, idx) => (
              <div 
                key={idx}
                className={`w-1 h-1 rounded-full transition-colors duration-300 ${idx === currentIndex ? 'bg-gray-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
