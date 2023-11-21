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
  PopulationValidator,
  type PopulationRequest,
} from '@/lib/validations/population'

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
  date: string
  logistic: number
  exponential: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: { value: string; stroke: string }[]
  label?: string
}

const CustomTooltip: FC<CustomTooltipProps> = (props) => {
  const { active, payload, label } = props

  if (active && payload && payload.length) {
    return (
      <div className="p-3 dark:border dark:border-slate-300 dark:bg-background">
        <p style={{ color: payload[0]?.stroke }}>
          {`Población : ${payload[0]?.value}`}
        </p>
        <p>{`Fecha : ${label}`}</p>
      </div>
    )
  }

  return null
}

export const PopulationChart: FC = () => {
  const [data, setData] = useState<IData[]>([])

  const form = useForm<PopulationRequest>({
    resolver: zodResolver(PopulationValidator),
    defaultValues: {
      timeTo: 2000,
      timeFrom: 2020,
      gamma: 0.012,
      k: 210000,
      p0: 6000,
    },
  })

  const { timeTo, timeFrom, p0, gamma, k } = form.getValues()

  const onSubmit = (data: PopulationRequest) => {
    console.log(data)
  }

  useEffect(() => {
    const tf = timeFrom - timeTo
    console.log({ tf })

    const result: IData[] = []

    for (let i = 0; i <= tf; i += 1) {
      const y = logisticModel({ gamma, k, p0, pt: i })
      const y2 = exponentialModel({ gamma, pt: i })

      result.push({
        x: i,
        date: `01-01-${timeTo + i}`,
        logistic: decimalAdjust(y, 3),
        exponential: decimalAdjust(y2, 3),
      })
    }

    setData(result)
  }, [timeTo, timeFrom, p0, gamma, k])

  return (
    <section className="flex w-full flex-col items-center justify-between">
      <Form {...form}>
        <form
          method="post"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          className="flex w-full max-w-3xl flex-wrap items-center justify-center  gap-5 p-5"
        >
          <FormItem>
            <FormLabel>Poblacion Inicial</FormLabel>
            <FormControl>
              <Input
                type="number"
                inputMode="numeric"
                aria-invalid={!!form.formState.errors.p0}
                placeholder="p0"
                {...form.register('p0', {
                  valueAsNumber: true,
                })}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.p0?.message}
            />
          </FormItem>

          <FormItem>
            <FormLabel>Tasa de Crecimiento anual</FormLabel>
            <FormControl>
              <Input
                type="number"
                inputMode="numeric"
                aria-invalid={!!form.formState.errors.gamma}
                placeholder="gamma"
                {...form.register('gamma', {
                  valueAsNumber: true,
                })}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.gamma?.message}
            />
          </FormItem>

          <FormItem>
            <FormLabel>Capacidad de carga de la poblacion</FormLabel>
            <FormControl>
              <Input
                type="number"
                inputMode="numeric"
                aria-invalid={!!form.formState.errors.k}
                placeholder="k"
                {...form.register('k', {
                  valueAsNumber: true,
                })}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.k?.message}
            />
          </FormItem>

          <FormItem>
            <FormLabel>Tiempo inicial en años</FormLabel>
            <FormControl>
              <Input
                type="number"
                inputMode="numeric"
                aria-invalid={!!form.formState.errors.timeTo}
                placeholder="t0"
                {...form.register('timeTo', {
                  valueAsNumber: true,
                })}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.timeTo?.message}
            />
          </FormItem>

          <FormItem>
            <FormLabel>Final en años</FormLabel>
            <FormControl>
              <Input
                type="number"
                inputMode="numeric"
                aria-invalid={!!form.formState.errors.timeFrom}
                placeholder="f0"
                {...form.register('timeFrom', {
                  valueAsNumber: true,
                })}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.timeFrom?.message}
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
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="logistic" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
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
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="exponential" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </section>
  )
}

interface LogisticModelProps {
  p0: number
  pt: number
  gamma: number
  k: number
}

const logisticModel = ({ p0, pt, gamma, k }: LogisticModelProps) => {
  // P(t) = k / (1 + A * e^(-gamma * t))

  // p0 = poblacion inicial
  // pt = poblacion en el tiempo t
  // gamma = tasa de crecimiento rE[-1,1]
  // k > 0 = capacidad de carga de la poblacion
  // A = (k-p0)/p0

  //crecimiento exponecial
  // return Math.exp(gamma * pt)

  const A = (k - p0) / p0

  //crecimiento logistico
  return k / (1 + A * Math.exp(-gamma * pt))
}

interface ExponentialModelProps {
  pt: number
  gamma: number
}

const exponentialModel = ({ pt, gamma }: ExponentialModelProps) =>
  Math.exp(gamma * pt)
