import React, { useState } from "react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login or registration logic here
    alert(`${isLogin ? "Login" : "Register"} submitted with ${email}`);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>

        <p style={{ marginTop: "15px", fontSize: "0.9rem", color: "#555" }}>
          {isLogin ? "Need to register?" : "Already have an account?"}{" "}
          <span
            style={{ color: "#ff91a6", cursor: "pointer", fontWeight: "bold" }}
            onClick={toggleMode}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}