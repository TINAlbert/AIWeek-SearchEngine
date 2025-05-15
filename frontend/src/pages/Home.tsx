export default function Home() {
  // Ejemplo de indicadores, puedes adaptar los valores y títulos
  const indicators = [
    {
      label: 'Contactos',
      value: 1280,
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      label: 'Usuarios',
      value: 12,
      icon: (
        <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      label: 'Sesiones activas',
      value: 3,
      icon: (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
    {
      label: 'Tareas pendientes',
      value: 7,
      icon: (
        <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
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
