import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editTaskSchema, type EditTaskFormData } from '../schemas';
import type { Task } from '../types/task';

interface EditTaskFormProps {
  task: Task;
  onSave: (title: string) => void;
  onCancel: () => void;
}

export function EditTaskForm({ task, onSave, onCancel }: EditTaskFormProps) {
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
    <form className="card p-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
          Task Title
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className={`input ${errors.title ? 'input-error' : ''}`}
          aria-invalid={errors.title ? 'true' : 'false'}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
        )}
      </div>

      <div className="flex gap-3 justify-end">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting || !isDirty} className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </form>
  );
}
