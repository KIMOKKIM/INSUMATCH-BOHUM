type Member = {
  id: string;
  name: string;
  type: "개인" | "기업";
  email?: string;
  phone?: string;
  joinDate?: string;
  status?: string;
  raw?: Record<string, any>;
};

import fs from "fs";
import path from "path";

const initialMembers: Member[] = [
  { id: "1", name: "김철수", type: "개인", email: "kim@example.com", phone: "010-1234-5678", joinDate: "2024-02-15", status: "정상" },
  { id: "2", name: "(주)보험나라", type: "기업", email: "contact@bohum.com", phone: "02-123-4567", joinDate: "2024-02-14", status: "정상" },
];

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "members.json");

if (!fs.existsSync(dataDir)) {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
  } catch (e) {}
}

if (!fs.existsSync(dataFile)) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(initialMembers, null, 2), "utf8");
  } catch (e) {}
}

function readFromFile(): Member[] {
  try {
    const raw = fs.readFileSync(dataFile, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {}
  return [...initialMembers];
}

function writeToFile(members: Member[]) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(members, null, 2), "utf8");
  } catch (e) {}
}

const globalStore = (global as any).__insumatch_members_cache || null;
if (!globalStore) {
  (global as any).__insumatch_members_cache = readFromFile();
}

export function getMembers(): Member[] {
  const arr = [...(global as any).__insumatch_members_cache];
  return arr.sort((a, b) => {
    if (!a.joinDate && !b.joinDate) return 0;
    if (!a.joinDate) return 1;
    if (!b.joinDate) return -1;
    return b.joinDate.localeCompare(a.joinDate);
  });
}

export function addMember(m: Member) {
  const joinDate = m.joinDate || new Date().toISOString().slice(0, 10);
  const mem: Member = { ...m, joinDate };
  (global as any).__insumatch_members_cache = [mem, ...(global as any).__insumatch_members_cache || []];
  writeToFile((global as any).__insumatch_members_cache);
}

export type { Member };

