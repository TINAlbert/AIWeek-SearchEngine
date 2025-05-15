import { useEffect, useState } from "react";
import { getUserProfile, getUserAvatar, uploadUserAvatar } from "../services/user";
import type { UserProfile } from "../types/user";

const AVATAR_PLACEHOLDER = "/avatar-placeholder.png";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>(AVATAR_PLACEHOLDER);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserProfile();
        setProfile(data);
        // Intentar cargar avatar
        try {
          const blob = await getUserAvatar();
          setAvatarUrl(URL.createObjectURL(blob));
        } catch {
          setAvatarUrl(AVATAR_PLACEHOLDER);
        }
      } catch {
        setError("No se pudo cargar el perfil de usuario.");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    setError(null);
    setSuccess(null);
    try {
      const file = e.target.files[0];
      await uploadUserAvatar(file);
      const blob = await getUserAvatar();
      setAvatarUrl(URL.createObjectURL(blob));
      setSuccess("Avatar actualizado correctamente.");
    } catch {
      setError("Error al subir el avatar.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Cargando perfil...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!profile) return null;

  return (
    <div className="max-w-2xl mx-auto p-4 mt-10">
      <div className="flex flex-col items-center gap-8">
        <div className="relative flex flex-col items-center w-full">
          <div className="relative group">
            <img
              src={avatarUrl}
              alt="Avatar de usuario"
              className="w-36 h-36 rounded-full object-cover border-4 border-gray-300 shadow bg-gray-100 transition-all duration-300 group-hover:brightness-95"
            />
            <label className="absolute bottom-2 right-2 cursor-pointer bg-neutral-800 hover:bg-neutral-700 text-white rounded-full p-3 shadow border-2 border-white flex items-center justify-center transition-colors duration-200 group-hover:scale-110" title="Cambiar avatar" style={{zIndex:2}}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2a2.828 2.828 0 11-4-4 2.828 2.828 0 014 4z" /></svg>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                style={{zIndex:3}}
              />
            </label>
          </div>
          {uploading && <div className="text-xs text-neutral-600 mt-2 animate-pulse">Subiendo avatar...</div>}
          {success && <div className="text-xs text-green-600 mt-2">{success}</div>}
          {error && <div className="text-xs text-red-600 mt-2">{error}</div>}
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <ProfileField label="Nombre" value={profile.firstName} />
          <ProfileField label="Apellido" value={profile.lastName} />
          <ProfileField label="Email" value={profile.email} />
          <ProfileField label="Rol" value={profile.role} />
          <ProfileField label="Estado" value={profile.isActive ? "Activo" : "Inactivo"} />
          <ProfileField label="Creado" value={new Date(profile.createdAt).toLocaleString()} />
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 bg-transparent rounded-lg p-2 border-b border-gray-200">
      <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wide">{label}</span>
      <span className="text-base font-medium text-neutral-900 break-all">{value}</span>
    </div>
  );
}
