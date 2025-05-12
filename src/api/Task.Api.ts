import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, Task, TaskFormData, taskSchema } from "../types";

type TaskApi = {
  formData: TaskFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
  status: Task["status"];
};

// Esta funcion se encarga de crear una nueva tarea,
// Requiere el id del proyecto y los datos del formulario
export async function createTask({
  formData,
  projectId,
}: Pick<TaskApi, "formData" | "projectId">) {
  try {
    const url = `/projects/${projectId}/tasks`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

// Esta funcion se encarga de traer una tarea por su ID
// requiere el id de la tarea y el id del proyecto
export async function getTaskById({
  taskId,
  projectId,
}: Pick<TaskApi, "taskId" | "projectId">) {
  if (!taskId) return null; // <-- aseguras que no se ejecute la petición
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api(url);

    const response = taskSchema.safeParse(data);
    if (response.success) {
      return response.data;
    } 
  } catch (error) {
   
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

// esta funcion se encarga de editar y actualizar la tarea
// se le pasa el id de la tarea, el id del proyecto y los datos del formulario
export async function updateTask({
  formData,
  projectId,
  taskId,
}: Pick<TaskApi, "formData" | "projectId" | "taskId">) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.put<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

// esta funcion se encarga de eliminar la tarea
// se le pasa el id de la tarea y el id del proyecto
export async function deleteTask({
  taskId,
  projectId,
}: Pick<TaskApi, "taskId" | "projectId">) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateStatus({
  taskId,
  projectId,
  status,
}: Pick<TaskApi, "taskId" | "projectId" | "status">) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/status`;
    const { data } = await api.post<string>(url, { status });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
