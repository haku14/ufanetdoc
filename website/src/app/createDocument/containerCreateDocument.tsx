"use client";

import Header from "@/src/components/Header";
import { User } from "../page";
import { RoleType } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import Input from "@/src/components/Input";
import React, { FormEvent, useState } from "react";
import { createDocument } from "./action";

interface Props {
  user: User;
}

const ContainerCreateDocument: React.FC<Props> = ({ user }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [numberSop, setNumberSop] = useState<number>();
  const [file, setFile] = useState<File | null>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const fileForm = new FormData();
    fileForm.append("file", file);

    try {
      await createDocument({
        name: title,
        file: fileForm,
        description: description,
        oldNumber: numberSop ? numberSop : null,
        filter: ["testfilter"],
      });
    } catch (error) {
      console.log("error " + error);
    }
  };
  return (
    <>
      <Header />
      {user.role === RoleType.USER ? (
        <h1 className="text-center text-3xl font-bold text-orange-400">
          Вы пытаетесь влезть туда, куда вам нельзя. К вам уже едет омон и это
          самая хорошая новость
        </h1>
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
            Создание документа
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-10 mt-12 max-w-[800px] mx-auto"
          >
            <Input
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              label="Название документа"
            />
            <div>
              <p>Описание документа</p>
              <textarea
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
                className="border border-gray-400 pl-2 w-full rounded-xl bg-transparent min-h-[90px]"
              />
            </div>
            <Input
              value={numberSop}
              type="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNumberSop(Number(e.target.value))
              }
              label="Старый/внутренний номер СОПа (при наличии)"
            />
            <Input
              type="file"
              label="Документ"
              className="border-none pt-3"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFile(e.target.files![0])
              }
            />
            <button
              type="submit"
              className="bg-orange-400 p-2 text-white rounded-xl"
            >
              Загрузить документ
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ContainerCreateDocument;
