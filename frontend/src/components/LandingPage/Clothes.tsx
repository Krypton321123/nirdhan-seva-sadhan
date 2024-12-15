import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import clothes1 from "../../assets/clothesDonation1.jpg"
import clothes2 from "../../assets/clothesDonation2.jpg"
import clothes3 from "../../assets/clothesDonation3.jpg"


const Clothes: React.FC = () => {
    const clippings = [
        {
            imageURL: clothes1,
            altText: " Vastra Vitran Img 1",
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

    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
                    <span className="text-green-500">Vastra</span> Vitran
                </h2>
                <Slider {...settings}>
                    {clippings.map((clipping, index) => (
                        <div key={index} className="px-2">
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
        </section>
    );
};

export default Clothes;
