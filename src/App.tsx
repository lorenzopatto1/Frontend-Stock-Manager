import { Link, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { useEffect } from "react";

function App() {
  const token = Cookies.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/home")
    }
    //eslint-disable-next-line
  }, [])
  
  return (
    <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full flex items-center flex-col sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <Link
          className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-indigo-500 hover:text-indigo-400"
          to="/login"
        >
          Fazer login
        </Link>
        <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight">
          Não tem uma conta?{" "}
          <Link className="text-indigo-500 hover:text-indigo-400" to="/">
            Registrar-se
          </Link>
        </h2>
      </div>
    </div>
  );
}

export default App;
