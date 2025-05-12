// Este Util es para formatear la fecha de un string ISO a un formato legible
export function formatDate(isoString: string) : string {
const date = new Date(isoString)
const formatter = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
})
return formatter.format(date)
}