import * as React from 'react'

type Props = {
  children: any
  size: string
  mleft?: boolean
}

export default function IconComponent({children, size, mleft}: Props) {
  return (
    <div className={`text-${size} ${mleft ? 'ml-8' : ''}`}>
      {children}
    </div>
  )
}