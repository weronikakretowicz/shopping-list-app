import axios from "axios";
import toast from "react-hot-toast";

export const handleError = (error: unknown): void => {
  let errorMessage = "An unexpected error occurred.";

  if (axios.isAxiosError(error) && error.response) {
    errorMessage = error.response.data || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  toast.error(errorMessage);
};
