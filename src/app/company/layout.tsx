import Link from "next/link";
import { Briefcase, LogOut, Settings, Users } from "lucide-react";

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white hidden md:flex flex-col border-r border-gray-100">
        <div className="p-6 border-b">
          <h1 className="text-lg font-bold">기업 대시보드</h1>
          <p className="text-sm text-gray-500 mt-1">회사 계정 전용 페이지</p>
        </div>
        <nav className="p-4 flex-1 space-y-2">
          <Link href="/company/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
            <Briefcase className="w-5 h-5" />
            대시보드
          </Link>
          <Link href="/company/jobs" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
            <Users className="w-5 h-5" />
            공고 관리
          </Link>
          <Link href="/company/jobs/new" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
            <span className="font-medium">+</span>
            공고 등록
          </Link>
          <Link href="/company/settings" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
            <Settings className="w-5 h-5" />
            설정
          </Link>
        </nav>
        <div className="p-4 border-t">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-gray-50 rounded-lg">
            <LogOut className="w-5 h-5" />
            로그아웃
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

