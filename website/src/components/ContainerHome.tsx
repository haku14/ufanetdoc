"use client";

import Checkbox from "@/src/components/Checkbox";
import DocumentItem from "@/src/components/DocumentItem";
import Header from "@/src/components/Header";
import Input from "@/src/components/Input";
import { signOut } from "next-auth/react";
import { User } from "../app/page";
import { Document, RoleType } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { categories, departaments } from "@/lib/constans";

interface Props {
  user: User;
  documents: Document[];
  userSelected: string[];
  userSelecttedName: Document[];
}

const ContainerHome: React.FC<Props> = ({
  user,
  documents,
  userSelected,
  userSelecttedName,
}) => {
  const [departament, setDepartament] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const filterDocuments = useMemo(() => {
    let filter = documents;

    if (search !== "") {
      filter = filter.filter((item) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }

    if (category.length > 0) {
      filter = filter.filter((item) =>
        item.category.some((cat) => category.includes(cat))
      );
    }

    if (departament.length > 0) {
      filter = filter.filter((item) =>
        item.departament.some((cat) => departament.includes(cat))
      );
    }

    return filter;
  }, [search, category, documents, departament]);

  const clearFilter = () => {
    setSearch("");
    setCategory([]);
    setDepartament([]);
  };

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div className="mt-6 flex gap-4">
            <div className="w-[300px] max-lg:w-[220px]">
              <Input
                placeholder="Поиск"
                search
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
              />
              <button
                onClick={() => clearFilter()}
                className="text-orange-400 text-sm mt-3"
              >
                Сброс фильтров
              </button>
              <p className="text-xl text-orange-400 mt-6 font-semibold">
                Служба отдел
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {departaments.map((item, i) => (
                  <Checkbox
                    key={i}
                    title={item}
                    setSelect={setDepartament}
                    select={departament}
                  />
                ))}
              </div>
              <p className="text-xl text-orange-400 mt-6 font-semibold">
                Категория
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {categories.map((item, i) => (
                  <Checkbox
                    key={i}
                    title={item}
                    setSelect={setCategory}
                    select={category}
                  />
                ))}
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-5">
              {filterDocuments.length ? (
                filterDocuments.map((item, i) => {
                  const select = userSelected.includes(item.id);
                  return (
                    <DocumentItem
                      key={i}
                      title={item.name}
                      date={item.createdAt}
                      userId={user.id}
                      documentId={item.id}
                      select={select}
                      //@ts-ignore
                      file={item.file}
                    />
                  );
                })
              ) : (
                <p>Документов не нашлось</p>
              )}
            </div>
            <div>
              {user.role === RoleType.ADMIN && (
                <div className="w-[250px] mb-3">
                  <div className="bg-gray-200 rounded-xl p-4">
                    <p className="text-purple-400 text-xl font-bold">
                      Панель управления
                    </p>
                    <Link href={"/createDocument"}>
                      <button className="mt-4 text-lg">
                        + Добавить документ
                      </button>
                    </Link>
                    <Link href={"/users"}>
                      <button className="mt-4 text-lg">Пользователи</button>
                    </Link>
                  </div>
                </div>
              )}
              <div className="w-[250px]">
                <div className="bg-gray-200 rounded-xl p-4">
                  <p className="text-purple-400 text-lg font-bold">Избранное</p>
                  {userSelecttedName.length ? (
                    userSelecttedName.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => setSearch(item.name)}
                        className="w-full text-left p-1"
                      >
                        {item.name}
                      </button>
                    ))
                  ) : (
                    <p className="mt-4 text-sm">Нет избранного</p>
                  )}
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
