import { Project } from '@/features/project';
import { User } from '@/features/user';

export type Organization = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  projects: Project[] | null;
  users: User[] | null;
};
