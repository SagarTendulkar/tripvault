import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User info:", user);
      alert(`Welcome ${user.displayName}`);
      navigate("/home");
    } catch (error) {
      console.error("Error during sign-in:", error.message);
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">TripVault Login</h1>
      <button
        onClick={handleGoogleLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow"
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
