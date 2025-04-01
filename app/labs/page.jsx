"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Lab = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/labs', {
          headers: {
            'Authorization': `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        setLabs(result.data);
      } catch (error) {
        console.error('Error fetching labs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLabs();
  }, [BEARER_TOKEN]);

  if (loading) return <div>Loading...</div>;

  const Card = ({ children, className = '', ...props }) => (
    <div 
      className={`bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer ${className}`} 
      {...props}
    >
      {children}
    </div>
  );

  const CardContent = ({ children }) => (
    <div className="p-2">
      {children}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {labs.map((lab) => (
        <Card 
          key={lab.id} 
          onClick={() => router.push(`/labs/${lab.slug}`)}
        >
          <CardContent>
            <h2 className="text-xl font-bold">{lab.Subject_Name}</h2>
            <p className="text-gray-600">Semester: {lab.Semester}</p>
            <p className="text-gray-500 text-sm">Note: {lab.Note}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Lab;
