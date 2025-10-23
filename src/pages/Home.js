import React from "react";

import MathQuiz from "../mathquize";

const services = [
  {
    title: "SEO Optimization",
    description: "Improve your search engine rankings.",
  },
  {
    title: "Social Media Marketing",
    description: "Grow your presence on social platforms.",
  },
  {
    title: "Content Marketing",
    description: "Create content that engages and converts.",
  },
  {
    title: "Website Design",
    description: "Modern websites that attract and retain users.",
  },
];

const techStack = [
  "React.js",
  "Next.js",
  "Laravel",
  "Node.js",
  "MySQL",
  "Tailwind CSS",
  "Bootstrap",
  "JavaScript",
  "PHP",
];

const partners = [
  { name: "Google", logo: "/google-logo.png" },
  { name: "Meta", logo: "/meta-logo.png" },
  { name: "AWS", logo: "/aws-logo.png" },
  { name: "Vercel", logo: "/vercel-logo.png" },
  { name: "DigitalOcean", logo: "/digitalocean-logo.jpg" },
];

const Home = () => {
  return (
    <div style={styles.container}>
      <MathQuiz />
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#111",
    color: "#fff",
    minHeight: "100vh",
  },
  hero: {
    textAlign: "center",
    padding: "100px 20px",
    backgroundColor: "#1a1a1a",
  },
  heroTitle: {
    fontSize: "48px",
    color: "#FFD700",
    marginBottom: "20px",
  },
  heroText: {
    fontSize: "20px",
    marginBottom: "30px",
    color: "#ccc",
  },
  heroButton: {
    padding: "12px 30px",
    borderRadius: "5px",
    backgroundColor: "#FFD700",
    color: "#111",
    textDecoration: "none",
    fontWeight: "bold",
  },
  services: {
    padding: "80px 20px",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "36px",
    marginBottom: "50px",
    color: "#FFD700",
  },
  cards: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
  },
  card: {
    backgroundColor: "#222",
    padding: "30px",
    borderRadius: "10px",
    width: "250px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
    transition: "transform 0.3s",
  },
  cardTitle: {
    fontSize: "22px",
    marginBottom: "10px",
    color: "#FFD700",
  },
  cardDesc: {
    fontSize: "16px",
    color: "#ccc",
  },

  // Technology Stack
  techStackSection: {
    padding: "80px 20px",
    textAlign: "center",
    backgroundColor: "#1a1a1a",
  },
  techGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  techItem: {
    backgroundColor: "#222",
    padding: "15px",
    borderRadius: "8px",
    fontWeight: "bold",
    color: "#FFD700",
    fontSize: "16px",
    border: "1px solid #333",
  },

  // Partners Marquee
  partnersSection: {
    backgroundColor: "#000",
    padding: "30px 0",
    overflow: "hidden",
    marginTop: "40px",
  },
  marquee: {
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  marqueeContent: {
    display: "inline-flex",
    animation: "marquee 20s linear infinite",
  },
  partnerItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 50px",
  },
  partnerLogo: {
    height: "40px",
    objectFit: "contain",
    /* filter: "brightness(0) invert(1)", */
  },
};

// Add keyframes dynamically
const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Home;
