import { createContext } from "react";
import type { Container } from "./Container.ts";

export const Context = createContext<Container | null>(null);
