export type FilterType = 'all' | 'active' | 'completed';

interface TaskFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function TaskFilter({ filter, onFilterChange }: TaskFilterProps) {
  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <div className="task-filter">
      {filters.map((f) => (
        <button
          key={f}
          className={filter === f ? 'active' : ''}
          onClick={() => onFilterChange(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
