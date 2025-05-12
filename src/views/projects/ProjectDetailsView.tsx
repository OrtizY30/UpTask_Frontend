import { getFullProject } from "@/api/ProjectApi";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskList from "@/components/tasks/TaskList";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export default function ProjectDetailsView() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId;

  const { data: user, isLoading: authLoading } = useAuth();

  // si projectId no existe, redirigir a la página 404
  if (!projectId) return <Navigate to="/404" />;

  // useQuery es un hook que nos permite hacer consultas a la API
  // y nos permite manejar el estado de la consulta
  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    // Cuando la funcion recibe un parametro se debe colocar un arrow fuction
    queryFn: () => getFullProject(projectId),
    retry: false,
    enabled: !!projectId,
  });

  const canEdit = useMemo(() => data?.manager === user?._id, [data, user]);

  if (isLoading && authLoading) return "Cargando...";
  // isLoading es un booleano que indica si la consulta está en curso
  // y se utiliza para mostrar un mensaje de carga mientras se espera la respuesta de la API
  if (isError) return <Navigate to={"/404"} />;

  if (data && user)
    return (
      <>
        <h1 className="text-5xl font-black capitalize">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5 first-letter:uppercase">
          {data.description}
        </p>

        {isManager(data.manager, user._id) && (
          <nav className="my-5 flex gap-3">
            <button
              type="button"
              className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold transition-colors cursor-pointer"
              // ?newTask=true es un query string que se utiliza para indicar que se va a crear una nueva tarea
              // y se utiliza para mostrar el formulario de creación de la tarea
              onClick={() => navigate("?newTask=true")}
            >
              Agregar Tarea
            </button>

            <Link
              to={"team"}
              className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold transition-colors cursor-pointer"
            >
              Colaboradores
            </Link>
          </nav>
        )}

        <TaskList tasks={data.tasks} canEdit={canEdit} />

        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
}
