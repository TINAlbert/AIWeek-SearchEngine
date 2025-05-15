import { Table, LayoutGrid } from "lucide-react";

interface ViewModeToggleProps {
  viewMode: 'table' | 'cards';
  setViewMode: (v: 'table' | 'cards') => void;
  isMobile: boolean;
  size?: 'sm' | 'md';
}

export default function ViewModeToggle({ viewMode, setViewMode, isMobile, size = 'md' }: ViewModeToggleProps) {
  if (isMobile) return null;
  const btnW = size === 'sm' ? 'w-9' : 'w-14';
  const btnH = size === 'sm' ? 'h-9' : 'h-11';
  const iconSize = size === 'sm' ? 18 : 22;
  const rounded = size === 'sm' ? 'rounded-md' : 'rounded-lg';
  return (
    <div className={`inline-flex ${rounded} shadow-sm overflow-hidden border border-blue-100 bg-gray-100`}>
      <button
        className={`flex items-center justify-center ${btnW} ${btnH} transition-colors duration-150
          ${viewMode === 'table'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-blue-600 hover:bg-blue-50'}
        `}
        style={{ borderRight: '1px solid #dbeafe' }}
        onClick={() => setViewMode('table')}
        aria-pressed={viewMode === 'table'}
        title="Vista tabla"
      >
        <Table size={iconSize} />
      </button>
      <button
        className={`flex items-center justify-center ${btnW} ${btnH} transition-colors duration-150
          ${viewMode === 'cards'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-blue-600 hover:bg-blue-50'}
        `}
        onClick={() => setViewMode('cards')}
        aria-pressed={viewMode === 'cards'}
        title="Vista tarjetas"
      >
        <LayoutGrid size={iconSize} />
      </button>
    </div>
  );
}
