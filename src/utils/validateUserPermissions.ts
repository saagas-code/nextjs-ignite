
// type User = {
//   permissions: string[];
//   roles: string[];
// }

import { User } from "../contexts/AuthProvider";

type ValidateUserPermissionsParams = {
  user: User | undefined
  permissions?: string[];
  roles?: string[];
}

export function validateUserPermissions({
  user,
  permissions,
  roles
}: ValidateUserPermissionsParams) {


  if (permissions!.length > 0) {
    const hasAllPermissions = permissions!.every(permission => {
      return user?.permissions?.includes(permission)
    }) 

    console.log(user?.permissions)
    console.log(permissions)

    if(!hasAllPermissions) {
      return false;
    }
  }

  if(roles && roles.length > 0) {
    const hasAllRoles = roles.every(roles => {
      // return user.roles.includes(roles)
    })

    if(!hasAllRoles) {
      return false;
    }
  }

  return true
}