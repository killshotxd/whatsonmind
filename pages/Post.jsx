import { auth, db } from "../utils/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { toast, Toast } from "react-toastify";

export default function Post() {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const routeData = route.query;
  // Form state
  const [post, setPost] = useState({ description: "" });

  //   Submit
  const submitPost = async (e) => {
    e.preventDefault();

    // Run Checks for Des
    if (!post.description) {
      toast.error("Description Field is empty 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }

    if (post.description.length > 300) {
      toast.error("Description too long 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }

    if (post?.hasOwnProperty("id")) {
      const docRef = doc(db, "posts", post.id);
      const updatedPost = { ...post, timeStamp: serverTimestamp() };
      await updateDoc(docRef, updatedPost);
      return route.push("/");
    } else {
      // New post
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...post,
        timeStamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        userName: user.displayName,
      });
      setPost({ description: "" });
      return route.push("/");
    }
  };

  // Edit User

  const checkUser = async () => {
    if (loading) return;
    if (!user) route.push("/auth/Login");
    if (routeData.id) {
      setPost({ description: routeData.description, id: routeData.id });
    }
  };

  useEffect(() => {
    checkUser();
  }, [user, loading]);

  return (
    <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
      <form onSubmit={submitPost}>
        <h1 className="text-2xl font-bold">
          {post.hasOwnProperty("id") ? "Edit your Post" : "Create a new Post"}
        </h1>
        <div className="py-2">
          <h3 className=" text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm"
          ></textarea>
          <p
            className={`text-cyan-600 font-medium text-sm ${
              post.description.length > 300 ? "text-red-600" : ""
            }`}
          >
            {post.description.length}/300
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
