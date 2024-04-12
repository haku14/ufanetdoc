import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ContainerHome from "../components/ContainerHome";
import { RoleType } from "@prisma/client";
import { getDocuments } from "./action";
import { authOptions } from "@/lib/auth";

export type User = {
  login: string;
  id: string;
  role: RoleType;
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  // const documents = await getDocuments();

  if (!session) {
    redirect("/login");
  }

  return <ContainerHome user={session.user} />;
}
