import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-slate-800">
      <Link href="/" className="font-bold uppercase text-gray-300">
        Next Store
      </Link>
    </nav>
  );
};
export default Navbar;
