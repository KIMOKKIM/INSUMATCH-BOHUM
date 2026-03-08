// Simple Node script to login as admin, create a job, approve it, and verify main page
(async () => {
  try {
    const id = 'node-' + Date.now();
    const job = {
      id,
      title: 'NODE_TEST_' + id,
      company: 'NodeCo',
      type: 'GENERAL',
      level: 'GENERAL',
      location: 'Seoul',
      salary: '4000',
      description: 'Node fetch test',
      contact: '01000000000',
      postedAt: new Date().toISOString().slice(0,10),
      status: '승인대기',
    };

    // Login
    const loginRes = await fetch('http://localhost:3000/api/admin/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username: 'teomok1', password: 'teomok$123' }),
    });
    console.log('login status', loginRes.status);
    const setCookie = loginRes.headers.get('set-cookie') || '';
    console.log('set-cookie:', setCookie);
    const cookie = setCookie ? setCookie.split(';')[0] : '';

    // Create job
    const createRes = await fetch('http://localhost:3000/api/jobs', {
      method: 'POST',
      headers: { 'content-type': 'application/json', cookie },
      body: JSON.stringify(job),
    });
    console.log('create status', createRes.status, await createRes.text());

    // Verify created (before approve)
    const before = await (await fetch('http://localhost:3000/api/jobs')).json();
    console.log('found before approve', before.find(j => j.id === id));

    // Approve job
    const approveRes = await fetch(`http://localhost:3000/api/jobs/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json', cookie },
      body: JSON.stringify({ status: '진행중' }),
    });
    console.log('approve status', approveRes.status, await approveRes.text());

    // Verify after approve
    const after = await (await fetch('http://localhost:3000/api/jobs')).json();
    console.log('found after approve', after.find(j => j.id === id));

    // Check main page HTML contains title
    const html = await (await fetch('http://localhost:3000')).text();
    console.log('main contains title', html.includes(job.title));
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})(); 

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

