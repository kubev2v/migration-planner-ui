import type React from "react";
import type { PropsWithChildren } from "react";
import type { Container } from "./Container.js";
import { Context } from "./Context.js";

export const Provider: React.FC<PropsWithChildren<{ container: Container }>> = (props) => {
  const { container, children } = props;
  return <Context.Provider value={container}>{children}</Context.Provider>;
};
