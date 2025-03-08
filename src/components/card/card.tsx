import type * as React from 'react'
import { twMerge } from 'tailwind-merge'

interface CardDivProps extends React.ComponentProps<'div'> {
  className?: string
}
interface CardHeadingProps extends React.ComponentProps<'h3'> {
  className?: string
}
interface CardParagraphProps extends React.ComponentProps<'p'> {
  className?: string
}

const Card: React.FC<CardDivProps> = ({ className, ...props }) => (
  <div
    className={twMerge(
      'rounded-lg border border-gray-500 bg-gray-600 text-gray-100 shadow-sm',
      className
    )}
    {...props}
  />
)
const CardHeader: React.FC<CardDivProps> = ({ className, ...props }) => (
  <div
    className={twMerge(
      'flex flex-col text-gray-100 bg-blue-dark space-y-1.5 p-6',
      className
    )}
    {...props}
  />
)
const CardTitle: React.FC<CardHeadingProps> = ({ className, ...props }) => (
  <h3
    className={twMerge(
      'text-xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
)
const CardDescription: React.FC<CardParagraphProps> = ({
  className,
  ...props
}) => <p className={twMerge('text-sm text-gray-100', className)} {...props} />
const CardContent: React.FC<CardDivProps> = ({ className, ...props }) => (
  <div className={twMerge('p-6 pt-0', className)} {...props} />
)
const CardFooter: React.FC<CardDivProps> = ({ className, ...props }) => (
  <div
    className={twMerge('flex items-center p-6 pt-0', className)}
    {...props}
  />
)

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardTitle.displayName = 'CardTitle'
CardDescription.displayName = 'CardDescription'
CardContent.displayName = 'CardContent'
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
