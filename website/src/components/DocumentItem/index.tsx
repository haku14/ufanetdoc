"use client";

import { months } from "@/lib/constans";
import Like from "@/public/icons/like";
import { selectedAdd, selectedRemove } from "@/src/app/action";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  title: string;
  date: Date;
  file: string[];
  userId: string;
  documentId: string;
  select: boolean;
}

const DocumentItem: React.FC<Props> = ({
  title,
  date,
  file,
  userId,
  documentId,
  select = false,
}) => {
  const [like, setLike] = useState(select);

  const handleClick = async () => {
    setLike(!like);
    if (select) {
      await selectedRemove(userId, documentId);
    } else {
      await selectedAdd(userId, documentId);
    }
  };
  return (
    <Link
      href={`/document/${documentId}`}
      className="w-full p-5 bg-gray-200 rounded-xl duration-300 flex justify-between gap-5 items-center"
    >
      <div className="w-full">
        <p className="text-2xl font-medium text-orange-400">{title}</p>
        <div className="flex gap-2 items-center">
          <Image
            src={"/icons/calendar.svg"}
            alt="calendar icon"
            width={15}
            height={15}
          />
          <p className="text-sm text-gray-800 mt-1">{`${date.getDate()} ${
            months[date.getMonth()]
          }, ${date.getFullYear()}`}</p>
        </div>
        <div className="flex gap-2 mt-2">
          {file.map((item, i) => (
            //@ts-ignore
            <a key={i} href={item.url} download target="_blank" className="">
              {i > 0 && "|"} Скачать документ {i + 1}
            </a>
          ))}
        </div>
      </div>
      <button onClick={handleClick} className="w-[25px] h-[25px] mr-5">
        <Like fill={like ? "#ff9494" : "#e5e7eb"} />
      </button>
    </Link>
  );
};

export default DocumentItem;
