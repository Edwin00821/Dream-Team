'use client'

import { type ComponentPropsWithoutRef, type FC } from 'react'
import {
  MathJax,
  MathJaxContext,
  type MathJaxContextProps,
  type MathJaxProps,
} from 'better-react-mathjax'

export const MathContext: FC<MathJaxContextProps> = ({
  children,
  ...props
}) => {
  return <MathJaxContext {...props}>{children}</MathJaxContext>
}

export const Math: FC<MathJaxProps & ComponentPropsWithoutRef<'span'>> = ({
  children,
}) => {
  return <MathJax>{children}</MathJax>
}
