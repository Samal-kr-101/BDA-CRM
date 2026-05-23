import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [editingLead, setEditingLead] = useState(null);
  const [formData, setFormData] = useState({
    companyName: "",
    clientName: "",
    status: "",
  });

  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads");
      setLeads(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLead = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this lead?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/leads/${id}`);
      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  const startEdit = (lead) => {
    setEditingLead(lead._id);
    setFormData({
      companyName: lead.companyName,
      clientName: lead.clientName,
      status: lead.status,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateLead = async () => {
    try {
      await API.put(`/leads/${editingLead}`, formData);
      setEditingLead(null);
      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter((lead) =>
    lead.companyName.toLowerCase().includes(search.toLowerCase()) ||
    lead.clientName.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-500";
      case "Interested":
        return "bg-yellow-500";
      case "Contacted":
        return "bg-purple-500";
      case "Converted":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Lead Management</h1>
          <p className="text-gray-500">Manage, update and track your leads</p>
        </div>

        <Link
          to="/add-lead"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          + Add Lead
        </Link>
      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by company or client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="font-semibold text-gray-700">All Leads</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-4">Company</th>
                <th className="p-4">Client</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead, index) => (
                  <tr
                    key={lead._id}
                    className={`border-b hover:bg-gray-50 transition ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="p-3 font-medium">
                      {editingLead === lead._id ? (
                        <input
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                        />
                      ) : (
                        lead.companyName
                      )}
                    </td>

                    <td className="p-3">
                      {editingLead === lead._id ? (
                        <input
                          name="clientName"
                          value={formData.clientName}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                        />
                      ) : (
                        lead.clientName
                      )}
                    </td>

                    <td className="p-3">
                      {editingLead === lead._id ? (
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                        >
                          <option>New</option>
                          <option>Interested</option>
                          <option>Contacted</option>
                          <option>Converted</option>
                        </select>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-white text-sm ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      )}
                    </td>

                    <td className="p-3">
                      <div className="flex gap-2 flex-wrap">
                        {editingLead === lead._id ? (
                          <button
                            onClick={updateLead}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => startEdit(lead)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>
                        )}

                        <Link
                          to={`/followup/${lead._id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                        >
                          Follow-up
                        </Link>

                        <button
                          onClick={() => deleteLead(lead._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-500">
                    No Leads Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadList;