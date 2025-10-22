import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoHome } from "react-icons/io5";
import { GiElephant } from "react-icons/gi";
import { IoFish } from "react-icons/io5";

export default function Navbar() {
  const router = useRouter();
  const isActive = (path) => router.pathname === path;

  return (
    <nav className="bg-slate-900 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-400">Rezoorces</Link>

      <div className="flex space-x-6">
        <Link href="/" className={isActive('/') ? ' cursor-pointer bg-blue-600 px-3 py-2 rounded' : 'px-3 py-2 hover:bg-slate-700 rounded'}>
          <IoHome /> Dashboard
        </Link>
        <Link href="/animals" className={isActive('/animal') ? 'cursor-pointer bg-blue-600 px-3 py-2 rounded' : 'px-3 py-2 hover:bg-slate-700 rounded'}>
         <p> <GiElephant /> Animals</p> 
        </Link>
        <Link href="/food" className={isActive('/food') ? 'cursor-pointer bg-blue-600 px-3 py-2 rounded ' : 'px-3 py-2 hover:bg-slate-700 rounded'}>
          <IoFish /> Food
        </Link>
      </div>
    </nav>
  );
}
