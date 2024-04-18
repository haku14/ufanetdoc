"use server";

import prisma from "@/lib/prisma";

export async function getDocument(id: string) {
  return await prisma.document.findFirst({
    where: { id: id },
  });
}
