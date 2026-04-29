import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import SearchBar from "../common/searchbar";
import { ThemeToggle, useTheme } from "./theme";
import { Menu, User } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isDark, toggleTheme } = useTheme();
  const searchTerm = searchParams.get("query") ?? "";

  function getSearchPath() {
    if (location.pathname.startsWith("/movies")) {
      return "/movies/search";
    } else if (location.pathname.startsWith("/tv-shows")) {
      return "/tv-shows/search";
    } else {
      return "/search";
    }
  }

  function handleSearch(query: string) {
    const searchPath = getSearchPath();
    navigate(`${searchPath}?query=${encodeURIComponent(query)}`);
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "TV Shows", path: "/tv-shows" },
    { name: "Watchlist", path: "/watchlist" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Menu className="md:hidden" />
        <Link to="/" className="text-2xl font-bold">
          NetCineX
        </Link>
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`hover:text-gray-300 ${
                location.pathname === item.path ? "text-gray-300" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <SearchBar initialValue={searchTerm} onSearch={handleSearch} />
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        <User className="hidden md:block" />
      </div>
    </nav>
  );
}
