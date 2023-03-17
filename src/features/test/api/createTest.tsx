import { client } from '@/lib/apiClient';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { Test } from '../types';

type createTestParams = {
  name: string;
  projectId: string;
};

async function createTest(data: createTestParams): Promise<Test> {
  return client
    .post(`tests`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        name: data.name,
        project_id: data.projectId
      })
    })
    .json();
}

export const useCreateTest = (
  options?: Omit<UseMutationOptions<Test, Error, createTestParams>, 'mutationFn'>
) => {
  return useMutation({
    mutationFn: (data) => createTest(data),
    ...options
  });
};
