// Script to simulate admin creating 3 jobs (PREMIUM, SPECIAL, GENERAL)
// and then approving them via the API on localhost:3001
const fetch = globalThis.fetch || require('node-fetch');
const base = 'http://localhost:3001';

function nowDate() {
  return new Date().toISOString().slice(0,10);
}

async function createJob(level, title, company, type, location) {
  const id = `${level.toLowerCase()}-${Date.now()}-${Math.floor(Math.random()*1000)}`;
  const job = {
    id,
    title,
    company,
    type,
    level,
    postedAt: nowDate(),
    status: "승인대기",
    location
  };
  const res = await fetch(`${base}/api/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });
  if (!res.ok) throw new Error(`POST failed ${res.status}`);
  return job;
}

async function approveJob(id) {
  const res = await fetch(`${base}/api/jobs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "진행중" }),
  });
  if (!res.ok) throw new Error(`PUT failed ${res.status}`);
}

async function listJobs() {
  const res = await fetch(`${base}/api/jobs`);
  if (!res.ok) throw new Error(`GET failed ${res.status}`);
  return await res.json();
}

async function main() {
  console.log("Creating 3 test jobs...");
  const premium = await createJob("PREMIUM", "테스트 프리미엄 공고", "테스트A", "FC", "서울");
  const special = await createJob("SPECIAL", "테스트 우대 공고", "테스트B", "TMR", "부산");
  const general = await createJob("GENERAL", "테스트 일반 공고", "테스트C", "GENERAL", "대구");
  console.log("Created:", premium.id, special.id, general.id);

  console.log("Listing jobs (top 5):");
  let jobs = await listJobs();
  console.log(jobs.slice(0,5).map(j => ({ id: j.id, level: j.level, status: j.status, title: j.title })));

  console.log("Approving all 3 jobs...");
  await approveJob(premium.id);
  await approveJob(special.id);
  await approveJob(general.id);

  jobs = await listJobs();
  console.log("After approve, top 7 jobs (id, level, status):");
  console.log(jobs.slice(0,7).map(j => ({ id: j.id, level: j.level, status: j.status, title: j.title })));

  console.log("Check main page will show only status '진행중' jobs.");
}

main().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});

