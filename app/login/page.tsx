import { Button } from '@/components/ui/button'
import { login } from '@/lib/actions'
import { Library } from 'lucide-react'
import Image from 'next/image'
import { Icons } from '../../components/icons'
import loginLightImage from './login-light.png'

export default function Page() {
  return (
    <>
      <div className="flex items-center text-lg font-medium gap-2 fixed top-10 left-10 lg:text-white">
        <Library className="size-6" />
        Shelf
      </div>
      <div className="container h-dvh flex items-center justify-center lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Image
          // dark:border-r
          className="h-dvh object-cover hidden lg:block"
          src={loginLightImage}
          alt="the island"
          priority
        />
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            </div>
            <form className="grid gap-6" action={login}>
              <Button variant="outline" name="provider" value="github">
                <Icons.gitHub className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
