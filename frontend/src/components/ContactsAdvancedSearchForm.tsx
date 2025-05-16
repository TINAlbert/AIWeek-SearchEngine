import type { ContactAdvancedFilter } from "../types/contact";
import type { Company } from "../types/company";
import ChipsMultiSelect from "./ChipsMultiSelect";
import { useEffect, useState, useRef } from "react";
import { profileService } from "../services/profile";
import type { Profile } from "../types/profile";

interface Props {
  value: ContactAdvancedFilter;
  onChange: (f: ContactAdvancedFilter) => void;
  onClear: () => void;
  companies: Company[];
}

// Historial de filtros avanzados en localStorage
const HISTORY_KEY = "contacts_advanced_search_history";
function saveToHistory(filter: ContactAdvancedFilter) {
  const { page, pageSize, ...cleanFilter } = filter;
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  // Evitar duplicados (comparar shallow)
  const exists = history.find((f: any) => JSON.stringify(f) === JSON.stringify(cleanFilter));
  let newHistory = exists
    ? [cleanFilter, ...history.filter((f: any) => JSON.stringify(f) !== JSON.stringify(cleanFilter))]
    : [cleanFilter, ...history];
  if (newHistory.length > 10) newHistory = newHistory.slice(0, 10);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
}
function getHistory(): ContactAdvancedFilter[] {
  return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
}
function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

// Hook para detectar móvil
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

export default function ContactsAdvancedSearchForm({ value, onChange, onClear, companies }: Props) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  useEffect(() => {
    profileService.list().then(setProfiles);
  }, []);

  const [localFilter, setLocalFilter] = useState<ContactAdvancedFilter>(value);
  useEffect(() => { setLocalFilter(value); }, [value]);

  const [history, setHistory] = useState<ContactAdvancedFilter[]>(getHistory());
  const [showHistory, setShowHistory] = useState(false);
  const historyDropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    if (!showHistory) return;
    function handleClick(e: MouseEvent) {
      if (historyDropdownRef.current && !historyDropdownRef.current.contains(e.target as Node)) {
        setShowHistory(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showHistory]);

  const handleFieldChange = (field: keyof ContactAdvancedFilter, val: unknown) => {
    setLocalFilter((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(localFilter);
    saveToHistory(localFilter);
    setHistory(getHistory());
  };

  const handleClear = () => {
    setLocalFilter({});
    onChange({ profileIds: [] }); // Asegura que el campo perfil se limpia correctamente
    onClear();
  };

  return (
    <div className="relative w-full">
      <form
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 items-end px-3 py-4 bg-white rounded-xl"
        onSubmit={handleSubmit}
        style={{ maxWidth: '100%' }}
      >
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Nombre</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20v-6m0 0V4m0 10H6m6 0h6"/></svg>
            </span>
            <input
              type="text"
              placeholder="Introduce un nombre..."
              className="pl-10 pr-3 h-10 border border-gray-200 rounded-xl bg-white w-full focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800 text-base shadow-sm transition-all duration-200 hover:shadow-md placeholder-gray-400"
              value={localFilter.name || ''}
              onChange={e => handleFieldChange('name', e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
            </span>
            <input
              type="text"
              placeholder="Introduce un email..."
              className="pl-10 pr-3 h-10 border border-gray-200 rounded-xl bg-white w-full focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800 text-base shadow-sm transition-all duration-200 hover:shadow-md placeholder-gray-400"
              value={localFilter.email || ''}
              onChange={e => handleFieldChange('email', e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Teléfono</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V21a2 2 0 01-2.18 2A19.72 19.72 0 013 5.18 2 2 0 015 3h4.09a2 2 0 012 1.72c.13.81.36 1.6.68 2.34a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0121 14.91V19a2 2 0 01-2 2h-.08"/></svg>
            </span>
            <input
              type="text"
              placeholder="Introduce un teléfono..."
              className="pl-10 pr-3 h-10 border border-gray-200 rounded-xl bg-white w-full focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800 text-base shadow-sm transition-all duration-200 hover:shadow-md placeholder-gray-400"
              value={localFilter.phone || ''}
              onChange={e => handleFieldChange('phone', e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Ciudad</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 018 8c0 7-8 12-8 12S4 17 4 10a8 8 0 018-8z"/></svg>
            </span>
            <input
              type="text"
              placeholder="Introduce una ciudad..."
              className="pl-10 pr-3 h-10 border border-gray-200 rounded-xl bg-white w-full focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800 text-base shadow-sm transition-all duration-200 hover:shadow-md placeholder-gray-400"
              value={localFilter.city || ''}
              onChange={e => handleFieldChange('city', e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Empresa</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
              {/* Icono de empresa (Building) Lucide SVG inline */}
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4M3 13h18"/></svg>
            </span>
            <select
              className="h-10 pl-10 pr-3 border border-gray-200 rounded-xl bg-white w-full focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800 text-base shadow-sm transition-all duration-200 hover:shadow-md placeholder-gray-400"
              value={localFilter.companyId || ''}
              onChange={e => handleFieldChange('companyId', e.target.value ? Number(e.target.value) : undefined)}
            >
              <option value="" disabled hidden>Selecciona una empresa...</option>
              <option value="">Todas</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <ChipsMultiSelect
            options={profiles}
            value={localFilter.profileIds || []}
            onChange={ids => handleFieldChange('profileIds', ids)}
            label="Perfiles"
          />
        </div>
        <div className="flex gap-2 col-span-1 sm:col-span-2 md:col-span-3 mt-2 relative">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold text-sm shadow hover:bg-blue-700 transition w-full sm:w-auto flex items-center gap-2 h-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            Buscar
          </button>
          <button
            type="button"
            className="px-3 py-2 rounded bg-white text-blue-700 font-semibold text-sm border border-blue-200 hover:bg-blue-50 transition w-full sm:w-auto flex items-center gap-2 h-10"
            onClick={handleClear}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            Limpiar
          </button>
          <div className="relative">
            <button
              type="button"
              className="px-2 py-2 rounded border border-blue-200 bg-white text-blue-700 hover:bg-blue-50 flex items-center gap-1 shadow-sm h-10 text-xs"
              onClick={() => setShowHistory((v) => !v)}
              title="Ver historial de búsquedas avanzadas"
              style={{ minWidth: 90 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 8l7-7 7 7M5 16l7 7 7-7" /></svg>
              Historial
            </button>
            {/* Drawer para móvil, popup para desktop */}
            {showHistory && (
              isMobile ? (
                <div className="fixed inset-0 z-40 flex items-end justify-center">
                  <div className="fixed inset-0 bg-black/40 transition-opacity z-30" onClick={() => setShowHistory(false)} />
                  <div className="w-full max-w-md bg-white border-t border-blue-200 rounded-t-2xl shadow-2xl z-40 p-4 animate-slideUp" style={{minHeight: 220, maxHeight: '70vh', overflowY: 'auto'}}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-blue-700">Últimas búsquedas avanzadas</span>
                      <button
                        type="button"
                        className="text-xs text-blue-500 hover:underline"
                        onClick={() => { clearHistory(); setHistory([]); }}
                      >Limpiar historial</button>
                    </div>
                    {history.length === 0 ? (
                      <div className="text-gray-400 text-xs">No hay búsquedas guardadas.</div>
                    ) : (
                      <ul className="divide-y divide-blue-50">
                        {history.map((f, i) => (
                          <li key={i} className="py-2 cursor-pointer hover:bg-blue-50 rounded px-2" onClick={() => {
                            setLocalFilter(f);
                            setShowHistory(false);
                            onChange(f); // Lanzar búsqueda automáticamente
                            saveToHistory(f); // Opcional: guardar como última búsqueda
                          }}>
                            <div className="flex flex-wrap gap-2 text-xs text-gray-700">
                              {f.name && <span><b>Nombre:</b> {f.name}</span>}
                              {f.email && <span><b>Email:</b> {f.email}</span>}
                              {f.phone && <span><b>Tel:</b> {f.phone}</span>}
                              {f.city && <span><b>Ciudad:</b> {f.city}</span>}
                              {f.companyId && <span><b>Empresa:</b> {companies.find(c => c.id === f.companyId)?.name || f.companyId}</span>}
                              {f.profileIds && f.profileIds.length > 0 && <span><b>Perfiles:</b> {f.profileIds.length}</span>}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                    <button
                      type="button"
                      className="mt-4 w-full py-2 rounded bg-blue-600 text-white font-semibold text-sm shadow hover:bg-blue-700 transition"
                      onClick={() => setShowHistory(false)}
                    >Cerrar</button>
                  </div>
                </div>
              ) : (
                <div ref={historyDropdownRef} className="absolute left-0 mt-2 w-[340px] sm:w-[380px] md:w-[420px] bg-white border border-blue-200 rounded-xl shadow-lg z-20 p-3" style={{minWidth:220}}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-blue-700">Últimas búsquedas avanzadas</span>
                    <button
                      type="button"
                      className="text-xs text-blue-500 hover:underline"
                      onClick={() => { clearHistory(); setHistory([]); }}
                    >Limpiar historial</button>
                  </div>
                  {history.length === 0 ? (
                    <div className="text-gray-400 text-xs">No hay búsquedas guardadas.</div>
                  ) : (
                    <ul className="max-h-60 overflow-y-auto divide-y divide-blue-50">
                      {history.map((f, i) => (
                        <li key={i} className="py-2 cursor-pointer hover:bg-blue-50 rounded px-2" onClick={() => {
                          setLocalFilter(f);
                          setShowHistory(false);
                          onChange(f); // Lanzar búsqueda automáticamente
                          saveToHistory(f); // Opcional: guardar como última búsqueda
                        }}>
                          <div className="flex flex-wrap gap-2 text-xs text-gray-700">
                            {f.name && <span><b>Nombre:</b> {f.name}</span>}
                            {f.email && <span><b>Email:</b> {f.email}</span>}
                            {f.phone && <span><b>Tel:</b> {f.phone}</span>}
                            {f.city && <span><b>Ciudad:</b> {f.city}</span>}
                            {f.companyId && <span><b>Empresa:</b> {companies.find(c => c.id === f.companyId)?.name || f.companyId}</span>}
                            {f.profileIds && f.profileIds.length > 0 && <span><b>Perfiles:</b> {f.profileIds.length}</span>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

// Animación para el drawer (puedes añadir en tu CSS global)
// .animate-slideUp { animation: slideUp 0.25s cubic-bezier(.4,0,.2,1); }
// @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
