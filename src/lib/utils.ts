import { env } from '@/env.mjs'
import { clsx, type ClassValue } from 'clsx'
import dayjs, { type Dayjs } from 'dayjs'
import es from 'dayjs/locale/es'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type IDate = Date | string | number

export const formatDate = (date: IDate) => {
  return dayjs(date).locale(es).format('D MMMM, YYYY')
}

export const newDate = (date: IDate) => {
  return dayjs(date)
}

export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export const truncate = (str: string, length: number) => {
  return str.length > length ? `${str.substring(0, length)}...` : str
}

export const absoluteUrl = (path: string) => {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

// export function formatDate(date: IDate) {
//   return new Intl.DateTimeFormat('en-US', {
//     month: 'long',
//     day: 'numeric',
//     year: 'numeric',
//   }).format(new Date(date))
// }

export const decimalAdjust = (value: number, exp: number = 2) => {
  const signo = value >= 0 ? 1 : -1

  value = value * signo
  if (exp === 0)
    //con 0 decimales
    return signo * Math.round(value)
  // round(x * 10 ^ decimales)

  let newValue = value.toString().split('e')

  value = Math.round(
    +(newValue[0] + 'e' + (newValue[1] ? +newValue[1] + exp : exp))
  )
  // x * 10 ^ (-decimales)
  newValue = value.toString().split('e')

  return (
    signo *
    Number(newValue[0] + 'e' + (newValue[1] ? +newValue[1] - exp : -exp))
  )
}

export type { Dayjs }
