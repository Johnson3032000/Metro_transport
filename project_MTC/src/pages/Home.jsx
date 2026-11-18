import nav_img from "../assets/cumta_logo.png";
import "./Home.css";

import AgencyCards from "../components/AgencyCards";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { useEffect, useState } from "react";

function Home() {

  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const target = 1041;
  const Indexed_count = 500;
  const Transportation_Agencies = 3;

  useEffect(() => {
    if (count < target || count1 < Indexed_count) {
      const timer = setTimeout(() => {
        setCount(prev => Math.min(prev + 25, target)); // Increases by 25 every step
        setCount1(prev => Math.min(prev + 25, Indexed_count)); // Increases by 25 every step
        setCount2(prev => Math.min(prev + 25, Transportation_Agencies)); // Increases by 25 every step


      }, 30); // Speed of the counter

      return () => clearTimeout(timer);
    }
  }, [count, target]);


  return (
    <div className="home-container" id="home">

        {/* <nav className="navbar">

        <div className="nav-logo">
          <img src={nav_img} alt="CUMTA Logo" />

          <h3>TRANSIT DATA CHENNAI</h3>
        </div>

        <div className="nav-links">
          <a href="#home">HOME</a>
          <a href="#map">MAP</a>
          <a href="#datasets">DATASETS</a>
        </div>

      </nav> */}

      {/* <Navbar/> */}


      {/* HERO SECTION */}
      {/* <section className="hero-section">

        <div className="hero-content">

          <div className="hero-text">

            <h1>
              The Open Data Backbone for
              <br />
              Chennai’s Mobility.
            </h1>

            <p>
              A unified repository for static GTFS datasets,
              network visualizations for the Chennai
              Metropolitan Area.
            </p>

          </div>

          <div className="hero-image">

            <img src={srimg} alt="Chennai Transportation" />

          </div>

        </div>

      </section> */}

      <Hero/>





      {/* STATISTICS SECTION */}
      <section className="statistics-section">

        <div className="stat-card">
          <p>Total Indexed Routes</p>
          <h1>{count.toLocaleString()}</h1>
        </div>

        <div className="stat-card">
          <p>Total Indexed Stations</p>
          <h1>{count1.toLocaleString()}+</h1>
        </div>

        <div className="stat-card">
          <p>Transportation Agencies</p>
          <h1>{count2}</h1>
        </div>

      </section>


      {/* FEATURES SECTION */}
      <section className="features-section">

        <div className="feature-card">

          <h2>Interactive Network Map</h2>

          <p>
            Explore multi-modal transit corridors,
            stop locations, and static schedule visualizations.
          </p>

          <a href="#map">Launch Viewer →</a>

        </div>


        <div className="feature-card">

          <h2>Transportation Datasets</h2>

          <p>
            Access transportation datasets, route information,
            station details, and other mobility information.
          </p>

          <a href="#datasets">Explore Datasets →</a>

        </div>

      </section>


      {/* STAKEHOLDERS SECTION */}
      <section className="stakeholders-section" id="stakeholders">

        <div className="section-heading">

          <h2>Key Stakeholders</h2>

          <div className="heading-line"></div>

        </div>

        <AgencyCards />

      </section>


      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default Home;
