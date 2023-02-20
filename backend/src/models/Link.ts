import { z } from 'zod';

export const Link = z.object({
  email: z.string(),
  expiringDateTime: z.string(),
});
export type Link = z.infer<typeof Link>;
