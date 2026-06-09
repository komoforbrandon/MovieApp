import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import SearchBar from "../common/searchbar";
import { Menu, User, X, BellIcon } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const searchTerm = searchParams.get("query") ?? "";

  function getSearchPath() {
    return "/search";
  }

  function handleSearch(query: string) {
    const searchPath = getSearchPath();
    navigate(`${searchPath}?query=${encodeURIComponent(query)}`);
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "TV Shows", path: "/tv-shows" },
    { name: "Movies", path: "/movies" },
    {name:"New & Popular", path: "/new-and-popular"},
    { name: "WatchList", path: "/watchlist" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur block w-full">
      <nav className="sticky py-3 px-2 bg-black/70  flex items-center shadow-xs shadow-red-500/10 justify-between md:py-3 md:px-4">
        <div className="flex items-center">
          <Link to="/" className="text-2xl md:text-2xl uppercase font-bold text-red-600 md:mr-10">
            NetCineX
          </Link>
          <div className="hidden text-gray-400 font-[490] md:flex space-x-5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`hover:text-gray-300 ${
                  location.pathname === item.path ? "text-gray-300 font-semibold border-b-3 border-red-600" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <article className="flex items-center py-1 space-x-4">
          <div
          className="md:block"
          >
            <SearchBar OnSearch={handleSearch} initialValue={searchTerm} />
          </div>
          <BellIcon className="hidden md:block" color="rgb(254 226 226)" />
          <User className="hidden md:block" />
          <button
            className="rounded-md transition-colors hover:bg-amber-900/10 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {!menuOpen ? <Menu size={24} /> : <X size={24} />}
          </button>
        </article>
      </nav>
      {menuOpen && (
        <div className="mx-auto flex max-w-6xl bg-black/70 flex-col  p-2 shadow-sm backdrop-blur-sm md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="rounded-md px-3 py-2 transition-colors hover:bg-red-700/8 m-1 outline outline-red-400/20"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
