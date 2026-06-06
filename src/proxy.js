import { NextResponse } from 'next/server'

export function proxy(request) {
  const { pathname } = request.nextUrl

  // /johnsmith → /johnsmith/home
  if (/^\/[^\/]+$/.test(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = `${pathname}/home`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:username'],
}