import { Search, MoreHorizontal, Filter } from "lucide-react";

export default function AdminMembersPage() {
  const members = [
    { id: 1, name: "김철수", type: "개인", email: "kim@example.com", phone: "010-1234-5678", joinDate: "2024-02-15", status: "정상" },
    { id: 2, name: "(주)보험나라", type: "기업", email: "contact@bohum.com", phone: "02-123-4567", joinDate: "2024-02-14", status: "정상" },
    { id: 3, name: "이영희", type: "개인", email: "lee@example.com", phone: "010-9876-5432", joinDate: "2024-02-14", status: "정상" },
    { id: 4, name: "박민수", type: "개인", email: "park@example.com", phone: "010-5555-4444", joinDate: "2024-02-13", status: "정지" },
    { id: 5, name: "미래에셋생명", type: "기업", email: "hr@mirae.com", phone: "02-999-8888", joinDate: "2024-02-10", status: "승인대기" },
  ];

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

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="이름, 이메일, 전화번호로 검색..." 
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">회원명</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">구분</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">이메일</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">연락처</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">가입일</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">상태</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{member.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${member.type === '기업' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {member.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{member.email}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{member.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{member.joinDate}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    member.status === '정상' ? 'bg-green-100 text-green-700' : 
                    member.status === '정지' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
