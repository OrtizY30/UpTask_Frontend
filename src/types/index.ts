import { z } from "zod";
// Tasks


// Auth & User
 export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  current_password: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string()

})

// este de schema es para el formulario de login
type Auth = z.infer<typeof authSchema>

// este de type es para el formulario de registro
export type UserLoginForm = Pick<Auth, 'email' | 'password'>

// este type es para almacenar el token de la cuenta
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>

// Este type para el formulario de reenvios de token 
export type RequestConfirmationCodeForm = Pick<Auth
, 'email'>

export type ForgotPasswordForm = Pick<Auth, 'email'>

// Este type para el formulario de confirmacion de cuenta
export type ConfirmToken = Pick<Auth, 'token'>

// Users Types
export const userSchema = authSchema.pick({
  name: true,
  email: true
}).extend({
  _id: z.string()
})

export type User = z.infer<typeof userSchema>
export type UserProfileform = Pick<User, 'name' | 'email'>

// Types Notes 
const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  createdAt: z.string()
})

export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content'>

// Types de tareas
export const taskStatusSchema = z.enum(["pending" , "onHold" , "inProgress" , "underReview" , "completed"])

export type TaskStatus = z.infer<typeof taskStatusSchema>

export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>

export type UpdateCurrentUserPasswordForm = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>
export type CheckPasswordForm = Pick<Auth, 'password'>


export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  completedBy: z.array(z.object({
    _id: z.string(),
    user: userSchema,
    status: taskStatusSchema
  })),
  notes: z.array(noteSchema.extend({
    createdBy: userSchema
  })),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const taskProjectSchema = taskSchema.pick({
  _id: true,
  name: true,
  description: true,
  status: true
})

export type Task = z.infer<typeof taskSchema>;
// este de schema es para el formulario de crear tarea
export type TaskFormData = Pick<Task, 'name' | 'description'>;
export type TaskProject = z.infer<typeof taskProjectSchema>



// Projects
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  manager: z.string(userSchema.pick({_id: true})),
  tasks: z.array(taskProjectSchema),
  team: z.array(z.string(userSchema.pick({_id: true})))
});

export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true
   
  })
)

export const editProjectSchema = projectSchema.pick({
  projectName: true,
  clientName: true,
  description: true,
})

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>


// Team
const teamMemberSchema = userSchema.pick({
  name: true,
  email: true,
  _id: true
})

export const teamMembersSchema = z.array(teamMemberSchema)
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>









