import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../components/utils/supabase"; // Assuming you have a file with Supabase setup
import { formatDistanceToNow } from "date-fns";

function Profile() {
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase.from("Posts").select("*");
        if (error) {
          throw error;
        }
        setPosts(data || []);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    const fetchUserData = async () => {
      try {
        const user = supabase.auth.getUser();
        setCurrentUser(user);

        // Fetch followers and following
        const { data: followersData, error: followersError } = await supabase
          .from("Users")
          .select("*")
          .eq("follower", true);

        const { data: followingData, error: followingError } = await supabase
          .from("Users")
          .select("*")
          .eq("following", true);

        if (followersError) {
          throw followersError;
        }
        if (followingError) {
          throw followingError;
        }

        setFollowers(followersData || []);
        setFollowing(followingData || []);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchPosts();
    fetchUserData();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFollowToggle = async (email, isFollowing) => {
    try {
      const updatedUsers = isFollowing
        ? followers.map((user) =>
            user.email === email
              ? { ...user, followers: !user.followers }
              : user
          )
        : following.map((user) =>
            user.email === email
              ? { ...user, following: !user.following }
              : user
          );

      if (isFollowing) {
        setFollowers(updatedUsers);
      } else {
        setFollowing(updatedUsers);
      }

      // Update the following status in the database
      await supabase
        .from("Users")
        .update({ following: !isFollowing })
        .eq("email", email);
    } catch (error) {
      console.error("Error toggling follow status:", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-xl p-4 mt-8">
        {/* Profile Header */}
        <div className="flex items-center mb-4">
          <img
            src="https://www.nicepng.com/png/detail/799-7998295_profile-placeholder-woman-720-profile-photo-placeholder-png.png"
            alt={currentUser?.full_name}
            className="w-24 h-24 rounded-full mr-8 "
          />
          <div className="mr-4 mt-6 ml-8">
            <p className="text-gray-500 text-xl font-semibold">John Doe</p>

            <div className="flex mt-4">
              <div className="mr-8">
                <p className=" font-normal text-xs  text-gray-400">Post : 10</p>
              </div>
              <div className="mr-8">
                <p className="font-normal text-xs text-gray-400">
                  Followers : {followers.length}
                </p>
              </div>
              <div>
                <p className="font-normal text-xs text-gray-400">
                  Following : {following.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex border-t  border-gray-300 mt-16 mb-4">
          <div className=" ">
            <button
              className={`py-2 px-4 mx-14 focus:outline-none ${
                activeTab === "posts"
                  ? "text-gray-600 border-t-2 border-gray-500 font-semibold"
                  : "text-gray-400"
              }`}
              onClick={() => handleTabChange("posts")}
            >
              Posts
            </button>
            <button
              className={`py-2 mx-14 focus:outline-none ${
                activeTab === "followers"
                  ? "text-gray-600 border-t-2 border-gray-500 font-semibold"
                  : "text-gray-400"
              }`}
              onClick={() => handleTabChange("followers")}
            >
              Followers
            </button>
            <button
              className={`py-2 mx-14 focus:outline-none ${
                activeTab === "following"
                  ? "text-gray-600 border-t-2 border-gray-500 font-semibold"
                  : "text-gray-400"
              }`}
              onClick={() => handleTabChange("following")}
            >
              Following
            </button>
          </div>
        </div>

        {/* Profile Content */}
        {activeTab === "posts" && (
          <div>
            {/* Display posts */}
            {posts.map((post) => (
              <div
                key={post.id}
                className="relative h-40 bg-white shadow-gray-200 shadow-sm rounded-xl p-4 mb-8 flex flex-row"
              >
                <div className="h-10 w-20">
                  <img
                    src="https://www.nicepng.com/png/detail/799-7998295_profile-placeholder-woman-720-profile-photo-placeholder-png.png"
                    alt="User "
                    className="w-12 h-12 rounded-full mr-4 ml-4"
                  />
                </div>
                <div className="h-auto w-3/4 pt-2">
                  <h1 className="text-lg ml-4 font-semibold text-gray-500">
                    John Doe
                  </h1>
                  <p className="absolute right-8 top-12 text-xs text-gray-400">
                    {formatDistanceToNow(new Date(post.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                  <p className="mt-6 text-sm align-middle text-gray-400">
                    {post.content}
                  </p>
                </div>
                {/* Semi-circle */}
                <div className="absolute top-16 right-0 h-10 w-5 bg-primary rounded-full rounded-r-none"></div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "following" && (
          <div>
            {/* Display following */}
            <div className="mx-auto py-4 max-w-lg">
              {following.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center border-b-2 border-slate-200 h-32 p-4 mb-4"
                >
                  <img
                    src="https://www.nicepng.com/png/detail/799-7998295_profile-placeholder-woman-720-profile-photo-placeholder-png.png"
                    alt="User"
                    className="w-12 h-12 rounded-full mr-4"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg text-gray-400 font-semibold">
                      {user.name}
                    </h3>
                    <p className="text-xs text-gray-300 mt-1">Following: 200</p>
                  </div>
                  <button
                    className={`px-5 py-1 rounded-lg font-medium ${
                      user.following
                        ? "bg-white text-gray-400 mr-1"
                        : "bg-primary text-white mr-4"
                    } ml-auto`}
                    onClick={() => handleFollowToggle(user.email, false)}
                  >
                    {user.following ? "Following" : "Follow"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "followers" && (
          <div>
            {/* Display followers */}
            <div className="mx-auto py-4 max-w-lg">
              {followers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center border-b-2 border-slate-200 h-32 p-4 mb-4"
                >
                  <img
                    src="https://www.nicepng.com/png/detail/799-7998295_profile-placeholder-woman-720-profile-photo-placeholder-png.png"
                    alt="User"
                    className="w-12 h-12 rounded-full mr-4"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg text-gray-400 font-semibold">
                      {user.name}
                    </h3>
                    <p className="text-xs text-gray-300 mt-1">Following: 200</p>
                  </div>
                  <button
                    className={`px-5 py-1 rounded-lg font-medium ${
                      user.followers
                        ? "bg-white text-gray-400 mr-1"
                        : "bg-primary text-white mr-4"
                    } ml-auto`}
                    onClick={() => handleFollowToggle(user.email, true)}
                  >
                    {user.followers ? "Following" : "Follow"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
