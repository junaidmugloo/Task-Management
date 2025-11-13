import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const token = useAuthStore((s) => s.token);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // OAuth2 requires form-data
      const data = new FormData();
      data.append("username", form.username);
      data.append("password", form.password);

      const res = await api.post("/auth/login", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Save token in Zustand
      setAuth(res.data.access_token, { username: form.username }, 3600);

      toast.success("Login successful!");

      navigate("/");
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Login failed!";
     
        document.body.insertAdjacentHTML("beforeend", `<div class='fixed top-5 right-5 bg-red-600 text-white px-4 py-2 rounded shadow animate-pulse'>${message}</div>`);

    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Login">
      <form onSubmit={submit} className="space-y-4">
        
        {/* Username */}
        <input
          className="w-full border rounded-lg p-3 bg-gray-50 dark:bg-gray-700 
                     text-gray-900 dark:text-gray-200"
          placeholder="Enter Email"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          required
        />

        {/* Password */}
        <input
          className="w-full border rounded-lg p-3 bg-gray-50 dark:bg-gray-700 
                     text-gray-900 dark:text-gray-200"
          placeholder="Enter Password"
          type="password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        {/* Submit Button */}
        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg 
                     hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <p className="text-center text-gray-500 dark:text-gray-300">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
