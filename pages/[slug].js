import Message from "../components/Message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/Firebase";
import { toast } from "react-toastify";

export default function Details() {
  const router = useRouter();
  const routerData = router.query;
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

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
          <button className="bg-cyan-500 text-white py-2 px-4 text-sm">
            Submit
          </button>
        </div>
        <div className="py-6">
          <h2 className="font-bold">Comments</h2>
          {/* {setAllMessages?.map(message => (
            <div>
                <div>
                    <img src="" alt="" />
                </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
