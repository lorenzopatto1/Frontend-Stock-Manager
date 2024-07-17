import { LogDetails } from "../components/Log/LogDetails";
import { Nav } from "../components/Nav/Nav";

export const Log = () => {
  return (
    <div className="w-full h-screen gap-8 flex flex-col relative">
      <Nav />
      <main className="flex flex-1 flex-col items-center justify-start gap-4 w-full">
        <div className="flex h-full mb-8 flex-col justify-center w-full md:max-w-[80%]">
          <LogDetails />
        </div>
      </main>
    </div>
  );
};
