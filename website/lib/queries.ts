import { Prisma, User } from "@prisma/client";
import prisma from "./prisma";

export async function getUsers(params: Prisma.UserWhereInput) {
  return await prisma.user.findMany({ where: params });
}

export async function getUser(login: string) {
  return await prisma.user.findFirst({ where: { login } });
}

export async function createUser(data: Omit<User, "id">) {
  await prisma.user.create({ data });
}
