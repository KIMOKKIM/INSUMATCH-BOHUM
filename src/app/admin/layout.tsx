import Link from "next/link";
import { LayoutDashboard, Users, Briefcase, LogOut, Settings } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold">Insumatch Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            대시보드
          </Link>
          <Link href="/admin/members" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <Users className="w-5 h-5" />
            회원 관리
          </Link>
          <Link href="/admin/jobs" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <Briefcase className="w-5 h-5" />
            채용공고 관리
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
            설정
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            로그아웃
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 md:hidden">
          <div className="font-bold text-lg">Insumatch Admin</div>
          <button className="p-2">
            <span className="sr-only">Menu</span>
            {/* Mobile menu trigger would go here */}
            <div className="w-6 h-6 bg-gray-200"></div>
          </button>
        </header>
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
