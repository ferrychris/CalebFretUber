import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import supabase from '../../utils/supabase';
import { useTheme } from '../../utils/theme';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminRequired?: boolean;
}

export default function ProtectedRoute({ children, adminRequired = false }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login', { 
          state: { 
            message: 'Veuillez vous connecter pour accéder à cette page',
            from: location.pathname 
          } 
        });
        return;
      }

      // Check if user has admin role when required
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profileError) {
        console.error('Erreur de profil:', profileError);
        throw profileError;
      }

      const userIsAdmin = profile?.role === 'admin';
      setIsAdmin(userIsAdmin);

      if (adminRequired && !userIsAdmin) {
        navigate('/', { 
          state: { 
            message: 'Accès non autorisé. Vous devez être administrateur pour accéder à cette page.' 
          } 
        });
        return;
      }

      setAuthenticated(true);
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
      navigate('/login', { 
        state: { 
          message: 'Une erreur est survenue. Veuillez vous reconnecter.',
          from: location.pathname
        } 
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-light dark:bg-gradient-dark">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-lg bg-white/10 backdrop-blur-sm"
        >
          <div className="w-12 h-12 border-4 border-sunset rounded-full animate-spin border-t-transparent"></div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">Chargement...</p>
        </motion.div>
      </div>
    );
  }

  if (!authenticated || (adminRequired && !isAdmin)) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}