'use client'

import { useEffect, useState, type FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

import { decimalAdjust } from '@/lib/utils'
import {
  OptimizationEnergyValidator,
  type OptimizationEnergyRequest,
} from '@/lib/validations/optimization-energy'

import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  UncontrolledFormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

interface IData {
  x: number
  energyModel?: number
  derivativeEnergyModel?: number
}

export const OptimizationEnergyChart: FC = () => {
  const [data, setData] = useState<IData[]>([])

  const form = useForm<OptimizationEnergyRequest>({
    resolver: zodResolver(OptimizationEnergyValidator),
    defaultValues: { e: 8 },
  })

  const { e } = form.getValues()

  const onSubmit = (data: OptimizationEnergyRequest) => {
    console.log(data)
  }

  useEffect(() => {
    const result: IData[] = []

    for (let i = 0; i < 10; i += 1) {
      const y = energyModel({ t: i, e })
      const y2 = derivativeEnergyModel({ t: i, e })

      result.push({
        x: i,
        energyModel: decimalAdjust(y, 3),
        derivativeEnergyModel: decimalAdjust(y2, 3),
      })
    }

    console.log({ result })

    setData(result)
  }, [e])

  return (
    <section className="flex w-full flex-col items-center justify-between">
      <Form {...form}>
        <form
          method="post"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          className="flex w-full max-w-3xl flex-wrap items-center justify-center  gap-5 p-5"
        >
          <FormItem>
            <FormLabel>Número de electrodomésticos</FormLabel>
            <FormControl>
              <Input
                aria-invalid={!!form.formState.errors.e}
                placeholder="e"
                {...form.register('e', {
                  valueAsNumber: true,
                })}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.e?.message}
            />
          </FormItem>

          <Button type="submit" variant="ghost" className="w-full border-2">
            Submit
          </Button>
        </form>
      </Form>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Legend />
          <Line
            type="linear"
            label="Modelo del costo de energía"
            dataKey="energyModel"
            stroke="#8884d8"
            dot={false}
          />
          <Line
            type="linear"
            label="Derivada del modelo del costo de energía"
            dataKey="derivativeEnergyModel"
            stroke="#82ca9d"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <p>
        Costo total de energía:{' '}
        <span className="font-bold ">{optimizationEnergyModel({ e })}</span>
      </p>
    </section>
  )
}

interface EnergyModelProps {
  t: number
  e: number
}

const energyModel = ({ t, e }: EnergyModelProps) => {
  // C(t) = e/10 * ( 8/5 t^2 - t + 4 )

  // e = número de electrodomésticos.
  // t = tiempo de uso (hrs).

  const A = e / 10
  const B = 8 / 5
  const C = t ** 2
  const D = 4 - t
  const res = A * (B * C + D)
  console.log({ res })

  return A * (B * C + D)
}

interface DerivativeEnergyModelProps {
  t: number
  e: number
}

const derivativeEnergyModel = ({ t, e }: DerivativeEnergyModelProps) => {
  // C(t) = 3.125 * E hrs

  // e = número de electrodomésticos.
  // t = tiempo de uso (hrs).

  return (8 * e * t) / 25 - 1
}

interface OptimizationEnergyModelProps {
  e: number
}

const optimizationEnergyModel = ({ e }: OptimizationEnergyModelProps) => {
  // C(t) = 3.125 * E hrs

  // e = número de electrodomésticos.
  // t = tiempo de uso (hrs).

  return 3.125 * e
}
