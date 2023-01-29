import {ReactNode} from 'react'

interface props {
  title: string;
  children: ReactNode;
}

export function NavSection({title, children}: props) {
  return (
    <div className="mb-6">
        <p className="font-bold text-400 font-sm">{title}</p>
        <div className="mt-4 items-stretch ">
          {children}
        </div>
      </div>
  )
}