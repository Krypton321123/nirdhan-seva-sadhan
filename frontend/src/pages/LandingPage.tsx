import React from "react";

import HeroWithOverlay from "../components/LandingPage/Hero";
import OurImpactSection from "../components/LandingPage/OurImpact";
import WriteToUsSection from "../components/LandingPage/WriteToUs";
import LatestStoriesSlider from "../components/LandingPage/LatestStories";
import CampaignsPageSection from "../components/LandingPage/Campaigns";
import NewspaperClippings from "../components/LandingPage/NewspaperClippings.tsx";
import Clothes from "../components/LandingPage/Clothes.tsx";

const LandingPage: React.FC = () => {
  return (
    <div className="w-full">
      <HeroWithOverlay />
         <Clothes />
        <NewspaperClippings />
      <LatestStoriesSlider />

      <OurImpactSection />
      <CampaignsPageSection />

      <WriteToUsSection />

      <section className="py-16 px-4 lg:px-8 bg-gray-100 text-center">
        <h2 className="text-2xl lg:text-4xl font-bold text-gray-800">
          Together, We Make a Difference
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Discover how your contributions are transforming lives and creating a
          better world.
        </p>
      </section>
    </div>
  );
};

export default LandingPage;
