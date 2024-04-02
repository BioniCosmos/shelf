import Image from 'next/image'
import loginDarkImage from './login-dark.png'
import loginLightImage from './login-light.png'

export default function Landscope() {
  return (
    <div className="hidden lg:block">
      <Image
        className="h-dvh object-cover block dark:hidden"
        src={loginLightImage}
        alt="the island"
        priority
      />
      <Image
        className="h-dvh object-cover hidden dark:block"
        src={loginDarkImage}
        alt="the island"
        priority
      />
    </div>
  )
}
