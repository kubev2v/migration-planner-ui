import { type FC, type PropsWithChildren } from "react";
import { Context } from "./Context";
import { Container } from "./Container";

export const Provider: FC<
  PropsWithChildren<{ container: Container }>
> = (props) => {
  const { container, children } = props;
  return <Context.Provider value={container}>{children}</Context.Provider>;
};
