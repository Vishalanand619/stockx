import Navbar from "../components/Navbar";
import React from "react";
import { useState } from "react";
import { registerUser } from "../services/authService";



const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await registerUser(name, email, password);
      alert("Registered successfully");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Register failed");
    }
  };
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="flex justify-center items-center mt-20 px-4">
        <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md border border-gray-800">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Create Account
          </h2>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-green-400"

              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-green-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-green-400"
            />

            <button type="button"
              onClick={handleRegister} className="bg-green-500 hover:bg-green-400 text-black py-3 rounded-lg font-semibold">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
