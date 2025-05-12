import { deleteNote } from "@/api/NoteApi";
import { useAuth } from "@/hooks/useAuth";
import { Note } from "@/types/index";
import { formatDate } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type NoteDetailsPorps = {
  note: Note;
};
export default function NoteDetails({ note }: NoteDetailsPorps) {
  const params = useParams()
  const locations = useLocation()
  const queryParams = new URLSearchParams(locations.search)

  const projectId = params.projectId!
  const taskId = queryParams.get('viewTask')!

  const { data, isLoading } = useAuth();
  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);

  const queryCliente = useQueryClient()
  
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError : (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryCliente.invalidateQueries({queryKey: ['task', taskId]})
    }
  })

  if (isLoading) return "Cargando...";
  return (
    <div className="p-3 flex justify-between items-center">
      <div>
        <p className="first-letter:uppercase">
          {note.content} por:{" "}
          <span className="font-bold capitalize">{note.createdBy.name}</span>
        </p>
        <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
      </div>

      {canDelete && (
        <button
          type="button"
          className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold  cursor-pointer transition-colors"
          onClick={() => mutate({projectId, taskId, noteId: note._id })}
        >
          Eliminar
        </button>
      )}
    </div>
  );
}
