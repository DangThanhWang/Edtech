// client/src/pages/HomePage.jsx
import React from 'react';
import '../styles/pages/home.css';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import PopularSetsSection from '../components/home/PopularSetsSection';
import CTASection from '../components/home/CTASection';

const HomePage = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <FeaturesSection />
      <PopularSetsSection />
      <CTASection />
    </div>
  );
};

export default HomePage;