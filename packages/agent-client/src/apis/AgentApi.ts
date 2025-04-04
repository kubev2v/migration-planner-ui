import {
  Either,
  Credentials,
  StatusReply,
  CredentialsError,
} from "../models";

interface Configuration {
  basePath: string;
}

export interface AgentApiInterface {
  putCredentials(
    credentials: Credentials,
    options?: RequestInit & { pathParams?: string[] }
  ): Promise<Either<number, CredentialsError>>;
  getStatus(options?: RequestInit): Promise<StatusReply>;
  getAgentVersion():Promise<string>;
  getServiceUiUrl():Promise<string>;
}

export class AgentApi implements AgentApiInterface {
  private readonly configuration: Configuration;

  constructor(configuration: Configuration) {
    this.configuration = configuration;
  }

  async getStatus(options?: RequestInit): Promise<StatusReply> {
    const request = new Request(this.configuration.basePath + "/status", {
      method: "GET",
      ...(options?.signal && { signal: options.signal }),
    });

    const response = await fetch(request);
    const statusReply = (await response.json()) as StatusReply;
    return statusReply;
  }

  async putCredentials(
    credentials: Credentials,
    options?: RequestInit & { pathParams?: string[] }
  ): Promise<Either<number, CredentialsError>> {
    const request = new Request(this.configuration.basePath + "/credentials", {
      method: "PUT",
      body: JSON.stringify(credentials),
      ...(options?.signal && { signal: options.signal }),
    });

    const response = await fetch(request);
    if (response.ok) {
      return [response.status, null];
    } else {
      let message = response.statusText;
      const error = new CredentialsError(response.status, message);
      if (response.arrayBuffer.length > 0) {
        message = await response.text();
        error.message = message;
      }

      return [null, error];
    }
  }

  async getAgentVersion(): Promise<string> {
    const request = new Request(this.configuration.basePath + "/version", {
      method: "GET"
    });

    const response = await fetch(request);
    const statusReply = (await response.json()) as { version: string };
    return statusReply.version;
  }
  async getServiceUiUrl(): Promise<string> {
    const request = new Request(this.configuration.basePath + "/url", {
      method: "GET"
    });

    const response = await fetch(request);
    const uiReply = (await response.json()) as { url: string };
    return uiReply.url;
  }
}
