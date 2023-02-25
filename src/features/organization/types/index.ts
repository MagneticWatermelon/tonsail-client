import { User } from '@/features/user';
import { Project } from '@/types/Project';

export type Organization = {
  id: String;
  name: String;
  createdAt: String;
  updatedAt: String;
  projects: Project[] | null;
  users: User[] | null;
};
