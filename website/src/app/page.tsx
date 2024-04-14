import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ContainerHome from "../components/ContainerHome";
import { RoleType } from "@prisma/client";
import { getDocuments, getSelected } from "./action";
import { authOptions } from "@/lib/auth";

export type User = {
  login: string;
  id: string;
  role: RoleType;
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const documents = await getDocuments();
  const userSelected = await getSelected(session?.user.id!);

  const selectedName = documents.filter((item) =>
    userSelected?.selected.includes(item.id)
  );

  return (
    <ContainerHome
      user={session.user}
      documents={documents}
      userSelected={userSelected?.selected!}
      userSelecttedName={selectedName}
    />
  );
}
