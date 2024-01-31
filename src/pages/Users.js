import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../components/utils/supabase"; // Import the Supabase client

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch users from the User table in Supabase
        const { data, error } = await supabase.from("Users").select("*");

        if (error) {
          throw error;
        }

        // Set the fetched users in state
        setUsers(data || []);
      } catch (error) {
        console.error("Error fetching users:", error.message);
        // Handle error fetching users
      }
    };

    // Call the fetchUsers function when the component mounts
    fetchUsers();
  }, []);

  const handleFollowToggle = async (email) => {
    try {
      // Find the user by email in the users state array
      const updatedUsers = users.map(async (user) => {
        if (user.email === email) {
          // Toggle the following status
          const newFollowingStatus = !user.following;

          // Update the following status directly in the database
          try {
            const { error } = await supabase
              .from("Users")
              .update({ following: newFollowingStatus })
              .eq("email", email)
              .select();

            if (error) {
              throw error;
            }

            console.log("Following status updated successfully");
          } catch (error) {
            console.error("Error updating following status:", error.message);
            // Handle error updating following status
          }

          // Return the updated user object
          return { ...user, following: newFollowingStatus };
        }
        return user;
      });

      // Wait for all update promises to resolve
      const resolvedUsers = await Promise.all(updatedUsers);

      // Update the users state with the updated array
      setUsers(resolvedUsers);
    } catch (error) {
      console.error("Error toggling follow status:", error.message);
      // Handle error toggling follow status
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-auto py-10 max-w-lg">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center border-b-2 border-slate-200 h-32 p-4 mb-4"
          >
            <img
              src="https://www.nicepng.com/png/detail/799-7998295_profile-placeholder-woman-720-profile-photo-placeholder-png.png"
              alt="User Photo"
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
              onClick={() => handleFollowToggle(user.email)}
            >
              {user.following ? "Following" : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
