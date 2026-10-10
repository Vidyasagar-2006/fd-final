import { useState, useEffect } from "react";
import "./App.css";

function UserCard({ name, email, city }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{email}</p>
      <small>{city}</small>
    </div>
  );
}

export default function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Server error: " + res.status);
        return res.json();
      })
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <nav className="navbar">User Directory</nav>
      <input
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="grid">
        {filtered.map((u) => (
          <UserCard key={u.id} name={u.name} email={u.email} city={u.address.city} />
        ))}
      </div>
    </div>
  );
}