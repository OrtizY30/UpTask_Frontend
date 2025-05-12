import { Link } from "react-router-dom";


export default function NotFount() {
  return (
    <>
   <h1 className="font-black text-center text-4xl text-white ">Página No Encontrada</h1>
   <p className="m-10 text-center text-white">
    Tal vez quieras volver a {' '}
    <Link className="text-fuchsia-500 hover:underline" to={'/'} >Proyectos</Link>
   </p>
    </>

  )
}
