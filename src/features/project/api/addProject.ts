import { client } from '@/lib/apiClient';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { Project } from '../types';

type createProjectParams = {
  name: string;
  organizationId: string;
};

async function createProject(data: createProjectParams): Promise<Project> {
  return client
    .post(`projects`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        name: data.name,
        organization_id: data.organizationId
      })
    })
    .json();
}

export const useCreateProject = (
  options?: Omit<UseMutationOptions<Project, Error, createProjectParams>, 'mutationFn'>
) => {
  return useMutation({
    mutationFn: (data) => createProject(data),
    ...options
  });
};
