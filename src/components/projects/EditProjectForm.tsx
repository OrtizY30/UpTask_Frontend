import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectForm from "./ProjectsForm";
import { ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectApi";
import { toast } from "react-toastify";

// el type EditProjectProps es un tipo que se utiliza para definir las propiedades que se le pasan al componente EditProjectForm
// y se utiliza para definir el tipo de datos que se espera recibir en el componente
type EditProjectProps = {
  data: ProjectFormData;
};

export default function EditProjectForm({ data }: EditProjectProps) {
  // useParams es un hook que nos permite acceder a los parametros de la ruta
  // y nos permite obtener el id del proyecto que se va a editar
  const params = useParams();
  // projectId es el id del proyecto que se va a editar
  // y se obtiene de los parametros de la ruta
  const projectId = params.projectId!;
  // useNavigate es un hook que nos permite navegar entre rutas
  // y nos permite redirigir al usuario a otra ruta
  const navigate = useNavigate();

    // useform es un hook que nos permite manejar el estado del formulario 
    // y nos permite manejar la validación del formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName: data.projectName,
      clientName: data.clientName,
      description: data.description,
    },
  });

  const queryClient = useQueryClient();
  
  // Se debe colocar el nombre de la mutacion que se va a realizar, en este caso es updateProject
  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
        // Elimina la cache de los proyectos y de la mutacion de editar proyectos
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["editProjects"] });
      toast.success(data);

      navigate("/");
    },
  });

  // handleForm es una función que se ejecuta cuando se envía el formulario
  // y se utiliza para manejar el envío del formulario
  const handleForm = (formData: ProjectFormData) => {
    // Mutate solo recibe un parametro por lo tanto cuando se requiera pasar varios parametros lo idel es crear un objeto antes y ese objeto pararse a mutate como un solo parametro con toda la informacion
    // el objeto data contiene los datos del formulario y el id del proyecto
    const data = {
      formData,
      projectId,
    };
    // mutate es una función que se utiliza para ejecutar la mutación
    // y se utiliza para enviar los datos del formulario a la API
    mutate(data);
  };
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Editar Proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Formulario para editar el nuevo proyecto
        </p>

        <nav className="my-5">
          <Link
            to={"/"}
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          >
            Volver a Proyectos
          </Link>
        </nav>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value={"Guardar Cambios"}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
