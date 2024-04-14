"use server";

import prisma from "@/lib/prisma";
import { RoleType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getUsers(id: string) {
  return await prisma.user.findMany({
    where: {
      id: {
        not: id,
      },
    },
  });
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    });
    revalidatePath("/users");
  } catch (error) {
    console.log(error);
  }
}

export async function addAdminUser(id: string) {
  try {
    await prisma.user.update({
      where: { id },
      data: { role: RoleType.ADMIN },
    });
    revalidatePath("/users");
  } catch (error) {
    console.log(error);
  }
}
