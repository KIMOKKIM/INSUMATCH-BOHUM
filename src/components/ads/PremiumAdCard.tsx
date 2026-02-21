"use client";

import { Crown, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AdItem } from "@/data/mock-ads";

interface PremiumAdCardProps {
  ads?: AdItem[];
}

export function PremiumAdCard({ ads = [] }: PremiumAdCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (ads.length <= 1) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ads.length);
        setIsVisible(true);
      }, 500); // Fade out duration
    }, 5000); // Display duration

    return () => clearInterval(interval);
  }, [ads.length]);

  const currentAd = ads[currentIndex] || {
    companyName: "(주)Insumatch",
    title: "광고 문의 환영",
    description: "프리미엄 광고 영역입니다.",
    link: "/ads",
    imageUrl: ""
  };

  return (
    <Link href={currentAd.link} className="block h-full">
      <div className="group relative bg-gradient-to-r from-slate-800 to-slate-900 border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-500 h-full flex flex-col md:flex-row">
        <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xs font-bold px-3 py-1 rounded-br-lg z-10 flex items-center gap-1">
          <Crown className="w-3 h-3" />
          ADVERTISEMENT
        </div>
        
        {/* Image Section */}
        <div className="relative w-full md:w-1/3 h-48 md:h-auto overflow-hidden bg-slate-700 flex items-center justify-center">
          <div className={`transition-opacity duration-500 w-full h-full ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {currentAd.imageUrl ? (
              <img 
                src={currentAd.imageUrl} 
                alt={currentAd.companyName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                <p className="text-white font-bold text-lg mb-1">기업 광고</p>
                <p className="text-slate-400 text-sm">Premium 배너 영역</p>
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10" />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col justify-between text-white">
          <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2">
                {currentAd.companyName}
                <span className="text-xs bg-white/10 text-white px-2 py-0.5 rounded border border-white/20 font-medium">
                  광고
                </span>
              </h3>
            </div>
            
            <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors whitespace-pre-line">
              {currentAd.title}
            </h2>
            
            <p className="text-slate-300 text-sm mb-4 line-clamp-2">
              {currentAd.description}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-400 pt-4 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                문의 010-3091-0703
              </div>
            </div>
            <span className="bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded hover:bg-gray-100 transition-colors flex items-center gap-1">
              광고 문의 <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
        
        {/* Pagination Dots (Only if multiple ads) */}
        {ads.length > 1 && (
          <div className="absolute bottom-4 right-4 md:right-auto md:left-1/3 md:ml-6 flex gap-1.5 z-20">
            {ads.map((_, idx) => (
              <div 
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${idx === currentIndex ? 'bg-blue-400' : 'bg-white/20'}`}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
