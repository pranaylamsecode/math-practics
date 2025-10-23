import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={styles.header}>
      {/* Logo + Title */}
      <div style={styles.logoContainer}>
        <img src="/logo.png" alt="Math Practis Logo" style={styles.logo} />
        <h1 style={styles.title}>
          <Link to="/" style={styles.link}>
            <span style={{ color: "#FFD700" }}>Math </span>{" "}
            <span style={{ color: "#00BFFF" }}>Practis</span>
          </Link>
        </h1>
      </div>

      {/* Hamburger button for mobile */}
      <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* Navigation */}
      <nav
        style={{
          ...styles.nav,
          ...(menuOpen ? styles.navOpen : {}),
        }}
      >
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/contact" style={styles.link}>
          Contact
        </Link>
        <Link to="/login" style={styles.link}>
          Admin Login
        </Link>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#111",
    color: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
    position: "relative",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: 1,
  },
  logo: {
    width: "40px",
    height: "40px",
    objectFit: "contain",
    filter: "invert(100%)",
  },
  title: {
    fontSize: "22px",
    margin: 0,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  nav: {
    display: "flex",
    gap: "15px",
  },
  navOpen: {
    position: "absolute",
    top: "60px",
    right: "20px",
    background: "#222",
    flexDirection: "column",
    padding: "10px 20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
  },
  link: {
    color: "#FFD700",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "color 0.3s",
  },
  hamburger: {
    display: "none",
    fontSize: "24px",
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
};

// Add a small CSS media query with plain CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @media (max-width: 768px) {
    nav {
      display: none;
    }
    button {
      display: block !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Header;
