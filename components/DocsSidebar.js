import Link from "next/link";
import { useState } from "react";
import MenuTray from "./MenuTray";

export default function Sidebar(props) {
  const [isOpen, setTray] = useState(false);
  return (
    <>
      <div className="hidden md:flex flex-col w-96 bg-wall-100 max-h-screen h-screen">
        <header className="flex shrink-0 justify-between items-center pl-6 pt-12 mt-5 pb-8">
          <Link href="/" passHref>
            <a className="type-ui text-wall-500">Urbit</a>
          </Link>
        </header>
        <div className="overflow-y-auto p-6 pt-16">
          {props.children}
          <div className="pb-32" />
        </div>
      </div>

      <MenuTray isOpen={isOpen} setTray={setTray} search={props.search}>
        <header className="flex shrink-0 justify-between items-center pb-8">
          <Link href="/" passHref>
            <a className="type-ui text-wall-500">Urbit</a>
          </Link>
        </header>
        {props.children}
        <div className="pt-64" />
      </MenuTray>
    </>
  );
}
