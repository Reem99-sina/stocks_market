import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();
  console.log(session,'session')
  if (!session) {
    redirect("/login");
  }
  return redirect("/dashboard");;
}
