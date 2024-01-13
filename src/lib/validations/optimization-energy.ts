import { z } from 'zod'

export const OptimizationEnergyValidator = z.object({
  e: z.coerce.number(),
})

export type OptimizationEnergyRequest = z.infer<
  typeof OptimizationEnergyValidator
>
