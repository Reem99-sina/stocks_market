import { toast } from "sonner";

export async function handleApiRequest<T>(
  requestFn: () => Promise<T>
): Promise<T | null> {
  try {
    const response = await requestFn();

    toast.success("Success ✅");

    return response;
  } catch (error: any) {
    let message = "Something went wrong";

    if (error?.response) {
      message =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        JSON.stringify(error.response?.data);
    } else if (error?.message) {
      message = error.message;
    }

    toast.error(message);

    return null;
  }
}