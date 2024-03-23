import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'
import {
  createContext,
  useContext,
  useState,
  type ComponentProps,
  type MouseEventHandler,
  type ReactElement,
} from 'react'
import { useFormStatus } from 'react-dom'
import { createWork } from './work'

interface Props {
  children: ReactElement
}

const Context = createContext<(value: boolean) => void>(() => {})

export default function FormDialog({ children }: Props) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{children.props.children}</DialogTitle>
          </DialogHeader>
          <Context.Provider value={setOpen}>
            <WorkForm />
          </Context.Provider>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{children.props.children}</DrawerTitle>
        </DrawerHeader>
        <Context.Provider value={setOpen}>
          <WorkForm className="px-4" />
        </Context.Provider>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function WorkForm({ className }: ComponentProps<'form'>) {
  return (
    <form className={cn('grid items-start gap-4', className)}>
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="cover">Cover</Label>
        <Input
          id="cover"
          name="cover"
          type="url"
          pattern="https://.*"
          required
          placeholder="https://"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="like">Like</Label>
        <Input id="like" name="like" type="number" min="1" max="5" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="comment">Comment</Label>
        <Textarea id="comment" name="comment" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="link">Link</Label>
        <Input
          id="link"
          name="link"
          type="url"
          pattern="https://.*"
          placeholder="https://"
        />
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  const setOpen = useContext(Context)

  const submit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const form = event.currentTarget.parentElement
    if (form instanceof HTMLFormElement && form.reportValidity()) {
      await createWork(new FormData(form))
      setOpen(false)
    }
  }

  return (
    <Button type="button" disabled={pending} onClick={submit}>
      Save changes
    </Button>
  )
}
