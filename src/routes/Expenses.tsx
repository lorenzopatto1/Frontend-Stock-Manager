import { Header } from "../components/Header"
import { Nav } from "../components/Nav/Nav"
import { Settings } from "../components/Settings/Settings"

export const Expenses = () => {
  return (
    <div className="flex overflow-auto h-screen">
      <Nav />
      <Settings />

      <main className="flex flex-1 flex-col items-center">
        <Header />
        
        <div className="flex flex-1 items-center justify-center font-bold text-[2vw]">
          Ainda em desenvolvimento....
        </div>
        
      </main>
    </div>
  )
}
