import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import clothes1 from "../../assets/clothesDonation1.jpg";
import clothes2 from "../../assets/clothesDonation2.jpg";
import clothes3 from "../../assets/clothesDonation3.jpg";

const Clothes: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const clippings = [
        {
            imageURL: clothes1,
            altText: "Vastra Vitran Img 1",
        },
        {
            imageURL: clothes2,
            altText: "Vastra Vitran Img 2",
        },
        {
            imageURL: clothes3,
            altText: "Vastra Vitran Img 3",
        },
    ];

    const settings = {
        infinite: true,
        speed: 10000, // Slow continuous scrolling speed
        slidesToShow: 2, // Number of visible clippings
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        arrows: false, // No arrows for a continuous scroll effect
        pauseOnHover: true, // Pauses on hover
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const openModal = (imageURL: string) => {
        setSelectedImage(imageURL);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setIsModalOpen(false);
    };

    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
                    <span className="text-green-500">वस्त्र</span> वितरण
                </h2>
                <Slider {...settings}>
                    {clippings.map((clipping, index) => (
                        <div
                            key={index}
                            className="px-2 cursor-pointer"
                            onClick={() => openModal(clipping.imageURL)}
                        >
                            <div className="rounded-lg overflow-hidden shadow-md">
                                <img
                                    src={clipping.imageURL}
                                    alt={clipping.altText}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Modal for Zoomed Image */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="relative max-w-3xl w-full mx-4 bg-white rounded-lg shadow-lg p-4"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                    >
                        <button
                            className="absolute top-4 right-4 text-white bg-red-500 rounded-full px-3 py-1 hover:bg-red-600"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                        <img
                            src={selectedImage || ""}
                            alt="Zoomed Clipping"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Clothes;