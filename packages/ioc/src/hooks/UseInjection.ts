import { useContext } from "react";
import { Context } from "../Context.js";

export function useInjection<T>(registeredInterfaceSymbol: symbol): T {
  const container = useContext(Context);
  if (!container) {
    throw new ReferenceError("useInjection must be used inside its Provider");
  }

  return container.get<T>(registeredInterfaceSymbol);
}
