"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
          <h2 className="m-2 p-2 text-red-500 text-4xl font-black">
            Something went wrong!
          </h2>
          <p className="text-black font-thin p-5 m-3 border-2 border-dashed border-blue-950">
            {error}
          </p>
          <button
            className="px-3 py-4 m-3 rounded-lg bg-blue-700 text-white text-lg"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
