'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { type ReactNode,useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
    ProjectDocument,
  ProjectTaskItemFragment,
  TaskStatus,
  useUpdateTaskMutation
} from '@/services/graphql/generated/graphql'

const updateTaskSchema = z.object({
  title: z.string().min(1, 'Le titre est obligatoire'),
  description: z.string().optional(),
  status: z.nativeEnum(TaskStatus)
})

type UpdateTaskFormValues = z.infer<typeof updateTaskSchema>

interface UpdateTaskFormDialogProps {
  task: ProjectTaskItemFragment
  children: ReactNode
}

export function UpdateTaskFormDialog({
  task,
  children
}: UpdateTaskFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const [updateTask, { loading }] = useUpdateTaskMutation({
    onError: (err) => toast.error(err.message),
    onCompleted: () => {
      toast.success('Tâche mise à jour avec succès')
      setIsOpen(false)
    },

    refetchQueries: [
    {
      query: ProjectDocument,
      variables: { id: task.project.id }
    }]
  })

  const form = useForm<UpdateTaskFormValues>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description ?? '',
      status: task.status
    }
  })

  useEffect(() => {
    if (isOpen) {
      form.reset({
        title: task.title,
        description: task.description ?? '',
        status: task.status
      })
    }
  }, [isOpen, task, form])

  const handleSubmit = async (values: UpdateTaskFormValues) => {
    await updateTask({
      variables: {
        dto: {
          id: task.id,
          title: values.title,
          description: values.description,
          status: values.status
        }
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="w-full text-left"
        >
          {children}
        </button>
      </DialogTrigger>

      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Modifier la tâche</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Statut</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={TaskStatus.Todo}>À faire</SelectItem>
                        <SelectItem value={TaskStatus.InProgress}>En cours</SelectItem>
                        <SelectItem value={TaskStatus.Done}>Terminé</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? 'Enregistrement…' : 'Enregistrer'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
