import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ContainerCreateDocument from "./containerCreateDocument";
import { authOptions } from "@/lib/auth";

export default async function CreateDocument() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <ContainerCreateDocument user={session.user} />;
}
