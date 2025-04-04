export class CredentialsError extends Error {
  codeN?: number;

  constructor(code?: number, ...errorArgs: Parameters<ErrorConstructor>) {
    super(...errorArgs);
    this.codeN = code;
  }

  toString(): string {
    const code = this.codeN ? `code=${this.codeN}` : "";
    return `${super.toString()} ${code}`;
  }

  get code(): number | undefined {
    return this.codeN;
  }
}
