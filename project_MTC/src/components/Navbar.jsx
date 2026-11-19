
  import { useState } from "react";
  import { Link } from "react-router-dom";
  import "./Navbar.css";
  import nav_img from "../assets/cumta_logo.png";
  import { useTheme } from "./ThemeContext";
  import { MdOutlineDarkMode } from "react-icons/md";
  import { GoSun } from "react-icons/go";



  const links = [
    { label: "Home", href: "/" },
    { label: "Maps", href: "/maps" },
    { label: "Datasets", href: "/dataset" },
  ];

  const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();


    return (
      <header style={{display:"flex", justifyContent:"space-around", padding:"0px 0px",  backgroundColor: theme === "light" ? "white" : "#363636",
        color: theme === "light" ? "black" : "white",}} className="navbar">

        <div style={{width:"50%"}} className="navbar__bar">

          <Link
            to="/"
            className="navbar__brand"
            onClick={() => setOpen(false)}
          >
            <img
              src={nav_img}
              alt="CUMTA logo"
              className="navbar__logo"
            />

            <span className="navbar__title">
              TRANSIT DATA CHENNAI
            </span>
          </Link>

          <button
            type="button"
            className={`navbar__toggle ${open ? "active" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>

        <nav style={{width:"20%"}} className={`navbar__menu ${open ? "is-open" : ""}`}>
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.href}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
                <button onClick={toggleTheme} style={{ fontSize:"20px", backgroundColor: theme === "light" ? "#363636" : "white",
        color: theme === "light" ? "white" : "black"}} className="theme-button">
        {theme === "light" ? <  MdOutlineDarkMode/> : <GoSun/> }
      </button>
        </nav>



      </header>
    );
  };

  export default Navbar;
