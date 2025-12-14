
import { useState } from "react";
import { apiRequest } from "../api/api";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await apiRequest("/auth/signup", "POST", { username, email, password });
    alert(res.message);
    if (!res.error) window.location.href = "/";
  };

  return (
    <div style={{maxWidth:"300px",margin:"100px auto"}}>
      <h2>Signup</h2>
      <input placeholder="Username" onChange={e=>setUsername(e.target.value)} />
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}
