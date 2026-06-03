import { Search } from "lucide-react";
import { useState } from "react";
import type { SearchProps } from "../../types/type";

export default function SearchBar({
  OnSearch,
  initialValue = "",
}: SearchProps) {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  // useEffect(() => {
  //     setSearchQuery(initialValue);
  // }, [initialValue]);

  const handleSearch = () => {
    const query = searchQuery.trim();

    if (!query) {
      setIsOpenSearch(false);
      return;
    }

    OnSearch(query);
    setIsOpenSearch(false);
  };

  return (
    <>
      {isOpenSearch ? (
        <form
          className="flex items-center justify-center bg-gray-700/20 rounded-md  backdrop-blur-md transition-opacity duration-1000 ease-in-out"
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch();
          }}
        >
          <div 
            className="flex items-center focus-within:border-red-500/50 focus-within:ring-1 focus-within:ring-red-500/50 rounded-md px-3 py-1 w-full md:w-auto md:py-1.5 duration-1000 ease-in-out backdrop-blur-md">
            <button
              type="submit"
              className="text-white hover:text-gray-300 flex items-center"
              aria-label="Search"
            >
              <Search size={23}/>
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Movies, TV shows, and more..."
              className="w-full focus:outline-none ml-2 text-gray-300 placeholder-gray-400 md:w-64"
            />
          </div>
        </form>
      ) : (
        <button
          className="text-white hover:text-gray-300"
          onClick={() => setIsOpenSearch(true)}
        >
          <Search size={23}/>
        </button>
      )}
    </>
  );
}
