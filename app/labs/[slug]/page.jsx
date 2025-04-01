"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Copy } from "lucide-react";

const LabDetail = () => {
  const { slug } = useParams();
  const [lab, setLab] = useState(null);
  const [loading, setLoading] = useState(true);
  const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;

  useEffect(() => {
    if (!slug) return;
    const fetchLab = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/labs?filters[slug][$eq]=${slug}`,
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        setLab(result.data[0]);
      } catch (error) {
        console.error("Error fetching lab details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLab();
  }, [slug, BEARER_TOKEN]);

  if (loading) return <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>;
  if (!lab) return <div style={{ textAlign: "center", padding: "40px" }}>Lab not found</div>;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Command copied to clipboard!");
  };

  return (
    <div style={{ padding: "24px", maxWidth: "768px", margin: "0 auto", justifyContent: "center", alignItems: "center" }}>
      <div style={{ backgroundColor: "white", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", borderRadius: "16px", padding: "24px" }}>

        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px" }}>{lab.Subject_Name} - {lab.Semester}</h1>
        <p style={{ color: "#4B5563", marginBottom: "16px" }}>{lab.Note}</p>

        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          <button onClick={() => setLab({ ...lab, activeTab: "ubuntu" })} style={{ padding: "8px 16px", backgroundColor: lab.activeTab === "ubuntu" ? "#3B82F6" : "#E5E7EB", borderRadius: "8px", cursor: "pointer" }}>Ubuntu</button>
          <button onClick={() => setLab({ ...lab, activeTab: "windows" })} style={{ padding: "8px 16px", backgroundColor: lab.activeTab === "windows" ? "#3B82F6" : "#E5E7EB", borderRadius: "8px", cursor: "pointer" }}>Windows</button>
        </div>

        {lab.activeTab === "ubuntu" && (
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Ubuntu Commands</h2>
            <p style={{ color: "#374151", marginBottom: "8px" }}>
              {lab.Ubuntu_Instructions?.map((block) => block.children.map((child) => child.text).join(" ")).join("\n")}
            </p>


            <div style={{ backgroundColor: "#F3F4F6", padding: "16px", borderRadius: "8px", position: "relative" }}>
              <code style={{ display: "block", fontSize: "14px", color: "#1F2937" }}>{lab.Ubuntu_Pull_command}</code>
              <button onClick={() => copyToClipboard(lab.Ubuntu_Pull_command)} style={{ position: "absolute", top: "8px", right: "8px", cursor: "pointer" }}>
                <Copy style={{ width: "20px", height: "20px", color: "#6B7280" }} />
              </button>
            </div>
            <div style={{ backgroundColor: "#F3F4F6", padding: "16px", borderRadius: "8px", position: "relative", marginTop: "8px" }}>
              <code style={{ display: "block", fontSize: "14px", color: "#1F2937" }}>{lab.Ubuntu_Run_command}</code>
              <button onClick={() => copyToClipboard(lab.Ubuntu_Run_command)} style={{ position: "absolute", top: "8px", right: "8px", cursor: "pointer" }}>
                <Copy style={{ width: "20px", height: "20px", color: "#6B7280" }} />
              </button>
            </div>
          </div>
        )}

        {lab.activeTab === "windows" && (
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Windows Commands</h2>
            <p style={{ color: "#374151", marginBottom: "8px" }}>
              {lab.Window_Instructions?.map((block) => block.children.map((child) => child.text).join(" ")).join("\n")}
            </p>
            <div style={{ backgroundColor: "#F3F4F6", padding: "16px", borderRadius: "8px", position: "relative" }}>
              <code style={{ display: "block", fontSize: "14px", color: "#1F2937" }}>{lab.Window_Pull_command}</code>
              <button onClick={() => copyToClipboard(lab.Window_Pull_command)} style={{ position: "absolute", top: "8px", right: "8px", cursor: "pointer" }}>
                <Copy style={{ width: "20px", height: "20px", color: "#6B7280" }} />
              </button>
            </div>
            <div style={{ backgroundColor: "#F3F4F6", padding: "16px", borderRadius: "8px", position: "relative", marginTop: "8px" }}>
              <code style={{ display: "block", fontSize: "14px", color: "#1F2937" }}>{lab.Window_Run_command}</code>
              <button onClick={() => copyToClipboard(lab.Window_Run_command)} style={{ position: "absolute", top: "8px", right: "8px", cursor: "pointer" }}>
                <Copy style={{ width: "20px", height: "20px", color: "#6B7280" }} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabDetail;
