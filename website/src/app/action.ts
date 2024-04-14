"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getDocuments() {
  return await prisma.document.findMany({});
}

export async function getSelected(id: string) {
  return await prisma.user.findUnique({
    where: { id: id },
    select: { selected: true },
  });
}

export async function selectedAdd(userId: string, documentId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { selected: true },
  });

  if (!user) {
    console.error("User not found");
    return;
  }

  const updateSelected = [...user.selected, documentId];

  await prisma.user.update({
    where: { id: userId },
    data: { selected: updateSelected },
  });

  revalidatePath("/");
}

export async function selectedRemove(userId: string, documentId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { selected: true },
  });

  if (!user) {
    console.error("User not found");
    return;
  }

  const updateSelected = user.selected.filter((item) => item !== documentId);

  await prisma.user.update({
    where: { id: userId },
    data: { selected: updateSelected },
  });
  revalidatePath("/");
}
