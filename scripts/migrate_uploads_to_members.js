const fs = require("fs");
const path = require("path");

const uploadsDir = path.join(process.cwd(), "public", "uploads");
const membersFile = path.join(process.cwd(), "data", "members.json");

function readMembers() {
  if (!fs.existsSync(membersFile)) return [];
  try {
    return JSON.parse(fs.readFileSync(membersFile, "utf8"));
  } catch (e) {
    return [];
  }
}

function writeMembers(arr) {
  fs.writeFileSync(membersFile, JSON.stringify(arr, null, 2), "utf8");
}

function main() {
  if (!fs.existsSync(uploadsDir)) {
    console.log("uploads directory not found:", uploadsDir);
    return;
  }
  const files = fs.readdirSync(uploadsDir).filter(f => !f.startsWith("."));
  const members = readMembers();
  let added = 0;
  for (const file of files) {
    const url = `/uploads/${file}`;
    const exists = members.some(m => m.raw && m.raw.logoUrl === url);
    if (exists) continue;
    const id = path.parse(file).name;
    const nameGuess = id.replace(/[-_]/g, " ");
    const newMember = {
      id: id,
      name: nameGuess || `기업회원_${Date.now()}`,
      type: "기업",
      email: "",
      phone: "",
      joinDate: new Date().toISOString().slice(0,10),
      status: "승인대기",
      raw: { logoUrl: url }
    };
    members.push(newMember);
    added++;
    console.log("Added member:", newMember.name, id);
  }
  if (added > 0) {
    writeMembers(members);
    console.log(`Migration complete. ${added} members added to ${membersFile}`);
  } else {
    console.log("No new uploads to migrate.");
  }
}

main();

