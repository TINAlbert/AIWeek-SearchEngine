import { Users, Activity, PlusCircle } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col items-center">
      <div className="w-full max-w-7xl px-2 sm:px-4 md:px-8 mt-2 sm:mt-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(140px,1fr)]">
          {/* Card 1: Resumen de contactos */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col justify-between col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg shadow-sm">
                <Users size={24} />
              </div>
              <span className="font-semibold text-lg text-gray-900">Contactos</span>
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-1">245</div>
            <div className="text-sm text-gray-400">Total registrados</div>
          </div>
          {/* Card 2: Actividad reciente */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col justify-between col-span-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg shadow-sm">
                <Activity size={24} />
              </div>
              <span className="font-semibold text-lg text-gray-900">Actividad</span>
            </div>
            <div className="text-sm text-gray-500">Última actualización hace 2h</div>
            <div className="mt-2 text-xs text-gray-400">Ver historial completo</div>
          </div>
          {/* Card 3: Acción rápida */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col justify-between col-span-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg shadow-sm">
                <PlusCircle size={24} />
              </div>
              <span className="font-semibold text-lg text-gray-900">Nuevo contacto</span>
            </div>
            <button className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">Añadir</button>
          </div>
        </div>
      </div>
    </div>
  );
}
