// import { sleep, Time } from "#/common/Time";
import {
  CreateSourceRequest,
  DeleteSourceRequest,
  ListSourcesRequest,
  SourceApiInterface,
} from "@migration-planner-ui/api-client/apis";
import { Source, Status, UploadRvtoolsFile200Response } from "@migration-planner-ui/api-client/models";
import {
  InitOverrideFunction,
  ApiResponse,
  ConfigurationParameters,
} from "@migration-planner-ui/api-client/runtime";
import { GetSourceRequest, UpdateSourceRequest, UploadRvtoolsFileRequest } from "../../../../packages/api-client/src/apis/SourceApi";

export class MockSourceApi implements SourceApiInterface {
  constructor(_configuration: ConfigurationParameters) {
    console.warn("#### CAUTION: Using MockSourceApi ####");
  }
  uploadRvtoolsFileRaw(_requestParameters: UploadRvtoolsFileRequest, _initOverrides?: RequestInit | InitOverrideFunction): Promise<ApiResponse<UploadRvtoolsFile200Response>> {
    throw new Error("Method not implemented.");
  }
  uploadRvtoolsFile(_requestParameters: UploadRvtoolsFileRequest, _initOverrides?: RequestInit | InitOverrideFunction): Promise<UploadRvtoolsFile200Response> {
    throw new Error("Method not implemented.");
  }

  async createSourceRaw(_requestParameters: CreateSourceRequest, _initOverrides?: RequestInit | InitOverrideFunction):Promise<ApiResponse<Source>>{
    throw new Error("Method not implemented.");
  }
 
  async createSource(_requestParameters: CreateSourceRequest, _initOverrides?: RequestInit | InitOverrideFunction): Promise<Source>{
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
  async listSourcesRaw(
    _requestParameters: ListSourcesRequest,
    _initOverrides?: RequestInit | InitOverrideFunction
  ): Promise<ApiResponse<Array<Source>>> {
    throw new Error("Method not implemented.");
  }
  async listSources(
    _requestParameters: ListSourcesRequest,
    _initOverrides?: RequestInit | InitOverrideFunction
  ): Promise<Array<Source>> {
    // await sleep(3 * Time.Second);
    const { default: json } = await import("./responses/up-to-date.json");
    return json as unknown as Array<Source>;
  }
 
  async headSourceImage(
    _requestParameters: { id: string },
    _initOverrides?: RequestInit | InitOverrideFunction
  ): Promise<Response> {
    // Different scenarios
    const errorScenarios = [
      { status: 404, statusText: "Not Found" },
      { status: 500, statusText: "Internal Server Error" },
      { status: 403, statusText: "Forbidden" },
      { status: 401, statusText: "Unautorized" },
    ];
  
    // Choose one option randomly
    const randomError = errorScenarios[Math.floor(Math.random() * errorScenarios.length)];
  
    // Simulation of error response 
    return new Response(null, {
      status: randomError.status,
      statusText: randomError.statusText,
    });
  }
  async getSourceRaw(_requestParameters: GetSourceRequest, _initOverrides?: RequestInit | InitOverrideFunction): Promise<ApiResponse<Source>>
  {
    throw new Error("Method not implemented.");
  }

  async getSource(_requestParameters: GetSourceRequest, _initOverrides?: RequestInit | InitOverrideFunction): Promise<Source>
  {
    throw new Error("Method not implemented.");
  }

  async updateSourceRaw(_requestParameters: UpdateSourceRequest, _initOverrides?: RequestInit | InitOverrideFunction): Promise<ApiResponse<Source>>
  {
    throw new Error("Method not implemented.");
  }

  async updateSource(_requestParameters: UpdateSourceRequest, _initOverrides?: RequestInit | InitOverrideFunction): Promise<Source>
  {
    throw new Error("Method not implemented.");
  }


}
