import { SignedIn, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-slate-800">
      <Link href="/" className="font-bold uppercase text-gray-300">
        Next Store
      </Link>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignUpButton mode="modal">
          <button className="px-3 py-2 border rounded-md">Fazer login</button>
        </SignUpButton>
      </SignedOut>
    </nav>
  );
};
export default Navbar;
