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
    <form className="task-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <input
          type="text"
          {...register('title')}
          placeholder="Add a new task..."
          aria-invalid={errors.title ? 'true' : 'false'}
        />
        {errors.title && (
          <span className="error-message">{errors.title.message}</span>
        )}
      </div>
      <button type="submit" disabled={isSubmitting}>
        Add
      </button>
    </form>
  );
}
