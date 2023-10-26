import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const shellVariants = cva('grid gap-8 pb-8 pt-6 md:py-8', {
  variants: {
    variant: {
      default: 'container',
      sidebar:
        'relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]',
      centered: 'container flex h-[100dvh] max-w-2xl flex-col justify-center',
      markdown: 'container max-w-3xl gap-0 py-8 md:py-10 lg:py-10',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface ShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {
  as?: React.ElementType
}

function Shell({
  className,
  as: Comp = 'section',
  variant,
  ...props
}: ShellProps) {
  return (
    <Comp className={cn(shellVariants({ variant }), className)} {...props} />
  )
}

export { Shell, shellVariants }