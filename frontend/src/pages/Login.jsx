
import { useState } from "react";
import { apiRequest } from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const data = await apiRequest("/auth/login", "POST", { email, password });
    setLoading(false);

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/feed";
    } else {
      setError(data.error || "Invalid credentials");
    }
  };

  return (
    <div style={styles.box}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>{loading ? "Logging in..." : "Login"}</button>
      {error && <p style={{color:"red"}}>{error}</p>}
    </div>
  );
}

const styles = {
  box: {
    maxWidth: "300px",
    margin: "100px auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }
};
