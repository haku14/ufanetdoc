import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLProps<HTMLInputElement> {
  search?: boolean;
}

const Input: React.FC<Props> = ({
  placeholder,
  id,
  label,
  search = false,
  className,
}) => {
  return (
    <div className="relative">
      {label && <label>{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        id={id}
        className={twMerge(
          "border border-gray-400 pr-8 pl-2 h-12 w-full  rounded-xl bg-transparent",
          className
        )}
      />
      {search && (
        <Image
          src={"/icons/search.svg"}
          alt="search"
          width={20}
          height={20}
          className="absolute right-2 top-1/2 -mt-2.5"
        />
      )}
    </div>
  );
};

export default Input;
