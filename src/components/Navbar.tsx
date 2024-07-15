import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Cart from "./Cart";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-slate-800">
      <Link href="/" className="font-bold uppercase text-gray-300">
        Next Store
      </Link>
      <div className="flex items-center gap-8">
        <Cart />
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="border rounded-md border-gray-400 px-3 py-2">
                Fazer Login
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
