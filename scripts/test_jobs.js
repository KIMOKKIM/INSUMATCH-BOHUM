const fs = require("fs");
const path = require("path");

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "jobs.json");

function readJobs() {
  if (!fs.existsSync(dataFile)) return [];
  return JSON.parse(fs.readFileSync(dataFile, "utf8"));
}

function writeJobs(jobs) {
  fs.writeFileSync(dataFile, JSON.stringify(jobs, null, 2), "utf8");
}

function addJob(job) {
  const jobs = readJobs();
  jobs.unshift(job);
  writeJobs(jobs);
}

function approveJob(id) {
  const jobs = readJobs();
  const idx = jobs.findIndex((j) => j.id === id);
  if (idx === -1) return false;
  jobs[idx].status = "진행중";
  writeJobs(jobs);
  return true;
}

function main() {
  const today = new Date().toISOString().slice(0, 10);
  const premium = {
    id: "t-prem-" + Date.now(),
    title: "테스트 프리미엄 공고 - 자동화",
    company: "테스트회사A",
    type: "FC",
    level: "PREMIUM",
    postedAt: today,
    status: "승인대기",
    location: "서울",
  };
  const special = {
    id: "t-spec-" + (Date.now()+1),
    title: "테스트 우대 공고 - 자동화",
    company: "테스트회사B",
    type: "TMR",
    level: "SPECIAL",
    postedAt: today,
    status: "승인대기",
    location: "부산",
  };
  const general = {
    id: "t-gen-" + (Date.now()+2),
    title: "테스트 일반 공고 - 자동화",
    company: "테스트회사C",
    type: "GENERAL",
    level: "GENERAL",
    postedAt: today,
    status: "승인대기",
    location: "대구",
  };

  console.log("Adding 3 test jobs to data/jobs.json...");
  addJob(general);
  addJob(special);
  addJob(premium);

  let jobs = readJobs();
  console.log("Total jobs after add:", jobs.length);
  console.log("Top 5 jobs (titles and status):");
  console.log(jobs.slice(0,5).map(j => ({ id: j.id, title: j.title, level: j.level, status: j.status })));

  console.log("\nSimulating admin approval for the 3 test jobs...");
  approveJob(premium.id);
  approveJob(special.id);
  approveJob(general.id);

  jobs = readJobs();
  console.log("Top 5 jobs after approval (titles and status):");
  console.log(jobs.slice(0,5).map(j => ({ id: j.id, title: j.title, level: j.level, status: j.status })));

  // Count how many '진행중'
  const active = jobs.filter(j => j.status === "진행중").length;
  console.log("\nActive (진행중) job count:", active);
}

main();

