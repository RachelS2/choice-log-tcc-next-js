import {headers} from "next/headers";
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() } );
  console.log(session)
  if(!session) {
    redirect("/login");
  }
  return (
    <div className="flex text-black items-center justify-center min-h-screen bg-offWhite">
      <p>Welcome to your home page!</p>
    </div>
  );
}