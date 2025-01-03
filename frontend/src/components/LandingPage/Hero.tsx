import React from "react";
import landingPagePhoto from "../../assets/slider-4 1.png";
import causes1 from '../../assets/causes-1.jpg'
import causes2 from '../../assets/causes-4.jpeg'
import causes3 from '../../assets/causes-3.jpeg'
import { useNavigate } from "react-router-dom";
// import { backendurl } from "../../constants";
import axios from "axios";

const causes = [
  { title: "ज़रूरतमंदों की मदद करना", description: "जीवन को बेहतर बनाने के लिए संसाधन उपलब्ध कराना", image: causes1, link: "/aboutus" },
  { title: "बेहतर भविष्य का निर्माण करना।", description: "विकास के लिए अवसर प्रदान करना।", image: causes2, link: "/aboutus" },
  { title: "खाद्य सुरक्षा सुनिश्चित करना।", description: "लोगों को खाद्य सामग्री उपलब्ध कराना।", image: causes3, link: "/aboutus" },
];



const HeroWithOverlay: React.FC = () => {

  const navigate = useNavigate();


  const handleDonateNow = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/campaign/getLatestCampaign`);
      const { data } = response.data;
      console.log(response.data.data[0])

      if (data?._id) {
        navigate(`/detailedcampaign/${data._id}`);
      } else {
        alert("No campaigns available to donate.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch the latest campaign.");
    }
  };

  return (
      <div className="relative">

        <section
            className="relative bg-cover bg-center bg-no-repeat h-[80vh] lg:h-[90vh]"
            style={{
              backgroundImage: `url(${landingPagePhoto})`,
            }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
            <div className="container mx-auto px-4 lg:px-16">
              <div className="text-white w-full lg:w-1/2">
                <h1 className="text-3xl lg:text-5xl font-bold mb-3">
                  "बदलाव की शुरुआत ,
                </h1>
                <h1 className="text-3xl lg:text-5xl font-bold mb-2">
                  <span className="text-green-500"> आपसे है।" </span>
                </h1>

                <p className="mt-4 text-lg lg:text-xl">
                  आपका दिया हुआ छोटा सा सहयोग किसी के जीवन को नई उम्मीद और नई दिशा दे सकता है।
                </p>
                <div className="mt-6 flex flex-col lg:flex-row lg:space-x-4">
                  <button
                      onClick={handleDonateNow}
                      className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-full shadow-lg hover:from-green-600 hover:to-green-800 transition-all transform hover:scale-105 text-lg font-medium"
                  >
                    Donate Now
                  </button>
                  <a
                      href="/aboutus"
                      className="bg-white text-center text-green-700 px-6 py-3 rounded-full shadow-lg hover:bg-gray-200 transition-all transform hover:scale-105 text-lg font-medium mt-3 lg:mt-0"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="relative w-full lg:w-[80%] mx-auto mt-20 top-[-40px] lg:top-[-180px] bg-white shadow-lg rounded-lg py-8 px-6 lg:px-10 z-10">

          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8">
            Our <span className="text-green-500">Causes</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {causes.map((cause, index) => (
                <div
                    key={index}
                    className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105 border border-gray-200 cursor-pointer"
                    onClick={() => window.open(cause.link, "_blank")}
                >

                  <img
                      src={cause.image}
                      alt={cause.title}
                      className="w-full h-48 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {cause.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{cause.description}</p>
                    <a
                        href={cause.link}
                        className="text-green-600 hover:text-green-800 font-medium"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
            ))}
          </div>
        </section>
      </div>
  );
};

export default HeroWithOverlay;