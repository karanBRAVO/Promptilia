"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [userSearch, setUserSearch] = useState("");

  const handleChange = (e) => {
    setUserSearch(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="m-1 flex items-center justify-center bg-sky-100 rounded-full shadow-md w-full md:w-2/4">
        <input
          type="search"
          placeholder="Search ..."
          name="search"
          id="search"
          autoComplete="off"
          value={userSearch}
          onChange={handleChange}
          className="p-4 outline-none bg-transparent w-full"
        />
        <button
          type="button"
          onClick={handleClick}
          className="text-2xl text-indigo-950 p-4"
        >
          <FaSearch />
        </button>
      </div>
    </>
  );
};

export default Search;
