import { format } from "date-fns"
import { vi } from "date-fns/locale"

export const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return format(date, "MMM d, h:mm a", { locale: vi }); // Using Vietnamese locale
}