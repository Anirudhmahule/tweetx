import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../components/utils/supabase";
import { formatDistanceToNow } from "date-fns";

function Feed() {
  const [tweets, setTweets] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const { data, error } = await supabase.from("Posts").select("*");

      if (error) {
        throw error;
      }

      setTweets(data || []);
    } catch (error) {
      console.error("Error fetching tweets:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("Posts")
        .insert([{ content: newPostContent, name: "John Doe" }]); // Remove extra comma

      if (error) {
        throw error;
      }

      setNewPostContent(""); // Clear input field after submission
      fetchTweets(); // Refresh tweets
    } catch (error) {
      console.error("Error adding tweet:", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-auto my-6 max-w-xl">
        <form onSubmit={handleSubmit}>
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Write your tweet..."
            className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-primary text-white h-10 w-24 font-semibold rounded-md mb-4"
          >
            Write
          </button>
        </form>
        {tweets.map((tweet) => (
          <div
            key={tweet.id}
            className="relative h-40 bg-white shadow-gray-200 shadow-sm rounded-xl p-4 mb-8 flex flex-row"
          >
            <div className="h-10 w-20">
              <img
                src="https://www.nicepng.com/png/detail/799-7998295_profile-placeholder-woman-720-profile-photo-placeholder-png.png"
                alt="User Photo"
                className="w-12 h-12 rounded-full mr-4 ml-4"
              />
            </div>
            <div className="h-auto w-3/4 pt-2">
              <h1 className="text-lg ml-4 font-semibold text-gray-500">
                {tweet.name}
              </h1>
              <p className="absolute right-8 top-12 text-xs text-gray-400">
                {formatDistanceToNow(new Date(tweet.created_at))} ago
              </p>
              <p className="mt-6 text-sm align-middle text-gray-400">
                {tweet.content}
              </p>
            </div>
            {/* Semi-circle */}
            <div className="absolute top-16 right-0 h-10 w-5 bg-primary rounded-full rounded-r-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
