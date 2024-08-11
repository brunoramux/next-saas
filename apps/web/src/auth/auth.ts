import { cookies } from 'next/headers'

export function isAuthenticate() {
  return !!cookies().get('token')?.value
}
