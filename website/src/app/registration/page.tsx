import Header from "@/src/components/Header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RegistrationContainer from "./Registration";

export default async function Registration() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }
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
          <RegistrationContainer />
        </div>
      </div>
    </>
  );
}
