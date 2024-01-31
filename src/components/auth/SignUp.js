import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";

function SignUp() {
  const navigate = useNavigate(); // Initialize useNavigate

  const goToLogin = () => {
    navigate("/login"); // Navigate to the login page
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    try {
      // Check if password and confirm password match
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Sign up with Supabase
      const { user, session, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("User already registered")) {
          // Show alert if user already exists with the provided email
          alert("An account already exists with this email");
        } else {
          throw error;
        }
      } else {
        // Insert email and name into Users table
        const { data, error: insertError } = await supabase
          .from("Users")
          .insert([{ email, name, follower: true, following: true }]);

        if (insertError) {
          throw insertError;
        }

        // Show success message
        alert("Account created successfully!");

        // Redirect to login page after successful sign-up
        navigate("/login");
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
      // Handle sign-up error, display error message, etc.

      // Show alert if password and confirm password do not match
      if (error.message === "Passwords do not match") {
        alert("Passwords do not match");
      } else {
        alert("Failed to sign up. Please try again later.");
      }
    }
  };

  return (
    <div className="flex flex-row">
      <div className="basis-1/2 px-20 ">
        <h1 className="text-3xl font-bold text-primary py-8">TweetX</h1>
        <button
          onClick={goToLogin}
          className="border-black border rounded-lg h-10 w-48 font-medium"
        >
          Log in
        </button>
        <div className="pt-16 pb-12">
          <p className="text-gray-500 text-3xl font-semibold pb-10">
            Create Account
          </p>
          <div className="py-3">
            <input
              placeholder="Name"
              className="bg-gray-100 font-sans rounded-md h-12 w-96 px-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="py-4">
            <input
              placeholder="Email"
              className="bg-gray-100 font-sans rounded-md h-12 w-96 px-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="py-4">
            <input
              type="password"
              placeholder="Password"
              className="bg-gray-100 font-sans rounded-md h-12 w-96 px-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="py-4">
            <input
              type="password"
              placeholder="Confirm Password"
              className="bg-gray-100 font-sans rounded-md h-12 w-96 px-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="relative h-10 w-96">
            <button
              onClick={handleSignUp}
              className="bg-primary absolute bottom-0 right-0 text-white h-10 w-28 font-semibold rounded-md"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <div className="basis-1/2">
        <img src="/Humaans.png" alt="Image" className="max-w-full h-screen" />
      </div>
    </div>
  );
}

export default SignUp;
