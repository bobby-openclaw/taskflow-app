import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, type TaskFormData } from '../schemas';

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
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
        <input
          type="text"
          {...register('title')}
          placeholder="Add a new task..."
          className={`input ${errors.title ? 'input-error' : ''}`}
          aria-invalid={errors.title ? 'true' : 'false'}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
        )}
      </div>
      <button type="submit" disabled={isSubmitting} className="btn btn-primary">
        Add
      </button>
    </form>
  );
}
