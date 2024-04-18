import Header from "@/src/components/Header";
import Image from "next/image";
import Link from "next/link";
import { getDocument } from "../action";
import TestImage from "../../../../public/test.webp";

export default async function Document({
  params,
}: {
  params: { slug: string };
}) {
  const document = await getDocument(params.slug);
  return (
    <>
      <Header />
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
          {document?.name}
        </h1>
        <div className="mt-10 flex flex-col gap-5 max-w-[1100px] mx-auto">
          <div className="flex w-full gap-10 items-center">
            <Image
              src={document?.preview!}
              alt="errror"
              width={400}
              height={400}
              className="rounded-lg"
            />
            <div className="flex gap-2 mt-2 flex-col">
              {document?.file.map((item, i) => (
                <a
                  key={i}
                  //@ts-ignore
                  href={item.url}
                  download
                  target="_blank"
                  className="bg-orange-400 p-3 max-w-[230px] w-full rounded-lg"
                >
                  Скачать документ {i + 1}
                </a>
              ))}
            </div>
          </div>
          <p className="text-2xl font-bold mt-5">Описание документа</p>
          <p>{document?.description}</p>
        </div>
      </div>
    </>
  );
}
