"use server";

import { Document } from "@prisma/client";
import prisma from "@/lib/prisma";
import { saveBlob } from "@/lib/queries";

export async function createDocument(
  data: Omit<Document, "file" | "id" | "createdAt"> & { file: FormData }
) {
  try {
    const newFile = await saveBlob(data.file);

    console.log(newFile);

    await prisma.document.create({
      data: { ...data, file: [newFile!] },
    });

    console.log("документ загружен");
  } catch (error) {
    console.error("Ошибка при создании документа:", error);
    throw error;
  }
}
