"use client";

import Input from "@/src/components/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Checkbox from "@/src/components/Checkbox";
import Link from "next/link";
import { checkLogin } from "./action";

interface Props {}

const RegistrationContainer: React.FC<Props> = ({}) => {
  const [data, setData] = useState({
    login: "",
    password: "",
  });
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const check = await checkLogin(data.login, data.password);
          if (check) {
            await signIn("credentials", {
              login: data.login,
              password: data.password,
              redirect: false,
            });
            router.push("/");
          }
        } catch (error) {
          console.error(error);
        }
      }}
      className="mt-8 bg-white rounded-xl p-6 max-w-[500px] w-full gap-8 flex flex-col"
    >
      <div className="flex">
        <Link href={"/login"} className="w-full">
          <button className="w-full text-orange-400 p-2">Вход</button>
        </Link>
        <Link href={"/registration"} className="w-full">
          <button className="w-full bg-orange-400 text-white  rounded-xl p-2">
            Регистрация
          </button>
        </Link>
      </div>
      <Input
        label="Логин"
        placeholder="Введите логин"
        value={data.login}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setData((p) => ({ ...p, login: e.target.value }))
        }
      />
      <Input
        label="Пароль"
        placeholder="Введите пароль"
        type="password"
        value={data.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setData((p) => ({ ...p, password: e.target.value }))
        }
      />
      <Checkbox title="Запомнить меня" />
      <button
        type="submit"
        className="w-full p-2 rounded-xl border-orange-400 border text-orange-400"
      >
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegistrationContainer;
