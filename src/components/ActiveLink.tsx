import Link, {LinkProps} from "next/link";
import { ReactElement } from "react";
import { usePathname } from 'next/navigation'


interface ActiveLinkProps extends LinkProps {
  children: ReactElement
  shouldMatchExactHref?: boolean
}

export function ActiveLink({ 
  children, 
  href, 
  shouldMatchExactHref = false, 
  ...rest 
}: ActiveLinkProps) {
  const pathname = usePathname()
  let isActive = false

  if (shouldMatchExactHref && (pathname === href)) {
    isActive = true
  }

  if(!shouldMatchExactHref && 
    pathname?.includes(String(href))) {
    isActive = true
  }

  return (
    <Link href={href} {...rest} className={` ${isActive ? 'text-pink-500' : 'text-gray-50'}`}>
      {children}
    </Link>
  )
}
