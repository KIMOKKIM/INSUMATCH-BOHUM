import Link from "next/link";
import { Search, Menu, User, Briefcase, Phone, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      {/* Hero Section */}
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full group-hover:bg-blue-500 transition-colors"></div>
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:bg-blue-300 transition-colors"></div>
              <div className="w-1.5 h-1.5 bg-blue-800 rounded-full group-hover:bg-blue-700 transition-colors"></div>
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:bg-blue-400 transition-colors"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-blue-600 tracking-tight">Insumatch</span>
              <span className="text-[10px] text-gray-400 tracking-widest uppercase">insumatch.kr</span>
            </div>
          </Link>
        </div>

        {/* Auth Links */}
        <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 font-medium">
          <Link href="/login" className="hover:text-blue-600 transition-colors">로그인</Link>
          <span className="text-gray-300">|</span>
          <Link href="/signup" className="hover:text-blue-600 transition-colors">회원가입</Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="border-t border-gray-100 bg-white shadow-sm relative z-50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center h-14 gap-1 sm:gap-8 overflow-x-auto no-scrollbar">
            <NavLink href="/fc" icon={<User className="w-4 h-4" />}>FC 모집</NavLink>
            <NavLink href="/tmr" icon={<Phone className="w-4 h-4" />}>TMR 모집</NavLink>
            <NavLink href="/general" icon={<Building2 className="w-4 h-4" />}>총무,일반직 모집</NavLink>
            <NavLink href="/talents" icon={<Briefcase className="w-4 h-4" />}>인재정보</NavLink>
            <Link 
              href="/guide" 
              className="ml-auto flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors shadow-sm"
            >
              이용안내
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-2 text-gray-700 font-bold hover:text-blue-600 px-3 py-2 text-sm sm:text-base whitespace-nowrap transition-colors border-b-2 border-transparent hover:border-blue-600"
    >
      {/* Icon is hidden on mobile to save space, shown on larger screens if needed, 
          but based on screenshot, it's text-heavy. Keeping it simple. */}
      {children}
    </Link>
  );
}
