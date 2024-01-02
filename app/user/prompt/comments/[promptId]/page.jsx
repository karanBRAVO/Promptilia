import CommentCard from "@app/ui/CommentCard";
import PromptCard from "@app/ui/PromptCard";

const Comments = ({ params }) => {
  return (
    <>
      <section className="w-full min-h-screen bg-gradient-to-b from-white via-lime-300 to-emerald-400">
        <div className="w-full p-3 flex flex-col items-start">
          <h1 className="text-4xl md:text-6xl bg-gradient-to-r from-violet-500 via-indigo-400 to-sky-700 text-transparent bg-clip-text font-black capitalize m-2 flex flex-col sm:flex-row items-center justify-between">
            Comments
            <span className="text-black font-thin text-xs md:text-sm px-1 m-2">
              <span className="text-cyan-500 font-semibold uppercase mx-1">
                ID:
              </span>
              {params.promptId}
            </span>
          </h1>
        </div>
        <div className="m-1 p-2 flex flex-col items-center">
          <div className="flex flex-col w-full items-center m-2 p-1">
            <PromptCard
              id={`${params.promptId}`}
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
          <div className="flex flex-col w-full items-center m-2 p-1">
            <div className="bg-transparent rounded-lg p-4 m-2 flex flex-col w-full max-w-2xl">
              <h2 className="text-2xl font-bold text-black p-1 m-1">
                Discussion <span className="text-sky-500">{`(`}</span>
                <span className="text-rose-500">5</span>
                <span className="text-sky-500">{`)`}</span>
              </h2>
              <div className="flex flex-row mt-4">
                <img
                  src="/profileDefault.webp"
                  alt="Your Pic"
                  width={45}
                  height={50}
                  className="hidden sm:block rounded-full w-11 h-11 my-3 mx-4 shadow-md border-2 border-solid border-black"
                />
                <div className="flex flex-col items-center justify-between w-full">
                  <textarea
                    name="comment"
                    id="comment"
                    cols="30"
                    rows="10"
                    placeholder="Write a comment..."
                    className="w-full min-h-[200px] p-3 border-2 border-solid border-amber-500 rounded-lg bg-amber-50 shadow-md"
                  ></textarea>
                  <button
                    type="button"
                    className="m-3 px-4 py-3 rounded-xl font-semibold text-white shadow-md bg-amber-400"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
            <hr className="h-[1px] bg-slate-600 max-w-2xl w-full" />
            <div className="bg-transparent rounded-lg p-4 m-2 flex flex-col w-full max-w-2xl">
              <CommentCard
                name="Karan Yadav"
                image="/profileDefault.webp"
                date="Jan, 02 2024"
                likes={1}
                comment="This is a comment"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Comments;
