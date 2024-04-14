"use client";

import Header from "@/src/components/Header";
import { User } from "../page";
import { RoleType } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { addAdminUser, deleteUser } from "./action";

interface Props {
  user: User;
  users: User[];
}

const ContainerUsers: React.FC<Props> = ({ user, users }) => {
  const handleDeleteUser = async (id: string) => {
    if (window.confirm("Вы уверены что хотите удалить этого юзера?")) {
      await deleteUser(id);
    }
  };

  const handleAddAdminUser = async (id: string) => {
    if (window.confirm("Вы уверены что хотите дать админку этому юзеру?")) {
      await addAdminUser(id);
    }
  };

  return (
    <>
      <Header />
      {user.role === RoleType.USER ? (
        <h1 className="text-center text-3xl font-bold text-orange-400">вон.</h1>
      ) : (
        <div className="container">
          <Link className="flex items-center gap-1 mt-3" href={"/"}>
            <Image
              src={"/icons/arrow.svg"}
              alt="arrow icon"
              width={30}
              height={30}
            />
            <p className="text-xl mt-1">Вернуться</p>
          </Link>
          <h1 className="text-center text-4xl font-bold text-orange-400 mt-8">
            Управление пользователями
          </h1>
          <div className="mt-10 flex flex-col gap-5 max-w-[800px] mx-auto">
            {users.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 rounded-lg w-full bg-gray-200"
              >
                <div>
                  <p className="text-orange-400 text-xl font-medium">
                    {item.login}
                  </p>
                  <p>{item.role === RoleType.ADMIN ? "Бог" : "Чел"}</p>
                </div>
                {item.role === RoleType.USER && (
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleAddAdminUser(item.id)}>
                      Сделать админом
                    </button>
                    |
                    <button onClick={() => handleDeleteUser(item.id)}>
                      Бан
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ContainerUsers;
