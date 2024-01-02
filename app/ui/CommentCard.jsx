"use client";

import { useState } from "react";
import { MdQuickreply } from "react-icons/md";
import { SlOptions } from "react-icons/sl";

const CommentCard = ({
  name = "Karan Yadav",
  image = "/profileDefault.webp",
  date = "Jan. 01, 2024",
  likes = 0,
  comment = "Hello World!",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg p-4 m-2 flex flex-col shadow-md w-full max-w-2xl shadow-slate-300">
        <div className="flex flex-row">
          <div className="m-1 h-fit flex flex-col items-center justify-between">
            <div className="flex items-center justify-center rounded-t-md bg-slate-600 hover:bg-slate-500 w-full h-auto cursor-pointer p-1 md:p-2">
              <span className="font-bold text-white text-sm md:text-xs">+</span>
            </div>
            <div className="flex items-center justify-center bg-slate-600 p-1 w-full h-auto md:p-2">
              <span className="font-bold text-white text-sm md:text-xs">
                {likes}
              </span>
            </div>
            <div className="flex items-center justify-center rounded-b-md bg-slate-600 hover:bg-slate-500 w-full h-auto cursor-pointer p-1 md:p-2">
              <span className="font-bold text-white text-sm md:text-xs">-</span>
            </div>
          </div>
          <div className="p-0 m-0 sm:p-1 sm:m-1 w-full">
            <div className="flex flex-row items-center justify-between m-0 sm:m-1">
              <div className="flex flex-row items-center justify-between">
                <img
                  src={image}
                  alt="profilePic"
                  width={40}
                  height={40}
                  className="rounded-full m-1 sm:m-2 w-8 h-8 border-2 border-solid border-black"
                />
                <div className="flex flex-col item-start justify-between">
                  <span className="text-xs md:text-sm font-bold text-black mx-1">
                    {name}
                  </span>
                  <span className="text-xs md:text-sm font-thin text-black mx-1">
                    {date}
                  </span>
                </div>
              </div>
              <div className="mx-1">
                <SlOptions
                  onClick={() => {
                    setIsOpen((prev) => !prev);
                  }}
                  className="m-1 text-slate-900 text-lg cursor-pointer"
                />
                {isOpen ? (
                  <div className="flex flex-col p-3 bg-white border-2 border-solid border-slate-100 shadow-md rounded-lg absolute mt-1">
                    <span className="cursor-pointer hover:text-emerald-800 text-base font-medium text-black">
                      Edit
                    </span>
                    <span className="cursor-pointer hover:text-emerald-800 text-base font-medium text-black">
                      Remove
                    </span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="flex flex-col items-start p-1">
              <p className="text-sm font-light text-black md:text-base">
                {comment}
              </p>
              <div className="mt-4 flex flex-row items-center justify-center">
                <MdQuickreply className="text-slate-800 font-black" />
                <span className="capitalize text-base text-slate-800 font-semibold hover:underline cursor-pointer mx-1">
                  Reply
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentCard;
