
import { destroyCookie, parseCookies } from 'nookies';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { validateUserPermissions } from './validateUserPermissions';
import { options } from './../../pages/dashboard/options';

type WithSSRAuthOptions = {
  permissions?: string[];
  roles?: string[]
}

export function withSSRAuth(fn: GetServerSideProps, options?: WithSSRAuthOptions)  {
  return async (ctx: GetServerSidePropsContext) => {
    const cookies = parseCookies(ctx)
    const token = cookies['token']
    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    if(options) {
      // const user = decode<{ permissions: string[], roles: string }>(token)
      const user = {
        email: 'teste@gmail.com',
        permissions: ['metrics.list']
      }
      const {permissions, roles} = options
    
      const userHasValidPermissions = validateUserPermissions({
        user,
        permissions,
        roles
      })

      console.log(userHasValidPermissions)

      if (!userHasValidPermissions) {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false
          }
        }
      }
    }



    try {
      return await fn(ctx)
    } catch (err) {
      destroyCookie(ctx, 'token')
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
  }
    

  }
}