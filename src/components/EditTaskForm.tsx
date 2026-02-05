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
    <form className="edit-task-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <label htmlFor="title">Task Title</label>
        <input
          id="title"
          type="text"
          {...register('title')}
          aria-invalid={errors.title ? 'true' : 'false'}
        />
        {errors.title && (
          <span className="error-message">{errors.title.message}</span>
        )}
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting || !isDirty} className="save-btn">
          Save Changes
        </button>
      </div>
    </form>
  );
}
