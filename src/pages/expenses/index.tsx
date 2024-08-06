import Head from "next/head"
import { Header } from "../../components/Header"
import { Nav } from "../../components/Nav/Nav"
import { Settings } from "../../components/Settings/Settings"

const Expenses = () => {
  return (
    <div className="flex overflow-auto h-screen">
      <Head>
        <title>Despesas</title>
      </Head>

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

export default Expenses;