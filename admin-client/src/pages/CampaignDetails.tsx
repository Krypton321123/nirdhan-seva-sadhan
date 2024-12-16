import { useState, useEffect } from "react";
import axios from "axios";

const CampaignDetails = () => {
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch campaigns data when the component mounts
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response: any = await axios.get(`${import.meta.env.VITE_APP_API_URL}/admin/get-campaigns`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });
                setCampaigns(response.data.data); // Assuming response is an array of campaigns


            } catch (err: any) {
                setError("Failed to fetch campaigns");
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    // Handle delete campaign
    const deleteCampaign = async (id: string) => {
        console.log(id);
        console.log(campaigns)
        try {
            await axios.delete(`${import.meta.env.VITE_APP_API_URL}/admin/delete-campaign/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            // Remove the deleted campaign from the state
            setCampaigns(campaigns.filter((campaign) => campaign._id !== id));
        } catch (err: any) {
            setError("Failed to delete campaign");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <div className="min-h-screen w-full bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Campaign Details</h1>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
                <table className="table-auto w-full border-collapse">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Raised Money</th>
                        <th className="border px-4 py-2">Goal Money</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {campaigns.map((campaign) => (
                        <tr key={campaign.id} className="text-center">
                            <td className="border px-4 py-2">{campaign.name}</td>
                            <td className="border px-4 py-2">${campaign.raised}</td>
                            <td className="border px-4 py-2">${campaign.goal}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => deleteCampaign(campaign._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CampaignDetails;