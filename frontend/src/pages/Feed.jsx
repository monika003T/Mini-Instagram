
import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";
import Navbar from "../components/Navbar";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    apiRequest("/feed").then(setPosts);
  }, []);

  return (
    <>
      <Navbar />
      <div style={{padding:"20px"}}>
        {posts.length === 0 && <p>No posts to show</p>}
        {posts.map(p => (
          <div key={p._id} style={{border:"1px solid #444",padding:"15px",marginBottom:"20px"}}>
            <b>{p.user.username}</b>
            <img src={p.imageUrl} width="100%" />
            <p>{p.caption}</p>
            <p>❤️ {p.likeCount}</p>
          </div>
        ))}
      </div>
    </>
  );
}
