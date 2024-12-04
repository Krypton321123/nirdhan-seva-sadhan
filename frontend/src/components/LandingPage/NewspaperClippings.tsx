import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import news1 from '../../assets/news-paper-1.jpg'
import news2 from '../../assets/news-paper-2.jpg'
import news3 from '../../assets/news-paper-3.jpeg'
import news4 from '../../assets/news-paper-4.jpeg'
import news5 from '../../assets/news-paper-5.jpeg'

const NewspaperClippings: React.FC = () => {
    const clippings = [
        {
            imageURL: news1,
            altText: "Newspaper clipping 1",
        },
        {
            imageURL: news2,
            altText: "Newspaper clipping 2",
        },
        {
            imageURL: news3,
            altText: "Newspaper clipping 2",
        },
        {
            imageURL: news4,
            altText: "Newspaper clipping 2",
        },
        {
            imageURL: news5,
            altText: "Newspaper clipping 2",
        },

    ];

    const settings = {
        infinite: true,
        speed: 10000, // Slow continuous scrolling speed
        slidesToShow: 4, // Number of visible clippings
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
                    <span className="text-green-500">Nirdhan Sewa Sansthan</span> in the News
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

export default NewspaperClippings;
