import { useState, useEffect } from "react";
import { backendurl } from "../constants";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState<
    { imageURL: string; description: string; date: string }[]
  >([]);

  // Simulate API fetch
  useEffect(() => {
    // Replace with actual API call
    const fetchData = async () => {
        
        const response = await axios.get(`${backendurl}/gallery/get-gallery`)

        const { data } = response.data
      setImages(data);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      {/* Gallery Header */}
      <h1 className="text-center text-4xl font-bold mb-12">GALLERY</h1>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((item, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg"
          >
            {/* Image */}
            <img
              src={item.imageURL}
              alt={item.description}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-sm text-center px-4">
                {item.description}
              </p>
            </div>

            {/* Date */}
            <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 px-2 py-1 rounded text-xs font-semibold">
              {item.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
