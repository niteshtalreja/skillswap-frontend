import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card variant="dark" className="max-w-md w-full">
        <h2 className="text-2xl font-heading font-bold text-white text-center">Welcome Back</h2>
        <p className="text-gray-400 text-center mt-2">Login to continue your skill journey</p>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-dark border border-border rounded-lg text-white focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 bg-dark border border-border rounded-lg text-white focus:ring-2 focus:ring-primary"
            required
          />
          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "🚀 Login"}
          </Button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          New here? <Link to="/register" className="text-primary hover:text-primary/80">Register</Link>
        </p>
      </Card>
    </div>
  );
}