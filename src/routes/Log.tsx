import { LogDetails } from "../Components/Log/LogDetails";
import { Nav } from "../Components/Nav/Nav";

export const Log = () => {
  return (
    <div className="w-[full] h-full flex gap-4 flex-col relative">
      <Nav />
      <main className="flex flex-col items-center justify-center gap-4 w-full">
        <div className="flex flex-col justify-center w-full md:max-w-[80%]">
          <LogDetails />
        </div>
      </main>
    </div>
  );
};
