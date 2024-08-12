import clsx from "clsx";
import React from "react";

export default function FormHeaderDivider({
  classNames,
  children,
}: {
  classNames?: string;
  children: React.ReactNode;
}) {
  return (
    <h5 className={clsx(`mt-8 -ml-2 mb-[0.2rem] font-semibold ${classNames}`)}>
      {children}
    </h5>
  );
}
