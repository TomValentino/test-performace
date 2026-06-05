'use client'
import { useSyncExternalStore } from 'react'


export const createCustomState = (initialState, customMethods = {}) => {
  const state = { ...initialState }
  const subscribers = {}

  Object.keys(initialState).forEach(key => {
    subscribers[key] = new Set()
  })

  const notify = (key) => subscribers[key]?.forEach(cb => cb())
  const get = (key) => state[key]
  const set = (key, val) => {
    state[key] = val
    notify(key)
    if (typeof val === 'object' && val !== null) {
      Object.keys(val).forEach(subKey => notify(`${key}:${subKey}`))
    }
  }
  const setSilent = (key, val) => { state[key] = val }
  const subscribe = (key, cb) => {
    subscribers[key] ??= new Set()
    subscribers[key].add(cb)
    return () => subscribers[key].delete(cb)
  }
  const subscribeKey = (baseKey, subKey, cb) => {
    const key = `${baseKey}:${subKey}`
    subscribers[key] ??= new Set()
    subscribers[key].add(cb)
    if (!state[baseKey]) state[baseKey] = {}
    return () => subscribers[key].delete(cb)
  }
  const setKey = (baseKey, subKey, value) => {
    state[baseKey] ??= {}
    state[baseKey][subKey] = value
    notify(`${baseKey}:${subKey}`)
  }
  const useKey = (baseKey, subKey) =>
    useSyncExternalStore(
      cb => subscribeKey(baseKey, subKey, cb),
      () => state[baseKey]?.[subKey],
      () => state[baseKey]?.[subKey]
    )
  const use = (key) =>
    useSyncExternalStore(
      cb => subscribe(key, cb),
      () => get(key),
      () => get(key)
    )
  const getAll = () => ({ ...state })
  let allSnapshot = { ...state }
  const getAllSnapshot = () => allSnapshot
  const useAll = () =>
    useSyncExternalStore(
      cb => {
        const keys = Object.keys(initialState)
        const wrapped = () => { allSnapshot = { ...state }; cb() }
        keys.forEach(key => { subscribers[key] ??= new Set(); subscribers[key].add(wrapped) })
        return () => keys.forEach(key => subscribers[key].delete(wrapped))
      },
      getAllSnapshot,
      getAllSnapshot
    )
  const boundMethods = {}
  Object.keys(customMethods).forEach(name => {
    boundMethods[name] = (...args) =>
      customMethods[name]({ get, set, setKey, setSilent, notify }, ...args)
  })
return { get, set, getAll, use, useAll, useKey, setKey, setSilent, notify, subscribe, ...boundMethods }
}







