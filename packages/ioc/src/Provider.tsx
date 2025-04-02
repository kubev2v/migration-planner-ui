import { type FC, type PropsWithChildren } from "react";
import { Container } from "./Container";
import { Context } from "./Context";

export const Provider: FC<
  PropsWithChildren<{ container: Container }>
> = (props) => {
  const { container, children } = props;
  return <Context.Provider value={container}>{children}</Context.Provider>;
};
