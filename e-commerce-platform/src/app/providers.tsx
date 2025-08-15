"use client"

import type React from "react"

import { Provider } from "react-redux"
import { store } from "@/lib/store"
import { NextIntlClientProvider } from "next-intl"

interface ProvidersProps {
  children: React.ReactNode
  locale?: string
  messages?: any
}

export function Providers({ children, locale = "en", messages }: ProvidersProps) {
  return (
    <Provider store={store}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </Provider>
  )
}
