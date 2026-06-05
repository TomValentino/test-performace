'use server'

import { revalidatePath } from 'next/cache'

// ---------------------------------------------------------------------------
// Call these from your server actions after saving to the DB.
//
// e.g. after updating a property:
//   import { revalidateProperty } from '@/lib/revalidate'
//   await updatePropertyInDB(data)
//   await revalidateProperty(username, handle)
// ---------------------------------------------------------------------------

export async function revalidateProperty(username, handle) {
  revalidatePath(`/${username}/property/${handle}`)
}

export async function revalidateCollection(username, handle) {
  revalidatePath(`/${username}/collection/${handle}`)
}

// Busts everything under a store — use when store/profile settings change
export async function revalidateStore(username) {
  revalidatePath(`/${username}`, 'layout')
}