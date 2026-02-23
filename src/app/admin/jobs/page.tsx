 "use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, MoreHorizontal, Plus, Filter } from "lucide-react";
import { getJobViewCount } from "@/lib/analytics";

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<any | null>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/jobs");
      const all = await res.json();
      setJobs(all.map((job: any) => ({ ...job, views: getJobViewCount(job.id.toString()) })));
    };
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("해당 공고를 삭제하시겠습니까? 이 동작은 되돌릴 수 없습니다.")) return;
    const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
    if (res.ok) {
      setJobs((s) => s.filter((j) => j.id !== id));
    } else {
      alert("삭제 실패");
    }
  };

  const handleEdit = (job: any) => {
    setEditing(job);
  };

  const handleClose = (id: string) => {
    if (!confirm("해당 공고를 마감 처리하시겠습니까?")) return;
    updateJob(id, { status: "마감" });
    setJobs(getJobs().map((job: any) => ({ ...job, views: getJobViewCount(job.id.toString()) })));
  };

  const handleSaveEdit = async (patch: any) => {
    const res = await fetch(`/api/jobs/${editing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (res.ok) {
      const refreshed = await (await fetch("/api/jobs")).json();
      setJobs(refreshed.map((job: any) => ({ ...job, views: getJobViewCount(job.id.toString()) })));
      setEditing(null);
    } else {
      alert("수정 실패");
    }
  };

  const filtered = jobs.filter((j) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (j.title + " " + j.company).toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">채용공고 관리</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            필터
          </button>
          <Link href="/admin/jobs/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            공고 등록
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="공고명, 회사명으로 검색..." 
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">공고명</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">회사명</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">직종</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">등급</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">등록일</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">조회수</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">상태</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{job.company}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">
                    {job.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    job.level === 'PREMIUM' ? 'bg-yellow-100 text-yellow-700' : 
                    job.level === 'SPECIAL' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {job.level}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{job.postedAt || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{(job.views || 0).toLocaleString()}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    job.status === '진행중' ? 'bg-green-100 text-green-700' : 
                    job.status === '마감' ? 'bg-gray-100 text-gray-500' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={() => handleEdit(job)} className="text-blue-600 text-sm hover:underline">수정</button>
                    {job.status !== "마감" && (
                      <button onClick={() => handleClose(job.id)} className="text-yellow-600 text-sm hover:underline">마감</button>
                    )}
                    <button onClick={() => handleDelete(job.id)} className="text-red-500 text-sm hover:underline">삭제</button>
                    <Link href={`/jobs/${job.id}`} className="text-sm text-gray-600 hover:underline">보기</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
          <div className="absolute inset-0 bg-black/40" onClick={() => setEditing(null)} />
          <div className="relative max-w-3xl w-full bg-white rounded-lg shadow-xl p-6 z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">공고 수정</h2>
              <button className="text-sm text-gray-500" onClick={() => setEditing(null)}>닫기</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); const form = new FormData(e.currentTarget as HTMLFormElement); const patch: any = { title: form.get("title") as string, company: form.get("company") as string, location: form.get("location") as string, status: form.get("status") as string }; handleSaveEdit(patch); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700">공고 제목</label>
                  <input name="title" defaultValue={editing.title} className="w-full px-3 py-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">회사명</label>
                  <input name="company" defaultValue={editing.company} className="w-full px-3 py-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">근무지</label>
                  <input name="location" defaultValue={editing.location} className="w-full px-3 py-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">상태</label>
                  <select name="status" defaultValue={editing.status} className="w-full px-3 py-2 border rounded">
                    <option value="진행중">진행중</option>
                    <option value="심사중">심사중</option>
                    <option value="마감">마감</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 bg-gray-100 rounded">취소</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">저장</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
