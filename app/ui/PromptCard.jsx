"use client";

import { useState } from "react";
import { PiEyeClosedBold, PiEyeBold } from "react-icons/pi";
import { BiSolidLike, BiSolidDislike, BiCommentDetail } from "react-icons/bi";

const PromptCard = ({
  name = "Name",
  email = "abc@xyz.ky",
  image = "/profileDefault.webp",
  text = "Prompt Response",
  numberOfLetters = 100,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg p-4 m-2 flex flex-col shadow-md w-full max-w-2xl shadow-slate-300">
        <div className="flex flex-row items-center justify-between my-2">
          <div className="flex flex-row items-center">
            <img
              src={image}
              alt="Profile Pic"
              width={45}
              height={50}
              className="rounded-full w-12 h-12 mx-1 shadow-md shadow-pink-50"
            />
            <div className="flex flex-col">
              <span className="text-zinc-950 font-thin text-sm capitalize">
                {name}
              </span>
              <span className="text-zinc-950 font-thin text-xs">{email}</span>
            </div>
          </div>
          <div className="m-1">
            {isOpen ? (
              <PiEyeClosedBold
                className="cursor-pointer text-lg mx-1"
                onClick={() => {
                  setIsOpen((prev) => !prev);
                }}
              />
            ) : (
              <PiEyeBold
                className="cursor-pointer text-lg mx-1"
                onClick={() => {
                  setIsOpen((prev) => !prev);
                }}
              />
            )}
          </div>
        </div>
        <div className="my-2 flex flex-col items-start">
          <p className="text-sm font-sans md:text-base text-slate-900">
            {isOpen ? (
              <>{`${text}`}</>
            ) : (
              <>
                {`${text}`.substring(0, numberOfLetters)}
                <span className="text-black font-black mx-1">. . . More</span>
              </>
            )}
          </p>
        </div>
        <div className="flex flex-row my-2 items-start">
          <BiSolidLike
            className="text-xl text-black font-black mx-1 hover:text-pink-700 cursor-pointer"
            onClick={() => {}}
          />
          <BiSolidDislike
            className="text-xl text-black font-black mx-1 hover:text-pink-700 cursor-pointer"
            onClick={() => {}}
          />
          <BiCommentDetail
            className="text-xl text-black font-black mx-1 hover:text-pink-700 cursor-pointer"
            onClick={() => {}}
          />
        </div>
      </div>
    </>
  );
};

export default PromptCard;
