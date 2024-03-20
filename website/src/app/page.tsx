import Checkbox from "@/components/Checkbox";
import Document from "@/components/Document";
import Header from "@/components/Header";
import Input from "@/components/Input";

export default function Home() {
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
            <div className="w-[200px]">
              <div className="bg-gray-200 rounded-xl p-4">
                <p className="text-purple-400 text-lg font-bold">Избранное</p>
                <p className="mt-4 text-sm">Нет избранного</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

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
