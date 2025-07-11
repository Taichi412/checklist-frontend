// src/pages/Login.js
import axios from "axios";
import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ヘッダー認証に切り替え：withCredentials は不要
      const { data } = await axios.post(
        `${API_URL}/api/login`,
        { email, password }
      );

      // サーバーから返ってきたトークンを保存
      const { token } = data;
      localStorage.setItem("jwtToken", token);

      // 以降のリクエストに Authorization ヘッダーを自動セット
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // ログイン成功 → ルートへ遷移
      window.location.href = "/";
    } catch (err) {
      console.error("Login error:", err);
      setError("ログインに失敗しました。メールアドレスまたはパスワードが間違っています。");
    }
  };

  return (
    <div className="login-container">
      <h2>ログイン</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

