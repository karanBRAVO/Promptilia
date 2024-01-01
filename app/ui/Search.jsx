"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { FaSearch } from "react-icons/fa";

const Search = ({ clickEvent }) => {
  const { data: session, status } = useSession();
  const [userSearch, setUserSearch] = useState("");

  const handleChange = (e) => {
    setUserSearch(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    clickEvent(userSearch);
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
          disabled={status === "unauthenticated"}
          value={userSearch}
          onChange={handleChange}
          className="p-4 outline-none bg-transparent w-full"
        />
        <button
          type="button"
          disabled={status === "unauthenticated"}
          onClick={handleClick}
          className="text-2xl text-indigo-950 p-4 disabled:cursor-not-allowed"
        >
          <FaSearch />
        </button>
      </div>
    </>
  );
};

export default Search;
