import { Button } from '@/components/ui/button';

export type FilterType = 'all' | 'active' | 'completed';

interface TaskFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function TaskFilter({ filter, onFilterChange }: TaskFilterProps) {
  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <div className="flex gap-2 mb-4">
      {filters.map((f) => (
        <Button
          key={f}
          variant={filter === f ? 'default' : 'secondary'}
          size="sm"
          onClick={() => onFilterChange(f)}
          className="capitalize"
        >
          {f}
        </Button>
      ))}
    </div>
  );
}
