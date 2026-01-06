import { createContext } from "react";
import type { Container } from "./Container.js";

export const Context = createContext<Container | null>(null);
