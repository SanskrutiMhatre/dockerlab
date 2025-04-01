"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminPortal() {
  const [labs, setLabs] = useState([]);
  const [formData, setFormData] = useState({
    semester: "",
    subject: "",
    pullCommand: "",
    runCommand: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedLabs = JSON.parse(localStorage.getItem("labs")) || [];
    setLabs(storedLabs);
  }, []);  // ✅ Added empty dependency array to prevent infinite loop

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedLabs = [...labs];

    if (editIndex !== null) {
      updatedLabs[editIndex] = formData;
    } else {
      updatedLabs.push(formData);
    }

    setLabs(updatedLabs);
    localStorage.setItem("labs", JSON.stringify(updatedLabs));
    setFormData({ semester: "", subject: "", pullCommand: "", runCommand: "" });
    setShowForm(false);
    setEditIndex(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <nav className="flex justify-between p-4 border-b">
        <Link href="/labs" className="text-lg font-bold">Labs</Link>
        <Link href="/admin-portal" className="text-lg font-bold">Admin Portal</Link>
      </nav>
      <h1 className="text-2xl font-bold mt-4">Admin Portal</h1>
      <button onClick={() => { setShowForm(true); setEditIndex(null); }} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Add New Lab
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded">
          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="block w-full p-2 border mt-2"
            required
          >
            <option value="">Select Semester</option>
            {[...Array(8)].map((_, i) => (
              <option key={i} value={i + 1}>
                Semester {i + 1}
              </option>
            ))}
          </select>

          <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} className="block w-full p-2 border mt-2" required />
          <input type="text" name="pullCommand" placeholder="Pull Command" value={formData.pullCommand} onChange={handleChange} className="block w-full p-2 border mt-2" required />
          <input type="text" name="runCommand" placeholder="Run Command" value={formData.runCommand} onChange={handleChange} className="block w-full p-2 border mt-2" required />
          <button type="submit" className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
            {editIndex !== null ? "Update" : "Save"}
          </button>
        </form>
      )}

      <h2 className="text-xl font-bold mt-6">Added Labs</h2>
      <ul>
        {labs.map((lab, index) => (
          <li key={index} className="p-4 border mt-2 flex justify-between">
            <p><strong>{lab.subject}</strong> - {lab.semester}</p>
            <button onClick={() => handleEdit(index)} className="px-3 py-1 bg-yellow-500 text-white rounded">Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
