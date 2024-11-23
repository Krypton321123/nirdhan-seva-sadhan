import React from "react";

const AboutUs: React.FC = () => {
  const teamMembers = [
    "Alice Johnson - Founder & CEO",
    "Michael Smith - Operations Manager",
    "Emily Davis - Marketing Lead",
    "John Carter - Program Coordinator",
    "Sarah Lee - Outreach Specialist",
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-500 text-white text-center py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-4 text-lg">
            Learn more about our mission, strategies, and the people driving positive change.
          </p>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-16 px-4 lg:px-8 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 mb-4">
            Our <span className="text-green-500">Goals</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Support Underprivileged Communities</h3>
              <p className="text-gray-600">
                Through education, health, and livelihood programs, we aim to uplift the underprivileged.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Empower Marginalized Groups</h3>
              <p className="text-gray-600">
                By providing essential services and resources, we work to create equal opportunities.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Promote Sustainable Development</h3>
              <p className="text-gray-600">
                We focus on long-term community welfare through sustainable initiatives.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Foster Self-Reliance</h3>
              <p className="text-gray-600">
                Encouraging skill development and capacity building to promote independence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategies Section */}
      <section className="py-16 px-4 lg:px-8 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 mb-4">
            Our <span className="text-green-500">Strategies</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Community-Centered Approach</h3>
              <p className="text-gray-600">
                We involve local communities in planning and execution to ensure solutions are relevant and impactful.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Collaborative Partnerships</h3>
              <p className="text-gray-600">
                We build partnerships with organizations and individuals to amplify our reach and effectiveness.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Transparent Processes</h3>
              <p className="text-gray-600">
                Transparency in our operations ensures trust and accountability among donors and beneficiaries.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Leveraging Technology</h3>
              <p className="text-gray-600">
                We use technology to optimize processes, monitor progress, and drive impactful solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 lg:px-8 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 mb-4">
            Meet <span className="text-green-500">Our Team</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            A dedicated team committed to creating a lasting impact.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-100 p-6 rounded-lg shadow-md text-center"
              >
                <h3 className="text-xl font-bold mb-2">{member}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
