import Head from "next/head"
import { Header } from "../../components/Header"
import { Nav } from "../../components/Nav/Nav"
import { Settings } from "../../components/Settings/Settings"
import { Form } from "../../components/InOuts/Form"
import { Table } from "../../components/InOuts/Table"

const Expenses = () => {
  return (
    <div className="flex h-full">
      <Head>
        <title>Entradas/Saídas</title>
      </Head>

      <Nav />
      <Settings />

      <main className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <div className="flex font-bold text-[2vw] h-full overflow-hidden">
          <div className="flex-1 lg:max-w-[40%] p-2 md:p-4 lg:p-8">
            <Form />
          </div>
          <div className="flex-col flex-1 flex h-full p-2 md:p-4 lg:p-8 w-2/4 rounded-md">
            <Table />
          </div>
        </div>

      </main>
    </div>
  )
}

export default Expenses;