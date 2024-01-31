import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { supabase } from "../utils/supabase";

function Login() {
  const [email, setEmail] = useState("test@email.com");
  const [password, setPassword] = useState("123456");
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  async function handleLogin() {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw error;
      }

      // Navigate to the home page only if login was successful
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging in:", error.message);
      // Handle login error, display error message, etc.

      // Check if error message indicates invalid login credentials
      if (
        error.message === "Invalid login credentials" ||
        error.message === "Invalid user credentials"
      ) {
        // Display an alert for invalid login credentials
        alert("Invalid email or password. Please try again.");
      }
    }
  }

  const goToSignup = () => {
    // Navigate to the signup page
    navigate("/signup");
  };

  return (
    <div className="flex flex-row">
      <div className="basis-1/2 px-20 ">
        <h1 className="text-3xl font-bold text-primary py-8  ">TweetX</h1>
        {/* Use onClick event to call goToSignup function */}
        <button
          onClick={goToSignup}
          className="border-black border rounded-lg h-10 w-48 font-medium"
        >
          Create account
        </button>
        <div className="pt-16 pb-12">
          <p className="text-gray-500 text-3xl font-semibold pb-10">Login</p>
          <div className="py-3">
            <input
              placeholder="Email"
              className="bg-gray-100 font-sans rounded-md h-12 w-96 px-4"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="py-4 pb-8">
            <input
              placeholder="Password"
              className="bg-gray-100 font-sans rounded-md h-12 w-96 px-4 pb"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="relative h-10 w-96">
            <a className="pr-36 font-semibold">Forget Password?</a>
            <button
              onClick={handleLogin}
              className="bg-primary absolute bottom-0 right-0 text-white h-10 w-28 font-semibold rounded-md"
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="basis-1/2">
        <img
          src="/Humaans.png" // Assuming Humaans.png is directly inside the 'public' folder
          alt="Image"
          className="max-w-full h-screen"
        />
      </div>
    </div>
  );
}

export default Login;
