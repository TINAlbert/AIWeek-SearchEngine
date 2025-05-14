import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login as loginService } from "../services/auth";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const schema = yup.object({
  email: yup.string().email("Email no válido").required("El email es obligatorio"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
});

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const { login } = useAuth();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await loginService(data.email, data.password);
      login(res); // Guardar tokens y usuario en contexto
      // Aquí puedes redirigir al dashboard o página protegida
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error de autenticación");
      setError("root", { message: err?.response?.data?.message || "Error de autenticación" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm flex flex-col gap-4"
        noValidate
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">Iniciar sesión</h2>
        <input
          type="email"
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message as string}</span>
        )}
        <input
          type="password"
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Contraseña"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password.message as string}</span>
        )}
        {errors.root && (
          <span className="text-red-500 text-sm text-center">{errors.root.message as string}</span>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition-colors disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
