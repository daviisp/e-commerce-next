import { SignedIn, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Cart from "./Cart";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-slate-800">
      <Link href="/" className="font-bold uppercase text-gray-300">
        Next Store
      </Link>
      <div className="flex items-center gap-8">
        <div>
          <Cart />
        </div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignUpButton mode="modal">
            <button className="px-3 py-2 border rounded-md">Fazer login</button>
          </SignUpButton>
        </SignedOut>
      </div>
    </nav>
  );
};
export default Navbar;
