import { useEffect, useState } from "react";
import { supabase } from "./supabase"; // Adjust the import path

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: session, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        console.log("Fetched session data:", session);
        if (session && session.user) {
          setUser(session.user);
        }
      } catch (error) {
        console.error("Error fetching session:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const authListener = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed, new session:", session);
      if (session && session.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    setSubscription(authListener);

    return () => {
      console.log("Unsubscribed from auth state change");
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  console.log("Current user:", user);

  return { user, loading };
};

export default useAuth;
