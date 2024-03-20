import Checkbox from "@/components/Checkbox";
import Header from "@/components/Header";
import Input from "@/components/Input";

export default function Login() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="mt-6 flex flex-col items-center">
          <h1 className="text-orange-400 text-center text-4xl font-bold">
            Добро пожаловать!
          </h1>
          <p className="mt-4 text-gray-500 text-center">
            Войдите, используя свой логин и пароль или зарегистрируйстесь
          </p>
          <div className="mt-8 bg-white rounded-xl p-6 max-w-[500px] w-full gap-6 flex flex-col">
            <Input label="Логин" placeholder="Введите логин" />
            <Input label="Пароль" placeholder="Введите пароль" />
            <Checkbox title="Запомнить меня" />
            <div className="flex gap-4">
              <button className="w-full bg-orange-400 text-white rounded-xl p-2">
                Вход
              </button>
              <button className="w-full text-orange-400">Регистрация</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
