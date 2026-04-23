import { toast } from "sonner";
import axios from "axios";

export async function handleApiRequest<T>(
  requestFn: () => Promise<T>
): Promise<T | null> {
  try {
    const response = await requestFn();

    toast.success("Success ✅");

    return response;
  } catch (error: unknown) {
    let message = "Something went wrong";

    // Axios error handling
    if (axios.isAxiosError(error)) {
      message =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Request failed";
    }
    // Normal JS error
    else if (error instanceof Error) {
      message = error.message;
    }

    toast.error(message);

    return null;
  }
}