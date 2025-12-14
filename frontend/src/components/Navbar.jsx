
import { logout } from "../api/auth";

export default function Navbar() {
  return (
    <div style={styles.nav}>
      <h3>Mini Instagram</h3>
      <div style={styles.links}>
        <a href="/feed">Feed</a>
        <a href="/create">Create</a>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 32px",
    borderBottom: "1px solid #333"
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center"
  }
};
