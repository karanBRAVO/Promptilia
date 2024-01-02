"use client";

import Search from "@app/ui/Search";
import NotFound from "@app/not-found";
import Wait from "@app/ui/Wait";
import { useSession } from "next-auth/react";
import PromptCard from "@app/ui/PromptCard";

const Prompt = () => {
  const { data: session, status } = useSession();

  const handleSearch = (searchValue) => {
    // make request to server
  };

  return (
    <>
      <section className="w-full min-h-screen p-3 bg-gradient-to-b from-white via-fuchsia-300 to-pink-400">
        {status === "loading" ? (
          <Wait msg={"Processing your request..."} />
        ) : status === "authenticated" ? (
          <div className="w-full flex flex-col">
            <h1 className="m-1 text-3xl font-black text-blue-950 text-center">
              Ask anything, Wait and See
            </h1>
            <div className="w-full flex flex-col items-center justify-center">
              <Search clickEvent={handleSearch} />
            </div>
            <div className="m-1 p-2 flex flex-col items-center w-full">
              <PromptCard
                id={"asdreh726lj01j003j3542f3"}
                name={"Karan Yadav"}
                email={"karan@gmail.com"}
                image={"/profileDefault.webp"}
                text={
                  "This is prompt card that will show the response generated generated when the user sends a request to the server. it also shows other matching results that were generated earlier which are related to given prompt. One can like, dislike and it has comment functionality also."
                }
                numberOfLetters={100}
                dated={"01-02-2024 Tuesday"}
              />
            </div>
          </div>
        ) : (
          <NotFound />
        )}
      </section>
    </>
  );
};

export default Prompt;
