import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import supabase from '../utils/supabase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../utils/theme';

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password
      });
  
      if (error) {
        console.error('Login error:', error.message);
        toast.error(error.message);
      } else {
        toast.success('Connexion réussie');
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('Une erreur est survenue lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const fetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", session.user.id);
  
    if (error) console.error(error);
    else console.log(data);
    if (session.user.role !== "admin") {
      navigate("/dashboard"); // Redirect if not admin
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-light dark:bg-gradient-dark p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-full max-w-[1200px] h-[600px] bg-white dark:bg-midnight-800 rounded-2xl shadow-soft-light dark:shadow-soft-dark overflow-hidden"
      >
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-sunset dark:bg-gradient-sunset-dark items-center justify-center p-12">
          <div className="text-white space-y-6">
            <h2 className="text-5xl font-bold">Bon retour!</h2>
            <p className="text-white/90">Connectez-vous pour accéder à votre compte et continuer où vous vous êtes arrêté.</p>
            <div className="absolute bottom-12 left-12">
              <p className="text-white/70 text-sm">Vous n'avez pas de compte?</p>
              <Link to="/register" className="text-white hover:text-white/90 font-semibold">
                Créer un compte
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Bon retour sur</h1>
              <h2 className="text-3xl font-bold gradient-text">Ravi de vous revoir! 👋</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input w-full pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-sunset dark:hover:text-sunset transition-colors"
                  >
                    {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-sunset focus:ring-sunset border-gray-300 dark:border-gray-600 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Se souvenir de moi
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-sunset hover:text-sunset/80">
                  Mot de passe oublié?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="button w-full flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white rounded-full animate-spin border-t-transparent" />
                ) : (
                  "Se connecter"
                )}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-midnight-800 text-gray-500 dark:text-gray-400">Ou continuer avec</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-midnight-700 transition-colors"
                >
                  <FcGoogle className="w-5 h-5 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-midnight-700 transition-colors"
                >
                  <FaApple className="w-5 h-5 mr-2 text-gray-900 dark:text-white" />
                  <span className="text-gray-700 dark:text-gray-300">Apple</span>
                </button>
              </div>
            </form>

            <p className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
              Vous n'avez pas de compte?{' '}
              <Link to="/register" className="text-sunset hover:text-sunset/80 font-semibold">
                S'inscrire
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}