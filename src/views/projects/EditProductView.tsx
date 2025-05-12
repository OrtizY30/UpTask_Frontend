import { getProjectById } from "@/api/ProjectApi";
import EditProjectForm from "@/components/projects/EditProjectForm";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export default function EditProductView() {
  // useParams es un hook que nos permite acceder a los parámetros de la ruta
  // y nos permite obtener el id del proyecto que se va a editar
  const params = useParams();
  // params es un objeto que contiene los parámetros de la ruta
  // y se utiliza para obtener el id del proyecto que se va a editar
  const projectId = params.projectId!;

  // useQuery es un hook que nos permite hacer consultas a la API
  // y nos permite manejar el estado de la consulta
  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProjects", projectId],
    // Cuando la funcion recibe un parametro se debe colocar un arrow fuction
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading) return "Cargando...";
  // isLoading es un booleano que indica si la consulta está en curso
  // y se utiliza para mostrar un mensaje de carga mientras se espera la respuesta de la API
  if (isError) return <Navigate to={"/404"} />;

  // si data existe, significa que la consulta fue exitosa y se recibieron los datos
  // y se utiliza para mostrar el formulario de edición del proyecto
  if (data) return <EditProjectForm data={data} />;
}
