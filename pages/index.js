import Head from "next/head";
import Message from "../components/Message";
import { useEffect, useState } from "react";
import { db } from "../utils/Firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function Home() {
  // Create a state with all posts
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timeStamp", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setAllPosts(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      },
      (error) => {
        console.log(error);
      }
    );
    return unsubscribe;
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <Head>
        <title>WhatsOnMind</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="my-12 text-lg font-medium">
        <h2 className="text-2xl ">See what other people are saying</h2>
        {allPosts.map((post) => (
          <Message key={post.id} {...post}></Message>
        ))}
      </div>
    </div>
  );
}
