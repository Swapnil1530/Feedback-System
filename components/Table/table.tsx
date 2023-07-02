"use client";
import { useState } from "react";

const StudentTable = ({ studentData }: any) => {
  // Pagination settings
  const itemsPerPage = 5;
  const totalPages = Math.ceil(studentData.length / itemsPerPage);

  // State for current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate start and end index for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get student data for current page
  const currentPageData = studentData.slice(startIndex, endIndex);

  return (
    
    <div className="flex flex-col">
      {/* Render student table */}
      <table className="min-w-full divide-gray-200">
        <thead>
          <tr>
            <th className="px-10 py-3 border-white  bg-gray-800 text-left text-xs font-medium text-white uppercase tracking-wider">
              ID
            </th>
            <th className="px-10 py-3 bg-gray-800 text-left text-xs font-medium text-white uppercase tracking-wider">
              Name
            </th>
            <th className="px-10 py-3 bg-gray-800 text-left text-xs font-medium text-white uppercase tracking-wider">
              PRN NUMBER
            </th>
          </tr>
        </thead>

        <tbody>
          {currentPageData.map((data: any) => (
            <tr key={data.id}>
              <td className="px-10 py-4whitespace-nowrap text-sm text-center text-gray-500">
                {data.id}
              </td>
              <td className="px-10 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                {data.name}
              </td>
              <td className="px-10 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                {data.prnNumber}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render pagination */}
      <div className="mt-4 flex justify-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
          {/* Render previous button */}
          <button
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
            }
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Previous
          </button>

          {/* Render page numbers */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`${
                currentPage === index + 1
                  ? "bg-indigo-50 border-indigo-500 text-indigo-600"
                  : "border-gray-300 text-gray-500 hover:bg-gray-50"
              } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
            >
              {index + 1}
            </button>
          ))}

          {/* Render next button */}
          <button
            onClick={() =>
              setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default StudentTable;
