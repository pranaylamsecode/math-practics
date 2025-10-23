import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const admin = {
    email: "admin@aurastha.com",
    password: "Admin123"
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return;
    }

    // Check credentials
    if (email === admin.email && password === admin.password) {
      setError("");
      setSuccess(true);

      console.log("Login Success!");
    } else {
      setError("Invalid email or password.");
      setSuccess(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Login</h2>
      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>Login Successful!</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            placeholder="admin@aurastha.com"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            placeholder="Admin123"
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "80px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    minHeight: "80vh",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
    color: "#FFD700",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    backgroundColor: "#222",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#FFD700",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #444",
    backgroundColor: "#333",
    color: "#fff",
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#FFD700",
    color: "#111",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  error: {
    color: "red",
    marginBottom: "15px",
  },
  success: {
    color: "lightgreen",
    marginBottom: "15px",
  },
};

export default Login;
