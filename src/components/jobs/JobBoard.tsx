"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Building2 } from "lucide-react";
import { JobListing } from "@/types/job";

interface JobBoardProps {
  jobs: JobListing[];
}

export function JobBoard({ jobs }: JobBoardProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // 검색 필터링 로직 (회사명 또는 공고 제목)
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header & Search */}
      <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">전체 채용공고</h3>
          <p className="text-sm text-gray-500 mt-1">
            총 <span className="text-blue-600 font-bold">{filteredJobs.length}</span>건의 공고가 있습니다.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            placeholder="공고명 또는 회사명 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                지역
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                공고정보
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                직종
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                등록일
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                마감일
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/jobs/${job.id}`} className="block group">
                      <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600 mb-1">
                        {job.title}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Building2 className="w-3 h-3" />
                        {job.companyName}
                        {job.salary && (
                          <>
                            <span className="text-gray-300">|</span>
                            <span className="text-xs text-gray-500">{job.salary}</span>
                          </>
                        )}
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${job.jobType === 'FC' ? 'bg-blue-100 text-blue-800' : 
                        job.jobType === 'TMR' ? 'bg-green-100 text-green-800' : 
                        job.jobType === 'GENERAL' ? 'bg-gray-100 text-gray-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                      {job.jobType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {job.postedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {job.deadline || "채용시까지"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
