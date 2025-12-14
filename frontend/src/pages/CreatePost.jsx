
import { useState } from "react";
import { apiRequest } from "../api/api";
import Navbar from "../components/Navbar";

export default function CreatePost() {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  const handlePost = async () => {
    await apiRequest("/posts","POST",{imageUrl,caption});
    alert("Post created");
    window.location.href="/feed";
  };

  return (
    <>
      <Navbar />
      <div style={{maxWidth:"400px",margin:"80px auto"}}>
        <h2>Create Post</h2>
        <input placeholder="Image URL" onChange={e=>setImageUrl(e.target.value)} />
        <input placeholder="Caption" onChange={e=>setCaption(e.target.value)} />
        <button onClick={handlePost}>Post</button>
      </div>
    </>
  );
}
