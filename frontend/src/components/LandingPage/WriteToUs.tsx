import React, { useState } from 'react';

const WriteToUsSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill out all required fields.');
      return;
    }
    setError('');
    console.log('Form submitted:', formData);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-8">
          <span className="text-slate-950">Write to <span className='text-green-500'>Us</span></span>
        </h2>

        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
         
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="text-red-500 mb-4">
                <strong>{error}</strong>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              
              <div className="flex-1">
                <label htmlFor="name" className="text-sm font-semibold text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

            
              <div className="flex-1">
                <label htmlFor="email" className="text-sm font-semibold text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

          
            <div>
              <label htmlFor="subject" className="text-sm font-semibold text-gray-600">Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

           
            <div>
              <label htmlFor="message" className="text-sm font-semibold text-gray-600">Message</label>
              <textarea
                name="message"
                id="message"
                rows={6}
                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

          
            <div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition-all"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default WriteToUsSection;
