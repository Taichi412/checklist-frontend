import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const API_URL = process.env.REACT_APP_API_URL;
 // ← 実際に Node.js が動いてるPCのローカルIP
 // ← ローカル用エンドポイント

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signing up with:", email, password);

    try {
      const response = await axios.post(
        `${API_URL}/api/signup`,
        { email, password },
        { withCredentials: true } // ✅ Cookie対応を追加
      );

      console.log("✅ Signup success:", response.data);
      navigate("/login");
    } catch (err) {
      console.error("❌ Signup failed:", err);
      if (err.response && err.response.status === 409) {
        setError("このメールアドレスはすでに使われています。");
      } else {
        setError("登録に失敗しました。ネットワークやサーバーを確認してください。");
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>サインアップ</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">登録</button>
      </form>
    </div>
  );
}

export default Signup;


