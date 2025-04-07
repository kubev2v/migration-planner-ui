import { createContext } from "react";
import { Container } from "./Container";

export const Context = createContext<Container | null>(null);