type Job = {
  id: string;
  title: string;
  company: string;
  type: string;
  level: string;
  postedAt?: string;
  status?: string;
  location?: string;
  salary?: string;
  description?: string;
  contact?: string;
};

const initialJobs: Job[] = [
  { id: "1", title: "삼성화재 강남지점 FC 모집", company: "삼성화재금융서비스", type: "FC", level: "PREMIUM", postedAt: "2024-02-15", status: "진행중" },
  { id: "2", title: "한화라이프랩 TMR 신입/경력 채용", company: "한화라이프랩", type: "TMR", level: "PREMIUM", postedAt: "2024-02-14", status: "진행중" },
  { id: "3", title: "DB손해보험 총무직 채용", company: "DB손해보험", type: "GENERAL", level: "SPECIAL", postedAt: "2024-02-13", status: "마감" },
  { id: "4", title: "메리츠화재 부산지점 설계사 모집", company: "메리츠화재", type: "FC", level: "GENERAL", postedAt: "2024-02-12", status: "진행중" },
  { id: "5", title: "현대해상 보상팀 경력직", company: "현대해상", type: "GENERAL", level: "GENERAL", postedAt: "2024-02-10", status: "심사중" },
];

const globalJobs = (global as any).__insumatch_jobs || null;
if (!globalJobs) {
  (global as any).__insumatch_jobs = [...initialJobs];
}

export function getJobs(): Job[] {
  const arr = [...(global as any).__insumatch_jobs];
  // sort by postedAt descending (newest first). If postedAt missing, keep current order.
  return arr.sort((a, b) => {
    if (!a.postedAt && !b.postedAt) return 0;
    if (!a.postedAt) return 1;
    if (!b.postedAt) return -1;
    return b.postedAt.localeCompare(a.postedAt);
  });
}

export function addJob(job: Job) {
  // If postedAt not provided, set to today (YYYY-MM-DD)
  const postedAt = job.postedAt || new Date().toISOString().slice(0, 10);
  const jobWithDate = { ...job, postedAt };
  // ensure newest job is at the top
  (global as any).__insumatch_jobs = [jobWithDate, ...(global as any).__insumatch_jobs || []];
}

export function updateJob(id: string, patch: Partial<Job>) {
  (global as any).__insumatch_jobs = (global as any).__insumatch_jobs.map((j: Job) =>
    j.id === id ? { ...j, ...patch } : j
  );
}

export function deleteJob(id: string) {
  (global as any).__insumatch_jobs = (global as any).__insumatch_jobs.filter((j: Job) => j.id !== id);
}

export type { Job };

