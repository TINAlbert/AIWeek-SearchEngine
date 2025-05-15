import { Search } from "lucide-react";

interface NoResultsProps {
  message?: string;
  suggestion?: string;
  className?: string;
}

export default function NoResults({ message = "No se encontraron resultados", suggestion = "Prueba con otros criterios de búsqueda.", className = "" }: NoResultsProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-8 text-gray-400 ${className}`}>
      <Search size={32} className="mb-1" />
      <span className="font-semibold">{message}</span>
      <span className="text-xs text-gray-400">{suggestion}</span>
    </div>
  );
}
