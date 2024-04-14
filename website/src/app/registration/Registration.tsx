"use client";

import Input from "@/src/components/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Checkbox from "@/src/components/Checkbox";
import Link from "next/link";
import { checkLogin } from "./action";
import { toast } from "react-toastify";

interface Props {}

const RegistrationContainer: React.FC<Props> = ({}) => {
  const [data, setData] = useState({
    login: "",
    password: "",
    repeatPassword: "",
  });
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (
          data.login === "" ||
          data.password === "" ||
          data.repeatPassword === ""
        ) {
          toast.error("Введите пароль и логин");
          return;
        }

        if (data.password !== data.repeatPassword) {
          toast.error("Пароли не совпадают");
          return;
        }

        try {
          const check = await checkLogin(data.login, data.password);
          if (!check) {
            toast.error("Пользователь уже существует");
            return;
          }
          await signIn("credentials", {
            login: data.login,
            password: data.password,
            redirect: false,
          });
          router.push("/");
          toast.success("Добро пожаловать!");
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
      <div>
        <Input
          label="Пароль"
          placeholder="Введите пароль"
          type="password"
          value={data.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData((p) => ({ ...p, password: e.target.value }))
          }
        />
        <Input
          className="mt-3"
          placeholder="Повторите пароль"
          type="password"
          value={data.repeatPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData((p) => ({ ...p, repeatPassword: e.target.value }))
          }
        />
      </div>
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
