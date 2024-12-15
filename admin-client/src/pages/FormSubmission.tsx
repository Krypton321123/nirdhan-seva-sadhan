// AdminFormRequests.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminFormRequests = () => {
    const [formRequests, setFormRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch form requests from backend
    useEffect(() => {
        const fetchFormRequests = async () => {
            try {
                const response: any = await axios.get(`${import.meta.env.VITE_APP_API_URL}/admin/get-forms`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });
                setFormRequests(response.data.data);
            } catch (error) {
                toast.error("Failed to fetch form requests.");
            } finally {
                setLoading(false);
            }
        };

        fetchFormRequests();
    }, []);

    const handleApprove = async (id: string) => {
        try {
            await axios.patch(
                `${import.meta.env.VITE_APP_API_URL}/admin/approve-form/${id}`,
                { isApproved: true },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );
            toast.success("Form request approved!");
            setFormRequests(formRequests.map(form => form._id === id ? { ...form, isApproved: true } : form));
        } catch (error) {
            toast.error("Failed to approve form request.");
        }
    };

    const handleReject = async (id: string) => {
        try {
            await axios.patch(
                `${import.meta.env.VITE_APP_API_URL}/admin/approve-form/${id}`,
                { isApproved: false },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );
            toast.success("Form request rejected.");
            setFormRequests(formRequests.map(form => form._id === id ? { ...form, isApproved: false } : form));
        } catch (error) {
            toast.error("Failed to reject form request.");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Manage Form Requests</h1>
            <div className="space-y-6">
                {formRequests.map((form) => (
                    <div key={form._id} className="p-4 border rounded-lg shadow-lg space-y-4">
                        <h2 className="text-xl font-semibold">{form.name}</h2>
                        <p>{form.email}</p>
                        <p>{form.purpose}</p>
                        <p>{form.address}</p>
                        <div className="flex space-x-4">
                            {form.isApproved ? (
                                <span className="text-green-600">Approved</span>
                            ) : (
                                <span className="text-yellow-600">Pending</span>
                            )}
                            <button
                                onClick={() => handleApprove(form._id)}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleReject(form._id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminFormRequests;