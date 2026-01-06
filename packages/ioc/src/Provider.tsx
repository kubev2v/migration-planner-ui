import type { Container } from "./Container.js";
import { Context } from "./Context.js";

export const Provider: React.FC<
  React.PropsWithChildren<{ container: Container }>
> = (props) => {
  const { container, children } = props;
  return <Context.Provider value={container}>{children}</Context.Provider>;
};
