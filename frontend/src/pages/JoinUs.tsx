import React, { useState, useEffect } from "react";
import axios from "axios";
import joinusphoto from "../assets/joinuspage.png";

const JoinUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    purpose: "",
  });
  const [status, setStatus] = useState<"pending" | "approved" | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Check for existing userGeneratedId in localStorage
  useEffect(() => {
    const fetchStatus = async () => {
      const generatedId = localStorage.getItem("userGeneratedId");
      if (!generatedId) return; // No ID, show the form

      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/form/getForm/${generatedId}`);
        const { isApproved } = response.data.data;

        if (isApproved) {
          setStatus("approved");
        } else {
          setStatus("pending");
        }
      } catch (err) {
        console.error("Error fetching form status:", err);
      }
    };

    fetchStatus();
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    // Validate form data
    const { name, email, phone, address, purpose } = formData;
    if (!name || !email || !phone || !address || !purpose) {
      setError("All fields are required!");
      return;
    }

    // Check if `generatedId` is already present in `localStorage`
    let generatedId = localStorage.getItem("userGeneratedId");
    if (!generatedId) {
      generatedId = crypto.randomUUID(); // Generate a new unique ID
      localStorage.setItem("userGeneratedId", generatedId); // Store in `localStorage`
    }

    try {
      setLoading(true);

      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/form/submit`, {
        ...formData,
        generatedId, // Send the unique ID to the backend
      });

      if (response.status === 201) {
        setMessage("Your registration form has been submitted successfully!");
        setStatus("pending"); // Mark as pending after submission
        setFormData({ name: "", email: "", phone: "", address: "", purpose: "" }); // Reset form
      } else {
        setError("Failed to submit the form. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Render based on status
  if (status === "approved") {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4">Your ID Card</h2>
            <p className="text-green-600 mb-4">Your application has been approved!</p>
            <a
                href="/" // Replace with actual ID card file
                download
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Download ID Card
            </a>
          </div>
        </div>
    );
  }

  if (status === "pending") {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4">Pending Request</h2>
            <p className="text-yellow-600">Your application is under review. Please check back later.</p>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl w-full">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-snug">
              YOUR FIRST <span className="text-green-600">STEP</span>, <br />
              TOWARDS <span className="text-green-600">HUMANITY</span>, <br />
              WITH <span className="text-green-600">US</span>
            </h1>
            <div className="mt-4">
              <img src={`${joinusphoto}`} alt="Children" className="w-full rounded-md object-cover" />
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6">REGISTRATION <span className="text-green-600">FORM</span></h2>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            {message && <p className="text-green-600 mb-4">{message}</p>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="name">NAME</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
                    placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="phone">PHONE</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
                    placeholder="0000000000"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="email">E-MAIL</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
                    placeholder="Johndoe@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="address">ADDRESS</label>
                <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
                    rows={2}
                    placeholder="123 Hno at Example street"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="purpose">Your Purpose For Joining</label>
                <textarea
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
                    rows={3}
                    placeholder="Your purpose goes here..."
                />
              </div>

              <button
                  type="submit"
                  className={`w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
              >
                {loading ? "Submitting..." : "SUBMIT"}
              </button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default JoinUs;