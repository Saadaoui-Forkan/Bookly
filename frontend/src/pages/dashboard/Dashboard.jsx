import React from "react";
import "./dashboard.css";
import AdminSidebar from "./AdminSideBar";
import BooksDashboard from "./BooksDashboard";

function Dashboard() {
  return (
    <section className="admin-dashboard">
      <AdminSidebar />
      <BooksDashboard/>
    </section>
  );
}

export default Dashboard;
