import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // MVP: allow selecting role for testing. You can remove later.
  const [role, setRole] = useState("member");

  const [err, setErr] = useState("");
  const nav = useNavigate();
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await api.post("/auth/register", { name, email, password, role });
      login(data);
      nav("/events");
    } catch (e) {
      setErr(e?.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h2 className="text-2xl font-bold">Register</h2>
      <form onSubmit={submit} className="mt-6 space-y-3">
        <input className="w-full border rounded p-2" placeholder="Name" value={name}
          onChange={(e) => setName(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Password" type="password" value={password}
          onChange={(e) => setPassword(e.target.value)} />

        <div className="flex items-center justify-between border rounded p-2">
          <span className="text-sm text-gray-700">Role (MVP testing)</span>
          <select className="border rounded p-1" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="member">member</option>
            <option value="admin">admin</option>
          </select>
        </div>

        {err && <p className="text-sm text-red-600">{err}</p>}
        <button className="w-full bg-black text-white rounded p-2">Create account</button>
      </form>

      <p className="mt-3 text-sm">
        Already have an account? <Link className="underline" to="/login">Login</Link>
      </p>
    </div>
  );
}
