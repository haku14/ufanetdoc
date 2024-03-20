"use client";

import { useState } from "react";

interface Props {
  title: string;
}

const Checkbox: React.FC<Props> = ({ title }) => {
  const [check, setCheck] = useState(false);

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => setCheck(!check)}
    >
      <div className="border border-gray-400 w-5 h-5 flex items-center justify-center">
        {check && <div className="bg-gray-800 w-3 h-3" />}
      </div>
      <p className="text-base pointer-events-none">{title}</p>
    </div>
  );
};

export default Checkbox;
