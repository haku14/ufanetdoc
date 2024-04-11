"use server";

import { createUser, getUser } from "@/lib/queries";
import { RoleType } from "@prisma/client";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export async function checkLogin(login: string, password: string) {
  const checkUser = await getUser(login);

  if (checkUser) {
    console.log("Пользователь уже существует");
    return false;
  } else {
    await createUser({ login: login, password: password, role: RoleType.USER });
    return true;
  }
}
