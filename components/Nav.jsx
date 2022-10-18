import Link from "next/link";
import { auth } from "../utils/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { RoughNotation } from "react-rough-notation";
export default function Nav() {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className="flex justify-between items-center py-10">
      <Link href="/">
        <RoughNotation type="underline" show={true} color="#06B6D4">
          <button className="text-lg font-medium">What is on your Mind?</button>
        </RoughNotation>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <Link href="/auth/Login">
            <a className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8">
              Join Now
            </a>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-6">
            <Link href="/Post">
              <button className="font-medium bg-cyan-500 text-white py-2 px-4 rounded-md text-sm">
                Post
              </button>
            </Link>
            <Link href="/Dashboard">
              <img
                className="w-12 rounded-full cursor-pointer"
                src={user.photoURL}
                alt="avatar"
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}
