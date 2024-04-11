"use client";

import Checkbox from "@/src/components/Checkbox";
import Document from "@/src/components/Document";
import Header from "@/src/components/Header";
import Input from "@/src/components/Input";
import { signOut } from "next-auth/react";
import { User } from "../app/page";
import { RoleType } from "@prisma/client";

interface Props {
  user: User;
}

const ContainerHome: React.FC<Props> = ({ user }) => {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div className="mt-6 flex gap-4">
            <div className="w-[300px] max-lg:w-[220px]">
              <Input placeholder="Поиск" search />
              <button className="text-orange-400 text-sm mt-3">
                Сброс фильтров
              </button>
              <p className="text-xl text-orange-400 mt-6 font-semibold">
                Служба отдел
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <Checkbox title="Сервисная служба (114)" />
                <Checkbox title="РСС (24)" />
                <Checkbox title="Служба проектирования (1)" />
              </div>
              <p className="text-xl text-orange-400 mt-6 font-semibold">
                Категория
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <Checkbox title="Интернет (55)" />
                <Checkbox title="ДРС (34)" />
                <Checkbox title="КТВ (25)" />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-5">
              {DOCUMENTS.map((item, i) => (
                <Document key={i} title={item.title} date={item.date} />
              ))}
            </div>
            <div>
              {user.role === RoleType.ADMIN && (
                <div className="w-[250px] mb-3">
                  <div className="bg-gray-200 rounded-xl p-4">
                    <p className="text-purple-400 text-xl font-bold">
                      Панель управления
                    </p>
                    <button className="mt-4 text-lg">
                      + Добавить документ
                    </button>
                  </div>
                </div>
              )}
              <div className="w-[250px]">
                <div className="bg-gray-200 rounded-xl p-4">
                  <p className="text-purple-400 text-lg font-bold">Избранное</p>
                  <p className="mt-4 text-sm">Нет избранного</p>
                </div>
              </div>
              <div className="w-[250px] mt-3">
                <div className="bg-gray-200 rounded-xl p-4">
                  <p className="text-purple-400 text-lg font-bold">Выход</p>
                  <p
                    onClick={() => signOut()}
                    className="mt-4 text-sm cursor-pointer"
                  >
                    Выйти
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContainerHome;

const DOCUMENTS = [
  {
    title: "Стандрат размещения запасов в МЖКД по технологии PON",
    date: new Date(),
  },
  {
    title: "СИЗ Привязь",
    date: new Date(),
  },
  {
    title: "СИЗ Каска",
    date: new Date(),
  },
  {
    title: "СИЗ Карабины",
    date: new Date(),
  },
  {
    title: "СИЗ амортизатор рывка",
    date: new Date(),
  },
];
