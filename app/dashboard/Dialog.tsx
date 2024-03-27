import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogContent as DialogState,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useMediaQuery } from '@/hooks/use-media-query'
import {
  createContext,
  type Dispatch,
  type ReactElement,
  type SetStateAction,
} from 'react'

interface DialogState {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const DialogContext = createContext<DialogState>({
  open: false,
  setOpen: () => {},
})

interface Props {
  state: DialogState
  title: string
  description: string
  children: ReactElement
}

export default function FormDialog({
  state,
  title,
  description,
  children,
}: Props) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={state.open} onOpenChange={state.setOpen}>
        <DialogState className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description !== '' && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <DialogContext.Provider value={state}>
            {children}
          </DialogContext.Provider>
        </DialogState>
      </Dialog>
    )
  }

  return (
    <Drawer open={state.open} onOpenChange={state.setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          {description !== undefined && (
            <DrawerDescription>{description}</DrawerDescription>
          )}
        </DrawerHeader>
        <DialogContext.Provider value={state}>
          <div className="px-4">{children}</div>
        </DialogContext.Provider>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
