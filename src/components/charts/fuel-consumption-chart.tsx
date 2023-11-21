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
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { decimalAdjust } from '@/lib/utils'
import {
  FuelConsumptionValidator,
  type FuelConsumptionRequest,
} from '@/lib/validations/fuel-consumption'

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
  continuos?: number
  discontinuos?: number
}

export const FuelConsumptionChart: FC = () => {
  const [data, setData] = useState<IData[]>([])

  const form = useForm<FuelConsumptionRequest>({
    resolver: zodResolver(FuelConsumptionValidator),
    defaultValues: { v: 100, m: 24, b: 8 },
  })

  const { v, m, b } = form.getValues()

  const onSubmit = (data: FuelConsumptionRequest) => {
    console.log(data)
  }

  useEffect(() => {
    const result: IData[] = []

    for (let i = v - 100; i < v; i += 1) {
      const y = fuelConsumptionContinuosModel({ b, m, v: i })

      result.push({
        x: i,
        continuos: decimalAdjust(y, 3),
        // exponential: decimalAdjust(y2, 3),
      })
    }

    for (let i = v; i <= v + 100; i += 1) {
      const y = fuelConsumptionDiscontinuosModel({ v: i })

      result.push({
        x: i,
        discontinuos: decimalAdjust(y, 3),
        // exponential: decimalAdjust(y2, 3),
      })
    }
    console.log({ result })

    setData(result)
  }, [m, v, b])

  return (
    <section className="flex w-full flex-col items-center justify-between">
      <Form {...form}>
        <form
          method="post"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          className="flex w-full max-w-3xl flex-wrap items-center justify-center  gap-5 p-5"
        >
          <FormItem>
            <FormLabel>Velocidad</FormLabel>
            <FormControl>
              <Input
                type="number"
                inputMode="numeric"
                aria-invalid={!!form.formState.errors.v}
                placeholder="v"
                {...form.register('v', {
                  valueAsNumber: true,
                })}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.v?.message}
            />
          </FormItem>

          <FormItem>
            <FormLabel>Pendiente</FormLabel>
            <FormControl>
              <Input
                type="number"
                inputMode="numeric"
                aria-invalid={!!form.formState.errors.m}
                placeholder="m"
                {...form.register('m', {
                  valueAsNumber: true,
                })}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.m?.message}
            />
          </FormItem>

          <FormItem>
            <FormLabel>Consumo mínimo en ralentí</FormLabel>
            <FormControl>
              <Input
                type="number"
                inputMode="numeric"
                aria-invalid={!!form.formState.errors.b}
                placeholder="b"
                {...form.register('b', {
                  valueAsNumber: true,
                })}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.b?.message}
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
            dataKey="continuos"
            stroke="#8884d8"
            dot={<></>}
          />
          <Line
            type="monotone"
            dataKey="discontinuos"
            stroke="#82ca9d"
            dot={<></>}
          />
        </LineChart>
      </ResponsiveContainer>
      {/* <ResponsiveContainer width="100%" height={500}>
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
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="exponential" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer> */}
    </section>
  )
}

interface FuelConsumptionContinuosModelProps {
  m: number
  v: number
  b: number
}

const fuelConsumptionContinuosModel = ({
  m,
  v,
  b,
}: FuelConsumptionContinuosModelProps) => {
  // 𝑓(𝑣) = 𝑚𝑣 + 𝑏

  // 𝑓(𝑣) = consumo de combustible.
  // 𝑣 = velocidad del vehículo.
  // 𝑚 = pendiente de la recta.
  // 𝑏 = intercepto de la recta.

  // return m * v + b
  return 24 * v + 8
}

interface FuelConsumptionDiscontinuosModelProps {
  v: number
}

const fuelConsumptionDiscontinuosModel = ({
  v,
}: FuelConsumptionDiscontinuosModelProps) => {
  // return m * v + b
  return 0.4 * Math.pow(v, 2) - 300
}
