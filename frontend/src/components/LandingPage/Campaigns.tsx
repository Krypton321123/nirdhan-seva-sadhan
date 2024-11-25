import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { backendurl } from "../../constants";


const CampaignsPageSection: React.FC = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/campaign/getLatestCampaignForLandingPage`);
        setCampaigns(response.data.data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-8">
          Our <span className="text-green-500">Campaigns</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {campaigns.map((campaign: any, index) => {
            const raisedPercentage =
              (campaign.raised / campaign.goal) * 100;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all"
              >
                <img
                  src={campaign.imageURL}
                  alt={campaign.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {campaign.name}
                </h3>

               
                <div className="mb-4">
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${raisedPercentage}%` }}
                    />
                  </div>
                </div>

               
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>Raised: ₹{campaign.raised}</span>
                  <span>Goal: ₹{campaign.goal}</span>
                </div>

              
                <Link
                  to={`/detailedcampaign/${campaign._id}`}
                  className="block text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full mt-4 transition-all"
                >
                  Donate Now
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampaignsPageSection;
