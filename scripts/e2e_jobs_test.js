const http = require("http");
const fs = require("fs");

function req(method, path, data, cb) {
  const options = {
    hostname: "localhost",
    port: 3001,
    path,
    method,
    headers: { "Content-Type": "application/json", Cookie: "insumatch_admin=1" },
  };
  const r = http.request(options, (res) => {
    let s = "";
    res.on("data", (c) => (s += c));
    res.on("end", () => cb(null, res.statusCode, s));
  });
  r.on("error", (e) => cb(e));
  if (data) r.write(JSON.stringify(data));
  r.end();
}

function todayStr(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

async function run() {
  // 1) Create job1 (deadline tomorrow)
  const id1 = "manual-" + Date.now();
  const job1 = {
    id: id1,
    title: "E2E Manual Close Test " + Date.now(),
    company: "E2ECo",
    type: "GENERAL",
    level: "GENERAL",
    location: "Seoul",
    salary: "",
    description: "test",
    contact: "01000000000",
    postedAt: todayStr(),
    status: "진행중",
    deadline: todayStr(1),
  };
  console.log("CREATE JOB1", job1.id, "deadline", job1.deadline);
  await new Promise((res) =>
    req("POST", "/api/jobs", job1, (e, s, b) => {
      if (e) console.error("POST ERR", e);
      console.log("POST /api/jobs", s, b);
      res();
    })
  );

  // 2) Verify it's in GET /api/jobs
  await new Promise((res) =>
    req("GET", "/api/jobs", null, (e, s, b) => {
      console.log("\nGET /api/jobs after create: status", s, "len", b.length);
      try {
        const arr = JSON.parse(b);
        console.log("contains id1?", arr.some((j) => j.id === id1));
      } catch (err) {
        console.error(err);
      }
      res();
    })
  );

  // 3) Close job1 manually via PUT
  await new Promise((res) =>
    req("PUT", `/api/jobs/${id1}`, { status: "마감" }, (e, s, b) => {
      console.log("\nPUT /api/jobs/" + id1 + " ->", s, b);
      res();
    })
  );

  // 4) Verify it's gone from GET /api/jobs
  await new Promise((res) =>
    req("GET", "/api/jobs", null, (e, s, b) => {
      console.log("\nGET /api/jobs after manual close: status", s, "len", b.length);
      try {
        const arr = JSON.parse(b);
        console.log("contains id1?", arr.some((j) => j.id === id1));
      } catch (err) {
        console.error(err);
      }
      res();
    })
  );

  // 5) Create job2 with deadline today (should auto-close)
  const id2 = "deadline-" + Date.now();
  const job2 = {
    id: id2,
    title: "E2E Deadline Test " + Date.now(),
    company: "E2ECo",
    type: "GENERAL",
    level: "GENERAL",
    location: "Seoul",
    salary: "",
    description: "deadline test",
    contact: "01000000000",
    postedAt: todayStr(),
    status: "진행중",
    deadline: todayStr(0),
  };
  console.log("\nCREATE JOB2 with deadline TODAY", id2);
  await new Promise((res) =>
    req("POST", "/api/jobs", job2, (e, s, b) => {
      if (e) console.error("POST ERR", e);
      console.log("POST /api/jobs job2", s, b);
      res();
    })
  );

  // 6) GET /api/jobs to trigger auto-close
  await new Promise((res) =>
    req("GET", "/api/jobs", null, (e, s, b) => {
      console.log("\nGET /api/jobs after creating job2 (auto-close should run):", s, "len", b.length);
      try {
        const arr = JSON.parse(b);
        console.log("contains id2?", arr.some((j) => j.id === id2));
        console.log("recent statuses:", arr.slice(0, 6).map((j) => ({ id: j.id, status: j.status, deadline: j.deadline })));
      } catch (err) {
        console.error(err);
      }
      res();
    })
  );

  // 7) Print tail of data/jobs.json to show persisted statuses
  try {
    const jobs = fs.readFileSync("data/jobs.json", "utf8");
    console.log("\n---- data/jobs.json last 400 chars ----");
    console.log(jobs.slice(-400));
  } catch (e) {
    console.error("read jobs err", e);
  }
}

run().catch((e) => console.error(e));

