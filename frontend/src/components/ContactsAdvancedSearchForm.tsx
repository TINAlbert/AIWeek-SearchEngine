import type { ContactAdvancedFilter } from "../types/contact";
import type { Company } from "../types/company";
import ChipsMultiSelect from "./ChipsMultiSelect";
import { useEffect, useState } from "react";
import { profileService } from "../services/profile";
import type { Profile } from "../types/profile";

interface Props {
  value: ContactAdvancedFilter;
  onChange: (f: ContactAdvancedFilter) => void;
  onClear: () => void;
  companies: Company[];
}

export default function ContactsAdvancedSearchForm({ value, onChange, onClear, companies }: Props) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  useEffect(() => {
    profileService.list().then(setProfiles);
  }, []);

  const [localFilter, setLocalFilter] = useState<ContactAdvancedFilter>(value);
  useEffect(() => { setLocalFilter(value); }, [value]);

  const handleFieldChange = (field: keyof ContactAdvancedFilter, val: unknown) => {
    setLocalFilter((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(localFilter); // Solo actualiza el filtro global
    // No llamar a onSubmit aquí, ya que el padre ya escucha el cambio de filtro
  };

  const handleClear = () => {
    setLocalFilter({});
    onChange({});
    onClear();
  };

  return (
    <form
      className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 items-end px-3 py-4 bg-white rounded-xl"
      onSubmit={handleSubmit}
      style={{ maxWidth: '100%' }}
    >
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Nombre</label>
        <input
          type="text"
          placeholder="Nombre"
          className="pl-3 pr-2 h-10 border border-gray-200 rounded-lg bg-gray-50 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800 text-base shadow-sm transition"
          value={localFilter.name || ''}
          onChange={e => handleFieldChange('name', e.target.value)}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
        <input
          type="text"
          placeholder="Email"
          className="pl-3 pr-2 h-10 border border-gray-200 rounded-lg bg-gray-50 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800 text-base shadow-sm transition"
          value={localFilter.email || ''}
          onChange={e => handleFieldChange('email', e.target.value)}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Teléfono</label>
        <input
          type="text"
          placeholder="Teléfono"
          className="pl-3 pr-2 h-10 border border-gray-200 rounded-lg bg-gray-50 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800 text-base shadow-sm transition"
          value={localFilter.phone || ''}
          onChange={e => handleFieldChange('phone', e.target.value)}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Ciudad</label>
        <input
          type="text"
          placeholder="Ciudad"
          className="pl-3 pr-2 h-10 border border-gray-200 rounded-lg bg-gray-50 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800 text-base shadow-sm transition"
          value={localFilter.city || ''}
          onChange={e => handleFieldChange('city', e.target.value)}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Empresa</label>
        <select
          className="h-10 border border-gray-200 rounded-lg bg-gray-50 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800 text-base shadow-sm transition"
          value={localFilter.companyId || ''}
          onChange={e => handleFieldChange('companyId', e.target.value ? Number(e.target.value) : undefined)}
        >
          <option value="">Todas</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div>
        <ChipsMultiSelect
          options={profiles}
          value={localFilter.profileIds || []}
          onChange={ids => handleFieldChange('profileIds', ids)}
          label="Perfiles"
        />
      </div>
      <div className="flex gap-2 col-span-1 sm:col-span-2 md:col-span-3 mt-2">
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white font-semibold text-sm shadow hover:bg-blue-700 transition w-full sm:w-auto flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          Buscar
        </button>
        <button
          type="button"
          className="px-3 py-2 rounded bg-white text-blue-700 font-semibold text-sm border border-blue-200 hover:bg-blue-50 transition w-full sm:w-auto flex items-center gap-2"
          onClick={handleClear}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          Limpiar
        </button>
      </div>
    </form>
  );
}
