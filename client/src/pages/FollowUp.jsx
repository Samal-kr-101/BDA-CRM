import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const FollowUp = () => {
  const { id } = useParams();
  const [followUps, setFollowUps] = useState([]);

  const [formData, setFormData] = useState({
    discussion: "",
    nextFollowUpDate: "",
    meetingStatus: "",
  });

  const fetchFollowUps = async () => {
    try {
      const res = await API.get(`/followups/${id}`);
      setFollowUps(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFollowUps();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/followups", {
        ...formData,
        leadId: id,
      });

      setFormData({
        discussion: "",
        nextFollowUpDate: "",
        meetingStatus: "",
      });

      fetchFollowUps();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Follow-up Management
        </h1>
        <p className="text-gray-500">
          Track all communication history with leads
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* FORM */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Add Follow-up</h2>

          <form onSubmit={handleSubmit} className="space-y-3">

            <textarea
              name="discussion"
              placeholder="Discussion details"
              value={formData.discussion}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              rows="4"
            />

            <input
              type="date"
              name="nextFollowUpDate"
              value={formData.nextFollowUpDate}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />

            <select
              name="meetingStatus"
              value={formData.meetingStatus}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Status</option>
              <option>Pending</option>
              <option>Meeting Scheduled</option>
              <option>Quotation Sent</option>
              <option>Closed</option>
            </select>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
              Add Follow-up
            </button>

          </form>
        </div>

        {/* HISTORY */}
        <div className="lg:col-span-2 bg-white p-6 rounded shadow">

          <h2 className="text-xl font-bold mb-4">
            Follow-up History
          </h2>

          {followUps.length === 0 ? (
            <p className="text-gray-500">No follow-ups found</p>
          ) : (
            <div className="space-y-4">

              {followUps.map((item) => (

                <div
                  key={item._id}
                  className="border p-4 rounded hover:bg-gray-50"
                >

                  <p className="mb-2">
                    <strong>Discussion:</strong> {item.discussion}
                  </p>

                  <p className="text-sm text-gray-600">
                    Next: {item.nextFollowUpDate || "N/A"}
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 text-white text-sm rounded
                      ${
                        item.meetingStatus === "Pending"
                          ? "bg-yellow-500"
                          : item.meetingStatus === "Meeting Scheduled"
                          ? "bg-blue-500"
                          : item.meetingStatus === "Quotation Sent"
                          ? "bg-purple-500"
                          : "bg-green-500"
                      }
                    `}
                  >
                    {item.meetingStatus}
                  </span>

                </div>

              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default FollowUp;