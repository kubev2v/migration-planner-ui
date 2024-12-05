export interface IAlert {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "danger";
}

export interface IToken {
  type: "Bearer" | "Basic";
  value: string;
}

export interface ICurrentUser {
  email: string | null;
  etag: string;
  fullname: string;
  id: string;
  name: string;
  timezone: string;
  isSuperAdmin: boolean;
  hasEPMRole: boolean;
  hasReadOnlyRole: boolean;
  isReadOnly: boolean;
}
