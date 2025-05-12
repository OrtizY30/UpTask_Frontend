import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  CheckPasswordForm,
  ConfirmToken,
  ForgotPasswordForm,
  NewPasswordForm,
  RequestConfirmationCodeForm,
  UserLoginForm,
  UserRegistrationForm,
  userSchema,
} from "../types";

// Esta función se encarga de crear una cuenta de usuario
// Recibe un objeto de tipo UserRegistrationForm como parámetro
export async function CreateAccount(formData: UserRegistrationForm) {
  try {
    const url = "/auth/create-account";
    // Se le pasa el generic string ya que el tipo de dato que se espera de la respuesta sea un string
    const { data } = await api.post<string>(url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

// Esta función se encarga de confirmar la cuenta de usuario
// Recibe un objeto de tipo ConfirmToken como parámetro
export async function confirmAccount(token: ConfirmToken) {
  try {
    const url = "/auth/confirm-account";
    // Se le pasa el generic string ya que el tipo de dato que se espera de la respuesta sea un string
    const { data } = await api.post<string>(url, token);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

// Esta funsion se encarga de reenviar un nuevo codigo de confimacion
export async function requesConfirmationCode(
  email: RequestConfirmationCodeForm
) {
  try {
    const url = "/auth/request-code";
    // Se le pasa el generic string ya que el tipo de dato que se espera de la respuesta sea un string
    const { data } = await api.post<string>(url, email);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

// Esta función se encarga de autenticar al usuario
// Recibe un objeto de tipo UserLoginForm como parámetro, que serian el email y password
// y devuelve un string con el token de autenticación
export async function authenticateUser(formData: UserLoginForm) {
  try {
    const url = "/auth/login";
    // Se le pasa el generic string ya que el tipo de dato que se espera de la respuesta sea un string
    const { data } = await api.post<string>(url, formData);
    localStorage.setItem("AUTH_TOKEN", data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

// Esta función se encarga de restablecer la contraseña del usuario
// recibe un objeto de tipo ForgotPasswordForm como parámetro, que serian el email
export async function ForgotPassword(email: ForgotPasswordForm) {
  try {
    const url = "/auth/forgot-password";
    // Se le pasa el generic string ya que el tipo de dato que se espera de la respuesta sea un string
    const { data } = await api.post<string>(url, email);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function validateToken(token: ConfirmToken) {
  try {
    const url = "/auth/validate-token";
    // Se le pasa el generic string ya que el tipo de dato que se espera de la respuesta sea un string
    const { data } = await api.post<string>(url, token);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updatePasswordWithToken({
  formData,
  token,
}: {
  formData: NewPasswordForm;
  token: ConfirmToken["token"];
}) {
  try {
    const url = `/auth/update-password/${token}`;
    // Se le pasa el generic string ya que el tipo de dato que se espera de la respuesta sea un string
    const { data } = await api.post<string>(url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getUser() {
  try {
    const { data } = await api("/auth/user");
    const response = userSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }

}

export async function checkPassword(formData: CheckPasswordForm) {
    try {
      const url = `/auth/check-password`;
      const { data } = await api.post<string>(url, formData);
      return data
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  
}


