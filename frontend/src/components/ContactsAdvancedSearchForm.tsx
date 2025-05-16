import type { ContactAdvancedFilter } from "../types/contact";
import type { Company } from "../types/company";
import ChipsMultiSelect from "./ChipsMultiSelect";
import { useEffect, useState } from "react";
import { profileService } from "../services/profile";
import type { Profile } from "../types/profile";

interface Props {
  value: ContactAdvancedFilter;
  onChange: (f: ContactAdvancedFilter) => void;
  onSubmit: () => void;
  onClear: () => void;
  companies: Company[];
}

export default function ContactsAdvancedSearchForm({ value, onChange, onSubmit, onClear, companies }: Props) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  useEffect(() => {
    profileService.list().then(setProfiles);
  }, []);

  return (
    <form
      className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 items-end px-2 py-2"
      onSubmit={e => { e.preventDefault(); onSubmit(); }}
      style={{ maxWidth: '100%' }}
    >
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Nombre</label>
        <input
          type="text"
          placeholder="Nombre"
          className="pl-3 pr-2 h-10 border border-gray-200 rounded-lg bg-white w-full focus:outline-none focus:ring-2 focus:ring-blue-100 text-gray-800 text-base shadow-sm transition"
          value={value.name || ''}
          onChange={e => onChange({ ...value, name: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
        <input
          type="text"
          placeholder="Email"
          className="pl-3 pr-2 h-10 border border-gray-200 rounded-lg bg-white w-full focus:outline-none focus:ring-2 focus:ring-blue-100 text-gray-800 text-base shadow-sm transition"
          value={value.email || ''}
          onChange={e => onChange({ ...value, email: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Teléfono</label>
        <input
          type="text"
          placeholder="Teléfono"
          className="pl-3 pr-2 h-10 border border-gray-200 rounded-lg bg-white w-full focus:outline-none focus:ring-2 focus:ring-blue-100 text-gray-800 text-base shadow-sm transition"
          value={value.phone || ''}
          onChange={e => onChange({ ...value, phone: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Ciudad</label>
        <input
          type="text"
          placeholder="Ciudad"
          className="pl-3 pr-2 h-10 border border-gray-200 rounded-lg bg-white w-full focus:outline-none focus:ring-2 focus:ring-blue-100 text-gray-800 text-base shadow-sm transition"
          value={value.city || ''}
          onChange={e => onChange({ ...value, city: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Empresa</label>
        <select
          className="h-10 border border-gray-200 rounded-lg bg-white w-full focus:outline-none focus:ring-2 focus:ring-blue-100 text-gray-800 text-base shadow-sm transition"
          value={value.companyId || ''}
          onChange={e => onChange({ ...value, companyId: e.target.value ? Number(e.target.value) : undefined, companyName: undefined })}
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
          value={value.profileIds || []}
          onChange={ids => onChange({ ...value, profileIds: ids })}
          label="Perfiles"
        />
      </div>
      <div className="flex gap-2 col-span-1 sm:col-span-2 md:col-span-3">
        <button
          type="submit"
          className="px-3 py-2 rounded bg-blue-600 text-white font-semibold text-sm shadow hover:bg-blue-700 transition w-full sm:w-auto"
        >Buscar</button>
        <button
          type="button"
          className="px-2 py-2 rounded bg-gray-100 text-gray-500 font-semibold text-sm border border-gray-200 hover:bg-gray-200 transition w-full sm:w-auto"
          onClick={onClear}
        >Limpiar</button>
      </div>
    </form>
  );
}
