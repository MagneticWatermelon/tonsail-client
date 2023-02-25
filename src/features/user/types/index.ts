import { Organization } from '@/features/organization';

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
  organization: Organization | null;
};
