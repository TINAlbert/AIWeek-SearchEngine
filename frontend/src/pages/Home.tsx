import { Users, User, UserCheck, ListChecks, CheckCircle } from "lucide-react";

export default function Home() {
  // Ejemplo de indicadores, puedes adaptar los valores y títulos
  const indicators = [
    {
      label: 'Contactos',
      value: 1280,
      icon: <Users className="w-8 h-8 text-blue-500" />,
    },
    {
      label: 'Usuarios',
      value: 12,
      icon: <User className="w-8 h-8 text-pink-500" />,
    },
    {
      label: 'Sesiones activas',
      value: 3,
      icon: <UserCheck className="w-8 h-8 text-green-500" />,
    },
    {
      label: 'Tareas pendientes',
      value: 7,
      icon: <ListChecks className="w-8 h-8 text-yellow-500" />,
    },
    {
      label: 'Completadas',
      value: 42,
      icon: <CheckCircle className="w-8 h-8 text-emerald-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-start justify-start p-4">
      <div className="max-w-4xl w-full mx-auto mt-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 text-left drop-shadow">Panel de Indicadores</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {indicators.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition-shadow">
              <div className="mb-2">{item.icon}</div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{item.value}</div>
              <div className="text-sm text-gray-500 font-medium tracking-wide uppercase">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
