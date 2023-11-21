import { z } from 'zod'

export const PopulationValidator = z.object({
  // timeTo: z.date().min(new Date(2000, 1, 1)),
  // timeFrom: z.date().min(new Date(2000, 1, 1)),
  timeTo: z.number().positive(),
  timeFrom: z.number().positive(),
  p0: z.number().positive(),
  k: z.number().positive(),
  gamma: z.number(),
})

export type PopulationRequest = z.infer<typeof PopulationValidator>
