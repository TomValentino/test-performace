import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  revalidateTag('pages')
  revalidateTag('stores')
  revalidateTag('profiles')
  revalidateTag('properties')
  revalidateTag('collections')

  return NextResponse.json({ revalidated: true })
}