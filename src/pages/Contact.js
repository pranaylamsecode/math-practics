import React, { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !message) {
      setError("Please fill all fields.");
      setSuccess(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      setSuccess(false);
      return;
    }

    // If valid, show success
    setError("");
    setSuccess(true);

    // Reset form fields
    setName("");
    setEmail("");
    setMessage("");

    // Here you could send data to an API instead
    console.log({ name, email, message });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Contact Us</h2>
      <p style={styles.text}>Email: pranaylamsecode@gmail.com</p>
      <p style={styles.text}>Phone: +91 9284154036</p>

      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>Message sent successfully!</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="5"
          style={{ ...styles.input, resize: "none" }}
        />
        <button type="submit" style={styles.button}>
          Send Message
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "80px 20px",
    textAlign: "center",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    minHeight: "80vh",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
    color: "#FFD700",
  },
  text: {
    fontSize: "18px",
    lineHeight: "1.6",
    color: "#ccc",
    marginBottom: "10px",
  },
  form: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  input: {
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #444",
    backgroundColor: "#333",
    color: "#fff",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#FFD700",
    color: "#111",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s",
  },
  error: {
    color: "red",
    marginTop: "15px",
    marginBottom: "15px",
  },
  success: {
    color: "lightgreen",
    marginTop: "15px",
    marginBottom: "15px",
  },
};

export default Contact;
