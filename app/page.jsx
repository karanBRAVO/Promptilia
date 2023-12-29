const Home = () => {
  return (
    <>
      <section className="bg-gradient-to-t from-indigo-950 w-full min-h-screen flex flex-col items-center">
        <h1 className="text-black text-7xl sm:text-9xl font-black flex flex-col items-center justify-between p-3 bg-gradient-to-r from-indigo-700 via-indigo-950 to-indigo-700 text-transparent bg-clip-text capitalize">
          Promptilia
          <br />
          <span className="text-xl p-2 mt-5 bg-gradient-to-r from-slate-600 via-slate-950 to-slate-600 text-transparent bg-clip-text">
            An AI Powered Prompt Engine.
          </span>
        </h1>
        <p className="text-base text-black font-mono text-center w-md sm:max-w-lg p-4">
          An Open-Source Project by{" "}
          <span className="text-lg text-purple-950 font-black font-sans">
            Karan Yadav
          </span>
          . Brought to you by{" "}
          <span className="text-blue-800 font-semibold text-sm">
            Next Js-14
          </span>{" "}
          and{" "}
          <span className="text-blue-800 font-semibold text-sm">
            Tailwind CSS.
          </span>{" "}
          Just Log in and get started! Use it anywhere you want, you only need a
          WEB BROWSER.
        </p>
      </section>
    </>
  );
};

export default Home;
