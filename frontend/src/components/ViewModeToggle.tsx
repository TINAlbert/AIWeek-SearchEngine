interface ViewModeToggleProps {
  viewMode: 'table' | 'cards';
  setViewMode: (v: 'table' | 'cards') => void;
  isMobile: boolean;
}

export default function ViewModeToggle({ viewMode, setViewMode, isMobile }: ViewModeToggleProps) {
  if (isMobile) return null;
  return (
    <>
      <button
        className={`px-2 py-1 rounded text-xs border ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}
        onClick={() => setViewMode('table')}
      >
        Tabla
      </button>
      <button
        className={`px-2 py-1 rounded text-xs border ${viewMode === 'cards' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}
        onClick={() => setViewMode('cards')}
      >
        Tarjetas
      </button>
    </>
  );
}
