import { Search, ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

export default function SearchBar() {
  // // State variables for the search bar
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [isAdultContentEnabled, setIsAdultContentEnabled] = useState(false);

  // Event handler for the search button
  const handleAdultContentToggle = (enabled: boolean) => {
    console.log("Adult content enabled:", enabled);
    setIsAdultContentEnabled(enabled);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded overflow-hidden">
      {/* Main content area */}
      <div className="bg-black p-4">
        <div className="grid grid-cols-5 gap-x-6 items-center">
          {/* Column labels */}
          <div className="text-gray-400 text-sm ml-[10px] mb-[5px] font-medium">Search</div>
          <div className="text-gray-400 text-sm ml-[10px] mb-[5px] font-medium">Genre</div>
          <div className="text-gray-400 text-sm ml-[10px] mb-[5px] font-medium">Released Year</div>
          <div className="text-gray-400 text-sm ml-[10px] mb-[5px] font-medium">Adult</div>
          <div></div> {/* Empty space for search button */}

          {/* Form controls */}
          {/* Search Field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 px-4 bg-[#1a1f36] placeholder-white rounded-full focus:outline-none"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <Search className="text-gray-400" size={18} />
            </div>
          </div>

          {/* Genre Field */}
          <div className="relative">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full appearance-none bg-[#1a1f36] text-white py-2.5 px-4 rounded-full focus:outline-none"
            >
              <option value="">Genre</option>
              <option value="action">Action</option>
              <option value="adventure">Adventure</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
              <option value="horror">Horror</option>
              <option value="sci-fi">Sci-Fi</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <ChevronDown className="text-gray-400" size={18} />
            </div>
          </div>

          {/* Released Year Field */}
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full appearance-none bg-[#1a1f36] text-white py-2.5 px-4 rounded-full focus:outline-none"
            >
              <option value="">Year</option>
              {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <div className="flex flex-col">
                <ChevronUp className="text-gray-400" size={12} />
                <ChevronDown className="text-gray-400" size={12} />
              </div>
            </div>
          </div>

          {/* Adult Field */}
          <div className="flex items-center justify-center">
            <div className="bg-[#1a1f36] py-2.5 px-4 rounded-full text-white flex items-center justify-between w-full">
              <span>Adult</span>
              <label className="inline-flex relative items-center cursor-pointer ml-2">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isAdultContentEnabled}
                  onChange={(e) => handleAdultContentToggle(e.target.checked)}
                />
                <div
                  className={`w-10 h-5 rounded-full transition-colors ${isAdultContentEnabled ? "bg-red-600" : "bg-gray-700"
                    }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${isAdultContentEnabled ? "translate-x-5" : "translate-x-0"
                      }`}
                  ></div>
                </div>
              </label>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={() => console.log("Search clicked!")}
            className="bg-red-600 text-white py-2.5 px-4 rounded-full text-base font-medium hover:bg-red-700 transition-colors w-full"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}