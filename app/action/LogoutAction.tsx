'use server'
import { logout } from '@/app/lib/auth'

export async function LogoutAction() {
    await logout()
}
