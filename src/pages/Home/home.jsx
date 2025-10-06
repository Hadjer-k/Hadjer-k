import React from "react";
import AboutUs from "./aboutus";
import laptop from "../../assets/laptop.jpg"; 
import Nav from "../Navbar/nav";
import OurServices from "./ourservices";
import ContactUs from "./contactus";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home overflow-x-hidden scroll-smooth font-sans">
      <div
        className="flex h-screen w-full items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${laptop})` }}
      >
        {/* Navbar */}
        <Nav />

        {/* Titre en haut à gauche */}
        <div className="absolute top-40 left-10 text-left">
          <h1 className="text-5xl font-mono text-black drop-shadow-lg leading-snug tracking-wide">
            Bienvenue <br /> au site officiel <br /> du CDI Bouira
          </h1>
        </div>

        {/* Bouton Se connecter en bas à droite */}
        <div className="absolute bottom-10 right-10">
          <Link
            to="/login"
            className="px-6 py-3 bg-[#521E9B] text-white font-semibold rounded-xl shadow-md hover:bg-[#3e1678] transition duration-300"
          >
            Se connecter
          </Link>
        </div>
      </div>

      {/* Sections avec IDs */}
      <section id="about">
        <AboutUs />
      </section>

      <section id="services">
        <OurServices />
      </section>

      <section id="contact">
        <ContactUs />
      </section>
    </div>
  );
};

export default Home;
