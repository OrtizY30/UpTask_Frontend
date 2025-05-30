import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashBoardView from "@/views/projects/DashboardView";
import CreateProejectView from "./views/projects/CreateProejectView";
import EditProductView from "./views/projects/EditProductView";
import ProjectDetailsView from "./views/projects/ProjectDetailsView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccounView from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import ProjectTeamView from "./views/projects/ProjectTeamView";
import ProfileView from "./views/profile/ProfileView";
import ChangePasswordView from "./views/profile/ChangePasswordView";
import ProfileLayout from "./layouts/ProfileLayout";
import NotFount from "./views/404/NotFount";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashBoardView />} index />
          <Route path="/projects/create" element={<CreateProejectView />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsView />} />
          <Route
            path="/projects/:projectId/edit"
            element={<EditProductView />}
          />
          <Route
            path="/projects/:projectId/team"
            element={<ProjectTeamView />}
          />

          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/profile/password" element={<ChangePasswordView />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route path="/auth/confirm-account" element={<ConfirmAccounView />} />
          <Route path="/auth/request-code" element={<RequestNewCodeView />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordView />}
          />
          <Route path="/auth/new-password" element={<NewPasswordView />} />
        </Route>
        <Route element={<AuthLayout/>} >
        <Route path="*" element={<NotFount/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
