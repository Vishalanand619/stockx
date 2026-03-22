import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);

      localStorage.setItem("stockx_token", data.token);

      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="flex justify-center items-center mt-20 px-4">
        <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md border border-gray-800">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Login to StockX
          </h2>

          <form className="flex flex-col gap-4">

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="p-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-green-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="p-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-green-400"
            />

            <button
              type="button"
              onClick={handleLogin}
              className="bg-green-500 hover:bg-green-400 text-black py-3 rounded-lg font-semibold"
            >
              Login
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;