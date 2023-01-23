import { Organization } from "./Organization";

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
  organization: Organization | null;
}