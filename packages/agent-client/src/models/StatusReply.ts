import { SourceStatus } from "./SourceStatus.js";

export interface StatusReply {
  status: SourceStatus;
  statusInfo: string;
}
