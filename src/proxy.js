import { NextResponse } from 'next/server'
import { createClient, getUser } from './_db/read'

export async function proxy(request) {
  let response = NextResponse.next({ request })
 

  // Protect admin with env
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const secret = request.nextUrl.searchParams.get('secret')
    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL('/lauth/ogin', request.url))
    }
  }

  const user = await getUser()

  // Handle onboarding

  // Protect /dashboard
  if (request.nextUrl.pathname.startsWith('/members') && !user) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Redirect logged-in users away from login
  if (request.nextUrl.pathname === '/auth/login' && user) {
    return NextResponse.redirect(new URL('/members', request.url))
  }
  // Redirect logged-in users away from login
  if (request.nextUrl.pathname === '/auth/signup' && user) {
    return NextResponse.redirect(new URL('/members', request.url))
  }

  return response
}

export const config = {
  matcher: ['/members/:path*', '/auth/login'],
}