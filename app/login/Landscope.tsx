'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import loginDarkImage from './login-dark.png'
import loginLightImage from './login-light.png'

export default function Landscope() {
  const { resolvedTheme } = useTheme()
  return (
    <Image
      className="h-dvh object-cover hidden lg:block"
      src={resolvedTheme === 'light' ? loginLightImage : loginDarkImage}
      alt="the island"
      priority
    />
  )
}
