import { X } from "lucide-react";

interface ContactsSearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function ContactsSearchBar({ value, onChange }: ContactsSearchBarProps) {
  return (
    <div className="relative w-full flex items-center min-w-0">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
      </span>
      <input
        type="text"
        placeholder="Buscar por nombre, email, ciudad..."
        className="pl-10 pr-10 h-10 border border-gray-200 rounded-xl bg-white w-full focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800 text-base shadow-sm transition-all duration-200 hover:shadow-md placeholder-gray-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          aria-label="Limpiar búsqueda"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-blue-50 focus:outline-none focus:ring"
          onClick={() => onChange("")}
        >
          <X size={16} className="text-blue-400" />
        </button>
      )}
    </div>
  );
}
