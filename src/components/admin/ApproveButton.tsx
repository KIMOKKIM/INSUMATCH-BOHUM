"use client";

import { useState } from "react";
import { updateJobAction } from "@/app/actions/jobs";

export default function ApproveButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const handleApprove = async () => {
    if (!confirm("이 공고를 승인하시겠습니까? 승인은 메인 페이지에 노출됩니다.")) return;
    setLoading(true);
    try {
      await updateJobAction(id, { status: "진행중" });
      // reload to reflect changes
      window.location.reload();
    } catch (e) {
      console.error(e);
      alert("승인 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };
  return (
    <button onClick={handleApprove} disabled={loading} className="px-3 py-1 bg-green-600 text-white rounded text-sm">
      {loading ? "처리중..." : "승인"}
    </button>
  );
}

