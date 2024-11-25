import React, { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify"; // Library to sanitize HTML
// import { backendurl } from "../constants";

const CampaignsPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCampaigns = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/campaign/campaigns`, {
        params: { page, limit: 6 },
      });
      const { campaigns, pagination } = response.data.data;
      setCampaigns(campaigns);
      setTotalPages(pagination.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("Failed to load campaigns.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) setPage(newPage);
  };

  const sanitizeHTML = (html: string) => {
    return DOMPurify.sanitize(html);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 lg:px-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Our Campaigns
        </h1>

        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}

        {!loading && !error && (
          <>
           
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaigns.map((campaign) => (
                <div
                  key={campaign._id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                >
                  <div className="mb-4">
                    <img
                      src={campaign.imageURL}
                      alt={campaign.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {campaign.name}
                  </h2>
                  <div
                    className="text-gray-600 mb-4"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHTML(
                        campaign.description.slice(0, 100) + "..."
                      ),
                    }}
                  ></div>
                  <div className="mb-4">
                    <h3 className="text-gray-800 font-semibold">
                      Raised: ₹{campaign.raised} / ₹{campaign.goal}
                    </h3>
                    <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                      <div
                        className="bg-green-500 h-4 rounded-full"
                        style={{
                          width: `${(campaign.raised / campaign.goal) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <a
                    href={`/detailedcampaign/${campaign._id}`}
                    className="block text-center bg-green-500 text-white py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Learn More
                  </a>
                </div>
              ))}
            </div>

           
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className={`px-4 py-2 rounded-lg ${
                  page === 1 ? "bg-gray-300" : "bg-green-500 text-white"
                }`}
              >
                Previous
              </button>
              <span className="text-lg font-semibold text-gray-800">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-lg ${
                  page === totalPages
                    ? "bg-gray-300"
                    : "bg-green-500 text-white"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CampaignsPage;
