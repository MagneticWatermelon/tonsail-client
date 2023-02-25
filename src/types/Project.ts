import { Organization } from '@/features/organization';

export interface Project {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
  organization: Organization | null;
  tests: any[] | null;
}
