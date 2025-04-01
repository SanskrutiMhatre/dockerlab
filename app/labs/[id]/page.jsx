"use client";  // ✅ Forces client-side rendering

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ For App Router projects

import Link from "next/link";

export default function LabDetails({ params }) {
  const router = useRouter();
  
  // Unwrap the params object before accessing properties
  const { id } = React.use(params); // Unwrap `params` using `React.use()`

  const [lab, setLab] = useState(null);

  useEffect(() => {
    if (id !== undefined) {
      const storedLabs = JSON.parse(localStorage.getItem("labs")) || [];
      const labData = storedLabs[parseInt(id)]; // Convert ID to number
      if (labData) setLab(labData);
    }
  }, [id]);

  if (!lab) return <p className="p-6 text-center text-red-500">Lab not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <nav className="flex justify-between p-4 border-b">
        <Link href="/labs" className="text-lg font-bold">Back to Labs</Link>
      </nav>
      <h1 className="text-2xl font-bold mt-4">{lab.subject}</h1>
      <p><strong>Semester:</strong> {lab.semester}</p>
      <p><strong>Pull Command:</strong> <code>{lab.pullCommand}</code></p>
      <p><strong>Run Command:</strong> <code>{lab.runCommand}</code></p>
    </div>
  );
}
