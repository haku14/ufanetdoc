import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import ContainerUsers from "./ContainerUsers";
import { getUsers } from "./action";

export default async function CreateDocument() {
  const session = await getServerSession(authOptions);
  const users = await getUsers(session?.user.id!);

  if (!session) {
    redirect("/login");
  }

  return <ContainerUsers user={session.user} users={users} />;
}
