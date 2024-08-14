import * as Avatar from "@radix-ui/react-avatar";
import Tag from "../Tag";

export default function Card(): JSX.Element {
  return (
    <div className="w-full border border-gray-300 col-span-1 rounded-lg p-3 shadow-md bg-gray-100">
      <div className="flex items-center justify-between border-b-2">
        <span className="text-lg text-primary-800 font-semibold">
          Gerência de Projeto
        </span>
        <span className="text-primary-700 font-semibold">01-01-2001</span>
      </div>

      <div className="text-xs py-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem ut ad
        qui totam laboriosam fuga alias, beatae.
      </div>

      <div className="text-xs font-semibold">40hrs | 10 atividades</div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <div className="flex -space-x-3 overflow-hidden">
            <Avatar.Root className="mt-2 bg-gray-100 inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full align-middle">
              <Avatar.Image
                className="h-full w-full rounded-[inherit] object-cover"
                src={"imagens/user.png"}
                alt="Foto Usuário"
              />
            </Avatar.Root>
            <Avatar.Root className="mt-2 bg-gray-100 inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full align-middle">
              <Avatar.Image
                className="h-full w-full rounded-[inherit] object-cover"
                src={"imagens/user.png"}
                alt="Foto Usuário"
              />
            </Avatar.Root>
            <Avatar.Root className="mt-2 bg-gray-100 inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full align-middle">
              <Avatar.Image
                className="h-full w-full rounded-[inherit] object-cover"
                src={"imagens/user.png"}
                alt="Foto Usuário"
              />
            </Avatar.Root>
            <div className="h-7 w-7 rounded-full bg-gray-200 text-xs text-gray-700 flex items-center justify-center border-2 border-white">
              +3
            </div>
          </div>
        </div>
        <Tag status="alert" className="px-4 py-1">
          Média
        </Tag>
      </div>
    </div>
  );
}
