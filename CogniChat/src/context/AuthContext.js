import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';
import { authService } from '../services/auth.service';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    checkUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);
        
        if (session?.user) {
          await loadUserProfile(session.user);
        } else {
          setUser(null);
          setProfile(null);
          setRole(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const session = await authService.getSession();
      if (session?.user) {
        await loadUserProfile(session.user);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = async (authUser) => {
    try {
      setUser(authUser);

      // Check if therapist
      const { data: therapist, error: therapistError } = await supabase
        .from('therapists')
        .select('*')
        .eq('therapist_id', authUser.id)
        .single();

      if (therapist && !therapistError) {
        setProfile(therapist);
        setRole('therapist');
        return;
      }

      // Check if client
      const { data: client, error: clientError } = await supabase
        .from('clients')
        .select('*')
        .eq('client_id', authUser.id)
        .single();

      if (client && !clientError) {
        setProfile(client);
        setRole('client');
        return;
      }

      throw new Error('User profile not found');
    } catch (error) {
      console.error('Error loading profile:', error);
      setUser(null);
      setProfile(null);
      setRole(null);
    }
  };

  const signIn = async (email, password) => {
    const result = await authService.signIn(email, password);
    return result;
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
    setProfile(null);
    setRole(null);
  };

  const value = {
    user,
    profile,
    role,
    loading,
    signIn,
    signOut,
    isTherapist: role === 'therapist',
    isClient: role === 'client',
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};