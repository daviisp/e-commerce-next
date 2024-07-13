const Skeleton = () => {
  return (
    <div className="h-96 p-5 flex flex-col rounded-md bg-slate-800">
      <div className="relative max-h-76 flex-1 bg-zinc-700 rounded-md" />
      <div className="flex items-center justify-between gap-4 my-4">
        <div className="w-40 h-auto bg-zinc-700" />
        <div className="bg-zinc-700 w-40" />
      </div>
      <div>
        <div className="w-full bg-zinc-700 rounded-md px-3 py-2" />
      </div>
    </div>
  );
};
export default Skeleton;
