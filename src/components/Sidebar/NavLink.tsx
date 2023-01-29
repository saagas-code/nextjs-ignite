"use client"

import IconComponent from "../Icon";
import { ActiveLink } from './../ActiveLink';

interface NavLinkProps {
  label: string;
  children: React.ReactNode;
  href: string;
}

export function NavLink({label, children, href}: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref={true}>

      
      <div className="flex items-center mb-2">
        <IconComponent size="2xl">
          {children}
        </IconComponent>
        <p className="ml-4 font-medium">{label}</p>
      </div>
      
      

    </ActiveLink>
  );
}
