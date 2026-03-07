import { Search, Filter } from "lucide-react";
import dynamic from "next/dynamic";

const AdminMembersList = dynamic(() => import("@/components/admin/AdminMembersList"), { ssr: false });

export default function AdminMembersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">회원 관리</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            필터
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            회원 등록
          </button>
        </div>
      </div>

      {/* Search Bar (client-side list handles filtering) */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="이름, 이메일, 전화번호로 검색..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          disabled
        />
      </div>

      <AdminMembersList />
    </div>
  );
}
