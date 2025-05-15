import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login as loginService } from "../services/auth";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  username: yup.string().required("El usuario es obligatorio"),
  password: yup.string().min(3, "Mínimo 3 caracteres").required("La contraseña es obligatoria"),
});

interface LoginForm {
  username: string;
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
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await loginService(data.username, data.password);
      await login(res); // Esperar a que el usuario esté en contexto
      navigate("/", { replace: true }); // Redirigir tras login
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
          type="text"
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Usuario"
          {...register("username")}
        />
        {errors.username && (
          <span className="text-red-500 text-sm">{errors.username.message as string}</span>
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
