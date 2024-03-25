import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createWork, deleteWork } from '@/lib/actions'
import { cn } from '@/lib/utils'
import {
  useContext,
  useState,
  type ComponentProps,
  type MouseEventHandler,
} from 'react'
import { useFormStatus } from 'react-dom'
import { DialogContext } from './Dialog'

export function WorkForm({ className }: ComponentProps<'form'>) {
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
  const { setOpen } = useContext(DialogContext)

  const submit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const form = event.currentTarget.parentElement
    if (form instanceof HTMLFormElement && form.reportValidity()) {
      await createWork(new FormData(form))
      setOpen(false)
    }
  }

  return (
    <Button type="button" disabled={pending} onClick={submit}>
      Save
    </Button>
  )
}

export function DeleteWorkButton({ id }: { id: string }) {
  const [disabled, setDisabled] = useState(false)
  const { setOpen } = useContext(DialogContext)

  const submit: MouseEventHandler<HTMLButtonElement> = async () => {
    setDisabled(true)
    await deleteWork(id)
    setOpen(false)
  }

  return (
    <div className="grid items-start">
      <Button variant="destructive" disabled={disabled} onClick={submit}>
        Confirm
      </Button>
    </div>
  )
}
