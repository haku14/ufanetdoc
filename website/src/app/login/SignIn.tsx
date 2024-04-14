"use client";

import Input from "@/src/components/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Checkbox from "@/src/components/Checkbox";
import Link from "next/link";
import { toast } from "react-toastify";

const SignIn = () => {
  const [data, setData] = useState({
    login: "",
    password: "",
  });

  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (data.login === "" || data.password === "") {
          toast.error("Введите пароль и логин");
          return;
        }
        try {
          const res = await signIn("credentials", {
            login: data.login,
            password: data.password,
            redirect: false,
          });

          if (res?.error) {
            toast.error("Введен неправильный пароль или логин");
            throw res.error;
          }
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
          <button className="w-full bg-orange-400 text-white rounded-xl p-2">
            Вход
          </button>
        </Link>
        <Link href={"/registration"} className="w-full">
          <button className="w-full text-orange-400 p-2">Регистрация</button>
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
      {/* <Checkbox title="Запомнить меня" /> */}
      <button
        type="submit"
        className="w-full p-2 rounded-xl border-orange-400 border text-orange-400"
      >
        Войти
      </button>
    </form>
  );
};

export default SignIn;
