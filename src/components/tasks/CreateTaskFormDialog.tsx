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
  DialogDescription,
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
  useCreateTaskMutation
} from '@/services/graphql/generated/graphql'
import { createTaskSchema } from '@/services/schemas/tasks/createTaskSchema'



interface IProps {
  projectId: string
  onCreated: () => void
}

type CreateTaskFormValues = z.infer<typeof createTaskSchema>


export default function CreateTaskFormDialog({
  projectId,
  onCreated
}: IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [createTask, { loading }] = useCreateTaskMutation({
    onError: (err) => toast.error(err.message),
    onCompleted: () => {
      toast.success('Tâche créée avec succès 🎉')
      setIsOpen(false)
      form.reset()
      onCreated()
    }
  })

  const form = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  })

  const handleSubmit = async (values: CreateTaskFormValues) => {
    await createTask({
      variables: {
        dto: {
          title: values.title,
          description: values.description,
          projectId
        }
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2 "
        >
          <Plus className="h-4 w-4"/>
          Nouvelle tâche
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Créer une tâche</DialogTitle>
          <DialogDescription>
            Ajoute une nouvelle tâche à ce projet.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre de la tâche</FormLabel>
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


            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >

                {loading ? 'Création...' : 'Créer la tâche'}
              </Button>
            </DialogFooter>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
