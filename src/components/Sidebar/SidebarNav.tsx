import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine, 
} from "react-icons/ri";
import { Can } from "../Can";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

const obj = [
  {
    name: 'Dashboard',
    href:  '/dashboard',
    comp: <RiDashboardLine />,
    permissions: ['metrics.list']
  },
  {
    name: 'Usuários',
    href:  '/users',
    comp: <RiContactsLine />,
    permissions: ['metrics.list']
  }
]

export function SidebarNav() {
  return (
    <div className="tracking-normal flex flex-col items-start ">
        <NavSection title="GERAL">

          {obj.map((i,k) => (
            <Can permissions={i.permissions}>
              <NavLink href={i.href} label={i.name}> {i.comp} </NavLink>
            </Can>
          ))}
          
        </NavSection>

        <NavSection title="AUTOMACÃO">
          <div className="mt-4 items-stretch ">

            <NavLink href="/forms"  label={'Formulários'}> <RiInputMethodLine /> </NavLink>
            <NavLink href="/automation" label={'Automacão'}> <RiGitMergeLine /> </NavLink>
            
          </div>
        </NavSection>
      </div>
  )
}