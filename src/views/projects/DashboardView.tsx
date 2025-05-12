import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router";
import { getProjects } from "@/api/ProjectApi";
import {  useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import DeleteProjectModal from "@/components/DeleteProjectModal";

export default function DashBoardView() {
  const { data: user, isLoading: authLoading } = useAuth();

  const navigate = useNavigate()
  // useQuery es un hook que nos permite hacer consultas a la API
  // y nos permite manejar el estado de la consulta
  const { data, isLoading } = useQuery({
    // queryKey: ["projects"], // es una clave única que identifica la consulta
    // queryFn: getProjects, // es la función que se ejecuta para obtener los datos
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isLoading && authLoading) return "Cargando";

  if (data && user)
    return (
      <>
        <h1 className="text-5xl font-black">Mis Proyectos</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Maneja y administra tus proyectos
        </p>

        <nav className="my-5">
          <Link
            to={"/projects/create"}
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          >
            Nuevo Proyecto
          </Link>
        </nav>

        {data.length ? (
          <ul
            role="list"
            className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg"
          >
            {data.map((project) => (
              <li
                key={project._id}
                className="flex justify-between gap-x-6 px-5 py-10"
              >
                <div className="flex min-w-0  gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <div>
                      {isManager(project.manager, user._id) ? (
                        <p className="font-bold text-xs uppercase bg-green-50 text-green-500 border-2 border-green-600 inline-block py-1 px-5 rounded-lg ">
                          Manager
                        </p>
                      ) : (
                        <p className="font-bold text-xs uppercase bg-indigo-50 text-indigo-500 border-2 border-indigo-600 inline-block py-1 px-5 rounded-lg ">
                          Colaborador
                        </p>
                      )}
                    </div>
                    <Link
                      to={`/projects/${project._id}`}
                      className="text-gray-600 capitalize cursor-pointer hover:underline text-3xl font-bold"
                    >
                      {project.projectName}
                    </Link>
                    <p className="text-sm mt-2 capitalize text-gray-400">
                      Cliente: {project.clientName}
                    </p>
                    <p className="text-sm capitalize text-gray-400">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative flex-none ">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon
                        className="h-9 w-9 cursor-pointer"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <Menu.Item>
                          <Link
                            to={`/projects/${project._id}`}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900"
                          >
                            Ver Proyecto
                          </Link>
                        </Menu.Item>

                        {isManager(project.manager, user._id) && (
                          <>
                            <Menu.Item>
                              <Link
                                to={`/projects/${project._id}/edit`}
                                className="block px-3 py-1 text-sm leading-6 text-gray-900"
                              >
                                Editar Proyecto
                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <button
                                type="button"
                                className="block hover:bg-red-100 cursor-pointer px-3 py-1 text-sm leading-6 text-red-500"
                                onClick={() => navigate(location.pathname + `?deleteProject=${project._id}`)}
                              >
                                Eliminar Proyecto
                              </button>
                            </Menu.Item>
                          </>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-20">
            No hay proyectos aún{" "}
            <Link
              className="text-fuchsia-500 font-bold"
              to={"/projects/create"}
            >
              Crear Proyecto
            </Link>
          </p>
        )}

        <DeleteProjectModal/>
      </>
    );
}
