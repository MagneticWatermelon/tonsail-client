import { Project } from './Project';
import { User } from './User';

export interface Organization {
  id: String;
  name: String;
  createdAt: String;
  updatedAt: String;
  projects: Project[] | null;
  users: User[] | null;
}
