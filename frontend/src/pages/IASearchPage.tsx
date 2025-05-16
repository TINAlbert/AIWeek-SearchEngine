import React, { useState } from "react";

export default function IASearchPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<{ sql: string; data: any[] } | null>(null);
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
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error en la consulta IA");
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
        Búsqueda IA
        <span className="ml-2 px-2 py-0.5 text-xs rounded bg-yellow-200 text-yellow-800 font-semibold align-middle">Beta</span>
      </h1>
      <p className="text-gray-500 mb-4">Describe en lenguaje natural los datos de contactos que quieres consultar. La IA generará y ejecutará la consulta SQL por ti.</p>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Ej: Dame todos los contactos activos de Madrid"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50" disabled={loading || !prompt.trim()}>
          {loading ? "Consultando..." : "Buscar"}
        </button>
      </form>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {result && (
        <div className="bg-gray-50 border rounded p-4 mt-2">
          <div className="mb-2">
            <span className="font-semibold text-sm text-gray-600">SQL generada:</span>
            <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto mt-1 whitespace-pre-wrap">{result.sql}</pre>
          </div>
          <div>
            <span className="font-semibold text-sm text-gray-600">Resultados:</span>
            {result.data && result.data.length > 0 ? (
              <div className="overflow-x-auto mt-1">
                <table className="min-w-full text-xs border">
                  <thead>
                    <tr>
                      {Object.keys(result.data[0]).map((col) => (
                        <th key={col} className="border px-2 py-1 bg-gray-200 text-gray-700">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.data.map((row, i) => (
                      <tr key={i}>
                        {Object.values(row).map((val, j) => (
                          <td key={j} className="border px-2 py-1">{val === null ? <span className="text-gray-400">null</span> : String(val)}</td>
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
    </div>
  );
}
