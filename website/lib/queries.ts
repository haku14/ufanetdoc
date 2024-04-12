import { Prisma, User } from "@prisma/client";
import prisma from "./prisma";
import { v4 } from "uuid";
import { put } from "@vercel/blob";

export async function getUsers(params: Prisma.UserWhereInput) {
  return await prisma.user.findMany({ where: params });
}

export async function getUser(login: string) {
  return await prisma.user.findFirst({ where: { login } });
}

export async function createUser(data: Omit<User, "id">) {
  await prisma.user.create({ data });
}

export async function saveBlob(formData: FormData) {
  const file = formData.get("file");
  const name = (file as File)?.name;

  if (!name) {
    return;
  }

  const realFileName = name;
  const fileName = `${v4()}.${realFileName?.substring(
    realFileName?.lastIndexOf(".") + 1
  )}`;

  const blob = await put(fileName, file as Blob, {
    access: "public",
  });

  return blob.url;
}
