import { Link, useLocation, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "../../utils/classNames";

//Radix UI
import * as Avatar from "@radix-ui/react-avatar";
import { RxExit, RxHamburgerMenu } from "react-icons/rx";

//Types
import { ItemMenu } from "../../types/menu.d";

//Components
import ScrollArea from "../../components/ScrollArea";
import MenuItem from "./MenuItem";

export default function LayoutDashboard(): JSX.Element {
  const location = useLocation();

  const [fotoUrl] = useState<string | null>("imagens/user.png");
  const [menu] = useState<Array<ItemMenu>>([
    {
      descricao: "Projetos",
      link: "/",
      icone: "FaHome",
      ativo: true,
      caminho: "/",
    },
    {
      descricao: "Usuários",
      link: "/usuarios",
      icone: "FaUsers",
      ativo: true,
      caminho: "/",
    },
  ]);

  const [menuAberto, setMenuAberto] = useState<boolean | null>(null);

  useEffect(() => {
    if (menuAberto == null)
      setMenuAberto(localStorage.getItem("menuAberto") == "true");
  }, [location]);

  useEffect(() => {
    localStorage.setItem("menuAberto", JSON.stringify(menuAberto));
  }, [menuAberto]);

  const Logo = (): JSX.Element => {
    return (
      <Link to={"/"}>
        <div className="flex-shrink-0 flex flex-row gap-4 items-center justify-center p-2 py-4 bg-primary-800 mx-auto rounded-md">
          <img
            className="object-contain h-44 rounded-md"
            src={"/imagens/logo.png"}
            alt="/logo_imagem_texto_branco.png"
          />
        </div>
      </Link>
    );
  };

  return (
    <div className="overflow-hidden h-screen flex flex-col w-screen bg-primary-800 relative">
      <div className="w-full h-full flex flex-row gap-0">
        <div
          className={classNames(
            "select-none",
            "shadow transition duration-300 focus:outline-none",
            menuAberto ? "w-[14vw] min-w-fit" : "w-0",
            "h-full bg-primary-700 flex flex-col gap-2"
          )}
        >
          <h1 className="text-white text-lg pt-1 flex-1 w-full text-center flex flex-row items-center justify-center">
            <span className="font-bold">Gerência de Projetos</span>
          </h1>

          <div className="px-4">
            <Logo />
          </div>

          <ScrollArea paddingX="p-3">
            <>
              {menu.map((item, key) => (
                <MenuItem key={key} props={item} />
              ))}
            </>
          </ScrollArea>
        </div>

        <div className="  w-full h-full flex-1">
          <div className="bg-white h-fit w-full flex flex-row gap-4 items-center">
            <button
              onClick={() => setMenuAberto(!menuAberto)}
              id="botaoMenu"
              className="p-4"
            >
              <RxHamburgerMenu className="h-5 w-5 text-gray-600 " />
            </button>

            <div className="flex flex-row items-center justify-end gap-4 ml-auto border-x-2 px-4 py-2">
              <span className="hidden sm:inline">Débora Hellen</span>
              <Avatar.Root className="cursor-pointer bg-gray-100 inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full align-middle">
                <Avatar.Image
                  className="h-full w-full rounded-[inherit] object-cover"
                  src={fotoUrl || ""}
                  alt="Foto Usuário"
                />
              </Avatar.Root>
            </div>

            <button className="flex flex-row gap-2 px-4 pr-6 items-center cursor-pointer">
              <span>Sair</span>
              <RxExit />
            </button>
          </div>

          <ScrollArea className="bg-gray-200 shadow-inner pb-14">
            <div className="flex flex-col gap-4 py-4">
              <Outlet />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
