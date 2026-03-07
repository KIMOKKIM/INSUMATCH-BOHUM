\"use client\";

import { useEffect, useState } from "react";

type Member = {
  id: string;
  name: string;
  type: string;
  email?: string;
  phone?: string;
  joinDate?: string;
  status?: string;
  raw?: Record<string, any>;
};

export default function AdminMembersList() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchMembers() {
    try {
      const res = await fetch("/api/members");
      if (!res.ok) return;
      const data = await res.json();
      setMembers(data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleEdit = async (m: Member) => {
    const name = prompt("회사명 또는 회원명 수정:", m.name || "");
    if (name === null) return;
    const status = prompt("상태 입력 (예: 정상, 승인대기, 정지):", m.status || "");
    if (status === null) return;
    try {
      const res = await fetch(`/api/members/${m.id}`, {
        method: "PUT",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, status }),
      });
      if (res.ok) {
        setMembers((s) => s.map((it) => (it.id === m.id ? { ...it, name, status } : it)));
        alert("수정되었습니다.");
      } else {
        alert("수정에 실패했습니다.");
      }
    } catch (e) {
      console.error(e);
      alert("오류가 발생했습니다.");
    }
  };

  const handleDelete = async (m: Member) => {
    if (!confirm(`${m.name} 회원을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`)) return;
    try {
      const res = await fetch(`/api/members/${m.id}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      if (res.ok) {
        setMembers((s) => s.filter((it) => it.id !== m.id));
        alert("삭제되었습니다.");
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch (e) {
      console.error(e);
      alert("오류가 발생했습니다.");
    }
  };

  return (
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
              <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center gap-3">
                {member.raw?.logoUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={member.raw.logoUrl} alt={member.name} className="w-8 h-8 object-contain rounded" />
                )}
                <span>{member.name}</span>
              </td>
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
                <div className="flex items-center justify-end gap-3">
                  <button onClick={() => handleEdit(member)} className="text-blue-600 text-sm hover:underline">수정</button>
                  <button onClick={() => handleDelete(member)} className="text-red-500 text-sm hover:underline">삭제</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

