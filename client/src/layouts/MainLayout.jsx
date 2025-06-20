// client/src/layouts/MainLayout.jsx
import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;