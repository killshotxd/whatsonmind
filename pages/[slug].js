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
      <h1>Hello</h1>
    </div>
  );
}
