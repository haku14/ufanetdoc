"use client";

import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  setSelect: Dispatch<SetStateAction<string[]>>;
  select: string[];
  title: string;
}

const Checkbox: React.FC<Props> = ({ title, select, setSelect }) => {
  const check = select.includes(title);

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => {
        if (check) {
          setSelect((p) => p.filter((item) => item !== title));
        } else {
          setSelect((p) => [...p, title]);
        }
      }}
    >
      <div className="border border-gray-400 w-5 h-5 flex items-center justify-center">
        {check && <div className="bg-gray-800 w-3 h-3" />}
      </div>
      <p className="text-base pointer-events-none">{title}</p>
    </div>
  );
};

export default Checkbox;
