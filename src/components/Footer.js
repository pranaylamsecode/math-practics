import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© 2025 PSL Solutions. All rights reserved.</p>
      <div>
        <a href="#" style={styles.link}>Facebook</a>
        <a href="#" style={styles.link}>Instagram</a>
        <a href="#" style={styles.link}>LinkedIn</a>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#111",
    color: "#ccc",
    textAlign: "center",
    padding: "30px 20px",
    marginTop: "50px",
  },
  link: {
    margin: "0 10px",
    color: "#FFD700",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Footer;
