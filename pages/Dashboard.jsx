/* eslint-disable */

import { auth, db } from "../utils/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { async } from "@firebase/util";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Message from "../components/Message";
import { BsTrash2Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";
import { BounceLoader } from "react-spinners";
import { RoughNotation } from "react-rough-notation";

export default function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  // Checks

  const getData = async () => {
    if (loading) return;
    if (!user) return route.push("auth/Login");
    setLoader(true);
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoader(false);
    });
    return unsubscribe;
  };

  // Deleting post

  const deletePost = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };

  useEffect(() => {
    getData();
  }, [user, loading]);
  return (
    <div>
      <RoughNotation type="highlight" color="#06B6D4" show={true}>
        <h1 className="text-xl width-full font-medium flex justify-center align-center">
          Your posts
        </h1>
      </RoughNotation>
      {!loader ? (
        <div>
          {posts.map((post) => {
            return (
              <Message {...post} key={post.id}>
                <div className="flex gap-4">
                  <button
                    onClick={() => deletePost(post.id)}
                    className="text-pink-600 flex items-center justify-center gap-2 py-2 text-sm"
                  >
                    <BsTrash2Fill className="text-2xl" />
                    Delete
                  </button>
                  <Link href={{ pathname: "/Post", query: post }}>
                    <button className="text-teal-600 flex items-center justify-center gap-2 py-2 text-sm">
                      <AiFillEdit className="text-2xl" />
                      Edit
                    </button>
                  </Link>
                </div>
              </Message>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center mx-auto h-80">
          <BounceLoader color="#06B6D4" />
        </div>
      )}

      <button
        className="font-medium text-white bg-gray-800 py-2 px-4 my-6"
        onClick={() => auth.signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}
