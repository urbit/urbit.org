import React from "react";
import classnames from "classnames";
import { FatBlock } from "@urbit/fdn-design-system";

export default function Carousel({ children }) {
  return (
    <div className="w-screen max-w-screen-3xl overflow-auto -layout-mx">
      <div className="layout-px w-fit">
        <FatBlock className="flex space-x-1 lg:space-x-6 xl:space-x-8">
          {children}
        </FatBlock>
      </div>
    </div>
  );
}
