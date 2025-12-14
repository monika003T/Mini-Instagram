
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";
import Navbar from "../components/Navbar";

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(()=>{
    apiRequest(`/users/${id}`).then(setProfile);
  },[id]);

  if(!profile) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div style={{padding:"20px"}}>
        <h2>{profile.user.username}</h2>
        <p>Followers: {profile.followersCount}</p>
        <p>Following: {profile.followingCount}</p>
        <p>Posts: {profile.postsCount}</p>
      </div>
    </>
  );
}
