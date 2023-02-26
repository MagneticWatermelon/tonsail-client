import { Project } from '@/features/project';
import { User } from '@/features/user';

export type Organization = {
  id: String;
  name: String;
  createdAt: String;
  updatedAt: String;
  projects: Project[] | null;
  users: User[] | null;
};
