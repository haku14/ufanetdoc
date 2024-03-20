import Image from "next/image";

interface Props {}

const Header: React.FC<Props> = ({}) => {
  return (
    <header className="py-6 border-b border-gray-300">
      <div className="container">
        <div className="flex items-center gap-5">
          <Image src={"/icons/logo.svg"} alt="logo" width={200} height={200} />
          <div>
            <p className="text-orange-400 text-2xl font-bold">База знаний</p>
            <p className="text-purple-400 text-lg">
              Руководящие документы служб Уфанет
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
