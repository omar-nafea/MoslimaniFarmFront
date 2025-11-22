import React from 'react';
import farmHero from '../assets/images/farm-hero.jpg';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <img src={farmHero} alt="Moslimani Farm" className="about-hero-img" />
        <div className="about-hero-content">
          <h1>Our Story</h1>
          <p>Cultivating nature's best since 1995.</p>
        </div>
      </section>

      <div className="container about-content">
        <section className="about-section">
          <h2>Who We Are</h2>
          <p>
            Moslimani Farm is a family-owned business dedicated to growing the finest fruits in the region.
            What started as a small passion project has grown into a thriving farm that serves thousands of happy customers.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We believe that everyone deserves access to fresh, chemical-free produce. Our mission is to bridge the gap between
            the farm and your table, ensuring that you get the freshest fruits within 24 hours of harvest.
          </p>
        </section>

        <section className="about-section">
          <h2>Why Farm-to-Home?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Peak Freshness</h3>
              <p>Fruits are picked only when they are perfectly ripe, ensuring maximum flavor and nutrition.</p>
            </div>
            <div className="feature-card">
              <h3>Sustainable</h3>
              <p>By cutting out the middleman, we reduce food miles and waste, making our process eco-friendly.</p>
            </div>
            <div className="feature-card">
              <h3>Community</h3>
              <p>Supporting local farmers helps build a stronger, healthier community for everyone.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
