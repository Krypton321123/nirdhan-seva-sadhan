import { useState } from "react";

const CampaignDetails = () => {
    const [campaigns, setCampaigns] = useState([
        { id: 1, name: "Save the Ocean", raised: 5000, goal: 10000 },
        { id: 2, name: "Plant a Tree", raised: 3000, goal: 5000 },
        { id: 3, name: "Support Education", raised: 2000, goal: 8000 },
    ]);
    //
    // const deleteCampaign = () => {
    //     // setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
    // };

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
                                    // onClick={() => deleteCampaign(campaign.id)}
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