\"use client\";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

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

export default function MemberEditPage() {
  const router = useRouter();
  const params = useParams() as { id: string };
  const id = params?.id;
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    if (!id) return;
    try {
      const res = await fetch("/api/members");
      if (!res.ok) return;
      const all = await res.json();
      const found = all.find((m: Member) => m.id === id);
      setMember(found || null);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  const handleChange = (k: keyof Member, v: any) => {
    setMember((m) => (m ? { ...m, [k]: v } : m));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/members/${encodeURIComponent(member.id)}`, {
        method: "PUT",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: member.name,
          email: member.email,
          phone: member.phone,
          type: member.type,
          status: member.status,
        }),
      });
      if (res.ok) {
        alert("회원정보가 저장되었습니다.");
        router.push("/admin/members");
      } else {
        alert("저장에 실패했습니다.");
      }
    } catch (e) {
      console.error(e);
      alert("오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (!member) {
    return <div className="container mx-auto p-8">로딩 중 또는 회원을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto p-8 max-w-xl">
      <h2 className="text-xl font-bold mb-4">회원 정보 수정</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block text-sm font-medium">회원 ID</label>
          <div className="mt-1 text-sm text-gray-700">{member.id}</div>
        </div>
        <div>
          <label className="block text-sm font-medium">이름</label>
          <input value={member.name} onChange={(e) => handleChange("name", e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">이메일</label>
          <input value={member.email || ""} onChange={(e) => handleChange("email", e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">연락처</label>
          <input value={member.phone || ""} onChange={(e) => handleChange("phone", e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">구분</label>
          <select value={member.type} onChange={(e) => handleChange("type", e.target.value)} className="w-full px-3 py-2 border rounded">
            <option value="개인">개인</option>
            <option value="기업">기업</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">상태</label>
          <select value={member.status} onChange={(e) => handleChange("status", e.target.value)} className="w-full px-3 py-2 border rounded">
            <option value="정상">정상</option>
            <option value="승인대기">승인대기</option>
            <option value="정지">정지</option>
          </select>
        </div>
        <div className="flex gap-2 justify-end">
          <button type="button" onClick={() => router.push("/admin/members")} className="px-4 py-2 border rounded">취소</button>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? "저장중..." : "저장"}</button>
        </div>
      </form>
    </div>
  );
}

