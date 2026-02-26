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

import fs from "fs";
import path from "path";

// Optional SQLite support: use only when explicitly enabled via env var.
// This avoids Vercel/build-time bundlers trying to resolve native modules.
let useSqlite = false;
let db: any = null;
const dbFile = path.join(process.cwd(), "data", "jobs.db");

// Enable SQLite only when USE_SQLITE=1 is set in the environment.
// On Vercel (or other platforms) this should be unset so we fall back to JSON storage.
if (process.env.USE_SQLITE === "1") {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // Use dynamic require via eval to avoid bundler resolving optional native dependency
    const BetterSqlite3 = eval("require")("better-sqlite3");
    db = new BetterSqlite3(dbFile);
    // initialize table
    db
      .prepare(
        `CREATE TABLE IF NOT EXISTS jobs (
          id TEXT PRIMARY KEY,
          title TEXT,
          company TEXT,
          type TEXT,
          level TEXT,
          postedAt TEXT,
          status TEXT,
          location TEXT,
          salary TEXT,
          description TEXT,
          contact TEXT
        )`
      )
      .run();
    useSqlite = true;
  } catch (e) {
    useSqlite = false;
  }
} else {
  useSqlite = false;
}

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "jobs.json");

// Ensure data directory and file exist. Initialize with initialJobs if missing.
if (!fs.existsSync(dataDir)) {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
  } catch (e) {
    // ignore
  }
}

if (!fs.existsSync(dataFile)) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(initialJobs, null, 2), "utf8");
  } catch (e) {
    // ignore
  }
}

function readFromFile(): Job[] {
  try {
    const raw = fs.readFileSync(dataFile, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {
    // fallback
  }
  return [...initialJobs];
}

function writeToFile(jobs: Job[]) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(jobs, null, 2), "utf8");
  } catch (e) {
    // ignore write errors in dev
  }
}

// Use global cache to avoid reading file on every call in dev, but keep file as source of truth.
const globalStore = (global as any).__insumatch_jobs_cache || null;
if (!globalStore) {
  (global as any).__insumatch_jobs_cache = readFromFile();
}

export function getJobs(): Job[] {
  if (useSqlite && db) {
    const rows = db.prepare("SELECT * FROM jobs ORDER BY postedAt DESC").all();
    return rows;
  }
  const arr = [...(global as any).__insumatch_jobs_cache];
  return arr.sort((a, b) => {
    if (!a.postedAt && !b.postedAt) return 0;
    if (!a.postedAt) return 1;
    if (!b.postedAt) return -1;
    return b.postedAt.localeCompare(a.postedAt);
  });
}

export function addJob(job: Job) {
  const postedAt = job.postedAt || new Date().toISOString().slice(0, 10);
  const jobWithDate = { ...job, postedAt };
  if (useSqlite && db) {
    const stmt = db.prepare(
      `INSERT OR REPLACE INTO jobs (id,title,company,type,level,postedAt,status,location,salary,description,contact)
       VALUES (@id,@title,@company,@type,@level,@postedAt,@status,@location,@salary,@description,@contact)`
    );
    stmt.run(jobWithDate);
    return;
  }
  (global as any).__insumatch_jobs_cache = [jobWithDate, ...(global as any).__insumatch_jobs_cache || []];
  writeToFile((global as any).__insumatch_jobs_cache);
}

export function updateJob(id: string, patch: Partial<Job>) {
  if (useSqlite && db) {
    const fields = Object.keys(patch);
    if (fields.length === 0) return;
    const set = fields.map((f) => `${f} = @${f}`).join(", ");
    const stmt = db.prepare(`UPDATE jobs SET ${set} WHERE id = @id`);
    stmt.run({ id, ...patch });
    return;
  }
  (global as any).__insumatch_jobs_cache = (global as any).__insumatch_jobs_cache.map((j: Job) =>
    j.id === id ? { ...j, ...patch } : j
  );
  writeToFile((global as any).__insumatch_jobs_cache);
}

export function deleteJob(id: string) {
  if (useSqlite && db) {
    db.prepare("DELETE FROM jobs WHERE id = ?").run(id);
    return;
  }
  (global as any).__insumatch_jobs_cache = (global as any).__insumatch_jobs_cache.filter((j: Job) => j.id !== id);
  writeToFile((global as any).__insumatch_jobs_cache);
}

export type { Job };

