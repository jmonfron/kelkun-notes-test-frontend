import z from 'zod';

import { TaskStatus } from '@/services/graphql/generated/graphql';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Le titre est obligatoire'),
  description: z.string().optional(),
  status: z.nativeEnum(TaskStatus).optional()
})
