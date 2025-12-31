"use client"

import { SessionProvider } from 'next-auth/react'
import React from 'react'

type MainProvidersProps = {
  children: React.ReactNode
}
export default function MainProviders({children} : any) {
  return (
    <SessionProvider>{ children }</SessionProvider>
  )
}
