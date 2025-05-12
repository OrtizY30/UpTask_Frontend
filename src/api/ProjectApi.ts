import api from "@/lib/axios";
import {
  dashboardProjectSchema,
  editProjectSchema,
  Project,
  ProjectFormData,
  projectSchema
} from "../types";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData) {
 
  try {
    const { data } = await api.post("/projects", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getProjects() {
 
  try {
    const { data } = await api("/projects");
    const response = dashboardProjectSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getProjectById(id: Project["_id"],) {
 
  try {
    const { data } = await api(`/projects/${id}`);
    const response = editProjectSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getFullProject(id: Project['_id']) {
  try {
      const { data } = await api(`/projects/${id}`)
      const response = projectSchema.safeParse(data)
      if(response.success) {
          return response.data
      }
  } catch (error) {
      if(isAxiosError(error) && error.response) {
          throw new Error(error.response.data.error)
      }
  }
}

// ProjectApiType es un tipo que se utiliza para definir el tipo de datos que se espera recibir en la función updateProject
// contiene los datos del formulario y el id del proyecto
type ProjectApiType = {
  formData: ProjectFormData;
  projectId: Project["_id"];
};

// updateProject es una función que se encarga de actualizar un proyecto
// recibe un objeto con los datos del proyecto y el id del proyecto
// y devuelve una promesa con el resultado de la operación
export async function updateProject({ formData, projectId }: ProjectApiType) {
  try {
    const { data } = await api.put<string>(`/projects/${projectId}`, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteProjet(id: Project["_id"]) {
  try {
    const { data } = await api.delete<string>(`/projects/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
