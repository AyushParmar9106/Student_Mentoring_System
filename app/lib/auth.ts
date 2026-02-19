import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const secret = process.env.JWT_SECRET || 'static-secret-key-123456';
const key = new TextEncoder().encode(secret);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10m') // Session expires in 10 minutes
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    return null
  }
}

export async function login(formData: any) {
  // formData should contain the user object structure you want to save in the session
  // e.g. { id: 1, role: 'Student', name: 'Ayush' }
  const user = formData;

  // Create the session
  const expires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
  const session = await encrypt({ user, expires })

  // Save the session in a cookie
  const cookieStore = await cookies()
  cookieStore.set('session', session, { expires, httpOnly: true })
}

export async function logout() {
  // Destroy the session
  const cookieStore = await cookies()
  cookieStore.set('session', '', { expires: new Date(0) })
  redirect('/Login')
}

export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value
  if (!session) return null
  return await decrypt(session)
}
