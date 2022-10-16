import { auth } from "../utils/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { async } from "@firebase/util";

export default function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  // Checks

  const getData = async () => {
    if (loading) return;
    if (!user) return route.push("auth/Login");
  };

  useEffect(() => {
    getData();
  }, [user, loading]);
  return (
    <div>
      <h1>Your posts</h1>
      <div>posts</div>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
}
