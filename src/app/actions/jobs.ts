"use server";

import { addJob as addJobServer, updateJob as updateJobServer, deleteJob as deleteJobServer } from "@/lib/jobsStore";

export async function addJobAction(job: any) {
  // run on server
  addJobServer(job);
}

export async function updateJobAction(id: string, patch: any) {
  updateJobServer(id, patch);
}

export async function deleteJobAction(id: string) {
  deleteJobServer(id);
}

