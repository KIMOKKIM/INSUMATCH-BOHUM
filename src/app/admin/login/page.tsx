"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      alert("로그인 실패");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 className="text-xl font-bold mb-4">관리자 로그인</h1>
        <div className="mb-3">
          <label className="block text-sm">아이디</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-sm">비밀번호</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">로그인</button>
        </div>
      </form>
    </div>
  );
}

