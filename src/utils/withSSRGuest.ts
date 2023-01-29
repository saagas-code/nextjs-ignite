
import { parseCookies } from 'nookies';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';


export function withSSRGuest(fn: GetServerSideProps)  {
  return async (ctx: GetServerSidePropsContext) => {
    const cookies = parseCookies(ctx)

    if (cookies['token']) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false
        }
      }
    }

    return await fn(ctx)
  }
}