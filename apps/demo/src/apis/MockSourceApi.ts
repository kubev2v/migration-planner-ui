// import { sleep, Time } from "#/common/Time";
import {
  CreateSourceRequest,
  DeleteSourceRequest,
  GetSourceImageRequest,
  ReadSourceRequest,
  SourceApiInterface,
} from "@migration-planner-ui/api-client/apis";
import { Source, Status } from "@migration-planner-ui/api-client/models";
import {
  InitOverrideFunction,
  ApiResponse,
  ConfigurationParameters,
} from "@migration-planner-ui/api-client/runtime";

export class MockSourceApi implements SourceApiInterface {
  constructor(_configuration: ConfigurationParameters) {
    console.warn("#### CAUTION: Using MockSourceApi ####");
  }

  async createSourceRaw(
    _requestParameters: CreateSourceRequest,
    _initOverrides?: RequestInit | InitOverrideFunction
  ): Promise<ApiResponse<Source>> {
    throw new Error("Method not implemented.");
  }
  async createSource(
    _requestParameters: CreateSourceRequest,
    _initOverrides?: RequestInit | InitOverrideFunction
  ): Promise<Source> {
    throw new Error("Method not implemented.");
  }
  async deleteSourceRaw(
    _requestParameters: DeleteSourceRequest,
    _initOverrides?: RequestInit | InitOverrideFunction
  ): Promise<ApiResponse<Source>> {
    throw new Error("Method not implemented.");
  }
  async deleteSource(
    _requestParameters: DeleteSourceRequest,
    _initOverrides?: RequestInit | InitOverrideFunction
  ): Promise<Source> {
    throw new Error("Method not implemented.");
  }
  async deleteSourcesRaw(
    _initOverrides?: RequestInit | InitOverrideFunction
  ): Promise<ApiResponse<Status>> {
    throw new Error("Method not implemented.");
  }
  async deleteSources(
    _initOverrides?: RequestInit | InitOverrideFunction
  ): Promise<Status> {
    throw new Error("Method not implemented.");
  }
  async getSourceImageRaw(
    _requestParameters: GetSourceImageRequest,
    _initOverrides?: RequestInit | InitOverrideFunction
  ): Promise<ApiResponse<Blob>> {
    throw new Error("Method not implemented.");
  }
  async getSourceImage(
    _requestParameters: GetSourceImageRequest,
    _initOverrides?: RequestInit | InitOverrideFunction
  ): Promise<Blob> {
    throw new Error("Method not implemented.");
  }
  async listSourcesRaw(
    _initOverrides?: RequestInit | InitOverrideFunction
  ): Promise<ApiResponse<Array<Source>>> {
    throw new Error("Method not implemented.");
  }
  async listSources(
    _initOverrides?: RequestInit | InitOverrideFunction
  ): Promise<Array<Source>> {
    // await sleep(3 * Time.Second);
    const { default: json } = await import("./responses/up-to-date.json");
    return json as unknown as Array<Source>;
  }
  async readSourceRaw(
    _requestParameters: ReadSourceRequest,
    _initOverrides?: RequestInit | InitOverrideFunction
  ): Promise<ApiResponse<Source>> {
    throw new Error("Method not implemented.");
  }
  async readSource(
    _requestParameters: ReadSourceRequest,
    _initOverrides?: RequestInit | InitOverrideFunction
  ): Promise<Source> {
    throw new Error("Method not implemented.");
  }
  async headSourceImage(
    _requestParameters: { id: string },
    _initOverrides?: RequestInit | InitOverrideFunction
  ): Promise<Response> {
    // Simula diferentes escenarios de error
    const errorScenarios = [
      { status: 404, statusText: "Not Found" },
      { status: 500, statusText: "Internal Server Error" },
      { status: 403, statusText: "Forbidden" },
      { status: 401, statusText: "Unautorized" },
    ];
  
    // Elige un escenario de error aleatoriamente
    const randomError = errorScenarios[Math.floor(Math.random() * errorScenarios.length)];
  
    // Simula una respuesta de error
    return new Response(null, {
      status: randomError.status,
      statusText: randomError.statusText,
    });
  }
}
