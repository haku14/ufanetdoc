import Image from "next/image";

interface Props {
  title: string;
  date: Date;
}

const Document: React.FC<Props> = ({ title, date }) => {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  return (
    <div className="w-full p-5 bg-gray-200 rounded-xl cursor-pointer hover:-translate-y-1 duration-300">
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
    </div>
  );
};

export default Document;
