import React, { useState } from "react";
import type { Profile } from "../types/profile";
import { Plus, X } from "lucide-react";

interface ChipsMultiSelectProps {
  options: Profile[];
  value: number[];
  onChange: (ids: number[]) => void;
  label?: string;
}

export default function ChipsMultiSelect({ options, value, onChange, label }: ChipsMultiSelectProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const handleToggle = (id: number) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  const selectedProfiles = options.filter((o) => value.includes(o.id));
  const filteredProfiles = options.filter((o) => o.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      {label && <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>}
      <div className="flex flex-wrap gap-2 items-center">
        {selectedProfiles.map((profile) => (
          <span key={profile.id} className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-medium">
            {profile.name}
            <button
              type="button"
              className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
              onClick={() => handleToggle(profile.id)}
              aria-label={`Quitar ${profile.name}`}
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <button
          type="button"
          className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 ml-1"
          onClick={() => setModalOpen(true)}
          title="Añadir perfiles"
        >
          <Plus size={16} />
        </button>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)' }} />
          <div className="relative z-10 bg-white rounded-xl shadow-lg p-6 min-w-[260px] max-w-xs w-full">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setModalOpen(false)}
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
            <h3 className="text-base font-semibold mb-3 text-gray-800 flex items-center justify-between">
              <span>Selecciona perfiles</span>
              <span className="ml-2 text-xs font-normal text-blue-700 bg-blue-100 rounded px-2 py-0.5">{value.length} seleccionados</span>
            </h3>
            <input
              type="text"
              placeholder="Filtrar por nombre..."
              className="mb-3 px-3 py-2 border border-gray-200 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
              {filteredProfiles.length === 0 && (
                <div className="text-gray-400 text-sm">No hay perfiles</div>
              )}
              {filteredProfiles.map((option) => {
                const selected = value.includes(option.id);
                return (
                  <button
                    type="button"
                    key={option.id}
                    className={`px-3 py-2 rounded-lg border flex items-center transition text-sm text-left gap-2 ${
                      selected
                        ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-blue-50"
                    }`}
                    onClick={() => handleToggle(option.id)}
                  >
                    {selected && (
                      <span className="inline-block w-4 h-4 mr-1 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center">
                        <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </span>
                    )}
                    {option.name}
                  </button>
                );
              })}
            </div>
            <button
              className="mt-4 w-full py-2 rounded bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition"
              onClick={() => setModalOpen(false)}
            >Aceptar</button>
          </div>
        </div>
      )}
    </div>
  );
}
