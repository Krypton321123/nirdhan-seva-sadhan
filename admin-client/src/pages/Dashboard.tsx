import {useNavigate} from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const cards = [
    { title: "Campaign Master", description: "Manage all your campaigns here.", onClick: () => {navigate('/detailed-campaign')}},
    { title: "Blog Master", description: "Create and edit your blog posts.", onClick: () => {navigate('/detailed-campaign')}},
    { title: "Gallery Master", description: "Organize and upload images to the gallery.", onClick: () => {navigate('/detailed-campaign')} },
  ];

  return (
      <div className="min-h-full w-full bg-gray-100 flex flex-col items-center p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {cards.map((card, index) => (
              <div
                  key={index}
                  className="bg-white cursor-pointer p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  onClick={card.onClick}
              >
                <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
                <p className="text-gray-600">{card.description}</p>
              </div>
          ))}
        </div>
      </div>
  );
};

export default Dashboard;