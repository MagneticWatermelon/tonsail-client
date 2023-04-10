import { z } from 'zod';

const Stage = z.object({
  amount: z.number().int().positive(),
  duration: z.custom<string>((val) => /^([0-9]+[hms])+$/.test(val as string))
});

const Request = z.object({
  name: z.string().optional(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH']),
  url: z.string().url({ message: 'Invalid url' })
});

export type Stage = z.infer<typeof Stage>;

export type Request = z.infer<typeof Request>;

export type Scenario = {
  id: string;
  name: string;
  timeout: string;
  stages: Stage[];
  requests: Request[];
};

export type Test = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  projectId: string;
  runs: TestRun[];
};
export type TestRun = {
  id: string;
  createdAt: string;
  status: string;
  testId: string;
};

export type RunMetric = {
  name: string;
  runId: string;
  values: Values[];
};

export type Values = {
  ts: string;
  value: number;
};

export type MetricQueryParams = {
  runID: string;
  name: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';
  status?: string;
  scenario?: string;
  url?: string;
  limit?: string;
};
