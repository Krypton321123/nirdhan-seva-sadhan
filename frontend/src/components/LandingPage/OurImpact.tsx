import React from "react";
import CountUp from 'react-countup';
import impact1 from '../../assets/causes-2.jpeg'
import impact2 from '../../assets/impact-2.jpeg'

const stats = [
  {
    title: "Volunteers",
    number: 5000,
    description: "Number of volunteers contributing to the cause.",
  },
  {
    title: "Global Reach",
    number: 10000,
    description: "Number of countries or communities impacted.",
  },
  {
    title: "Donations",
    number: 50000,
    description: "Total donations made to the cause.",
  },
  {
    title: "Funds Raised",
    number: 1000000,
    description: "Total funds raised for the cause.",
  },
];

const OurImpactSection: React.FC = () => {
  return (
    <section className="bg-gray-100 py-16 lg:mb-15">
      <h2 className="text-4xl font-semibold  text-center mb-16 lg:mb-12">Our <span className="text-green-500">Impact</span></h2>

    
      <div className="container mx-auto px-4 text-center flex flex-col lg:flex-row items-center justify-between mb-12">
        <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
          <img
            src={`${impact1}`}
            alt="Image 1"
            className="w-[500px] h-[500px] object-cover rounded-lg"
          />
        </div>
        <div className="w-full lg:w-1/3 text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">
            <CountUp end={5000} duration={3} separator="," />
            <span className="text-green-500">+</span> Volunteers
          </h2>
          <p className="text-lg text-gray-600">
            Number of volunteers contributing to the cause.
          </p>
        </div>
        <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
          <img
            src={`${impact2}`}
            alt="Image 2"
            className="w-[500px] h-[500px] object-cover rounded-lg"
          />
        </div>
      </div>

    
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-200 p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{stat.title}</h4>
              <p className="text-3xl font-bold text-gray-800 mb-4">
                <CountUp end={stat.number} duration={3} separator="," />
                <span className="text-green-500">+</span>
              </p>
              <p className="text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurImpactSection;
