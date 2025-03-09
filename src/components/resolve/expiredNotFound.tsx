export const ExpiredNotFound = () => {
  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-xl flex flex-col px-4 items-center">
        <img className="opacity-30 w-96" src="/not-found.svg"/>
        <h2 className="font-semibold text-2xl">Expired or not found</h2>
      </div>
    </div>
  );
};
