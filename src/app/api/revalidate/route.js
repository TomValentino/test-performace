// app/api/revalidate/route.js
import { revalidateTag } from 'next/cache'
import { NextResponse }  from 'next/server'

export async function POST(req) {
  const { tag, secret } = await req.json()
  if (secret !== process.env.REVALIDATE_SECRET)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  revalidateTag(tag)
  return NextResponse.json({ revalidated: true, tag })
}