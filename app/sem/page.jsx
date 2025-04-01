"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Sem() {
  const [labs, setLabs] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);

  useEffect(() => {
    const storedLabs = JSON.parse(localStorage.getItem("labs")) || [];
    setLabs(storedLabs);
  }, []);

  const handleSemesterClick = (semester) => {
    setSelectedSemester(semester);
  };

  const filteredLabs = selectedSemester
    ? labs.filter(lab => lab.semester === selectedSemester)
    : [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <nav className="flex justify-between p-4 border-b">
        <Link href="/labs" className="text-lg font-bold">Labs</Link>
        <Link href="/admin-portal" className="text-lg font-bold">Admin Portal</Link>
      </nav>

      <h1 className="text-2xl font-bold mt-4">Semester Selection</h1>
      <div className="mt-6 grid grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            onClick={() => handleSemesterClick(i + 1)}
            className="cursor-pointer p-4 border rounded text-center hover:bg-blue-500 hover:text-white"
          >
            <h2>Semester {i + 1}</h2>
          </div>
        ))}
      </div>

      {selectedSemester && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Labs for Semester {selectedSemester}</h2>
          <ul>
            {filteredLabs.length > 0 ? (
              filteredLabs.map((lab, index) => (
                <li key={index} className="p-4 border mt-2">
                  <p><strong>{lab.subject}</strong> - {lab.semester}</p>
                  <p><strong>Pull Command:</strong> <code>{lab.pullCommand}</code></p>
                  <p><strong>Run Command:</strong> <code>{lab.runCommand}</code></p>
                </li>
              ))
            ) : (
              <p>No labs available for this semester.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
