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
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          className={`px-3 py-1.5 text-sm rounded-lg capitalize transition-colors ${
            filter === f
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
