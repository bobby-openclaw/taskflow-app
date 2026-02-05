import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { editTaskSchema, type EditTaskFormData } from '@/schemas';
import type { Task } from '@/types/task';

interface EditTaskFormProps {
  task: Task;
  onSave: (title: string) => void;
  onCancel: () => void;
}

export const EditTaskForm = ({ task, onSave, onCancel }: EditTaskFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<EditTaskFormData>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      title: task.title,
      completed: task.completed,
    },
  });

  const onSubmit = (data: EditTaskFormData) => {
    onSave(data.title);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Task Title
            </label>
            <Input
              id="title"
              type="text"
              {...register('title')}
              aria-invalid={errors.title ? 'true' : 'false'}
              className={errors.title ? 'border-destructive focus-visible:ring-destructive' : ''}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !isDirty}>
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
