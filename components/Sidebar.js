import { useState } from "react";
import { MenuTray } from '@urbit/foundation-design-system';

export default function Sidebar(props) {
  const [isOpen, setTray] = useState(false);
  return (
    <>
      <div className="hidden md:pr-16 md:flex flex-col h-full sticky top-8">
        <div className="overflow-y-auto">
          {props.children}
          <div className="pb-32" />
        </div>
      </div>

      <MenuTray isOpen={isOpen} setTray={setTray} search={props.search}>
        {props.children}
        <div className="pt-64" />
      </MenuTray>
    </>
  );
}
