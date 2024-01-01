"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Wait from "@app/ui/Wait";
import NotFound from "@app/not-found";

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    setLoading(true);
    await signOut({ redirect: false, callbackUrl: "/" });
    router.replace("/");
    setLoading(false);
  };

  const validate = () => {
    if (
      formData.name.toLowerCase() === session?.user?.name ||
      formData.password.length === 0 ||
      formData.name.length === 0
    ) {
      return false;
    }
    return true;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (validate() && confirm("Are you sure you want to update?")) {
      try {
        const res = await fetch(`/api/user/updateProfile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            password: formData.password,
          }),
        });

        const data = await res.json();

        if (data.success && status === "authenticated") {
          await signIn("username_email_password", {
            redirect: false,
            username: formData.name,
            email: session?.user?.email,
            password: formData.password,
          });
        } else {
          alert("Error " + data.error);
        }
      } catch (err) {
        console.log(err);
      }
    }

    setLoading(false);
  };

  return (
    <>
      <section className="flex flex-col items-start p-5 bg-gradient-to-b from-white via-yellow-200 to-orange-200 w-full min-h-screen">
        {status === "loading" ? (
          <Wait
            msg={
              "Checking if you are authorized to view this page or not. This will less than a minute."
            }
          />
        ) : status === "authenticated" ? (
          <div className="p-1 w-full">
            <div className="flex flex-col items-start m-1">
              <h1 className="font-black text-4xl md:text-7xl capitalize bg-gradient-to-b from-red-200 via-red-400 to-red-700 text-transparent bg-clip-text">
                My Profile
              </h1>
              <p className="font-thin text-black p-2 m-1 max-w-md text-base md:text-xl">
                This Web-Page is made only for you
              </p>
            </div>
            <div className="p-2 flex items-center flex-col md:flex-row-reverse md:justify-around justify-center md:px-14 w-full">
              <img
                src={session?.user?.image}
                width={150}
                height={100}
                alt="Profile Picture"
                className="rounded-md p-4 m-2 border-2 border-solid border-black shadow-lg shadow-fuchsia-400 md:w-60 md:h-auto"
              />
              <div className="flex flex-col items-center justify-between">
                <div className="m-1 p-1 flex items-start flex-col justify-between">
                  <div className="flex flex-row items-center justify-between w-full text-black font-black m-1">
                    <label
                      htmlFor="name"
                      className="px-1 capitalize text-blue-950"
                    >
                      Username:
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="off"
                      placeholder={session?.user?.name}
                      value={formData.name}
                      onChange={handleChange}
                      className="mx-1 text-orange-500 text-thin p-3 border-2 border-solid border-orange-500 bg-transparent outline-none rounded-lg capitalize"
                    />
                  </div>
                  <div className="flex flex-row items-center w-full justify-between text-black font-black m-1">
                    <label
                      htmlFor="email"
                      className="px-1 capitalize text-blue-950"
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      disabled={true}
                      placeholder={session?.user?.email}
                      value={session?.user?.email}
                      className="mx-1 text-orange-500 text-thin p-3 border-2 border-solid border-orange-500 bg-transparent outline-none rounded-lg disabled:cursor-not-allowed"
                    />
                  </div>
                  <div className="flex flex-row items-center justify-between w-full text-black font-black m-1">
                    <label
                      htmlFor="password"
                      className="px-1 capitalize text-blue-950"
                    >
                      Password:
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="off"
                      placeholder="########"
                      value={formData.password}
                      onChange={handleChange}
                      className="mx-1 text-orange-500 text-thin p-3 border-2 border-solid border-orange-500 bg-transparent outline-none rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex flex-row">
                  <button
                    type="button"
                    disabled={loading}
                    className="px-3 py-2 rounded-full bg-gradient-to-t from-yellow-300 to-orange-400 text-xl font-black text-white shadow-md mx-2 my-3 disabled:cursor-not-allowed"
                    onClick={handleSignOut}
                  >
                    {loading ? <>Processing...</> : <>Sign Out</>}
                  </button>
                  <button
                    type="button"
                    disabled={loading}
                    className="px-3 py-2 rounded-full bg-gradient-to-t from-pink-300 to-red-400 text-xl font-black text-white shadow-md mx-2 my-3 disabled:cursor-not-allowed"
                    onClick={handleUpdate}
                  >
                    {loading ? <>Processing...</> : <>Update Profile</>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NotFound />
        )}
      </section>
    </>
  );
};

export default Profile;
