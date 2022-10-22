/* eslint-disable */

import Message from "../components/Message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/Firebase";
import { toast } from "react-toastify";
import {
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";

export default function Details({ timeStamp }) {
  const router = useRouter();
  const routerData = router.query;

  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  // Submitting messages
  const submitMessage = async () => {
    // Check if user is logged
    if (!auth.currentUser) return router.push("/auth/Login");
    if (!message) {
      toast.error("Do not leave an empty message 🙄", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }
    const docRef = doc(db, "posts", routerData.id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        userName: auth.currentUser.displayName,
        time: Timestamp.now(),
        id: auth.currentUser.uid + Math.floor(Math.random() * 90 + 10),
      }),
    });
    toast.success("Comment added successfully...😊", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
    setMessage("");
  };

  //Get Comments
  const getComments = async () => {
    const docRef = doc(db, "posts", routerData.id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessages(snapshot.data().comments);
    });
    return unsubscribe;
  };

  useEffect(() => {
    if (!router.isReady) return;
    getComments();
  }, [router.isReady]);

  // var moments = new Date(time?.toDate()).toUTCString();

  // const time = moment.parseZone(moments).startOf("hour").fromNow();

  // Deleting Comment

  // const deleteComment = async (id) => {
  //   const docRef = doc(db, "posts/comments", "", id);
  //   await deleteDoc(docRef.id);
  // };

  return (
    <div>
      <Message {...routerData}></Message>
      <div className="my-4">
        <div className="flex">
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            value={message}
            placeholder="Send a message 😁"
            className="bg-gray-800 w-full p-2  text-white text-sm"
          />
          <button
            onClick={submitMessage}
            className="bg-cyan-500 text-white py-2 px-4 text-sm"
          >
            Submit
          </button>
        </div>
        <div className="py-6">
          <h2 className="font-bold">Comments</h2>
          {allMessages?.map((message) => (
            <div className="bg-white p-4 my-4 border-2" key={message.time}>
              <div className="flex items-center gap-2 mb-4">
                <img
                  className="w-10 rounded-full"
                  src={message.avatar}
                  alt="avatar"
                />
                <h2>{message.userName}</h2>
              </div>
              <h2>{message.message}</h2>
              {/* <button onClick={() => deleteComment(message.id)}>Delete</button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 2h21m
