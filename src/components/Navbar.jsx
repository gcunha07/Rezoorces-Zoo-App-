import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoHome } from "react-icons/io5";
import { GiElephant } from "react-icons/gi";
import { IoFish } from "react-icons/io5";

export default function Navbar() {
  const router = useRouter();
  const isActive = (path) => router.pathname === path;

  const linkBase =
    'flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200';
  const activeLink = 'bg-green-700 text-white shadow-md';
  const inactiveLink = 'text-green-50 hover:bg-green-800 hover:text-white';

  return (
    <nav className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 text-white px-6 shadow-lg flex justify-between items-center border-b-4 border-yellow-700">
      {/* LOGO */}
      <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-yellow-300">
        <img src="/ZooTracker.png" alt="Rezoorces Logo" className="w-16 h-16" />
        <span>ReZOOrces</span>
      </Link>

      {/* LINKS */}
      <div className="flex space-x-4">
        <Link
          href="/"
          className={`${linkBase} ${isActive('/') ? activeLink : inactiveLink}`}
        >
          <IoHome className="text-xl" />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/animals"
          className={`${linkBase} ${isActive('/animals') ? activeLink : inactiveLink}`}
        >
          <GiElephant className="text-xl" />
          <span>Animais</span>
        </Link>

        <Link
          href="/food"
          className={`${linkBase} ${isActive('/food') ? activeLink : inactiveLink}`}
        >
          <IoFish className="text-xl" />
          <span>Comida</span>
        </Link>
      </div>

      {/* Decoração lateral */}
      <div className="hidden sm:flex items-center space-x-2 text-yellow-300">
        <span className="text-sm italic">Zoo Management</span>
      </div>
    </nav>
  );
}
