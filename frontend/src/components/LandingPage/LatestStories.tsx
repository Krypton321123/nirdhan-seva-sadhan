import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
// import { backendurl } from "../../constants";

// Next arrow
function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        right: "-30px", // Position within the slider
        zIndex: 10, // Make sure it's in front of the background
        top: "50%", // Vertically centered
        transform: "translateY(-50%)", // Ensures the arrow is centered
      }}
      onClick={onClick}
    >
      <div className="rounded-full p-3 cursor-pointer hover:bg-green-600">
        →
      </div>
    </div>
  );
}

// Previous arrow
function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        right: "-30px", // Position within the slider
        zIndex: 10, // Make sure it's in front of the background
        top: "50%", // Vertically centered
        transform: "translateY(-50%)", // Ensures the arrow is centered
      }}
      onClick={onClick}
    >
      <div className=" rounded-full p-3 cursor-pointer hover:bg-green-600">
        ←
      </div>
    </div>
  );
}

const LatestStoriesSlider: React.FC = () => {

  const [latestBlogs, setLatestBlogs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show one card at a time
    slidesToScroll: 1, // Move one card at a time
    centerMode: true, // Center the active card
    focusOnSelect: true, // Focus on selected card
    arrows: true, // Show previous/next arrows
    nextArrow: <SampleNextArrow className="hidden lg:block" />,
    prevArrow: <SamplePrevArrow className="hidden lg:block" />,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/blogs/latest`); 
        setLatestBlogs(response.data.data); 
      } catch (err) {
        setError("Failed to load the latest blogs.");
      }
    };

    fetchLatestBlogs();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50 w-full">
      <div className="container mx-auto px-4 text-center relative">
        <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 mb-8">
          Latest <span className="text-green-500">Stories</span>
        </h2>

        <Slider {...settings}>
          {latestBlogs.map((blog: any, index: number) => (
            <div key={index} className="px-4">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col lg:flex-row relative">
                
                <div className="flex-1 mb-4 lg:mb-0 lg:mr-4">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-lg">
                   
                    <span
                      dangerouslySetInnerHTML={{
                        __html: blog.content.slice(0, 100) + "..."
                      }}
                    />
                  </p>
                  <Link
                    to={`/`}
                    className="inline-block py-2 px-4 text-center text-white bg-green-500 rounded-lg hover:bg-green-700 transition absolute bottom-4 left-4"
                  >
                    Read More
                  </Link>
                </div>

               
                <div className="lg:w-1/2 h-[300px] lg:h-[500px]">
                  <img
                    src={blog.imageURL || "https://via.placeholder.com/800x500"} // Use a placeholder if no image is available
                    alt={blog.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default LatestStoriesSlider;
