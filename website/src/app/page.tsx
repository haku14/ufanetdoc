import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ContainerHome from "../components/ContainerHome";
import { RoleType } from "@prisma/client";

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

  return <ContainerHome user={session.user} />;
}
