import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../utils/theme';
import supabase from '../utils/supabase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<RegisterFormData> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function register() {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName
          }
        }
      });

      if (error) {
        console.error('Error:', error.message);
        toast.error(error.message);
      } else {
        toast.success('Inscription réussie ! Veuillez vérifier votre email pour confirmer votre compte.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      register();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof RegisterFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-light dark:bg-gradient-dark p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-full max-w-[1200px] h-[700px] bg-white dark:bg-midnight-800 rounded-2xl shadow-soft-light dark:shadow-soft-dark overflow-hidden"
      >
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-sunset dark:bg-gradient-sunset-dark items-center justify-center p-12">
          <div className="text-white space-y-6">
            <h2 className="text-5xl font-bold">Rejoignez-nous</h2>
            <p className="text-white/90">Créez votre compte pour accéder à des fonctionnalités exclusives et commencer votre voyage avec nous.</p>
            <div className="absolute bottom-12 left-12">
              <p className="text-white/70 text-sm">Déjà un compte ?</p>
              <Link to="/login" className="text-white hover:text-white/90 font-semibold">
                Connectez-vous ici
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-12 overflow-y-auto">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Créez votre compte</h1>
              <p className="text-gray-600 dark:text-gray-400">Rejoignez-nous et commencez votre voyage</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prénom</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`input w-full ${errors.firstName ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`input w-full ${errors.lastName ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input w-full ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`input w-full pr-10 ${errors.password ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-sunset dark:hover:text-sunset transition-colors"
                  >
                    {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirmer le mot de passe</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`input w-full pr-10 ${errors.confirmPassword ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-sunset dark:hover:text-sunset transition-colors"
                  >
                    {showConfirmPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="button w-full flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white rounded-full animate-spin border-t-transparent" />
                ) : (
                  "S'inscrire"
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
              Déjà un compte ?{' '}
              <Link to="/login" className="text-sunset hover:text-sunset/80 font-semibold">
                Connectez-vous
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
