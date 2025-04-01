"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Labs() {
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    const storedLabs = JSON.parse(localStorage.getItem("labs")) || [];
    setLabs(storedLabs);
  }, []); // ✅ Added empty dependency array to prevent infinite loop

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <nav className="flex justify-between p-4 border-b">
        <Link href="/labs" className="text-lg font-bold">Labs</Link>
        <Link href="/admin-portal" className="text-lg font-bold">Admin Portal</Link>
      </nav>
      <h1 className="text-2xl font-bold mt-4">Labs</h1>
      <ul>
        {labs.map((lab, index) => (
          <li key={index} className="p-4 border mt-2">
            <a href={`/labs/${index}`} target="_blank" className="text-blue-500 underline">
              {lab.subject}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
