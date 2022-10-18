import Head from "next/head";
import Message from "../components/Message";
import { useEffect, useState } from "react";
import { db } from "../utils/Firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { BounceLoader } from "react-spinners";

export default function Home() {
  // Create a state with all posts
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    setLoading(true);
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timeStamp", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setAllPosts(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setLoading(false);
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
        <meta name="description" content="WhatsOnMind" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="my-12 text-lg font-medium">
        <h2 className="text-2xl font-semibold ">
          See what other people are saying :
        </h2>
        {!loading ? (
          allPosts.map((post) => (
            <Message key={post.id} {...post}>
              <Link href={{ pathname: `/${post.id}`, query: { ...post } }}>
                <button className="border-2 rounded-full w-60 border-cyan-600">
                  {post.comments?.length > 0 ? post.comments?.length : 0}{" "}
                  Comments
                </button>
              </Link>
            </Message>
          ))
        ) : (
          <div className="flex items-center justify-center mx-auto h-80">
            <BounceLoader color="#06B6D4" />
          </div>
        )}
      </div>
    </div>
  );
}
