const Wait = ({ msg }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="capitalize text-black font-black text-4xl my-3">
        {`[!]`} Wait...
      </h1>
      <p className="text-black font-thin text-xl m-2 max-w-2xl">{msg}</p>
    </div>
  );
};

export default Wait;
