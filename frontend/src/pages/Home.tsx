export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-white to-pink-200">
      <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center">
        <svg className="w-20 h-20 mb-4 text-blue-500 animate-bounce" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <h1 className="text-4xl font-extrabold text-blue-600 mb-2 drop-shadow">¡Tailwind funciona!</h1>
        <p className="text-lg text-gray-700 mb-4">Edita este archivo para empezar tu proyecto.</p>
        <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform font-semibold">Botón de prueba</button>
      </div>
    </div>
  );
}
