"use server";

import { Document } from "@prisma/client";
import prisma from "@/lib/prisma";
import { saveBlob } from "@/lib/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createDocument(
  data: Omit<Document, "file" | "id" | "createdAt"> & { file: FormData[] }
) {
  const fileBlob = await Promise.all(
    data.file.map(async (item) => {
      const blob = await saveBlob(item);
      if (blob) {
        return blob;
      }
      return "error";
    })
  );

  try {
    await prisma.document.create({
      data: { ...data, file: fileBlob },
    });
    console.log("документ загружен");
    revalidatePath("/");
    redirect("/");
  } catch (error) {
    console.error("Ошибка при создании документа:", error);
    throw error;
  }
}
