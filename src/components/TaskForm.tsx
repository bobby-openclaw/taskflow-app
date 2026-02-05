import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { taskSchema, type TaskFormData } from '@/schemas';

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

export const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = (data: TaskFormData) => {
    onAddTask(data.title);
    reset();
  };

  return (
    <form className="flex gap-3 mb-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-1">
        <Input
          type="text"
          {...register('title')}
          placeholder="Add a new task..."
          aria-invalid={errors.title ? 'true' : 'false'}
          className={errors.title ? 'border-destructive focus-visible:ring-destructive' : ''}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        <Plus className="h-4 w-4 mr-1" />
        Add
      </Button>
    </form>
  );
}
