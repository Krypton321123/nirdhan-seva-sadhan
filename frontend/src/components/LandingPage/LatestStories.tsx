import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css/autoplay";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css/navigation";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css/pagination";

const LatestStoriesSlider: React.FC = () => {
    const [latestBlogs, setLatestBlogs] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLatestBlogs = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_APP_API_URL}/blogs/latest`
                );
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
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 mb-8">
                    Latest <span className="text-green-500">Stories</span>
                </h2>

                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 1,
                        },
                        1024: {
                            slidesPerView: 1,
                        },
                    }}
                >
                    {latestBlogs.map((blog, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col lg:flex-row">
                                <div className="flex-1 mb-4 lg:mb-0 lg:mr-4">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 text-lg">
                    <span
                        dangerouslySetInnerHTML={{
                            __html: blog.content.slice(0, 100) + "...",
                        }}
                    />
                                    </p>
                                    <Link
                                        to={`/`}
                                        className="inline-block py-2 px-4 text-white bg-green-500 rounded-lg hover:bg-green-700 transition"
                                    >
                                        Read More
                                    </Link>
                                </div>
                                <div className="lg:w-1/2 h-[300px] lg:h-[500px]">
                                    <img
                                        src={blog.imageURL || "https://via.placeholder.com/800x500"}
                                        alt={blog.title}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="custom-next absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer bg-green-500 text-white p-3 rounded-full hover:bg-green-700 z-10">
                        →
                    </div>
                    <div className="custom-prev absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer bg-green-500 text-white p-3 rounded-full hover:bg-green-700 z-10">
                        ←
                    </div>
                </Swiper>
            </div>
        </section>
    );
};

export default LatestStoriesSlider;
