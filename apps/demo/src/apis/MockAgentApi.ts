import { AgentApiInterface, DeleteAgentRequest } from "@migration-planner-ui/api-client/apis";
import { Agent } from "@migration-planner-ui/api-client/models";
import { InitOverrideFunction, ApiResponse, ConfigurationParameters } from "@migration-planner-ui/api-client/runtime";

export class MockAgentApi implements AgentApiInterface {
    constructor(_configuration: ConfigurationParameters) {
        console.warn("#### CAUTION: Using MockAgentApi ####");
      }
      
    deleteAgentRaw(_requestParameters: DeleteAgentRequest, _initOverrides?: RequestInit | InitOverrideFunction): Promise<ApiResponse<Agent>> {
        throw new Error("Method not implemented.");
    }
    deleteAgent(_requestParameters: DeleteAgentRequest, _initOverrides?: RequestInit | InitOverrideFunction): Promise<Agent> {
        throw new Error("Method not implemented.");
    }
    listAgentsRaw(_initOverrides?: RequestInit | InitOverrideFunction): Promise<ApiResponse<Array<Agent>>> {
        throw new Error("Method not implemented.");
    }
    async listAgents(_initOverrides?: RequestInit | InitOverrideFunction): Promise<Array<Agent>> {
        const { default: json } = await import("./responses/agents.json");
        return json as unknown as Array<Agent>;
    }
    
}