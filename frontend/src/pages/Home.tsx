import { Users, User, UserCheck, ListChecks, CheckCircle, PlusCircle } from "lucide-react";

export default function Home() {
  const indicators = [
    {
      label: 'Contactos',
      value: 1280,
      icon: <Users className="w-8 h-8 text-blue-500" />,
      color: 'blue',
      span: 'lg:col-span-2',
      description: 'Total registrados',
    },
    {
      label: 'Usuarios',
      value: 12,
      icon: <User className="w-8 h-8 text-pink-500" />,
      color: 'pink',
      span: '',
      description: 'Usuarios activos',
    },
    {
      label: 'Sesiones activas',
      value: 3,
      icon: <UserCheck className="w-8 h-8 text-green-500" />,
      color: 'green',
      span: '',
      description: 'Activas ahora',
    },
    {
      label: 'Tareas pendientes',
      value: 7,
      icon: <ListChecks className="w-8 h-8 text-yellow-500" />,
      color: 'yellow',
      span: '',
      description: 'Pendientes',
    },
    {
      label: 'Completadas',
      value: 42,
      icon: <CheckCircle className="w-8 h-8 text-emerald-500" />,
      color: 'emerald',
      span: '',
      description: 'Tareas completadas',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col items-center">
      <div className="w-full max-w-7xl px-2 sm:px-4 md:px-8 mt-2 sm:mt-14">
        <h1 className="text-2xl font-bold text-gray-800 mb-1 sm:mb-6">Panel de Inicio</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(140px,1fr)]">
          {indicators.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col items-center justify-center col-span-1 ${item.span}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-full bg-${item.color}-100 flex items-center justify-center text-${item.color}-600 font-bold text-lg shadow-sm`}>
                  {item.icon}
                </div>
                <span className="font-semibold text-lg text-gray-900">{item.label}</span>
              </div>
              <div className={`text-3xl ${item.color === 'blue' ? 'text-blue-600 text-4xl' : item.color === 'pink' ? 'text-pink-500' : item.color === 'green' ? 'text-green-600' : item.color === 'yellow' ? 'text-yellow-500' : 'text-emerald-500'} font-bold mb-1`}>{item.value}</div>
              <div className="text-sm text-gray-400">{item.description}</div>
            </div>
          ))}
          {/* Card de acción rápida tipo bento */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col items-center justify-center col-span-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg shadow-sm">
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
