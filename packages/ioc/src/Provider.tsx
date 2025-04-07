import React from "react";
import { type PropsWithChildren } from "react";
import { Context } from "./Context";
import { Container } from "./Container";

export const Provider: React.FC<
  PropsWithChildren<{ container: Container }>
> = (props) => {
  const { container, children } = props;
  return <Context.Provider value={container}>{children}</Context.Provider>;
};
