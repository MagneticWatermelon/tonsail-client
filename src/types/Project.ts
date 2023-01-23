import { Organization } from "./Organization";

export interface Project {
  id: String;
  name: String;
  createdAt: String;
  updatedAt: String;
  organizationId: String;
  organization: Organization | null;
  tests: [] | null;
}
