import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ProjectForm from "@/components/projects/ProjectsForm";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectApi";

export default function CreateProejectView() {
  // useNavigate es un hook que nos permite navegar entre rutas
  // y nos permite redirigir al usuario a otra ruta
  const navigate = useNavigate();

  // initialValues es un objeto que contiene los valores iniciales del formulario
  // y se utiliza para inicializar el formulario
  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };

  // useForm es un hook que nos permite manejar el estado del formulario
  // y nos permite manejar la validación del formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  // useMutation es un hook que nos permite realizar mutaciones
  // y nos permite manejar el estado de la mutación
  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message);
    },
    // onSuccess se ejecuta cuando la mutación es exitosa
    // y se utiliza para redirigir al usuario a otra ruta
    onSuccess: (data) => {
      toast.success(data);
      navigate("/");
    },
  });

  // handleForm es una función que se ejecuta cuando se envía el formulario
  // y se utiliza para manejar el envío del formulario
  const handleForm = (formData: ProjectFormData) => mutate(formData);

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear Proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario para crear un nuevo proyecto
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
            value={"Crear Proyecto"}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
