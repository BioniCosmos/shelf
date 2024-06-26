import { Button } from '@/components/ui/button'
import { login } from '@/lib/actions'
import { openGraph } from '@/lib/metadata'
import { Library } from 'lucide-react'
import type { Metadata } from 'next'
import { Icons } from '../../components/icons'
import Landscope from './Landscope'

export const metadata: Metadata = {
  title: 'Login',
  openGraph: { title: 'Login', ...openGraph },
}

export default function Page() {
  const providers = ['GitHub', 'Google'] as const
  return (
    <>
      <div className="flex items-center text-lg font-medium gap-2 fixed top-10 left-10 lg:text-white">
        <Library className="size-6" />
        Shelf
      </div>
      <div className="container h-dvh flex items-center justify-center lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Landscope />
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            </div>
            <form className="grid gap-6" action={login}>
              {providers.map((provider) => {
                const providerValue = provider.toLowerCase() as Lowercase<
                  typeof provider
                >
                return (
                  <Button
                    variant="outline"
                    name="provider"
                    value={providerValue}
                    key={provider}
                  >
                    <Icons value={providerValue} className="mr-2 h-4 w-4" />
                    {provider}
                  </Button>
                )
              })}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
