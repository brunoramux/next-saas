import { getCookie } from 'cookies-next'
import ky from 'ky'

export const api = ky.create({
  prefixUrl: 'http://localhost:3333',
  hooks: {
    beforeRequest: [
      async (request) => {
        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')

          const token = getCookie('token', { cookies: serverCookies })

          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`)
          }
        } else {
          const token = getCookie('token')

          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`)
          }
        }
      },
    ],
  },
})
