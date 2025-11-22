'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useState } from 'react'
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
  DialogTrigger} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  ProjectDocument,
  useCreateTaskMutation
} from '@/services/graphql/generated/graphql'
import { createTaskSchema } from '@/services/schemas/tasks/createTaskSchema'



interface IProps {
  projectId: string
}
type CreateTaskFormValues = z.infer<typeof createTaskSchema>


export function CreateTaskFormDialog({
  projectId
}: IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [createTask, { loading }] = useCreateTaskMutation({
    onError: (err) => toast.error(err.message),
    onCompleted: () => {
      toast.success('Tâche créée avec succès 🎉')
      setIsOpen(false)
      form.reset()
    },
    refetchQueries: [
    {
      query: ProjectDocument,
      variables: { id: projectId }
    }]

  })

  const form = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  })

  const handleSubmit = async (values: CreateTaskFormValues) => {
    const res = await createTask({
      variables: {
        dto: {
          title: values.title,
          description: values.description,
          projectId
        }
      }
    })

    if (res.data?.createTask) {
      setIsOpen(false)
      form.reset({
        title: '',
        description: ''
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4"/>
          Nouvelle tâche
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une tâche</DialogTitle>
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
                    <Input placeholder="Titre de la tâche" {...field} />
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
                    <Textarea
                      placeholder="Description (optionnelle)"
                      rows={3}
                      {...field}
                    />
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
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? 'Création…' : 'Créer la tâche'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
