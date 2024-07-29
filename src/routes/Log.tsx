import { Header } from "../components/Header";
import { LogDetails } from "../components/Log/LogDetails";
import { Nav } from "../components/Nav/Nav";
import { Settings } from "../components/Settings/Settings";

export const Log = () => {
  return (
    <div className="w-full h-screen flex relative">
      <Settings />
      <Nav />
      <main className="flex flex-1 flex-col items-center justify-start gap-4 w-full">
        <Header />
        <div className="flex h-full mb-8 flex-col justify-center w-full md:max-w-[80%]">
          <LogDetails />
        </div>
      </main>
    </div>
  );
};
