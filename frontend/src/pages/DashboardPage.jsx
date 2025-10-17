import React from "react";
import {HistoryList} from "../components/dashboard/HistoryList";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth(); // ✅ Get user from AuthContext
console.log(user);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Dashboard</h2>
      {user ? (
        <>
          <p className="text-gray-600 mb-4">
            Welcome, <span className="font-semibold">{user.name}</span>
          </p>
          <HistoryList  />
        </>
      ) : (
        <p className="text-gray-500">
          You must be logged in to view your detection history.
        </p>
      )}
    </div>
  );
}
