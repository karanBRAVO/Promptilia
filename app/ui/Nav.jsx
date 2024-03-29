"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  GrYoutube,
  GrGithub,
  GrTwitter,
  GrInstagram,
  GrFacebookOption,
} from "react-icons/gr";
import { PiHamburgerFill } from "react-icons/pi";
import { IoIosCloseCircle } from "react-icons/io";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSession, signOut } from "next-auth/react";
import { TbTruckLoading } from "react-icons/tb";

const socialIcons = [
  { socialIcon: GrGithub, href: "" },
  { socialIcon: GrYoutube, href: "" },
  { socialIcon: GrTwitter, href: "" },
  { socialIcon: GrInstagram, href: "" },
  { socialIcon: GrFacebookOption, href: "" },
];

const Nav = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [toggleMenu, setToggleMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignOut = async (e) => {
    e.preventDefault();
    setLoading(true);
    await signOut({ redirect: false, callbackUrl: "/" });
    setLoading(false);
  };

  return (
    <>
      <nav
        className={clsx(
          "p-8 font-black text-base flex items-center flex-row justify-between lg:justify-around w-full",
          { hidden: pathname === "/user/auth" }
        )}
      >
        <Link href={"/"}>
          <div className="flex flex-row items-center justify-center text-lg font-black bg-[#80808041] rounded-full p-2 sm:rounded-3xl cursor-pointer">
            <Image
              src={"/logo/star.svg"}
              width={37}
              height={37}
              alt="Promptilia"
              className="p-1"
              draggable={false}
            />
            Promptilia
          </div>
        </Link>

        {/* Mobile View */}
        <div>
          {toggleMenu ? (
            <>
              <IoIosCloseCircle
                className="text-3xl sm:hidden cursor-pointer font-black text-blue-950 hover:text-blue-800"
                onClick={() => {
                  setToggleMenu((prev) => !prev);
                }}
              />
              <div className="flex flex-col sm:hidden items-center justify-between p-4 bg-white shadow-md shadow-blue-500 rounded-tl-lg rounded-bl-lg absolute right-0">
                <div className="flex flex-row items-center justify-evenly">
                  {socialIcons.map((icon, index) => {
                    return (
                      <Link key={index} href={icon.href}>
                        <icon.socialIcon className="text-black hover:text-blue-700 cursor-pointer text-2xl m-1" />
                      </Link>
                    );
                  })}
                </div>
                <hr className="w-full h-1 bg-slate-900 m-1" />
                <div>
                  {status == "authenticated" ? (
                    pathname === "/user/profile" ? (
                      <h1 className="text-2xl font-black bg-gradient-to-t from-indigo-400 via-blue-400 to-sky-400 text-transparent bg-clip-text">
                        My Profile
                      </h1>
                    ) : (
                      <div className="flex flex-col justify-between items-center gap-2">
                        <Link href={"/user/profile"}>
                          <button
                            type="button"
                            disabled={loading}
                            className="bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-600 hover:from-indigo-600 hover:via-indigo-400 hover:to-indigo-300 text-lg px-4 py-2 rounded-3xl text-white disabled:cursor-not-allowed"
                          >
                            Profile
                          </button>
                        </Link>
                        <button
                          type="button"
                          disabled={loading}
                          className="bg-gradient-to-r from-pink-300 via-pink-400 to-pink-600 hover:from-pink-600 hover:via-pink-400 hover:to-pink-300 text-lg px-4 py-2 rounded-3xl text-white disabled:cursor-not-allowed flex items-center justify-between gap-1"
                          onClick={handleSignOut}
                        >
                          {loading ? (
                            <>
                              <TbTruckLoading className="text-3xl" />
                              Loading
                            </>
                          ) : (
                            <>Sign out</>
                          )}
                        </button>
                      </div>
                    )
                  ) : (
                    <Link href={"/user/auth"}>
                      <button
                        type="button"
                        disabled={status == "loading"}
                        className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-600 hover:from-blue-600 hover:via-blue-400 hover:to-blue-300 text-lg px-4 py-2 rounded-3xl text-white disabled:cursor-not-allowed flex items-center justify-between gap-1"
                      >
                        {status == "loading" ? (
                          <>
                            <TbTruckLoading className="text-3xl" />
                            Loading
                          </>
                        ) : (
                          <>Sign in</>
                        )}
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </>
          ) : (
            <PiHamburgerFill
              className="text-3xl sm:hidden cursor-pointer font-black text-blue-950 hover:text-blue-800"
              onClick={() => {
                setToggleMenu((prev) => !prev);
              }}
            />
          )}
        </div>

        {/* Desktop View */}
        <div className="hidden sm:flex flex-row items-center justify-between p-1">
          <div className="flex flex-row items-center justify-evenly">
            {socialIcons.map((icon, index) => {
              return (
                <Link key={index} href={icon.href}>
                  <icon.socialIcon className="text-black hover:text-blue-700 cursor-pointer text-2xl m-1" />
                </Link>
              );
            })}
          </div>
          {status == "authenticated" ? (
            pathname === "/user/profile" ? (
              <h1 className="text-2xl font-black bg-gradient-to-t from-indigo-400 via-blue-400 to-sky-400 text-transparent bg-clip-text">
                My Profile
              </h1>
            ) : (
              <div className="flex flex-row items-center justify-between gap-2">
                <Link href={"/user/profile"}>
                  <button
                    type="button"
                    disabled={loading}
                    className="bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-600 hover:from-indigo-600 hover:via-indigo-400 hover:to-indigo-300 text-lg px-4 py-2 rounded-3xl text-white disabled:cursor-not-allowed"
                  >
                    Profile
                  </button>
                </Link>
                <button
                  type="button"
                  disabled={loading}
                  className="bg-gradient-to-r from-pink-300 via-pink-400 to-pink-600 hover:from-pink-600 hover:via-pink-400 hover:to-pink-300 text-lg px-4 py-2 rounded-3xl text-white disabled:cursor-not-allowed flex items-center justify-between gap-1"
                  onClick={handleSignOut}
                >
                  {loading ? (
                    <>
                      <TbTruckLoading className="text-3xl" />
                      Loading
                    </>
                  ) : (
                    <>Sign out</>
                  )}
                </button>
              </div>
            )
          ) : (
            <Link href={"/user/auth"}>
              <button
                type="button"
                disabled={status == "loading"}
                className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-600 hover:from-blue-600 hover:via-blue-400 hover:to-blue-300 text-lg px-4 py-2 rounded-3xl text-white disabled:cursor-not-allowed flex items-center justify-between gap-1"
              >
                {status == "loading" ? (
                  <>
                    <TbTruckLoading className="text-3xl" />
                    Loading
                  </>
                ) : (
                  <>Sign in</>
                )}
              </button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
