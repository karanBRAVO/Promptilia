import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <h2 className="text-4xl text-black font-black">{`[!]`} Not Found</h2>
      <p className="text-blue-950 text-xl font-thin p-3 m-3">
        Could not find requested resource
      </p>
      <Link href="/">
        <span className="px-3 py-4 m-4 bg-emerald-600 text-white font-black">
          Return Home
        </span>
      </Link>
    </div>
  );
}
