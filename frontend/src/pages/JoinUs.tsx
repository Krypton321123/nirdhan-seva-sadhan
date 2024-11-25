import React from "react";
import joinusphoto from '../assets/joinuspage.png'

const JoinUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 lg:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl w-full">
     
        <div className="space-y-6">
          <h1 className="text-5xl font-bold leading-snug">
            YOUR FIRST <span className="text-green-600">STEP</span>, <br />
            TOWARDS <span className="text-green-600">HUMANITY</span>, <br />
            WITH <span className="text-green-600">US</span>
          </h1>
          <div className="mt-4">
            <img
              src={`${joinusphoto}`}
              alt="Children"
              className="w-full rounded-md object-cover"
            />
          </div>
          
        </div>

       
        <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">
            REGISTRATION <span className="text-green-600">FORM</span>
          </h2>
          <form className="space-y-4">
         
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="name">
                NAME
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
              />
            </div>

      
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="phone">
                PHONE
              </label>
              <input
                type="text"
                id="phone"
                placeholder="0000000000"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
              />
            </div>

        
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="email">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                placeholder="Johndoe@example.com"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
              />
            </div>

      
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="address">
                Address
              </label>
              <textarea
                id="address"
                placeholder="123 Hno at Example street"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
                rows={2}
              />
            </div>

           
            <div>
              <label
                className="block text-sm font-semibold mb-1"
                htmlFor="purpose"
              >
                Your Purpose For Joining
              </label>
              <textarea
                id="purpose"
                placeholder="Your purpose goes here..."
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
                rows={3}
              />
            </div>

            
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
