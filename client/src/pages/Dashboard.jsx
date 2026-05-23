import { useEffect, useState } from "react";
import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Users,
  UserPlus,
  Handshake,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads");
      setLeads(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const interestedLeads = leads.filter((l) => l.status === "Interested").length;
  const contactedLeads = leads.filter((l) => l.status === "Contacted").length;
  const convertedLeads = leads.filter((l) => l.status === "Converted").length;

  const pieData = [
    { name: "New", value: newLeads },
    { name: "Interested", value: interestedLeads },
    { name: "Contacted", value: contactedLeads },
    { name: "Converted", value: convertedLeads },
  ];

  const barData = [
    {
      name: "Leads",
      New: newLeads,
      Interested: interestedLeads,
      Contacted: contactedLeads,
      Converted: convertedLeads,
    },
  ];

  const COLORS = ["#3B82F6", "#EAB308", "#8B5CF6", "#22C55E"];

  const cards = [
    { title: "Total Leads", value: totalLeads, icon: Users, color: "bg-blue-600" },
    { title: "New Leads", value: newLeads, icon: UserPlus, color: "bg-yellow-500" },
    { title: "Interested", value: interestedLeads, icon: Handshake, color: "bg-purple-600" },
    { title: "Contacted", value: contactedLeads, icon: PhoneCall, color: "bg-indigo-600" },
    { title: "Converted", value: convertedLeads, icon: CheckCircle2, color: "bg-green-600" },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          BDA CRM Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Overview of your sales pipeline and lead performance
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{card.title}</p>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {card.value}
                  </h2>
                </div>
                <div className={`${card.color} p-3 rounded-xl text-white`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Lead Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={110} label>
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Lead Analytics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="New" fill="#3B82F6" />
              <Bar dataKey="Interested" fill="#EAB308" />
              <Bar dataKey="Contacted" fill="#8B5CF6" />
              <Bar dataKey="Converted" fill="#22C55E" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-2xl shadow-md mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Leads</h2>
          <span className="text-sm text-gray-500">Latest 5 entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-3">Company</th>
                <th className="p-3">Client</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 5).map((lead, i) => (
                <tr
                  key={lead._id}
                  className={`border-b hover:bg-gray-50 transition ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3 font-medium">{lead.companyName}</td>
                  <td className="p-3">{lead.clientName}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm
                      ${
                        lead.status === "New"
                          ? "bg-blue-500"
                          : lead.status === "Interested"
                          ? "bg-yellow-500"
                          : lead.status === "Contacted"
                          ? "bg-purple-500"
                          : "bg-green-500"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
