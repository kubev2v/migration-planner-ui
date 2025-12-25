/** A naive, singleton-scoped dependency injection container */
export class Container {
  readonly #registry: Record<symbol, unknown>;

  constructor() {
    this.#registry = {};
  }

  get<T>(registeredInterfaceSymbol: symbol): T {
    const value = this.#registry[registeredInterfaceSymbol] as T;
    return value;
  }

  register<T = unknown>(registeredInterfaceSymbol: symbol, value: T): Container {
    this.#registry[registeredInterfaceSymbol] = value;

    return this;
  }
}
