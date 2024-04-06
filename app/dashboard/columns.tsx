'use client'

import { Stars } from '@/components/Stars'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Work } from '@prisma/client'
import type { ColumnDef, SortingFn } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import FormDialog from './Dialog'
import { DeleteWorkButton, WorkForm } from './dialog-operations'

declare module '@tanstack/react-table' {
  interface SortingFns {
    sortByName: SortingFn<Work>
  }
}

export const columns: ColumnDef<Work>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-bold">{row.getValue('name')}</div>,
    sortingFn: 'sortByName',
  },
  {
    accessorKey: 'like',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Like
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Stars count={row.getValue('like')} size="small" />
      </div>
    ),
    invertSorting: true,
  },
  {
    accessorKey: 'comment',
    header: 'Comment',
    cell: ({ row }) => (
      <div className="truncate max-w-[20ch]">{row.getValue('comment')}</div>
    ),
  },
  {
    accessorKey: 'link',
    header: 'Link',
    cell: ({ row }) => (
      <div className="truncate max-w-[20ch]">{row.getValue('link')}</div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionMenu work={row.original} />,
  },
]

function ActionMenu({ work }: { work: Work }) {
  const [open, setOpen] = useState(false)

  const actionMap = {
    delete: {
      title: 'Delete the work',
      description: 'Are you sure to delete the work?',
      form: <DeleteWorkButton id={work.id} />,
    },
    update: {
      title: 'Update the work',
      description: '',
      form: <WorkForm defaultForm={work} />,
    },
  }
  type ActionKey = keyof typeof actionMap
  const [actionKey, setActionKey] = useState<ActionKey>()

  const openDialog = (actionKey: ActionKey) => () => {
    setActionKey(actionKey)
    setOpen(true)
  }

  function Dialog() {
    if (actionKey === undefined) {
      return null
    }

    const actionValue = actionMap[actionKey]
    return (
      <FormDialog
        state={{ open, setOpen }}
        title={actionValue.title}
        description={actionValue.description}
      >
        {actionValue.form}
      </FormDialog>
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/work/${work.id}`}>View the work</Link>
          </DropdownMenuItem>
          {Object.entries(actionMap).map(([actionKey, actionValue]) => (
            <DropdownMenuItem
              key={actionKey}
              onClick={openDialog(actionKey as ActionKey)}
            >
              {actionValue.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog />
    </>
  )
}
