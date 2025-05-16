import { Sparkles } from "lucide-react";
import React, { useState } from "react";
import type { IASearchResult, IASearchError } from "../types/ai";

export default function IASearchPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<IASearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:5252/api"}/ai/generate-sql`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data: IASearchResult | IASearchError = await res.json();
      if (!res.ok) throw new Error((data as IASearchError).error || "Error en la consulta IA");
      setResult(data as IASearchResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col items-center">
      <div className="w-full px-2 sm:px-4 md:px-8 mt-2 sm:mt-14">
        <h1 className="text-2xl font-bold text-gray-800 mb-1 sm:mb-6 flex items-center gap-3">
          <Sparkles className="w-7 h-7 text-yellow-500" />
          Búsqueda IA
          <span className="ml-2 px-2 py-0.5 text-xs rounded bg-yellow-200 text-yellow-800 font-semibold align-middle">Beta</span>
        </h1>
        <div className="flex flex-col gap-2 sm:gap-4 mb-2 sm:mb-6 sticky top-0 z-10 bg-gray-50 pb-2">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 w-full p-0">
            <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 border-b border-gray-100 px-3 sm:px-6 min-h-[4rem] pt-3 sm:pt-5 pb-4">
              <input
                className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Describe en lenguaje natural la consulta de contactos..."
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                disabled={loading}
                autoFocus
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 min-w-[120px]" disabled={loading || !prompt.trim()}>
                {loading ? (
                  <span className="flex items-center gap-2"><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Consultando...</span>
                ) : "Buscar"}
              </button>
            </form>
            {error && <div className="text-red-600 px-6 py-2">{error}</div>}
            {result && (
              <div className="p-4 flex flex-col grow min-h-0">
                <div className="mb-2">
                  <span className="font-semibold text-sm text-gray-600">SQL generada:</span>
                  <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto mt-1 whitespace-pre-wrap border border-gray-200">{result.sql}</pre>
                </div>
                <div className="flex-1 min-h-0 flex flex-col">
                  <span className="font-semibold text-sm text-gray-600">Resultados:</span>
                  {result.data && result.data.length > 0 ? (
                    <div className="overflow-x-auto mt-1 rounded border border-gray-200 flex-1 min-h-0 max-h-[calc(100vh-260px)] overflow-y-auto">
                      <table className="min-w-full text-xs border-separate border-spacing-0">
                        <thead>
                          <tr>
                            {Object.keys(result.data[0]).map((col) => (
                              <th
                                key={col}
                                className="sticky top-0 z-10 bg-gray-100 text-gray-700 font-semibold px-3 py-2 border-b border-gray-200 text-left shadow-sm"
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {result.data.map((row, i) => (
                            <tr
                              key={i}
                              className={
                                i % 2 === 0
                                  ? "bg-white hover:bg-blue-50 transition-colors"
                                  : "bg-gray-50 hover:bg-blue-50 transition-colors"
                              }
                            >
                              {Object.values(row).map((val, j) => (
                                <td
                                  key={j}
                                  className="px-3 py-2 border-b border-gray-100 text-gray-800 whitespace-nowrap max-w-[220px] overflow-x-auto"
                                  style={{ fontVariantNumeric: 'tabular-nums' }}
                                >
                                  {val === null ? <span className="text-gray-400 italic">null</span> : String(val)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-gray-500 mt-1">Sin resultados.</div>
                  )}
                </div>
              </div>
            )}
            {loading && !result && (
              <div className="text-center py-16 text-blue-600">Consultando a la IA...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
