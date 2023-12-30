"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

const providers = [
  { name: "Google", icon: FcGoogle },
  { name: "Github", icon: BsGithub },
];

const SignIn = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const validate = () => {
    Object.values(formData).forEach((value) => {
      if (value.length === 0) {
        return false;
      }
    });
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (validate()) {
        const res = await fetch(`/api/auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (data.success) {
          router.push("/");
        } else {
          console.log("Failed to login/create.");
        }
      } else {
        alert(`Fill correct details.`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="flex flex-col items-center min-h-screen w-full bg-gradient-to-t from-yellow-100 via-orange-100 to-pink-100 text-base text-black">
        <h1 className="font-black text-4xl text-slate-950 p-1">
          Welcome to{" "}
          <span className="capitalize font-sans bg-gradient-to-r from-yellow-400 via-red-500 to-orange-600 text-transparent bg-clip-text">
            Promptilia
          </span>
        </h1>
        <div className="flex flex-row m-2">
          <div className="flex flex-col items-center justify-between p-2">
            <span className="font-extralight text-sm text-black">
              Don't have an account?
            </span>
            <span className="font-black text-4xl text-black">Create</span>
          </div>
          <div className="top-0 bottom-0 p-1 bg-black relative rounded-lg"></div>
          <div className="flex flex-col items-center justify-between p-2">
            <span className="font-extralight text-sm text-black">
              Already have an account.
            </span>
            <span className="font-black text-4xl text-black">Login</span>
          </div>
        </div>
        <div className="m-1">
          <form
            onSubmit={handleSubmit}
            className="px-5 py-3 m-2 rounded-xl shadow-md text-base"
          >
            <div className="flex flex-col items-start justify-between">
              <label htmlFor="username" className="text-black font-extralight">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                required
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="off"
                className="rounded-md p-5 font-light m-2 text-blue-950 text-lg outline-orange-300 outline-double outline-2 bg-white placeholder:text-gray-400"
              />
            </div>
            <div className="flex flex-col items-start justify-between">
              <label htmlFor="email" className="text-black font-extralight">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="abc@xyz.ky"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                className="rounded-md p-5 font-light m-2 text-blue-950 text-lg outline-orange-300 outline-double outline-2 bg-white placeholder:text-gray-400"
              />
            </div>
            <div className="flex flex-col items-start justify-between">
              <label htmlFor="password" className="text-black font-extralight">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="########"
                value={formData.password}
                onChange={handleChange}
                autoComplete="off"
                className="rounded-md p-5 font-light m-2 text-blue-950 text-lg outline-orange-300 outline-double outline-2 bg-white placeholder:text-gray-400"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="px-3 py-4 w-full bg-gradient-to-tr from-orange-300 to-yellow-500 rounded-md shadow-md shadow-slate-300 font-black text-red-950 disabled:cursor-not-allowed"
            >
              {submitting ? <>Submitting...</> : <>Submit</>}
            </button>
          </form>
          <div className="flex flex-row items-center justify-between gap-1 text-black font-thin text-xl">
            <hr className="w-full h-[2.1px] bg-black" />
            <span className="mb-1">or</span>
            <hr className="w-full h-[2.1px] bg-black" />
          </div>
        </div>
        <div className="flex items-center justify-evenly flex-col md:flex-row">
          {providers.map((provider, index) => {
            return (
              <div
                key={index}
                className="flex flex-row rounded-lg shadow-lg items-center justify-center px-4 py-3 m-2 text-black font-medium bg-gradient-to-tl hover:bg-gradient-to-b from-slate-500 via-zinc-100 to-zinc-200 cursor-pointer space-x-1"
              >
                <provider.icon className="text-2xl mx-1" />
                <span>Continue with</span>
                <span>{provider.name}</span>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default SignIn;
