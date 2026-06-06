import { NextResponse } from 'next/server'

export function proxy(request) {
  const { pathname } = request.nextUrl
  const hostname = request.headers.get('host')

  const rootDomain = 'buildsite.pro'
  const isSubdomain = hostname.endsWith(`.${rootDomain}`)

  if (isSubdomain) {
    const username = hostname.replace(`.${rootDomain}`, '')
    // johnsmith.mydomain.com/about → /johnsmith/about
    // johnsmith.mydomain.com      → /johnsmith/home
    const newPath = pathname === '/' ? `/${username}/home` : `/${username}${pathname}`
    const url = request.nextUrl.clone()
    url.pathname = newPath
    return NextResponse.rewrite(url)
  }

  // non-subdomain: /johnsmith → /johnsmith/home
  if (/^\/[^\/]+$/.test(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = `${pathname}/home`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/(.*)',],
}