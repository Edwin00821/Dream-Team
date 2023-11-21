import { z } from 'zod'

export const FuelConsumptionValidator = z.object({
  m: z.number(),
  v: z.number(),
  b: z.number(),
})

export type FuelConsumptionRequest = z.infer<typeof FuelConsumptionValidator>
