import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../components/CampaignPage/Modal";

const DonationForm: React.FC<{ campaignName: string; onClose: () => void }> = ({ onClose }) => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !name) {
      alert("Please fill in the required fields.");
      return;
    }
    console.log("Donation Data:", { amount, name, mobile });
    alert(`Thank you, ${name}, for donating INR ${amount}!`);
    onClose(); // Close the modal after submission
  };

  return (
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Donate to Campagin</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Amount (INR)</label>
          <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter amount"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Mobile Number (Optional)</label>
          <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter mobile number"
          />
          <div className="m-2">
            <p className="block text-gray-700 font-medium mb-2">
              Scan the QR Code to Donate
            </p>
            <img className="w-36 h-36 mx-auto" src='/QR.jpg' alt="Nirdhan Seva Sansthan QR"/>
            <div className="block text-green-600 font-medium mb-2">12A and 80G Cerified</div>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mx-auto">
          <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Donate
          </button>
        </div>
      </form>
  );
};

const ProgressBar: React.FC<{ raised: number; goal: number }> = ({ raised, goal }) => {
  const progress = (raised / goal) * 100;
  return (
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}
        ></div>
      </div>
  );
};

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const faqs = [
    {
      question: "How can I donate to a campaign?",
      answer: "You can donate to any campaign by clicking the 'Donate Now' button...",
    },
    {
      question: "Is my donation secure?",
      answer: "Yes! We use industry-standard encryption to secure all transactions...",
    },
    {
      question: "How will my donation be used?",
      answer: "Donations are directly used to fund the goals of the campaign...",
    },
    {
      question: "Can I track the progress of the campaign?",
      answer: "Yes, you can track the progress of the campaign through regular updates...",
    },
    {
      question: "Can I make a recurring donation?",
      answer: "Yes, you can set up recurring donations for many campaigns...",
    },
  ];

  return (
      <section className="py-16 px-4 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl lg:text-4xl font-semibold text-center text-gray-800 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
                <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
                    <span
                        className={`transform transition-transform duration-300 ${
                            activeIndex === index ? "rotate-180" : ""
                        }`}
                    >
                  ▼
                </span>
                  </div>
                  {activeIndex === index && (
                      <p className="mt-4 text-gray-600">{faq.answer}</p>
                  )}
                </div>
            ))}
          </div>
        </div>
      </section>
  );
};

const CampaignPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/campaign/getCampaignById/${id}`);
        setCampaign(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load campaign details.");
        setLoading(false);
      }
    };
    fetchCampaign();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
      <div>

        <section
            className="relative bg-cover bg-center h-[400px] md:h-[500px]"
            style={{ backgroundImage: `url(${campaign.imageURL})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container mx-auto text-center relative z-10 text-white py-24 px-6">
            <h1 className="text-4xl md:text-5xl font-bold">{campaign.name}</h1>
          </div>
        </section>


        <section className="py-16 px-4 lg:px-8 bg-gray-50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 mb-4">About the Campaign</h2>
            <div
                className="text-lg text-gray-600 mb-8"
                dangerouslySetInnerHTML={{ __html: campaign.description }}
            ></div>

            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Campaign Progress</h3>
              <div className="flex justify-center items-center my-4">
                <span className="text-xl font-semibold text-green-500 mr-4">₹{campaign.raised}</span>
                <span className="text-xl text-gray-600">raised of ₹{campaign.goal}</span>
              </div>
              <ProgressBar raised={campaign.raised} goal={campaign.goal} />
            </div>



            <div className="text-center my-8">
              <button
                  onClick={handleOpenModal}
                  className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
              >
                Donate Now
              </button>
            </div>


            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
              <DonationForm campaignName="Example Campaign" onClose={handleCloseModal} />
            </Modal>
          </div>
        </section>


        <FAQSection />
      </div>
  );
};

export default CampaignPage;